---
title: "Discovery of Container Targets"
navTitle: "Container Targets"
---

## Docker

The agent discovers any running container communication with the docker daemon using `/var/run/docker.sock`.
You can configure a different docker socket by setting the environment variable `STEADYBIT_DOCKER_SOCKET` for the agent.

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
This optional feature can be given to the agents when deploying the `DaemonSet` by setting up a `ServiceAccount` and limit the access by using a `RBAC Authorization`.

Additional information is provided by `
* Deployments
* ReplicaSets
* StatefulSets
* DaemonSets

Our central platform prepares this additional information and uses it to identify new potential targets.
Thus it is possible to attack a dedicated Kubernetes `Deployment` or to cause failures in a `ReplicaSet`.

We have described how this can be achieved and what is required in the [Install on Kubernetes](../../install-configure/30-install-agents/20-daemonset) section.

