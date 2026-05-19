---
title: Database Runbooks
navTitle: Database Runbooks
---

# Database Runbooks

{% hint style="info" %}
This page applies to **on-premise installations** of the Steadybit platform. It assumes you are running a PostgreSQL 15+ database that the platform connects to. See [Database Configuration](advanced-configuration.md#database-configuration) for connection settings.
{% endhint %}

The Steadybit platform stores its state in PostgreSQL. This page covers two operational scenarios:

1. [The connection pool is saturated by long-running or blocked transactions.](#blocking-transactions)
2. [The database is running out of disk space.](#running-out-of-disk-space)

In both cases, monitoring should give you advance warning — see [Monitoring the Platform](monitoring.md) for the alerts we recommend.

{% hint style="warning" %}
The queries below modify production data. Always run a `SELECT` first to confirm the scope, and take a backup before running `DELETE` or `pg_terminate_backend`. If you are unsure, [contact Steadybit support](https://www.steadybit.com/contact) before proceeding.
{% endhint %}

## Blocking Transactions

**Symptom:** the `SteadybitHikariPoolCritical` alert fires, target updates from agents are not being processed, or the UI feels stuck on operations that read or write the `target` table.

**Cause:** PostgreSQL transactions that started but were never committed or rolled back continue to hold row-level locks. New connections from the platform queue up waiting for those locks and the HikariCP connection pool fills up.

### Step 1 — List transactions that hold locks

```sql
SELECT a.datname,
       l.relation::regclass,
       l.transactionid,
       l.mode,
       l.granted,
       a.usename,
       a.query,
       a.query_start,
       age(now(), a.query_start) AS age,
       a.pid
FROM pg_stat_activity a
JOIN pg_locks l ON l.pid = a.pid
ORDER BY a.query_start;
```

### Step 2 — Narrow down to transactions older than 1 hour

Most legitimate platform queries finish in under a second. Anything older than an hour is almost certainly stuck.

```sql
SELECT a.pid,
       a.query,
       a.query_start,
       age(now(), a.query_start) AS age
FROM pg_stat_activity a
JOIN pg_locks l ON l.pid = a.pid
WHERE a.query_start < now() - INTERVAL '1 hour'
ORDER BY a.query_start;
```

### Step 3 — Terminate the offending backend

Replace `<pid>` with the process ID returned by the previous query:

```sql
SELECT pg_terminate_backend(<pid>);
```

`pg_terminate_backend` rolls back the transaction and closes the connection. The platform reconnects automatically; no restart is required.

### Step 4 — Verify recovery

* Re-run the query from Step 1 — the count of held locks should drop.
* Check the `Datasource connections` panel; `hikaricp_connections_active` should fall back to its baseline.
* Confirm that the message queue lead time (`queue_lead_time`) starts decreasing.

## Running Out of Disk Space

**Symptom:** Postgres logs report `could not extend file` or `No space left on device`, or your storage monitoring is approaching the volume capacity.

**Cause:** historical execution data, target snapshots, or audit log entries have accumulated beyond what the configured retention removes. Bloat in heavily updated tables (notably `target`) can also consume far more space than the live row count would suggest.

### Step 1 — Identify the largest tables

```sql
SELECT nspname AS schema,
       relname AS table,
       reltuples AS row_estimate,
       pg_size_pretty(pg_total_relation_size(c.oid))           AS total,
       pg_size_pretty(pg_indexes_size(c.oid))                  AS index,
       pg_size_pretty(pg_total_relation_size(reltoastrelid))   AS toast,
       pg_size_pretty(pg_total_relation_size(c.oid)
                      - pg_indexes_size(c.oid)
                      - COALESCE(pg_total_relation_size(reltoastrelid), 0)) AS table_only
FROM pg_class c
LEFT JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE relkind = 'r'
ORDER BY pg_total_relation_size(c.oid) DESC
LIMIT 20;
```

The most common offenders are:

| Table | Why it grows |
|-------|--------------|
| `target` | Snapshot of every target seen by every agent. Heavy update churn → bloat. |
| `target_stats`, `target_submission_tracking` | Per-submission counters that the platform vacuums periodically. |
| `audit_log` | One row per administrative action. |
| `experiment_execution`, `execution_log_event`, `execution_metric_event` | Grow with the number of experiment runs. |

### Step 2 — Reclaim space with VACUUM

The platform runs scheduled `VACUUM`/`ANALYZE` (see `STEADYBIT_DB_MAINTENANCE_*` in [Configuration Options](advanced-configuration.md#database-maintenance)). When you need to reclaim space immediately, run a full vacuum **on a low-traffic window** — `VACUUM FULL` takes an exclusive lock on the affected table:

```sql
-- Releases space back to the OS but locks the table.
VACUUM FULL;

-- Or, target a single table:
VACUUM FULL public.target;
```

For a non-blocking alternative on PostgreSQL, install and use [`pg_repack`](https://reorg.github.io/pg_repack/).

### Step 3 — Delete obsolete data (if needed)

Only delete data after confirming that the platform's built-in retention is not enough for your situation, and after taking a backup. The data the platform tolerates losing the most are old target snapshots:

```sql
-- Replace the cutoff with a date well before your current retention horizon.
DELETE FROM public.target WHERE timestamp < '2025-01-01 00:00:00';
```

After a large delete, run `VACUUM FULL` on the affected table again to release the space.

### Step 4 — Increase the volume size

If after vacuuming, the database is still close to full, the safest fix is to increase the underlying volume. On AWS RDS this is a non-disruptive operation; on a self-hosted Postgres, follow your storage provider's resize procedure.

Plan ahead by reviewing your [Machine Requirements](advanced-configuration.md#rds-machine-requirements) — at ~100 k targets we recommend at least 20 GB of database storage.

## Preventive Maintenance

The platform performs automatic maintenance on a configurable schedule. The defaults are sensible for most installations; review them if you operate at scale or have observed bloat.

| Variable | Default | Description |
|----------|---------|-------------|
| `STEADYBIT_DB_MAINTENANCE_ENABLED` | `true` | Enable automatic VACUUM/ANALYZE. |
| `STEADYBIT_DB_MAINTENANCE_CRON` | `0 0 0 ? * SAT *` | Saturday at midnight. |
| `STEADYBIT_DB_MAINTENANCE_TABLES` | see [Configuration Options](advanced-configuration.md#database-maintenance) | Tables included in the maintenance window. |

Combined with the alerts described in [Monitoring the Platform](monitoring.md), this is usually enough to keep the database healthy without manual intervention.

## Related Pages

* [Monitoring the Platform](monitoring.md) — alerts that warn you before these situations become critical.
* [Configuration Options › Database Configuration](advanced-configuration.md#database-configuration) — connection and maintenance settings.
* [Troubleshooting › On-prem platform](../../troubleshooting/common-fixes/on-prem-platform.md) — installation-time database issues.
