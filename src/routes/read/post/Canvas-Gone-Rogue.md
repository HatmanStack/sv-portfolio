---
title: 'Canvas Gone Rogue: Art meets chaos, with a side of jailbreak' 
link: 'https://medium.com/@HatmanStack/aws-nova-canvas-gone-rogue-art-meets-chaos-with-a-side-of-jailbreak-1f4cc2ba7c96' 
description: 'Challenges encountered when developing the AWS Nova Canvas Gradio App.'
date: 'Jan 9, 2025'
time: '2 min read'
---

![Canvas Gone Rogue](/blog/canvas-gone-rogue-1.webp)

In retrospect, I probably should have seen the warning signs. Seven different image generation modes, one <a href="https://t7bmxtdc6ojbkd3zgknxe32xdm0oqxkw.lambda-url.us-west-2.on.aws/">demo app</a>. What could go wrong? (Subtitle: Why we can’t have nice things)

Nova Canvas is AWS’s latest text-to-image diffusion model. With seven different modes including Text to Image, Inpainting, Outpainting, Image Variation, Image Conditioning, Color Guided, and Background Removal, it’s the Swiss Army knife of image generation. Each mode brings its own special kind of magic.

![Canvas Gone Rogue](/blog/canvas-gone-rogue-2.gif)

I wasn’t the only one excited about these new tools. The app lit up like Times Square on New Year’s and, plot twist — no rate limits. Nothing quite captures the thrill of success like watching your forecasted cloud budget implode!

With no backend setup, I didn’t have visiblity into what users were creating. “Exceptional people creating the next impressionist movement,” I told myself, riding high on the traffic spike.

Creating a simple boto3 call to s3 for monitoring destroyed my fragile fairy tale. Some jabroni had used the Image Variation mode to jailbreak Canvas. They were creating NSFW content layering in images with high similarity.

I needed an extra layer of protection to tackle user-uploaded images. My solution was an open-source NSFW check, because sometimes the best defense is a good pre-defense. With a rate limiter to handle those inevitable traffic spikes, I was good to go.

Despite the issues in content moderation and the occasional cloud cost surprise, working with Nova Canvas has been buttery smooth. From a cost perspective, the AWS team has truly created something game-changing. It’s been fascinating to see how people <a href="https://t7bmxtdc6ojbkd3zgknxe32xdm0oqxkw.lambda-url.us-west-2.on.aws/">use it</a> (mostly).

<img src="/blog/canvas-gone-rogue-3.gif" width="250" height="200" alt="Canvas Gone Rogue">