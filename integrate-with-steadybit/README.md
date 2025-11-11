# Overview
Steadybit is highly flexible, and you can seamlessly integrate it into your use cases and processes.
For that, we offer different integration points that you can use.

## Integration Points
### Command-Line Interface (CLI)
The CLI is ideal for integrating experiment runs or checking advice into your Continuous Integration/Continuous Delivery (CI/CD) pipeline.
Under the hood, it uses the platform's [API](#api).
Because the CLI is an npm package, it is agnostic to your actual CI/CD tool in action. [Learn more about the CLI](/integrate-with-steadybit/cli.md).

### API
The platform's API allows you to perform every action that you can do via the user interface also in a programmatic way.
This is perfect for setting up Steadybit in an automated way, e.g., creating teams and assigning environments, as well as advanced use cases for experiment creation and running, e.g., using an experiment template to create and run an experiment.
[Learn more about the API](/integrate-with-steadybit/api/api.md).


### Webhooks
The platform offers integrations via webhooks to get notified on events.
We differentiate between a custom webhook, that can just listen to events to integrate with external systems, and a preflight webhook, that allows to allow/disallow experiment runs to start.
Learn more about [custom webhooks](/integrate-with-steadybit/webhooks/custom-webhooks.md) and [preflight webhooks](/integrate-with-steadybit/webhooks/preflight-webhooks.md).

### Extension Kits
Extension Kits allow you to extend the Chaos Engineering capabilities by adding support for additional technologies or proprietary applications.
For instance, to support a custom attack, check, load test, or observability integration you need to implement [DiscoveryKit](/integrate-with-steadybit/extensions/extension-kits.md#discoverykit) and [ActionKit](/integrate-with-steadybit/extensions/extension-kits.md#actionkit).
[EventKit](/integrate-with-steadybit/extensions/extension-kits.md#eventkit) is perfect when you want to react on experiment's events, and [PreflightKit](/integrate-with-steadybit/extensions/extension-kits.md#preflightkit) whenever you want to have control whether an experiment is allowed to start.
Last bot not least, [AdviceKit](/integrate-with-steadybit/extensions/extension-kits.md#advicekit) allows you to ease your rollout by checking organization-specific best practices.
[Learn more about Extension Kits](/integrate-with-steadybit/extensions/extension-kits.md).


## When to use which Integration Point?
It can be easy to get confused with integration points offered by Steadybit.
This section highlights some key differentiator.
Don't hesitate to reach out to us if you need support by discussing your integration use case.

### Webhooks vs. Extension Kits

|                                                                                     | Sender   | Communication                             | Preventing experiment runs |   Stop running Experiments   | Listening to experiment's lifecycle | Changing Properties |
|-------------------------------------------------------------------------------------|----------|-------------------------------------------|:--------------------------:|:----------------------------:|:-----------------------------------:|:-------------------:|
| [Preflight Webhook](/integrate-with-steadybit/webhooks/preflight-webhooks.md)       | Platform | Synchronous (`55s` timeout)               |             ✅              |              ❌               |                  ❌                  |          ✅          |
| [Custom Webhook](/integrate-with-steadybit/webhooks/custom-webhooks.md)             | Platform | Fire-and-forget (no handling of response) |             ❌              |              ❌               |                  ✅                  |          ❌          |
| [PreflightKit](/integrate-with-steadybit/extensions/extension-kits.md#preflightkit) | Agent    | Asynchronous with polling                 |             ✅              |              ✅               |                  ❌                  |          ✅          |
| [EventKit](/integrate-with-steadybit/extensions/extension-kits.md#eventkit)         | Agent    | Asynchronous with polling                 |             ❌              |              ❌               |                  ✅                  |          ❌          |
| [ActionKit](/integrate-with-steadybit/extensions/extension-kits.md#actionkit)       | Agent    | Asynchronous with polling                 |             ❌              | ️[☑](#user-content-fn-1)[^1] |                  ❌                  |          ✅          |

The remaining Extension Kits ([AdviceKit](/integrate-with-steadybit/extensions/extension-kits.md#advicekit) and [DiscoveryKit](/integrate-with-steadybit/extensions/extension-kits.md#discoverykit)) serve different purpose and hence are not part of this comparison.

### CLI vs. API


|     | Validate advice status | CRUD and run experiments | Use experiment templates | Schedule Experiments | [Emergency stop](/use-steadybit/experiments/emergencyStop.md) | Read targets | [Configure Steadybit](#user-content-fn-2)[^2] |
|-----|------------------------|--------------------------|:-------------------------|----------------------|:--------------------------------------------------------------|:-------------|:----------------------------------------------|
| CLI | ✅                      | ✅                        | ❌                        | ❌                    | ❌                                                             | ❌            | ❌                                             |
| API | ✅                      | ✅                        | ✅                        | ✅                    | ✅                                                             | ✅            | ✅                                             |


[^1] Only when the action is part of the experiment design and is currently running.
[^2] Administrative functionality like managing [teams and users](/install-and-configure/manage-teams-and-users/README.md), [environments](/install-and-configure/manage-environments/README.md), [experiment templates](/install-and-configure/manage-experiment-templates/README.md), [hub connections](/integrate-with-steadybit/hubs/README.md), and [properties](/install-and-configure/manage-properties/README.md).