---
title: Teams
---

# Teams

Teams are the grouping element for multiple users. Each team consists of multiple users and has its own permissions for environments and attacks, allowing fine-grained access control for your experiments and services. Creating teams requires the `admin` permission. A team can also have owners, who manage the team and its members.

## Default Team: Administrators

By default, one team is created called `Administrators` (key: `ADM`). It contains only the first user of Steadybit and has access to the [Global environment](../manage-environments/README.md).

## Creating Teams

In the create dialog, you first enter a **name** for the team. The name can be edited after creation by admins or team owners.

You must enter a **key** for the team consisting of one to eight characters. The key cannot be changed after the creation. Each experiment belonging to this team is assigned an identifier with the team key as a prefix.

## What Belongs to a Team

Each experiment and each [service](../../use-steadybit/services/README.md) belongs to exactly one team:

* **Experiments** — including their runs and schedules. Admins and team owners can [share an experiment with other teams](../../use-steadybit/experiments/share/share-experiment/README.md), so that their members can run and schedule it, too.
* **Services** — a service stays with the team it was created in and can't be moved to another team later. Admins and owners of that team can create and edit its services. Team members can create and run the service's provided experiments, link custom experiments, and validate advice.

Other things are scoped to teams as well:

* **Saved views** in the [Landscape](../../use-steadybit/explorer/landscape.md#saved-views) are shared with the members of your team.
* **Team and wildcard [access tokens](../../integrate-with-steadybit/api/api.md#token-types)** grant access to the experiments and operations of their teams.
* **[Webhooks](../../integrate-with-steadybit/webhooks/custom-webhooks.md), [preflight webhooks](../../integrate-with-steadybit/webhooks/preflight-webhooks.md), [preflight actions](../../integrate-with-steadybit/preflightactions/preflight-actions.md), and [Slack notifications](../../integrate-with-steadybit/slack-notifications.md)** can be restricted to a single team. Without a team, they apply to all teams.

## Permissions

In the edit/create dialog, admins can control

* which attacks a team is allowed to execute, and
* which [environments](../manage-environments/README.md) — and therefore which targets — the team is allowed to operate on.

You can think of it as the maximum blast radius this team can attack.

If permissions for teams with existing experiments are removed, the blast radius of the experiments is not widened. If you add permissions to teams with existing experiments, the new permissions will be applied to the experiments.

## Managing Team Members

Admins or team owners can add members to or remove members from the team, and assign them either the `member` or `owner` role.

## Integrations

Team and team member management can be automated by the [OIDC Integration](../install-on-prem-platform/oidc-integration.md) and [LDAP Integration](../install-on-prem-platform/ldap-integration.md).

To keep teams, their permissions, and members in Git and apply them from a pipeline, see [Manage Teams and Environments as Code](manage-as-code.md).
