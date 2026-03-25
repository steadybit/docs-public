---
title: Permissions
---

# Permissions

The roles in Steadybit are associated with permissions, which cannot be altered. See the table for the permissions:

## Administration
| Permission/Role                                                            | Admin                       | Team Owner                   | Team Member | Any Authenticated User |
|----------------------------------------------------------------------------|-----------------------------|------------------------------|-------------|------------------------|
| [Manage Users](./users.md)                                                 | [✅](#user-content-fn-1)[^1] | ❌                            | ❌           | ❌                      |
| [Manage Teams](./teams.md)                                                 | [✅](#user-content-fn-1)[^1] | [☑️](#user-content-fn-2)[^2] | ❌           | ❌                      |
| [Manage Environments](/install-and-configure/manage-environments/)         | ✅                           | ❌                            | ❌           | ❌                      |
| [Manage Access Tokens](/integrate-with-steadybit/api/api.md#access-tokens) | ✅                           | ✅                            | ❌           | ❌                      |
| [Add Agents](/install-and-configure/install-agent/)                        | ✅                           | ❌                            | ❌           | ❌                      |
| [Manage Integrations](/integrate-with-steadybit/)                          | ✅                           | ✅                            | ❌           | ❌                      |
| [View Audit Log](/integrate-with-steadybit/audit-log.md)                   | ✅                           | ❌                            | ❌           | ❌                      |
| [Database Export](/troubleshooting/README.md#database-export)              | [✅](#user-content-fn-3)[^3] | ❌                            | ❌           | ❌                      |

## Prepare Rollout of Chaos Engineering
| Permission/Role                                                | Admin | Team Owner | Team Member | Any Authenticated User |
|----------------------------------------------------------------|-------|------------|-------------|------------------------|
| [Manage Services](/use-steadybit/services/)                      | ✅     | ✅          | ❌           | ❌                      |
| [Manage Service Profiles](/install-and-configure/manage-service-profiles/)                | ✅     | ❌          | ❌           | ❌                      |
| [Manage Experiment Templates](/install-and-configure/manage-experiment-templates/)            | ✅     | ❌          | ❌           | ❌                      |

## Performing Chaos Engineering
| Permission/Role                                                                                                                                   | Admin | Team Owner | Team Member | Any Authenticated User |
|---------------------------------------------------------------------------------------------------------------------------------------------------|-------|------------|-------------|------------------------|
| [Work within Services](/use-steadybit/services/)                                                                                                  | ✅     | ✅          | ❌           | ❌                      |
| [Design](/use-steadybit/experiments/design), [run](/use-steadybit/experiments/run), and [schedule experiments](/use-steadybit/experiments/design) | ✅     | ✅          | ✅           | ❌                      |
| [View Experiments](/use-steadybit/experiments/)                                                                                                   | ✅     | ✅          | ✅           | ✅                      |
| [Stop Experiments](/use-steadybit/experiments/)                                                                                                   | ✅     | ✅          | ✅           | ✅                      |
| Stop all Experiments via [Emergency Stop](../../use-steadybit/experiments/emergencystop)                                                          | ✅     | ✅          | ✅           | ✅                      |

[^1]: unless synced via [LDAP](/install-and-configure/install-on-prem-platform/ldap-integration.md)

[^2]: Team owners can [add/delete team members](./teams.md#managing-team-members) and [delete teams](./teams.md)

[^3]: Unless disabled via configuration