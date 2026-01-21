---
title: 'RAGStack-Lambda: Scale-to-Zero RAG'
link: 'https://github.com/HatmanStack/RAGStack-Lambda'
description: 'Serverless document AI with S3 Vectors and Nova embeddings.'
date: 'Jan 20, 2026'
time: '10 min read'
---

RAGStack-Lambda is an open-source serverless document processing platform that fundamentally changes the RAG (Retrieval-Augmented Generation) cost model. 

While enterprise solutions require $300+/month vector database fees just to maintain availability, RAGStack scales to zero when idle—you pay only for actual usage. The result is a fully-featured document intelligence system for $7-10/month handling 1,000 documents.

Beyond cost efficiency, RAGStack delivers genuinely innovative capabilities:

* **Multimodal intelligence** powered by Amazon Nova embeddings means images are semantically understood, not just stored. Upload a photo, search with natural language, and retrieve visually relevant results without manual tagging.

* **Video and audio processing** through AWS Transcribe integration transforms recordings into searchable archives. Source citations include timestamp links—click one and the player jumps to the exact 30-second segment containing that information.

* **The Metadata Analyzer** discovers patterns in your documents and generates smart filters automatically. Rather than manual tagging, AI determines your content's structure and creates query filters through few-shot learning.

* **Complete ownership** with no external control plane. Every component—Lambda functions, S3 buckets, DynamoDB tables, Knowledge Base—deploys directly into your AWS account. Your data never leaves your infrastructure. There's no SaaS dependency, no third-party API calls for core functionality, and no vendor lock-in beyond AWS itself.

* **One-click AWS deployment** gets you running in 10 minutes. No Kubernetes expertise required. No containers to manage. Pure serverless architecture.

* **For integration**, the embeddable web component works with React, Vue, Angular, or vanilla HTML via a single script tag.

* **The MCP server** connects your knowledge base directly to Claude Desktop, Cursor, and VS Code—providing context without leaving your development environment.

RAGStack isn't competing with enterprise-grade vector databases for high-frequency, latency-critical applications. It's built to democratize document AI for the majority of use cases that need affordable, capable document intelligence rather than sub-millisecond response times.

---

## The Full Story: Building Document Intelligence Without the Enterprise Price Tag

### The Problem with Traditional RAG

<br>

Traditional RAG architectures impose significant cost and complexity burdens that are difficult to justify for most use cases. Adding document chat capabilities to an application typically requires:

* A dedicated vector database cluster (Pinecone, Weaviate, OpenSearch)
* Always-on application servers managing ingestion pipelines
* DevOps expertise for ongoing maintenance
* A minimum budget of $300-500/month for the vector database alone

<br>

For organizations processing millions of documents daily, this investment makes sense. For startups building internal knowledge bases, small businesses digitizing archives, or developers running proof-of-concept experiments, it creates an unnecessary barrier to entry.

RAGStack-Lambda takes a different approach: treating RAG as a utility rather than a major infrastructure investment.

### Scale-to-Zero

<br>

RAGStack is built on a core principle: infrastructure costs should reflect actual usage. Every component uses AWS services that bill on consumption:

<table border="1" cellspacing="0" cellpadding="6" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr >
      <th>Traditional Stack</th>
      <th>RAGStack Alternative</th>
      <th>Monthly Cost Impact</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>OpenSearch Serverless</td>
      <td>S3 Vectors storage</td>
      <td>$300/mo → ~$1/mo</td>
    </tr>
    <tr>
      <td>ECS/EC2 application servers</td>
      <td>AWS Lambda</td>
      <td>$50-100/mo → pennies</td>
    </tr>
    <tr>
      <td>Managed orchestration tools</td>
      <td>Step Functions</td>
      <td>Flat fee → pay-per-use</td>
    </tr>
  </tbody>
</table>
<br>

For a 10,000-page documentation site with 5,000 queries per month, traditional managed RAG costs approximately $300/month. RAGStack handles the same workload for $2-5/month.

The trade-off is latency. S3 Vectors retrieval operates in hundreds of milliseconds rather than the sub-50ms of RAM-resident indices. For chat interfaces, research assistants, and document Q&A—where users expect conversational response times—this is entirely acceptable.

### Your Infrastructure, Your Data: No External Control Plane

<br>

A critical distinction between RAGStack and managed RAG services: everything runs in your AWS account. When you deploy RAGStack, you're not connecting to a third-party service or routing data through external APIs.

The CloudFormation/SAM template creates resources directly in your account:

* Lambda functions for document processing
* S3 buckets for file storage
* DynamoDB tables for tracking and configuration
* Bedrock Knowledge Base for vector storage and retrieval
* AppSync API for GraphQL endpoints
* Cognito for authentication

<br>

There is no RAGStack control plane. No telemetry sent to external servers. No dependency on a SaaS provider's uptime or pricing decisions. Your documents, your vectors, your infrastructure—all within your AWS security boundary.

This architecture provides:
* **Data sovereignty:** Sensitive documents never leave your account
* **Compliance simplicity:** Your existing AWS compliance posture extends to RAGStack
* **No vendor dependency:** If you stop using RAGStack, your data and infrastructure remain
* **Full visibility:** CloudWatch logs, X-Ray traces, and IAM policies you control

<br>

The trade-off is operational responsibility. You manage the stack, apply updates, and handle any issues. For teams already comfortable with AWS, this is often preferable to black-box managed services.

### Amazon Nova: Multimodal Embeddings

<br>

Text search is well-established. RAGStack extends into multimodal territory using Amazon Nova's embedding model, which creates vectors in a unified space where text and images coexist.

**How it works:**
* Upload an image (financial chart, product photo, diagram)
* Nova encodes the visual content directly into vector space
* Search using natural language queries
* Retrieve relevant images based on semantic similarity

<br>

For image uploads, the system provides both visual embeddings (find similar images) and AI-generated captions (find images by description). Captions can be auto-generated using a customizable prompt, manually provided, or both.

```html
<ragstack-chat
  conversation-id="my-app"
  header-text="Ask About Documents"
></ragstack-chat>
```

### Video & Audio: Timestamp-Linked Source Citations

<br>

RAGStack's media processing creates a notably useful experience for searching recordings. Upload a video or audio file, and AWS Transcribe converts speech to text, identifies speakers (up to 10), and segments the transcript into 30-second chunks. Each chunk is embedded with timestamp metadata.

When you query "What was discussed about Q4 targets?", the response includes source citations like `team-meeting.mp4 [1:30-2:00]`. Clicking that link opens an inline media player positioned at that exact segment.

```javascript
// Source object for media content
{
  title: "team-meeting.mp4",
  location: "1:30-2:00",
  snippet: "We discussed the Q4 targets...",
  documentUrl: "[https://s3.amazonaws.com/...#t=90,120](https://s3.amazonaws.com/...#t=90,120)",
  isMedia: true,
  timestampStart: 90,
  timestampEnd: 120,
  speaker: "speaker_0"
}
```

The URL includes HTML5 media fragments (`#t=start,end`) that modern browsers handle natively.

### The Metadata Analyzer: Automated Content Organization

<br>

Manual document tagging is tedious, inconsistent, and scales poorly. RAGStack automates this with the Metadata Analyzer.

* **During ingestion:** An LLM examines each document and extracts structured metadata—topic, document_type, date_range, location, or other relevant fields. You can run in "auto" mode (AI determines what's important) or "manual" mode (you specify which fields to extract).
* **After ingestion:** The Analyzer samples your knowledge base, counts metadata occurrences, calculates statistics, and generates filter examples automatically.

<br>

These generated examples use few-shot learning. Enable effective examples, disable irrelevant ones, and the system learns what kinds of filters work for your specific data.

```json
// Example generated filter
{
  "name": "PDF Documents Only",
  "filter": {"document_type": {"$eq": "pdf"}},
  "useCase": "When user wants to search only formal documentation"
}
```

### Knowledge Base Reindex: Update Metadata Without Re-uploading

<br>

If you uploaded documents before enabling metadata extraction, changed extraction settings, or migrated from an older version, the Reindex feature regenerates metadata for your entire knowledge base using current settings—without re-running OCR or re-uploading files. The process creates a fresh Knowledge Base, iterates through all documents, regenerates metadata, ingests to the new KB, updates the SSM parameter, and cleans up the old one. Progress displays in real-time.

### MCP Server: Knowledge Base Access in Your IDE

<br>

The Model Context Protocol (MCP) is changing how AI assistants access external context. RAGStack includes an MCP server that connects your knowledge base directly to:

* Claude Desktop
* Cursor IDE
* VS Code with AI extensions
* Amazon Q CLI
* Any MCP-compatible tool

```json
// Add to your AI assistant's MCP config
{
  "ragstack-kb": {
    "command": "uvx",
    "args": ["ragstack-mcp"],
    "env": {
      "RAGSTACK_GRAPHQL_ENDPOINT": "YOUR_ENDPOINT",
      "RAGSTACK_API_KEY": "YOUR_API_KEY"
    }
  }
}
```

Query your knowledge base directly from your IDE with `@ragstack How does authentication work?`. No context switching required—the AI fetches relevant chunks and explains them inline. This transforms documentation from a static resource into living context that AI assistants draw from continuously during development.

### Web Component: Framework-Agnostic Integration

<br>

Enterprise applications typically involve multiple frameworks and legacy systems. The `<ragstack-chat>` web component integrates without framework dependencies:

```html
<script src="https://your-cdn-url/ragstack-chat.js"></script>

<ragstack-chat
  conversation-id="support-chat"
  header-text="Ask the Docs"
  show-sources="true"
></ragstack-chat>
```

One script tag, one custom element. The component provides:
* Collapsible source citations
* Optional document downloads (presigned S3 URLs)
* Media playback for video/audio sources
* Full CSS customization via variables
* Keyboard accessibility and screen reader support

<br>

### Web Scraping: Convert Websites to Knowledge Bases

<br>

For documentation spread across websites, the built-in scraper handles ingestion:

1. Enter a starting URL
2. Configure scope (subpages, hostname, or full domain)
3. Set depth and page limits
4. Add include/exclude patterns
5. Start the scrape

<br>

The system discovers links, respects constraints, fetches content (with headless browser support for JavaScript-heavy sites), converts to markdown, and indexes automatically. Content hashing ensures re-scrapes skip unchanged pages. Authentication is supported via cookies in the configuration. Progress updates arrive in real-time via GraphQL subscriptions.

### Deployment Options

#### One-Click Deploy via AWS Marketplace

<br>

The fastest path to production:

1. https://aws.amazon.com/marketplace/pp/prodview-5afdiw2zrht6o
2. Click the deploy link
3. Enter a stack name (lowercase) and admin email
4. Wait approximately 10 minutes

<br>

**Note:** The AWS Marketplace listing has limited visibility—you must be signed in to your AWS account to view the page. This is an AWS Marketplace configuration, not a restriction on the software itself.

#### Deploy from Source

<br>

For customization or development workflows:

```bash
git clone https://github.com/HatmanStack/RAGStack-Lambda.git
cd RAGStack-Lambda
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python publish.py --project-name my-docs --admin-email admin@example.com
```

Both deployment methods create identical infrastructure in your account:
* Full document processing pipeline (Lambda, Step Functions, S3, DynamoDB)
* Bedrock Knowledge Base with S3 Vectors
* AppSync GraphQL API with Cognito auth
* React dashboard with Cloudscape Design
* Chat web component on CloudFront CDN
* Budget alerts at 80% and 100% thresholds

<br>

The temporary Cognito password arrives by email. Dashboard URL appears in CloudFormation outputs.

### Document Processing: Comprehensive Format Support

<br>

The ingestion pipeline routes files based on content type:

| Category | Formats | Processing |
| :--- | :--- | :--- |
| **Text** | HTML, TXT, CSV, JSON, XML, EML, EPUB, DOCX, XLSX | Direct extraction with smart analysis |
| **OCR** | PDF, JPG, PNG, TIFF, GIF, BMP, WebP, AVIF | Textract or Bedrock vision (WebP/AVIF require Bedrock) |
| **Media** | MP4, WebM, MP3, WAV, M4A, OGG, FLAC | AWS Transcribe → 30s segments |
| **Passthrough** | Markdown | Direct copy |

<br>

Large PDFs (20+ pages) automatically batch into 10-page chunks processed in parallel. A 95% success threshold ensures ingestion proceeds even if individual pages fail. Failed batches retry three times before reaching the dead letter queue.

### Cost Breakdown

<br>

| Configuration | Monthly Cost (1000 docs) |
| :--- | :--- |
| Textract + Haiku | $7-10 |
| Bedrock OCR + Haiku | $25-30 |
| Sonnet instead of Haiku | Add $5-15 |

<br>

Text-native PDFs skip OCR entirely. Haiku costs 20x less than Opus. Quota systems prevent runaway costs—when limits are reached, the system switches to a cheaper fallback model rather than failing.

### Target Use Cases

<br>

RAGStack serves a specific segment: cost-effective RAG for moderate-scale workloads.

**Well-suited for:**
* AWS-centric startups and SMBs needing document chat without significant infrastructure costs
* Enterprise innovation labs running multiple isolated proof-of-concept deployments
* Internal tool builders creating HR bots, IT support systems, or policy search engines
* Developers wanting personal knowledge bases without infrastructure overhead
* Organizations with data sovereignty requirements who need all processing within their AWS account

<br>

**Less suitable for:**
* Sub-50ms latency requirements (trading systems, real-time recommendations)
* Multi-cloud requirements (RAGStack is AWS-native)
* Mission-critical consumer search where latency directly impacts conversion
* Teams without AWS experience who prefer fully-managed SaaS

<br>

### Conclusion

<br>

RAGStack-Lambda addresses a gap in the RAG ecosystem: capable document intelligence at a price point accessible to small teams and individual developers. By leveraging serverless architecture and S3 Vectors storage, it eliminates the fixed costs that make traditional RAG prohibitive for moderate workloads.

The absence of an external control plane means your data stays in your account, under your control, within your compliance boundary. Combined with multimodal embeddings, media timestamp linking, automated metadata extraction, and broad integration options—MCP servers, web components, GraphQL APIs—RAGStack provides production-ready document AI without enterprise complexity or SaaS dependencies.

For use cases where sub-millisecond latency isn't critical but cost efficiency and data ownership are, RAGStack offers a practical path to production document AI.

---

<br>

### Links:

<br>

* https://github.com/HatmanStack/RAGStack-Lambda
* https://dhrmkxyt1t9pb.cloudfront.net/ (guest@hatstack.fun / Guest@123)
* https://aws.amazon.com/marketplace/pp/prodview-5afdiw2zrht6o (requires AWS sign-in to view)
