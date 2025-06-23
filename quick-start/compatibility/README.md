# Compatibility

Steadybit offers a wide variety of fault injections, checks and integrations (called [actions](../../concepts/actions/) for Chaos experiments which are provided by Steadybit's open-source [extensions](../../integrate-with-steadybit/extensions/).\
These actions can be combined in a timeline-based editor to build your chaos engineering experiment.

This page serves you as an overview of the supported technologies.\
A detailed list is available on the [Steadybit Reliability Hub](https://hub.steadybit.com).

## Containers

The following capabilities are available when targeting containers, running standalone or in a container orchestration platform like Kubernetes:

### Network Attacks

|                                                | Block DNS | Block Traffic | Corrupt Outgoing Packages | Delay Outgoing Traffic | Drop Outgoing Traffic | Limit Outgoing Bandwidth |
| ---------------------------------------------- | --------- | ------------- | ------------------------- | ---------------------- | --------------------- | ------------------------ |
| Docker                                         | ✅         | ✅             | ✅                         | ✅                      | ✅                     | ✅                        |
| CRI-O                                          | ✅         | ✅             | ✅                         | ✅                      | ✅                     | ✅                        |
| containerd                                     | ✅         | ✅             | ✅                         | ✅                      | ✅                     | ✅                        |
| Kubernetes                                     | ✅         | ✅             | ✅                         | ✅                      | ✅                     | ✅                        |
| Red Hat OpenShift                              | ✅         | ✅             | ✅                         | ✅                      | ✅                     | ✅                        |
| AWS Elastic Kubernetes Service (EKS)           | ✅         | ✅             | ✅                         | ✅                      | ✅                     | ✅                        |
| AWS Elastic Container Service (ECS) on EC2[^1] | ✅         | ✅             | ✅                         | ✅                      | ✅                     | ✅                        |
| AWS Elastic Container Service (ECS) on Fargate | ✅         | ✅             | ❌                         | ✅                      | ✅                     | ❌                        |
| Google Kubernetes Engine (GKE)                 | ✅         | ✅             | ✅                         | ✅                      | ✅                     | ✅                        |
| Google Kubernetes Engine (GKE, Autopilot[^2])  | ✅         | ✅             | ✅                         | ✅                      | ✅                     | ✅                        |
| Azure Kubernetes Service (AKS)                 | ✅         | ✅             | ✅                         | ✅                      | ✅                     | ✅                        |
| minikube                                       | ✅         | ✅             | ✅                         | ✅                      | ✅                     | ✅                        |

### Resource Attacks

|                                                | Fill Disk | Fill Memory | Stress CPU | Stress IO | Stress Memory |
| ---------------------------------------------- | --------- | ----------- | ---------- | --------- | ------------- |
| Docker                                         | ✅         | ✅           | ✅          | ✅         | ✅             |
| CRI-O                                          | ✅         | ✅           | ✅          | ✅         | ✅             |
| containerd                                     | ✅         | ✅           | ✅          | ✅         | ✅             |
| Kubernetes                                     | ✅         | ✅           | ✅          | ✅         | ✅             |
| Red Hat OpenShift                              | ✅         | ✅           | ✅          | ✅         | ✅             |
| AWS Elastic Kubernetes Service (EKS)           | ✅         | ✅           | ✅          | ✅         | ✅             |
| AWS Elastic Container Service (ECS) on EC2[^1] | ✅         | ✅           | ✅          | ✅         | ✅             |
| AWS Elastic Container Service (ECS) on Fargate | ✅         | ❌           | ✅          | ✅         | ✅             |
| Google Kubernetes Engine (GKE)                 | ✅         | ✅           | ✅          | ✅         | ✅             |
| Google Kubernetes Engine (GKE, Autopilot[^2])  | ✅         | ✅           | ✅          | ✅         | ✅             |
| Azure Kubernetes Service (AKS)                 | ✅         | ✅           | ✅          | ✅         | ✅             |
| minikube                                       | ✅         | ✅           | ✅          | ✅         | ✅             |

### State Attacks

|                                                | Pause Container | Stop Container |
| ---------------------------------------------- | --------------- | -------------- |
| Docker                                         | ✅               | ✅              |
| CRI-O                                          | ✅               | ✅              |
| containerd                                     | ✅               | ✅              |
| Kubernetes                                     | ✅               | ✅              |
| Red Hat OpenShift                              | ✅               | ✅              |
| AWS Elastic Kubernetes Service (EKS)           | ✅               | ✅              |
| AWS Elastic Container Service (ECS) on EC2[^1] | ✅               | ✅              |
| AWS Elastic Container Service (ECS) on Fargate | ❌               | ✅[^3]          |
| Google Kubernetes Engine (GKE)                 | ✅               | ✅              |
| Google Kubernetes Engine (GKE, Autopilot[^2])  | ✅               | ✅              |
| Azure Kubernetes Service (AKS)                 | ✅               | ✅              |
| minikube                                       | ✅               | ✅              |

## Kubernetes

Steadybit's capabilities for [containers](./#containers) and [physical and virtual hosts](./#physical-and-virtual-hosts) also work within Kubernetes clusters:

{% content-ref url="./#containers" %}
[#containers](./#containers)
{% endcontent-ref %}

{% content-ref url="./#physical-and-virtual-hosts" %}
[#physical-and-virtual-hosts](./#physical-and-virtual-hosts)
{% endcontent-ref %}

On top, Steadybit supports attacks based on the Kubernetes API:

### Attacks

|                                           | Cause Crash Loop | Delete Pod | Rollout Restart Deployment | Scale Deployment | Scale StatefulSet | Taint Node |
| ----------------------------------------- | ---------------- | ---------- | -------------------------- | ---------------- | ----------------- | ---------- |
| Kubernetes                                | ✅                | ✅          | ✅                          | ✅                | ✅                 | ✅          |
| Red Hat OpenShift                         | ✅                | ✅          | ✅                          | ✅                | ✅                 | ✅          |
| AWS Elastic Kubernetes Service (EKS)      | ✅                | ✅          | ✅                          | ✅                | ✅                 | ✅          |
| Google Kubernetes Engine (GKE)            | ✅                | ✅          | ✅                          | ✅                | ✅                 | ✅          |
| Google Kubernetes Engine (GKE, Autopilot) | ✅                | ✅          | ✅                          | ✅                | ✅                 | ❌          |
| Azure Kubernetes Service (AKS)            | ✅                | ✅          | ✅                          | ✅                | ✅                 | ✅          |
| minikube                                  | ✅                | ✅          | ✅                          | ✅                | ✅                 | ✅          |

### Checks

|                                           | DaemonSet Pod Count | Deployment Pod Count | Deployment Rollout Status | Node Count | StatefulSet Pod Count |
| ----------------------------------------- | ------------------- | -------------------- | ------------------------- | ---------- | --------------------- |
| Kubernetes                                | ✅                   | ✅                    | ✅                         | ✅          | ✅                     |
| Red Hat OpenShift                         | ✅                   | ✅                    | ✅                         | ✅          | ✅                     |
| AWS Elastic Kubernetes Service (EKS)      | ✅                   | ✅                    | ✅                         | ✅          | ✅                     |
| Google Kubernetes Engine (GKE)            | ✅                   | ✅                    | ✅                         | ✅          | ✅                     |
| Google Kubernetes Engine (GKE, Autopilot) | ✅                   | ✅                    | ✅                         | ✅          | ✅                     |
| Azure Kubernetes Service (AKS)            | ✅                   | ✅                    | ✅                         | ✅          | ✅                     |
| minikube                                  | ✅                   | ✅                    | ✅                         | ✅          | ✅                     |

### Other Actions

|                                           | Display Pod Count Metrics | Display Kubernetes Event Logs |
| ----------------------------------------- | ------------------------- | ----------------------------- |
| Kubernetes                                | ✅                         | ✅                             |
| Red Hat OpenShift                         | ✅                         | ✅                             |
| AWS Elastic Kubernetes Service (EKS)      | ✅                         | ✅                             |
| Google Kubernetes Engine (GKE)            | ✅                         | ✅                             |
| Google Kubernetes Engine (GKE, Autopilot) | ✅                         | ✅                             |
| Azure Kubernetes Service (AKS)            | ✅                         | ✅                             |
| minikube                                  | ✅                         | ✅                             |

## Physical and Virtual Hosts

The following attacks are available when working with physical hosts and virtual machines (both 64-bit PC and 64-bit ARM architectures).

### Network Attacks

|                     | Block DNS | Block Traffic | Corrupt Outgoing Packages | Delay Outgoing Traffic | Drop Outgoing Traffic | Limit Outgoing Bandwidth |
| -----------------   | --------- | ------------- | ------------------------- | ---------------------- | --------------------- | ------------------------ |
| Ubuntu 20.04        | ✅        | ✅            | ✅                        | ✅                     | ✅                    | ✅                       |
| Ubuntu 22.04        | ✅        | ✅            | ✅                        | ✅                     | ✅                    | ✅                       |
| Ubuntu 24.04        | ✅        | ✅            | ✅                        | ✅                     | ✅                    | ✅                       |
| Fedora Latest       | ✅        | ✅            | ✅                        | ✅                     | ✅                    | ✅                       |
| Debian Bookworm     | ✅        | ✅            | ✅                        | ✅                     | ✅                    | ✅                       |
| Debian Bullseye     | ✅        | ✅            | ✅                        | ✅                     | ✅                    | ✅                       |
| Amazon Linux 2      | ✅        | ✅            | ✅                        | ✅                     | ✅                    | ✅                       |
| Amazon Linux 2023   | ✅        | ✅            | ✅                        | ✅                     | ✅                    | ✅                       |
| Windows 11          | ✅        | ✅            | ✅                        | ✅                     | ✅                    | ✅                       |
| Windows Server 2022 | ✅        | ✅            | ✅                        | ✅                     | ✅                    | ✅                       |

{% hint style="info" %}
Other .exe, .deb and .rpm-based distributions will mostly likely work, too, but aren't explicitly tested on.
{% endhint %}

### Resource Attacks

|                   | Fill Disk | Fill Memory | Stress CPU | Stress IO | Stress Memory |
| ----------------- | --------- | ----------- | ---------- | --------- | ------------- |
| Ubuntu 20.04      | ✅         | ✅           | ✅          | ✅         | ✅             |
| Ubuntu 22.04      | ✅         | ✅           | ✅          | ✅         | ✅             |
| Ubuntu 24.04      | ✅         | ✅           | ✅          | ✅         | ✅             |
| Fedora Latest     | ✅         | ✅           | ✅          | ✅         | ✅             |
| Debian Bookworm   | ✅         | ✅           | ✅          | ✅         | ✅             |
| Debian Bullseye   | ✅         | ✅           | ✅          | ✅         | ✅             |
| Amazon Linux 2    | ✅         | ✅           | ✅          | ✅         | ✅             |
| Amazon Linux 2023 | ✅         | ✅           | ✅          | ✅         | ✅             |

{% hint style="info" %}
Other .deb and .rpm-based distributions will mostly likely work, too, but aren't explicitly tested on.
{% endhint %}

### State Attacks

|                   | Shutdown Host | Stop Process | Time Travel |
| ----------------- | ------------- | ------------ | ----------- |
| Ubuntu 20.04      | ✅             | ✅            | ✅           |
| Ubuntu 22.04      | ✅             | ✅            | ✅           |
| Ubuntu 24.04      | ✅             | ✅            | ✅           |
| Fedora Latest     | ✅             | ✅            | ✅           |
| Debian Bookworm   | ✅             | ✅            | ✅           |
| Debian Bullseye   | ✅             | ✅            | ✅           |
| Amazon Linux 2    | ✅             | ✅            | ✅           |
| Amazon Linux 2023 | ✅             | ✅            | ✅           |

{% hint style="info" %}
Other .deb and .rpm-based distributions will mostly likely work, too, but aren't explicitly tested on.
{% endhint %}

## Cloud Providers

Steadybit supports fault injection on all major cloud providers and an ever-growing list of managed services.

### AWS

#### AWS EC2

Steadybit's capabilities for [physical and virtual hosts](./#physical-and-virtual-hosts) also work for AWS EC2 environments:

{% content-ref url="./#physical-and-virtual-hosts" %}
[#physical-and-virtual-hosts](./#physical-and-virtual-hosts)
{% endcontent-ref %}

On top, Steadybit supports attacks based on the AWS EC2 API:

|              | Hibernate | Reboot | Start | Stop | Terminate |
| ------------ | --------- | ------ | ----- | ---- | --------- |
| EC2 Instance | ✅         | ✅      | ✅     | ✅    | ✅         |

#### AWS ECS on EC2

Steadybit's capabilities for [AWS EC2s](./#aws-ec2), and [containers](./#containers) also work for AWS ECS on EC2 environments:

{% content-ref url="./#aws-ec2" %}
[#aws-ec2](./#aws-ec2)
{% endcontent-ref %}

{% content-ref url="./#containers" %}
[#containers](./#containers)
{% endcontent-ref %}

On top, Steadybit provides capabilities based on the AWS ECS API:

{% include "fragment-aws-ecs-service.md" %}

#### AWS ECS on Fargate

Steadybit's capabilities for [containers](./#containers) also work for AWS ECS on Fargate environments:

{% content-ref url="./#containers" %}
[#containers](./#containers)
{% endcontent-ref %}

On top, Steadybit provides capabilities based on the AWS ECS API:

{% include "fragment-aws-ecs-service.md" %}

#### AWS EKS (Elastic Kubernetes Service)

Steadybit's capabilities for [containers](./#containers), [Kubernetes](./#kubernetes) and [AWS EC2s](./#aws-ec2) also work for AWS EKS environments:

{% content-ref url="./#containers" %}
[#containers](./#containers)
{% endcontent-ref %}

{% content-ref url="./#kubernetes" %}
[#kubernetes](./#kubernetes)
{% endcontent-ref %}

{% content-ref url="./#aws-ec2" %}
[#aws-ec2](./#aws-ec2)
{% endcontent-ref %}

#### AWS ELB (Elastic Load Balancing)

Steadybit supports attacks based on the AWS ALB API:

|     | Return Static Response |
| --- | ---------------------- |
| ALB | ✅                      |

#### AWS Elasticache

Steadybit supports attacks based on the AWS Elasticache API:

|             | Node Group Failover |
| ----------- | ------------------- |
| Elasticache | ✅                   |

#### AWS Fault Injection Service (FIS)

Steadybit integrates with AWS FIS experiment templates, which makes it easy to inject faults into additional managed services. See the [AWS extension](https://hub.steadybit.com/target/com.steadybit.extension_aws.fis-experiment-template) for more details.

|     | Start Experiment Template |
| --- | ------------------------- |
| FIS | ✅                         |

#### AWS Lambda

Steadybit supports attacks based on the failure injection wrapper [failure-lambda](https://github.com/steadybit/failure-lambda):

|        | Block TCP Connections | Fill Diskspace | Inject Exception | Inject Latency | Inject Status Code |
| ------ | --------------------- | -------------- | ---------------- | -------------- | ------------------ |
| Lambda | ✅                     | ✅              | ✅                | ✅              | ✅                  |

#### AWS Managed Streaming for Kafka (MSK)

Steadybit's capabilities for [Kafka](./#kafka) also work for AWS MSK environments:

{% content-ref url="./#kafka" %}
[#kafka](./#kafka)
{% endcontent-ref %}

On top, Steadybit provides capabilities based on the AWS MSK API:

|     | Broker Reboot |
| --- | ------------- |
| MSK | ✅             |

#### AWS Relational Database Service (RDS)

Steadybit provides capabilities based on the AWS RDS API for RDS clusters and instances.

**RDS Clusters**

|             | Cluster Failover |
| ----------- | ---------------- |
| RDS Cluster | ✅                |

**RDS Instance**

|              | Reboot | Stop |
| ------------ | ------ | ---- |
| RDS Instance | ✅      | ✅    |

#### Other AWS Services

Steadybit has cross-services capabilities like simulating a full [availability zone outage](https://hub.steadybit.com/target/com.steadybit.extension_aws.zone) or [partial zone outage via subnets](https://hub.steadybit.com/target/com.steadybit.extension_aws.ec2-subnet).

Additional managed services are covered via [AWS FIS](./#aws-fault-injection-service-fis), or will be added to Steadybit natively in the future.

### Azure

#### Azure Kubernetes Service (AKS)

Steadybit's capabilities for [containers](./#containers), [Kubernetes](./#kubernetes) and [Azure VMs](./#azure-virtual-machines-vms) also work for Azure AKS environments:

{% content-ref url="./#containers" %}
[#containers](./#containers)
{% endcontent-ref %}

{% content-ref url="./#kubernetes" %}
[#kubernetes](./#kubernetes)
{% endcontent-ref %}

{% content-ref url="./#azure-virtual-machines-vms" %}
[#azure-virtual-machines-vms](./#azure-virtual-machines-vms)
{% endcontent-ref %}

#### Azure Event Hub

Steadybit's capabilities for [Kafka](./#kafka) also work for Azure Event Hub leveraging Kafka-compatibility:

{% content-ref url="./#kafka" %}
[#kafka](./#kafka)
{% endcontent-ref %}

#### Azure Virtual Machines (VMs)

Steadybit's capabilities for [physical and virtual hosts](./#physical-and-virtual-hosts) also work for Azure Virtual Machines (VMs):

{% content-ref url="./#physical-and-virtual-hosts" %}
[#physical-and-virtual-hosts](./#physical-and-virtual-hosts)
{% endcontent-ref %}

On top, Steadybit supports attacks based on the Azure VMs API:

**Virtual Machine**

|                 | Reboot | Delete | Stop | Deallocate |
| --------------- | ------ | ------ | ---- | ---------- |
| Virtual Machine | ✅      | ✅      | ✅    | ✅          |

**Virtual Machine Scale Set Instances**

|                    | Reboot | Delete | Stop | Deallocate |
| ------------------ | ------ | ------ | ---- | ---------- |
| Scale Set Instance | ✅      | ✅      | ✅    | ✅          |

#### Other Azure Services

More Azure services will be added to the [Azure](https://hub.steadybit.com/extension/com.steadybit.extension_azure) extension in the future.

### GCP

#### Google Kubernetes Engine (GKE)

Steadybit's capabilities for [containers](./#containers), [Kubernetes](./#kubernetes) and [GCP VMs](./#gcp-virtual-machines-vms) also work for Google GKE:

{% content-ref url="./#containers" %}
[#containers](./#containers)
{% endcontent-ref %}

{% content-ref url="./#kubernetes" %}
[#kubernetes](./#kubernetes)
{% endcontent-ref %}

{% content-ref url="./#gcp-virtual-machines-vms" %}
[#gcp-virtual-machines-vms](./#gcp-virtual-machines-vms)
{% endcontent-ref %}

#### GCP Virtual machines (VMs)

Steadybit's capabilities for [physical and virtual hosts](./#physical-and-virtual-hosts) also work for Azure Virtual Machines (VMs):

{% content-ref url="./#physical-and-virtual-hosts" %}
[#physical-and-virtual-hosts](./#physical-and-virtual-hosts)
{% endcontent-ref %}

On top, Steadybit supports attacks based on the GCP VMs API:

|                 | Reset | Delete | Stop | Suspend |
| --------------- | ----- | ------ | ---- | ------- |
| Virtual Machine | ✅     | ✅      | ✅    | ✅       |

#### Other GCP Services

More GCP services will be added to the [GCP](https://hub.steadybit.com/extension/com.steadybit.extension_gcp) extension in the future.

## Service Mesh & API Gateway

Steadybit provides the following fault injections for service meshes and api gateways.

|       | GRPC Abort | HTTP Abort | HTTP Delay |
| ----- | ---------- | ---------- | ---------- |
| Istio | ✅          | ✅          | ✅          |
| Kong  | ❌          | ✅          | ❌          |

## Kafka

Steadybit offers comprehensive support for chaos experiments on Kafka infrastructure.

### Broker

|                                       | Limit Connection Creation Rate | Limit IO Thread | Limit Network Threads |
| ------------------------------------- | ------------------------------ | --------------- | --------------------- |
| Unmanaged Kafka                       | ✅                              | ✅               | ✅                     |
| AWS Managed Streaming for Kafka (MSK) | ✅                              | ✅               | ✅                     |
| Azure Event Hub (Kafka)               | ✅                              | ✅               | ✅                     |

### Consumer

|                                       | Check Consumer State | Check Topic Lag | Deny Access |
| ------------------------------------- | -------------------- | --------------- | ----------- |
| Unmanaged Kafka                       | ✅                    | ✅               | ✅           |
| AWS Managed Streaming for Kafka (MSK) | ✅                    | ✅               | ✅           |
| Azure Event Hub (Kafka)               | ✅                    | ✅               | ✅           |

### Topics

|                                       | Check Partitions | Produce Records | Reduce Message Batch Size | Delete Records | Partition Leader Election |
| ------------------------------------- | ---------------- | --------------- | ------------------------- | -------------- | ------------------------- |
| Unmanaged Kafka                       | ✅                | ✅               | ✅                         | ✅              | ✅                         |
| AWS Managed Streaming for Kafka (MSK) | ✅                | ✅               | ✅                         | ✅              | ✅                         |
| Azure Event Hub (Kafka)               | ✅                | ✅               | ✅                         | ✅              | ✅                         |

## Java Virtual Machine (JVM) / Spring Applications

Steadybit supports the following application-level faults for JVM- and Spring-based applications. These don't require any dependency at work at runtime via bytecode manipulation.

|                 | Spring Controller Delay | Spring Controller Exception | HTTP Client Delay | HTTP Client Status | Method Delay | Method Exception | JDBC Template Delay | JDBC Template Exception |
|-----------------|-------------------------|-----------------------------|-------------------|:-------------------|:-------------|:-----------------|:--------------------|:------------------------|
| JVM application | ✅                       | ✅                           | ✅                 | ✅                  | ✅            | ✅                | ✅                   | ✅                       |

## Observability

Steadybit supports the following observability-related experiment actions:

|            | [Check for Alerts](#user-content-fn-4)[^4] | [Mute Alerts](#user-content-fn-4)[^4] | [Send Events](#user-content-fn-5)[^5] |
| ---------- | ------------------------------------------ | ------------------------------------- | ------------------------------------- |
| Datadog    | ✅                                          | ✅                                     | ✅                                     |
| Dynatrace  | ✅                                          | ✅                                     | ✅                                     |
| Grafana    | ✅                                          | ❌                                     | ✅                                     |
| Instana    | ✅                                          | ✅                                     | ❌                                     |
| New Relic  | ✅                                          | ✅                                     | ✅                                     |
| Prometheus | ✅                                          | ❌                                     | ❌                                     |
| Splunk     | ✅                                          | ❌                                     | ✅                                     |
| StackState | ✅                                          | ❌                                     | ❌                                     |

## Load and API Testing

Steadybit integrates with the following load- and API-testing solutions:

|                                     | Run Test from Experiment | Run Experiment from Test    |
|-------------------------------------|--------------------------|-----------------------------|
| Micro Focus LoadRunner Professional | ❌                        | ✅                           |
| Micro Focus LoadRunner Enterprise   | ❌                        | ✅                           |
| Gatling                             | ✅                        | [✅](#user-content-fn-6)[^6] |
| JMeter                              | ✅                        | [✅](#user-content-fn-6)[^6] |
| K6                                  | ✅                        | ✅                           |
| K6 Cloud                            | ✅                        | ✅                           |
| Postman                             | ✅                        | [✅](#user-content-fn-6)[^6] |
| Custom HTTP Check                   | ✅                        | [✅](#user-content-fn-6)[^6] |

[^1]: extension-host and extension-container needs to run in privileged mode and network mode host is required for the extensions.

[^2]: Allow-listing Steadybit is required for container-level attacks in Autopilot-managed GKE clusters. Container attacks in the following namespaces are\
    disabled: `kube-system`, `gke-gmp-system`, `composer-system`, `gke-managed-*`

[^3]: Stop container is equivalent to stop task in AWS ECS on Fargate

[^4]: Different observability integrations us different names for these action. Please check the [Steadybit Reliability Hub](https://hub.steadybit.com) for more\
    details.

[^5]: Synthetic events will be sent to the observability solution to mark the beginning and end of every experiment action to facilitate root cause analysis.

[^6]: Experiments can be triggered from tests using Steadybit's HTTP API.
