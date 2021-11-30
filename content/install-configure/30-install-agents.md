---
title: "Install Agents"
---

## Prerequisites

To install the agent, access to the following URLs via HTTPS (443) is required:

* https://docker.steadybit.io and https://index.docker.io (Docker Image)
* https://artifacts.steadybit.io (Bundles)
* https://licenses.steadybit.io (License Validation)
* https://get.steadybit.io (Setup Scripts)
* https://steadybit.github.io/helm-charts (when using Kubernetes and helm)

## Setup

Please choose one of the following deployment options:

* [Docker](30-install-agents/10-docker)
* [Kubernetes DaemonSet](30-install-agents/20-kubernetes)
* [Host](30-install-agents/30-host)

More configuration options can be found in [Advanced Configuration](30-install-agents/50-advanced-configuration)
