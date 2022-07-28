### Task and Policy Definitions

Task and policy definitions are reusable and shareable YAML files accompanied by documentation.
These define desirable system characteristics (expectations) and how Steadybit could verify these.
Task and policy definitions are maintained within public GitHub repositories versioned through git references.
For example, Steadybit's definitions reside within the [steadybit/definitions](https://github.com/steadybit/definitions) repository.

#### Task Definitions

A task is either a (chaos engineering) experiment or a checked weak spot.
Ideally, a task is configurable so that it is reusable across services.
For example, a task may define an experiment that verifies correct rolling restart behavior for a provided Kubernetes deployment.

At the moment, you cannot author custom weak spot task definitions.
However, custom experiment task definitions are supported.
For more information, please inspect any of the [ready-made Steadybit experiments](https://github.com/steadybit/definitions/blob/0.2.2/kubernetes/deployments/experiments/loose-coupling-to-dependency/task.yml).

```yml
name: "steadybit/definitions/kubernetes/deployments/experiments/recovery-of-single-host"
type: experiment
description: >
  Kubernetes deployment recovers when a host is shut down.
  Use this to verify that deployments are host independent.
  The affected deployments' pods should be replaced within ten minutes – ending with the Kubernetes deployment back in the ready state.
inputs:
  - name: environmentName
  - name: teamKey
  - name: k8sClusterName
  - name: k8sNamespaceName
  - name: k8sDeploymentName
  - name: maximumRecoveryTime
    defaultValue: "10m"
experiment:
  # See this file for more information
  # https://github.com/steadybit/definitions/blob/0.2.2/kubernetes/deployments/experiments/recovery-of-single-host/task.yml
```

#### Policy Definitions

Policies act as collections of [task references](README.md#references).
They are helpful to establish and verify best practices that require more than a single task.
Common use cases combine both a weak spot and an experiment task into a policy, e.g., to create a unit that combines analysis based on configuration/runtime data (weak spot) and runtime verification (experiment).
Alternatively, you could use policies to enforce a set of best practices defined by an SRE team.

The following example shows that the structure of a policy definition is similar to that of a service definition ([source](https://github.com/steadybit/definitions/blob/0.2.2/kubernetes/deployments/policies/rolling-update/policy.yml)).

```yml
name: steadybit/definitions/kubernetes/deployments/policies/rolling-update
description: Challenges for redundancy during updates.
type: policy
tasks:
  - name: steadybit/definitions/kubernetes/deployments/experiments/faultless-redundancy-rolling-update
    version: 0.2.2
  - name: steadybit/definitions/kubernetes/deployments/weak-spots/deployment-strategy
    version: 0.2.2
    forEach:
      iterables:
        - container
      define:
        containerName: '{{container.name}}'
```
