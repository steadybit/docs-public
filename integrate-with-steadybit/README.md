# Overview
Steadybit is highly flexible, and you can seamlessly integrate it into your use cases and processes.
For this, we offer various integration points that you can build upon.

## Integration Points
### Command-Line Interface (CLI)
The CLI is ideal for integrating experiment runs or checking advice into your Continuous Integration/Continuous Delivery (CI/CD) pipeline.
Under the hood, it uses the platform's [API](#api).
Because the CLI is an npm package, it is agnostic to your actual CI/CD tool in action. [Learn more about the CLI](/integrate-with-steadybit/cli.md).

### API
The platform's API allows you to perform every action that can be done via the user interface also programmatically.
This is ideal for setting up Steadybit in an automated manner, such as creating teams and assigning environments, as well as for advanced use cases involving experiment creation and execution, e.g., utilizing an experiment template to create and run an experiment.
[Learn more about the API](/integrate-with-steadybit/api/api.md).


### Webhooks
The platform offers integrations via webhooks to get notified of events.
We differentiate between a custom webhook, which can listen to events to integrate with external systems, and a preflight webhook, which can allow/disallow the starting of experiment runs.
Learn more about [custom webhooks](/integrate-with-steadybit/webhooks/custom-webhooks.md) and [preflight webhooks](/integrate-with-steadybit/webhooks/preflight-webhooks.md).

### Extension Kits
Extension Kits allow you to extend the Chaos Engineering capabilities by adding support for additional technologies or proprietary applications.
For instance, to support a custom attack, check, load test, or observability integration, you need to implement [DiscoveryKit](/integrate-with-steadybit/extensions/extension-kits.md#discoverykit) and [ActionKit](/integrate-with-steadybit/extensions/extension-kits.md#actionkit).
[EventKit](/integrate-with-steadybit/extensions/extension-kits.md#eventkit) is perfect when you want to react to experiment events, and [PreflightKit](/integrate-with-steadybit/extensions/extension-kits.md#preflightkit) is perfect whenever you want to have control over starting an experiment run.
Last but not least, [AdviceKit](/integrate-with-steadybit/extensions/extension-kits.md#advicekit) allows you to ease your rollout by checking organization-specific best practices.
[Learn more about Extension Kits](/integrate-with-steadybit/extensions/extension-kits.md).


## When to use which Integration Point?
This section highlights some key differentiators.
Don't hesitate to reach out to us if you need support by discussing your integration use case.

### Webhooks vs. Extension Kits

|                                                                                     | Sender   | Interaction Type | Back-channel | Preventing experiment runs |    Stop running Experiments    | Listening to experiment lifecycle | Changing Properties |
|-------------------------------------------------------------------------------------|----------|------------------|:-------------|:--------------------------:|:------------------------------:|:---------------------------------:|:-------------------:|
| [Preflight Webhook](/integrate-with-steadybit/webhooks/preflight-webhooks.md)       | Platform | Synchronous      | ✅            |             ✅              |               ❌                |                 ❌                 |          ✅          |
| [Custom Webhook](/integrate-with-steadybit/webhooks/custom-webhooks.md)             | Platform | Asynchronous     | ❌            |             ❌              |               ❌                |                 ✅                 |          ❌          |
| [PreflightKit](/integrate-with-steadybit/extensions/extension-kits.md#preflightkit) | Agent    | Asynchronous     | ✅            |             ✅              |               ✅                |                 ❌                 |          ✅          |
| [EventKit](/integrate-with-steadybit/extensions/extension-kits.md#eventkit)         | Agent    | Asynchronous     | ❌            |             ❌              |               ❌                |                 ✅                 |          ❌          |
| [ActionKit](/integrate-with-steadybit/extensions/extension-kits.md#actionkit)       | Agent    | Asynchronous     | ✅            |             ❌              | ️[✅/❌](#user-content-fn-1)[^1] |                 ❌                 |          ✅          |

The remaining Extension Kits ([AdviceKit](/integrate-with-steadybit/extensions/extension-kits.md#advicekit) and [DiscoveryKit](/integrate-with-steadybit/extensions/extension-kits.md#discoverykit)) serve different purposes and are therefore not included in this comparison.

### CLI vs. API

|     | [Validate advice status](/use-steadybit/explorer/advice.md) | [CRUD of experiments](/use-steadybit/experiments/design.md) | [Run experiments](/use-steadybit/experiments/run.md) | [Use experiment templates](/use-steadybit/experiments/design.md#from-template) | [Schedule Experiments](/use-steadybit/experiments/schedule/README.md) | [Emergency stop](/use-steadybit/experiments/emergencyStop.md) | [Read targets](/use-steadybit/explorer/targets.md) | [Configure Steadybit](#user-content-fn-2)[^2] |
|-----|-------------------------------------------------------------|-------------------------------------------------------------|:-----------------------------------------------------|:-------------------------------------------------------------------------------|-----------------------------------------------------------------------|:--------------------------------------------------------------|:---------------------------------------------------|:----------------------------------------------|
| CLI | ✅                                                           | ✅                                                           | ✅                                                    | ❌                                                                              | ❌                                                                     | ❌                                                             | ❌                                                  | ❌                                             |
| API | ✅                                                           | ✅                                                           | ✅                                                    | ✅                                                                              | ✅                                                                     | ✅                                                             | ✅                                                  | ✅                                             |


[^1]: Only when the action is part of the experiment design and is currently running.

[^2]: Administrative functionality like managing [teams and users](/install-and-configure/manage-teams-and-users/README.md), [environments](/install-and-configure/manage-environments/README.md), [experiment templates](/install-and-configure/manage-experiment-templates/README.md), [hub connections](/integrate-with-steadybit/hubs/README.md), and [properties](/install-and-configure/manage-properties/README.md).