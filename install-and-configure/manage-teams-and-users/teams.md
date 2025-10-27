---
title: Teams
---

# Teams

Teams are the grouping element for multiple users. Each team consists of multiple users and owns separate permissions for environments and attacks, allowing fine grained access control for your experiments. Creating teams is possible only with the `admin` permission. Within teams there can be owners who manage the team and its members.

## Default Team: Administrators

Per default one team is created called `Administrators` (key: `ADM`). It contains only the first user of Steadybit and has access to the [Global environment](../../install-and-configure/manage-environments/README.md).

## Creating Teams

In the create dialog you should first enter a **name** for the Team. The name can be edited after creation by admins or team owners.

You must enter a **key** for the team consisting of one to eight characters. The key cannot be changed after the creation. Each experiment belonging to this team, will be assigned an identifier with the team key as prefix.

## Permissions

In the edit/create dialog admins can give permissions to

* the attacks a team is allowed to execute and
* which [environments](../../install-and-configure/manage-environments/README.md) containing different targets the team is allowed to operate on.

You can think of it as a maximum blast radius this team can attack.

If permissions for teams with existing experiments are removed, the blast radius of the experiments is not widened. If you add permissions to teams with existing experiments, the new permissions will be applied to the experiments.

## Managing Team Members

Admins or team owners can add or remove members to the team and assign them either the `member` or `owner` role.

## Integrations

Team and team member management can be automated by the [OIDC Integration](../install-on-prem-platform/oidc-integration.md) and [LDAP Integration](../install-on-prem-platform/ldap-integration.md).
