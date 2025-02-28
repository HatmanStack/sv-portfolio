---
title: 'Creating Plot Palette 100K with Cloud9 for LLM Training'
link: 'https://medium.com/@HatmanStack/creating-plot-palette-100k-with-cloud9-for-llm-training-7a63384ca329' 
description: 'A how to on managing and executing multi-threaded tasks efficiently despite API limitations.'
date: 'Jan 14, 2025'
time: '4 min read'
---

![Creating Plot Palette 100K](/blog/creating-plot-palette-100K.webp)

<a href="https://github.com/HatmanStack/plot-palette">Plot Palette</a> is a synthetic dataset created to fine tune LLMs for creative writing. Producing it was a journey over months with changes to models, APIs, licensing restrictions and model deployments. All added to the complexity of wrangling the data. It’s not perfect and probably won’t be but the techniques are repeatable so anyone can seed and create synthetic data, from multiple sources, for a variety of tasks.

I wanted to run this service continually without impacting my normal workflow. The solution, AWS Cloud9, an online Linux env based on CentOS. Memory options for Cloud9 dictate how many threads can be run at a time. The only limiting factors I encountered were from different API services used for inference.

In Cloud9 I chose a t3.small instance which has 2 gigs of memory. Each thread of the service consumed ~100MB — 150MB of memory, so running 10–12 threads is possible when accessing the ec2 instance (running your Cloud9 VM) from the service port. Otherwise, if working from the Cloud9 IDE, ~7 threads start to lag the IDE. The current iteration uses sleep to limit thread count. Here is **bash_script.sh**.

```bash
#!/bin/bash

# Path to your python script
PYTHON_SCRIPT= < absolute_path_to_start.py >
VENV_PATH= < absolute_path_to_venv >

# Interval in seconds
INTERVAL=7

# Activate the virtual environment
source $VENV_PATH

while true
do
    # Run the Python script
    nohup python3 $PYTHON_SCRIPT > /dev/null 2>&1 &
    sleep $INTERVAL
done

deactivate 
```

There are other ways to rate limit local threads that are much more robust. For example, searching ps for service thread instance count. To limit complexity, sleep works for this version.

The auto stop condition in AWS Cloud9, can be a gotcha. Autostop sometimes triggers from system load or errors. To keep our service running; navigate to home/ec2-user/.c9/autoshudown-configuration and enter a time in minutes, for restarts, alter our service to start with the instance. In **inference.service** we include Restart=always.

```bash
[Unit]
Description=Inference Service
After=network.target

[Service]
ExecStart= < absolute_path_to_bash_script.sh >
Restart=always
User=ec2-user

[Install]
WantedBy=multi-user.targe
```

Copy the service then enable/start it.

```bash
sudo cp inference.service /etc/systemd/system/
sudo systemctl enable inference.service
sudo systemctl start inference.service
sudo systemctl status inference.service
```

The last piece to run our service continually is holding state. We do this from **start.py** with a simple write folder file count.

```bash
import subprocess
import random
import os

directory = < absolute_path_of_write_folder >
stop_condition = < number_of_files_to_stop_inference > 

def count_files():
    file_count = 1
    for file in os.listdir(directory):
        file_path = os.path.join(directory, file)
        if os.path.isfile(file_path):
            file_count += 1
    return file_count


def inference():
    count = count_files()
    if count < stop_condition:

    # Random number used to Retrieve Data from main_dictionary.json or your own personal dataset
      poemNumber = str(random.randint(1, 6548))
      authorNumber = str(random.randint(1, 1583))
      dayNumber = str(random.randint(1, 9098))
      subprocess.run('sudo su -c "sync; echo 3 > /proc/sys/vm/drop_caches"; free -m;', shell=True)
      subprocess.run([ <absolute_path_to_python.exe_of_venv>, < absolute_path_to_current_inference.py> , str(count), poemNumber, authorNumber, dayNumber])
      
       
inference()
```

During creation I changed API providers several times with each having different rate limits, caps on daily usage or other restrictions.

Popular APIs to explore:
- <a href="https://groq.com/"><b>Groq</b></a>
  
  - Free to use
  - Has daily token limits per model

* <a href="https://huggingface.co/docs/api-inference/tasks/chat-completion"><b>HuggingFace</b></a>
  
  * Large pool of LLMs
  * Built-in tokenizers for prompts
  * Limitations:
    * 250 token limit on chat completions
    * Token-heavy jobs require chunking
    * <a href="https://huggingface.co/inference-endpoints/dedicated">Alternative</a>: Create custom endpoints without token restrictions

* <a href="https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html"><b>AWS Bedrock</b></a>
  
  * Limited LLM selection
  * Nearly unrestricted usage with quota increase
  
* <a href="https://www.together.ai/"><b>Together.ai</b></a>
  
  * Serverless architecture
  * 200+ models available
  * Recently added Llama 3.3 70B access
  
* <a href="https://github.com/bespokelabsai/curator"><b>Bespoke Curator</b></a>
  
  * All-in-one solution
  * Low code implementation
  * Not multithreaded

## 
Otherwise, the core components, **current_inference.py** and **chat_templates.py**, need to be customized based on your specific training data. While these files require manual configuration now, there’s an opportunity to develop a streamlined solution with a CloudFormation-based tool to ingest your data, create synthetic training pairs and output formatted data sets ready for LLM fine tuning. Simplifying the current process into a one-click deployment. Until then, enjoy Plot Palette.

![Creating Plot Palette 100K](/blog/creating-plot-palette-100K.gif)