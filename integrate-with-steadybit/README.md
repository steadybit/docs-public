# Overview

Steadybit is highly flexible, and you can seamlessly integrate it into your use cases and processes. For this, we offer various integration points that you can build upon.

## Integration Points

### Command-Line Interface (CLI)

The CLI is ideal for running experiments and checking advice in your Continuous Integration/Continuous Delivery (CI/CD) pipeline, and for keeping experiments, templates, schedules, services, and the platform's configuration as files in Git. Under the hood, it uses the platform's [API](./#api). It is a single binary for Linux, macOS, and Windows, also available as a container image and a GitHub Action, so it works with any CI/CD tool. [Learn more about the CLI](cli.md).

### API

The platform's API lets you perform programmatically every action that can be done via the user interface. This is ideal for setting up Steadybit in an automated manner, such as creating teams and assigning environments, as well as for advanced use cases involving experiment creation and execution, e.g., utilizing an experiment template to create and run an experiment. [Learn more about the API](api/api.md).

### Webhooks

The platform offers integrations via webhooks to get notified of events. We differentiate between a custom webhook, which can listen to events to integrate with external systems, and a preflight webhook, which can allow/disallow the starting of experiment runs. Learn more about [custom webhooks](webhooks/custom-webhooks.md) and [preflight webhooks](webhooks/preflight-webhooks.md).

### Extension Kits

Extension Kits allow you to extend the Chaos Engineering capabilities by adding support for additional technologies or proprietary applications. For instance, to support a custom attack, check, load test, or observability integration, you need to implement [DiscoveryKit](extensions/extension-kits.md#discoverykit) and [ActionKit](extensions/extension-kits.md#actionkit). [EventKit](extensions/extension-kits.md#eventkit) is perfect when you want to react to experiment events, and [PreflightKit](extensions/extension-kits.md#preflightkit) is perfect whenever you want to have control over starting an experiment run. Last but not least, [AdviceKit](extensions/extension-kits.md#advicekit) allows you to ease your rollout by checking organization-specific best practices. [Learn more about Extension Kits](extensions/extension-kits.md).

## IP Ranges

If your environment restricts outbound or inbound traffic to/from Steadybit (for example, via a firewall or security group), you can allowlist the following fixed CIDR range for our SaaS platform:

| Scope                                                                                                                                     | CIDR            |
|-------------------------------------------------------------------------------------------------------------------------------------------|-----------------|
| All inbound connections to and outbound connections from the Steadybit SaaS platform (`platform.steadybit.com` / `platform.steadybit.io`) | `5.60.96.56/29` |

This single range covers:

- **Inbound** — agents, users, and API clients connecting to the Steadybit platform.
- **Outbound** — webhooks, preflight checks, and any other call originated by the Steadybit platform back to your systems.

## When to use which Integration Point?

This section highlights some key differentiators. Don't hesitate to reach out to us if you would like to discuss your integration use case.

### Webhooks vs. Extension Kits

|                                                           | Sender   | Interaction Type | Back-channel | Preventing experiment runs | Stop running Experiments | Listening to experiment lifecycle | Changing Properties |
| --------------------------------------------------------- | -------- | ---------------- | ------------ | :------------------------: | :----------------------: | :-------------------------------: | :-----------------: |
| [Preflight Webhook](webhooks/preflight-webhooks.md)       | Platform | Synchronous      | ✅            |              ✅             |             ❌            |                 ❌                 |          ✅          |
| [Custom Webhook](webhooks/custom-webhooks.md)             | Platform | Asynchronous     | ❌            |              ❌             |             ❌            |                 ✅                 |          ❌          |
| [PreflightKit](extensions/extension-kits.md#preflightkit) | Agent    | Asynchronous     | ✅            |              ✅             |             ✅            |                 ❌                 |          ✅          |
| [EventKit](extensions/extension-kits.md#eventkit)         | Agent    | Asynchronous     | ❌            |              ❌             |             ❌            |                 ✅                 |          ❌          |
| [ActionKit](extensions/extension-kits.md#actionkit)       | Agent    | Asynchronous     | ✅            |              ❌             |         ️✅/❌[^1]         |                 ❌                 |          ✅          |

The remaining Extension Kits ([AdviceKit](extensions/extension-kits.md#advicekit) and [DiscoveryKit](extensions/extension-kits.md#discoverykit)) serve different purposes and are therefore not included in this comparison.

### CLI vs. API

The CLI covers the same use cases as the API. It runs experiments, checks advice, and triggers the emergency stop. It manages experiments, templates, schedules, services, teams, environments, access tokens, integrations, and the rest of the platform's configuration. It reads targets, reports, and the audit log. Because it calls the API under the hood, the difference is how you work with it:

|                       | CLI                                                                                                                               | API                                                                                                                                                     |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Best for              | CI/CD pipelines and GitOps, one command per step                                                                                  | Your own tools and integrations, in any language                                                                                                        |
| Setup                 | One binary, a container image, or a GitHub Action                                                                                 | Any HTTP client, or a client generated from the [OpenAPI specification](api/api.md#openapi-specification)                                               |
| Configuration as code | Files in Git: `apply`, `diff` (exits with 2 on drift), and `export` of a whole team                                               | One JSON or YAML request per resource                                                                                                                   |
| Running experiments   | Waits for the run, fails the pipeline when the run fails, cancels the run when the pipeline is canceled, and writes JUnit reports | Start the run, then poll its state                                                                                                                      |
| Concurrent edits      | The file is the source of truth: `apply` overwrites changes made in the UI in the meantime                                        | Send the `version` you read, and a change made in the meantime is rejected with `409 Conflict`; see [Concurrent Updates](api/api.md#concurrent-updates) |

A few things are only available through the API: the license report, target statistics, saved landscape views, experiment badges, and searching runs across all experiments.

[^1]: Only when the action is part of the experiment design and is currently running.
