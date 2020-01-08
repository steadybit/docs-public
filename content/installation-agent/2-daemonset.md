---
title: "Install on Kubernetes"
navTitle: "Kubernetes"
---

### Daemonset

To install and configure chaosmesh within Kubernetes as a DaemonSet you need to define the DaemonSet YAML file. 
Below you will see an example of a YAML file to run the chaosmesh agent. Please replace the string 'replace-with-api-key' with your specific API-Key and run the shown commands to encode the key correctly.

```sh
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
apiVersion: v1
kind: Secret
metadata:
  name: chaosmesh-agent-secret-api-key
  namespace: chaosmesh-agent
type: Opaque
data:
  key: # echo -n <replace-with-api-key> | base64
---
apiVersion: v1
kind: Secret
metadata:
  name: regcredinternal
  namespace: chaosmesh-agent
data:
  .dockerconfigjson: # echo -n '{"auths":{"docker.chaosmesh.io":{"username":"_","password":"<replace-with-api-key>","auth":"#echo -n _:<replace-with-api-key> | base64"}}}' |base64
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
      serviceAccount: chaosmesh-agent
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
        - name: CHAOSMESH_AGENT_API_KEY
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
---
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: chaosmesh-agent-role
rules:
- nonResourceURLs:
  - "/version"
  - "/healthz"
  verbs: ["get"]
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
  verbs: ["get", "list", "watch"]
- apiGroups: [""]
  resources:
  - "namespaces"
  - "events"
  - "services"
  - "endpoints"
  - "nodes"
  - "pods"
  - "replicationcontrollers"
  - "componentstatuses"
  - "resourcequotas"
  verbs: ["get", "list", "watch"]
- apiGroups: [""]
  resources:
  - "endpoints"
  verbs: ["create", "update", "patch"]
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
```

Once the YAML file is customized you can start it with kubectl:

```sh
kubectl apply -f chaosmesh-agent.yml
```
