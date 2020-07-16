---
title: "Install on Kubernetes"
navTitle: "Kubernetes"
---

### Daemonset

#### Installation through YAML file

To install and configure chaosmesh within `Kubernetes` as a `DaemonSet` you need to define the `DaemonSet` YAML file.
Below you will see an example of a YAML file to run the chaosmesh agent.

As with all deployments in Kubernetes, make use of namespaces to keep things organized. The following YAML creates a Namespace called `chaosmesh-agent` in which the `DaemonSet` will be created.
It allows you to tag and isolate the agents or even stop all of them at once by simply deleting the `chaosmesh-agent` namespace.

Please replace the string `replace-with-agent-key` with your specific Agent-Key and run the shown commands to encode the key correctly.

This needs to be done in three steps:
1. Run `echo -n _:<replace-with-agent-key> | base64` and fill in the result into the value for the `auth` key
2. Run `echo -n '{"auths":{"docker.chaosmesh.io":{"auth":"<replace-with-encoded-key-from-step-1>"}}}' | base64`
3. Fill in the result from Step 2 into the value for the `.dockerconfigjson` key


Example:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: chaosmesh-agent
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: chaosmesh-agent
  namespace: chaosmesh-agent
---
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: chaosmesh-agent-role
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
      - "namespaces"
      - "services"
      - "endpoints"
      - "nodes"
      - "pods"
      - "replicationcontrollers"
    verbs: ["get", "list", "watch"]
---
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: chaosmesh-agent-role-binding
  namespace: chaosmesh-agent
subjects:
  - kind: ServiceAccount
    name: chaosmesh-agent
    namespace: chaosmesh-agent
roleRef:
  kind: ClusterRole
  name: chaosmesh-agent-role
  apiGroup: rbac.authorization.k8s.io
---
apiVersion: v1
kind: Secret
metadata:
  name: chaosmesh-agent-secret-agent-key
  namespace: chaosmesh-agent
type: Opaque
data:
  key: <echo -n <replace-with-agent-key> | base64>
---
apiVersion: v1
kind: Secret
metadata:
  name: regcredinternal
  namespace: chaosmesh-agent
data:
  .dockerconfigjson: <echo -n '{"auths":{"docker.chaosmesh.io":{"auth":"<echo -n _:<replace-with-agent-key> | base64>"}}}' | base64>
type: kubernetes.io/dockerconfigjson
---
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: chaosmesh-agent
  namespace: chaosmesh-agent
spec:
  selector:
    matchLabels:
      app: chaosmesh-agent
  template:
    metadata:
      labels:
        app: chaosmesh-agent
        com.chaosmesh.agent: "true"
    spec:
      serviceAccountName: chaosmesh-agent
      hostIPC: true
      hostNetwork: true
      hostPID: true
      containers:
      - name: chaosmesh-agent
        image: docker.chaosmesh.io/chaosmesh/agent
        imagePullPolicy: Always
        env:
        - name: CHAOSMESH_AGENT_REGISTER_URL
          value: "https://platform.chaosmesh.io"
        - name: CHAOSMESH_AGENT_KEY
          valueFrom:
            secretKeyRef:
              name: chaosmesh-agent-secret-agent-key
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

Once the YAML file is customized you can apply it with `kubectl`:

```bash
kubectl apply -f chaosmesh-agent.yml
```

To get even more information and insights, the above manifest contains a `Service Account` and `RBAC Authorization` for the `chaosmesh-agent`.
With the access to the K8s API, the agent can provide further information to the platform for identifying potential targets.
More information about [Service Accounts](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/) or [RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) is available in the Kubernetes docs.

Further information about our discovery feature is described in the section [Container Discovery](../discovery/2-container).



