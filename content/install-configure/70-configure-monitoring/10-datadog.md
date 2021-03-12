---
title: "Datadog"
---
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

#### API and Application Key

See the following URLs for helpful informations to setup and obtain the keys:

- [API Keys](https://app.datadoghq.eu/account/settings#api)
- [Application Keys](https://app.datadoghq.eu/access/application-keys)

### Usage

Once Datadog has been configured in the platform's settings, you can use the `Datadog State Check` in an experiment. Detailed explanation can be found in [Learn / Integrate Monitoring / Data Dog](../../learn/40-integrate-monitoring/10-datadog).
