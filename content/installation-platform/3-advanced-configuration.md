---
title: "Advanced Configuration"
---

### Database Configuration

Chaosmesh requires a PostgresSQL 11 database.

| Environment Variable       | Remarks   | Description | Example
|----------------------------|-----------|-------------|--------
| SPRING_DATASOURCE_URL      | mandatory | JDBC Url for the database connection | `jdbc:postgresql://postgres:5432/chaosmeshdb`
| SPRING_DATASOURCE_USERNAME | mandatory | Database Username | `postgres`
| SPRING_DATASOURCE_PASSWORD | mandatory | Database Password | `postgres`

### Tenant Configuration

| Environment Variable       | Remarks   | Description | Example
|----------------------------|-----------|-------------|--------
| CHAOSMESH_TENANT_NAME      | mandatory | Name for the tenant assigned to you | `Demo Org`
| CHAOSMESH_TENANT_KEY       | mandatory | Key for the tenant assigned to you  | `demo`
| CHAOSMESH_TENANT_API_KEY   | mandatory | Api-Key for the tenant assigned to you. Treat it as sensitive information. | `abcdefghijklmn`

### LDAP-Authentication

You can use a LDAP Server for user authentication.

| Environment Variable                          | Remarks   | Description | Example
|-----------------------------------------------|-----------|-------------|--------
| CHAOSMESH_AUTH_PROVIDER                       | mandatory | Use `LDAP` for LDAP-Authentication | `LDAP`
| CHAOSMESH_AUTH_LDAP_URL                       | mandatory | LDAP-Server URL | `ldap://openldap:389/dc=chaosmesh,dc=com`
| CHAOSMESH_AUTH_LDAP_USER_DN_PATTERNS          | default: `uid={0},ou=people` | The search pattern to find the usernames | `uid={0},ou=people`
| CHAOSMESH_AUTH_LDAP_PASSWORD_ATTRIBUTE        | default: `userPassword` | The attribute in the directory which contains the user password | `userPassword`
| CHAOSMESH_AUTH_SYNC_ADMIN_GROUP_DN            | mandatory | The DN for the groupOfNames/groupOfUniqueNames for the `Admin` users | `cn=chaosmesh_admin,ou=groups,dc=chaosmesh,dc=com`
| CHAOSMESH_AUTH_SYNC_USER_GROUP_DN             | mandatory | The DN for the groupOfNames/groupOfUniqueNames for the `User` users | `cn=chaosmesh_user,ou=groups,dc=chaosmesh,dc=com`
| CHAOSMESH_AUTH_LDAP_SYNC_TEAM_SEARCH_FILTER   |           | The filter for the groupOfNames/groupOfUniqueNames for the teams | `ou=teams,ou=groups,dc=chaosmesh,dc=com`
| CHAOSMESH_AUTH_LDAP_SYNC_TEAM_KEY_ATTRIBUTE   |           | The attribute to use as Team key | `cn=chaosmesh_admin,ou=groups,dc=chaosmesh,dc=com`
| CHAOSMESH_AUTH_LDAP_SYNC_TEAM_NAME_ATTRIBUTE  |           | The attribute to use as Team name | `cn=chaosmesh_admin,ou=groups,dc=chaosmesh,dc=com`
| CHAOSMESH_AUTH_SYNC_CRON                      | default: `0 0 */2 ? * * *` | Cron Expression which defines the periods for the LDAP synchronization | `0 0 */2 ? * * *`

### OpenID-Connect Authentication

You can use an OpenID Connect compatible authentication provider for user authentication.

By default every user is assigned the `user` role, for a user to become `admin`, the attribute `chaosmesh:role` with value `admin` must be included in the oidc token.

| Environment Variable                          | Remarks   | Description | Example
|-----------------------------------------------|-----------|-------------|--------
| CHAOSMESH_AUTH_PROVIDER                       | mandatory | Use `OAUTH2` for OIDC-Authentication | `OAUTH2`
| CHAOSMESH_AUTH_OAUTH2_ISSUER_URI              | mandatory | URI for the OpenID Connect discovery endpoint. | `https://keycloak/auth/realms/demo`
| CHAOSMESH_AUTH_OAUTH2_CLIENT_ID               | mandatory | The client ID to use for the OIDC registration | `chaosmesh`
| CHAOSMESH_AUTH_OAUTH2_CLIENT_SECRET           | mandatory | The client secret to use for the OIDC registration | `ijhdfpjdf80wiphubfqwd113342r`
| CHAOSMESH_AUTH_OAUTH2_USER_NAME_ATTRIBUTE     | default: `name` | Name of the attribute that will be used as name for the user | `name`
