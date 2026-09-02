---
title: Advanced Platform Configuration
navTitle: Advanced Configuration
---

# Configuration Options

### Machine Requirements

The machine you are installing Steadybit onto, must have **at least** 4 CPUs and 8 GB available memory.

| Environment Variable     | Required | Description                                                                                                        |
|--------------------------|----------|--------------------------------------------------------------------------------------------------------------------|
| `JVM_MAX_RAM_PERCENTAGE` |          | <p>Define the <code>MaxRAMPercentage</code> of the platform JVM<br><strong>Default:</strong> <code>75.0</code></p> |

### Debug Docker Images

The platform container image doesn't contain a shell by default. However, in case you need to exec into the container using a shell for debugging purposes, we provide an additional debug variant with the `platform-debug` tag.

### Database Configuration

Steadybit requires a PostgreSQL 15 database. The platform relies heavily on PostgreSQL-specific features and cannot run on other RDBMS.

**Note**: Ensure the database and platform clocks are in sync, as time-based operations might be impacted otherwise.

| Environment Variable         | Required | Description                                                                                                                       |
|------------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------|
| `SPRING_DATASOURCE_URL`      | yes      | <p>JDBC Url for the database connection<br><strong>Example:</strong> <code>jdbc:postgresql://postgres:5432/steadybitdb</code></p> |
| `SPRING_DATASOURCE_USERNAME` | yes      | <p>Database Username<br><strong>Example:</strong> <code>postgres</code></p>                                                       |
| `SPRING_DATASOURCE_PASSWORD` | yes      | <p>Database Password<br><strong>Example:</strong> <code>postgres</code></p>                                                       |
| `STEADYBIT_DB_WEB_ENABLED`   |          | <p>Enable Http Endpoint for Database export<br><strong>Default:</strong> <code>true</code></p>                                    |

#### Database Maintenance

The platform performs periodic database maintenance (VACUUM, ANALYZE) on configurable tables to optimize performance.

| Environment Variable               | Required | Description                                                                                                                                                                                                                                                                |
|------------------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `STEADYBIT_DB_MAINTENANCE_ENABLED` |          | <p>Enable automatic database maintenance<br><strong>Default:</strong> <code>true</code></p>                                                                                                                                                                                |
| `STEADYBIT_DB_MAINTENANCE_CRON`    |          | <p>Cron expression for when maintenance runs<br><strong>Default:</strong> <code>0 0 0 ? * SAT *</code> (midnight on Saturdays)</p>                                                                                                                                         |
| `STEADYBIT_DB_MAINTENANCE_TABLES`  |          | <p>Comma-separated list of tables to maintain<br><strong>Default:</strong> <code>target,target_stats,target_submission_tracking,audit_log,experiment_execution,execution_log_event,execution_metric_event,execution_artifact,execution_spans,license_usage,file</code></p> |

#### Database Permissions

On startup the platform creates and migrates its own database objects; nothing has to be created by hand beforehand. It performs the following DDL with the configured database user:

* `CREATE SCHEMA IF NOT EXISTS steadybit` — shared, non-tenant data (users, sessions, background jobs)
* `CREATE SCHEMA IF NOT EXISTS sb_onprem` — tenant data (experiments, targets, executions, ...)
* `CREATE EXTENSION IF NOT EXISTS ... SCHEMA public` for `pg_trgm` and `btree_gin`
* all tables, indexes, functions and triggers inside the two schemas (including migrations on upgrades and the indexes created by the [Target Index Advisor](#target-index-advisor))

Consequently the database user does not need to be a superuser, but it needs the following privileges. Replace `<steadybitdb>` and `<user>` with your database name and application user:

| Command                                              | Description                                                                                                                                                                                                                                                                                                                                             |
|------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `GRANT CONNECT ON DATABASE <steadybitdb> TO <user>;` | Allow the application user to connect.                                                                                                                                                                                                                                                                                                                  |
| `GRANT CREATE ON DATABASE <steadybitdb> TO <user>;`  | Allow the application user to create the `steadybit` and `sb_onprem` schemas. The user becomes the owner of both schemas and therefore of every object inside them, so no further table-level grants are required.                                                                                                                                       |
| `GRANT USAGE ON SCHEMA public TO <user>;`            | Access to the extension functions and operators installed in `public`. Granted to every user by default; listed here for hardened setups that revoked it.                                                                                                                                                                                              |
| `GRANT CREATE ON SCHEMA public TO <user>;`           | Only needed if the platform should install the extensions itself (see below). Since PostgreSQL 15 `CREATE` on `public` is no longer granted to every user by default, only to the database owner.                                                                                                                                                       |

**Extensions.** `CREATE EXTENSION` is skipped for extensions that already exist, so you can either pre-install them or let the platform do it. Both `pg_trgm` and `btree_gin` are [trusted extensions](https://www.postgresql.org/docs/current/sql-createextension.html), i.e. the platform can install them itself as long as the user has `CREATE` on the database and on schema `public`. A superuser is not required at any point.

The recommended setup for an application user without `CREATE` on `public` is to run the following once as a privileged user, after which the application user only needs the grants from the table above:

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm SCHEMA public;
CREATE EXTENSION IF NOT EXISTS btree_gin SCHEMA public;
GRANT CONNECT, CREATE ON DATABASE <steadybitdb> TO <user>;
GRANT USAGE ON SCHEMA public TO <user>;
```

#### Target Index Advisor

Steadybit runs a nightly job that inspects which target attribute keys are actually used as target
enrichment rule selectors, samples their real-world cardinality, and suggests — or, by default, creates —
dedicated PostgreSQL indexes for the keys that make enrichment-rule matching fast. Index removal is never
performed automatically in any mode; a no-longer-justified index is always a logged suggestion for an operator
to act on by hand. Suggestions and the DDL to run manually are logged under `[TargetIndexAdvisor]`.

| Environment Variable                                      | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                    |
|-----------------------------------------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `STEADYBIT_TARGETS_INDEX_ADVISOR_MODE`                    |          | <p>Controls what the nightly pass does. <code>OFF</code> — does nothing at all (no classification, no sampling queries, no catalog reads). <code>REPORT_ONLY</code> — classifies keys and logs suggestions, but takes no DB action. <code>AUTO_CREATE</code> — additionally creates a missing index the first night a key classifies as needle-like.<br><strong>Default:</strong> <code>AUTO_CREATE</code></p> |
| `STEADYBIT_TARGETS_INDEX_ADVISOR_CRON`                    |          | <p>Cron expression for when the nightly per-tenant pass runs.<br><strong>Default:</strong> <code>0 15 2 ? * * *</code> (02:15)</p>                                                                                                                                                                                                                                                                             |
| `STEADYBIT_TARGETS_INDEX_ADVISOR_CRON_JITTER`             |          | <p>Maximum per-tenant random offset added on top of the cron schedule, so tenants don't all sample the target table at the same instant. Deterministically derived from the tenant key, so it stays stable across restarts.<br><strong>Default:</strong> <code>20m</code></p>                                                                                                                                  |
| `STEADYBIT_TARGETS_INDEX_ADVISOR_NEEDLE_ROW_THRESHOLD`    |          | <p>A key classifies as needle-like (index it) once the average number of rows matched per distinct value drops to or below this threshold.<br><strong>Default:</strong> <code>100</code></p>                                                                                                                                                                                                                   |
| `STEADYBIT_TARGETS_INDEX_ADVISOR_BULK_ROW_THRESHOLD`      |          | <p>A key classifies as bulk-like (safe to remove an existing index) once the average number of rows matched per distinct value reaches or exceeds this threshold. Deliberately a 10x gap from the needle threshold so ordinary night-to-night sampling noise can't flip a key between the two.<br><strong>Default:</strong> <code>1000</code></p>                                                              |
| `STEADYBIT_TARGETS_INDEX_ADVISOR_POPULATION_FLOOR`        |          | <p>Skip classifying/indexing a key if its target type's total population is smaller than this — a full scan of a small type is already fast regardless of selectivity.<br><strong>Default:</strong> <code>5000</code></p>                                                                                                                                                                                      |
| `STEADYBIT_TARGETS_INDEX_ADVISOR_SAMPLE_CONFIDENCE_FLOOR` |          | <p>Below this many matched rows, the adaptive sampling estimate isn't trusted and the classifier falls back to a full scan for that key.<br><strong>Default:</strong> <code>2000</code></p>                                                                                                                                                                                                                    |

#### RDS Machine Requirements

The workload is bound by the database CPU on peaks.

If you have ~100k targets simultaneously in the platform, we recommend a burstable instance with four vCPU (e.g., db.t4g.xlarge). Regarding disk size, 20 GB should be enough capacity for the start (as extending on AWS should not be a problem).

If you choose a smaller instance for cost savings, the target ingestion will be slower, so it will take a bit longer until the target data in the platform is
consistent.

#### AWS RDS IAM Authentication

Steadybit supports AWS RDS IAM authentication using the [AWS Advanced JDBC Wrapper](https://github.com/aws/aws-advanced-jdbc-wrapper). This allows you to authenticate to your RDS database using IAM credentials instead of a database password.

##### Prerequisites

Before configuring Steadybit, you need to set up IAM database authentication on your RDS instance. Follow the [AWS documentation on IAM database authentication for MariaDB, MySQL, and PostgreSQL](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.html) to:

1. Enable IAM authentication on your RDS instance
2. Create a database user that uses IAM authentication
3. Configure the required IAM policy with `rds-db:connect` permission

##### Configuration

To enable IAM authentication, configure the following environment variables:

| Environment Variable                                             | Required | Description                                                                                                                                                                                                      |
|------------------------------------------------------------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `SPRING_DATASOURCE_URL`                                          | yes      | <p>JDBC URL using the AWS wrapper prefix<br><strong>Example:</strong> <code>jdbc:aws-wrapper:postgresql://your-rds-endpoint:5432/steadybitdb</code></p>                                                          |
| `SPRING_DATASOURCE_USERNAME`                                     | yes      | <p>The IAM database user<br><strong>Example:</strong> <code>steadybit_iam</code></p>                                                                                                                             |
| `spring.datasource.hikari.data-source-properties.wrapperPlugins` | yes      | <p>Comma-separated list of AWS JDBC Wrapper plugins. Include <code>iam</code> for IAM authentication.<br><strong>Example:</strong> <code>iam,initialConnection,auroraConnectionTracker,failover2,efm2</code></p> |
| `spring.datasource.hikari.data-source-properties.wrapperDialect` |          | <p>The database dialect for the AWS JDBC Wrapper. Required for some plugins to work correctly, e.g. when using aurora.</p>                                                                                       |

**Note:** When using IAM authentication, you do not need to set `SPRING_DATASOURCE_PASSWORD` as the AWS SDK will generate authentication tokens automatically using the configured IAM credentials.

##### Example Configuration

```yaml
env:
  - name: SPRING_DATASOURCE_URL
    value: "jdbc:aws-wrapper:postgresql://my-rds-instance.abc123.us-east-1.rds.amazonaws.com:5432/steadybitdb"
  - name: SPRING_DATASOURCE_USERNAME
    value: "steadybit_iam"
  - name: spring.datasource.hikari.data-source-properties.wrapperPlugins
    value: "iam,efm2"
```

##### Available Wrapper Plugins

You can also configure additional wrapper plugins for aurora (e.g. `initialConnection`, `auroraConnectionTracker`) or clusters (`failover2`). For a complete list of available plugins and their configuration options, see the [AWS Advanced JDBC Wrapper documentation](https://github.com/aws/aws-advanced-jdbc-wrapper/blob/main/docs/using-the-jdbc-driver/UsingTheJdbcDriver.md#list-of-available-plugins).

### Message Broker Configuration

A Redis message broker is required to run the platform with multiple instances.

| Environment Variable                                                                | Required | Description                                                                          |
|-------------------------------------------------------------------------------------|----------|--------------------------------------------------------------------------------------|
| `SPRING_REDIS_HOST`                                                                 | yes      | <p>Redis server host<br><strong>Example:</strong> <code>redis</code></p>             |
| `SPRING_REDIS_PORT`                                                                 |          | <p>Redis server port<br><strong>Default:</strong> <code>6379</code></p>              |
| `SPRING_REDIS_USERNAME`                                                             |          | Redis Username                                                                       |
| `SPRING_REDIS_PASSWORD`                                                             |          | Redis Password                                                                       |
| platform <= 1.0.96 `SPRING_REDIS_SSL`, platform > 1.0.96 `SPRING_REDIS_SSL_ENABLED` |          | <p>Whether to enable ssl support.<br><strong>Default:</strong> <code>false</code></p>|
| `SPRING_REDIS_CLIENT_NAME`                                                          |          | Client name to be set on connections with CLIENT SETNAME.                            |

### Tenant Configuration

| Environment Variable        | Required | Description                                                                                                                                    |
|-----------------------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------|
| `STEADYBIT_TENANT_AGENTKEY` | yes      | <p>Agent key for the tenant assigned to you. Treat it as sensitive information.<br><strong>Example:</strong> <code>foobar</code></p>           |
| `STEADYBIT_TENANT_LICENSE`  | yes      | <p>License key for the tenant assigned to you. Treat it as sensitive information.<br><strong>Example:</strong> <code>secret-license</code></p> |

### Web Configuration

| Environment Variable                   | Required | Description                                                                                                                                                                                         |
|----------------------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `STEADYBIT_WEB_PUBLIC_URL`             |          | URL to point to your Steadybit installation. Use this if your platform runs behind a reverse proxy doing path rewriting. Also, it is used for the links in notifications.                           |
| `STEADYBIT_WEB_PUBLIC_EXPERIMENT_PORT` |          | By default, the Websocket connections are advertised to the agents on port 7878. If the public port differs (e.g. because of a proxy) use this property to advertise a different port.              |
| `STEADYBIT_WEB_PUBLIC_EXPERIMENT_URL`  |          | By default, the Websocket connections are advertised using the same URL name as the agents register to. You can override the advertised URL if you run a separate load balancer for the websockets. |

### Log Configuration

| Environment Variable | Required | Description                                                                                    |
|----------------------|----------|------------------------------------------------------------------------------------------------|
| `LOGGING_FORMAT`     |          | By default, Steadybit uses `text` format. Set this to `json` to switch the log format to JSON. |

### Static-Authentication

You can use a static username/password to authenticate as an admin user.

| Environment Variable               | Required | Description                                                                                             |
|------------------------------------|----------|---------------------------------------------------------------------------------------------------------|
| `STEADYBIT_AUTH_PROVIDER`          | yes      | <p>Use <code>STATIC</code> for static authentication<br><strong>Example:</strong> <code>LDAP</code></p> |
| `STEADYBIT_AUTH_STATIC_0_USERNAME` | yes      | <p>Username<br><strong>Example:</strong> <code>admin</code></p>                                         |
| `STEADYBIT_AUTH_STATIC_0_PASSWORD` | yes      | <p>Password<br><strong>Example:</strong> <code>{noop}admin</code></p>                                   |

### LDAP-Authentication

You can use an LDAP server for [authentication and synchronization](ldap-integration.md).

| Environment Variable                           | Required | Description                                                                                                                                                                       |
|------------------------------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `STEADYBIT_AUTH_PROVIDER`                      | yes      | <p>Use <code>LDAP</code> for LDAP-Authentication<br><strong>Example:</strong> <code>LDAP</code></p>                                                                               |
| `STEADYBIT_AUTH_LDAP_URL`                      | yes      | <p>LDAP-Server URL<br><strong>Example:</strong> <code>ldap://openldap:389/dc=steadybit,dc=com</code></p>                                                                          |
| `STEADYBIT_AUTH_LDAP_MANAGER_DN`               |          | Username (DN) of the "manager" user identity is used to authenticate to an LDAP server. If omitted, anonymous access will be used. **Example:** `uid=admin,ou=system`             |
| `STEADYBIT_AUTH_LDAP_MANAGER_PASSWORD`         |          | The password for the manager DN. This is required if the manager-dn is specified.                                                                                                 |
| `STEADYBIT_AUTH_LDAP_USER_SEARCH_BASE`         |          | <p>the base DN for searching users in the LDAP directory</p>                                                                                                                      |
| `STEADYBIT_AUTH_LDAP_USER_SEARCH_FILTER`       |          | <p>the filter for searching users in the LDAP directory <br> <strong>Default:</strong> <code>(&(objectClass=inetOrgPerson)(uid={0}))</code></p>                                   |
| `STEADYBIT_AUTH_LDAP_METHOD`                   |          | <p>The method to authenticate the user. Either <code>bind</code> or <code>password-compare</code>.<br><strong>Default:</strong> <code>bind</code></p>                             |
| `STEADYBIT_AUTH_LDAP_USERNAME_ATTRIBUTE`       |          | <p>Name of the attribute that contains the username<br><strong>Default:</strong> <code>uid</code></p>                                                                             |
| `STEADYBIT_AUTH_LDAP_PASSWORD_ATTRIBUTE`       |          | <p>Name of the attribute that contains the user password, used if using <code>password-compare</code><br><strong>Default:</strong> <code>userPassword</code></p>                  |
| `STEADYBIT_AUTH_LDAP_SYNC_ADMIN_GROUP_DN`      | yes      | <p>The DN for the groupOfNames/groupOfUniqueNames for the <code>Admin</code> users<br><strong>Example:</strong> <code>cn=steadybit_admin,ou=groups,dc=steadybit,dc=com</code></p> |
| `STEADYBIT_AUTH_LDAP_SYNC_USER_GROUP_DN`       | yes      | <p>The DN for the groupOfNames/groupOfUniqueNames for the <code>User</code> users<br><strong>Example:</strong> <code>cn=steadybit_user,ou=groups,dc=steadybit,dc=com</code></p>   |
| `STEADYBIT_AUTH_LDAP_SYNC_TEAM_SEARCH_FILTER`  |          | <p>The filter for the groupOfNames/groupOfUniqueNames for the teams<br><strong>Example:</strong> <code>ou=teams,ou=groups,dc=steadybit,dc=com</code></p>                          |
| `STEADYBIT_AUTH_LDAP_SYNC_TEAM_KEY_ATTRIBUTE`  |          | <p>The name of the LDAP attribute to use as Team key<br><strong>Example:</strong> <code>cn</code></p>                                                                             |
| `STEADYBIT_AUTH_LDAP_SYNC_TEAM_NAME_ATTRIBUTE` |          | <p>The name of the LDAP attribute to use as Team name<br><strong>Example:</strong> <code>description</code></p>                                                                   |
| `STEADYBIT_AUTH_LDAP_SYNC_CRON`                |          | <p>Cron Expression which defines the periods for the LDAP synchronization<br><strong>Default:</strong> <code>0 0 &#42;/2 ? * * *</code> (every two hours)</p>                     |

### OpenID Connect Authentication

You can use OpenID Connect compatible authentication provider for [authentication and synchronization](oidc-integration.md).

| Environment Variable                                    | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|---------------------------------------------------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `STEADYBIT_AUTH_PROVIDER`                               | yes      | <p>Use <code>OAUTH2</code> for OIDC-Authentication<br><strong>Example:</strong> <code>OAUTH2</code></p>                                                                                                                                                                                                                                                                                                                                                    |
| `STEADYBIT_AUTH_OAUTH2_ISSUER_URI`                      | yes      | <p>URI for the OpenID Connect discovery endpoint<br><strong>Example:</strong> <code>https://keycloak/auth/realms/demo</code></p>                                                                                                                                                                                                                                                                                                                           |
| `STEADYBIT_AUTH_OAUTH2_CLIENT_ID`                       | yes      | <p>The client ID to use for the OIDC registration<br><strong>Example:</strong> <code>steadybit</code></p>                                                                                                                                                                                                                                                                                                                                                  |
| `STEADYBIT_AUTH_OAUTH2_CLIENT_SECRET`                   | yes      | <p>The client secret to use for the OIDC registration<br><strong>Example:</strong> <code>ijhdfpjdf80wiphubfqwd113342r</code></p>                                                                                                                                                                                                                                                                                                                           |
| `STEADYBIT_AUTH_OAUTH2_SCOPE`                           |          | <p>The OAUTH2 scope to use for the OIDC registration<br><strong>Default:</strong> <code>openid,profile,email</code></p>                                                                                                                                                                                                                                                                                                                                    |
| `STEADYBIT_AUTH_OAUTH2_USER_NAME_ATTRIBUTE`             |          | <p>Name of the OidcIdToken attribute that will be used to identify the user<br><strong>Default:</strong> <code>sub</code></p>                                                                                                                                                                                                                                                                                                                              |
| `STEADYBIT_AUTH_OAUTH2_FULL_NAME_ATTRIBUTE`             |          | <p>Name of the OidcIdToken attribute that will be used to pick the full name of the user<br><strong>Default:</strong> <code>name</code></p>                                                                                                                                                                                                                                                                                                                |
| `STEADYBIT_AUTH_OAUTH2_CLAIMS_TEAM_NAME_ATTRIBUTE_NAME` |          | <p>Name of the OidcIdToken claims attribute that will be used to pick up the assigned team names from. Steadybit automatically creates the specified teams in the platform and assigns the user to them.<br><strong>Default:</strong> <code>groups</code><br><strong>Example value in OIDC provider for single team:</strong> <code>team1</code><br><strong>Example value in OIDC provider for multiple teams:</strong> <code>["team1","team2"]</code></p> |
| `STEADYBIT_AUTH_OAUTH2_HOSTED_DOMAIN`                   |          | <p>Restrict the login to users with a specific email domain. If set, only users with an email address from this domain will be allowed to log in. Can be used with Google Workspace OIDC. <br><strong>Example:</strong> <code>example.com</code></p>                                                                                                                                                                                                       |

### Using SSL/TLS Encryption

SSL can be configured by setting the various `SERVER_SSL_*` properties and requires a java keystore (typically PKCS12).

| Environment Variable            | Required | Description                                                                                                                                                                                    |
|---------------------------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `SERVER_PORT`                   |          | <p>Port to use<br><strong>Default:</strong> <code>8080</code></p>                                                                                                                              |
| `SERVER_SSL_KEY_STORE`          |          | <p>Path to the key store that holds the SSL certificate (typically a <code>.jks</code> or <code>.p12</code> file).<br><strong>Example:</strong> <code>file:/keystores/steadybit.p12</code></p> |
| `SERVER_SSL_KEY_STORE_TYPE`     |          | <p>Type of the keystore<br><strong>Example:</strong> <code>PKCS12</code></p>                                                                                                                   |
| `SERVER_SSL_KEY_STORE_PASSWORD` |          | Password used to access the key store                                                                                                                                                          |
| `SERVER_SSL_KEY_ALIAS`          |          | Alias that identifies the key in the keystore to be used                                                                                                                                       |
| `SERVER_SSL_KEY_PASSWORD`       |          | Password used to access the key in the key store.                                                                                                                                              |

### Audit-Log Export

Audit logs can be exported to an AWS S3 Bucket.

| Environment Variable                       | Required | Description                                                               |
|--------------------------------------------|----------|---------------------------------------------------------------------------|
| `STEADYBIT_AUDITLOG_EXPORT_CRON`           |          | <p>Cron Expression which defines the periods for the audit log export</p> |
| `STEADYBIT_AUDITLOG_EXPORT_S3_BUCKET_NAME` |          | <p>AWS S3 Bucket Name</p>                                                 |
| `STEADYBIT_AUDITLOG_EXPORT_SUBFOLDER`      |          | <p>Subfolder in the S3 Bucket</p>                                         |
| `STEADYBIT_AUDITLOG_EXPORT_REGION`         |          | <p>AWS Region</p>                                                         |

### Advanced Agent Authentication

OpenID Connect can be used to [authenticate the agents to the platform](advanced-agent-authentication.md).

| Environment Variable                     | Required | Description                                                                                            |
|------------------------------------------|----------|--------------------------------------------------------------------------------------------------------|
| `STEADYBIT_AUTH_AGENT_PROVIDER`          |          | <p>Set to <code>OAUTH2</code> to use the OIDC.<br><strong>Default:</strong> <code>AGENT_KEY</code></p> |
| `STEADYBIT_AUTH_AGENT_OAUTH2_ISSUER_URI` | yes      | The issuer URI of your identity provider                                                               |

### Proxy Settings

Steadybit will use these proxy settings if the platform needs to connect to other services (for example, your OIDC
identity provider).

| Environment Variable       | Required | Description                                                                  |
|----------------------------|----------|------------------------------------------------------------------------------|
| `STEADYBIT_PROXY_HOST`     |          | Hostname of your proxy                                                       |
| `STEADYBIT_PROXY_PORT`     |          | Port of your proxy                                                           |
| `STEADYBIT_PROXY_PROTOCOL` |          | <p>Protocol of your proxy<br><strong>Default:</strong> <code>http</code></p> |
| `STEADYBIT_PROXY_USER`     |          | Username of your proxy                                                       |
| `STEADYBIT_PROXY_PASSWORD` |          | Password of your proxy                                                       |

### Experiment Execution

| Environment Variable                                            | Description                                                                                                             |
|-----------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| `STEADYBIT_EXPERIMENT_EXECUTION_PARALLEL_EXECUTION_CHECK_SCOPE` | Steadybit will show a warning if experiments are running for the same `TENANT` (default), `TEAM`, or `ENVIRONMENT`      |
| `STEADYBIT_EXPERIMENT_EXECUTION_MAXIMUM_DURATION`               | The maximum total duration of an experiment. Default is `12h`                                                           |
| `STEADYBIT_EXPERIMENT_EXECUTION_EXPERIMENT_TIMEOUT`             | The time after which the experiment execution should time out after the estimated duration is reached. Default is `15m` |
| `STEADYBIT_EXPERIMENT_EXECUTION_PREPARATION_TIMEOUT`            | The time after which the experiment execution should time out if not all agents are prepared. Default is `60s`          |
| `STEADYBIT_EXPERIMENT_EXECUTION_STEP_START_TIMEOUT`             | The time after which an experiment step should time out if not started after triggering. Default is `180s`              |

### Data Retention Settings

All retention settings are defined via

- `STEADYBIT_X_RETENTION_PERIOD` a duration string, sequence of decimal numbers, and a unit suffix,
  see [Spring conversion expressions](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties.conversion.durations).
- `STEADYBIT_X_RETENTION_CRON` cron string for Quartz

Note that `X` links to a specific domain, see below (e.g., targets stats via `TARGETS_STATS`).

| Environment Variable                                                 | Description                                                                                                                      | Database Table                  | Default Value                              |
|----------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|---------------------------------|--------------------------------------------|
| `STEADYBIT_EXTERNAL_VENDOR_AMPLITUDE_LOCAL_STORAGE_RETENTION_PERIOD` | Maximum age of Amplitude analytics events.<br/>Only applicable if Amplitude is enabled and the `mode` is set to `LOCAL_STORAGE`. | `amplitude_local_event`         | `365d`                                     |
| `STEADYBIT_EXTERNAL_VENDOR_AMPLITUDE_LOCAL_STORAGE_RETENTION_CRON`   | Cron String for the cleanup job of Amplitude analytics events.                                                                   | `amplitude_local_event`         | `0 15 5 1/1 * ? *`<br/>(every day at 5:15) |
| `STEADYBIT_AUDITLOG_RETENTION_PERIOD`                                | Maximum age of audit logs.                                                                                                       | `audit_log`                     | `90d`                                      |
| `STEADYBIT_AUDITLOG_RETENTION_CRON`                                  | Cron String for the cleanup job of audit logs.                                                                                   | `audit_log`                     | `0 20 5 1/1 * ? *`<br/>(every day at 5:20) |
| `STEADYBIT_EXPERIMENT_EXECUTION_ARTIFACT_RETENTION_PERIOD`           | Maximum age of experiment execution artifacts.                                                                                   | `execution_artifact`            | Keep until the execution is deleted        |
| `STEADYBIT_EXPERIMENT_EXECUTION_ARTIFACT_RETENTION_CRON`             | Cron String for the cleanup job of experiment execution artifacts.                                                               | `execution_artifact`            |                                            |
| `STEADYBIT_EXPERIMENT_EXECUTION_LOG_RETENTION_PERIOD`                | Maximum age of experiment execution logs.                                                                                        | `execution_log_event`           | Keep until the execution is deleted        |
| `STEADYBIT_EXPERIMENT_EXECUTION_LOG_RETENTION_CRON`                  | Cron String for the cleanup job of experiment execution logs.                                                                    | `execution_log_event`           |                                            |
| `STEADYBIT_EXPERIMENT_EXECUTION_METRIC_RETENTION_PERIOD`             | Maximum age of experiment execution metrics.                                                                                     | `execution_metric_event`        | Keep until the execution is deleted        |
| `STEADYBIT_EXPERIMENT_EXECUTION_METRIC_RETENTION_CRON`               | Cron String for the cleanup job of experiment execution metrics.                                                                 | `execution_metric_event`        |                                            |
| `STEADYBIT_EXPERIMENT_EXECUTION_SPAN_RETENTION_PERIOD`               | Maximum age of experiment execution spans.                                                                                       | `execution_spans`               | `28d`                                      |
| `STEADYBIT_EXPERIMENT_EXECUTION_SPAN_RETENTION_CRON`                 | Cron String for the cleanup job of experiment execution spans.                                                                   | `execution_spans`               | `0 25 5 1/1 * ? *`<br/>(every day at 5:25) |
| `STEADYBIT_EXPERIMENT_EXECUTION_RETENTION_PERIOD`                    | Maximum age of experiment executions.                                                                                            | `experiment_execution` and more | No cleanup by default                      |
| `STEADYBIT_EXPERIMENT_EXECUTION_RETENTION_CRON`                      | Cron String for the cleanup job of experiment executions.                                                                        | `experiment_execution` and more |                                            |
| `STEADYBIT_METRIC_RETENTION_PERIOD`                                  | Maximum age of metrics.                                                                                                          | `metric`                        | `365d`                                     |
| `STEADYBIT_METRIC_RETENTION_CRON`                                    | Cron String for the cleanup job of metrics.                                                                                      | `metric`                        | `0 35 5 1/1 * ? *`<br/>(every day at 5:35) |
| `STEADYBIT_TARGETS_STATS_RETENTION_PERIOD`                           | Maximum age of target stats.                                                                                                     | `target_stats`                  | `7d`                                       |
| `STEADYBIT_TARGETS_STATS_RETENTION_CRON`                             | Cron String for the cleanup job of target stats.                                                                                 | `target_stats`                  | `0 30 5 1/1 * ? *`<br/>(every day at 5:30) |
| `STEADYBIT_STEADYBUDDY_RETENTION_CONVERSATIONS_PERIOD`               | Maximum age of [SteadyBuddy](#steadybuddy) conversations and their chat memory, state, and history.                              | `ai_conversation` and more      | `30d`                                      |
| `STEADYBIT_STEADYBUDDY_RETENTION_CONVERSATIONS_CRON`                 | Cron String for the cleanup job of SteadyBuddy conversations.                                                                    | `ai_conversation` and more      | `0 35 5 1/1 * ? *`<br/>(every day at 5:35) |
| `STEADYBIT_STEADYBUDDY_RETENTION_TRACES_PERIOD`                      | Maximum age of persisted SteadyBuddy LLM debug traces.                                                                           | `ai_trace`                      | `7d`                                       |
| `STEADYBIT_STEADYBUDDY_RETENTION_TRACES_CRON`                        | Cron String for the cleanup job of SteadyBuddy traces.                                                                           | `ai_trace`                      | `0 40 5 1/1 * ? *`<br/>(every day at 5:40) |

### SteadyBuddy

[SteadyBuddy](../../use-steadybit/steadybuddy/README.md) is Steadybit's AI-powered assistant for designing, running, and analyzing experiments via natural language.
On-prem, it is **disabled until you configure a model provider** and requires the AI capability to be part of your license.

#### Core Settings

| Environment Variable                    | Required | Description                                                                                                                                                                                                                                                                                                                                                                              | Default Value      |
|-----------------------------------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------|
| `STEADYBIT_STEADYBUDDY_PROVIDER`        | yes      | Enables SteadyBuddy and selects the model provider. See [AI Provider Settings](#ai-provider-settings) for available options. When unset, the entire AI feature is disabled.                                                                                                                                                                                                              | none — AI disabled |
| `STEADYBIT_STEADYBUDDY_REQUEST_TIMEOUT` |          | Per-request timeout for LLM calls.                                                                                                                                                                                                                                                                                                                                                       | <code>120s</code>  |
| `STEADYBIT_STEADYBUDDY_TRACING_ENABLED` |          | When <code>true</code>, every chat turn and suggestion records a debug trace in the database. The trace exposes the full assembled context (system prompt, action catalog, environments). For support requests, the Steadybit team may ask you to share the trace to improve the provided answers. See [Data Retention Settings](#data-retention-settings) for how long traces are kept. | <code>false</code> |

#### AI Provider Settings

##### Amazon Bedrock

| Environment Variable                               | Required | Description                                        | Default                                                  |
|----------------------------------------------------|----------|----------------------------------------------------|----------------------------------------------------------|
| `STEADYBIT_STEADYBUDDY_PROVIDER`                   | yes      | Set to <code>BEDROCK</code> to use Amazon Bedrock. | none — AI disabled                                       |
| `STEADYBIT_STEADYBUDDY_BEDROCK_REGION`             |          | AWS region for Bedrock.                            | <code>eu-central-1</code>                                |
| `STEADYBIT_STEADYBUDDY_BEDROCK_REGULAR_MODEL_NAME` |          | Inference profile id for the capable model.        | <code>eu.anthropic.claude-sonnet-4-6</code>              |
| `STEADYBIT_STEADYBUDDY_BEDROCK_REGULAR_MAX_TOKENS` |          | Max output tokens for the capable model.           | <code>4096</code>                                        |
| `STEADYBIT_STEADYBUDDY_BEDROCK_CHEAP_MODEL_NAME`   |          | Inference profile id for the classifier model.     | <code>eu.anthropic.claude-haiku-4-5-20251001-v1:0</code> |
| `STEADYBIT_STEADYBUDDY_BEDROCK_CHEAP_MAX_TOKENS`   |          | Max output tokens for the classifier model.        | <code>1024</code>                                        |

##### Ollama


| Environment Variable                      | Required | Description                               | Default                             |
|-------------------------------------------|----------|-------------------------------------------|-------------------------------------|
| `STEADYBIT_STEADYBUDDY_PROVIDER`          | yes      | Set to <code>OLLAMA</code> to use Ollama. | none — AI disabled                  |
| `STEADYBIT_STEADYBUDDY_OLLAMA_BASE_URL`   |          | Base URL of the Ollama server.            | <code>http://localhost:11434</code> |
| `STEADYBIT_STEADYBUDDY_OLLAMA_MODEL_NAME` |          | Model name to use.                        | <code>qwen3.6</code>                |

##### Anthropic

| Environment Variable                                 | Required | Description                                               | Default                        |
|------------------------------------------------------|----------|-----------------------------------------------------------|--------------------------------|
| `STEADYBIT_STEADYBUDDY_PROVIDER`                     | yes      | Set to <code>ANTHROPIC</code> to use Anthropic.           | none — AI disabled             |
| `STEADYBIT_STEADYBUDDY_ANTHROPIC_API_KEY`            | yes      | API key for Anthropic. Treat it as sensitive information. | —                              |
| `STEADYBIT_STEADYBUDDY_ANTHROPIC_REGULAR_MODEL_NAME` |          | Capable model.                                            | <code>claude-sonnet-4-6</code> |
| `STEADYBIT_STEADYBUDDY_ANTHROPIC_REGULAR_MAX_TOKENS` |          | Max output tokens for the capable model.                  | <code>8192</code>              |
| `STEADYBIT_STEADYBUDDY_ANTHROPIC_CHEAP_MODEL_NAME`   |          | Classifier model.                                         | <code>claude-haiku-4-5</code>  |
| `STEADYBIT_STEADYBUDDY_ANTHROPIC_CHEAP_MAX_TOKENS`   |          | Max output tokens for the classifier model.               | <code>1024</code>              |

##### OpenAI

| Environment Variable                              | Required | Description                                            | Default                   |
|---------------------------------------------------|----------|--------------------------------------------------------|---------------------------|
| `STEADYBIT_STEADYBUDDY_PROVIDER`                  | yes      | Set to <code>OPENAI</code> to use OpenAI.              | none — AI disabled        |
| `STEADYBIT_STEADYBUDDY_OPENAI_API_KEY`            | yes      | API key for OpenAI. Treat it as sensitive information. | —                         |
| `STEADYBIT_STEADYBUDDY_OPENAI_REGULAR_MODEL_NAME` |          | Capable model.                                         | <code>gpt-5.4</code>      |
| `STEADYBIT_STEADYBUDDY_OPENAI_REGULAR_MAX_TOKENS` |          | Max output tokens for the capable model.               | <code>4096</code>         |
| `STEADYBIT_STEADYBUDDY_OPENAI_CHEAP_MODEL_NAME`   |          | Classifier model.                                      | <code>gpt-5.4-mini</code> |
| `STEADYBIT_STEADYBUDDY_OPENAI_CHEAP_MAX_TOKENS`   |          | Max output tokens for the classifier model.            | <code>1024</code>         |

### Endpoint Rate Limits

Rate limits protect the UI, API, and Agent endpoints of the Steadybit platform. They can be enabled or disabled by setting the environment variable 
`steadybit.ratelimit.enabled` to `true` or `false`.

Rate limits restrict the number of processable requests in a given timeframe. Every request reduces this capacity and will fail if none is left. After a given
time, the capacity is refilled, and requests can be processed again.

All rate limits apply to the associated tenant, whereas some endpoints are additionally restricted by a qualifier, specifying the user or agent issuing the request.

| Name               | Description                                                                      | Tenant <br/>(capacity,refill token, refill rate) | Qualifier <br/>(capacity,refill token, refill rate) |
|--------------------|----------------------------------------------------------------------------------|--------------------------------------------------|-----------------------------------------------------|
| API General        | All API requests not mentioned below                                             | 100/100/60s                                      | -                                                   |
| API Experiment     | Experiment execution endpoints                                                   | 10/10/60s                                        | -                                                   |
| API Security       | Killswitch, cancel experiment, remove schedule, remove team member, delete token | unlimited                                        | -                                                   |
| UI General         | All UI requests not mentioned below                                              | 1000/1000/1s tenant, <br/> 500 user              | 500/100/10s                                         |
| UI Security        | Killswitch, cancel experiment, remove schedule, remove team member, delete token | unlimited                                        | -                                                   |
| Agent Registration | Agent registration requests                                                      | 200/200/10s                                      | -                                                   |
| Agent Definition   | Extension metadata like target types, attributes, enrichment rules or advices    | 200/200/10s                                      | 10/10/10s                                           |                                                               | 
| Agent Experiment   | Experiment execution and metadata like metrics, logs, spans                      | 1000/1000/1s                                     | 100/100/10s                                         | 
| Agent Target       | Submitted targets <br/> (based on target count, and not request count)           | 100000/30000/5s                                  | 75000/7500/5s                                       |                  

Environment variables can override the predefined defaults to define stricter or more relaxed restrictions.

`name` has to be replaced by the rate limit name in environment variable format (all uppercase, separated by underscore). `capacity` states the initial
capacity, `refill-tokens` the amount that should be refilled every `refill-period` in unit `refill-unit`. Furthermore, the tenant and qualifier (user or agent)
restrictions can be overridden separately.

```bash
steadybit.ratelimit.configurations.<name>.perTenant.capacity=<number>
steadybit.ratelimit.configurations.<name>.perTenant.refill-tokens=<number>
steadybit.ratelimit.configurations.<name>.perTenant.refill-period=<number>
steadybit.ratelimit.configurations.<name>.perTenant.refill-unit=<time-unit, ms,s,m,h,d>
steadybit.ratelimit.configurations.<name>.perQualifier.capacity=<number>
steadybit.ratelimit.configurations.<name>.perQualifier.refill-tokens=<number>
steadybit.ratelimit.configurations.<name>.perQualifier.refill-period=<number>
steadybit.ratelimit.configurations.<name>.perQualifier.refill-unit=<time-unit, ms,s,m,h,d>
```

For example, changing the general UI rate limit would look like this:

```bash
steadybit.ratelimit.configurations.UI_GENERAL.perTenant.capacity=10000
steadybit.ratelimit.configurations.UI_GENERAL.perTenant.refill-tokens=1000
steadybit.ratelimit.configurations.UI_GENERAL.perTenant.refill-period=5
steadybit.ratelimit.configurations.UI_GENERAL.perTenant.refill-unit=s
```

#### Rate Limit Metrics

The Steadybit Platform provides the following rate limit metrics:

| Metric                       | Labels                                                                                                                            | Value                      |
|------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|----------------------------|
| `ratelimit_tokens_available` | `tenantKey`, `bucketName` (as described above), `qualifier` (username or agent id)                                                | Number of available tokens |
| `ratelimit_tokens_total`     | `tenantKey`, `bucketName` (as described above), `qualifier` (username or agent id), `status` (`consumed`, `rejected` or `failed`) | Number of requested tokens |


#### Hub Connections

The platform can connect to multiple hubs.

| Environment Variable            | Description                                                                                                                       | Default |
|---------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|---------|
| `STEADYBIT_HUBS_MAX_HUBS_COUNT` | Maximum number of hubs to connect to.                                                                                             | 5       |
