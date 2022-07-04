---
title: Resilience Policies
---

# Resilience Policies

You can think about resilience policies like linting or security rules (ESLint, SonarQube, dependency auditing and more) for your systems' resilience.
Resilience policies help you identify issues and (non-) compliance with the desired state.
For example, Steadybit can outline that a particular Kubernetes configuration best practice isn't followed or that an HTTP request is missing timeouts or retries.
Resilience policies are declarative by nature.
This means that resilience policies are easy to get started with.
No need for a resilience or chaos engineering expert!

Policies can be authored as part of a service definition.
Learn more about this process as part of our [getting started guide](../../quick-start/define-resilience-policies.md) or our [definition deep dive](https://github.com/steadybit/definitions).

Resilience policies can be expressed by referring to tasks (either an experiment or a weak spot) or policies (collections of tasks).
The following sections explain the fundamentals of tasks and policies.

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

### References

References are found within service and policy definitions.
These establish links and configure tasks for verification by the Steadybit platform.
These references express an expectation that services will need to fulfill.
The following excerpt shows how a service definition could reference policies and tasks.
Also, note that `parameters` are defined for both.

```yml
policies:
  - name: steadybit/definitions/kubernetes/deployments/policies/redundancy-pod
    version: 0.2.2
    parameters:
      httpEndpoint: http://k8s.demo.steadybit.io/products
tasks:
  - name: steadybit/definitions/kubernetes/deployments/experiments/loose-coupling-to-dependency
    version: 0.2.2
    parameters:
      httpEndpoint: http://k8s.demo.steadybit.io/products
    forEach:
      iterables:
        - dependency
      define:
        k8sDependencyClusterName: '{{dependency.mapping.kubernetes.cluster}}'
        k8sDependencyNamespaceName: '{{dependency.mapping.kubernetes.namespace}}'
        k8sDependencyDeploymentName: '{{dependency.mapping.kubernetes.deployment}}'
```

It is important to understand that task and policy references actually refer to files existing within a public GitHub repository.
Tasks and policies are maintained and shared through GitHub.
For example, the policy referenced by the YAML snippet above is resolved to the following GitHub URL:

https://github.com/steadybit/definitions/tree/0.2.2/kubernetes/deployments/policies/loose-coupling

This is helpful to know to create and share your own custom task and policy definitions.
For example, you could use this mechanism to define and enforce resilience policies within your organization.
