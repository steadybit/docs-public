---
description: >-
  This page describes the breaking changes when migrating to the new outpost
  agents.
---

# Migration Breaking Changes

* The "Deployment Readiness"-Widget will no longer be added automatically. You must add a "Pod Count Metrics" step, set a duration, and select deployment targets you want to observe during an experiment run.

![Deployment Readiness Widget](deployment-readiness.png)

![Pod count metrics step](pod-count-metrics.png)

* The "Kubernetes Event Log"-Widget will no longer be added automatically. You must add a "Kubernetes Event Log" step, set a duration, and select a cluster you want to observe during an experiment run.

![Kubernetes Event Log](kubernetes-event-log.png)
![Kubernetes Event Log Step](kubernetes-event-log-step.png)

* Kubernetes Node Count and Pod Count Checks need a target selection. We try to create a matching target selection based on your old step configuration. If this is not possible, you will get a validation error and need to tune the target selection manually.

![New Pod Count Check with target selection](pod-and-node-count-new.png)

* The "Kubernetes Delete Pods" attack is not supported anymore and will eventually be replaced by a new attack.

!["Delete Pods" - Attack](delete-pods.png)



