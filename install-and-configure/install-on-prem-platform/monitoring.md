---
title: Monitoring the Steadybit Platform
navTitle: Monitoring
---

# Monitoring the Platform

{% hint style="info" %}
This page applies to **on-premise installations** of the Steadybit platform. If you are using our SaaS at [platform.steadybit.com](https://platform.steadybit.com), monitoring is fully managed by Steadybit.
{% endhint %}

When you operate the Steadybit platform yourself, observing a small set of metrics is enough to spot the vast majority of issues before they impact your users. This page describes:

* the metrics endpoint exposed by the platform,
* the **four Golden Signals** to monitor (latency, traffic, errors, saturation),
* a downloadable Grafana dashboard — the same one we use internally,
* a ready-to-use set of **recommended Prometheus alert rules** with the thresholds we run in production.

## Metrics Endpoint

The platform exposes Prometheus-compatible metrics on the management port `9090`:

```
http://<platform-host>:9090/actuator/prometheus
```

Port `9090` is administrative and is not exposed to end users. Scrape it from your Prometheus instance the same way you would any Spring Boot Actuator endpoint. All metric names referenced on this page come from this endpoint.

## The Four Golden Signals

Monitor these four families first. They cover almost every customer-facing problem.

### 1. Latency

How long requests take to complete. Two views matter:

| Signal | Metric | What it tells you |
|--------|--------|-------------------|
| HTTP request latency | `http_server_requests_seconds_sum` / `http_server_requests_seconds_count` | End-user perceived UI/API responsiveness. |
| Message queue lead time | `queue_lead_time` | How far behind the platform is in processing target updates from agents. Spikes here are the earliest symptom of an overloaded platform. |

**Recommended thresholds:**

| Metric | Warning | Critical |
|--------|---------|----------|
| Mean GET response time (2 min window) | > 200 ms | > 500 ms |
| Mean POST response time (2 min window) | > 400 ms | > 600 ms |
| Mean POST response time, UI endpoints (`/ui/experiments/validate`, `/ui/targets/count`) | > 5 s | > 10 s |
| Message queue accumulated lead time | > 10 min | > 30 min |

### 2. Traffic

Request volume hitting the platform. Sudden spikes often correlate with too many agents reconnecting or a misbehaving integration.

| Metric | Warning | Critical |
|--------|---------|----------|
| `http_server_requests_seconds_count` per second | > 5 req/s | > 10 req/s |

These thresholds are conservative; tune them to match your installed scale (number of agents, tenants, targets).

### 3. Errors

The percentage of requests returning HTTP 5xx.

| Metric | Critical |
|--------|----------|
| `http_server_requests_seconds_count{status=~"5.."}` / total request rate | > 5 % over 5 minutes |

A sustained error rate above 5 % almost always points to a database issue, a broken upstream integration, or a recently failed deployment.

### 4. Saturation

How "full" the platform is. The two limits to watch:

| Resource | Metric | Warning | Critical |
|----------|--------|---------|----------|
| JVM heap memory | `jvm_memory_used_bytes{area="heap"}` / `jvm_memory_max_bytes{area="heap"}` | > 80 % for 5 min | — |
| Database connection pool | `hikaricp_connections_active` / `hikaricp_connections_max` | > 60 % for 5 min | > 80 % for 5 min |

A connection pool above 80 % is a strong indicator of either long-running transactions on the database or an undersized pool. See the [Database Runbooks](database-runbooks.md) page for cleanup procedures.

## Grafana Dashboard

We publish the same Grafana dashboard we use to operate Steadybit SaaS. It is grouped into four sections — Message Queues, Target Ingestion, Platform Chaos Engineering Activity, and Platform Resource Consumption — each backed by the metrics described above.

**Download:** [steadybit-platform-dashboard.json](../../.gitbook/assets/steadybit-platform-dashboard.json)

To install, in Grafana go to **Dashboards → New → Import**, then either upload the file or paste its contents. Select your Prometheus data source when prompted.

## Recommended Prometheus Alert Rules

The following `PrometheusRule` is the exact configuration we run in production. Adjust the thresholds to your scale, but keep the structure — each rule maps to a Golden Signal above.

```yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: steadybit-platform-golden-signals
  labels:
    release: prometheus
spec:
  groups:
    - name: GoldenSignalsAlerts
      rules:
        # ---------------- Latency ----------------
        - alert: SteadybitQueueLeadTimeCritical
          expr: max by (groupKey) (queue_lead_time) > 1800
          for: 10m
          labels: { severity: critical }
          annotations:
            summary: "Message queue lead time critical"
            description: "Queue lead time has been above 30 minutes for 10 minutes."

        - alert: SteadybitQueueLeadTimeWarning
          expr: |
            max by (groupKey) (queue_lead_time) > 600 and
            max by (groupKey) (queue_lead_time) < 1800
          for: 5m
          labels: { severity: warning }
          annotations:
            summary: "Message queue lead time elevated"

        - alert: SteadybitGetLatencyCritical
          expr: |
            sum(rate(http_server_requests_seconds_sum{method="GET",exception="none",app_kubernetes_io_name="platform"}[2m])) by (uri)
            /
            sum(rate(http_server_requests_seconds_count{method="GET",exception="none",app_kubernetes_io_name="platform"}[2m])) by (uri) > 0.5
          for: 5m
          labels: { severity: critical }

        - alert: SteadybitPostLatencyCritical
          expr: |
            sum(rate(http_server_requests_seconds_sum{method="POST",exception="none",app_kubernetes_io_name="platform"}[2m])) by (uri)
            /
            sum(rate(http_server_requests_seconds_count{method="POST",exception="none",app_kubernetes_io_name="platform"}[2m])) by (uri) > 0.6
          for: 2m
          labels: { severity: critical }

        # ---------------- Traffic ----------------
        - alert: SteadybitRequestRateCritical
          expr: irate(http_server_requests_seconds_count{exception="none",app_kubernetes_io_name="platform"}[1m]) > 10
          for: 1m
          labels: { severity: critical }

        # ---------------- Errors ----------------
        - alert: SteadybitErrorRateCritical
          expr: |
            sum(rate(http_server_requests_seconds_count{app_kubernetes_io_name="platform",status=~"5.."}[1m]))
            /
            sum(rate(http_server_requests_seconds_count{app_kubernetes_io_name="platform"}[1m])) > 0.05
          for: 5m
          labels: { severity: critical }
          annotations:
            summary: "Platform 5xx error rate above 5%"

        # ---------------- Saturation ----------------
        - alert: SteadybitJvmHeapWarning
          expr: |
            sum(jvm_memory_used_bytes{app_kubernetes_io_instance="platform",area="heap"})
            /
            sum(jvm_memory_max_bytes{app_kubernetes_io_instance="platform",area="heap"}) > 0.8
          for: 5m
          labels: { severity: warning }

        - alert: SteadybitHikariPoolWarning
          expr: |
            (sum(hikaricp_connections_active) by (pool) / sum(hikaricp_connections_max) by (pool)) * 100 >= 60
            and
            (sum(hikaricp_connections_active) by (pool) / sum(hikaricp_connections_max) by (pool)) * 100 < 80
          for: 1m
          labels: { severity: warning }
          annotations:
            summary: "HikariCP pool {{ $labels.pool }} > 60 % utilized"

        - alert: SteadybitHikariPoolCritical
          expr: |
            (sum(hikaricp_connections_active) by (pool) / sum(hikaricp_connections_max) by (pool)) * 100 >= 80
          for: 1m
          labels: { severity: critical }
          annotations:
            summary: "HikariCP pool {{ $labels.pool }} > 80 % utilized"
```

### Optional: Security & Rate Limit Alerts

If your platform is exposed to user-defined webhooks or hubs, the following alerts help catch abusive or misconfigured integrations:

```yaml
- alert: SteadybitBlockedOutgoingRequests
  expr: sum by(status) (increase(connectivity_outgoing_address_filter_total{status="blocked"}[1m])) > 5
  for: 1m
  labels: { severity: warning }
  annotations:
    summary: "Outgoing webhook or hub requests are being blocked"

- alert: SteadybitTenantRateLimitReached
  expr: |
    avg by (tenantKey, bucketName) (avg_over_time((ratelimit_tokens_available{qualifier="none"})[10m:])) <= 1
  labels: { severity: warning }
  annotations:
    summary: "Tenant rate limit reached: tenant={{ $labels.tenantKey }}, bucket={{ $labels.bucketName }}"
```

## When an Alert Fires

| Alert | First thing to check |
|-------|----------------------|
| Queue lead time | Database CPU and HikariCP saturation. The post-processing pipeline writes to Postgres on every step. |
| GET / POST latency | Database, then JVM heap. |
| 5xx error rate | Platform logs (`Platform Log Events` panel) for stack traces. |
| JVM heap > 80 % | Capture a heap dump as described in [Troubleshooting › On-prem platform](../../troubleshooting/common-fixes/on-prem-platform.md#create-heap-dump). |
| HikariCP pool > 80 % | Long-running or blocked transactions. Follow the [Database Runbooks](database-runbooks.md). |
| Blocked outgoing requests | A user webhook or hub points to a host that is blocked by your egress policy. |

## Related Pages

* [Database Runbooks](database-runbooks.md) — recover from blocking transactions or disk pressure.
* [Configuration Options](advanced-configuration.md) — JVM and database tuning parameters.
* [Maintenance & Incident Support](maintenance-and-incident-support.md) — communicate planned maintenance and incidents to your users.
* [Troubleshooting › On-prem platform](../../troubleshooting/common-fixes/on-prem-platform.md) — common fixes for installation issues.
