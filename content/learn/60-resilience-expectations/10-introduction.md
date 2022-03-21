---
title: "Introduction to Resilience Expectations"
navTitle: "Introduction"
---

You can think about resilience expectations like linting or security rules (ESLint, SonarQube, dependency auditing and more) for your systems' resilience. Resilience expectations help you identify issues and (non-) compliance with the desired state. For example, Steadybit can outline that a particular Kubernetes configuration best practice isn't followed or that an HTTP request is missing timeouts or retries. Resilience expectations are declarative by nature. This means that resilience expectations are easy to get started with. No need for a resilience or chaos engineering expert!

Expectations can be authored as part of a service definition. Learn more about this process as part of our [getting started guide](/getting-started/20-define-resilience-expectations) or our [definition deep dive](/learn/60-resilience-expectations/20-definition).
