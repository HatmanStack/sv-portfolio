---
title: 'Multimodal Rerankers: The Fix for Object Storage RAG'
link: 'https://portfolio.hatstack.fun/read/post/Multimodal-Rerankers'
description: 'Why multimodal cross-encoders are the architecture that fixes filtered HNSW precision on object storage.'
date: 'Mar 4, 2026'
time: '5 min read'
---

**TL;DR:** Filtered HNSW search on object storage has a precision problem that existing solutions can't touch. At small scale, an adaptive boost works. At large scale, multimodal cross-encoders that process images and text through joint cross-attention are the architecture that fixes this.

I've been running [RAGStack-Lambda](https://github.com/HatmanStack/RAGStack-Lambda) on S3 Vectors with a multimodal corpus, \~60% images with metadata. In my [last post](https://portfolio.hatstack.fun/read/post/S3-Vectors-Filtered-Query-Relevancy), I documented why filtered queries consistently return \~10% lower relevancy, sometimes surfacing the wrong results entirely. The root cause is HNSW graph disconnection from post-filtering compounded by quantization noise in smaller candidate pools.

I solved it at my scale with an adaptive boost that keeps filtered results \~5% above unfiltered, scaling dynamically with how aggressively the filter shrinks the candidate pool. At \~1500 documents, that's enough. This post is about what comes next, not for me, but for anyone building multimodal RAG on object-storage vector databases at scale.

## **The Object Storage Problem**

ACORN (Approximate nearest neighbor Constraint-Optimized Retrieval Network) is the proven solution for filtered HNSW search. When a first-hop neighbor fails the filter, ACORN checks that neighbor's neighbors, a two-hop expansion that keeps the graph connected through filtered-out nodes. It's predicate-agnostic, meaning you don't need to know your filters at index time. Weaviate, Qdrant, and Elasticsearch have all adopted it.

**The catch**: ACORN assumes the graph is in memory. The two-hop expansion requires cheap random access to neighbor lists. S3 Vectors stores the graph on object storage. Every additional hop is an S3 read, the latency and cost would undermine the entire reason you're using S3 Vectors in the first place.

Text rerankers don't help either. I tried oversampling at 3x and reranking with Cohere Rerank 3.5 via Bedrock. Results got worse, the reranker was evaluating metadata strings like `"people: judy wilson, topic: family_photos"`, not what cross-encoders are trained on. If your corpus is majority images, text rerankers can't see what matters.

So the graph-level fix requires AWS to build something new. I've filed a [feature request](https://repost.aws/questions/QUjrm6KygfTBiwaaKpwqY_lQ/filtered-query-relevancy-degradation-in-s3-vectors-and-a-potential-architectural-fix) for filter-aware traversal. But from the application layer, you need a different approach entirely.

## **Multimodal Cross-Encoders: The Architecture That Fits**

While multimodal cross-attention has existed in research for years, over the last few months, a new class of production-ready rerankers has finally made this architecture viable for joint image-text processing at scale. This is architecturally different from both bi-encoders and text cross-encoders.

![Multimodal Cross-Encoder Architecture](/blog/multimodal_1.jpeg)

* **Bi-encoder (standard retrieval):** Images and text are embedded independently at ingestion time. At query time, you're comparing pre-computed vectors with a distance calculation. Fast, cheap, but the query never "sees" the image: it only sees where the image landed in vector space.  
* **Multimodal cross-encoder (reranking):** At query time, the candidate image is chunked into patches and passed through a vision encoder to produce visual tokens. The query becomes text tokens. Both are concatenated into a single sequence and fed through a Vision-Language Model with full cross-attention. The query tokens attend directly to spatial features in the image. An MLP head outputs a single relevance score.

<br>

The critical difference: the text of your query is directly interacting with the pixels of the candidate image. It's not comparing two independent embeddings: it's reasoning about whether this specific image is relevant to this specific query. This is the piece that was missing when I tried text rerankers.

## **The Two-Stage Architecture**

![RAG Multimodal Architecture](/blog/multimodal.jpeg)

**Stage 1** stays cheap. S3 Vectors does approximate retrieval with all its existing limitations: graph holes, quantization noise, the works. But instead of needing Stage 1 to be precise, you just need it to get the right answer somewhere in a larger candidate set.

**Stage 2** is where precision happens. The multimodal cross-encoder actually looks at each candidate image alongside the query text. It doesn't care that S3 Vectors returned a visually similar but wrong photo: it can see the image and read the query, so it can reason about whether this is actually a photo of a rare blue bird in the jungle.

**Stage 3** is unchanged. Better candidates in, better generation out.

This architecture decouples retrieval cost from retrieval precision. S3 Vectors gives you the 90% cost reduction on storage. The reranker handles the precision that the graph can't deliver under filtering. You stop asking the vector database to do something its storage medium won't allow.

## **The Cost Question**

A VLM forward pass per candidate is orders of magnitude more expensive than a cosine similarity calculation. If you're oversampling at 5x with a target k of 10, that's 50 VLM inference calls per query on a self-hosted GPU endpoint.

At small scale, this doesn't make sense. The adaptive boost costs nothing and handles the problem well enough. You'd be adding a GPU endpoint to solve a problem that a multiplication operation already addresses.

At large scale, the math inverts. The boost becomes unreliable, the failure modes become invisible, and the cost of wrong results in downstream generation: hallucinations, user trust erosion, bad decisions: exceeds the cost of a reranking endpoint. The GPU cost is also amortized differently at scale: a SageMaker endpoint running inference for thousands of queries per hour is a different proposition than one sitting idle for a dozen queries a day.

The crossover point depends on corpus size, query volume, and tolerance for imprecision. But for anyone building multimodal RAG on object storage at enterprise scale, this architecture is where the industry is heading.

## **What's Available Now**

Three models have appeared in the last few months:

* **Jina Reranker M0**: Built on Qwen-VL. Outputs a scalar relevance score from concatenated query and image/text documents. Open weights.  
* **Llama Nemotron-Rerank-VL**: Nvidia's cross-encoder optimized for reranking visual documents against text queries.  
* **Qwen3-VL Reranker**: Open-weight model tailored for vision-language reranking pipelines.

<br>

None are available through Bedrock yet. They're all self-hosted, which means adding a SageMaker endpoint or GPU-backed instance. Training a custom multimodal reranker for a specific domain is also viable: fine-tune a lightweight VLM with contrastive loss on positive and hard-negative query-image-text pairs from your own corpus.

## **Where This Leaves Us**

The filtered search problem on object storage has three layers:

* *Graph connectivity*: needs an infrastructure fix from AWS. ACORN's approach doesn't transfer to object storage without adaptation. I've filed the [feature request](https://repost.aws/questions/QUjrm6KygfTBiwaaKpwqY_lQ/filtered-query-relevancy-degradation-in-s3-vectors-and-a-potential-architectural-fix).  
* *Score calibration*: the adaptive boost handles this now. It keeps filtered results surfacing above unfiltered regardless of selectivity. At small to medium scale, this is the right answer.  
* *Relevance evaluation*: multimodal cross-encoders are the first architecture that can actually determine whether an image is relevant to a query, not just whether its vector is close. This is the layer that matters at scale, and the models just arrived.

<br>

If you're running multimodal RAG on S3 Vectors today, the adaptive boost is probably sufficient. If you're planning for millions of vectors with filtered search across images and text, the two-stage architecture with a multimodal reranker is the path forward. The pieces exist now: they just haven't been assembled for this specific problem yet.
