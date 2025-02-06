---
title: Compatibility
navTitle: Compatibility
---

# Compatibility

Steadybit offers a wide variety of fault injections and other building blocks for Chaos experiments. On this page, you 
can learn about the core concepts and find an overview of the platform's capabilities. A detailed list is available on 
the [Steadybit Reliability Hub](https://hub.steadybit.com). 

## Core Concepts
In Steadybit, you will create experiments by combining various building blocks in a timeline-based editor. We call those 
building blocks **actions**.

**Actions** operate on **targets**. Steadybit comes with targets that represent various logical and physical components
of your systems-under-test.

**Targets** and **actions** are exposed by **extensions**. **Extensions** are small processes running inside your
infrastructure. They communicate with the Steadybit platform via an agent. As a rule of thumb, each **extension** exposes
**targets** and **actions** related to a specific technology (e.g. containers, hosts, observability solution, etc).

## Compatibility

You can pick extensions to match the scenarios that you want to address with chaos experiments, keeping resource
consumption and required permissions minimal. The following tables provide an overview of the capabilities across all
extensions.

### Containers
The following capabilities are available when targeting containers.

**Network-related Attacks**
|   | Block DNS | Block Traffic | Corrupt Outgoing Packages | Delay Outgoing Traffic | Drop Outgoing Traffic | Limit Outgoing Bandwidth |
| - | - | - | - | - | - | - |
| Docker | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| CRI-O  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| containerd | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Kubernetes | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Red Hat OpenShift | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| AWS Elastic Kubernetes Service | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Google Kubernetes Engine | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Google Kubernetes Engine (Autopilot)[^3] | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Azure Kubernetes Service | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| minikube | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Resource-related Attacks**
|   | Fill Disk | Fill Memory | Stress CPU | Stress IO | Stress Memory |
| - | - | - | - | - | - |
| Docker | ✅ | ✅ | ✅ | ✅ | ✅ |
| CRI-O  | ✅ | ✅ | ✅ | ✅ | ✅ |
| containerd | ✅ | ✅ | ✅ | ✅ | ✅ |
| Kubernetes | ✅ | ✅ | ✅ | ✅ | ✅ |
| Red Hat OpenShift | ✅ | ✅ | ✅ | ✅ | ✅ |
| AWS Elastic Kubernetes Service | ✅ | ✅ | ✅ | ✅ | ✅ |
| Google Kubernetes Engine | ✅ | ✅ | ✅ | ✅ | ✅ |
| Google Kubernetes Engine (Autopilot)[^3] | ✅ | ✅ | ✅ | ✅ | ✅ |
| Azure Kubernetes Service | ✅ | ✅ | ✅ | ✅ | ✅ |
| minikube | ✅ | ✅ | ✅ | ✅ | ✅ |

**State-related Attacks**
|   | Pause Container | Stop Container |
| - | - | - |
| Docker | ✅ | ✅ |
| CRI-O  | ✅ | ✅ |
| containerd | ✅ | ✅ | 
| Kubernetes | ✅ | ✅ | 
| Red Hat OpenShift | ✅ | ✅ | 
| AWS Elastic Kubernetes Service | ✅ | ✅ | 
| Google Kubernetes Engine | ✅ | ✅ | 
| Google Kubernetes Engine (Autopilot)[^3] | ✅ | ✅ | 
| Azure Kubernetes Service | ✅ | ✅ | 
| minikube | ✅ | ✅ |

[^3]: Allow-listing Steadybit is required for container-level attacks in Autopilot-managed GKE clusters. Container
attacks in the following namespaces are disabled: `kube-system`, `gke-gmp-system`, `composer-system`, `gke-managed-*`

### Kubernetes environments
In addition to the above, the following Kubernetes specific actions are available.

**Attacks**
|   | Cause Crash Loop | Delete Pod | Rollout Restart Deployment | Scale Deployment | Scale StatefulSet | Taint Node |
| Kubernetes | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Red Hat OpenShift | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| AWS Elastic Kubernetes Service | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Google Kubernetes Engine | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Google Kubernetes Engine (Autopilot) | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Azure Kubernetes Service | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| minikube | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Checks**
|   | DaemonSet Pod Count | Deployment Pod Count | Deployment Rollout Status | Node Count | StatefulSet Pod Count |
| Kubernetes | ✅ | ✅ | ✅ | ✅ | ✅ |
| Red Hat OpenShift | ✅ | ✅ | ✅ | ✅ | ✅ |
| AWS Elastic Kubernetes Service | ✅ | ✅ | ✅ | ✅ | ✅ |
| Google Kubernetes Engine | ✅ | ✅ | ✅ | ✅ | ✅ |
| Google Kubernetes Engine (Autopilot) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Azure Kubernetes Service | ✅ | ✅ | ✅ | ✅ | ✅ |
| minikube | ✅ | ✅ | ✅ | ✅ | ✅ |

**Other Actions**
|   | Display Pod Count Metrics | Display Kubernetes Event Logs |
| - | - | - |
| Kubernetes | ✅ | ✅ |
| Red Hat OpenShift | ✅ | ✅ |
| AWS Elastic Kubernetes Service | ✅ | ✅ |
| Google Kubernetes Engine | ✅ | ✅ |
| Google Kubernetes Engine (Autopilot) | ✅ | ✅ |
| Azure Kubernetes Service | ✅ | ✅ |
| minikube | ✅ | ✅ |

## Physical and virtual hosts ##
The following attacks are available when working with physical hosts and virtual machines 
(both 64-bit PC and 64-bit ARM architectures).

**Network-related Attacks**
|   | Block DNS | Block Traffic | Corrupt Outgoing Packages | Delay Outgoing Traffic | Drop Outgoing Traffic | Limit Outgoing Bandwidth |
| - | - | - | - | - | - | - |
| Ubuntu 20.04  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Ubuntu 22.04 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Ubuntu 24.04 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Fedora Latest | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Debian Bookworm | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Debian Bullseye | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Amazon Linux 2 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Amazon Linux 2023 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

{% hint style="info" %}
Other .deb and .rpm-based distributions will mostly likely work, too, but aren't explicitly tested on.
{% endhint %}

**Resource-related Attacks**
|   | Fill Disk | Fill Memory | Stress CPU | Stress IO | Stress Memory |
| - | - | - | - | - | - |
| Ubuntu 20.04  | ✅ | ✅ | ✅ | ✅ | ✅ |
| Ubuntu 22.04 | ✅ | ✅ | ✅ | ✅ | ✅ |
| Ubuntu 24.04 | ✅ | ✅ | ✅ | ✅ | ✅ |
| Fedora Latest | ✅ | ✅ | ✅ | ✅ | ✅ |
| Debian Bookworm | ✅ | ✅ | ✅ | ✅ | ✅ |
| Debian Bullseye | ✅ | ✅ | ✅ | ✅ | ✅ |
| Amazon Linux 2 | ✅ | ✅ | ✅ | ✅ | ✅ |
| Amazon Linux 2023 | ✅ | ✅ | ✅ | ✅ | ✅ |

{% hint style="info" %}
Other .deb and .rpm-based distributions will mostly likely work, too, but aren't explicitly tested on.
{% endhint %}

**State-related Attacks**
|   | Shutdown Host | Stop Process | Time Travel |
| - | - | - | - |
| Ubuntu 20.04 | ✅ | ✅ | ✅ |
| Ubuntu 22.04 | ✅ | ✅ | ✅ |
| Ubuntu 24.04 | ✅ | ✅ | ✅ |
| Fedora Latest | ✅ | ✅ | ✅ |
| Debian Bookworm | ✅ | ✅ | ✅ |
| Debian Bullseye | ✅ | ✅ | ✅ |
| Amazon Linux 2 | ✅ | ✅ | ✅ |
| Amazon Linux 2023 | ✅ | ✅ | ✅ |

{% hint style="info" %}
Other .deb and .rpm-based distributions will mostly likely work, too, but aren't explicitly tested on.
{% endhint %}

## Observability ##
Steadybit supports the following observability-related experiment actions:

|   | Check for Alerts[^2] | Mute Alerts[^2] | Send Events[^3] |
| - | - | - | - |
| Datadog | ✅ | ✅ | ✅ |
| Dynatrace | ✅ | ✅ | ✅ |
| Grafana | ✅ | ❌ | ✅ |
| Instana | ✅ | ✅ | ❌ |
| New Relic | ✅ | ✅ | ✅ |
| Prometheus | ✅ | ❌ | ❌ |
| StackState | ✅ | ❌ | ❌ |

[^2]: Different observability integrations us different names for these action. Please check the
[Steadybit Reliability Hub](https://hub.steadybit.com) Hub for more details.
[^3]: Synthetic events will be sent to the observability solution to mark the begin and end of every experiment action
to facilitate root cause analysis.

## Load Testing ##
Steadybit integrates with the following load-testing solutions:

|   | Run Load Test from Experiment | Run Experiment from Load Test |
| - | - | - |
| Micro Focus LoadRunner Professional | ❌ | ✅ |
| Micro Focus LoadRunner Enterprise | ❌ | ✅ |
| Gatling | ✅ | ❌ |
| JMeter | ✅ | ❌ |
| K6 | ✅ | ✅ |
| K6 Cloud | ✅ | ✅ |

## Service Meshes ##
Steadybit provides the following fault injections for service meshes.

|   | GRPC Abort | HTTP Abort | HTTP Delay |
| - | - | - | - |
| Istio | ✅ | ✅ | ✅ |
| Kong | ❌ | ✅ | ❌ |

## Cloud Providers ##
Steadybit supports fault injection on all major cloud providers. Please visit the 
[Steadybit Reliability Hub](https://hub.steadybit.com) for the complete list of the specific services supported on:
* [AWS](https://hub.steadybit.com/extension/com.steadybit.extension_aws)
* [GCP](https://hub.steadybit.com/extension/com.steadybit.extension_gcp)
* [Azure](https://hub.steadybit.com/extension/com.steadybit.extension_azure)

## Kafka ##
Steadybit offers comprehensive support for chaos experiments on Kafka infrastructure. Please visit the [Kafka extension
page on the Steadybit Reliability Hub](https://hub.steadybit.com/extension/com.steadybit.extension_kafka) for details.