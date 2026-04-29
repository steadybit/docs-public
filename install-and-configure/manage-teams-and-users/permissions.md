---
title: Permissions
---

# Permissions

The roles in Steadybit are associated with permissions, which cannot be altered. See the table for the permissions:

## Install and Configure
| Permission/Role                                                            | Admin                       | Team Owner                   | Team Member | Any Authenticated User |
|----------------------------------------------------------------------------|-----------------------------|------------------------------|-------------|------------------------|
| [Manage teams](./teams.md)                                                 | [✅](#user-content-fn-1)[^1] | [☑️](#user-content-fn-2)[^2] | ❌           | ❌                      |
| [Manage users](./users.md)                                                 | [✅](#user-content-fn-1)[^1] | ❌                            | ❌           | ❌                      |
| [Add agents](/install-and-configure/install-agent/)                        | ✅                           | ❌                            | ❌           | ❌                      |
| [Manage environments](/install-and-configure/manage-environments/)         | ✅                           | ❌                            | ❌           | ❌                      |
| [View audit log](/integrate-with-steadybit/audit-log.md)                   | ✅                           | ❌                            | ❌           | ❌                      |
| [Database export](/troubleshooting/README.md#database-export)              | [✅](#user-content-fn-3)[^3] | ❌                            | ❌           | ❌                      |
| [Manage access tokens](/integrate-with-steadybit/api/api.md#access-tokens) | ✅                           | ✅                            | ❌           | ❌                      |
| [Manage integrations](/integrate-with-steadybit/)                          | ✅                           | ✅                            | ❌           | ❌                      |

## Prepare Rollout of Chaos Engineering
| Permission/Role                                                                    | Admin | Team Owner | Team Member | Any Authenticated User |
|------------------------------------------------------------------------------------|-------|------------|-------------|------------------------|
| [Manage services](/use-steadybit/services/)                                        | ✅     | ✅          | ❌           | ❌                      |
| [Manage service profiles](/install-and-configure/manage-service-profiles/)         | ✅     | ❌          | ❌           | ❌                      |
| [Manage experiment templates](/install-and-configure/manage-experiment-templates/) | ✅     | ❌          | ❌           | ❌                      |
| [Manage properties](/install-and-configure/manage-properties/)                     | ✅     | ❌          | ❌           | ❌                      |
| [Manage hubs](/integrate-with-steadybit/hubs/)                                     | ✅     | ❌          | ❌           | ❌                      |

## Doing Chaos Engineering
| Permission/Role                                                                                           | Admin | Team Owner | Team Member | Shared-with Team Member[^4]  | Any Authenticated User |
|-----------------------------------------------------------------------------------------------------------|-------|------------|-------------|------------------------------|------------------------|
| [Work within services](/use-steadybit/services/)                                                          | ✅     | ✅          | ❌           | ❌                            | ❌                      |
| [Design experiments](/use-steadybit/experiments/design.md)                                                | ✅     | ✅          | ✅           | ❌                            | ❌                      |
| [Share Experiment](/use-steadybit/experiments/share-experiment/)                                          | ✅     | ✅          | ❌           | ❌                            | ❌                      |
| [Run](/use-steadybit/experiments/run.md), and [schedule experiments](/use-steadybit/experiments/schedule) | ✅     | ✅          | ✅           | ✅                            | ❌                      |
| [Capture properties](/use-steadybit/experiments/properties/)                                              | ✅     | ✅          | ✅           | [☑️](#user-content-fn-5)[^5] | ❌                      |
| [View experiments](/use-steadybit/experiments/)                                                           | ✅     | ✅          | ✅           | ✅                            | ✅                      |
| [Stop experiments](/use-steadybit/experiments/)                                                           | ✅     | ✅          | ✅           | ✅                            | ✅                      |
| Stop all experiments via [emergency stop](../../use-steadybit/experiments/emergencyStop.md)               | ✅     | ✅          | ✅           | ✅                            | ✅                      |

[^1]: Unless synced via [LDAP](/install-and-configure/install-on-prem-platform/ldap-integration.md)

[^2]: Team owners can [add/delete team members](./teams.md#managing-team-members) and [delete teams](./teams.md)

[^3]: Unless [disabled via configuration](/install-and-configure/install-on-prem-platform/advanced-configuration.md)

[^4]: A member of a team that an experiment has been [shared with](/use-steadybit/experiments/share-experiment/)

[^5]: Properties for a run can be edited by shared-with team member; Properties for the design not