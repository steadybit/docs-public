---
title: Install On-Prem Platform
---

# Install On-Prem Platform

{% hint style="info" %}
This part of the documentation is only intended in the context of a supported PoC (Proof of Concept) together with the Steadybit team.
Please, [book an appointment](https://www.steadybit.com/request-demo) to scope your PoC before continuing to evaluate the on-prem solution.

If you just want to try out Steadybit, we recommend you [sign up for our SaaS platform](https://signup.steadybit.com).
{% endhint %}


This guide helps you with the initial installation and deployment of our steadybit platform On-Premise. It is explicitly of use for spaces where it is not yet possible to take advantage of our Software as a Service (SaaS) platform and the need to host our platform yourself. After completing this getting started, continue by [setting up steadybit](../install-agents/)

Installing and deploying the steadybit platform on your servers is simple:

* [Step 0 - Check Prerequisites](./#step-0---check-prerequisites)
* [Step 1 - Get your key](./#step-1---get-your-keys)
* [Step 2 - Deploy Platform](./#step-2---deploy-platform)

If you need help, please [reach out to us](https://www.steadybit.com/contact).

### Step 0 - Check Prerequisites

Before continuing, make sure that access to the following URLs via HTTPS (443) is possible from your location of installation:

* https://docker.steadybit.io and https://index.docker.io (Docker Image)
* https://artifacts.steadybit.io (Agent Linux Installation)
* https://get.steadybit.com (Setup Scripts)
* https://steadybit.github.io/helm-charts (when using Kubernetes and helm)

The platform itself exposes the following ports:

* Port 8080: Application port for UI/API
* Port 7878: Acceptor port for agents

### Step 1 - Get your keys

The agent key is needed to install the platform and connect the steadybit agents against it. Get in touch with us and we will provide you an on-prem license and an agent key.

### Step 2 - Deploy Platform using Kubernetes Helm Charts

It is our goal to make the installation as easy as possible for you, that's why we recommend you to use our Helm chart that takes a lot of the work out of it and only requires a few parameters from you. If you are not familiar with Helm and would like to learn more about it, check out [helm's QuickStart](https://helm.sh/docs/intro/quickstart/)

{% hint style="info" %}
In case you can't use Helm or Kubernetes at all, get in touch with us and we'll find the best solution. The platform kan be deployed without Helm and also on plain Docker hosts.&#x20;
{% endhint %}

Please replace the placeholder `replace-with-agent-key` with your agent key copied in [Step 1 - Get your key](./#step-1---getyourkey) and start the helm chart installation with:

```bash
helm repo add steadybit https://steadybit.github.io/helm-charts
helm repo update
helm install steadybit-platform \
  --create-namespace \
  --namespace steadybit-platform \
  --set platform.tenant.agentKey=<replace-with-agent-key> \
  steadybit/steadybit-platform
```

To make it convenient for you, we have a default for everything. That's also why we include the necessary Postgres database and set up everything for you automatically. Nevertheless, feel free to adjust parameters after having a look on the helm chart in our public [GitHub repository](https://github.com/steadybit/helm-charts/tree/master/charts/steadybit-platform).

> **BE AWARE:** The database is not backed up and if the pod is deleted the data is lost!
>
> For productive usage, we strongly recommend to setup your own Postgres database and configure the steadybit platform as described [here](advanced-configuration.md).

In case you prefer to deploy our steadybit platform using Kubernetes directly instead of the helm chart, you can find everything you need [here](k8s.md#installation-using-kubectl).

See also [Kubernetes](k8s.md) for further informations about the setup with Kubernetes.

### What's next?

Done, the platform is running. The default login for the on-prem platform is

* username: admin
* password: admin

Now you can set it up by connecting the first agents to it.

We'll show you how to do that in our getting started [Set up Platform & Agents](../../quick-start/set-up-agents.md), at step 1.

#### Productive Usage

As mentioned above, this getting started helped to set up quickly a steadybit platform.

Before using steadybit

* configure your own Postgres database as [described here](advanced-configuration.md#database-configuration).
* we recommend to use your internal authorization services such as LDAP or OIDC provider as [described here](advanced-configuration#ldap-authentication).

#### Advanced Configuration

More configuration options can be found in [Advanced Configuration](advanced-configuration.md)

#### Troubleshooting

If you have any problems, check our [Troubleshooting](troubleshooting.md) page. Or please [reach out to us](https://www.steadybit.com/contact).
