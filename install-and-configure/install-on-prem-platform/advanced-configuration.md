---
title: Advanced Platform Configuration
navTitle: Advanced Configuration
---

# Configuration Options

{% hint style="info" %}
This part of the documentation is only intended in the context of a supported PoC (Proof of Concept) together with the
Steadybit team. Please, [book an appointment](https://www.steadybit.com/book-demo) to scope your PoC before continuing
to evaluate the on-prem solution.

If you just want to try out Steadybit, we recommend you [sign up for our SaaS platform](https://signup.steadybit.com).
{% endhint %}

### Machine Requirements

The machine you are installing Steadybit onto, must have **at least** 4 CPUs and 8 GB available memory.

| Environment Variable     | Required | Description                                                                                                        |
|--------------------------|----------|--------------------------------------------------------------------------------------------------------------------|
| `JVM_MAX_RAM_PERCENTAGE` |          | <p>Define the <code>MaxRAMPercentage</code> of the platform JVM<br><strong>Default:</strong> <code>75.0</code></p> |

### Debug Docker Images

The platform docker image doesn't contain any shell by default. In case you need to exec into the container using a
shell for debugging purposes, we provide an additional debug variant whith the `platform-debug` tag.

### Database Configuration

Steadybit requires a PostgresSQL 15 database.

| Environment Variable         | Required | Description                                                                                                                       |
|------------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------|
| `SPRING_DATASOURCE_URL`      | yes      | <p>JDBC Url for the database connection<br><strong>Example:</strong> <code>jdbc:postgresql://postgres:5432/steadybitdb</code></p> |
| `SPRING_DATASOURCE_USERNAME` | yes      | <p>Database Username<br><strong>Example:</strong> <code>postgres</code></p>                                                       |
| `SPRING_DATASOURCE_PASSWORD` | yes      | <p>Database Password<br><strong>Example:</strong> <code>postgres</code></p>                                                       |
| `STEADYBIT_DB_WEB_ENABLED`   |          | <p>Enable Http Endpoint for Database export<br><strong>Default:</strong> <code>true</code></p>                                    |

#### RDS Machine Requirements

The workload is bound by the database CPU on peaks.

If you have ~100k targets simultaneously in the platform, we recommend a burstable instance with four vCPU (e.g., db.t4g.xlarge). Regarding disk size, 20 GB
should be enough capacity for the start (as extending on AWS should not be a problem).

If you choose a smaller instance for cost savings, the target ingestion will be slower, so it will take a bit longer until the target data in the platform is
consistent.

### Message Broker Configuration

For running the platform with multiple instances, a Redis message broker is required.

| Environment Variable                                                                | Required | Description                                                                          |
|-------------------------------------------------------------------------------------|----------|--------------------------------------------------------------------------------------|
| `SPRING_REDIS_HOST`                                                                 | yes      | <p>Redis server host<br><strong>Example:</strong> <code>redis</code></p>             |
| `SPRING_REDIS_PORT`                                                                 |          | <p>Redis server port<br><strong>Default:</strong> <code>6379</code></p>              |
| `SPRING_REDIS_USERNAME`                                                             |          | Redis Username                                                                       |
| `SPRING_REDIS_PASSWORD`                                                             |          | Redis Password                                                                       |
| platform <= 1.0.96 `SPRING_REDIS_SSL`, platform > 1.0.96 `SPRING_REDIS_SSL_ENABLED` |          | <p>Wether to enable ssl support.<br><strong>Default:</strong> <code>false</code></p> |
| `SPRING_REDIS_CLIENT_NAME`                                                          |          | Client name to be set on connections with CLIENT SETNAME.                            |

### Tenant Configuration

| Environment Variable        | Required | Description                                                                                                                                    |
|-----------------------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------|
| `STEADYBIT_TENANT_AGENTKEY` | yes      | <p>Agent key for the tenant assigned to you. Treat it as sensitive information.<br><strong>Example:</strong> <code>foobar</code></p>           |
| `STEADYBIT_TENANT_LICENSE`  | yes      | <p>License key for the tenant assigned to you. Treat it as sensitive information.<br><strong>Example:</strong> <code>secret-license</code></p> |

### Web Configuration

| Environment Variable                   | Required | Description                                                                                                                                                                                     |
|----------------------------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `STEADYBIT_WEB_PUBLIC_URL`             |          | URL to point to your Steadybit installation. Use this if your platform is running behind a reverse proxy doing path rewriting. Also it is used for the links in notifications.                  |
| `STEADYBIT_WEB_PUBLIC_EXPERIMENT_PORT` |          | By default the Websocket connections are advertised to the agents on port 7878. If the public port differs (e.g. because of a proxy) use this property to advertise a different port.           |
| `STEADYBIT_WEB_PUBLIC_EXPERIMENT_URL`  |          | By default the Websocket connections are advertised on the same url name as the agents registers to. If you run a separate loadbalancer for the websockets you can override the advertised url. |

### Log Configuration

| Environment Variable | Required | Description                                                                                        |
|----------------------|----------|----------------------------------------------------------------------------------------------------|
| `LOGGING_FORMAT`     |          | By default Steadybit uses `text` format. Set this this to `json` to switch the log format to JSON. |

### Static-Authentication

You can use a static username/password to authenticate as an admin user

| Environment Variable               | Required | Description                                                                                             |
|------------------------------------|----------|---------------------------------------------------------------------------------------------------------|
| `STEADYBIT_AUTH_PROVIDER`          | yes      | <p>Use <code>STATIC</code> for static authentication<br><strong>Example:</strong> <code>LDAP</code></p> |
| `STEADYBIT_AUTH_STATIC_0_USERNAME` | yes      | <p>Username<br><strong>Example:</strong> <code>admin</code></p>                                         |
| `STEADYBIT_AUTH_STATIC_0_PASSWORD` | yes      | <p>Password<br><strong>Example:</strong> <code>{noop}admin</code></p>                                   |

### LDAP-Authentication

You can use a LDAP Server for user authentication.

By default the ldap is accessed anonymously, unless `STEADYBIT_AUTH_LDAP_MANAGER_DN`
and `STEADYBIT_AUTH_LDAP_MANAGER_PASSWORD` is set. The users are authenticated by doing a bind with their credentials,
unless `STEADYBIT_AUTH_LDAP_METHOD` is set to `password-compare`.

| Environment Variable                           | Required | Description                                                                                                                                                                       |
|------------------------------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `STEADYBIT_AUTH_PROVIDER`                      | yes      | <p>Use <code>LDAP</code> for LDAP-Authentication<br><strong>Example:</strong> <code>LDAP</code></p>                                                                               |
| `STEADYBIT_AUTH_LDAP_URL`                      | yes      | <p>LDAP-Server URL<br><strong>Example:</strong> <code>ldap://openldap:389/dc=steadybit,dc=com</code></p>                                                                          |
| `STEADYBIT_AUTH_LDAP_MANAGER_DN`               |          | Username (DN) of the "manager" user identity is used to authenticate to a LDAP server. If omitted anonymous access will be used. **Example:** `uid=admin,ou=system`               |
| `STEADYBIT_AUTH_LDAP_MANAGER_PASSWORD`         |          | The password for the manager DN. This is required if the manager-dn is specified.                                                                                                 |
| `STEADYBIT_AUTH_LDAP_USER_DN_PATTERNS`         |          | <p>The search pattern to find the usernames<br><strong>Default:</strong> <code>uid={0},ou=people</code></p>                                                                       |
| `STEADYBIT_AUTH_LDAP_METHOD`                   |          | <p>The method to authenticate the user. Either <code>bind</code> or <code>password-compare</code>.<br><strong>Default:</strong> <code>bind</code></p>                             |
| `STEADYBIT_AUTH_LDAP_PASSWORD_ATTRIBUTE`       |          | <p>The attribute in the directory which contains the user password, used if using <code>password-compare</code><br><strong>Default:</strong> <code>userPassword</code></p>        |
| `STEADYBIT_AUTH_SYNC_ADMIN_GROUP_DN`           | yes      | <p>The DN for the groupOfNames/groupOfUniqueNames for the <code>Admin</code> users<br><strong>Example:</strong> <code>cn=steadybit_admin,ou=groups,dc=steadybit,dc=com</code></p> |
| `STEADYBIT_AUTH_SYNC_USER_GROUP_DN`            | yes      | <p>The DN for the groupOfNames/groupOfUniqueNames for the <code>User</code> users<br><strong>Example:</strong> <code>cn=steadybit_user,ou=groups,dc=steadybit,dc=com</code></p>   |
| `STEADYBIT_AUTH_LDAP_SYNC_TEAM_SEARCH_FILTER`  |          | <p>The filter for the groupOfNames/groupOfUniqueNames for the teams<br><strong>Example:</strong> <code>ou=teams,ou=groups,dc=steadybit,dc=com</code></p>                          |
| `STEADYBIT_AUTH_LDAP_SYNC_TEAM_KEY_ATTRIBUTE`  |          | <p>The attribute to use as Team key<br><strong>Example:</strong> <code>cn=steadybit_admin,ou=groups,dc=steadybit,dc=com</code></p>                                                |
| `STEADYBIT_AUTH_LDAP_SYNC_TEAM_NAME_ATTRIBUTE` |          | <p>The attribute to use as Team name<br><strong>Example:</strong> <code>cn=steadybit_admin,ou=groups,dc=steadybit,dc=com</code></p>                                               |
| `STEADYBIT_AUTH_SYNC_CRON`                     |          | <p>Cron Expression which defines the periods for the LDAP synchronization<br><strong>Default:</strong> <code>0 0 _/2 ? _ * *</code></p>                                           |

### OpenID-Connect Authentication

You can use an OpenID Connect (OIDC) compatible authentication provider for user authentication.


| Config        | Value                                      |
|---------------|--------------------------------------------|
| Grant type    | `authorization_code`                       |
| Redirect uri  | `https://<host>/oauth2/login/code/default` |
| Login url     | `https://<host>/login`                     |
| Response type | `code`                                     |


> The first user to login will be assigned the `ADMIN` role, all other will be assigned the `USER` role. The roles can
> be changed by an admin user via the UI.

Be aware to configure your ingress / loadbalancer to set the `X-Forwarded-Proto` and `x-forwarded-for` header. Otherwise the correct redirect URL will not be
generated.

| Environment Variable                                    | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|---------------------------------------------------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `STEADYBIT_AUTH_PROVIDER`                               | yes      | <p>Use <code>OAUTH2</code> for OIDC-Authentication<br><strong>Example:</strong> <code>OAUTH2</code></p>                                                                                                                                                                                                                                                                                                                                                    |
| `STEADYBIT_AUTH_OAUTH2_ISSUER_URI`                      | yes      | <p>URI for the OpenID Connect discovery endpoint.<br><strong>Example:</strong> <code>https://keycloak/auth/realms/demo</code></p>                                                                                                                                                                                                                                                                                                                          |
| `STEADYBIT_AUTH_OAUTH2_CLIENT_ID`                       | yes      | <p>The client ID to use for the OIDC registration<br><strong>Example:</strong> <code>steadybit</code></p>                                                                                                                                                                                                                                                                                                                                                  |
| `STEADYBIT_AUTH_OAUTH2_CLIENT_SECRET`                   | yes      | <p>The client secret to use for the OIDC registration<br><strong>Example:</strong> <code>ijhdfpjdf80wiphubfqwd113342r</code></p>                                                                                                                                                                                                                                                                                                                           |
| `STEADYBIT_AUTH_OAUTH2_SCOPE`                           |          | <p>The OAUTH2 scope to use for the OIDC registration<br><strong>Default:</strong> <code>openid,profile,email</code></p>                                                                                                                                                                                                                                                                                                                                    |
| `STEADYBIT_AUTH_OAUTH2_USER_NAME_ATTRIBUTE`             |          | <p>Name of the OidcIdToken attribute that will be used to identify the user<br><strong>Default:</strong> <code>sub</code></p>                                                                                                                                                                                                                                                                                                                              |
| `STEADYBIT_AUTH_OAUTH2_FULL_NAME_ATTRIBUTE`             |          | <p>Name of the OidcIdToken attribute that will be used to pick the full name of the user<br><strong>Default:</strong> <code>name</code></p>                                                                                                                                                                                                                                                                                                                |
| `STEADYBIT_AUTH_OAUTH2_CLAIMS_TEAM_NAME_ATTRIBUTE_NAME` |          | <p>Name of the OidcIdToken claims attribute that will be used to pick up the assigned team names from. Steadybit automatically creates the specified teams in the platform and assigns the user to them.<br><strong>Default:</strong> <code>groups</code><br><strong>Example value in OIDC provider for single team:</strong> <code>team1</code><br><strong>Example value in OIDC provider for multiple teams:</strong> <code>["team1","team2"]</code></p> |
| `STEADYBIT_AUTH_OAUTH2_HOSTED_DOMAIN`                   |          | <p>Restrict the login to users with a specific email domain. If set, only users with an email address from this domain will be allowed to login. Can be used with Google Workspace OIDC. <br><strong>Example:</strong> <code>example.com</code></p>                                                                                                                                                                                                        |

### Syncing Teams via OIDC Attribute

see [Syncing Teams via OIDC Attribute](syncing-teams-via-oidc-attribute.md)

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

Audit logs can be exported to a AWS S3 Bucket

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

Steadybit will use these proxy settings if the platform needs to connect to other services (for example your OIDC
identity provider).

| Environment Variable       | Required | Description                                                                  |
|----------------------------|----------|------------------------------------------------------------------------------|
| `STEADYBIT_PROXY_HOST`     |          | Hostname of your proxy                                                       |
| `STEADYBIT_PROXY_PORT`     |          | Port of your proxy                                                           |
| `STEADYBIT_PROXY_PROTOCOL` |          | <p>Protocol of your proxy<br><strong>Default:</strong> <code>http</code></p> |
| `STEADYBIT_PROXY_USER`     |          | Username of your proxy                                                       |
| `STEADYBIT_PROXY_PASSWORD` |          | Password of your proxy                                                       |

### Experiment Execution

| Environment Variable                                            | Description                                                                                                              |
|-----------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| `STEADYBIT_EXPERIMENT_EXECUTION_PARALLEL_EXECUTION_CHECK_SCOPE` | Steadybit will show a warning, if there are experiments running for the same `TENANT` (default), `TEAM` or `ENVIRONMENT` |
| `STEADYBIT_EXPERIMENT_EXECUTION_MAXIMUM_DURATION`               | The maximum total duration of an experiment. Default is `12h`                                                            |
| `STEADYBIT_EXPERIMENT_EXECUTION_EXPERIMENT_TIMEOUT`             | The time after which the experiment execution should time out after the estimated duration is reached. Default is `15m`  |
| `STEADYBIT_EXPERIMENT_EXECUTION_PREPARATION_TIMEOUT`            | The time after which the experiment execution should time out if not all agents are prepared. Default is `60s`           |
| `STEADYBIT_EXPERIMENT_EXECUTION_STEP_START_TIMEOUT`             | The time after which an experiment step should time out if not started after triggering. Default is `180s`               |

### Data Retention Settings

All retention settings are defined via

- `STEADYBIT_X_RETENTION_PERIOD` a duration string, sequence of decimal numbers and a unit suffix,
  see [Spring conversion expressions](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties.conversion.durations).
- `STEADYBIT_X_RETENTION_CRON` cron string for Quartz

Note that `X` links to a specific domain, see below (e.g. targets stats via `TARGETS_STATS`).

| Environment Variable                                                 | Description                                                                                                                       | Database Table                  | Default Value                              |
|----------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|---------------------------------|--------------------------------------------|
| `STEADYBIT_EXTERNAL_VENDOR_AMPLITUDE_LOCAL_STORAGE_RETENTION_PERIOD` | Maximum age of Amplitude analytics events.<br/>Only applicable, if Amplitude is enabled and the `mode` is set to `LOCAL_STORAGE`. | `amplitude_local_event`         | `365d`                                     |
| `STEADYBIT_EXTERNAL_VENDOR_AMPLITUDE_LOCAL_STORAGE_RETENTION_CRON`   | Cron String for the cleanup job of Amplitude analytics events.                                                                    | `amplitude_local_event`         | `0 15 5 1/1 * ? *`<br/>(every day at 5:15) |
| `STEADYBIT_AUDITLOG_RETENTION_PERIOD`                                | Maximum age of audit logs.                                                                                                        | `audit_log`                     | `90d`                                      |
| `STEADYBIT_AUDITLOG_RETENTION_CRON`                                  | Cron String for the cleanup job of audit logs.                                                                                    | `audit_log`                     | `0 20 5 1/1 * ? *`<br/>(every day at 5:20) |
| `STEADYBIT_EXPERIMENT_EXECUTION_ARTIFACT_RETENTION_PERIOD`           | Maximum age of experiment execution artifacts.                                                                                    | `execution_artifact`            | Keep until the execution is deleted        |
| `STEADYBIT_EXPERIMENT_EXECUTION_ARTIFACT_RETENTION_CRON`             | Cron String for the cleanup job of experiment execution artifacts.                                                                | `execution_artifact`            |                                            |
| `STEADYBIT_EXPERIMENT_EXECUTION_LOG_RETENTION_PERIOD`                | Maximum age of experiment execution logs.                                                                                         | `execution_log_event`           | Keep until the execution is deleted        |
| `STEADYBIT_EXPERIMENT_EXECUTION_LOG_RETENTION_CRON`                  | Cron String for the cleanup job of experiment execution logs.                                                                     | `execution_log_event`           |                                            |
| `STEADYBIT_EXPERIMENT_EXECUTION_METRIC_RETENTION_PERIOD`             | Maximum age of experiment execution metrics.                                                                                      | `execution_metric_event`        | Keep until the execution is deleted        |
| `STEADYBIT_EXPERIMENT_EXECUTION_METRIC_RETENTION_CRON`               | Cron String for the cleanup job of experiment execution metrics.                                                                  | `execution_metric_event`        |                                            |
| `STEADYBIT_EXPERIMENT_EXECUTION_SPAN_RETENTION_PERIOD`               | Maximum age of experiment execution spans.                                                                                        | `execution_spans`               | `28d`                                      |
| `STEADYBIT_EXPERIMENT_EXECUTION_SPAN_RETENTION_CRON`                 | Cron String for the cleanup job of experiment execution spans.                                                                    | `execution_spans`               | `0 25 5 1/1 * ? *`<br/>(every day at 5:25) |
| `STEADYBIT_EXPERIMENT_EXECUTION_RETENTION_PERIOD`                    | Maximum age of experiment executions.                                                                                             | `experiment_execution` and more | No cleanup by default                      |
| `STEADYBIT_EXPERIMENT_EXECUTION_RETENTION_CRON`                      | Cron String for the cleanup job of experiment executions.                                                                         | `experiment_execution` and more |                                            |
| `STEADYBIT_METRIC_RETENTION_PERIOD`                                  | Maximum age of metrics.                                                                                                           | `metric`                        | `365d`                                     |
| `STEADYBIT_METRIC_RETENTION_CRON`                                    | Cron String for the cleanup job of metrics.                                                                                       | `metric`                        | `0 35 5 1/1 * ? *`<br/>(every day at 5:35) |
| `STEADYBIT_TARGETS_STATS_RETENTION_PERIOD`                           | Maximum age of target stats.                                                                                                      | `target_stats`                  | `7d`                                       |
| `STEADYBIT_TARGETS_STATS_RETENTION_CRON`                             | Cron String for the cleanup job of target stats.                                                                                  | `target_stats`                  | `0 30 5 1/1 * ? *`<br/>(every day at 5:30) |

### Endpoint Rate Limits

Rate limits protect the UI, API, and Agent endpoints of the Steadybit platform. They can be enabled or disabled by setting the environment variable 
`steadybit.ratelimit.enabled` to `true` or `false`, respectively.

Rate limits restrict the number of processable requests in a given timeframe. Every request reduces this capacity and will fail if none is left. After a given
time, the capacity is refilled, and requests can be processed again.

All rate limits apply to the associated tenant, whereas some endpoints are additionally restricted by a qualifier, specifying the user or agent issuing the
request.

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

To define stricter or more relaxed restrictions environment variables can override the predefined defaults.

`name` has to be replaced by the rate limit name in environment variable format (all uppercase, separated by underscore). `capacity` states the initial
capacity, `refill-tokens` the amount that should be refilled every `refill-period` in unit `refill-unit`. Furthermore, tenant and qualifier (user or agent)
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

| Metric                       | Labels                                                                                                                            | Value                     |
|------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|---------------------------|
| `ratelimit_tokens_available` | `tenantKey`, `bucketName` (as described above), `qualifier` (username or agent id)                                                | Number of available token |
| `ratelimit_tokens_total`     | `tenantKey`, `bucketName` (as described above), `qualifier` (username or agent id), `status` (`consumed`, `rejected` or `failed`) | Number of requested token |


#### Hub Connections

The platform can connect to multiple hubs.

| Environment Variable            | Description                                                                                                                       |
|---------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `STEADYBIT_HUBS_MAX_HUBS_COUNT` | Maximum number of hubs to connect to.                                                                                             |
