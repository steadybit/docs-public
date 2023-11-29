---
title: Advanced Platform Configuration
navTitle: Advanced Configuration
---

# Configuration Options

{% hint style="info" %}
This part of the documentation is only intended in the context of a supported PoC (Proof of Concept) together with the Steadybit team.
Please, [book an appointment](https://www.steadybit.com/book-demo) to scope your PoC before continuing to evaluate the on-prem solution.

If you just want to try out Steadybit, we recommend you [sign up for our SaaS platform](https://signup.steadybit.com).
{% endhint %}

### Machine Requirements

The machine you are installing steadybit onto, must have **at least** 4 CPUs and 8 GB available memory.

| Environment Variable     | Required | Description                                                                                                        |
| ------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `JVM_MAX_RAM_PERCENTAGE` |          | <p>Define the <code>MaxRAMPercentage</code> of the platform JVM<br><strong>Default:</strong> <code>75.0</code></p> |

### Debug Docker Images

The platform docker image doesn't contain any shell by default. In case you need to exec into the container using a shell for debugging purposes, we provide an additional debug variant whith the `platform-debug` tag.

### Database Configuration

Steadybit requires a PostgresSQL 13 database.

| Environment Variable         | Required | Description                                                                                                                       |
| ---------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `SPRING_DATASOURCE_URL`      | yes      | <p>JDBC Url for the database connection<br><strong>Example:</strong> <code>jdbc:postgresql://postgres:5432/steadybitdb</code></p> |
| `SPRING_DATASOURCE_USERNAME` | yes      | <p>Database Username<br><strong>Example:</strong> <code>postgres</code></p>                                                       |
| `SPRING_DATASOURCE_PASSWORD` | yes      | <p>Database Password<br><strong>Example:</strong> <code>postgres</code></p>                                                       |
| `STEADYBIT_DB_WEB_ENABLED`   |          | <p>Enable Http Endpoint for Database export<br><strong>Default:</strong> <code>true</code></p>                                    |

### Message Broker Configuration

For running the platform with multiple instances, a Redis message broker is required.

| Environment Variable                                                                | Required | Description                                                                          |
| ----------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------ |
| `SPRING_REDIS_HOST`                                                                 | yes      | <p>Redis server host<br><strong>Example:</strong> <code>redis</code></p>             |
| `SPRING_REDIS_PORT`                                                                 |          | <p>Redis server port<br><strong>Default:</strong> <code>6379</code></p>              |
| `SPRING_REDIS_USERNAME`                                                             |          | Redis Username                                                                       |
| `SPRING_REDIS_PASSWORD`                                                             |          | Redis Password                                                                       |
| platform <= 1.0.96 `SPRING_REDIS_SSL`, platform > 1.0.96 `SPRING_REDIS_SSL_ENABLED` |          | <p>Wether to enable ssl support.<br><strong>Default:</strong> <code>false</code></p> |
| `SPRING_REDIS_CLIENT_NAME`                                                          |          | Client name to be set on connections with CLIENT SETNAME.                            |

### Tenant Configuration

| Environment Variable        | Required | Description                                                                                                                          |
| --------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `STEADYBIT_TENANT_AGENTKEY` | yes      | <p>Agent key for the tenant assigned to you. Treat it as sensitive information.<br><strong>Example:</strong> <code>foobar</code></p> |

### Web Configuration

| Environment Variable                   | Required | Description                                                                                                                                                                                     |
| -------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `STEADYBIT_WEB_PUBLIC_URL`             |          | URL to point to your steadybit installation. Use this if your platform is running behind a reverse proxy doing path rewriting. Also it is used for the links in notifications.                  |
| `STEADYBIT_WEB_PUBLIC_EXPERIMENT_PORT` |          | By default the Websocket connections are advertised to the agents on port 7878. If the public port differs (e.g. because of a proxy) use this property to advertise a different port.           |
| `STEADYBIT_WEB_PUBLIC_EXPERIMENT_URL`  |          | By default the Websocket connections are advertised on the same url name as the agents registers to. If you run a separate loadbalancer for the websockets you can override the advertised url. |

### Log Configuration

| Environment Variable | Required | Description                                                                                        |
| -------------------- | -------- | -------------------------------------------------------------------------------------------------- |
| `LOGGING_FORMAT`     |          | By default steadybit uses `text` format. Set this this to `json` to switch the log format to JSON. |

### Static-Authentication

You can use a static username/password to authenticate as an admin user

| Environment Variable               | Required | Description                                                                                             |
| ---------------------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `STEADYBIT_AUTH_PROVIDER`          | yes      | <p>Use <code>STATIC</code> for static authentication<br><strong>Example:</strong> <code>LDAP</code></p> |
| `STEADYBIT_AUTH_STATIC_0_USERNAME` | yes      | <p>Username<br><strong>Example:</strong> <code>admin</code></p>                                         |
| `STEADYBIT_AUTH_STATIC_0_PASSWORD` | yes      | <p>Password<br><strong>Example:</strong> <code>{noop}admin</code></p>                                   |

### LDAP-Authentication

You can use a LDAP Server for user authentication.

By default the ldap is accessed anonymously, unless `STEADYBIT_AUTH_LDAP_MANAGER_DN` and `STEADYBIT_AUTH_LDAP_MANAGER_PASSWORD` is set. The users are authenticated by doing a bind with their credentials, unless `STEADYBIT_AUTH_LDAP_METHOD` is set to `password-compare`.

| Environment Variable                           | Required | Description                                                                                                                                                                       |
| ---------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
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
| `STEADYBIT_AUTH_SYNC_CRON`                     |          | <p>Cron Expression which defines the periods for the LDAP synchronization<br><strong>Default:</strong> <code>0 0 _/2 ? _ \* \*</code></p>                                         |

### OpenID-Connect Authentication

You can use an OpenID Connect compatible authentication provider for user authentication. Steadybit uses the `authorization_code` grant type.

> The first user to login will be assigned the `ADMIN` role, all other will be assigned the `USER` role. The roles can be changed by an admin user via the UI.

| Environment Variable                                    | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `STEADYBIT_AUTH_PROVIDER`                               | yes      | <p>Use <code>OAUTH2</code> for OIDC-Authentication<br><strong>Example:</strong> <code>OAUTH2</code></p>                                                                                                                                                                                                                                                                                                                                                    |
| `STEADYBIT_AUTH_OAUTH2_ISSUER_URI`                      | yes      | <p>URI for the OpenID Connect discovery endpoint.<br><strong>Example:</strong> <code>https://keycloak/auth/realms/demo</code></p>                                                                                                                                                                                                                                                                                                                          |
| `STEADYBIT_AUTH_OAUTH2_CLIENT_ID`                       | yes      | <p>The client ID to use for the OIDC registration<br><strong>Example:</strong> <code>steadybit</code></p>                                                                                                                                                                                                                                                                                                                                                  |
| `STEADYBIT_AUTH_OAUTH2_CLIENT_SECRET`                   | yes      | <p>The client secret to use for the OIDC registration<br><strong>Example:</strong> <code>ijhdfpjdf80wiphubfqwd113342r</code></p>                                                                                                                                                                                                                                                                                                                           |
| `STEADYBIT_AUTH_OAUTH2_SCOPE`                           |          | <p>The OAUTH2 scope to use for the OIDC registration<br><strong>Default:</strong> <code>openid,profile,email</code></p>                                                                                                                                                                                                                                                                                                                                    |
| `STEADYBIT_AUTH_OAUTH2_USER_NAME_ATTRIBUTE`             |          | <p>Name of the OidcIdToken attribute that will be used to identify the user<br><strong>Default:</strong> <code>sub</code></p>                                                                                                                                                                                                                                                                                                                              |
| `STEADYBIT_AUTH_OAUTH2_FULL_NAME_ATTRIBUTE`             |          | <p>Name of the OidcIdToken attribute that will be used to pick the full name of the user<br><strong>Default:</strong> <code>name</code></p>                                                                                                                                                                                                                                                                                                                |
| `STEADYBIT_AUTH_OAUTH2_CLAIMS_TEAM_NAME_ATTRIBUTE_NAME` |          | <p>Name of the OidcIdToken claims attribute that will be used to pick up the assigned team names from. steadybit automatically creates the specified teams in the platform and assigns the user to them.<br><strong>Default:</strong> <code>groups</code><br><strong>Example value in OIDC provider for single team:</strong> <code>team1</code><br><strong>Example value in OIDC provider for multiple teams:</strong> <code>["team1","team2"]</code></p> |

### Using SSL/TLS Encryption

SSL can be configured by setting the various `SERVER_SSL_*` properties and requires a java keystore (typically PKCS12).

| Environment Variable            | Required | Description                                                                                                                                                                                    |
| ------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SERVER_PORT`                   |          | <p>Port to use<br><strong>Default:</strong> <code>8080</code></p>                                                                                                                              |
| `SERVER_SSL_KEY_STORE`          |          | <p>Path to the key store that holds the SSL certificate (typically a <code>.jks</code> or <code>.p12</code> file).<br><strong>Example:</strong> <code>file:/keystores/steadybit.p12</code></p> |
| `SERVER_SSL_KEY_STORE_TYPE`     |          | <p>Type of the keystore<br><strong>Example:</strong> <code>PKCS12</code></p>                                                                                                                   |
| `SERVER_SSL_KEY_STORE_PASSWORD` |          | Password used to access the key store                                                                                                                                                          |
| `SERVER_SSL_KEY_ALIAS`          |          | Alias that identifies the key in the keystore to be used                                                                                                                                       |
| `SERVER_SSL_KEY_PASSWORD`       |          | Password used to access the key in the key store.                                                                                                                                              |

### Advanced Agent Authentication

OpenID Connect can be used to [authenticate the agents to the platform](advanced-agent-authentication.md).

| Environment Variable                     | Required | Description                                                                                            |
| ---------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| `STEADYBIT_AUTH_AGENT_PROVIDER`          |          | <p>Set to <code>OAUTH2</code> to use the OIDC.<br><strong>Default:</strong> <code>AGENT_KEY</code></p> |
| `STEADYBIT_AUTH_AGENT_OAUTH2_ISSUER_URI` | yes      | <p>The issuer URI of your identity provider</p>                                                        |

### Proxy Settings

Steadybit will use these proxy settings if the platform needs to connect to other services (for example your OIDC identity provider).

| Environment Variable       | Required | Description                                                                  |
| -------------------------- | -------- | ---------------------------------------------------------------------------- |
| `STEADYBIT_PROXY_HOST`     |          | <p>Hostname of your proxy</p>                                                |
| `STEADYBIT_PROXY_PORT`     |          | <p>Port of your proxy</p>                                                    |
| `STEADYBIT_PROXY_PROTOCOL` |          | <p>Protocol of your proxy<br><strong>Default:</strong> <code>http</code></p> |
| `STEADYBIT_PROXY_USER`     |          | <p>Username of your proxy</p>                                                |
| `STEADYBIT_PROXY_PASSWORD` |          | <p>Password of your proxy</p>                                                |
