---
title: "Install as Docker Container"
---

The agent container image is available in our private Docker Registry.
Please note that the container needs to run in a privileged mode, allowing it to discover and attack your Infratructure.

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
  --env="CHAOSMESH_AGENT_REGISTER_URL=http://platform.chaosmesh.io" \
  docker.chaosmesh.io/chaosmesh/release/agent
```
