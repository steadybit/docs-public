---
title: "Install Agent as Docker Container"
navTitle: "Docker Container"
---

## Prerequisites

To use chaosmesh with the SaaS platform you only need a docker installation on the host where the attacks will be executed.
In a future release we will provide more installation options.

## Oneliner 

The agent container image is available in the chaosmesh Docker Registry.
Please note that the container needs to run in a privileged mode, allowing it to discover and attack your Infratructure.
And check before installation whether the platform is accessible via the corresponding ports (443 and 7878).

```sh
curl -sfL https://get.chaosmesh.io/agent.sh | sh -s -- -a <api-key> -e <platform-url>
```

## Manual setup

First login to the chaosmesh Docker Registry:

```sh
docker login -u=_ -p=<apikey> docker.chaosmesh.io
```

Then run the chaosmesh Agent Container:

```sh
sudo docker run \
  --detach \
  --name chaosmesh-agent \
  --volume /var/run:/var/run \
  --volume /run:/run \
  --volume /dev:/dev \
  --volume /sys:/sys \
  --volume /var/log:/var/log \
  --privileged \
  --net=host \
  --pid=host \
  --ipc=host \
  --env="CHAOSMESH_AGENT_API_KEY=<apikey>" \
  --env="CHAOSMESH_AGENT_REGISTER_URL=<platform-url>" \
  docker.chaosmesh.io/chaosmesh/agent
```
