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
  - apiGroups: [ "networking.k8s.io" ]
    resources:
      - "ingresses"
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
        - name: STEADYBIT_KUBERNETES_CLUSTER_NAME
          value: my-k8s-cluster
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
        securityContext:
          privileged: true
        volumeMounts:
        - name: var-run
          mountPath: /var/run
        - name: log
          mountPath: /var/log
        - name: sys-kernel
          mountPath: /sys/kernel
      imagePullSecrets:
      - name: regcredinternal
      volumes
      - name: var-run
        hostPath:
          path: /var/run
      - name: log
        hostPath:
          path: /var/log
      - name: sys-kernel
        hostPath:
          path: /sys/kernel
```
