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
**targets** and **actions** related to a specific technology (e.g. containers, hosts, observability solution, etc.).

## Capabilities

You can pick extensions to match the scenarios that you want to address with chaos experiments, keeping resource
consumption and required permissions minimal. The following tables provide an overview of the capabilities across all
extensions.

### Containers

The following capabilities are available when targeting containers.

**Network-related Attacks**

|                                          | Block DNS          | Block Traffic      | Corrupt Outgoing Packages | Delay Outgoing Traffic | Drop Outgoing Traffic | Limit Outgoing Bandwidth |
|------------------------------------------|--------------------|--------------------|---------------------------|------------------------|-----------------------|--------------------------|
| Docker                                   | :white_check_mark: | :white_check_mark: | :white_check_mark:        | :white_check_mark:     | :white_check_mark:    | :white_check_mark:       |
| CRI-O                                    | :white_check_mark: | :white_check_mark: | :white_check_mark:        | :white_check_mark:     | :white_check_mark:    | :white_check_mark:       |
| containerd                               | :white_check_mark: | :white_check_mark: | :white_check_mark:        | :white_check_mark:     | :white_check_mark:    | :white_check_mark:       |
| Kubernetes                               | :white_check_mark: | :white_check_mark: | :white_check_mark:        | :white_check_mark:     | :white_check_mark:    | :white_check_mark:       |
| Red Hat OpenShift                        | :white_check_mark: | :white_check_mark: | :white_check_mark:        | :white_check_mark:     | :white_check_mark:    | :white_check_mark:       |
| AWS Elastic Kubernetes Service           | :white_check_mark: | :white_check_mark: | :white_check_mark:        | :white_check_mark:     | :white_check_mark:    | :white_check_mark:       |
| Google Kubernetes Engine                 | :white_check_mark: | :white_check_mark: | :white_check_mark:        | :white_check_mark:     | :white_check_mark:    | :white_check_mark:       |
| Google Kubernetes Engine (Autopilot)[^3] | :white_check_mark: | :white_check_mark: | :white_check_mark:        | :white_check_mark:     | :white_check_mark:    | :white_check_mark:       |
| Azure Kubernetes Service                 | :white_check_mark: | :white_check_mark: | :white_check_mark:        | :white_check_mark:     | :white_check_mark:    | :white_check_mark:       |
| minikube                                 | :white_check_mark: | :white_check_mark: | :white_check_mark:        | :white_check_mark:     | :white_check_mark:    | :white_check_mark:       |

**Resource-related Attacks**

|                                          | Fill Disk          | Fill Memory        | Stress CPU         | Stress IO          | Stress Memory      |
|------------------------------------------|--------------------|--------------------|--------------------|--------------------|--------------------|
| Docker                                   | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| CRI-O                                    | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| containerd                               | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Kubernetes                               | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Red Hat OpenShift                        | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| AWS Elastic Kubernetes Service           | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Google Kubernetes Engine                 | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Google Kubernetes Engine (Autopilot)[^3] | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Azure Kubernetes Service                 | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| minikube                                 | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |

**State-related Attacks**

|                                          | Pause Container    | Stop Container     |
|------------------------------------------|--------------------|--------------------|
| Docker                                   | :white_check_mark: | :white_check_mark: |
| CRI-O                                    | :white_check_mark: | :white_check_mark: |
| containerd                               | :white_check_mark: | :white_check_mark: | 
| Kubernetes                               | :white_check_mark: | :white_check_mark: | 
| Red Hat OpenShift                        | :white_check_mark: | :white_check_mark: | 
| AWS Elastic Kubernetes Service           | :white_check_mark: | :white_check_mark: | 
| Google Kubernetes Engine                 | :white_check_mark: | :white_check_mark: | 
| Google Kubernetes Engine (Autopilot)[^1] | :white_check_mark: | :white_check_mark: | 
| Azure Kubernetes Service                 | :white_check_mark: | :white_check_mark: | 
| minikube                                 | :white_check_mark: | :white_check_mark: |

[^1]: Allow-listing Steadybit is required for container-level attacks in Autopilot-managed GKE clusters. Container
attacks in the following namespaces are disabled: `kube-system`, `gke-gmp-system`, `composer-system`, `gke-managed-*`

### Kubernetes environments

In addition to the above, the following Kubernetes specific actions are available.

**Attacks**

|                                      | Cause Crash Loop   | Delete Pod         | Rollout Restart Deployment | Scale Deployment   | Scale StatefulSet  | Taint Node         |
|--------------------------------------|--------------------|--------------------|----------------------------|--------------------|--------------------|--------------------|
| Kubernetes                           | :white_check_mark: | :white_check_mark: | :white_check_mark:         | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Red Hat OpenShift                    | :white_check_mark: | :white_check_mark: | :white_check_mark:         | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| AWS Elastic Kubernetes Service       | :white_check_mark: | :white_check_mark: | :white_check_mark:         | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Google Kubernetes Engine             | :white_check_mark: | :white_check_mark: | :white_check_mark:         | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Google Kubernetes Engine (Autopilot) | :white_check_mark: | :white_check_mark: | :white_check_mark:         | :white_check_mark: | :white_check_mark: | :x:                |
| Azure Kubernetes Service             | :white_check_mark: | :white_check_mark: | :white_check_mark:         | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| minikube                             | :white_check_mark: | :white_check_mark: | :white_check_mark:         | :white_check_mark: | :white_check_mark: | :white_check_mark: |

**Checks**

|                                      | DaemonSet Pod Count | Deployment Pod Count | Deployment Rollout Status | Node Count         | StatefulSet Pod Count |
|--------------------------------------|---------------------|----------------------|---------------------------|--------------------|-----------------------|
| Kubernetes                           | :white_check_mark:  | :white_check_mark:   | :white_check_mark:        | :white_check_mark: | :white_check_mark:    |
| Red Hat OpenShift                    | :white_check_mark:  | :white_check_mark:   | :white_check_mark:        | :white_check_mark: | :white_check_mark:    |
| AWS Elastic Kubernetes Service       | :white_check_mark:  | :white_check_mark:   | :white_check_mark:        | :white_check_mark: | :white_check_mark:    |
| Google Kubernetes Engine             | :white_check_mark:  | :white_check_mark:   | :white_check_mark:        | :white_check_mark: | :white_check_mark:    |
| Google Kubernetes Engine (Autopilot) | :white_check_mark:  | :white_check_mark:   | :white_check_mark:        | :white_check_mark: | :white_check_mark:    |
| Azure Kubernetes Service             | :white_check_mark:  | :white_check_mark:   | :white_check_mark:        | :white_check_mark: | :white_check_mark:    |
| minikube                             | :white_check_mark:  | :white_check_mark:   | :white_check_mark:        | :white_check_mark: | :white_check_mark:    |

**Other Actions**

|                                      | Display Pod Count Metrics | Display Kubernetes Event Logs |
|--------------------------------------|---------------------------|-------------------------------|
| Kubernetes                           | :white_check_mark:        | :white_check_mark:            |
| Red Hat OpenShift                    | :white_check_mark:        | :white_check_mark:            |
| AWS Elastic Kubernetes Service       | :white_check_mark:        | :white_check_mark:            |
| Google Kubernetes Engine             | :white_check_mark:        | :white_check_mark:            |
| Google Kubernetes Engine (Autopilot) | :white_check_mark:        | :white_check_mark:            |
| Azure Kubernetes Service             | :white_check_mark:        | :white_check_mark:            |
| minikube                             | :white_check_mark:        | :white_check_mark:            |

## Physical and virtual hosts ##

The following attacks are available when working with physical hosts and virtual machines
(both 64-bit PC and 64-bit ARM architectures).

**Network-related Attacks**

|                   | Block DNS          | Block Traffic      | Corrupt Outgoing Packages | Delay Outgoing Traffic | Drop Outgoing Traffic | Limit Outgoing Bandwidth |
|-------------------|--------------------|--------------------|---------------------------|------------------------|-----------------------|--------------------------|
| Ubuntu 20.04      | :white_check_mark: | :white_check_mark: | :white_check_mark:        | :white_check_mark:     | :white_check_mark:    | :white_check_mark:       |
| Ubuntu 22.04      | :white_check_mark: | :white_check_mark: | :white_check_mark:        | :white_check_mark:     | :white_check_mark:    | :white_check_mark:       |
| Ubuntu 24.04      | :white_check_mark: | :white_check_mark: | :white_check_mark:        | :white_check_mark:     | :white_check_mark:    | :white_check_mark:       |
| Fedora Latest     | :white_check_mark: | :white_check_mark: | :white_check_mark:        | :white_check_mark:     | :white_check_mark:    | :white_check_mark:       |
| Debian Bookworm   | :white_check_mark: | :white_check_mark: | :white_check_mark:        | :white_check_mark:     | :white_check_mark:    | :white_check_mark:       |
| Debian Bullseye   | :white_check_mark: | :white_check_mark: | :white_check_mark:        | :white_check_mark:     | :white_check_mark:    | :white_check_mark:       |
| Amazon Linux 2    | :white_check_mark: | :white_check_mark: | :white_check_mark:        | :white_check_mark:     | :white_check_mark:    | :white_check_mark:       |
| Amazon Linux 2023 | :white_check_mark: | :white_check_mark: | :white_check_mark:        | :white_check_mark:     | :white_check_mark:    | :white_check_mark:       |

{% hint style="info" %}
Other .deb and .rpm-based distributions will mostly likely work, too, but aren't explicitly tested on.
{% endhint %}

**Resource-related Attacks**

|                   | Fill Disk          | Fill Memory        | Stress CPU         | Stress IO          | Stress Memory      |
|-------------------|--------------------|--------------------|--------------------|--------------------|--------------------|
| Ubuntu 20.04      | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Ubuntu 22.04      | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Ubuntu 24.04      | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Fedora Latest     | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Debian Bookworm   | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Debian Bullseye   | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Amazon Linux 2    | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Amazon Linux 2023 | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |

{% hint style="info" %}
Other .deb and .rpm-based distributions will mostly likely work, too, but aren't explicitly tested on.
{% endhint %}

**State-related Attacks**

|                   | Shutdown Host      | Stop Process       | Time Travel        |
|-------------------|--------------------|--------------------|--------------------|
| Ubuntu 20.04      | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Ubuntu 22.04      | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Ubuntu 24.04      | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Fedora Latest     | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Debian Bookworm   | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Debian Bullseye   | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Amazon Linux 2    | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Amazon Linux 2023 | :white_check_mark: | :white_check_mark: | :white_check_mark: |

{% hint style="info" %}
Other .deb and .rpm-based distributions will mostly likely work, too, but aren't explicitly tested on.
{% endhint %}

## Observability ##

Steadybit supports the following observability-related experiment actions:

|            | Check for Alerts[^2] | Mute Alerts[^2]    | Send Events[^3]    |
|------------|----------------------|--------------------|--------------------|
| Datadog    | :white_check_mark:   | :white_check_mark: | :white_check_mark: |
| Dynatrace  | :white_check_mark:   | :white_check_mark: | :white_check_mark: |
| Grafana    | :white_check_mark:   | :x:                | :white_check_mark: |
| Instana    | :white_check_mark:   | :white_check_mark: | :x:                |
| New Relic  | :white_check_mark:   | :white_check_mark: | :white_check_mark: |
| Prometheus | :white_check_mark:   | :x:                | :x:                |
| StackState | :white_check_mark:   | :x:                | :x:                |

[^2]: Different observability integrations us different names for these action. Please check the
[Steadybit Reliability Hub](https://hub.steadybit.com) for more details.
[^3]: Synthetic events will be sent to the observability solution to mark the beginning and end of every experiment action
to facilitate root cause analysis.

## Load Testing ##

Steadybit integrates with the following load-testing solutions:

|                                     | Run Load Test from Experiment | Run Experiment from Load Test |
|-------------------------------------|-------------------------------|-------------------------------|
| Micro Focus LoadRunner Professional | :x:                           | :white_check_mark:            |
| Micro Focus LoadRunner Enterprise   | :x:                           | :white_check_mark:            |
| Gatling                             | :white_check_mark:            | :x:                           |
| JMeter                              | :white_check_mark:            | :x:                           |
| K6                                  | :white_check_mark:            | :white_check_mark:            |
| K6 Cloud                            | :white_check_mark:            | :white_check_mark:            |

## Service Meshes ##

Steadybit provides the following fault injections for service meshes.

|       | GRPC Abort         | HTTP Abort         | HTTP Delay         |
|-------|--------------------|--------------------|--------------------|
| Istio | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Kong  | :x:                | :white_check_mark: | :x:                |

## Cloud Providers ##

Steadybit supports fault injection on all major cloud providers. Please visit the
[Steadybit Reliability Hub](https://hub.steadybit.com) for the complete list of the specific services supported on:

* [AWS](https://hub.steadybit.com/extension/com.steadybit.extension_aws)
* [GCP](https://hub.steadybit.com/extension/com.steadybit.extension_gcp)
* [Azure](https://hub.steadybit.com/extension/com.steadybit.extension_azure)

## Kafka ##

Steadybit offers comprehensive support for chaos experiments on Kafka infrastructure. Please visit the [Kafka extension
page on the Steadybit Reliability Hub](https://hub.steadybit.com/extension/com.steadybit.extension_kafka) for details.