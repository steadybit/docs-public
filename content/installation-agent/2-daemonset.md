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

Please replace the string `replace-with-api-key` with your specific API-Key and run the shown commands to encode the key correctly.
Once the YAML file is customized you can start it with kubectl:

##### Example kubectl command

```bash
kubectl apply -f chaosmesh-agent.yml
```

##### Example YAML file
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: chaosmesh-agent
---
apiVersion: v1
kind: Secret
metadata:
  name: chaosmesh-agent-secret-api-key
  namespace: chaosmesh-agent
type: Opaque
data:
  key: <echo -n <replace-with-api-key> | base64>
---
apiVersion: v1
kind: Secret
metadata:
  name: regcredinternal
  namespace: chaosmesh-agent
data:
  .dockerconfigjson: <echo -n '{"auths":{"docker.chaosmesh.io":{"username":"_","password":"<replace-with-api-key>","auth":"#echo -n _:<replace-with-api-key> | base64"}}}' | base64>
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
              name: chaosmesh-agent-secret-api-key
              key: key
        securityContext:
          privileged: true
        volumeMounts:
        - name: var-run
          mountPath: /var/run
      imagePullSecrets:
      - name: regcredinternal
      volumes:
      - name: var-run
        hostPath:
          path: /var/run
```
### Configure a Kubernetes Service Account & RBAC Authorization

To get even more information and insights, a `Service Account` and `RBAC Authorization` can be configured for the `chaosmesh-agent`. More information about [Service Accounts](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/) or [RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) is available in the Kubernetes docs.
If this access is possible for the agent installed via the DaemonSet, they provide further information to the platform to identify potential targets.
Further information is described in the section [Container Discovery](../discovery/2-container).

##### Example YAML file
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
  name: chaosmesh-agent-secret-api-key
  namespace: chaosmesh-agent
type: Opaque
data:
  key: <echo -n <replace-with-api-key> | base64>
---
apiVersion: v1
kind: Secret
metadata:
  name: regcredinternal
  namespace: chaosmesh-agent
data:
  .dockerconfigjson: <echo -n '{"auths":{"docker.chaosmesh.io":{"username":"_","password":"<replace-with-api-key>","auth":"#echo -n _:<replace-with-api-key> | base64"}}}' | base64>
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
              name: chaosmesh-agent-secret-api-key
              key: key
        securityContext:
          privileged: true
        volumeMounts:
        - name: dev
          mountPath: /dev
        - name: run
          mountPath: /run
        - name: var-run
          mountPath: /var/run
        - name: sys
          mountPath: /sys
        - name: log
          mountPath: /var/log
      imagePullSecrets:
      - name: regcredinternal
      volumes:
      - name: dev
        hostPath:
          path: /dev
      - name: run
        hostPath:
          path: /run
      - name: var-run
        hostPath:
          path: /var/run
      - name: sys
        hostPath:
          path: /sys
      - name: log
        hostPath:
          path: /var/log
```

