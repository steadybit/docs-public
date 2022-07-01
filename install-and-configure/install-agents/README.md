---
title: Install Agents
---

# Install Agents

### Prerequisites

To install the agent, you must be able to access the following URLs via HTTPS (443) on your target environment:

* https://platform.steadybit.io (Platform)
* https://docker.steadybit.io and https://index.docker.io (Docker Image)
* https://artifacts.steadybit.io (Linux Installation)
* https://licenses.steadybit.io (License Validation)
* https://get.steadybit.io (Setup Scripts)
* https://steadybit.github.io/helm-charts (when using Kubernetes and helm)

### Setup of Host Agents

One option of agents to be installed is a host agent that runs on a physical host and discovers all targets running on that host. Therefore, we offer the following deployment options:

* [Docker](docker.md)
* [Kubernetes](kubernetes/README.md)
* [Host](host.md)

More configuration options can be found in [Advanced Configuration](../install-agents/advanced-configuration.md)

### Setup of Cloud Service Agents

An alternative of the host agents are cloud service agents which discover cloud services based on API discovery. We currently support only AWS and will extend it soon.

* [AWS Cloud Agent](../install-agents/aws-cloud/README.md)