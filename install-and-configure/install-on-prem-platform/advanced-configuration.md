---
title: "Advanced Platform Configuration"
navTitle: "Advanced Configuration"
---

## Machine Requirements (minimum)

The machine you are installing steadybit onto, must have 4 CPUs and 8 GB available memory.

## Debug Docker Images

The platform docker image doesn't contain any shell by default.
In case you need to exec into the container using a shell for debugging purposes, we provide an additional debug variant whith the `:<version>-debug` tag.

## Database Configuration

Steadybit requires a PostgresSQL 13 database.

| Environment Variable         | Required | Description                                                                                           |
|------------------------------|----------|-------------------------------------------------------------------------------------------------------|
| `SPRING_DATASOURCE_URL`      | yes      | JDBC Url for the database connection <br/> **Example:** `jdbc:postgresql://postgres:5432/steadybitdb` |
| `SPRING_DATASOURCE_USERNAME` | yes      | Database Username <br/> **Example:** `postgres`                                                       |
| `SPRING_DATASOURCE_PASSWORD` | yes      | Database Password <br/> **Example:** `postgres`                                                       |
| `STEADYBIT_DB_WEB_ENABLED`   |          | Enable Http Endpoint for Database export <br/> **Default:** `true`                                    |

## Message Broker Configuration

For running the platform with multiple instances, a Redis message broker is required.

| Environment Variable       | Required | Description                                               |
|----------------------------|----------|-----------------------------------------------------------|
| `SPRING_REDIS_HOST`        | yes      | Redis server host <br/> **Example:** `redis`              |
| `SPRING_REDIS_PORT`        |          | Redis server port <br/> **Default:** `6379`               |
| `SPRING_REDIS_USERNAME`    |          | Redis Username                                            |
| `SPRING_REDIS_PASSWORD`    |          | Redis Password                                            |
| `SPRING_REDIS_SSL`         |          | Wether to enable ssl support. <br/> **Default:** `false`  |
| `SPRING_REDIS_CLIENT_NAME` |          | Client name to be set on connections with CLIENT SETNAME. |

## Tenant Configuration

| Environment Variable        | Required | Description                                                                                              |
|-----------------------------|----------|----------------------------------------------------------------------------------------------------------|
| `STEADYBIT_TENANT_AGENTKEY` | yes      | Agent key for the tenant assigned to you. Treat it as sensitive information. <br/> **Example:** `foobar` |

## Web Configuration

| Environment Variable                   | Required | Description                                                                                                                                                                                     |
|----------------------------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `STEADYBIT_WEB_PUBLIC_URL`             |          | URL to point to your steadybit installation. Use this if you platform is running behind a reverse proxy doing path rewriting. Also it is used for the links in notifications.                   |
| `STEADYBIT_WEB_PUBLIC_EXPERIMENT_PORT` |          | By default the Websocket connections are advertised to the agents on port 7878. If the public port differs (e.g. because of a proxy) use this property to advertise a different port.           |
| `STEADYBIT_WEB_PUBLIC_EXPERIMENT_URL`  |          | By default the Websocket connections are advertised on the same url name as the agents registers to. If you run a separate loadbalancer for the websockets you can override the advertised url. |

## Log Configuration

| Environment Variable | Required | Description                                                                                        |
|----------------------|----------|----------------------------------------------------------------------------------------------------|
| `LOGGING_FORMAT`     |          | By default steadybit uses `text` format. Set this this to `json` to switch the log format to JSON. |

## Static-Authentication

You can use a static username/password to authenticate as an admin user

| Environment Variable               | Required | Description                                                      |
|------------------------------------|----------|------------------------------------------------------------------|
| `STEADYBIT_AUTH_PROVIDER`          | yes      | Use `STATIC` for static authentication <br/> **Example:** `LDAP` |
| `STEADYBIT_AUTH_STATIC_0_USERNAME` | yes      | Username <br/> **Example:** `admin`                              |
| `STEADYBIT_AUTH_STATIC_0_PASSWORD` | yes      | Password <br/> **Example:** `{noop}admin`                        |

## LDAP-Authentication

You can use a LDAP Server for user authentication.

By default the ldap is accessed anonymously, unless `STEADYBIT_AUTH_LDAP_MANAGER_DN` and `STEADYBIT_AUTH_LDAP_MANAGER_PASSWORD` is set.
The users are authenticated by doing a bind with their credentials, unless `STEADYBIT_AUTH_LDAP_METHOD` is set to `password-compare`.

| Environment Variable                           | Required | Description                                                                                                                                                         |
|------------------------------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `STEADYBIT_AUTH_PROVIDER`                      | yes      | Use `LDAP` for LDAP-Authentication <br/> **Example:** `LDAP`                                                                                                        |
| `STEADYBIT_AUTH_LDAP_URL`                      | yes      | LDAP-Server URL <br/> **Example:** `ldap://openldap:389/dc=steadybit,dc=com`                                                                                        |
| `STEADYBIT_AUTH_LDAP_MANAGER_DN`               |          | Username (DN) of the "manager" user identity is used to authenticate to a LDAP server. If omitted anonymous access will be used. **Example:** `uid=admin,ou=system` |
| `STEADYBIT_AUTH_LDAP_MANAGER_PASSWORD`         |          | The password for the manager DN. This is required if the manager-dn is specified.                                                                                   |
| `STEADYBIT_AUTH_LDAP_USER_DN_PATTERNS`         |          | The search pattern to find the usernames <br/> **Default:** `uid={0},ou=people`                                                                                     |
| `STEADYBIT_AUTH_LDAP_METHOD            `       |          | The method to authenticate the user. Either `bind` or `password-compare`. <br/> **Default:** `bind`                                                                 |
| `STEADYBIT_AUTH_LDAP_PASSWORD_ATTRIBUTE`       |          | The attribute in the directory which contains the user password, used if using `password-compare` <br/> **Default:** `userPassword`                                 |
| `STEADYBIT_AUTH_SYNC_ADMIN_GROUP_DN`           | yes      | The DN for the groupOfNames/groupOfUniqueNames for the `Admin` users <br/> **Example:** `cn=steadybit_admin,ou=groups,dc=steadybit,dc=com`                          |
| `STEADYBIT_AUTH_SYNC_USER_GROUP_DN`            | yes      | The DN for the groupOfNames/groupOfUniqueNames for the `User` users <br/> **Example:** `cn=steadybit_user,ou=groups,dc=steadybit,dc=com`                            |
| `STEADYBIT_AUTH_LDAP_SYNC_TEAM_SEARCH_FILTER`  |          | The filter for the groupOfNames/groupOfUniqueNames for the teams <br/> **Example:** `ou=teams,ou=groups,dc=steadybit,dc=com`                                        |
| `STEADYBIT_AUTH_LDAP_SYNC_TEAM_KEY_ATTRIBUTE`  |          | The attribute to use as Team key <br/> **Example:** `cn=steadybit_admin,ou=groups,dc=steadybit,dc=com`                                                              |
| `STEADYBIT_AUTH_LDAP_SYNC_TEAM_NAME_ATTRIBUTE` |          | The attribute to use as Team name <br/> **Example:** `cn=steadybit_admin,ou=groups,dc=steadybit,dc=com`                                                             |
| `STEADYBIT_AUTH_SYNC_CRON`                     |          | Cron Expression which defines the periods for the LDAP synchronization <br/> **Default:** `0 0 */2 ? * * *`                                                         |

## OpenID-Connect Authentication

You can use an OpenID Connect compatible authentication provider for user authentication. Steadybit uses the `authorization_code` grant type.

> The first user to login will be assigned the `ADMIN` role, all other will be assigned the `USER` role. The roles can be changed by an admin user via the UI.

| Environment Variable                                    | Required | Description                                                                                                                                                                                                                                                                                                                                                                          |
|---------------------------------------------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `STEADYBIT_AUTH_PROVIDER`                               | yes      | Use `OAUTH2` for OIDC-Authentication <br/> **Example:** `OAUTH2`                                                                                                                                                                                                                                                                                                                     |
| `STEADYBIT_AUTH_OAUTH2_ISSUER_URI`                      | yes      | URI for the OpenID Connect discovery endpoint. <br/> **Example:** `https://keycloak/auth/realms/demo`                                                                                                                                                                                                                                                                                |
| `STEADYBIT_AUTH_OAUTH2_CLIENT_ID`                       | yes      | The client ID to use for the OIDC registration <br/> **Example:** `steadybit`                                                                                                                                                                                                                                                                                                        |
| `STEADYBIT_AUTH_OAUTH2_CLIENT_SECRET`                   | yes      | The client secret to use for the OIDC registration <br/> **Example:** `ijhdfpjdf80wiphubfqwd113342r`                                                                                                                                                                                                                                                                                 |
| `STEADYBIT_AUTH_OAUTH2_USER_NAME_ATTRIBUTE`             |          | Name of the OidcIdToken attribute that will be used to identify the user <br/> **Default:** `sub`                                                                                                                                                                                                                                                                                    |
| `STEADYBIT_AUTH_OAUTH2_FULL_NAME_ATTRIBUTE`             |          | Name of the OidcIdToken attribute that will be used to pick the full name of the user <br/> **Default:** `name`                                                                                                                                                                                                                                                                      |
| `STEADYBIT_AUTH_OAUTH2_CLAIMS_TEAM_NAME_ATTRIBUTE_NAME` |          | Name of the OidcIdToken claims attribute that will be used to pick up the assigned team names from. steadybit automatically creates the specified teams in the platform and assigns the user to them.<br/> **Default:** `groups` <br/>  **Example value in OIDC provider for single team:** `team1` <br/> **Example value in OIDC provider for multiple teams:** `["team1","team2"]` |

## Using SSL/TLS Encryption

SSL can be configured by setting the various `SERVER_SSL_*` properties and requires a java keystore (typically PKCS12).

| Environment Variable            | Required | Description                                                                                                                                  |
|---------------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `SERVER_PORT`                   |          | Port to use <br/> **Default:** `8080`                                                                                                        |
| `SERVER_SSL_KEY_STORE`          |          | Path to the key store that holds the SSL certificate (typically a `.jks` or `.p12` file). <br/> **Example:** `file:/keystores/steadybit.p12` |
| `SERVER_SSL_KEY_STORE_TYPE`     |          | Type of the keystore  <br/> **Example:** `PKCS12`                                                                                            |
| `SERVER_SSL_KEY_STORE_PASSWORD` |          | Password used to access the key store                                                                                                        |
| `SERVER_SSL_KEY_ALIAS`          |          | Alias that identifies the key in the keystore to be used                                                                                     |
| `SERVER_SSL_KEY_PASSWORD`       |          | Password used to access the key in the key store.                                                                                            |
