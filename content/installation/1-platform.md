---
title: "Platform"
metaTitle: "Installation - chaosmesh Platform"
metaDescription: "Installing the chaosmesh Platform"
---

# Docker

The platform container image is available in our private Docker Registry.

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
  --env="SPRING_DATASOURCE_URL=<replace-with-jdbc-url>" \
  --env="SPRING_DATASOURCE_USERNAME=<replace-with-jdbc-url>" \
  --env="SPRING_DATASOURCE_PASSWORD=<replace-with-jdbc-url>" \
  docker.chaosmesh.io/chaosmesh/release/platform
```
