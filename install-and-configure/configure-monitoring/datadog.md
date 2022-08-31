---
title: Datadog
---

# Datadog

Datadog is a monitoring service for cloud-scale applications, providing monitoring of servers, databases, tools, and services, through a SaaS-based data
analytics platform. With the Datadog Monitor State Check we can react to the triggered alerts and use them for automatic steady state checks in experiments.

#### Configuration

Under `Settings/Monitoring Integrations` you have to enter the `Datadog REST API Base URL` and the `API and Application keys` that were previously created in
Datadog. That's all we need to react to the events and incidents in Datadog.

Below is the configuration as an example for Datadog sites US1 and EU. In case you are on a different one, you can learn more
on [Datadog Sites](https://docs.datadoghq.com/getting_started/site/) in the Datadog documentation.

**Datadog REST API Base URL**

| Datadog Site | Domain              | Base URL                    |
|--------------|---------------------| --------------------------- |
| US1          | `app.datadoghq.com` | `https://app.datadoghq.com` |
| EU           | `app.datadoghq.eu`  | `https://app.datadoghq.eu` |

**API and Application Key**

See the following URLs for helpful information to set up and obtain the keys:

* US1 Datadog Site
    * [API Keys](https://app.datadoghq.com/account/settings#api)
    * [Application Keys](https://app.datadoghq.com/access/application-keys)
* EU Datadog Site
  * [API Keys](https://app.datadoghq.eu/account/settings#api)
  * [Application Keys](https://app.datadoghq.eu/access/application-keys)


#### Usage

Once Datadog has been configured in the platform's settings, you can use the `Datadog State Check` in an experiment. Detailed explanation can be found
in [Integrate / Monitoring / Data Dog](../../integrate-with-steadybit/monitoring/datadog.md).
