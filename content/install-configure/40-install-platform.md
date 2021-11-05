---
title: "Install Platform (On-Prem)"
---

## Prerequisites

### Connectivity

To install the platform on your own premises, access to the following URL via HTTPS (443) is required:

* https://docker.steadybit.io and https://index.docker.io (Docker image)
* https://steadybit.github.io/helm-charts (when using Kubernetes and Helm)

The platform itself exposes the following ports:

* Port 8080: Application port for UI/API
* Port 7878: Acceptor port for agents

### Container/Docker

The platform will be delivered as a Docker image. Currently the following Docker versions are supported:

* 20.10+
* 19.03+
* 18.03+
* 1.13

### Machine Requirements (minimum)

The machine you are installing steadybit onto, must have 4 CPUs and 8 GB available memory.

## Setup

Please choose one of the following deployment options:

* [Docker](40-install-platform/10-docker)
* [Kubernetes](40-install-platform/20-k8s)

More configuration options can be found in [Advanced Configuration](40-install-platform/30-advanced-configuration)
