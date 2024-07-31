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

## Update the agent and extensions

To update the agent and extensions, you can use the following command:

```shell
helm repo update
helm upgrade --reuse-values steadybit-agent --namespace steadybit-agent \
  steadybit/steadybit-agent      
```

## Resource limits

Keep an eye on OOMing / crash looping agents and extensions after installation. The memory usage highly depends on the number of discovered targets. We try to 
provide reasonable defaults, but you might need to adapt the resource limits to your use case.

For example, to increase the memory limits for the agent:
```shell
  --set agent.resources.limits.memory=1Gi
```

## Configure Container Runtime for Docker or CRI-O

By default, the agent assumes that your cluster uses the `containerd` runtime. If this is not the case, you need to add`--set extension-container.container.runtime=docker` or `cri-o`.

### Determine Container Runtime on a Node
In case of a managed Kubernetes service, there might be a vendor-specific method to check the container runtime.
In case you have access on the `kubectl`, you can get the container runtime via

```shell
kubectl get nodes -o wide
```

The column `CONTAINER-RUNTIME` shows you the runtime you are using. You can find further in the [official Kubernetes documentation](https://kubernetes.io/docs/tasks/administer-cluster/migrating-from-dockershim/find-out-runtime-you-use/).

## Configure custom Platform for On-Prem

If you are running on-prem, make sure to set the URL of the platform: `--set agent.registerUrl=<your-platform-url>`

## Additional Extensions

By default, the helm chart installs the extensions [`extension-container`](https://hub.steadybit.com/extension/com.steadybit.extension\_container), [`extension-host`](https://hub.steadybit.com/extension/com.steadybit.extension\_host), [`extension-http`](https://hub.steadybit.com/extension/com.steadybit.extension\_http) and [`extension-kubernetes`](https://hub.steadybit.com/extension/com.steadybit.extension\_kubernetes). Further extensions can be enabled via helm values of steadybit-agent. For example, [`extension-postman`](https://github.com/steadybit/extension-postman) can be enabled by setting`extension-postman.enabled=true`. See our [GitHub Repository](https://github.com/steadybit/helm-charts/tree/main/charts/steadybit-agent) for a detailed list of all the configuration parameters.

Alternatively, you can also install extensions independently with their own helm charts. The installation instructions are listed in the Github repositories of the extension and can be browsed via the [Reliability Hub](https://hub.steadybit.com/).

## Alternative: Generate Kubernetes Manifests

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

## Alternative: OpenShift installation

To be able to install the agent and extension in openshift we need create custom service accounts. The following example shows how to install the agent and extension in openshift.

#### Create a service account with anyuid SCC:

```shell    
oc create sa sa-with-anyuid
oc adm policy add-scc-to-user anyuid -z sa-with-anyuid
```

#### Create a service account for extension-host and extension-container with needed capabilities:

```shell    
oc create sa sa-extension-host-container
oc adm policy add-scc-to-user anyuid -z sa-extension-host-container
oc adm policy add-scc-to-user hostnetwork -z sa-extension-host-container
oc adm policy add-scc-to-user hostnetwork-v2 -z sa-extension-host-container
oc adm policy add-scc-to-user hostmount-anyuid -z sa-extension-host-container
oc adm policy add-scc-to-user hostaccess-anyuid -z sa-extension-host-container
oc adm policy add-scc-to-user privileged -z sa-extension-host-container
oc adm policy add-scc-to-user restricted-v2 -z sa-extension-host-container
```


#### Example of how to install the agent and extensions with the created service accounts:

```shell
helm upgrade --install steadybit-agent --namespace steadybit-agent \
  --create-namespace \
  --set agent.key=<replace-me> \
  --set global.clusterName="openshift" \
  --set extension-container.container.runtime=cri-o \
  --set serviceAccount.create=false \
  --set serviceAccount.name=sa-with-anyuid \
  --set extension-container.serviceAccount.create=false \
  --set extension-container.serviceAccount.name=sa-extension-host-container \
  --set extension-host.serviceAccount.create=false \
  --set extension-host.serviceAccount.name=sa-extension-host-container \
  --set extension-http.serviceAccount.create=false \
  --set extension-http.serviceAccount.name=sa-with-anyuid  \
  --set extension-kubernetes.serviceAccount.create=false \
  --set extension-kubernetes.serviceAccount.name=sa-with-anyuid  \
steadybit/steadybit-agent
```
