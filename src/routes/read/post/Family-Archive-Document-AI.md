---
title: 'Family Archive - Document AI'
link: 'https://github.com/HatmanStack/family-archive-document-ai'
description: "Have a conversation with your family's memories. One-click AWS deployment, everything stays in your account."
date: 'Feb 4, 2026'
time: '5 min read'
---

<br>
What if you could ask your family's photo collection a question and get an answer?
<br>
<br>
"Show me pictures of Grandma at the beach." "What did Dad write about in his letters from '92?" "Find that video where Mom talks about growing up in Texas."

Family Archive turns your photos, videos, audio recordings, and documents into a searchable, conversational knowledge base. Upload your memories, and start talking to them.

## How It Works

When you upload media, RAGStack creates embeddings—mathematical representations of the content. Photos get analyzed. Audio gets transcribed. Documents get parsed. Everything becomes searchable through semantic search and a chat UI.

Ask a question. Get results with context. Have an actual conversation with decades of family history.

## One-Click Deploy

Everything runs in your AWS account. Your data never leaves your control.

<p align="center"><a href="https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?templateURL=https://hold-that-thought-quicklaunch-public-631094035453.s3.us-east-1.amazonaws.com/hold-that-thought-template.yaml">Launch Stack</a></p>

Click the button. Fill in a stack name. Wait for CloudFormation to finish. You've got a fully functional family archive platform with:

- **Amplify-hosted frontend** - SvelteKit app, auto-configured
- **API Gateway + Lambda** - Serverless backend, scales to zero
- **DynamoDB** - Single-table design for all your data
- **S3** - Media storage with presigned URLs
- **Cognito** - User auth with optional Google OAuth
- **RAGStack** - Embeddings, vector search, chat UI

<br>
No CLI. No YAML editing. No config files. One click.

## Optional: Gemini Transcription

Got handwritten letters? Scanned correspondence from decades past? Add a Google Gemini API key and the platform will transcribe them automatically. Grandma's cursive becomes searchable text.

Skip it if you don't need it. RAGStack still indexes everything else.

## What You Can Do

- **Upload photos** - Browse a gallery. Comments and reactions. Categories and tags.
- **Archive letters** - AI transcription. Version history. Revert bad edits.
- **Send messages** - Private conversations between family members. File attachments.
- **Search semantically** - "Pictures from Christmas 2019" finds what you mean, not just keyword matches.
- **Chat with your archive** - Ask questions. Get answers with sources. Have a conversation.

## Your Data, Your Account

This isn't a SaaS product where your family photos live on someone else's servers. Everything deploys to your AWS account:

- Media stored in your S3 buckets
- Data in your DynamoDB tables
- Embeddings in your vector store
- Auth through your Cognito user pool

<br>
Delete the CloudFormation stack, everything's gone. Export your data anytime. No vendor lock-in.

## Cost

Everything scales to zero. When no one's using the app, you're not paying for compute—just storage. When someone uploads a photo or searches the archive, resources spin up, do the work, and shut down. You pay for what you use.

A small family sharing memories doesn't use much.

## Try It

Live demo with guest login: [showcase-htt.hatstack.fun](https://showcase-htt.hatstack.fun)

Source: [github.com/HatmanStack/family-archive-document-ai](https://github.com/HatmanStack/family-archive-document-ai)
