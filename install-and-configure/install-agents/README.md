---
title: Install Agents
---

# Install Legacy Agents

### Overview

Before installing the agent, we recommend to make yourself familiar with the general [Architecture](architecture.md).

You can also have a look at our new agent architecture, we call it [Outpost Agent](../install-outpost-agent-preview/). The Outpost Agent comes with less resource consumption and more fine grained deployment and permission model. We will deprecate the legacy agent somewhere in the future.

### Prerequisites

To install the agent, you must be able to access the following URLs via HTTPS (443) on your target environment:

* https://platform.steadybit.com (Platform)
* https://index.docker.io (Container Image; Kubernetes and Docker installation only)
* https://artifacts.steadybit.io (.deb and .rpm packages; Linux installation only)
* https://get.steadybit.com (Setup Scripts; one-liner for Docker or Linux installation only)
* https://steadybit.github.io/helm-charts (Kubernetes installation via helm only)

{% hint style="info" %}
If you want to check if your environment is properly configured to install and run an agent, you run our `env-check`tool on the target machine:

```
curl -sfL https://get.steadybit.com/env-check.sh | sh -s
```
{% endhint %}

### Setup of Host Agents

One option for agents to be installed is a host agent that runs on a physical host and discovers all targets running on that host. Therefore, we offer the following deployment options:

* [Docker](docker.md)
* [Kubernetes](kubernetes/)
* [Host](host.md)

More configuration options can be found in [Advanced Configuration](advanced-configuration.md)

### Setup of Cloud Service Agents

An alternative to the host agents are cloud service agents, which discover cloud services based on API discovery. We currently support only AWS and will extend it soon.

* [AWS Cloud Agent](aws-cloud/)
