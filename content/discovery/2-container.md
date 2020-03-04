---
title: "Container Discovery"
navTitle: "Container"
---

## Docker

The agent discovers any running container communication with the docker daemon using `/var/run/docker.sock`.
You can configure a different docker socket by setting the environment variable `CHAOSMESH_DOCKER_SOCKET` for the agent.

For each container the following attributes are provided:
 * Container Name
 * Container Image
 * Container Host
 * Container Ports
 * Container Labels

## Kubernetes

In case the containers are running inside Kubernetes the following additional information is provided:
 * Pod Name
 * Pod Namespace
 * Kubernetes Container Name
 * `app.kubernetes.io/` labels

### Kubernetes API Server

Our agent is able to communicate directly with the `Kubernetes API Server` to get more details about containers and pods.
This optional feature can be given to the agents when deploying the `DaemonSet` by setting up a `ServiceAccount`.

Additional information is provided by `
* Deployments
* ReplicaSets
* StatefulSets
* DaemonSets



