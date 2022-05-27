---
title: "Audit Log"
---

The audit log retains historical information about actions triggered within the Steadybit platform. For example, the audit logs help to answer questions such as:

 - When was the experiment executed, by whom, and which hosts did it affect?
 - When did we engage the experiment kill switch?

At the moment, only a handful of activities are logged for audition purposes. In the future, this will be extended.

You can access the audit log through the `/api/audit-log` endpoint. For more information, please see our [API documentation](https://platform.steadybit.io/api/swagger/swagger-ui/index.html?configUrl=/api/spec/swagger-config#/Audit%20Log).

## Retention

Audit logs are retained for up to *90 days* for our SaaS platform. Customers leveraging an on-premise Steadybit platform installation can extend the retention through the `steadybit.auditlog.removeAfter` configuration option. The configuration option accepts shorthands for time units, e.g., `90d` for 90 days.
