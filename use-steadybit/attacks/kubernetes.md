---
title: "Kubernetes Attacks"
navTitle: "Kubernetes"
metaDescription: "Steadybit Kubernetes attacks can cause turbulent conditions on the platform level"
---

With the Kubernetes attacks you can try out what happens during rollouts or (partial) outages of deployments.
These attacks can be useful to see for example:
 - Does an application support rolling updates?
 - What happens when a downstream deployment is unavailable?

## Delete Pods
Deletes one pod after the other for a given Kubernetes deployment over a configurable period of time. The delay between pod deletions is `{attack duration} / {number of pods in deployment}`.

Stopping this attack will cause no further pods to be deleted. Kubernetes is responsible for pod restoration/restarts.

| Parameter   |      Description                         | Default     |
|-------------|------------------------------------------|-------------|
| Duration    | Total attack duration                    | 60s         |

## Rollout Restart Deployment
Sets an annotation on the deployment which then causes Kubernetes to update all pods within the deployment (essentially `kubectl rollout restart -n {{NAMESPACE}} {{DEPLOYMENT}}`). Does not wait for the rollout to complete. Stopping this attack will not stop the rollout.

*No configuration options supported for this attack.*
