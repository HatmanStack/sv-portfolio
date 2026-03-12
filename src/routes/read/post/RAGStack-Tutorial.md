---
title: 'RAGStack Tutorial: Deploy on AWS'
description: 'Deploy a fully serverless, multimodal RAG pipeline on AWS that scales to zero and costs $2-3/month.'
date: 'Mar 11, 2026'
time: '15 min read'
---

Most RAG tutorials end the same way: you've got a working prototype and a bill for a vector database that runs whether anyone's querying it or not. Add an always-on embedding service, a hosted LLM endpoint, and the usual AWS infrastructure, and you're looking at real money before a single user shows up.

But it doesn't have to work that way. In this tutorial, you'll deploy a fully serverless RAG pipeline that processes documents, images, video, and audio, then scales to zero when nobody's using it.

Everything runs in your AWS account, your data never leaves your infrastructure, and your ongoing monthly cost for a modest knowledge base will be closer to `$2-3` than `$300`.

We'll use [RAGStack-Lambda](https://github.com/HatmanStack/RAGStack-Lambda), an open-source project I built on AWS. By the end, you'll have a deployed pipeline with a dashboard, an AI chat interface with source citations, a drop-in web component you can embed in any app, and an MCP server you can use to feed your assistant context.

## Table of Contents

- [What This Actually Costs](#what-this-actually-costs)
- [What You're Building](#what-youre-building)
- [Prerequisites](#prerequisites)
- [Deploying from AWS Marketplace](#deploying-from-aws-marketplace)
- [Deploying from Source](#deploying-from-source)
- [Uploading Your First Documents](#uploading-your-first-documents)
- [Chatting With Your Knowledge Base](#chatting-with-your-knowledge-base)
- [Embedding the Web Component in Your App](#embedding-the-web-component-in-your-app)
- [Using the MCP Server](#using-the-mcp-server)
- [What You Can Build From Here](#what-you-can-build-from-here)
- [Wrapping Up](#wrapping-up)

## What This Actually Costs

Before we build anything, let's talk money, because the cost story is the whole point.

RAG pipelines have two cost phases: ingestion (processing your documents once) and operation (querying them over time).

Most platforms charge you a flat monthly rate regardless of which phase you're in. A serverless architecture flips that: ingestion costs something, and then everything scales to zero.

### Ingestion: The One-Time Hit

When you upload documents, several things happen: text extraction (OCR for PDFs and images), embedding generation, metadata extraction, and storage. Here's what that actually costs per service:

**Textract (OCR):** This is the most expensive part of ingestion, and it only applies to scanned PDFs and images that need text extraction. Plain text, HTML, CSV, and other text-based formats skip this entirely.

Textract charges ~`$1.50` per 1,000 pages for standard text detection. If you're uploading 500 pages of scanned PDFs, that's about `$0.75`. A heavy initial load of several thousand scanned pages might run `$5-10`. But once your documents are processed, you never pay this again unless you add new ones.

**Bedrock Embeddings (Nova Multimodal):** This is where your content gets converted into vectors for semantic search. The pricing is almost comically cheap:

*   Text: `$0.00002` per 1,000 input tokens
    
*   Images: `$0.00115` per image
    
*   Video/Audio: `$0.00200` per minute
    

<br>

To put that in perspective: if you have 1,500 text documents averaging 2,500 tokens each after chunking, your total embedding cost is about `$0.08`. A knowledge base with 500 images runs `$0.58`. Even a mixed corpus of text, images, and a few hours of video stays well under `$2` for the entire embedding pass. This is a one-time cost – you only re-embed if you add or update documents.

**Bedrock LLM (Metadata Extraction):** RAGStack uses an LLM to analyze each document and extract structured metadata automatically. This is a few inference calls per document using Nova Lite or a similar model. At `$0.06`/`$0.24` per million input/output tokens, processing 1,500 documents costs well under `$1`.

**S3 Vectors (Storage):** Storing your embeddings. At `$0.06` per GB/month, a knowledge base of 1,500 documents with 1,024-dimension vectors takes up a trivially small amount of space. We're talking pennies per month.

**S3 (Document Storage):** Your source documents in standard S3. Even cheaper, `$0.023` per GB/month.

**DynamoDB:** Stores document metadata and processing state. The on-demand pricing model means you pay per request during ingestion, then essentially nothing at rest. A few cents for the initial load.

To put real numbers on it: if you upload 200 text documents (PDFs, HTML, markdown), your total ingestion cost is likely under `$1`. If you upload 1,000 scanned PDFs that need OCR, you might see `$5-8` as a one-time hit. That `$7-10` figure you might see referenced? That's the upper end for a heavy initial load with lots of OCR work.

### Operation: Where Scale-to-Zero Shines

Once your documents are ingested, the pipeline is waiting. Not running. Waiting. Here's what each query costs:

**Lambda:** Invocations are billed per request and duration. The free tier covers 1 million requests/month. For a personal or small-team knowledge base, you may never leave the free tier.

**S3 Vectors (Queries):** `$2.50` per million query API calls, plus a per-TB data processing charge. For a small index queried a few hundred times a month, this rounds to effectively zero.

**Bedrock (Chat Inference):** This is your main operating cost. Each chat response requires an LLM call. Using Nova Lite at `$0.06` per million input tokens and `$0.24` per million output tokens, a typical RAG query (retrieval context + user question + response) might cost `$0.001-0.003` per query. A hundred queries a month is `$0.10-0.30`.

**Step Functions:** Orchestrates the document processing pipeline. Standard workflows charge `$0.025` per 1,000 state transitions. Minimal during operation since it's only active during ingestion.

**Cognito:** User authentication. Free for the first 10,000 monthly active users.

**CloudFront:** Serves the dashboard UI. Free tier covers 1 TB of data transfer per month.

**API Gateway:** Handles GraphQL API requests. Free tier covers 1 million API calls per month.

Add it all up for a knowledge base with 500 documents getting a few hundred queries per month, and your monthly operating cost is somewhere between `$0.50` and `$3.00`. Most of that is the LLM inference for chat responses.

### The Comparison That Matters

Here's the same pipeline on a traditional always-on stack:

| Service | RAGStack-Lambda | Traditional Stack |
| --- | --- | --- |
| Vector Database | S3 Vectors: pennies/mo | Pinecone Starter: `$70`/mo |
| Vector Database (alt) | S3 Vectors: pennies/mo | OpenSearch Serverless: ~`$350`/mo |
| Compute | Lambda: free tier | EC2 or ECS: `$50-150`/mo |
| LLM Inference | Same per-query cost | Same per-query cost |
| Total (idle) | ~`$0.50-3.00`/mo | `$120-500`/mo |

<br>

The LLM inference cost per query is roughly the same everywhere – that's Bedrock's on-demand pricing regardless of your architecture. The difference is everything else. Traditional stacks pay a floor cost whether anyone's using them or not. A serverless stack pays for what it uses, and idle costs essentially nothing.

### What About Transcribe?

If you're uploading video or audio, AWS Transcribe adds cost for speech-to-text conversion. Standard transcription runs about `$0.024` per minute of audio. A 10-minute video costs `$0.24` to transcribe. This is a one-time ingestion cost, once transcribed and embedded, the resulting text chunks are queried like any other document.

## What You're Building

By the end of this tutorial, you'll have a deployed pipeline that does the following:

1.  You upload a document (PDF, image, video, audio, HTML, CSV, [the full list](https://github.com/HatmanStack/RAGStack-Lambda/blob/main/docs/ARCHITECTURE.md) is extensive) through a web dashboard.
    
2.  The pipeline detects the file type and routes it to the right processor. Scanned PDFs go through OCR via Textract. Video and audio go through Transcribe for speech-to-text, split into 30-second searchable chunks with speaker identification. Images get visual embeddings and any caption text you provide.
    
3.  An LLM analyzes each document and extracts structured metadata, topic, document type, date range, people mentioned, whatever's relevant. This happens automatically.
    
4.  Everything gets embedded using Amazon Nova Multimodal Embeddings and stored in a Bedrock Knowledge Base backed by S3 Vectors.
    
5.  You (or your users) ask questions through an AI chat interface. The pipeline retrieves relevant documents, passes them as context to a Bedrock LLM, and returns an answer with collapsible source citations, including timestamp links for video and audio that jump to the exact position.
    

<br>

All of this runs in your AWS account. No external control plane, no third-party services beyond AWS itself.

### The Architecture

![The diagram illustrates a flowchart of a buyer's AWS account, detailing the application plane with processes like S3 to Lambda OCR, supported by services like Cognito Auth. It emphasizes Amazon Bedrock's integration for knowledge and chat.](/blog/e2ff6df9c7ec42b2dccc492bce95ba9686e8c00f.jpeg)

A few things to note about this architecture:

**Step Functions orchestrate everything.** When a document is uploaded, a state machine manages the entire processing flow, detecting the file type, routing to the right processor, waiting for async operations like Transcribe jobs, then triggering embedding and metadata extraction.

This is what makes the pipeline reliable without a running server. If a step fails, it retries. You can see exactly where every document is in the processing pipeline.

**Lambda does the compute.** Every processing step is a Lambda function. They spin up when needed, run for a few seconds to a few minutes, and shut down. There's no EC2 instance idling at 3 AM.

**S3 Vectors is the vector store.** Your embeddings live in S3's purpose-built vector storage rather than in a dedicated vector database like Pinecone or OpenSearch.

This is what makes the "scale to zero" cost possible: you're paying object storage rates for vector data instead of keeping a database cluster warm. It also means your vectors are sitting in your own S3 bucket, not in a third-party managed service that holds your data on their terms.

**Cognito handles auth.** The dashboard and API are protected with Cognito user pools. When you deploy, you get a temporary password via email. The web component uses IAM-based authentication, and server-side integrations use API key auth.

**CloudFront serves the UI.** The dashboard is a static React app served through CloudFront, so there's no web server to maintain.

### Two Ways to Deploy

You have two deployment paths depending on what you want:

**AWS Marketplace (the fast path)**, click deploy, fill in two fields (stack name and email), and wait about 10 minutes. No local tooling required. This is the path we'll walk through first.

**From Source (the developer path)**, Clone the repo, run `publish.py`, and deploy via SAM CLI. This is the path for when you want to customize the processing pipeline, modify the UI, or contribute to the project. We'll cover this after the Marketplace walkthrough.

Both paths produce the same stack. The Marketplace version just wraps the CloudFormation template in a one-click deployment.

## Prerequisites

Before you deploy, you'll need:

*   **An AWS account** with permissions to create CloudFormation stacks, Lambda functions, S3 buckets, DynamoDB tables, and Cognito user pools. If you're using an admin account, you're covered.
    
*   **Bedrock model access:** RAGStack defaults to `us-east-1` because that's where Nova Multimodal Embeddings is available. Amazon's own models (including Nova) are available by default in Bedrock, no manual enablement required. Just make sure your IAM role has the necessary `bedrock:InvokeModel` permissions.
    
*   **For the Marketplace path:** just a web browser.
    
*   **For the source path:** Python 3.13+, Node.js 24+, AWS CLI and SAM CLI configured, and Docker (for building Lambda layers).
    

## Deploying from AWS Marketplace

This is the fastest path – no local tools, no CLI, no Docker. You'll launch a CloudFormation stack and have a working pipeline in about 10 minutes.

### Step 1: Launch the Stack

Click the [direct deploy link](https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?templateURL=https://ragstack-quicklaunch-public.s3.us-east-1.amazonaws.com/ragstack-template.yaml&stackName=my-docs) to open CloudFormation's "Quick create stack" page with the template pre-loaded.

![Screenshot of AWS CloudFormation Quick Create Stack page in dark mode. Sections for template URL, stack name, parameters, and build options are visible.](/blog/Screenshot-2026-03-11-10.13.33-AM.jpeg)

### Step 2: Fill In Two Fields

The page has a lot of options, but you only need two:

*   **Stack name:** Must be lowercase. This becomes the prefix for all your AWS resources (for example, `my-docs`, `team-kb`, `project-notes`). Keep it short.
    
*   **Admin Email:** Under Required Settings. Cognito will send your temporary login credentials here. Use an email you can access right now.
    

<br>

Everything else – Build Options, Advanced Settings, OCR Backend, model selections – can stay at the defaults. They're there for customization later, but the defaults work out of the box.

### Step 3: Deploy

Scroll to the bottom, check the three acknowledgment boxes under "Capabilities and transforms," and click **Create stack**.

Deployment takes roughly 10 minutes. You can watch the progress in the CloudFormation Events tab if you're curious, but there's nothing to do until the stack status flips to `CREATE_COMPLETE`.

### Step 4: Log In

Once the stack finishes, check your email. Cognito sends you the dashboard URL and a temporary password. Log in, set a new password, and you're looking at an empty dashboard ready for documents.

![A software dashboard interface titled 'Document Pipeline (Demo)' displaying options for uploading, scraping, and searching documents. The screen shows no current documents or scrape jobs, with menu options on the left and a search and filter bar at the center. The overall tone is functional and minimalist.](/blog/Screenshot-2026-03-11-10.15.35-AM.jpeg)

## Deploying from Source

If you want to customize the pipeline, modify the UI, or contribute to the project, deploy from source instead.

### Step 1: Clone and Set Up

```bash
git clone https://github.com/HatmanStack/RAGStack-Lambda.git
cd RAGStack-Lambda

python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Step 2: Deploy

The `publish.py` script handles everything: building the frontend, packaging Lambda functions, and deploying via SAM CLI.

```bash
python publish.py \
  --project-name my-docs \
  --admin-email admin@example.com
```

This defaults to `us-east-1` for Nova Multimodal Embeddings. The script will build the React dashboard, build the web component, package all Lambda layers with Docker, and deploy the CloudFormation stack through SAM.

First deploy takes longer (15-20 minutes) because it's building everything from scratch. Subsequent deploys are faster since SAM caches unchanged resources.

If you only want to iterate on the backend and skip UI builds:

```bash
# Skip dashboard build (still builds web component)
python publish.py --project-name my-docs --admin-email admin@example.com --skip-ui

# Skip ALL UI builds
python publish.py --project-name my-docs --admin-email admin@example.com --skip-ui-all
```

Once it finishes, you'll get the same Cognito email and dashboard URL as the Marketplace path.

## Uploading Your First Documents

The dashboard has tabs for different content types. We'll start with the Documents tab since that's the most common use case.

### Documents

Click the **Documents** tab and upload a file. RAGStack accepts a wide range of formats: PDF, DOCX, XLSX, HTML, CSV, JSON, XML, EML, EPUB, TXT, and Markdown. Drag and drop or use the file picker.

Once uploaded, the document enters the processing pipeline. You'll see the status update in real time:

1.  **UPLOADED:** File received and stored in S3.
    
2.  **PROCESSING:** Step Functions has picked it up and routed it to the right processor. Text-based files (HTML, CSV, Markdown) go through direct extraction. Scanned PDFs and images go through Textract OCR. The LLM analyzes the content and extracts structured metadata, topic, document type, people mentioned, date ranges, whatever's relevant to the content.
    
3.  **INDEXED:** Embeddings generated, vectors stored, document is searchable.
    

<br>

Text documents typically process in 1-5 minutes. OCR-heavy documents (scanned PDFs, images with text) can take 2-15 minutes depending on page count.

![Screenshot of a document upload interface labeled Document Pipeline (Demo). Central panel shows a box for drag-and-drop file upload. Sleek, modern design.](/blog/Screenshot-2026-03-11-10.16.42-AM.jpeg)

### Images

The **Images** tab works differently. Upload a JPG, PNG, GIF, or WebP and you can add a caption. Both the visual content and caption text get embedded using Nova Multimodal Embeddings, so you can search by what's in the image or by your description of it.

This is where multimodal embeddings earn their keep. A traditional text-only RAG pipeline would need you to describe every image manually. Here, the image itself becomes searchable, and since everything stays in your AWS account, you're not sending personal photos or sensitive visual content to an external service to get there.

### What About Video and Audio?

Upload video or audio files and RAGStack routes them through AWS Transcribe for speech-to-text conversion. The transcript gets split into 30-second chunks with speaker identification, then embedded like any other document. When chat results reference a video source, you get timestamp links that jump to the exact position in the recording.

### Web Scraping

The **Scrape** tab lets you pull websites directly into your knowledge base. Enter a URL and RAGStack crawls the page, extracts the content, and processes it through the same pipeline as uploaded documents, metadata extraction, embedding, indexing.

This is useful for building a knowledge base from existing web content without manually saving and uploading pages. Documentation sites, blog archives, reference material, anything publicly accessible.

![Web scraping interface with fields for URL, max pages, and depth. A dropdown for scope selection and a 'Start Scrape' button are visible.](/blog/Screenshot-2026-03-11-10.17.04-AM.jpeg)

## Chatting With Your Knowledge Base

This is the payoff. Go to the **Chat** tab, type a question, and RAGStack retrieves relevant documents from your knowledge base, passes them as context to a Bedrock LLM, and returns an answer with source citations.

The citations are collapsible, so click to expand and see which documents informed the answer, with the option to download the source file. For video and audio sources, you get clickable timestamps that jump to the relevant moment.

![Screenshot of a web interface titled Knowledge Base Chat with menu options on the left. The central section prompts users to ask document-related questions.](/blog/Screenshot-2026-03-11-10.17.43-AM.jpeg)

### Metadata Filtering

If you've uploaded enough documents to have meaningful metadata categories, the chat interface lets you filter search results by metadata before querying. RAGStack auto-discovers the metadata structure from your documents, so you don't configure this manually, it just appears as your knowledge base grows.

This is useful when you have a large mixed corpus. Instead of hoping the vector search picks the right context from thousands of documents, you can narrow it down: "only search documents about project X" or "only search content from Q4 2024."

## Embedding the Web Component in Your App

The dashboard is useful for managing your knowledge base, but the real power is embedding RAGStack's chat in your own application. The web component works with any framework, React, Vue, Angular, Svelte, plain HTML.

Load the script once from your CloudFront distribution:

```html
<script src="https://your-cloudfront-url/ragstack-chat.js"></script>
```

Then drop the component wherever you want a chat interface:

```html
<ragstack-chat
  conversation-id="my-app"
  header-text="Ask About Documents"
></ragstack-chat>
```

That's it. The component handles authentication (via IAM), manages conversation state, and renders source citations, all self-contained. Your CloudFront URL is in the stack outputs.

For server-side integrations that don't need a UI, the GraphQL API is available with API key authentication. You can find your endpoint and API key in the dashboard under Settings.

## Using the MCP Server

RAGStack includes an MCP server that connects your knowledge base to AI assistants like Claude Desktop, Cursor, VS Code, and Amazon Q CLI. Instead of switching to the dashboard to search your documents, you ask your assistant directly.

Install it:

```bash
pip install ragstack-mcp
```

Then add it to your AI assistant's MCP configuration:

```json
{
  "ragstack": {
    "command": "uvx",
    "args": ["ragstack-mcp"],
    "env": {
      "RAGSTACK_GRAPHQL_ENDPOINT": "YOUR_ENDPOINT",
      "RAGSTACK_API_KEY": "YOUR_API_KEY"
    }
  }
}
```

Your endpoint and API key are in the dashboard under Settings. Once configured, type `@ragstack` in your assistant's chat to invoke the MCP server, then ask things like "search my knowledge base for authentication docs" and it queries RAGStack directly.

See the [MCP Server docs](https://github.com/HatmanStack/RAGStack-Lambda/blob/main/src/ragstack-mcp/README.md) for the full list of available tools and setup details.

## What You Can Build From Here

You've got a deployed RAG pipeline that costs almost nothing to run and handles text, images, video, and audio. A few directions you might take it:

**A searchable personal archive.** Every conference talk you've saved, every PDF textbook, every tutorial video that's sitting in a folder somewhere. Upload it all, and now you have one search interface across years of accumulated material. The multimodal embeddings mean your screenshots and diagrams are searchable too, not just the text.

I built [a family archive app](https://github.com/HatmanStack/family-archive-document-ai) this way, scanned letters, old photos, home videos, with RAGStack deployed as a nested CloudFormation stack so the whole family can search across decades of memories using the chat widget.

**A second brain for a client project.** Scrape the client's existing docs, upload the SOW and meeting notes, drop in the codebase documentation. Now you've got a searchable knowledge base scoped to that engagement. Spin it up at the start, tear it down when the contract ends. At these costs, it's disposable infrastructure.

**AI chat over a niche dataset.** Recipe collections, legal filings, research papers, local government meeting minutes, any corpus that's too specialized for general-purpose LLMs to know well. The web component means you can ship it as a standalone tool without building a frontend from scratch.

**RAG for your MCP workflow.** If you're already using Claude Desktop or Cursor, the MCP server turns your knowledge base into another tool your assistant can reach for. Upload your team's runbooks and architecture docs, and now `@ragstack` in your editor gives you instant context without tab-switching.

## Wrapping Up

The serverless RAG pipeline you just deployed handles document processing, multimodal embeddings, metadata extraction, and AI chat with source citations, all scaling to zero when idle, all running in your AWS account. Your documents, your vectors, your infrastructure. The traditional approach to this stack costs `$120-500`/month in baseline infrastructure. This one costs pocket change.

The full source is at [github.com/HatmanStack/RAGStack-Lambda](https://github.com/HatmanStack/RAGStack-Lambda). File issues, open PRs, or just poke around the architecture. If you want to go deeper on the technical tradeoffs, particularly how filtered vector search behaves on cost-optimized backends like S3 Vectors, that's a story for the next post.
