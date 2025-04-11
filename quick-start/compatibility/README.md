# Compatibility

Steadybit offers a wide variety of fault injections, checks and integrations (called [actions](/concepts/actions/README.md) for Chaos experiments which are provided by Steadybit's open-source [extensions](/integrate-with-steadybit/extensions/README.md).
These actions can be combined in a timeline-based editor to build your chaos engineering experiment. 

This page serves you as an overview of the supported technologies.
A detailed list is available on the [Steadybit Reliability Hub](https://hub.steadybit.com).

## Containers

The following capabilities are available when targeting containers.

### Network-related Attacks

|                                                                      | Block DNS | Block Traffic | Corrupt Outgoing Packages | Delay Outgoing Traffic | Drop Outgoing Traffic | Limit Outgoing Bandwidth |
|----------------------------------------------------------------------|-----------|---------------|---------------------------|------------------------|-----------------------|--------------------------|
| Docker                                                               | ✅         | ✅             | ✅                         | ✅                      | ✅                     | ✅                        |
| CRI-O                                                                | ✅         | ✅             | ✅                         | ✅                      | ✅                     | ✅                        |
| containerd                                                           | ✅         | ✅             | ✅                         | ✅                      | ✅                     | ✅                        |
| Kubernetes                                                           | ✅         | ✅             | ✅                         | ✅                      | ✅                     | ✅                        |
| Red Hat OpenShift                                                    | ✅         | ✅             | ✅                         | ✅                      | ✅                     | ✅                        |
| AWS Elastic Kubernetes Service (EKS)                                 | ✅         | ✅             | ✅                         | ✅                      | ✅                     | ✅                        |
| AWS Elastic Container Service (ECS) on [EC2](#user-content-fn-4)[^4] | ✅         | ✅             | ✅                         | ✅                      | ✅                     | ✅                        |
| AWS Elastic Container Service (ECS) on Fargate                       | ❌         | ❌             | ❌                         | ❌                      | ❌                     | ❌                        |
| Google Kubernetes Engine (GKE)                                       | ✅         | ✅             | ✅                         | ✅                      | ✅                     | ✅                        |
| Google Kubernetes Engine (GKE, [Autopilot](#user-content-fn-1)[^1])  | ✅         | ✅             | ✅                         | ✅                      | ✅                     | ✅                        |
| Azure Kubernetes Service (AKS)                                       | ✅         | ✅             | ✅                         | ✅                      | ✅                     | ✅                        |
| minikube                                                             | ✅         | ✅             | ✅                         | ✅                      | ✅                     | ✅                        |

### Resource-related Attacks

|                                                                      | Fill Disk | Fill Memory | Stress CPU | Stress IO | Stress Memory |
|----------------------------------------------------------------------|-----------|-------------|------------|-----------|---------------|
| Docker                                                               | ✅         | ✅           | ✅          | ✅         | ✅             |
| CRI-O                                                                | ✅         | ✅           | ✅          | ✅         | ✅             |
| containerd                                                           | ✅         | ✅           | ✅          | ✅         | ✅             |
| Kubernetes                                                           | ✅         | ✅           | ✅          | ✅         | ✅             |
| Red Hat OpenShift                                                    | ✅         | ✅           | ✅          | ✅         | ✅             |
| AWS Elastic Kubernetes Service (EKS)                                 | ✅         | ✅           | ✅          | ✅         | ✅             |
| AWS Elastic Container Service (ECS) on [EC2](#user-content-fn-4)[^4] | ✅         | ✅           | ✅          | ✅         | ✅             |
| AWS Elastic Container Service (ECS) on Fargate                       | ✅         | ❌           | ✅          | ✅         | ✅             |
| Google Kubernetes Engine (GKE)                                       | ✅         | ✅           | ✅          | ✅         | ✅             |
| Google Kubernetes Engine (GKE, [Autopilot](#user-content-fn-1)[^1])  | ✅         | ✅           | ✅          | ✅         | ✅             |
| Azure Kubernetes Service (AKS)                                       | ✅         | ✅           | ✅          | ✅         | ✅             |
| minikube                                                             | ✅         | ✅           | ✅          | ✅         | ✅             |

### State-related Attacks

|                                                                      | Pause Container | Stop Container              |
|----------------------------------------------------------------------|-----------------|-----------------------------|
| Docker                                                               | ✅               | ✅                           |
| CRI-O                                                                | ✅               | ✅                           |
| containerd                                                           | ✅               | ✅                           |
| Kubernetes                                                           | ✅               | ✅                           |
| Red Hat OpenShift                                                    | ✅               | ✅                           |
| AWS Elastic Kubernetes Service (EKS)                                 | ✅               | ✅                           |
| AWS Elastic Container Service (ECS) on [EC2](#user-content-fn-4)[^4] | ✅               | ✅                           |
| AWS Elastic Container Service (ECS) on Fargate                       | ❌               | [✅](#user-content-fn-5)[^5] |
| Google Kubernetes Engine (GKE)                                       | ✅               | ✅                           |
| Google Kubernetes Engine (GKE, [Autopilot](#user-content-fn-1)[^1])  | ✅               | ✅                           |
| Azure Kubernetes Service (AKS)                                       | ✅               | ✅                           |
| minikube                                                             | ✅               | ✅                           |

## Kubernetes environments

In addition to the above, the following Kubernetes specific actions are available.

### Attacks

|                                           | Cause Crash Loop | Delete Pod | Rollout Restart Deployment | Scale Deployment | Scale StatefulSet | Taint Node |
|-------------------------------------------|------------------|------------|----------------------------|------------------|-------------------|------------|
| Kubernetes                                | ✅                | ✅          | ✅                          | ✅                | ✅                 | ✅          |
| Red Hat OpenShift                         | ✅                | ✅          | ✅                          | ✅                | ✅                 | ✅          |
| AWS Elastic Kubernetes Service (EKS)      | ✅                | ✅          | ✅                          | ✅                | ✅                 | ✅          |
| Google Kubernetes Engine (GKE)            | ✅                | ✅          | ✅                          | ✅                | ✅                 | ✅          |
| Google Kubernetes Engine (GKE, Autopilot) | ✅                | ✅          | ✅                          | ✅                | ✅                 | ❌          |
| Azure Kubernetes Service (AKS)            | ✅                | ✅          | ✅                          | ✅                | ✅                 | ✅          |
| minikube                                  | ✅                | ✅          | ✅                          | ✅                | ✅                 | ✅          |

### Checks

|                                           | DaemonSet Pod Count | Deployment Pod Count | Deployment Rollout Status | Node Count | StatefulSet Pod Count |
|-------------------------------------------|---------------------|----------------------|---------------------------|------------|-----------------------|
| Kubernetes                                | ✅                   | ✅                    | ✅                         | ✅          | ✅                     |
| Red Hat OpenShift                         | ✅                   | ✅                    | ✅                         | ✅          | ✅                     |
| AWS Elastic Kubernetes Service (EKS)      | ✅                   | ✅                    | ✅                         | ✅          | ✅                     |
| Google Kubernetes Engine (GKE)            | ✅                   | ✅                    | ✅                         | ✅          | ✅                     |
| Google Kubernetes Engine (GKE, Autopilot) | ✅                   | ✅                    | ✅                         | ✅          | ✅                     |
| Azure Kubernetes Service (AKS)            | ✅                   | ✅                    | ✅                         | ✅          | ✅                     |
| minikube                                  | ✅                   | ✅                    | ✅                         | ✅          | ✅                     |

### Other Actions

|                                           | Display Pod Count Metrics | Display Kubernetes Event Logs |
|-------------------------------------------|---------------------------|-------------------------------|
| Kubernetes                                | ✅                         | ✅                             |
| Red Hat OpenShift                         | ✅                         | ✅                             |
| AWS Elastic Kubernetes Service (EKS)      | ✅                         | ✅                             |
| Google Kubernetes Engine (GKE)            | ✅                         | ✅                             |
| Google Kubernetes Engine (GKE, Autopilot) | ✅                         | ✅                             |
| Azure Kubernetes Service (AKS)            | ✅                         | ✅                             |
| minikube                                  | ✅                         | ✅                             |

## Physical and virtual hosts

The following attacks are available when working with physical hosts and virtual machines (both 64-bit PC and 64-bit ARM architectures).

### Network-related Attacks

{% include "./hosts-network.md" %}

### Resource-related Attacks

{% include "./hosts-resource.md" %}

### State-related Attacks

{% include "./hosts-state.md" %}

## Cloud Providers

Steadybit supports fault injection on all major cloud providers and an ever-growing list of managed services.

### AWS

#### AWS EC2

### Network-related Attacks

{% include "./hosts-network.md" %}

### Resource-related Attacks

{% include "./hosts-resource.md" %}

### State-related Attacks

{% include "./hosts-state.md" %}

|              | Hibernate | Reboot | Start | Stop | Terminate | 
|--------------|-----------|:-------|:------|:-----|:----------|
| EC2 Instance | ✅         | ✅      | ✅     | ✅    | ✅   |




#### AWS ECS on EC2

Steadybit's capabilities for AWS ECS on EC2 are described above at the level of [container](#containers) and [pysical and virtual hosts](#physical-and-virtual-hosts).  Additionally, the [AWS extension](https://hub.steadybit.com/extension/com.steadybit.extension_aws) supports API-based capabilities for [EC2s](https://hub.steadybit.com/target/com.steadybit.extension_aws.ec2-instance).
Also, Steadybit supports [AWS ECS Service](https://hub.steadybit.com/target/com.steadybit.extension_aws.ecs-service)-level attacks like [Scale Service](https://hub.steadybit.com/action/com.steadybit.extension_aws.ecs-service.scale) attack, [Service Task Count](https://hub.steadybit.com/action/com.steadybit.extension_aws.ecs-service.task_count_check) check, and [Service Event Log](https://hub.steadybit.com/action/com.steadybit.extension_aws.ecs-service.event_log) action.

#### AWS ECS on Fargate

Steadybit's capabilities for AWS ECS on Fargate are described above at [container level capabilities](#containers).
Also, Steadybit supports [AWS ECS Service](https://hub.steadybit.com/target/com.steadybit.extension_aws.ecs-service)-level attacks like [Scale Service](https://hub.steadybit.com/action/com.steadybit.extension_aws.ecs-service.scale) attack, [Service Task Count](https://hub.steadybit.com/action/com.steadybit.extension_aws.ecs-service.task_count_check) check, and [Service Event Log](https://hub.steadybit.com/action/com.steadybit.extension_aws.ecs-service.event_log) action.

#### AWS EKS (Elastic Kubernetes Service)

Capabilities for managed Kubernetes clusters in AWS EKS are identical to fault injection in unmanaged Kubernetes clusters, see [container-](#containers), [host-](#physical-and-virtual-hosts), and [Kubernetes-based](#kubernetes-environments) capabilities above.

#### AWS Elastic Load Balancing

Application load balancers are supported on API-level by the [AWS extension](https://hub.steadybit.com/target/com.steadybit.extension_aws.alb).

#### AWS Elasticache

Elasticache in AWS are supported by the [AWS extension](https://hub.steadybit.com/target/com.steadybit.extension_aws.elasticache.node-group).

#### AWS Fault Injection Service (FIS)

Steadybit integrates with AWS FIS experiment templates, which makes it easy to inject faults into additional managed services. See the [AWS extension](https://hub.steadybit.com/target/com.steadybit.extension_aws.fis-experiment-template) for more details.

#### AWS Lambda

Lambdas are supported by the [AWS extension](https://hub.steadybit.com/target/com.steadybit.extension_aws.lambda).

#### AWS Managed Streaming for Apache Kafka (MSK)

Managed Kafka instances are supported by the [AWS extension](https://hub.steadybit.com/target/com.steadybit.extension_aws.msk.cluster.broker). In addition, you can leverage Steadybit's capabilities for [Kafka](#kafka).

#### AWS Relational Database Service (RDS)

Capabilities for AWS RDS are covered by the [AWS extension](https://hub.steadybit.com/extension/com.steadybit.extension_aws) on [RDS cluster](https://hub.steadybit.com/target/com.steadybit.extension_aws.rds.cluster) and [RDS instance](https://hub.steadybit.com/target/com.steadybit.extension_aws.rds.instance) level. 

#### Other AWS Services

Steadybit has cross-services capabilities like simulating a full [availability zone outage](https://hub.steadybit.com/target/com.steadybit.extension_aws.zone) or [partial zone outage via subnets](https://hub.steadybit.com/target/com.steadybit.extension_aws.ec2-subnet).

Additional managed services are covered via [AWS FIS](#fault-injection-service-fis), or will be added to Steadybit natively in the future.

### Azure

#### Azure Kubernetes Service (AKS)

Capabilities for managed Kubernetes clusters in Azure are identical to fault injection in unmanaged Kubernetes clusters, see [container-](#containers), [host-](#physical-and-virtual-hosts), and [Kubernetes-based](#kubernetes-environments) capabilities above.

#### Azure Event Hub

Azure Event Hub leveraging Kafka-compatibility are supported by Steadybit's capabilities for [Kafka](#kafka).

#### Azure Virtual Machines (VMs)

You can leverage Steadybit's capabilities for [pysical and virtual hosts](#physical-and-virtual-hosts) in your Azure VMs. Additionally, the [Azure extension](https://hub.steadybit.com/extension/com.steadybit.extension_azure) supports API-based capabilities for [Virtual Machines](https://hub.steadybit.com/target/com.steadybit.extension_azure.vm) and [Virtual Machine Scale Set Instances](https://hub.steadybit.com/target/com.steadybit.extension_azure.scale_set.instance).

#### Other Azure Services

More Azure services will be added to the [Azure](https://hub.steadybit.com/extension/com.steadybit.extension_azure) extension in the future.

### GCP

#### Google Kubernetes Engine (GKE)

Capabilities for managed Kubernetes clusters in GCP are identical to fault injection in unmanaged Kubernetes clusters, see [container-](#containers), [host-](#physical-and-virtual-hosts), and [Kubernetes-based](#kubernetes-environments) capabilities above.

#### GCP Virtual machines (VMs)

You can leverage Steadybit's capabilities for [pysical and virtual hosts](#physical-and-virtual-hosts) in your GCP VMs. Additionally, the [GCP extension](https://hub.steadybit.com/extension/com.steadybit.extension_gcp) supports API-based capabilities for [Virtual Machines](https://hub.steadybit.com/target/com.steadybit.extension_gcp.vm).

#### Other GCP Services

More GCP services will be added to the [GCP](https://hub.steadybit.com/extension/com.steadybit.extension_gcp) extension in the future.

## Service Mesh & API Gateway

Steadybit provides the following fault injections for service meshes and api gateways.

|       | GRPC Abort | HTTP Abort | HTTP Delay |
|-------|------------|------------|------------|
| Istio | ✅          | ✅          | ✅          |
| Kong  | ❌          | ✅          | ❌          |

## Kafka

Steadybit offers comprehensive support for chaos experiments on Kafka infrastructure.
Please visit the [Kafka extension page on the Steadybit Reliability Hub](https://hub.steadybit.com/extension/com.steadybit.extension_kafka) for details.

## Observability

Steadybit supports the following observability-related experiment actions:

|            | [Check for Alerts](#user-content-fn-2)[^2] | [Mute Alerts](#user-content-fn-2)[^2] | [Send Events](#user-content-fn-3)[^3] |
|------------|--------------------------------------------|---------------------------------------|---------------------------------------|
| Datadog    | ✅                                          | ✅                                     | ✅                                     |
| Dynatrace  | ✅                                          | ✅                                     | ✅                                     |
| Grafana    | ✅                                          | ❌                                     | ✅                                     |
| Instana    | ✅                                          | ✅                                     | ❌                                     |
| New Relic  | ✅                                          | ✅                                     | ✅                                     |
| Prometheus | ✅                                          | ❌                                     | ❌                                     |
| StackState | ✅                                          | ❌                                     | ❌                                     |

## Load Testing

Steadybit integrates with the following load-testing solutions:

|                                     | Run Load Test from Experiment | Run Experiment from Load Test |
|-------------------------------------|-------------------------------|-------------------------------|
| Micro Focus LoadRunner Professional | ❌                             | ✅                             |
| Micro Focus LoadRunner Enterprise   | ❌                             | ✅                             |
| Gatling                             | ✅                             | ❌                             |
| JMeter                              | ✅                             | ❌                             |
| K6                                  | ✅                             | ✅                             |
| K6 Cloud                            | ✅                             | ✅                             |


[^1]: Allow-listing Steadybit is required for container-level attacks in Autopilot-managed GKE clusters. Container attacks in the following namespaces are
disabled: `kube-system`, `gke-gmp-system`, `composer-system`, `gke-managed-*`

[^2]: Different observability integrations us different names for these action. Please check the [Steadybit Reliability Hub](https://hub.steadybit.com) for more
details.

[^3]: Synthetic events will be sent to the observability solution to mark the beginning and end of every experiment action to facilitate root cause analysis.

[^4]: extension-host and extension-container needs to run in privileged mode and network mode host is required for the extensions.

[^5]: Stop container is equivalent to stop task in AWS ECS on Fargate
