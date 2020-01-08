---
title: "Advanced Configuration"
---

### Database Configuration

Chaosmesh requires a PostgresSQL 11 database.

| Environment Variable         | Required  | Description
|------------------------------|-----------|------------
| `SPRING_DATASOURCE_URL`      | yes | JDBC Url for the database connection <br/> **Example:** `jdbc:postgresql://postgres:5432/chaosmeshdb`
| `SPRING_DATASOURCE_USERNAME` | yes | Database Username <br/> **Example:** `postgres`
| `SPRING_DATASOURCE_PASSWORD` | yes | Database Password <br/> **Example:** `postgres`

### Tenant Configuration

| Environment Variable         | Required  | Description
|------------------------------|-----------|------------
| `CHAOSMESH_TENANT_NAME`      | yes | Name for the tenant assigned to you <br/> **Example:** `Demo Org`
| `CHAOSMESH_TENANT_KEY`       | yes | Key for the tenant assigned to you  <br/> **Example:** `demo`
| `CHAOSMESH_TENANT_API_KEY`   | yes | Api-Key for the tenant assigned to you. Treat it as sensitive information. <br/> **Example:** `abcdefghijklmn`

### LDAP-Authentication

You can use a LDAP Server for user authentication.

| Environment Variable                            | Required  | Description
|-------------------------------------------------|-----------|------------
| `CHAOSMESH_AUTH_PROVIDER`                       | yes | Use `LDAP` for LDAP-Authentication <br/> **Example:** `LDAP`
| `CHAOSMESH_AUTH_LDAP_URL`                       | yes | LDAP-Server URL <br/> **Example:** `ldap://openldap:389/dc=chaosmesh,dc=com`
| `CHAOSMESH_AUTH_LDAP_USER_DN_PATTERNS`          |     | The search pattern to find the usernames <br/> **Default:** `uid={0},ou=people`
| `CHAOSMESH_AUTH_LDAP_PASSWORD_ATTRIBUTE`        |     | The attribute in the directory which contains the user password <br/> **Default:** `userPassword`
| `CHAOSMESH_AUTH_SYNC_ADMIN_GROUP_DN`            | yes | The DN for the groupOfNames/groupOfUniqueNames for the `Admin` users <br/> **Example:** `cn=chaosmesh_admin,ou=groups,dc=chaosmesh,dc=com`
| `CHAOSMESH_AUTH_SYNC_USER_GROUP_DN`             | yes | The DN for the groupOfNames/groupOfUniqueNames for the `User` users <br/> **Example:** `cn=chaosmesh_user,ou=groups,dc=chaosmesh,dc=com`
| `CHAOSMESH_AUTH_LDAP_SYNC_TEAM_SEARCH_FILTER`   |     | The filter for the groupOfNames/groupOfUniqueNames for the teams <br/> **Example:** `ou=teams,ou=groups,dc=chaosmesh,dc=com`
| `CHAOSMESH_AUTH_LDAP_SYNC_TEAM_KEY_ATTRIBUTE`   |     | The attribute to use as Team key <br/> **Example:** `cn=chaosmesh_admin,ou=groups,dc=chaosmesh,dc=com`
| `CHAOSMESH_AUTH_LDAP_SYNC_TEAM_NAME_ATTRIBUTE`  |     | The attribute to use as Team name <br/> **Example:** `cn=chaosmesh_admin,ou=groups,dc=chaosmesh,dc=com`
| `CHAOSMESH_AUTH_SYNC_CRON`                      |     | Cron Expression which defines the periods for the LDAP synchronization <br/> **Default:** `0 0 */2 ? * * *`

### OpenID-Connect Authentication

You can use an OpenID Connect compatible authentication provider for user authentication.

By default every user is assigned the `user` role, for a user to become `admin`, the attribute `chaosmesh:role` with value `admin` must be included in the oidc token.

| Environment Variable                            | Required  | Description
|-------------------------------------------------|-----------|------------
| `CHAOSMESH_AUTH_PROVIDER`                       | yes | Use `OAUTH2` for OIDC-Authentication <br/> **Example:** `OAUTH2`
| `CHAOSMESH_AUTH_OAUTH2_ISSUER_URI`              | yes | URI for the OpenID Connect discovery endpoint. <br/> **Example:** `https://keycloak/auth/realms/demo`
| `CHAOSMESH_AUTH_OAUTH2_CLIENT_ID`               | yes | The client ID to use for the OIDC registration <br/> **Example:** `chaosmesh`
| `CHAOSMESH_AUTH_OAUTH2_CLIENT_SECRET`           | yes | The client secret to use for the OIDC registration <br/> **Example:** `ijhdfpjdf80wiphubfqwd113342r`
| `CHAOSMESH_AUTH_OAUTH2_USER_NAME_ATTRIBUTE`     |     | Name of the attribute that will be used as name for the user <br/> **Default:** `name`
