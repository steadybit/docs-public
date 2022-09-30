---
title: "Install on Kubernetes"
navTitle: "Kubernetes"
---

When using Kubernetes there are two approaches to setup the platform: Using helm or the manifest directly via `kubectl. We recommend to use the Helm chart.

- [Installation using Helm chart](#installation-using-helm-chart)
- [Installation using kubectl](#installation-using-kubectl)
- [Access from outside via ingress](#access-from-outside-via-ingress)
- [Local test setup via Minikube and NGINX ingress](#local-test-setup-via-minikube-and-nginx-ingress)

### Installation using Helm chart

To install the platform via the chart, first retrieve your steadybit agent key from the [setup page](https://platform.steadybit.io/settings/agents/setup) in the SaaS platform and run the following commands.

Add repo and update contents:

```bash
helm repo add steadybit https://steadybit.github.io/helm-charts
helm repo update
```

Install platform:

```bash
helm install steadybit-platform \
  --create-namespace \
  --namespace steadybit-platform \
  --set agent.key=<replace-with-agent-key> \
  steadybit/steadybit-platform
```

To configure the installation, specify the values on the command line using the --set flag, or provide a yaml file with your values using the -f flag.

For a detailed list of all the configuration parameters, please see our [GitHub Repository](https://github.com/steadybit/helm-charts/tree/main/charts/steadybit-platform).

### Installation using kubectl

To install and configure the steadybit platform within Kubernetes you need to define the manifest.
Below you will see an example of a YAML file to run the steadybit platform. Please replace the string 'replace-with-agent-key' with your specific Agent-Key and run the shown commands to encode the key correctly.

This needs to be done in three steps:

1. Run `echo -n _:<replace-with-agent-key> | base64` and fill in the result into the value for the `auth` key
2. Run `echo -n '{"auths":{"docker.steadybit.io":{"auth":"<replace-with-encoded-key-from-step-1>"}}}' | base64`
3. Fill in the result from Step 2 into the value for the `.dockerconfigjson` key

### Example with external database

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: steadybit-platform
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: steadybit-platform
  namespace: steadybit-platform
---
apiVersion: v1
kind: Secret
metadata:
  name: regcredinternal
  namespace: steadybit-platform
data:
  .dockerconfigjson: <echo -n '{"auths":{"docker.steadybit.io":{"auth":"<echo -n _:<replace-with-agent-key> | base64>"}}}' | base64>
type: kubernetes.io/dockerconfigjson
---
apiVersion: apps/v1
kind: Deployment
metadata:
  namespace: steadybit-platform
  labels:
    run: steadybit-platform
  name: steadybit-platform
spec:
  replicas: 1
  selector:
    matchLabels:
      run: steadybit-platform-exposed
  template:
    metadata:
      labels:
        run: steadybit-platform-exposed
    spec:
      containers:
        - image: docker.steadybit.io/steadybit/platform
          imagePullPolicy: Always
          name: steadybit-platform
          ports:
            - name: ui-port
              containerPort: 8080
              protocol: TCP
            - name: websocket-port
              containerPort: 7878
              protocol: TCP
          env:
            - name: SPRING_DATASOURCE_URL
              value: "<replace-with-jdbc-url>"
            - name: SPRING_DATASOURCE_USERNAME
              value: "<replace-with-jdbc-user>"
            - name: SPRING_DATASOURCE_PASSWORD
              value: "<replace-with-jdbc-password>"
            - name: STEADYBIT_TENANT_AGENTKEY
              value: "<replace-with-agent-key>"
            - name: STEADYBIT_AUTH_PROVIDER
              value: "static"
            - name: STEADYBIT_AUTH_STATIC_0_USERNAME
              value: "admin"
            - name: STEADYBIT_AUTH_STATIC_0_PASSWORD
              value: "{noop}admin"
            - name: STEADYBIT_WEB_PUBLIC_URL
              value: "<replace with public url>"
      imagePullSecrets:
        - name: regcredinternal
---
apiVersion: v1
kind: Service
metadata:
  namespace: steadybit-platform
  labels:
    run: steadybit-platform
  name: steadybit-platform
spec:
  ports:
    - port: 80
      name: ui-port
      protocol: TCP
      targetPort: 8080
    - port: 7878
      name: websocket-port
      protocol: TCP
      targetPort: 7878
  selector:
    run: steadybit-platform-exposed
  type: LoadBalancer
```

### Example with internal database and AWS ALB Ingress Controller

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: steadybit-platform
---
---
# Source: steadybit-platform/templates/serviceaccount.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: steadybit-platform
  namespace: steadybit-platform
  labels:
    app.kubernetes.io/name: steadybit-platform
    app.kubernetes.io/version: 0.6.1
    app.kubernetes.io/instance: steadybit-platform
---
# Source: steadybit-platform/charts/postgresql/templates/secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: steadybit-platform-postgresql
  namespace: steadybit-platform
  labels:
    app.kubernetes.io/name: postgresql
    helm.sh/chart: postgresql-11.1.15
    app.kubernetes.io/instance: steadybit-platform
type: Opaque
data:
  #replace with your own password (base64 encoded)
  postgres-password: "NEV3cUY1S2dUUA=="
  # replace with your own password (base64 encoded)
  password: "aFpTM29FY2N0UQ=="
---
# Source: steadybit-platform/templates/secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: steadybit-platform-pull-secrets
  namespace: steadybit-platform
  labels:
    app.kubernetes.io/name: steadybit-platform
    app.kubernetes.io/version: 0.6.1
    app.kubernetes.io/instance: steadybit-platform
type: kubernetes.io/dockerconfigjson
data:
  .dockerconfigjson: <echo -n '{"auths":{"docker.steadybit.io":{"auth":"<echo -n _:<replace-with-agent-key> | base64>"}}}' | base64>
---
# Source: steadybit-platform/templates/secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: steadybit-platform
  namespace: steadybit-platform
  labels:
    app.kubernetes.io/name: steadybit-platform
    app.kubernetes.io/version: 0.6.1
    app.kubernetes.io/instance: steadybit-platform
type: Opaque
data:
  key: "cTM1aTZvOGo0cG13OXE="
---
# Source: steadybit-platform/charts/postgresql/templates/primary/svc-headless.yaml
apiVersion: v1
kind: Service
metadata:
  name: steadybit-platform-postgresql-hl
  namespace: steadybit-platform
  labels:
    app.kubernetes.io/name: postgresql
    helm.sh/chart: postgresql-11.1.15
    app.kubernetes.io/instance: steadybit-platform
    app.kubernetes.io/component: primary
    # Use this annotation in addition to the actual publishNotReadyAddresses
    # field below because the annotation will stop being respected soon but the
    # field is broken in some versions of Kubernetes:
    # https://github.com/kubernetes/kubernetes/issues/58662
    service.alpha.kubernetes.io/tolerate-unready-endpoints: "true"
spec:
  type: ClusterIP
  clusterIP: None
  # We want all pods in the StatefulSet to have their addresses published for
  # the sake of the other Postgresql pods even before they're ready, since they
  # have to be able to talk to each other in order to become ready.
  publishNotReadyAddresses: true
  ports:
    - name: tcp-postgresql
      port: 5432
      targetPort: tcp-postgresql
  selector:
    app.kubernetes.io/name: postgresql
    app.kubernetes.io/instance: steadybit-platform
    app.kubernetes.io/component: primary
---
# Source: steadybit-platform/charts/postgresql/templates/primary/svc.yaml
apiVersion: v1
kind: Service
metadata:
  name: steadybit-platform-postgresql
  namespace: steadybit-platform
  labels:
    app.kubernetes.io/name: postgresql
    helm.sh/chart: postgresql-11.1.15
    app.kubernetes.io/instance: steadybit-platform
    app.kubernetes.io/component: primary
  annotations:
spec:
  type: ClusterIP
  ports:
    - name: tcp-postgresql
      port: 5432
      targetPort: tcp-postgresql
      nodePort: null
  selector:
    app.kubernetes.io/name: postgresql
    app.kubernetes.io/instance: steadybit-platform
    app.kubernetes.io/component: primary
---
# Source: steadybit-platform/templates/services.yaml
apiVersion: v1
kind: Service
metadata:
  namespace: steadybit-platform
  name: steadybit-platform
  labels:
    app.kubernetes.io/name: steadybit-platform
    app.kubernetes.io/version: 0.6.1
    app.kubernetes.io/instance: steadybit-platform
spec:
  type: LoadBalancer
  ports:
    - port: 80
      name: ui-port
      protocol: TCP
      targetPort: 8080
    - port: 7878
      name: websocket-port
      protocol: TCP
      targetPort: 7878
  selector:
    app.kubernetes.io/name: steadybit-platform
    app.kubernetes.io/instance: steadybit-platform
---
# Source: steadybit-platform/templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  namespace: steadybit-platform
  name: steadybit-platform
  labels:
    app.kubernetes.io/name: steadybit-platform
    app.kubernetes.io/version: 0.6.1
    app.kubernetes.io/instance: steadybit-platform
spec:
  replicas: 1
  minReadySeconds: 60
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 2
      maxUnavailable: 0
  selector:
    matchLabels:
      app.kubernetes.io/name: steadybit-platform
      app.kubernetes.io/instance: steadybit-platform
  template:
    metadata:
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/path: "/actuator/prometheus"
        prometheus.io/port: "9090"
      labels:
        app.kubernetes.io/name: steadybit-platform
        app.kubernetes.io/instance: steadybit-platform
        app.kubernetes.io/name: steadybit-platform
        app.kubernetes.io/version: 0.6.1
        app.kubernetes.io/instance: steadybit-platform
    spec:
      imagePullSecrets:
        - name: steadybit-platform-pull-secrets
      serviceAccountName: steadybit-platform
      containers:
        - name: steadybit-platform
          image: "docker.steadybit.io/steadybit/platform:latest"
          imagePullPolicy: Always
          resources:
            requests:
              memory: 1Gi
              cpu: 1000m
            limits:
              memory: 4Gi
              cpu: 4000m
          ports:
            - name: ui-port
              containerPort: 8080
              protocol: TCP
            - name: websocket-port
              containerPort: 7878
              protocol: TCP
          readinessProbe:
            httpGet:
              port: ui-port
              path: /api/health/readiness
            initialDelaySeconds: 10
            periodSeconds: 5
            timeoutSeconds: 5
            successThreshold: 1
            failureThreshold: 3
          livenessProbe:
            httpGet:
              port: ui-port
              path: /api/health/liveness
            initialDelaySeconds: 10
            periodSeconds: 10
            timeoutSeconds: 5
            successThreshold: 1
            failureThreshold: 5
          startupProbe:
            httpGet:
              port: ui-port
              path: /api/health/liveness
            initialDelaySeconds: 60
            periodSeconds: 10
            timeoutSeconds: 5
            successThreshold: 1
            failureThreshold: 200
          envFrom:
            []
          env:
            - name: LOGGING_FORMAT
              value: "text"
            - name: STEADYBIT_TENANT_MODE
              value: "ONPREM"
            - name: STEADYBIT_TENANT_AGENTKEY
              valueFrom:
                secretKeyRef:
                  name: steadybit-platform
                  key: key
            - name: STEADYBIT_TENANT_KEY
              value: "demo"
            - name: STEADYBIT_TENANT_NAME
              value: "Demo"
            - name: STEADYBIT_WEB_PUBLIC_EXPERIMENT_PORT
              value: "7878"
            - name: SPRING_DATASOURCE_USERNAME
              value: steadybit
            - name: SPRING_DATASOURCE_URL
              value: jdbc:postgresql://steadybit-platform-postgresql:5432/steadybit
            - name: SPRING_DATASOURCE_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: steadybit-platform-postgresql
                  key: "password"
            - name: STEADYBIT_AUTH_PROVIDER
              value: static
            - name: STEADYBIT_AUTH_STATIC_0_USERNAME
              value: admin
            - name: STEADYBIT_AUTH_STATIC_0_PASSWORD
              value: '{noop}admin'
---
# Source: steadybit-platform/charts/postgresql/templates/primary/statefulset.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: steadybit-platform-postgresql
  namespace: steadybit-platform
  labels:
    app.kubernetes.io/name: postgresql
    helm.sh/chart: postgresql-11.1.15
    app.kubernetes.io/instance: steadybit-platform
    app.kubernetes.io/component: primary
  annotations:
spec:
  replicas: 1
  serviceName: steadybit-platform-postgresql-hl
  updateStrategy:
    rollingUpdate: {}
    type: RollingUpdate
  selector:
    matchLabels:
      app.kubernetes.io/name: postgresql
      app.kubernetes.io/instance: steadybit-platform
      app.kubernetes.io/component: primary
  template:
    metadata:
      name: steadybit-platform-postgresql
      labels:
        app.kubernetes.io/name: postgresql
        helm.sh/chart: postgresql-11.1.15
        app.kubernetes.io/instance: steadybit-platform
        app.kubernetes.io/component: primary
      annotations:
    spec:
      serviceAccountName: default

      affinity:
        podAffinity:

        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
            - podAffinityTerm:
                labelSelector:
                  matchLabels:
                    app.kubernetes.io/name: postgresql
                    app.kubernetes.io/instance: steadybit-platform
                    app.kubernetes.io/component: primary
                namespaces:
                  - "steadybit-platform"
                topologyKey: kubernetes.io/hostname
              weight: 1
        nodeAffinity:

      securityContext:
        fsGroup: 1001
      hostNetwork: false
      hostIPC: false
      initContainers:
      containers:
        - name: postgresql
          image: docker.io/bitnami/postgresql:14
          imagePullPolicy: "IfNotPresent"
          securityContext:
            runAsUser: 1001
          env:
            - name: BITNAMI_DEBUG
              value: "false"
            - name: POSTGRESQL_PORT_NUMBER
              value: "5432"
            - name: POSTGRESQL_VOLUME_DIR
              value: "/bitnami/postgresql"
            - name: PGDATA
              value: "/bitnami/postgresql/data"
            # Authentication
            - name: POSTGRES_USER
              value: "steadybit"
            - name: POSTGRES_POSTGRES_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: steadybit-platform-postgresql
                  key: postgres-password
            - name: POSTGRES_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: steadybit-platform-postgresql
                  key: password
            - name: POSTGRES_DB
              value: "steadybit"
            # Replication
            # Initdb
            # Standby
            # LDAP
            - name: POSTGRESQL_ENABLE_LDAP
              value: "no"
            # TLS
            - name: POSTGRESQL_ENABLE_TLS
              value: "no"
            # Audit
            - name: POSTGRESQL_LOG_HOSTNAME
              value: "false"
            - name: POSTGRESQL_LOG_CONNECTIONS
              value: "false"
            - name: POSTGRESQL_LOG_DISCONNECTIONS
              value: "false"
            - name: POSTGRESQL_PGAUDIT_LOG_CATALOG
              value: "off"
            # Others
            - name: POSTGRESQL_CLIENT_MIN_MESSAGES
              value: "error"
            - name: POSTGRESQL_SHARED_PRELOAD_LIBRARIES
              value: "pgaudit"
          ports:
            - name: tcp-postgresql
              containerPort: 5432
          livenessProbe:
            failureThreshold: 6
            initialDelaySeconds: 30
            periodSeconds: 10
            successThreshold: 1
            timeoutSeconds: 5
            exec:
              command:
                - /bin/sh
                - -c
                - exec pg_isready -U "steadybit" -d "dbname=steadybit" -h 127.0.0.1 -p 5432
          readinessProbe:
            failureThreshold: 6
            initialDelaySeconds: 5
            periodSeconds: 10
            successThreshold: 1
            timeoutSeconds: 5
            exec:
              command:
                - /bin/sh
                - -c
                - -e

                - |
                  exec pg_isready -U "steadybit" -d "dbname=steadybit" -h 127.0.0.1 -p 5432
                  [ -f /opt/bitnami/postgresql/tmp/.initialized ] || [ -f /bitnami/postgresql/.initialized ]
          resources:
            limits: {}
            requests:
              cpu: 250m
              memory: 256Mi
          volumeMounts:
            - name: dshm
              mountPath: /dev/shm
            - name: data
              mountPath: /bitnami/postgresql
      volumes:
        - name: dshm
          emptyDir:
            medium: Memory
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes:
          - "ReadWriteOnce"
        resources:
          requests:
            storage: "8Gi"
---
# Source: steadybit-platform/templates/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: steadybit-platform
  namespace: steadybit-platform
  annotations:
    alb.ingress.kubernetes.io/listen-ports: '[{"HTTP": 80}, {"HTTPS":443}]'
    kubernetes.io/ingress.class: alb
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: instance
  labels:
    app.kubernetes.io/name: steadybit-platform
    app.kubernetes.io/version: 0.6.1
    app.kubernetes.io/instance: steadybit-platform
  finalizers:
    - ingress.k8s.aws/resources
spec:
  rules:
    - http:
        paths:
          - pathType: Prefix
            path: /ws
            backend:
              service:
                name: steadybit-platform
                port:
                  number: 7878
          - pathType: Prefix
            path: /
            backend:
              service:
                name: steadybit-platform
                port:
                  number: 80

```


Once the YAML file is customized you can apply it with `kubectl`:

```bash
kubectl apply -f steadybit-platform.yml
```

### Access from outside via ingress

Please keep in mind that you need to define an ingress controller to accesss the platform from the outside. That depends on your chosen K8s distribution. Below you will find examples for an ALB (AWS) and NGINX.

#### ALB

```yaml
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: steadybit-platform-ingress
  namespace: steadybit-platform
  annotations:
    kubernetes.io/ingress.class: alb
    alb.ingress.kubernetes.io/scheme: internet-facing
  labels:
    app: steadybit-platform-ingress
spec:
  rules:
    - http:
        paths:
          - pathType: Prefix
            path: /ws
            backend:
              service:
                name: steadybit-platform
                port:
                  number: 7878
          - pathType: Prefix
            path: /
            backend:
              service:
                name: steadybit-platform
                port:
                  number: 80
```
You can find the public DNS name of the ALB via `kubectl`:

```bash
kubectl get svc -n steadybit-platform
```


#### NGINX

```yaml
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: steadybit-platform-ingress
  namespace: steadybit-platform
spec:
  rules:
    - http:
        paths:
          - pathType: Prefix
            path: /ws
            backend:
              service:
                name: steadybit-platform
                port:
                  number: 7878
          - pathType: Prefix
            path: /
            backend:
              service:
                name: steadybit-platform
                port:
                  number: 80
```

### Local test setup via Minikube and NGINX ingress

Below you find a complete example with Minikube and NGINX as Ingress to setup a local test environment for the platform with a Postgres database. Please replace the string 'replace-with-agent-key' with your specific Agent-Key and run the shown commands to encode the key correctly.

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: steadybit-platform
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: steadybit-platform
  namespace: steadybit-platform
---
apiVersion: v1
kind: Secret
metadata:
  name: regcredinternal
  namespace: steadybit-platform
data:
  .dockerconfigjson: <echo -n '{"auths":{"docker.steadybit.io":{"auth":"<echo -n _:<replace-with-agent-key> | base64>"}}}' | base64>
type: kubernetes.io/dockerconfigjson
---
apiVersion: apps/v1
kind: Deployment
metadata:
  namespace: steadybit-platform
  name: postgres
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
        - name: postgres
          image: postgres:11.5
          imagePullPolicy: "IfNotPresent"
          ports:
            - containerPort: 5432
          env:
            - name: POSTGRES_DB
              value: "steadybitdb"
            - name: POSTGRES_USER
              value: "postgres"
            - name: POSTGRES_PASSWORD
              value: "postgres"
---
apiVersion: v1
kind: Service
metadata:
  namespace: steadybit-platform
  name: postgres
  labels:
    app: postgres
spec:
  type: NodePort
  ports:
    - port: 5432
  selector:
    app: postgres
---
apiVersion: apps/v1
kind: Deployment
metadata:
  namespace: steadybit-platform
  labels:
    run: steadybit-platform
  name: steadybit-platform
spec:
  replicas: 1
  selector:
    matchLabels:
      run: steadybit-platform-exposed
  template:
    metadata:
      labels:
        run: steadybit-platform-exposed
    spec:
      containers:
        - image: docker.steadybit.io/steadybit/platform
          imagePullPolicy: Always
          name: steadybit-platform
          ports:
            - name: ui-port
              containerPort: 8080
              protocol: TCP
            - name: websocket-port
              containerPort: 7878
              protocol: TCP
          env:
            - name: SPRING_DATASOURCE_URL
              value: "jdbc:postgresql://postgres.steadybit-platform:5432/steadybitdb"
            - name: SPRING_DATASOURCE_USERNAME
              value: "postgres"
            - name: SPRING_DATASOURCE_PASSWORD
              value: "postgres"
            - name: STEADYBIT_TENANT_AGENTKEY
              value: "foobar"
            - name: STEADYBIT_AUTH_PROVIDER
              value: "static"
            - name: STEADYBIT_AUTH_STATIC_0_USERNAME
              value: "admin"
            - name: STEADYBIT_AUTH_STATIC_0_PASSWORD
              value: "{noop}admin"
      imagePullSecrets:
        - name: regcredinternal
---
apiVersion: v1
kind: Service
metadata:
  namespace: steadybit-platform
  labels:
    run: steadybit-platform
  name: steadybit-platform
spec:
  ports:
    - port: 80
      name: ui-port
      protocol: TCP
      targetPort: 8080
    - port: 7878
      name: websocket-port
      protocol: TCP
      targetPort: 7878
  selector:
    run: steadybit-platform-exposed
  type: LoadBalancer
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: steadybit-platform-ingress
  namespace: steadybit-platform
spec:
  rules:
    - http:
        paths:
          - pathType: Prefix
            path: /ws
            backend:
              service:
                name: steadybit-platform
                port:
                  number: 7878
          - pathType: Prefix
            path: /
            backend:
              service:
                name: steadybit-platform
                port:
                  number: 80
```

First install Minikube to run on your system: https://minikube.sigs.k8s.io/docs/start

Start the cluster and enable the ingress resource:

```sh
minikube start --driver=hyperkit
minikube addons enable ingress
```

Check if ingress is running. This could take a few seconds:

```sh
kubectl get -n steadybit-platform ingress
```

Apply manifest:

```sh
kubectl apply -f <steadybit-platform-deployment-minikube.yml>
```

Get the external IP of your cluster:

```sh
minikube ip
```

Add the following line to the bottom of the `/etc/hosts` file:

```sh
<replace with ip from above> platform.steadybit.local
```

Now you should be able to access the platform in your browser.
