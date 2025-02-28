---
title: 'Cloud Bound: Hugging Face Spaces'
link: 'https://medium.com/@HatmanStack/cloud-bound-hugging-face-spaces-1101c569690d' 
description: 'Streamline inference pipelines with Hugging Face Spaces API and Docker setup.'
date: 'Sep 29,2023'
time: '3 min read'
---

![Cloud Bound HuggingFace Spaces](/blog/cloud-bound-huggingface-spaces-1.webp)

Anyone who builds things knows it can get messy. The <a href="https://hatman-pixel-prompt.hf.space/">demo</a> for this Cloud Bound series was one of those times. I ran into glitches with Hugging Face Spaces that were avoidable with the right resources. Resources that you’ll know about by the end of this post. Let’s light this candle!

<img src="/blog/cloud-bound-huggingface-spaces-2.gif" width="300" height="300" alt="Canvas Gone Rogue">

Cloud environments can be challenging when going serverless. Our demo on Hugging Face Spaces uses Hugging Faces’s Inference-API to eliminate the complexity of building an inference pipeline. Hugging Face’s Inference-API has a free tier using a shared framework that fits most non-production use cases. For production workloads, Hugging Face <a href="https://huggingface.co/inference-api">offers plans</a> that fit the needs of small or large-scale projects.

To build our Hugging Face Docker container, first create a config entry at the top of README.md where Hugging Face’s build process finds all the necessary configuration details. The <a href="https://huggingface.co/docs/hub/spaces-config-reference">documentation</a> provides alternatives to many default settings.

```bash
title: React Native Serve Ml
emoji: 🔥
colorFrom: red
colorTo: blue
sdk: docker
pinned: false
license: mit
```

When setting up a single container, from our react-native root directory build the static files with **yarn build**. This outputs a web-build folder that can be copied into the container’s root directory.

In FastAPI, we utilize the <em>FileResponse</em> and <em>StaticFiles</em> utilities to establish the frontend of our application. To serve the static files of the frontend, specify the container directory containing the static content. Afterwards, pass the path to our <em>index.html</em> to the <em>FileResponse</em> utility, after it has been copied to our container using the Dockerfile.

```bash
app.mount("/", StaticFiles(directory="web-build", html=True), name="build")

@app.get('/')
def homepage() -> FileResponse:
    return FileResponse(path="/app/build/index.html", media_type="text/html")
```

The necessary changes to our Dockerfile are outlined below. The primary focus is on creating a non-root user, allowing us to utilize the __pycache__ directory for Torch. While it's not mandatory for our inference endpoint, I've chosen to include it for completeness.

```bash
# Use the official lightweight Python image.
FROM python:3.10-slim

# Copy the local code to the container image.
WORKDIR /app
COPY . ./

# Install production dependencies.
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Set up a new user named "user" with user ID 1000
RUN useradd -m -u 1000 user

# Switch to the "user" user
USER user

# Set home to the user's home directory
ENV HOME=/home/user \
 PATH=/home/user/.local/bin:$PATH

# Set the working directory to the user's home directory
WORKDIR $HOME/app

# Copy the current directory contents into the container at $HOME/app setting the owner to the user
COPY --chown=user . $HOME/app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"] 
```

Now we have a Docker Hugging Face Space that can serve our models and use a familiar frontend framework.

<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/wGu5v0_txxI?si=mtE150ijVxZ-9ZQm" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  referrerpolicy="strict-origin-when-cross-origin" 
  allowfullscreen>
</iframe>
