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

The Steadybit Platform supports LDAP-based user authentication as follows.

The platform accesses the LDAP server anonymously by default. To use authenticated access, configure both `STEADYBIT_AUTH_LDAP_MANAGER_DN` and `STEADYBIT_AUTH_LDAP_MANAGER_PASSWORD` environment variables.

Users are authenticated using LDAP bind operations with their credentials. To use password comparison instead, set `STEADYBIT_AUTH_LDAP_METHOD` to `password-compare`.

For detailed LDAP authentication configuration parameters, refer to [LDAP-Authentication](./advanced-configuration.md#ldap-authentication).

### Base DN in the LDAP URL

`STEADYBIT_AUTH_LDAP_URL` may contain a base DN, for example `ldap://ldap.example.com:389/dc=example,dc=com`. Other DNs relate to it as follows:

- **Group DNs and the team search filter** (`STEADYBIT_AUTH_LDAP_SYNC_*`) can be given in full (`cn=steadybit_user,ou=groups,dc=example,dc=com`) or relative to the base DN (`cn=steadybit_user,ou=groups`).
- **The user search base** (`STEADYBIT_AUTH_LDAP_USER_SEARCH_BASE`) is always relative to the base DN. Leave it empty to search the whole base DN, or set a relative DN such as `ou=people`. Repeating the base DN here (`ou=people,dc=example,dc=com`) makes the platform search below `dc=example,dc=com,dc=example,dc=com`, and no user can log in.

Without a base DN in the URL, give every DN in full.

## Synchronization

{% hint style="info" %}
When LDAP-based user synchronization is enabled, manual user management and team assignment operations are disabled.
{% endhint %}

The Steadybit Platform can synchronize users and team associations from LDAP at regular intervals. The synchronization process consists of three phases:

### 1. User Synchronization

The platform queries the configured LDAP groups and synchronizes user accounts based on group membership:

- **Administrator Users**: Retrieved from the LDAP group specified in `STEADYBIT_AUTH_LDAP_SYNC_ADMIN_GROUP_DN`
- **Regular Users**: Retrieved from the LDAP group specified in `STEADYBIT_AUTH_LDAP_SYNC_USER_GROUP_DN`

Users are created or updated in the Steadybit Platform based on LDAP data. How group members are read is described in [Group Members and Nested Groups](#group-members-and-nested-groups).

**Note**: Users removed in LDAP are not automatically removed from the platform.

### 2. Team Synchronization

Teams are identified using the LDAP search filter defined in `STEADYBIT_AUTH_LDAP_SYNC_TEAM_SEARCH_FILTER`.
Teams that do not exist in the Steadybit Platform are created automatically.
Teams that no longer exist in LDAP are automatically deleted from the platform, provided they were originally created by LDAP synchronization.

### 3. Team Member Synchronization

Users referenced in LDAP teams, directly or through [nested groups](#group-members-and-nested-groups), are assigned to the corresponding Steadybit teams with the `member` role.
LDAP-managed members that are no longer referenced in the LDAP group are removed from the team.
Manually added members on an LDAP-managed team are preserved and not affected by the synchronization.

Only users that exist in the Steadybit Platform (from User Synchronization) can be assigned to teams.

### Group Members and Nested Groups

The admin group, the user group, and every team group list their members in `uniqueMember` attributes (`groupOfUniqueNames`) or `member` attributes (`groupOfNames`, and Active Directory's `group`). Each member value is the DN of an entry.

A member that is itself a group (object class `group`, `groupOfNames`, or `groupOfUniqueNames`) is a nested group. The platform resolves it to its users, at any depth. For example, if `steadybit_user` contains the group `engineering`, and `engineering` contains the group `sre`, then the users of both `engineering` and `sre` become Steadybit users. Circular nesting, which Active Directory allows, is resolved once per group, and a user reached through several groups is synchronized once.

A member DN that does not exist in the directory is skipped and logged. Any other LDAP error while reading members, such as a lost connection, stops the synchronization run. Team memberships stay as they were and no team is deleted until the next successful run, so a temporary outage never removes users from their teams.

### Managed by LDAP

Teams and memberships created through LDAP synchronization are marked as **managed by LDAP**. This has the following effects:

- **Team name and key** of LDAP-managed teams cannot be edited by platform admins. They are controlled by LDAP.
- **LDAP-managed members** cannot be removed from teams via the UI or API by platform admins. Membership changes must be made in LDAP.
- **Manually added members** on an LDAP-managed team are preserved and can be managed normally.
- Other team properties (description, allowed environments, allowed actions) remain editable by admins.

For additional synchronization configuration parameters, refer to [LDAP-Authentication](./advanced-configuration.md#ldap-authentication).

## Troubleshooting

### LDAP Connection Closed Errors

If the platform encounters `LDAP connection has been closed` errors, configure LDAP connection pooling by setting the `JAVA_OPTS` environment variable for the platform process:

```
JAVA_OPTS=-Dcom.sun.jndi.ldap.connect.pool.timeout=20000 -Dcom.sun.jndi.ldap.connect.pool.maxsize=20
```
