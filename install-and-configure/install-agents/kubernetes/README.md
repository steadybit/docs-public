---
title: Install on Kubernetes
navTitle: Kubernetes
---

# Install on Kubernetes

#### Installation using the Helm Chartte

To install the chart, retrieve your steadybit agent key from the [setup page](https://platform.steadybit.io/settings/agents/setup) in the SaaS platform and run the following command. Please also fill in your cluster name:

```shell
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

<details>

<summary>Kubernetes Manifest for ContainerD Runtime</summary>

```yaml
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: steadybit-agent
  namespace: steadybit-agent
---
apiVersion: v1
kind: Secret
metadata:
  name: docker-steadybit-io
  namespace: steadybit-agent
type: kubernetes.io/dockerconfigjson
data:
  .dockerconfigjson: <echo -n '{"auths":{"docker.steadybit.io":{"auth":"<echo -n _:<replace-with-agent-key> | base64>"}}}' | base64>
---
apiVersion: v1
kind: Secret
metadata:
  name: steadybit-agent
  namespace: steadybit-agent
type: Opaque
data:
  key: "<echo -n <replace-with-agent-key> | base64>+"
---
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: steadybit-agent
rules:
  - apiGroups: [ "batch" ]
    resources:
      - "jobs"
    verbs: [ "get", "list", "watch" ]
  - apiGroups: [ "extensions" ]
    resources:
      - "deployments"
      - "replicasets"
      - "ingresses"
    verbs: [ "get", "list", "watch" ]
  - apiGroups: [ "apps" ]
    resources:
      - "deployments"
      - "replicasets"
      - "daemonsets"
      - "statefulsets"
    verbs: [ "get", "list", "watch", "patch" ]
  - apiGroups: [ "autoscaling" ]
    resources:
      - "horizontalpodautoscalers"
    verbs: [ "get", "list", "watch" ]
  - apiGroups: [ "networking.k8s.io" ]
    resources:
      - "ingresses"
    verbs: [ "get", "list", "watch" ]
  - apiGroups: [ "" ]
    resources:
      - "events"
      - "namespaces"
      - "services"
      - "endpoints"
      - "nodes"
      - "pods"
      - "pods/log"
      - "replicationcontrollers"
    verbs: [ "get", "list", "watch" ]
  - apiGroups: [ "" ]
    resources:
      - "pods"
    verbs: [ "delete", "patch" ]
---
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: steadybit-agent
subjects:
  - kind: ServiceAccount
    name: steadybit-agent
    namespace: steadybit-agent
roleRef:
  kind: ClusterRole
  name: steadybit-agent
  apiGroup: rbac.authorization.k8s.io
---
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: steadybit-agent
  namespace: steadybit-agent
rules:
  - apiGroups: [ "coordination.k8s.io" ]
    resources:
      - "leases"
    verbs: [ "get", "list", "watch", "create", "update" ]
---
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: steadybit-agent
subjects:
  - kind: ServiceAccount
    name: steadybit-agent
    namespace: steadybit-agent
roleRef:
  kind: Role
  name: steadybit-agent
  apiGroup: rbac.authorization.k8s.io
---
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: steadybit-agent
  namespace: steadybit-agent
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: steadybit-agent
      app.kubernetes.io/instance: steadybit-agent
  updateStrategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
  template:
    metadata:
      labels:
        com.steadybit.agent: "true"
    spec:
      serviceAccountName: steadybit-agent
      hostIPC: true
      hostNetwork: true
      hostPID: true
      dnsPolicy: ClusterFirstWithHostNet
      containers:
        - name: steadybit-agent
          image: "docker.steadybit.io/steadybit/agent:latest"
          imagePullPolicy: Always
          resources:
            requests:
              memory: 512Mi
              cpu: 250m
            limits:
              memory: 768Mi
              cpu: 1500m

          livenessProbe:
            httpGet:
              host: 127.0.0.1
              port: 42899
              path: /health
            initialDelaySeconds: 300
            periodSeconds: 10
            timeoutSeconds: 5
            successThreshold: 1
            failureThreshold: 5
          env:
            - name: STEADYBIT_AGENT_REGISTER_URL
              value: "https://platform.steadybit.io"
            - name: STEADYBIT_AGENT_KEY
              valueFrom:
                secretKeyRef:
                  name: steadybit-agent
                  key: key
            - name: STEADYBIT_KUBERNETES_CLUSTER_NAME
              value: "<replace-with-cluster-name>"
            - name: POD_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.podIP
            - name: STEADYBIT_AGENT_POD_NAME
              valueFrom:
                fieldRef:
                  fieldPath: metadata.name
            - name: STEADYBIT_AGENT_POD_NAMESPACE
              valueFrom:
                fieldRef:
                  fieldPath: metadata.namespace
            - name: STEADYBIT_AGENT_NODE_NAME
              valueFrom:
                fieldRef:
                  fieldPath: spec.nodeName
            - name: STEADYBIT_HTTP_ENDPOINT_PORT
              value: "42899"
            - name: STEADYBIT_AGENT_MODE
              value: "default"
          securityContext:
            privileged: true
          volumeMounts:
            - name: steadybit-agent-state
              mountPath: /var/lib/steadybit-agent
            - name: container-sock
              mountPath: /run/containerd/containerd.sock
            - name: cgroup-root
              mountPath: /sys/fs/cgroup
            - name: sys
              mountPath: /sys
            - name: runc-root
              mountPath: /run/containerd/runc/k8s.io
            - name: container-run
              mountPath: /run/containerd
            - name: container-namespaces
              mountPath: /var/run
              mountPropagation: Bidirectional
      imagePullSecrets:
        - name: docker-steadybit-io
      volumes:
        - name: steadybit-agent-state
          hostPath:
            path: /var/lib/steadybit-agent
        - name: container-sock
          hostPath:
            path: /run/containerd/containerd.sock
        - name: cgroup-root
          hostPath:
            path: /sys/fs/cgroup
        - name: sys
          hostPath:
            path: /sys
        - name: runc-root
          hostPath:
            path: /run/containerd/runc/k8s.io
        - name: container-run
          hostPath:
            path: /run/containerd
        - name: container-namespaces
          hostPath:
            path: /var/run


```

</details>

<details>

<summary>Kubernetes Manifest for Docker Runtime</summary>

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
  labels:
    com.steadybit.agent: "true"
---
apiVersion: v1
kind: Secret
metadata:
  name: docker-steadybit-io
  namespace: steadybit-agent
  labels:
    com.steadybit.agent: "true"
type: kubernetes.io/dockerconfigjson
data:
  .dockerconfigjson: <echo -n '{"auths":{"docker.steadybit.io":{"auth":"<echo -n _:<replace-with-agent-key> | base64>"}}}' | base64>
---
apiVersion: v1
kind: Secret
metadata:
  name: steadybit-agent
  namespace: steadybit-agent
type: Opaque
data:
  key: <echo -n <replace-with-agent-key> | base64>
---
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: steadybit-agent
rules:
  - apiGroups: [ "batch" ]
    resources:
      - "jobs"
    verbs: [ "get", "list", "watch" ]
  - apiGroups: [ "extensions" ]
    resources:
      - "deployments"
      - "replicasets"
      - "ingresses"
    verbs: [ "get", "list", "watch" ]
  - apiGroups: [ "apps" ]
    resources:
      - "deployments"
      - "replicasets"
      - "daemonsets"
      - "statefulsets"
    verbs: [ "get", "list", "watch", "patch" ]
  - apiGroups: [ "autoscaling" ]
    resources:
      - "horizontalpodautoscalers"
    verbs: [ "get", "list", "watch" ]
  - apiGroups: [ "networking.k8s.io" ]
    resources:
      - "ingresses"
    verbs: [ "get", "list", "watch" ]
  - apiGroups: [ "" ]
    resources:
      - "events"
      - "namespaces"
      - "services"
      - "endpoints"
      - "nodes"
      - "pods"
      - "pods/log"
      - "replicationcontrollers"
    verbs: [ "get", "list", "watch" ]
  - apiGroups: [ "" ]
    resources:
      - "pods"
    verbs: [ "delete", "patch" ]
---
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: steadybit-agent
subjects:
  - kind: ServiceAccount
    name: steadybit-agent
    namespace: steadybit-agent
roleRef:
  kind: ClusterRole
  name: steadybit-agent
  apiGroup: rbac.authorization.k8s.io
---
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: steadybit-agent
  namespace: steadybit-agent
rules:
  - apiGroups: [ "coordination.k8s.io" ]
    resources:
      - "leases"
    verbs: [ "get", "list", "watch", "create", "update" ]
---
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: steadybit-agent
subjects:
  - kind: ServiceAccount
    name: steadybit-agent
    namespace: steadybit-agent
roleRef:
  kind: Role
  name: steadybit-agent
  apiGroup: rbac.authorization.k8s.io
---
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: steadybit-agent
  namespace: steadybit-agent
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: steadybit-agent
      app.kubernetes.io/instance: steadybit-agent
  updateStrategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
  template:
    metadata:
      labels:
        com.steadybit.agent: "true"
    spec:
      serviceAccountName: steadybit-agent
      hostIPC: true
      hostNetwork: true
      hostPID: true
      dnsPolicy: ClusterFirstWithHostNet
      containers:
        - name: steadybit-agent
          image: "docker.steadybit.io/steadybit/agent:latest"
          imagePullPolicy: Always
          resources:
            requests:
              memory: 512Mi
              cpu: 250m
            limits:
              memory: 768Mi
              cpu: 1500m
          livenessProbe:
            httpGet:
              host: 127.0.0.1
              port: 42899
              path: /health
            initialDelaySeconds: 300
            periodSeconds: 10
            timeoutSeconds: 5
            successThreshold: 1
            failureThreshold: 5
          env:
            - name: STEADYBIT_AGENT_REGISTER_URL
              value: "https://platform.steadybit.io"
            - name: STEADYBIT_AGENT_KEY
              valueFrom:
                secretKeyRef:
                  name: steadybit-agent
                  key: key
            - name: STEADYBIT_KUBERNETES_CLUSTER_NAME
              value: "<replace-with-cluster-name>"
            - name: POD_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.podIP
            - name: STEADYBIT_AGENT_POD_NAME
              valueFrom:
                fieldRef:
                  fieldPath: metadata.name
            - name: STEADYBIT_AGENT_POD_NAMESPACE
              valueFrom:
                fieldRef:
                  fieldPath: metadata.namespace
            - name: STEADYBIT_AGENT_NODE_NAME
              valueFrom:
                fieldRef:
                  fieldPath: spec.nodeName
            - name: STEADYBIT_HTTP_ENDPOINT_PORT
              value: "42899"
            - name: STEADYBIT_AGENT_MODE
              value: "default"
          securityContext:
            privileged: true
          volumeMounts:
            - name: steadybit-agent-state
              mountPath: /var/lib/steadybit-agent
            - name: container-sock
              mountPath: /var/run/docker.sock
            - name: cgroup-root
              mountPath: /sys/fs/cgroup
            - name: sys
              mountPath: /sys
      imagePullSecrets:
        - name: docker-steadybit-io
      volumes:
        - name: steadybit-agent-state
          hostPath:
            path: /var/lib/steadybit-agent
        - name: container-sock
          hostPath:
            path: /var/run/docker.sock
        - name: cgroup-root
          hostPath:
            path: /sys/fs/cgroup
        - name: sys
          hostPath:
            path: /sy
```

</details>

For your convenience you can use the [setup page](https://platform.steadybit.io/settings/agents/setup) in the SaaS platform, where your agent key is already prepared in the yaml.

Once the YAML file is customized you can apply it with `kubectl`:

```bash
kubectl apply -f steadybit-agent.yml
```

To get even more information and insights, the above manifest contains a `Service Account` and `RBAC Authorization` for the `steadybit-agent`. With the access to the K8s API, the agent can provide further information to the platform for identifying potential targets. More information about [Service Accounts](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/) or [RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) is available in the Kubernetes docs.

You can learn more about our discovery of containers in the section [Use Steadybit / Discovery / Container.](../../../use-steadybit/discovery/container.md)
