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

## Events in Datadog

Using Datadog information within Steadybit is incredibly helpful. However, you and your colleagues can also benefit from Steadybit information within Datadog. Namely, to see and understand when somebody executed Steadybit experiments. This information is crucial to put Datadog events and monitors' status into perspective.

<figure><img src="../../.gitbook/assets/image.png" alt="The Datadog event detail view presenting the information carried by an event transmitted through the Datadog extension"><figcaption><p>The Datadog event detail view presenting the information carried by an event transmitted through the Datadog extension</p></figcaption></figure>

By default, the Datadog extension will report events to Datadog whenever an experiment starts or ends. The events carry helpful tags that you can leverage for deeper Datadog integration. One common use case is to mark when an experiment happened using Datadog's event overlays. You can use search queries such as source:steadybit to overlay all Steadybit-related events. You can further restrict the events by relying on additional tags, e.g., by leveraging the environment\_key tag.

<figure><img src="../../.gitbook/assets/Screenshot 2022-11-15 at 11.17.54.png" alt="Datadog widget configuration showing the event overlay settings."><figcaption><p>Datadog widget configuration showing the event overlay settings.</p></figcaption></figure>
