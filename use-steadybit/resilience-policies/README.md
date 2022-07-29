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

* [Task and Policy Definitions](taskAndPolicyDefinitions.md)
* [References](references.md)
* [Download YML via UI](ymlDownloadViaUI.md)

