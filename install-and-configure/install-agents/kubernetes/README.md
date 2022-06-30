---
title: Install on Kubernetes
navTitle: Kubernetes
---

# Install on Kubernetes

import ExampleK8sDocker from './\_example-k8s-manifest-docker.md'; import ExampleK8sContainerd from './\_example-k8s-manifest-containerd.md';

#### Installation using the Helm Chart

To install the chart, retrieve your steadybit agent key from the [setup page](https://platform.steadybit.io/settings/agents/setup) in the SaaS platform and run the following command. Please also fill in your cluster name:

```bash
helm repo add steadybit https://steadybit.github.io/helm-charts
helm repo update
helm install steadybit-agent --namespace steadybit-agent \
  --create-namespace \
  --set agent.key=<replace-with-agent-key> \
  --set cluster.name=<replace-with-cluster-name> \
  --set agent.containerRuntime=containerd \
  steadybit/steadybit-agent
```

To configure the installation, specify the values on the command line using the --set flag, or provide a yaml file with your values using the -f flag.

> By default, the agent assumes that your cluster uses the Docker container runtime. If this is not the case, you need to set `agent.containerRuntime` to either `containerd` or `crio`.

For a detailed list of all the configuration parameters, please see our [GitHub Repository](https://github.com/steadybit/helm-charts/tree/main/charts/steadybit-agent).

#### Installation using Terraform

It is also possible to install the Helm chart with Terraform. For that the official `helm_release` resource will be used. Analogous to the above procedure, the [agent key](https://platform.steadybit.io/settings/agents/setup) needs to be specified. See the following provider and resource definition for Terraform:

```
provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}

resource "helm_release" "steadybit_helm_chart" {
  name  = "steadybit-agent"
  chart = "steadybit/steadybit-agent"

  set {
    name  = "agent.key"
    value = "<replace-with-agent-key>"
  }
}
```

To configure additional parameters, specify the values directly in the terraform file, using the following syntax:

```
set {
    name  = "agent.registerUrl"
    value = "https://platform.steadybit.io"
  }
```

Apply the Terraform definition:

```bash
terraform apply -var agent_key="<replace-with-agent-key>"
```

See this [GitHub Repository](https://github.com/steadybit/terraform-examples) for the complete source code.

#### Installation using Kubernetes Manifests

To install and configure steadybit within `Kubernetes` as a `DaemonSet` you need to define the `DaemonSet` YAML file. Below you will see an example of a YAML file to run the steadybit agent.

As with all deployments in Kubernetes, make use of namespaces to keep things organized. The following YAML creates a Namespace called `steadybit-agent` in which the `DaemonSet` will be created. It allows you to tag and isolate the agents or even stop all of them at once by simply deleting the `steadybit-agent` namespace.

Please replace the string `replace-with-agent-key` with your specific Agent-Key and run the shown commands to encode the key correctly.

This needs to be done in three steps:

1. Run `echo -n _:<replace-with-agent-key> | base64` and fill in the result into the value for the `auth` key
2. Run `echo -n '{"auths":{"docker.steadybit.io":{"auths":"<replace-with-encoded-key-from-step-1>"}}}' | base64`
3. Fill in the result from Step 2 into the value for the `.dockerconfigjson` key

\<Collapsible title={'Example Manifests using the ContainerD Container Runtime'}>

\<Collapsible title={'Example Manifests using the Docker Container Runtime'}>

For your convenience you can use the [setup page](https://platform.steadybit.io/settings/agents/setup) in the SaaS platform, where your agent key is already prepared in the yaml.

Once the YAML file is customized you can apply it with `kubectl`:

```bash
kubectl apply -f steadybit-agent.yml
```

To get even more information and insights, the above manifest contains a `Service Account` and `RBAC Authorization` for the `steadybit-agent`. With the access to the K8s API, the agent can provide further information to the platform for identifying potential targets. More information about [Service Accounts](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/) or [RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) is available in the Kubernetes docs.

You can learn more about our discovery of containers in the section [Learn / Discovery / Container](../../../use-steadybit/discovery/container.md).
