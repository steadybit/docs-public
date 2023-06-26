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
