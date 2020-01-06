---
title: "Install as Docker Container"
---

### Oneliner 

The agent container image is available in our private Docker Registry.
Please note that the container needs to run in a privileged mode, allowing it to discover and attack your Infratructure.

```sh
curl -sfL https://get.chaosmesh.io/agent.sh | sh -s -- -a <api-key>
```

### Manual setup

First login to the chaosmesh Docker Registry:

```sh
docker login -u=_ -p=<apikey> docker.chaosmesh.io
```

Then simply run the chaosmesh Platform Container:

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
  docker.chaosmesh.io/chaosmesh/agent
```
