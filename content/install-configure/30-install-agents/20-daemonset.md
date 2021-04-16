---
title: "Install on Kubernetes"
navTitle: "Kubernetes"
---

### Daemonset

#### Installation using the Helm chart

To install the chart, retrieve your steadybit agent key from the [setup page](https://platform.steadybit.io/settings/agents/setup) in the SaaS platform and run:

```bash
helm repo add steadybit https://steadybit.github.io/helm-charts
helm repo update
kubectl create namespace steadybit-agent
helm install steadybit-agent --namespace steadybit-agent --set agent.key=<replace-with-agent-key> steadybit/steadybit-agent
```

To configure the installation, specify the values on the command line using the --set flag, or provide a yaml file with your values using the -f flag.

For a detailed list of all the configuration parameters, please see our [GitHub Repository](https://github.com/steadybit/helm-charts/tree/master/charts/steadybit-agent).

#### Installation using Terraform

It is also possible to install the Helm chart with Terraform. For that the official `helm_release` resource will be used.
Analogous to the above procedure, the [agent key](https://platform.steadybit.io/settings/agents/setup) needs to be specified.
See the following provider and resource definition for Terraform:

```bash
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

```bash
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

#### Installation through YAML file

To install and configure steadybit within `Kubernetes` as a `DaemonSet` you need to define the `DaemonSet` YAML file.
Below you will see an example of a YAML file to run the steadybit agent.

As with all deployments in Kubernetes, make use of namespaces to keep things organized. The following YAML creates a Namespace called `steadybit-agent` in which the `DaemonSet` will be created.
It allows you to tag and isolate the agents or even stop all of them at once by simply deleting the `steadybit-agent` namespace.

Please replace the string `replace-with-agent-key` with your specific Agent-Key and run the shown commands to encode the key correctly.

This needs to be done in three steps:
1. Run `echo -n _:<replace-with-agent-key> | base64` and fill in the result into the value for the `auth` key
2. Run `echo -n '{"auths":{"docker.steadybit.io":{"auths":"<replace-with-encoded-key-from-step-1>"}}}' | base64`
3. Fill in the result from Step 2 into the value for the `.dockerconfigjson` key


Example:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: steadybit-agent
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: steadybit-agent
  namespace: steadybit-agent
---
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: steadybit-agent
spec:
  privileged: true
  allowPrivilegeEscalation: true
  allowedHostPaths:
    - pathPrefix: "/var/run"
    - pathPrefix: "/var/log"
  volumes:
    - configMap
    - downwardAPI
    - emptyDir
    - persistentVolumeClaim
    - secret
    - projected
    - hostPath
  hostNetwork: true
  hostPorts:
    - min: 0
      max: 65535
  hostIPC: true
  hostPID: true
  runAsUser:
    rule: "RunAsAny"
  seLinux:
    rule: "RunAsAny"
  supplementalGroups:
    rule: "RunAsAny"
  fsGroup:
    rule: "RunAsAny"
---
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: steadybit-agent-role
rules:
  - apiGroups: ["batch"]
    resources:
      - "jobs"
    verbs: ["get", "list", "watch"]
  - apiGroups: ["extensions"]
    resources:
      - "deployments"
      - "replicasets"
      - "ingresses"
    verbs: ["get", "list", "watch"]
  - apiGroups: ["apps"]
    resources:
      - "deployments"
      - "replicasets"
      - "daemonsets"
      - "statefulsets"
    verbs: ["get", "list", "watch"]
  - apiGroups: [""]
    resources:
      - "events"
      - "namespaces"
      - "services"
      - "endpoints"
      - "nodes"
      - "pods"
      - "replicationcontrollers"
    verbs: ["get", "list", "watch"]
  - apiGroups: [ "" ]
    resources:
      - "pods"
    verbs: [ "delete" ]
  - apiGroups: [ "policy" ]
    resources: [ "podsecuritypolicies" ]
    verbs: [ "use" ]
    resourceNames:
      - steadybit-agent
  - apiGroups: [ "autoscaling" ]
    resources:
      - "horizontalpodautoscalers"
    verbs: [ "get", "list", "watch" ]
---
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: steadybit-agent-role-binding
  namespace: steadybit-agent
subjects:
  - kind: ServiceAccount
    name: steadybit-agent
    namespace: steadybit-agent
roleRef:
  kind: ClusterRole
  name: steadybit-agent-role
  apiGroup: rbac.authorization.k8s.io
---
apiVersion: v1
kind: Secret
metadata:
  name: steadybit-agent-secret-agent-key
  namespace: steadybit-agent
type: Opaque
data:
  key: <echo -n <replace-with-agent-key> | base64>
---
apiVersion: v1
kind: Secret
metadata:
  name: regcredinternal
  namespace: steadybit-agent
data:
  .dockerconfigjson: <echo -n '{"auths":{"docker.steadybit.io":{"auth":"<echo -n _:<replace-with-agent-key> | base64>"}}}' | base64>
type: kubernetes.io/dockerconfigjson
---
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: steadybit-agent
  namespace: steadybit-agent
spec:
  selector:
    matchLabels:
      app: steadybit-agent
  template:
    metadata:
      labels:
        app: steadybit-agent
        com.steadybit.agent: "true"
    spec:
      serviceAccountName: steadybit-agent
      hostIPC: true
      hostNetwork: true
      hostPID: true
      dnsPolicy: ClusterFirstWithHostNet
      containers:
      - name: steadybit-agent
        image: docker.steadybit.io/steadybit/agent
        imagePullPolicy: Always
        env:
        - name: STEADYBIT_AGENT_REGISTER_URL
          value: "https://platform.steadybit.io"
        - name: STEADYBIT_AGENT_KEY
          valueFrom:
            secretKeyRef:
              name: steadybit-agent-secret-agent-key
              key: key
        securityContext:
          privileged: true
        volumeMounts:
        - name: var-run
          mountPath: /var/run
        - name: log
          mountPath: /var/log
      imagePullSecrets:
      - name: regcredinternal
      volumes
      - name: var-run
        hostPath:
          path: /var/run
      - name: log
        hostPath:
          path: /var/log
```

For your convenience you can use the [setup page](https://platform.steadybit.io/settings/agents/setup) in the SaaS platform, where your agent key is already prepared in the yaml.

Once the YAML file is customized you can apply it with `kubectl`:

```bash
kubectl apply -f steadybit-agent.yml
```

To get even more information and insights, the above manifest contains a `Service Account` and `RBAC Authorization` for the `steadybit-agent`.
With the access to the K8s API, the agent can provide further information to the platform for identifying potential targets.
More information about [Service Accounts](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/) or [RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) is available in the Kubernetes docs.

You can learn more about our discovery of containers in the section [Learn / Discovery / Container](../../learn/30-discovery/20-container).

