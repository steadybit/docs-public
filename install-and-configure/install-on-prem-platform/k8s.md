---
title: Install on Kubernetes
navTitle: Kubernetes
---

# Install on Kubernetes

{% hint style="info" %}
This part of the documentation is only intended in the context of a supported PoC (Proof of Concept) together with the Steadybit team. Please, [book an appointment](https://www.steadybit.com/book-demo) to scope your PoC before continuing to evaluate the on-prem solution.

If you just want to try out Steadybit, we recommend you [sign up for our SaaS platform](https://signup.steadybit.com).
{% endhint %}

When using Kubernetes there are two approaches to setup the platform: Using helm or the manifest directly via \`kubectl. We recommend to use the Helm chart.

* [Installation using Helm chart](k8s.md#installation-using-helm-chart)
* [Local test setup via Minikube and NGINX ingress](k8s.md#local-test-setup-via-minikube-and-nginx-ingress)

#### Installation using Helm chart

To install the platform via the chart, first retrieve your Steadybit agent key from the [setup page](https://platform.steadybit.com/settings/agents/setup) in the SaaS platform and run the following commands.

Add repo and update contents:

```bash
helm repo add steadybit https://steadybit.github.io/helm-charts
helm repo update
```

Install platform:

```bash
helm install steadybit-platform \
  --create-namespace \
  --namespace steadybit-platform \
  --set platform.tenant.agentKey=<replace-with-agent-key> \
  steadybit/steadybit-platform
```

To configure the installation, specify the values on the command line using the --set flag, or provide a yaml file with your values using the -f flag.

For a detailed list of all the configuration parameters, please see our [GitHub Repository](https://github.com/steadybit/helm-charts/tree/main/charts/steadybit-platform).

#### Local setup via Minikube and NGINX ingress

First install Minikube to run on your system: https://minikube.sigs.k8s.io/docs/start

Start the cluster and enable the ingress resource:

```
minikube start
minikube addons enable ingress
```

Verify the ingress is running

```
kubectl get pods -n ingress-nginx
```

Install the platform using helm (and some modifcations to make it available on port 80)

```
helm upgrade --install steadybit-platform \
  --create-namespace \
  --namespace steadybit-platform \
  --set platform.tenant.agentKey=<replace-with-agent-key> \
  --set platform.publicWebsocketPort=80 \
  --set platform.service.type=ClusterIP \
  --set-string "ingress.annotations.nginx\.ingress\.kubernetes\.io/proxy-read-timeout=3600" \
  --set-string "ingress.annotations.nginx\.ingress\.kubernetes\.io/proxy-send-timeout=3600" \
  steadyit/steadybit-platform
```

Make the ingress accessible

```
minikube tunnel
```

Now you should be able to access the platform in your browser on http://localhost
