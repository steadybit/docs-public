---
title: Permissions
---

# Permissions

The roles in Steadybit are associated with permissions, which cannot be altered. See the table for the permissions:

## Administration
| Permission/Role                                                    | Admin                                          | Team Owner                                  | Team Member | Any Authenticated User |
|--------------------------------------------------------------------|------------------------------------------------|---------------------------------------------|-------------|------------------------|
| [Manage Users](#user-content-fn-2)[^2]                             | [✅](#user-content-fn-1)[^1]                   | ❌                                           | ❌           | ❌                      |
| [Manage Teams](#user-content-fn-3)[^3]                             | [✅](#user-content-fn-1)[^1]                   | [☑️](#user-content-fn-4)[^4]               | ❌           | ❌                      |
| [Manage Environments](#user-content-fn-5)[^5]                      | ✅                                             | ❌                                           | ❌           | ❌                      |
| [Manage Access Tokens](#user-content-fn-6)[^6]                     | ✅                                             | ✅                                           | ❌           | ❌                      |
| Add Agents                                                         | ✅                                             | ❌                                           | ❌           | ❌                      |
| [Manage Integrations](#user-content-fn-7)[^7]                      | ✅                                             | ✅                                           | ❌           | ❌                      |
| View Audit Log                                                     | ✅                                             | ❌                                           | ❌           | ❌                      |
| [Database Export](#user-content-fn-8)[^8]                          | ✅                                             | ❌                                           | ❌           | ❌                      |

## Prepare Rollout of Chaos Engineering
| Permission/Role                                                    | Admin | Team Owner | Team Member | Any Authenticated User |
|--------------------------------------------------------------------|-------|------------|-------------|------------------------|
| [Manage Services](#user-content-fn-9)[^9]                          | ✅     | ✅          | ❌           | ❌                      |
| [Manage Service Profiles](#user-content-fn-10)[^10]                | ✅     | ❌          | ❌           | ❌                      |
| [Manage Experiment Templates](#user-content-fn-11)[^11]            | ✅     | ❌          | ❌           | ❌                      |

## Performing Chaos Engineering
| Permission/Role                                                                            | Admin | Team Owner | Team Member | Any Authenticated User |
|--------------------------------------------------------------------------------------------|-------|------------|-------------|------------------------|
| [Work within Services](#user-content-fn-12)[^12]                                           | ✅     | ✅          | ❌           | ❌                      |
| [Design and run Experiments](#user-content-fn-13)[^13]                                     | ✅     | ✅          | ✅           | ❌                      |
| View Experiments                                                                           | ✅     | ✅          | ✅           | ✅                      |
| Stop Experiments                                                                           | ✅     | ✅          | ✅           | ✅                      |
| Stop all Experiments via [Emergency Stop](../../use-steadybit/experiments/#Emergency-Stop) | ✅     | ✅          | ✅           | ✅                      |

[^1]: unless synced via LDAP

[^2]: Invite/remove users, [change user roles](./users.md#role-types)

[^3]: Add / delete teams, configure allowed environments/actions, Add/delete team members

[^4]: Team owners can add/delete team members and delete the entire team

[^5]: Add/edit/delete [environments](/install-and-configure/manage-environments/)

[^6]: Add/recreate/delete [access tokens](/integrate-with-steadybit/api/)

[^7]: Add / edit / delete [platform integrations](/integrate-with-steadybit/) like Slack Integration, Webhooks, and Preflight Actions

[^8]: Unless disabled via configuration

[^9]: Add / edit / delete [service](/use-steadybit/services/)

[^10]: Add / edit / delete [service profile](/install-and-configure/manage-service-profiles/), set a profile as default

[^11]: Add / edit / delete [experiment templates](/install-and-configure/manage-experiment-templates/)

[^12]: Run provided experiments, assign custom experiments, follow advice (TODO)

[^13]: Add from scratch / Add via templates / Add via file upload / edit / delete / run / schedule [experiments](/use-steadybit/experiments/)
