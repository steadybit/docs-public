# Install on Kubernetes

This method will install the Steadybit Agent on your Kubernetes Cluster using [Helm](https://helm.sh). So you need to have helm installed.

## Prerequisites

You must be able to access the following URLs via HTTPS (443) on your target environment:

* https://platform.steadybit.com (Platform)
* https://steadybit.github.io (Kubernetes helm repository)
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

By default, the agent assumes that your cluster uses the `containerd` runtime. If this is not the case, you need to add`--set extension-container.container.runtime=docker` or `cri-o`.

#### Determine Container Runtime on a Node

In case of a managed Kubernetes service, there might be a vendor-specific method to check the container runtime. In case you have access on the `kubectl`, you can get the container runtime via

```shell
kubectl get nodes -o wide
```

The column `CONTAINER-RUNTIME` shows you the runtime you are using. You can find further in the [official Kubernetes documentation](https://kubernetes.io/docs/tasks/administer-cluster/migrating-from-dockershim/find-out-runtime-you-use/).

### Configure custom On-Prem Platform

If you are running on-prem, make sure to set the URL of the platform: `--set agent.registerUrl=<your-platform-url>`

### Extensions

The agent's purpose is to establish a communication from the platform to your systems. However, the discovery of your systems and providing Chaos Engineering to a technology works via extensions. 
By default, the official helm chart already installs the extensions [extension-container](https://hub.steadybit.com/extension/com.steadybit.extension_container), [extension-host](https://hub.steadybit.com/extension/com.steadybit.extension_host), [extension-http](https://hub.steadybit.com/extension/com.steadybit.extension_http) and [extension-kubernetes](https://hub.steadybit.com/extension/com.steadybit.extension_kubernetes).

In order to discover all extensions in the Kubernetes custer the agent needs to access the Kubernetes API. For more details, please take a look at the [Kubernetes Auto Registration](extension-registration.md#kubernetes-auto-registration) documentation.

#### Add more Extensions

Further extensions can be enabled via helm values of steadybit-agent. For example, [`extension-postman`](https://github.com/steadybit/extension-postman) can be enabled by setting`extension-postman.enabled=true`. See our [GitHub Repository](https://github.com/steadybit/helm-charts/tree/main/charts/steadybit-agent) for a detailed list of all the configuration parameters.

Alternatively, you can also install extensions independently with their own helm charts. The installation instructions are listed in the Github repositories of the extension and can be browsed via the [Reliability Hub](https://hub.steadybit.com/).

#### Disable Default Extensions

If you want to disable some, or all, of the default extensions, please set the following values in helm:

* [extension-container](https://hub.steadybit.com/extension/com.steadybit.extension_container): `--set extension-container.enabled=false`
* [extension-host](https://hub.steadybit.com/extension/com.steadybit.extension_host): `--set extension-host.enabled=false`
* [extension-http](https://hub.steadybit.com/extension/com.steadybit.extension_http): `--set extension-http.enabled=false`
* [extension-kubernetes](https://hub.steadybit.com/extension/com.steadybit.extension_kubernetes): `--set extension-kubernetes.enabled=false`

### Alternative: Generate Kubernetes Manifests

We currently don't provide a static Kubernetes manifest, but you can generate it from the helm chart. We recommend to use the helm chart, as it is easier to update the agent and extensions.

```shell
helm repo add steadybit https://steadybit.github.io/helm-charts
helm repo update
helm template steadybit-agent --namespace steadybit-agent \
  --create-namespace \
  --set agent.key=<replace-with-agent-key> \
  --set global.clusterName=<replace-with-cluster-name> \
  steadybit/steadybit-agent
```

### Alternative: OpenShift installation (< 4.18)

The SecurityContextConstraints for OpenShift are included in our helm chart. You need to configure the CRI-O container runtime and we're good to go.

```bash
helm repo add steadybit https://steadybit.github.io/helm-charts
helm repo update
helm template steadybit-agent --namespace steadybit-agent \
  --create-namespace \
  --set agent.key=<replace-with-agent-key> \
  --set global.clusterName=<replace-with-cluster-name> \
  --set podSecurityContext.fsGroup=null \
  --set extension-container.container.runtime=cri-o \
  steadybit/steadybit-agent
```

### Alternative: OpenShift installation (>= 4.18)

The SecurityContextConstraints for OpenShift are included in our helm chart. You need to configure the CRI-O container runtime and to use the crun container engine and we're good to go.

```bash
helm repo add steadybit https://steadybit.github.io/helm-charts
helm repo update
helm template steadybit-agent --namespace steadybit-agent \
  --create-namespace \
  --set agent.key=<replace-with-agent-key> \
  --set global.clusterName=<replace-with-cluster-name> \
  --set podSecurityContext.fsGroup=null \
  --set extension-container.container.engine=cri-o \
  --set extension-container.containerEngines.cri-o.ociRuntime.path=crun \
  --set extension-container.containerEngines.cri-o.ociRuntime.root=/run/crun \
  steadybit/steadybit-agent
```


### Alternative: GKE Autopilot installation

You can install the agent and extensions on Google Kubernetes Engine Autopilot clusters  (1.32.1-gke.1729000 or later). Due to restrictions by GKE host attacks won't be available.

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

## Resource limits

Keep an eye on OOMing / crash looping agents and extensions after installation. The memory usage highly depends on the number of discovered targets. We try to provide reasonable defaults, but you might need to adapt the resource limits to your use case.

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
