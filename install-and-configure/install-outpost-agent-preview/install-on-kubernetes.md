# Install on Kubernetes

You can install the Agent and Extensions in Kubernetes via Helm or Kubernetes manifests, see each section below.

### Install via Helm Chart

To install the chart, retrieve your Steadybit agent key from the [setup page](https://platform.steadybit.com/settings/agents/setup) in the SaaS platform and run the following command. Please also fill in your cluster name:

```shell
helm repo add steadybit https://steadybit.github.io/helm-charts
helm repo update
helm install steadybit-outpost --namespace steadybit-outpost \
  --create-namespace \
  --set outpost.key=<replace-with-agent-key> \
  --set global.clusterName=<replace-with-cluster-name> \
  steadybit/steadybit-outpost
```

To configure the installation, specify the values on the command line using the `--set` flag, or provide a YAML file with your values using the `-f` flag.

#### Configure Installation for On-Prem

If you are running on-prem, make sure to set the URL of the platform:  `--set outpost.registerUrl=<your-platform-url>`

#### Enrich Installation with Additional Extensions

By default, the helm chart installs the extensions [`extension-container`](https://hub.steadybit.com/extension/com.github.steadybit.extension\_container), [`extension-host`](https://hub.steadybit.com/extension/com.github.steadybit.extension\_host), [`extension-http`](https://hub.steadybit.com/extension/com.github.steadybit.extension\_http) and [`extension-kubernetes`](https://hub.steadybit.com/extension/com.github.steadybit.extension\_kubernetes). Further extensions can be enabled via helm values of steadybit-outpost. For example, [`extension-postman`](https://github.com/steadybit/extension-postman) can be enabled by setting`extension-postman.enabled=true`. See our [GitHub Repository](https://github.com/steadybit/helm-charts/tree/main/charts/steadybit-outpost) for a detailed list of all the configuration parameters.

Alternatively, you can also install extensions independently with their own helm charts. The installation instructions are listed in the Github repositories of the extension and can be browsed via the [Reliability Hub](https://hub.steadybit.com/).

#### Configure Container Runtime for docker or crio

By default, the agent assumes that your cluster uses the `containerd` runtime. If this is not the case, you need to set `extension-container.container.runtime` to either `docker` or `crio.`

### Install via Kubernetes Manifests

To install and configure Steadybit with Kubernetes Manifests, you can use helm to generate these Manifests.

As with all deployments in Kubernetes, use namespaces to keep things organized. The example command will create Manifests using a Namespace called `steadybit-outpost` in which the resources will be created. It allows you to tag and isolate the agents or even stop all of them at once by simply deleting the `steadybit-outpost` namespace.

Please replace the string `replace-with-agent-key` with your specific Agent-Key and run the shown commands to encode the key correctly.

```bash
helm repo add steadybit https://steadybit.github.io/helm-charts
helm repo update

helm template steadybit-outpost --namespace steadybit-outpost \
  --set outpost.key=<replace-with-agent-key> \
  --set global.cluster=<replace-with-cluster-name> \
  steadybit/steadybit-outpost > steadybit-outpost.yml
```

Once the YAML file is created, you can apply it with `kubectl`:

```bash
kubectl apply -f steadybit-outpost.yml
```

To get even more information and insights, the above manifest contains a `Service Account` and `RBAC Authorization` for the `steadybit-outpost`. With access to the K8s API, the agent can provide further information to the platform for identifying potential targets. More information about [Service Accounts](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/) or [RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) is available in the Kubernetes docs.

You can learn more about our discovery of containers in the section [Use Steadybit / Discovery / Container.](../../use-steadybit/discovery/container.md)
