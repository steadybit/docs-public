---
title: Install On-Prem Platform on Minikube
navTitle: Minikube
---

# Install on Minikube

{% hint style="info" %}
This part of the documentation is only intended in the context of a supported PoC (Proof of Concept) together with the Steadybit team. Please, [book an appointment](https://www.steadybit.com/book-demo) to scope your PoC before continuing to evaluate the on-prem solution.

If you just want to try out Steadybit, we recommend you [sign up for our SaaS platform](https://signup.steadybit.com).
{% endhint %}

This guide helps you with the initial installation and deployment of our Steadybit platform On-Premise on a Minikube with NGINX ingress. It is explicitly of use for spaces where you just want to try out the platform and can't take advantage of our Software as a Service (SaaS) platform. After completing this getting started, continue by [setting up Steadybit](../install-agent/).

Installing and deploying the Steadybit platform on your machine is simple:

* [Step 0 - Check Prerequisites](minikube.md#step-0-check-prerequisites)
* [Step 1 - Get your keys](minikube.md#step-1-get-your-keys)
* [Step 2 - Install Minikube](minikube.md#step-2-install-minikube)
* [Step 3 - Deploy Platform](minikube.md#step-3-deploy-platform-on-minikube)

## Step 0 - Check Prerequisites

Before continuing, make sure that access to the following URLs via HTTPS (443) is possible from your location of installation:

* https://docker.steadybit.io and https://index.docker.io (Docker Image)
* https://packages.steadybit.com (Agent Linux Installation)
* https://get.steadybit.com (Setup Scripts)
* https://steadybit.github.io/helm-charts (when using Kubernetes and helm)

The platform itself exposes the following ports:

* Port `8080`: Application port for UI/API
* Port `7878`: Acceptor port for agents

## Step 1 - Get your keys

To install the platform on-premise and connect the agents against it you need an agent key and a valid license.\
Get in touch with us and we will provide you an on-prem license key and an agent key.

## Step 2 - Install Minikube

First install Minikube to run on your system: https://minikube.sigs.k8s.io/docs/start

Start the cluster and enable the ingress resource:

```bash
minikube start
minikube addons enable ingress
```

Verify the ingress is running

```bash
kubectl get pods -n ingress-nginx
```

## Step 3 - Deploy Platform on Minikube

Add repo and update contents:

```bash
helm repo add steadybit https://steadybit.github.io/helm-charts
helm repo update
```

Install the platform using a parameterized helm script to make the platform available on port 80. You also need to replace the placeholders `replace-with-agent-key` and `replace-with-license-key` with your agent key and license key of [Step 1 - Get your keys](minikube.md#step-1-get-your-keys):

```bash
helm upgrade --install steadybit-platform \
  --create-namespace \
  --namespace steadybit-platform \
  --set platform.tenant.agentKey=<replace-with-agent-key> \
  --set platform.tenant.license=<replace-with-license-key> \
  --set platform.publicWebsocketPort=80 \
  --set platform.service.type=ClusterIP \
  --set-string "ingress.annotations.nginx\.ingress\.kubernetes\.io/proxy-read-timeout=3600" \
  --set-string "ingress.annotations.nginx\.ingress\.kubernetes\.io/proxy-send-timeout=3600" \
  steadybit/steadybit-platform
```

Make the ingress accessible

```bash
minikube tunnel
```

Now you should be able to access the platform in your browser on http://localhost
