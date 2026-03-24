---
title: Permissions
---

# Permissions

The roles in Steadybit are associated with permissions, which cannot be altered. See the table for the permissions:

| Permission/Role                                                                                                   | Admin | Team Owner | Team Member | Any Authenticated User |
|-------------------------------------------------------------------------------------------------------------------|-------|------------|-------------|------------------------|
| **Administration (Permissions and Integrations)**                                                                 |       |            |             |                        |
| Manage Users <br/> <small>Invite/remove users, [change user roles](./users.md#role-types)</small>                 | <1>   |            |             |                        |
| Manage Teams <br/> <small>Create/delete Teams, Edit Team Members</small>                                          | <1>   |            |             |                        |
| Manage Team Permissions <br/> <small>Configure Allowed environments/actions</small>                               | x     |            |             |                        |
| Manage\* Environments <br/> <small>Create/edit/delete environments</small>                                        | x     |            |             |                        |
| Manage\* Access Tokens <br> <small>Create/recreate/delete access tokens</small>                                   | x     | x          |             |                        |
| **Infrastructure and Integration**                                                                                |       |            |             |                        |
| Add Agents <br/> <small>Adding agents to discover more infrastructure</small>                                     | x     |            |             |                        |
| Manage\* Integrations (Slack Integration, Webhooks, Preflight Actions)                                            | x     | x          |             |                        |
| View Audit Log                                                                                                    | x     |            |             |                        |
| **Prepare Rollout**                                                                                               |       |            |             |                        |
| Manage\* Service Profiles                                                                                         | x     |            |             |                        |
| Manage\* Services                                                                                                 | x     | x          |             |                        |
| Manage\* Experiment Templates                                                                                     | x     |            |             |                        |
| **Experiments**                                                                                                   |       |            |             |                        |
| Manage\* Experiments                                                                                              | x     | x          | x           |                        |
| Schedule Experiment                                                                                               | x     | x          | x           |                        |
| Run Experiment                                                                                                    | x     | x          | x           |                        |
| Stop Experiment                                                                                                   |       |            |             | x                      |
| View Experiment                                                                                                   |       |            |             | x                      |
| [Emergency Stop](../../use-steadybit/experiments/#Emergency-Stop)                                                 |       |            |             | x                      |
| **Experiment Templates**                                                                                          |       |            |             |                        |
| Use Experiment Templates                                                                                          | x     | x          | x           |                        |
| **Services**                                                                                                      |       |            |             |                        |
| Work within Services <br/><small>Run provided experiments, assign custom experiments, follow advice (TBD)</small> | x     | x          | X           |                        |
| **Administration**                                                                                                |       |            |             |                        |
| Database Export                                                                                                   | <2>   |            |             |                        |

* \* Manage means create, update and delete
* <1> unless synced via LDAP
* <2> unless disabled via configuration