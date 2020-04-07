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

```bash
curl -sfL https://get.chaosmesh.io/agent.sh | sh -s -- -a <agent-key> -e <platform-url>
```

## Manual setup

First login to the chaosmesh Docker Registry:

```bash
docker login -u=_ -p=<agent-key> docker.chaosmesh.io
```

Then run the chaosmesh Agent Container:

```bash
sudo docker run \
  --detach \
  --name chaosmesh-agent \
  --volume /var/run:/var/run \
  --privileged \
  --net=host \
  --pid=host \
  --ipc=host \
  --env="CHAOSMESH_AGENT_KEY=<agent.key>" \
  --env="CHAOSMESH_AGENT_REGISTER_URL=<platform-url>" \
  docker.chaosmesh.io/chaosmesh/agent
```

## Static Agent

We also provide a static version of docker image `docker.chaosmesh.io/chaosmesh/agent-static` having which already includes all features and has the auto-updates disabled by default.

## Non-privileged container

In case you need to run the container non-privileged you can add the individual capabilities:
```bash
--security-opt apparmor:unconfined \
sudo docker run \
  --detach \
  --name chaosmesh-agent \
  --volume /var/run:/var/run \
  --cap-add=NET_ADMIN \
  --cap-add=SYS_BOOT \
  --cap-add=SYS_TIME \
  --cap-add=KILL \
  --security-opt apparmor:unconfined \
  --net=host \
  --pid=host \
  --ipc=host \
  --env="CHAOSMESH_AGENT_KEY=<agent-key>" \
  --env="CHAOSMESH_AGENT_REGISTER_URL=<platform-url>" \
  docker.chaosmesh.io/chaosmesh/agent
```
