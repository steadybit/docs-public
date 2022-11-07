---
title: Datadog
---

# Datadog

Datadog is a monitoring service for cloud-scale applications, providing monitoring of servers, databases, tools, and services, through a SaaS-based data analytics platform. With the Datadog monitor status check we can react to the triggered alerts and use them for automatic steady state checks in experiments.

## Monitor Status Check

The monitor status check step can be dragged\&dropped into the experiment editor. Once done, you can use it to collect information about the state of the Datadog monitors and, optionally, to verify that they are within the expected status.

<figure><img src="../../.gitbook/assets/editor.png" alt=""><figcaption><p>The experiment editor features a monitor status check once the Datadog extension is installed.</p></figcaption></figure>

Experiments can be aborted and marked as failed when the Datadog monitor status check's actual state diverges from the expected state. This helps implement pre-/post-conditions and invariants. For example, to only start an experiment when the system is healthy.

<figure><img src="../../.gitbook/assets/run-log (1).png" alt=""><figcaption><p>The experiment run log contains information about monitors with an undesired state.</p></figcaption></figure>

At last, to help you understand the monitors' status and how they evolved, the run view also contains a status visualization. Through this visualization, you can see what states the Datadog monitors had throughout the experiment execution.

<figure><img src="../../.gitbook/assets/widget.png" alt=""><figcaption><p>The Datadog monitor status widget shows the status over time.</p></figcaption></figure>
