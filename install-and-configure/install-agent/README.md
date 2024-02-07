# Install Agent

### Overview

Before installing the agent, we recommend to make yourself familiar with the general [Agent Architecture](agent-architecture.md).

### Prerequisites

To install the agent, you must be able to access the following URLs via HTTPS (443) on your target environment:

* https://platform.steadybit.com (Platform)
* https://artifacts.steadybit.io (.deb and .rpm packages; Linux installation only)
* https://get.steadybit.com (Setup Scripts; one-liner for Docker or Linux installation only)
* https://steadybit.github.io (Kubernetes installation via helm only)
* https://ghcr.io and https://github.com (Container Images; Kubernetes and Docker installation only)

{% hint style="info" %}
If you want to check if your environment is properly configured to install and run an agent, you run our `env-check`tool on the target machine:

```
curl -sfL https://get.steadybit.com/env-check.sh | sh -s
```
{% endhint %}

### Setup of Agents

We offer the following deployment options:

* [Docker](install-as-docker-container.md)
* [Kubernetes](install-on-kubernetes.md)
* [Host](install-on-linux-hosts.md)

More configuration options can be found in [Advanced Configuration](advanced-configuration.md)
