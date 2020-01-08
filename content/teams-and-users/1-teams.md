---
title: "Teams"
---

## Creating Teams
In the create dialog you should first enter a **name** for the Team.
The name can be edited after creation by admins or team owners.

You must enter a **key** for the tea consisting on one to eight characters.
The key cannot be changed after the creation.
Each experiment belonging to this team, will be assigned an identifier with the team key as prefix.

## Restrictions
In the edit/create dialog you can restrict the attacks a team is allowed to execute and which targets the team is allowed to operate on.
Selecting target restrictions works the same way as defining a blast radius.
You can think of it as a maximum blast radius this team can attack.
The restrictions can be edited after creation by admins or team owners.

If restrictions for teams with existing experiments are removed, the blast radius of the experiments are not widened.
If you add restrictions to teams with existing experiments, the new restrictions will be applied to the experiments.

## Managing Team Members
Admins or team owners can add or remove members to the team and assign them either the `member` or `owner` role.

## Team LDAP-Synchronization
If you have configured the LDAP synchronization for teams (on-premises only), you cannot add or remove teams or team members.
But you have to configure the restrictions for the team, by default newly synchronized teams are not allowed to execute any attack.
