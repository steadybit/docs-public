---
title: Weak spots
---

# Weakspots

Steadybit helps you in your path to a resilient system by analysing the configuration of your deployed environment and suggesting improvements to make it even more resilient. This way, you can fast-forward and don't need to execute an [Experiment](../experiments/) for learning your system.

We currently support some weak spots for Kubernetes, AWS, Azure and Java.

### Kubernetes Weak Spots

| Weak Spot                 | Description                                                                                                                           | Why is it important for a resilient system?                                                                                                    |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU Limit                 | Checks whether the consumption of the CPU is limited for a Kubernetes deployment.                                                     | When your deployment uses too much CPU other deployments on the same node could become unstable.                                               |
| Memory Limit              | Ensures that your configuration prevents a Kubernetes deployment to consume more memory than configured.                              | When your deployment uses too much memory other deployments on the same node could become unstable.                                            |
| Single Replica            | Verifies that at least two PODs of the same deployment exists.                                                                        | It is hard to make single source of failure (like a single POD) resilient.                                                                     |
| Liveness Probe            | Ensures that a probe is configured so that Kubernetes is able to detect whether the POD is still working or it needs to be restarted. | An unresponsive POD may lead to no proper load balancing of requests. Sometimes, simple restart can help.                                      |
| Readiness Probe           | Tests the configuration of a rediness probe so that Kubernetes knows when a new starting POD is ready to receive traffic.             | A POD that is still starting up may not be ready to accept traffic yet and thus lead to no proper load balancing of requests.                  |
| Readiness Probe minReady  | Verifies whether Kubernetes is configured to prevent scheduling traffic immediately after the `readinessProbe` is successful.         | May help to ensure that the newly started POD is stable enough to process traffic                                                              |
| Image Pull Policy         | Checks that the `imagePullPolicy` is enforced by setting it to `always` to ensure that always the latest version is running.          | If set otherwise the OCI runtime may execute an older cached version of the image. See also weakspot "image latest tag".                       |
| Image Latest Tag          | Prevents usage of the `latest` tag as a version.                                                                                      | Using `latest` version makes it hard to identify which version is running and may also lead to different versions running in the same cluster. |
| Deployment Strategy       | Enforces the deployment strategy `rollingUpdate`.                                                                                     | Prevents downtime while updating a deployment.                                                                                                 |
| Horizontal POD Autoscaler | Verifies that a horizontal pod autoscaler is configured to schedule dynamically additional PODs.                                      | Ensure that your system is properly scaled aligned to resource consumption.                                                                    |
| POD Anti Affinity         | Checks that your deployment is distributed across your cluster's nodes.                                                               | Just having multiple PODs (see "single replica") isn't enough in case all the PODs are running on a single node.                               |
| Single Node               | Tests that your Kubernetes cluster is running on multiple nodes.                                                                      | A Kubernetes cluster with a single node is hardly resilient against node outages.                                                              |

### AWS Kubernetes Weak Spots

| Weak Spot       | Description                                                                            | Why is it important for a resilient system?                                                         |
| --------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Single AWS Zone | Verifies that your Kubernetes cluster isn't running within a single Availability Zone. | A single Availability Zone is likely to fail which would lead to an unavailable Kubernetes cluster. |

### Azure Kubernetes Weak Spots

| Weak Spot         | Description                                                                            | Why is it important for a resilient system?                                                         |
| ----------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Single Azure Zone | Verifies that your Kubernetes cluster isn't running within a single Availability Zone. | A single Availability Zone is likely to fail which would lead to an unavailable Kubernetes cluster. |

### JVM Weak Spots

| Weak Spot                         | Description                                                            | Why is it important for a resilient system?                                                 |
| --------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| HTTP Call without Timeout         | Ensures that your HTTP client is configured to have a timeout.         | In case the target endpoint is unresponsive, the caller would wait forever on a response.   |
| HTTP Call without Circuit Breaker | Verifies that your HTTP endpoint is configured with a circuit breaker. | Avoids cascading failures by short-circuiting to a configured fallback in case of problems. |

> ### Call for Feedback
>
> Weak spots is a beta feature which we would like to get your opinion on. Feel free to [reach out to us](https://www.steadybit.com/contact) and share your experience.
