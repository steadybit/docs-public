---
title: LDAP Integration
navTitle: LDAP Integration
---

# LDAP Integration

The Steadybit Platform supports integration with Lightweight Directory Access Protocol (LDAP) servers for centralized user management. 
This integration enables LDAP-based authentication and automatic team membership assignment based on LDAP group memberships.

## Activation

To enable LDAP integration, set the following environment variable:

```
STEADYBIT_AUTH_PROVIDER=LDAP
```

## Authentication

The Steadybit Platform supports LDAP-based user authentication with the following behavior:

The platform accesses the LDAP server anonymously by default. To use authenticated access, configure both `STEADYBIT_AUTH_LDAP_MANAGER_DN` and `STEADYBIT_AUTH_LDAP_MANAGER_PASSWORD` environment variables.

Users are authenticated using LDAP bind operations with their credentials. To use password comparison instead, set `STEADYBIT_AUTH_LDAP_METHOD` to `password-compare`.

For detailed LDAP authentication configuration parameters, refer to [LDAP-Authentication](./advanced-configuration.md#ldap-authentication).

## Synchronization

{% hint style="info" %}
When LDAP-based user synchronization is enabled, manual user management and team assignment operations are disabled.
{% endhint %}

The Steadybit Platform can synchronize users and team associations from LDAP at regular intervals. The synchronization process consists of three phases:

### 1. User Synchronization

The platform queries the configured LDAP groups and synchronizes user accounts based on group membership:

- **Administrator Users**: Retrieved from the LDAP group specified in `STEADYBIT_AUTH_LDAP_SYNC_ADMIN_GROUP_DN`
- **Regular Users**: Retrieved from the LDAP group specified in `STEADYBIT_AUTH_LDAP_SYNC_USER_GROUP_DN`

LDAP groups must contain `uniqueMember` or `member` attributes that reference user entries. Users are created or updated in the Steadybit Platform based on LDAP data.

**Note**: Users removed in LDAP are not automatically removed from the platform.

### 2. Team Synchronization

Teams are identified using the LDAP search filter defined in `STEADYBIT_AUTH_LDAP_SYNC_TEAM_SEARCH_FILTER`.
Teams that do not exist in the Steadybit Platform are created automatically.

**Note**: Teams removed in LDAP are not automatically removed from the platform.

### 3. Team Member Synchronization

Users referenced in LDAP teams are assigned to the corresponding Steadybit teams with the `member` role, or removed when they are no longer referenced.

Only users that exist in the Steadybit Platform (from User Synchronization) can be assigned to teams.

For additional synchronization configuration parameters, refer to [LDAP-Authentication](./advanced-configuration.md#ldap-authentication).

## Troubleshooting

### LDAP Connection Closed Errors

If the platform encounters `LDAP connection has been closed` errors, configure LDAP connection pooling by setting the `JAVA_OPTS` environment variable for the platform process:

```
JAVA_OPTS=-Dcom.sun.jndi.ldap.connect.pool.timeout=20000 -Dcom.sun.jndi.ldap.connect.pool.maxsize=20
```
