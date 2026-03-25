---
title: Permissions
---

# Permissions

The roles in Steadybit are associated with permissions, which cannot be altered. See the table for the permissions:

| Permission/Role                                                                            | Admin | Team Owner | Team Member | Any Authenticated User |
|--------------------------------------------------------------------------------------------|-------|------------|-------------|------------------------|
| **Administration (Permissions and Integrations)**                                          |       |            |             |                        |
| Manage[^2] Users                                                                           | x[^1] |            |             |                        |
| Manage[^3] Teams                                                                           | x[^1] |            |             |                        |
| Manage[^4] Team Permissions                                                                | x     |            |             |                        |
| Manage[^5] Environments                                                                    | x     |            |             |                        |
| Manage[^6] Access Tokens                                                                   | x     | x          |             |                        |
| Add Agents                                                                                 | x     |            |             |                        |
| Manage[^7] Integrations                                                                    | x     | x          |             |                        |
| View Audit Log                                                                             | x     |            |             |                        |
| Database Export                                                                            | x[^8] |            |             |                        |
| **Prepare Rollout**                                                                        |       |            |             |                        |
| Manage[^9] Services                                                                        | x     | x          |             |                        |
| Manage[^10] Service Profiles                                                               | x     |            |             |                        |
| Manage[^11] Experiment Templates                                                           | x     |            |             |                        |
| **Validate and Improve Reliability of Your Infrastructure (Services, Experiments)**        |       |            |             |                        |
| Work[^12] within Services                                                                  | x     | x          |             |                        |
| Design and run[^13] Experiments                                                            | x     | x          | x           |                        |
| View Experiments                                                                           | x     | x          | x           | X                      |
| Stop Experiments                                                                           | x     | x          | x           | X                      |
| Stop all Experiments via [Emergency Stop](../../use-steadybit/experiments/#Emergency-Stop) | x     | x          | x           | X                      |

[^1]: unless synced via LDAP

[^2]: Invite/remove users, [change user roles](./users.md#role-types)

[^3]: Add/delete Teams, Edit Team Members

[^4]: Configure Allowed environments/actions

[^5]: Add/edit/delete [environments](/install-and-configure/manage-environments/)

[^6]: Add/recreate/delete [access tokens](/integrate-with-steadybit/api/)

[^7]: Add / edit / delete [platform integrations](/integrate-with-steadybit/) like Slack Integration, Webhooks, and Preflight Actions

[^8]: Unless disabled via configuration 

[^9]: Add / edit / delete [service](/use-steadybit/services/)

[^10]: Add / edit / delete [service profile](/install-and-configure/manage-service-profiles/), set a profile as default

[^11]: Add / edit / delete [experiment templates](/install-and-configure/manage-experiment-templates/)

[^12]: Run provided experiments, assign custom experiments, follow advice (TODO)

[^13]: Add from scratch / Add via templates / Add via file upload / edit / delete / run / schedule [experiments](/use-steadybit/experiments/)