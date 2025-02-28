---
title: "Android Studio in the Browser"
link: "https://medium.com/@HatmanStack/android-studio-in-the-browser-dcada6243442"
description: "Transform any computer into a powerful Android development machine."
date: "May 25, 2019"
time: "4 min read"
---

Anybody who’s used Google’s IDE for Android development is familiar with all the pain points that come with it. It can be a drain on resources and a bear to get all the pieces working together. Using GCP, VNCveiwer and Chrome any computer can become a development machine with some of the backend pain eliminated. To get started, go to google cloud console and create a project. In the upper right hand side of the window there should be an icon for google cloud shell.

![Android Studio in Browser](/blog/android-studio-in-the-browser-1.webp)

Once the shell is available you have your choice of disk images to enable virtualization (necessary for the AVD to work). We use the command

```bash
gcloud compute disks create disk1 --image-project debian-cloud \
--image-family debian-9 --zone us-central1-b
```

in this demo we’ll be using debian 9 stretch. Once that image has been created we’ll use it to create an <a href="https://cloud.google.com/compute/docs/images">image</a> that is licensed for virtualization.

```bash
gcloud compute images create nested-vm-image \
--source-disk disk1 --source-disk-zone us-central1-b \
--licenses "https://www.googleapis.com/compute/v1/projects/
                vm-options/global/licenses/enable-vmx"
```

Now we can close the shell window and use the left side pane to navigate to Compute Engine. We want Create Instance at the top of the page. Create a VM with the boot disk we just made. Click Change and move to the Custom images tab. Choose our image and resize the disk to >30GB. Create your VM and connect to it using SSH. Once it connects

```bash
sudo apt-get update
tasksel --list-tasks

# From here pick out your favorite desktop environment and install
sudo tasksel -install xfce-desktop

# We need a VNC server to remote in to our VM 
sudo apt-get install tightvncserver
vncserver
```

This prompts us for a password on the first run. After entering it we have our server up and running. (At this point I usually enter

```bash
vncserver -kill :1
vncserver -geometry 1920x1080
```

for a bigger development space).

![Android Studio in Browser](/blog/android-studio-in-the-browser-2.webp)

## Open Ports

In Compute Engine, next to our VM instance, click the dots and choose view network details. In the left hand pane select Firewall and then Create Firewall Rule at the top. The fields that are important for us are Targets, Source Filters and Protocols/Ports. In the Targets field enter Specified service account. The Source filter should match with Service account. In the Protocols and Ports click tcp and enter 5901. Save your rule and move on to the Chrome Web Store.

## VNC Viewer

Search for VNC viewer in the Web Store and select one(realvnc). Start it up and enter your VM’s external ip(found in Compute Engine next to the VM name) followed by :5901. After connecting, it notifies us that the data is unencrypted and asks for our password. Enter the password you created and choose your config.

## Studio Setup

We need a browser to get Android Studio going and the best way is through a terminal. Head to the top left and select Terminal emulator.

```bash
sudo apt-get install chromium
chromium
```

Use chromium to download Studio. Move to the Downloads folder right-click and open terminal.

```bash
tar -xf *.gz
```

![Android Studio in Browser](/blog/android-studio-in-the-browser-3.webp)

Install Studio as normal with an emulator. We need to allow our Studio installation to access the virtualization. Move to a terminal and enter

```bash
sudo chown user_name /dev/kvm
```

(user_name is to the left of the VM name in your terminal window). Now edit your AVD to use Emulated Performance Graphics: Software and you’re set up.

## Conclusion

The biggest perk of this build is spinning up VM’s that scream and decrease build times. Some other builds I had success with.

## Ubuntu

I had increased performance from the AVD using

```bash
--image-project ubuntu-os-cloud --image-family ubuntu-1804-lts
sudo apt-get install mate-desktop-environment
```

and include

```bash
sudo dpkg --add-architecture
sudo apt-get update
sudo apt-get libstdc++6:i386 libgcc1:i386 zlib1g:i386 /
            libncurses5:i386 libc6:i386 lib32z1 libbz2-1.0:i386
```

when setting up the AVD.

## CentOS 7

```bash
--image-project centos-cloud  --image-family centos-7
sudo yum update
sudo yum groups list
sudo yum groupinstall "GNOME Desktop" "Graphical Administration Tools"
sudo systemctl set-default graphical.target
sudo reboot
sudo yum install tigervnc-server
sudo vncpasswd
# Regular install of Android Studio choosing 
# Auto for Graphics on the Android Virtual Device
```

## New Flavors

All of these OS frameworks can have multiple environments installed. The simplest way to switch between them is by using the ~/.vnc/xstartup file. By modifying it to include the startup for the current environment you’d like.

```bash
#!/bin/sh
export XKL_XMODMAP_DISABLE=1    # Allows Keyboard keys to be mapped 
                                # correctly in tightvncserver
startxfce4  # start command for xfce
```

