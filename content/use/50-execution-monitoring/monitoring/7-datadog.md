---
title: "Datadog"
navTitle: "Datadog"
---

## Datadog

Datadog is a monitoring service for cloud-scale applications, providing monitoring of servers, databases, tools, and services, through a SaaS-based data analytics platform.
With the Datadog Monitor State Check we can react to the triggered alerts and use them for automatic steady state checks in experiments.

### Configuration

Under `Settings/Monitoring Integrations` you have to enter the `Datadog REST API Base URL` and the `API and Application keys` that were previously created in Datadog.
That's all we need to react to the events and incidents in Datadog.

#### Datadog REST API Base URL

| Domain | Base URL                           |
|-------------------|-----------------------------------------------------|
| `app.datadoghq.com`                | `https://app.datadoghq.com`                               |
| `app.datadoghq.eu`                | `https://app.datadoghq.eu`                      |

### API and Application Key

See the following URLs for helpful informations to setup and obtain the keys:

- [API Keys](https://app.datadoghq.eu/account/settings#api)
- [Application Keys](https://app.datadoghq.eu/access/application-keys)

### Usage

Once Datadog has been configured in the platform's settings, you will find a `Datadog State Check` in section `Execution and Monitoring` within the
configuration dialog of an experiment.

You only have to choose a Datadog Monitor from the list you want to check during the experiment execution. To learn more about this topic, just check out these
URLs and create the Monitors you need for your specific use case.

Useful resources:
- [Setup Datadog Monitors](https://docs.datadoghq.com/monitors/)
- [Getting Started with Monitors](https://docs.datadoghq.com/getting_started/application/monitors)
- [Create a monitor](https://app.datadoghq.eu/help/quick_start)
