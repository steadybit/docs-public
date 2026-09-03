# Install on Kubernetes/OpenShift

This method will install the Steadybit Agent on your Kubernetes Cluster using [Helm](https://helm.sh), so you need to have Helm installed.

## Prerequisites

You must be able to access the following URLs via HTTPS (443) on your target environment:

* https://platform.steadybit.com (Platform)
* https://steadybit.github.io (Kubernetes Helm repository)
* https://ghcr.io and https://github.com (Container Images)

## Installation

To deploy the agent to Kubernetes, you can copy the installation script from the [setup page](https://platform.steadybit.com/settings/agents/setup) in the SaaS platform.

Alternatively, you can update the script below with the name of your Kubernetes cluster and your agent key, which you find in the platform's [setup page](https://platform.steadybit.com/settings/agents/setup).

Just run the script while connected to your Kubernetes cluster.

```shell
helm repo add steadybit https://steadybit.github.io/helm-charts
helm repo update
helm install steadybit-agent --namespace steadybit-agent \
  --create-namespace \
  --set agent.key=<replace-with-agent-key> \
  --set global.clusterName=<replace-with-cluster-name> \
  steadybit/steadybit-agent
```

To configure the installation, specify the values on the command line using the `--set` flag, or provide a YAML file with your values using the `-f` flag.

For more configuration options have a look at our [steadybit/helm-charts repository](https://github.com/steadybit/helm-charts/tree/main/charts/steadybit-agent).

### Configure Container Runtime

By default, the agent assumes that your cluster uses the `containerd` runtime. If this is not the case, you need to add `--set extension-container.container.engine=docker` or `cri-o`.

#### Determine Container Runtime on a Node

In case of a managed Kubernetes service, there might be a vendor-specific method to check the container runtime. In case you have access on the `kubectl`, you can get the container runtime via

```shell
kubectl get nodes -o wide
```

The column `CONTAINER-RUNTIME` shows you the runtime you are using. You can find more details in the [official Kubernetes documentation](https://kubernetes.io/docs/tasks/administer-cluster/migrating-from-dockershim/find-out-runtime-you-use/).

### Configure custom On-Prem Platform

If you are running on-prem, make sure to set the URL of the platform: `--set agent.registerUrl=<your-platform-url>`

### Extensions

The agent's purpose is to establish communication between the platform and your systems. Discovering your systems, and bringing Chaos Engineering to a given technology, is the job of extensions.
By default, the official Helm chart already installs the extensions [extension-container](https://hub.steadybit.com/extension/com.steadybit.extension_container), [extension-host](https://hub.steadybit.com/extension/com.steadybit.extension_host), [extension-http](https://hub.steadybit.com/extension/com.steadybit.extension_http) and [extension-kubernetes](https://hub.steadybit.com/extension/com.steadybit.extension_kubernetes).

In order to discover all extensions in the Kubernetes cluster the agent needs to access the Kubernetes API. For more details, please take a look at the [Kubernetes Auto Registration](extension-registration.md#kubernetes-auto-registration) documentation.

#### Add more Extensions

Further extensions can be enabled via Helm values of steadybit-agent. For example, [`extension-postman`](https://github.com/steadybit/extension-postman) can be enabled by setting `extension-postman.enabled=true`. See our [GitHub Repository](https://github.com/steadybit/helm-charts/tree/main/charts/steadybit-agent) for a detailed list of all the configuration parameters.

Alternatively, you can also install extensions independently with their own Helm charts. The installation instructions are listed in the GitHub repositories of the extension and can be browsed via the [Reliability Hub](https://hub.steadybit.com/).

#### Disable Default Extensions

If you want to disable some, or all, of the default extensions, please set the following values in Helm:

* [extension-container](https://hub.steadybit.com/extension/com.steadybit.extension_container): `--set extension-container.enabled=false`
* [extension-host](https://hub.steadybit.com/extension/com.steadybit.extension_host): `--set extension-host.enabled=false`
* [extension-http](https://hub.steadybit.com/extension/com.steadybit.extension_http): `--set extension-http.enabled=false`
* [extension-kubernetes](https://hub.steadybit.com/extension/com.steadybit.extension_kubernetes): `--set extension-kubernetes.enabled=false`

### Alternative: OpenShift installation (< 4.18)

The SecurityContextConstraints for OpenShift are included in our Helm chart. You need to configure the CRI-O container runtime and we're good to go.

```bash
helm repo add steadybit https://steadybit.github.io/helm-charts
helm repo update
helm template steadybit-agent --namespace steadybit-agent \
  --create-namespace \
  --set agent.key=<replace-with-agent-key> \
  --set global.clusterName=<replace-with-cluster-name> \
  --set extension-container.container.engine=cri-o \
  steadybit/steadybit-agent
```

### Alternative: OpenShift installation (>= 4.18)

The SecurityContextConstraints for OpenShift are included in our Helm chart. You need to configure the CRI-O container runtime and the crun container engine, and we're good to go.

```bash
helm repo add steadybit https://steadybit.github.io/helm-charts
helm repo update
helm template steadybit-agent --namespace steadybit-agent \
  --create-namespace \
  --set agent.key=<replace-with-agent-key> \
  --set global.clusterName=<replace-with-cluster-name> \
  --set extension-container.container.engine=cri-o \
  --set extension-container.containerEngines.cri-o.ociRuntime.path=crun \
  --set extension-container.containerEngines.cri-o.ociRuntime.root=/run/crun \
  steadybit/steadybit-agent
```


### Alternative: Rancher (RKE2 / K3s) installation

Rancher's RKE2 and K3s run an embedded containerd whose socket is not at the usual location, so the container extension needs to be pointed at it.

```bash
helm repo add steadybit https://steadybit.github.io/helm-charts
helm repo update
helm upgrade --install steadybit-agent --namespace steadybit-agent \
  --create-namespace \
  --set agent.key=<replace-with-agent-key> \
  --set global.clusterName=<replace-with-cluster-name> \
  --set extension-container.container.engine=containerd \
  --set extension-container.containerEngines.containerd.socket=/run/k3s/containerd/containerd.sock \
  steadybit/steadybit-agent
```

{% hint style="info" %}
Leave `extension-container.containerEngines.containerd.ociRuntime.root` at its default. Even on RKE2/K3s, containerd keeps its runc state under `/run/containerd/runc/k8s.io`; pointing it at `/run/k3s/...` refers to a directory that does not exist and the extension pods will not start.
{% endhint %}

If the socket path is wrong, the pods of the container extension stay in `ContainerCreating` and report an event such as `MountVolume.SetUp failed for volume "runtime-socket": hostPath type check failed: /run/containerd/containerd.sock is not a socket file`.

Rancher RKE1 clusters are Docker-based. Use `--set extension-container.container.engine=docker` instead; no further configuration is required.

### Alternative: GKE Autopilot installation

You can install the agent and extensions on Google Kubernetes Engine Autopilot clusters (1.32.1-gke.1729000 or later). Due to restrictions imposed by GKE, host attacks won't be available.

For the container extension to work, you first need to apply a workload allow list:

```bash
kubectl apply -f - <<'EOF'
apiVersion: auto.gke.io/v1
kind: AllowlistSynchronizer
metadata:
  name: steadybit-synchronizer
spec:
  allowlistPaths:
    - Steadybit/extension-container/*
EOF
kubectl wait --for=condition=Ready allowlistsynchronizer/steadybit-synchronizer --timeout=60s
```

After this, you're ready to deploy the agent while specifying the cluster name and agent key.

```
helm repo add steadybit https://steadybit.github.io/helm-charts
helm repo update
helm upgrade --install steadybit-agent --namespace steadybit-agent \
  --create-namespace \
  --set agent.key=<replace-with-agent-key> \
  --set global.clusterName=<replace-with-cluster-name> \
  --set extension-container.container.engine=containerd \
  --set extension-container.platform=gke-autopilot \
  --set extension-host.enabled=false \
  --set agent.registerUrl=https://platform.steadybit.com \
  steadybit/steadybit-agent
```


### Alternative: Generate Kubernetes Manifests

We currently don't provide a static Kubernetes manifest, but you can generate it from the Helm chart. We recommend using the Helm chart, as it is easier to update the agent and extensions.

```shell
helm repo add steadybit https://steadybit.github.io/helm-charts
helm repo update
helm template steadybit-agent --namespace steadybit-agent \
  --create-namespace \
  --set agent.key=<replace-with-agent-key> \
  --set global.clusterName=<replace-with-cluster-name> \
  steadybit/steadybit-agent
```


## Resource limits

Keep an eye on OOMing or crash-looping agents and extensions after installation. The memory usage highly depends on the number of discovered targets. We try to provide reasonable defaults, but you might need to adapt the resource limits to your use case.

For example, to increase the memory limits for the agent:

```shell
  --set agent.resources.limits.memory=1Gi
```

## Update

To update the agent and extensions, you can use the following command:

```shell
helm repo update
helm upgrade --reuse-values steadybit-agent --namespace steadybit-agent \
  steadybit/steadybit-agent
```
