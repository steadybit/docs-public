---
title: Users
---

# Users

This page describes user roles, how to invite users, and how external identity systems affect user management.

## Role Types

Users have two role types that determine access and permissions:

- Platform role: Assigned at the platform (tenant) level. Each user has exactly one of `admin` or `user`.
- Team role: Assigned within a specific team. A user can be an `owner` or a `member` in that team.

See [Permissions](permissions.md) for the functional differences between these roles.

{% hint style="info" %}
Users who are not members of any team do not count toward license limits.
{% endhint %}

## Inviting Users (SaaS only)

New users can be invited by email and directly assigned to teams and roles. 
When an invitation is accepted, the corresponding user is created and gains access to your Steadybit tenant.

## Integrations

User management can be automated by the [OIDC Integration](../install-on-prem-platform/oidc-integration.md) and [LDAP Integration](../install-on-prem-platform/ldap-integration.md).
