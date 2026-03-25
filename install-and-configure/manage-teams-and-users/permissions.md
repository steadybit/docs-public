---
title: Permissions
---

# Permissions

The roles in Steadybit are associated with permissions, which cannot be altered. See the table for the permissions:

## Administration
| Permission/Role          | Admin         | Team Owner | Team Member | Any Authenticated User |
|--------------------------|---------------|------------|-------------|------------------------|
| Manage[^2] Users         | ✅[^1]         | ❌          | ❌           | ❌                      |
| Manage[^3] Teams         | ✅[^1]         | ☑️[^4]     | ❌           | ❌                      |
| Manage[^5] Environments  | ✅             | ❌          | ❌           | ❌                      |
| Manage[^6] Access Tokens | ✅             | ✅          | ❌           | ❌                      |
| Add Agents               | ✅             | ❌          | ❌           | ❌                      |
| Manage[^7] Integrations  | ✅             | ✅          | ❌           | ❌                      |
| View Audit Log           | ✅             | ❌          | ❌           | ❌                      |
| Database Export[^8]      | ✅             | ❌          | ❌           | ❌                      |

[^1]: unless synced via LDAP

[^2]: Invite/remove users, [change user roles](./users.md#role-types)

[^3]: Add / delete teams, configure allowed environments/actions, Add/delete team members

[^4]: Team owners can add/delete team members and delete the entire team

[^5]: Add/edit/delete [environments](/install-and-configure/manage-environments/)

[^6]: Add/recreate/delete [access tokens](/integrate-with-steadybit/api/)

[^7]: Add / edit / delete [platform integrations](/integrate-with-steadybit/) like Slack Integration, Webhooks, and Preflight Actions

[^8]: Unless disabled via configuration


## Prepare Rollout of Chaos Engineering
| Permission/Role                  | Admin | Team Owner | Team Member | Any Authenticated User |
|----------------------------------|-------|------------|-------------|------------------------|
| Manage[^9] Services              | ✅     | ✅          | ❌           | ❌                      |
| Manage[^10] Service Profiles     | ✅     | ❌          | ❌           | ❌                      |
| Manage[^11] Experiment Templates | ✅     | ❌          | ❌           | ❌                      |

[^9]: Add / edit / delete [service](/use-steadybit/services/)

[^10]: Add / edit / delete [service profile](/install-and-configure/manage-service-profiles/), set a profile as default

[^11]: Add / edit / delete [experiment templates](/install-and-configure/manage-experiment-templates/)

## Performing Chaos Engineering
| Permission/Role                                                                            | Admin | Team Owner | Team Member | Any Authenticated User |
|--------------------------------------------------------------------------------------------|-------|------------|-------------|------------------------|
| Work[^12] within Services                                                                  | ✅     | ✅          | ❌           | ❌                      |
| Design and run[^13] Experiments                                                            | ✅     | ✅          | ✅           | ❌                      |
| View Experiments                                                                           | ✅     | ✅          | ✅           | ✅                      |
| Stop Experiments                                                                           | ✅     | ✅          | ✅           | ✅                      |
| Stop all Experiments via [Emergency Stop](../../use-steadybit/experiments/#Emergency-Stop) | ✅     | ✅          | ✅           | ✅                      |

[^12]: Run provided experiments, assign custom experiments, follow advice (TODO)

[^13]: Add from scratch / Add via templates / Add via file upload / edit / delete / run / schedule [experiments](/use-steadybit/experiments/)
