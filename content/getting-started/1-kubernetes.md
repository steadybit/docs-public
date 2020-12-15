---
title: "How to install & use steadybit with Kubernetes locally"
navTitle: "Kubernetes locally"
---
This getting started will show you how to install and use steadybit locally with Kubernetes. We will run an ecommerce application in Kubernetes and find out how
it handles network latency. By using steadybit, we will slow down individual Kubernetes pods at the network level.

[Kubernetes](https://kubernetes.io/), also known as k8s, is an open source system for automating the deployment, scaling, and management of containerized
applications. We are using [minikube](https://minikube.sigs.k8s.io/docs/) to set up a local Kubernetes cluster on macOS, Linux or Windows.

## Prerequisites

- a running [minikube](https://minikube.sigs.k8s.io/docs/start/) installation
- a running [steadybit](https://www.steadybit.com/try-for-free) platform (Saas or on-prem)

## Step 1 - Start your minikube cluster

From a terminal, run:

```bash
minikube start
```

If you already have installed `kubectl` you can access your cluster with:

```bash
kubectl get po -A
```

If you don't have `kubectl` installed yet, check this out: [How to install kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

## Step 2 - Deploying the steadybit shopping-demo

In order to give you a quick and easy start, we have developed a small demo application. Our shopping demo is a small product catalog provided by 4 distributed
and scaled services.

First you need to download our shopping demo app, run following command:

```bash
git clone https://github.com/steadybit/shopping-demo.git
```

Now we use kubectl to deploy the demo by running the following command:

```bash
kubectl apply -f shopping-demo/
```

Verify that all Shopping Demo pods are running:

```bash
kubectl get pods --namespace steadybit-demo
```

You will see the following result, all pods are ready if you can see the status `Running`:

```bash
NAME                                  READY   STATUS    RESTARTS   AGE
fashion-bestseller-79b9698f88-557vt   1/1     Running   0          11s
gateway-7fc74f7f9b-tshzg              1/1     Running   0          11s
hot-deals-75cb898ff7-wrnxc            1/1     Running   0          10s
postgres-68f9db56cc-wxxth             1/1     Running   0          10s
toys-bestseller-6df5bd864f-kzrt9      1/1     Running   0          11s
```

The command `minikube tunnel` creates a route to services deployed with type LoadBalancer and sets their Ingress to their ClusterIP.

```bash
minikube tunnel
```

With the following command you can now determine the external IP and port to access the `gateway` LoadBalancer:

```bash
kubectl get svc -n steadybit-demo
```

Example response:

```bash
NAME                 TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
fashion-bestseller   NodePort       -------------    <none>        ----:-----/---   ---
gateway              LoadBalancer   10.98.173.27     127.0.0.1     80:30131/TCP     3h15m
hot-deals            NodePort       -------------    <none>        ----:-----/---   ---
product-db           NodePort       -------------    <none>        ----:-----/---   ---
toys-bestseller      NodePort       -------------    <none>        ----:-----/---   ---
```

Visit `http://{EXTERNAL-IP}:{PORT}/products` in your browser to retrieve the aggregated list of all products or just use `curl`:

```bash
curl http://{EXTERNAL-IP}:{PORT}/products
```

## Step 3 - Install steadybit agent

tbd...
