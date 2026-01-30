---
title: 'Why Filtered Queries Return Lower Relevancy in S3 Vectors'
link: 'https://medium.com/@HatmanStack/why-filtered-queries-return-lower-relevancy-in-s3-vectors-86c2dcd18b57'
description: 'Why filtered S3 Vector queries score ~10% lower and how to fix it.'
date: 'Jan 29, 2026'
time: '4 min read'
---

**TL;DR:** The ~10% relevancy drop on filtered S3 Vector queries isn't a bug — it's quantization noise plus graph disconnection from post-filtering. Boost or re-rank to fix it.

---

<br>

I've been running [RAGStack-Lambda](https://github.com/HatmanStack/RAGStack-Lambda) with ~1500 documents in a knowledge base. After revamping my metadata for S3 Vectors, something weird happened: filtered queries started returning the wrong results. I'd search for a specific person with explicit filters and get back a picture of a *different* person. The visual similarity was overpowering my metadata filters.

After digging in, I found filtered results consistently score ~10% lower in relevancy than unfiltered queries — even for the same content. This isn't a bug. It's a predictable consequence of how S3 Vectors is architected.

## The Trade-Off You're Making

S3 Vectors can cut your vector database costs by 90%. A billion vectors runs ~$46/month versus $660+ on Pinecone. The catch? You're trading precision for price.

Two mechanisms cause the relevancy drop:

### 1. Quantization Noise

S3 Vectors uses aggressive 4-bit Product Quantization to compress vectors — shrinking them by 64x so they can live on object storage instead of RAM.

**Unfiltered search:** With millions of candidates, the sheer volume drowns out the approximation error. Strong matches still surface.

**Filtered search:** Your candidate pool shrinks. The algorithm evaluates vectors that are further away in the space. Suddenly that quantization error is a significant chunk of your distance calculation. The ~10% drop corresponds to the noise floor of 4-bit quantization.

### 2. The Disconnected Graph Problem

S3 Vectors uses HNSW (Hierarchical Navigable Small World) — a graph where vectors connect to their neighbors. Search works by traversing edges to find the nearest match.

When you filter, you're turning off nodes. Remove 90% of vectors and you create holes in the graph. The search algorithm gets trapped — the "bridge" edges to better regions have been filtered out. It settles for local minima instead of finding your actual best match.

This is why I was getting the wrong person's photo. Visually similar, passed the traversal, but wrong.

## The Fix (What I Thought)

Short-term: A 1.25x boost for filtered results normalized my scores. Crude but effective.

Long-term: Re-ranking. Oversample (request 3-5x your target k), then re-rank with a cross-encoder or Bedrock's rerank API. Use S3 Vectors for cheap retrieval and smarter compute for precision.

## The Fix (What Actually Worked)

I spent time implementing the "*sophisticated*" solution. Oversample filtered results at 3x, rerank with Cohere Rerank 3.5 via Bedrock, merge the slices fairly.

Results got worse.

**The problem**: rerankers are designed for text documents. My knowledge base is ~60% images with metadata. The reranker was evaluating synthesized text like "people: judy wilson, topic: family_photos" — not what cross-encoders are optimized for. 

Meanwhile, the raw vector similarity scores from visual embeddings were actually good relevance signals. I was replacing useful information with noise.

I tried reranking both filtered and unfiltered slices. I tried reranking only filtered. I tried dropping visual-only results from unfiltered. Each "*improvement*" made things worse or traded one problem for another.

The 1.25x boost I dismissed as "crude"? It's still running in production.
