---
description: >-
  This page describes the breaking changes when migrating to the new outpost
  agents.
---

# Migration Breaking Changes

* The "Deployment Readiness"-Widget will no longer be added automatically. You must add a "Pod Count Metrics" step, set a duration, and select deployment targets you want to observe during experiment execution.

<div data-full-width="false">

<figure><img src="../../.gitbook/assets/deployment-readiness.png" alt="" width="375"><figcaption><p>Deployment Readiness Widget</p></figcaption></figure>

</div>

<figure><img src="../../.gitbook/assets/pod-count-metrics.png" alt=""><figcaption><p>Pod count metrics step</p></figcaption></figure>

* The "Kubernetes Event Log"-Widget will no longer be added automatically. You must add a "Kubernetes Event Log" step, set a duration, and select a cluster you want to observe during experiment execution.

<figure><img src="../../.gitbook/assets/kubernetes-event-log.png" alt=""><figcaption><p>Kubernetes Event Log</p></figcaption></figure>

<figure><img src="../../.gitbook/assets/kubernetes-event-log-step.png" alt=""><figcaption><p>Kubernetes Event Log Step</p></figcaption></figure>

* Kubernetes Node Count and Pod Count Checks need a target selection. We try to create a matching target selection based on your old step configuration. If this is not possible, you will get a validation error and need to tune the target selection manually.

<figure><img src="../../.gitbook/assets/pod-and-node-count-new.png" alt="" width="337"><figcaption><p>New Pod Count Check with target selection</p></figcaption></figure>

* Weak spots, Landscape connections and Policies are limited in functionality.
* The "Kubernetes Delete Pods" attack is not supported anymore and will eventually be replaced by a new attack.

<figure><img src="../../.gitbook/assets/delete-pods.png" alt=""><figcaption><p>"Delete Pods" - Attack</p></figcaption></figure>



