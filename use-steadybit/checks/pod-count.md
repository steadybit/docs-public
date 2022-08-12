---
title: Pod Count
---

# Pod Count

The `POD Count`-check can be used within a **Kubernetes**-cluster to check for the status of PODs. It counts the amount of all PODs being in the `ready`-state and compares it with the desired replica count. It therefore assumes that the specified mode (see below) becomes true within the specified `timeout`.

If you like, you can limit the POD count to a specific cluster, namespace or even deployment.

### Mode

You can use the `POD Count`-check in one of the following nature:

* **ready count = desired count**: Can be used to assure that the amount of desired ready PODs is equal to the actual amount in the cluster. Helpful to check e.g. after an attack whether every POD is recovering.
* **ready count > 0**: To assure that for each POD in the cluster at least one POD is available to serve the traffic.
* **ready count < desired count**: To make sure that all PODs matching the check's-query are below the specified ready count. This can be helpful in case you want to verify that e.g. exhausting memory leads to restarting the PODs.

### Example

![Example POD count configuration](../actions/pod-count.png)

This POD count would check whether all PODs of the `gateway`-deployment in the `steadybit-demo` are ready within 10 seconds. The minimum resolution of this check is one second. So, in case all PODs are immediately ready at the beginning we wait for the state being fulfilled for at least one second.
