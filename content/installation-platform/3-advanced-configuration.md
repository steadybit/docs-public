---
title: "Advanced Platform Configuration"
navTitle: "Advanced Configuration"
---

## Database Configuration

Chaosmesh requires a PostgresSQL 11 database.

| Environment Variable         | Required  | Description
|------------------------------|-----------|------------
| `SPRING_DATASOURCE_URL`      | yes | JDBC Url for the database connection <br/> **Example:** `jdbc:postgresql://postgres:5432/chaosmeshdb`
| `SPRING_DATASOURCE_USERNAME` | yes | Database Username <br/> **Example:** `postgres`
| `SPRING_DATASOURCE_PASSWORD` | yes | Database Password <br/> **Example:** `postgres`
| `CHAOSMESH_DB_WEB_ENABLED`   |     | Enable Http Endpoint for Database export <br/> **Default:** `true`

## Tenant Configuration

| Environment Variable         | Required  | Description
|------------------------------|-----------|------------
| `CHAOSMESH_TENANT_NAME`      | yes | Name for the tenant assigned to you <br/> **Example:** `Demo Org`
| `CHAOSMESH_TENANT_KEY`       | yes | Key for the tenant assigned to you  <br/> **Example:** `demo`
| `CHAOSMESH_TENANT_API_KEY`   | yes | API key for the tenant assigned to you. Treat it as sensitive information. <br/> **Example:** `foobar`

## Web Configuration

| Environment Variable         | Required  | Description
|------------------------------|-----------|------------
| `CHAOSMESH_WEB_PUBLIC_URL`   |     | URL to point to your chaosmesh installation. Used for links in notifications.
| `CHAOSMESH_WEB_PUBLIC_EXPERIMENT_PORT`   |     | By default the Websocket connection are advertised to the agents on port 7878. If the public port differs (e.g. because of a proxy) use this property to advertise a different port.




## Static-Authentication

You can use a static username/password to authenticate as an admin user

| Environment Variable                            | Required  | Description
|-------------------------------------------------|-----------|------------
| `CHAOSMESH_AUTH_PROVIDER`                       | yes | Use `STATIC` for static authentication <br/> **Example:** `LDAP`
| `CHAOSMESH_AUTH_STATIC_USERNAME`                | yes | Username <br/> **Example:** `admin`
| `CHAOSMESH_AUTH_STATIC_PASSWORD`                | yes | Password <br/> **Example:** `{noop}admin`


## LDAP-Authentication

You can use a LDAP Server for user authentication.

By default the ldap is accessed anonymously, unless `CHAOSMESH_AUTH_LDAP_MANAGER_DN` and `CHAOSMESH_AUTH_LDAP_MANAGER_PASSWORD` is set.
The users are authenticated by doing a bind with their credentials, unless `CHAOSMESH_AUTH_LDAP_METHOD` is set to `password-compare`.

| Environment Variable                            | Required  | Description
|-------------------------------------------------|-----------|------------
| `CHAOSMESH_AUTH_PROVIDER`                       | yes | Use `LDAP` for LDAP-Authentication <br/> **Example:** `LDAP`
| `CHAOSMESH_AUTH_LDAP_URL`                       | yes | LDAP-Server URL <br/> **Example:** `ldap://openldap:389/dc=chaosmesh,dc=com`
| `CHAOSMESH_AUTH_LDAP_MANAGER_DN`                |     | Username (DN) of the "manager" user identity is used to authenticate to a LDAP server. If omitted anonymous access will be used. **Example:** `uid=admin,ou=system`
| `CHAOSMESH_AUTH_LDAP_MANAGER_PASSWORD`          |     | The password for the manager DN. This is required if the manager-dn is specified.
| `CHAOSMESH_AUTH_LDAP_USER_DN_PATTERNS`          |     | The search pattern to find the usernames <br/> **Default:** `uid={0},ou=people`
| `CHAOSMESH_AUTH_LDAP_METHOD            `        |     | The method to authenticate the user. Either `bind` or `password-compare`. <br/> **Default:** `bind`
| `CHAOSMESH_AUTH_LDAP_PASSWORD_ATTRIBUTE`        |     | The attribute in the directory which contains the user password, used if using `password-compare` <br/> **Default:** `userPassword`
| `CHAOSMESH_AUTH_SYNC_ADMIN_GROUP_DN`            | yes | The DN for the groupOfNames/groupOfUniqueNames for the `Admin` users <br/> **Example:** `cn=chaosmesh_admin,ou=groups,dc=chaosmesh,dc=com`
| `CHAOSMESH_AUTH_SYNC_USER_GROUP_DN`             | yes | The DN for the groupOfNames/groupOfUniqueNames for the `User` users <br/> **Example:** `cn=chaosmesh_user,ou=groups,dc=chaosmesh,dc=com`
| `CHAOSMESH_AUTH_LDAP_SYNC_TEAM_SEARCH_FILTER`   |     | The filter for the groupOfNames/groupOfUniqueNames for the teams <br/> **Example:** `ou=teams,ou=groups,dc=chaosmesh,dc=com`
| `CHAOSMESH_AUTH_LDAP_SYNC_TEAM_KEY_ATTRIBUTE`   |     | The attribute to use as Team key <br/> **Example:** `cn=chaosmesh_admin,ou=groups,dc=chaosmesh,dc=com`
| `CHAOSMESH_AUTH_LDAP_SYNC_TEAM_NAME_ATTRIBUTE`  |     | The attribute to use as Team name <br/> **Example:** `cn=chaosmesh_admin,ou=groups,dc=chaosmesh,dc=com`
| `CHAOSMESH_AUTH_SYNC_CRON`                      |     | Cron Expression which defines the periods for the LDAP synchronization <br/> **Default:** `0 0 */2 ? * * *`

## OpenID-Connect Authentication

You can use an OpenID Connect compatible authentication provider for user authentication.

By default every user is assigned the `user` role, for a user to become `admin`, the attribute `chaosmesh:role` with value `admin` must be included in the oidc token.

| Environment Variable                            | Required  | Description
|-------------------------------------------------|-----------|------------
| `CHAOSMESH_AUTH_PROVIDER`                       | yes | Use `OAUTH2` for OIDC-Authentication <br/> **Example:** `OAUTH2`
| `CHAOSMESH_AUTH_OAUTH2_ISSUER_URI`              | yes | URI for the OpenID Connect discovery endpoint. <br/> **Example:** `https://keycloak/auth/realms/demo`
| `CHAOSMESH_AUTH_OAUTH2_CLIENT_ID`               | yes | The client ID to use for the OIDC registration <br/> **Example:** `chaosmesh`
| `CHAOSMESH_AUTH_OAUTH2_CLIENT_SECRET`           | yes | The client secret to use for the OIDC registration <br/> **Example:** `ijhdfpjdf80wiphubfqwd113342r`
| `CHAOSMESH_AUTH_OAUTH2_USER_NAME_ATTRIBUTE`     |     | Name of the attribute that will be used as name for the user <br/> **Default:** `name`

## Using SSL/TLS Encryption

SSL can be configured by setting the various `SERVER_SSL_*` properties and requires a java keystore (typically PKCS12).

| Environment Variable                         | Required  | Description
|----------------------------------------------|-----------|------------
| `SERVER_PORT`                                |     | Port to use <br/> **Default:** `8080`
| `SERVER_SSL_KEY_STORE`                       |     | Path to the key store that holds the SSL certificate (typically a `.jks` or `.p12` file). <br/> **Example:** `file:/keystores/chaosmesh.p12`
| `SERVER_SSL_KEY_STORE_TYPE`                  |     | Type of the keystore  <br/> **Example:** `PKCS12`
| `SERVER_SSL_KEY_STORE_PASSWORD`              |     | Password used to access the key store
| `SERVER_SSL_KEY_ALIAS`                       |     | Alias that identifies the key in the keystore to be used
| `SERVER_SSL_KEY_PASSWORD`                    |     | Password used to access the key in the key store.
