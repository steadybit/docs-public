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
    verbs: [ "get", "list", "watch" ]
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
