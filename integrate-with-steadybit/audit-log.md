# Audit Log

The audit log retains historical information about actions triggered within the Steadybit platform. For example, the audit logs help to answer questions such as:

* When was the experiment executed, by whom, and which hosts did it affect?
* When did we engage the experiment kill switch?

## What Is Logged

The audit log records:

* **Experiment runs** — the full lifecycle of every run, including each step and each attacked target, who started it and how, and changes to its properties
* **The [emergency stop](../use-steadybit/experiments/emergencyStop.md)** — when it was engaged and released
* **Experiments, templates, schedules, and experiment suites** — creation, changes, and deletion
* **Teams, users, and access** — teams, invitations, memberships, and access tokens
* **Environments, services, and service profiles** — including their variables
* **Configuration** — properties, webhooks, preflight action integrations, hubs, and tenant settings

Each entry records who triggered it (a user, an access token, or a schedule), when, and the affected team and environment.

## Access the Audit Log

You can access the audit log through the `/api/audit-log` endpoint or with the [Steadybit CLI](cli.md) (`steadybit audit-log`). For more information, please see our [API documentation](https://platform.steadybit.com/api/swagger/swagger-ui/index.html?configUrl=/api/spec/swagger-config#/Audit%20Log).

## Retention

Audit logs are retained for up to _90 days_ for our SaaS platform. Customers leveraging an on-premise Steadybit platform installation can extend the retention through the `steadybit.auditlog.retention.period` configuration option. The configuration option accepts shorthands for time units, e.g., `90d` for 90 days.
