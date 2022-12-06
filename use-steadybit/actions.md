# Actions

Actions are the building blocks of chaos-engineering experiments. You can attack, check and load test your systems through these actions. Terminology-wise, we refer to these as various kinds of actions.

In the simplest case, an experiment may consist of a single attack, e.g., to increase CPU usage within a container. In more advanced cases, you may compose various actions into [reliability tests](https://steadybit.com/blog/resilience-testing), e.g., for automatic execution within your CI/CD pipelines.

The following sections will explain the supported kinds of actions in more detail.

## Attacks

Attacks, as the name implies, have a deliberate negative impact on your system. For example, you may decide to:

* Kill a set of containers or simulate a Kubernetes deployment rollout (state attack).
* Increase memory or CPU usage on a host (resource attack).
* Artificially increase network latency or reconfigure AWS VPC configurations to simulate an availability zone outage (network attack).

In the end, an attack execution always has the same intended effect: Let me understand how a system behaves under adverse/turbulent conditions. Attacks introduce adverse/turbulent conditions for as long as necessary, e.g., as long as necessary to observe the effect. Once done, the attack is rolled back (whenever possible) to move the system back into an operational state.

You can learn about all supported attacks within our [Reliability Hub](https://hub.steadybit.com/actions?targetType=\&kind=attack).

## Checks

Checks (sometimes called probes) act as verifications or assertions within experiments. Once you progress past one-off executions of attacks, you will want to verify your expectations automatically. Not only for easier execution but also consistency and knowledge sharing with team members. On top of this, automatic verification is faster, thus reducing the time attacks need to be executed and reducing the time your system will be affected by attacks.

You can incorporate various checks into your experiments. Some examples:

* Ensure that no Kubernetes rollout is in progress before starting an attack.
* Verify that our Datadog monitors are reporting issues when there are issues (caused by attacks)
* Run Prometheus PromQL queries to check internal system metrics.
* Leverage your Postman API tests to check that your API is still working as intended while a part of your system is under attack.

Most checks will immediately abort the experiment execution and mark it as _failed_. You can learn about all supported checks within our [Reliability Hub](https://hub.steadybit.com/actions?targetType=\&kind=check).

## Load Tests

Load tests, within the chaos engineering experiment context, are helpful to introduce a baseline of expected traffic on your system – primarily when operating in non-production environments. Without any load on the system, some effects of attacks may not be observable, e.g., your observability solution might not identify problems for end-users because there were no end-users.

You can learn about all supported load tests within our [Reliability Hub](https://hub.steadybit.com/actions?targetType=\&kind=load\_test).

## Supported Actions

Check out our [Reliability Hub](https://hub.steadybit.com/actions) to learn about actions you can leverage with Steadybit.

## Extend Steadybit

Are you missing support for a particular action? No problem, Steadybit is extensible, allowing you to use open- and closed-source extensions to enhance its capabilities. Learn more within our [extension documentation](../integrate-with-steadybit/extensions/)!
