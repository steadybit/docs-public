---
title: Permissions
---

# Permissions

The roles in Steadybit are associated with permissions, which cannot be altered. See the table for the permissions:

<table>
<tr>
<th>Head</th>
<th>Table</th>
</tr>
</table>

| Permission/Role                                                                                                   | Admin | Team Owner | Team Member | Any Authenticated User |
|-------------------------------------------------------------------------------------------------------------------|-------|------------|-------------|------------------------|
<td colspan='3'>**Administration (Permissions and Integrations)**</td>
| Manage[^2] Users                                                                                                  | x[^1] |            |             |                        |
| Manage[^3] Teams                                                                                                  | x[^1] |            |             |                        |
| Manage[^4] Team Permissions                                                                                       | x     |            |             |                        |
| Manage[^5] Environments                                                                                           | x     |            |             |                        |
| Manage[^6] Access Tokens                                                                                          | x     | x          |             |                        |
| **Infrastructure and Integration**                                                                                |       |            |             |                        |
| Add Agents                                                                                                        | x     |            |             |                        |
| Manage[^7] Integrations                                                                                           | x     | x          |             |                        |
| View Audit Log                                                                                                    | x     |            |             |                        |
| **Prepare Rollout**                                                                                               |       |            |             |                        |
| Manage[^8] Service Profiles                                                                                       | x     |            |             |                        |
| Manage[^9] Services                                                                                               | x     | x          |             |                        |
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
* <2> unless disabled via configuration

[^1]: unless synced via LDAP

[^2]: Invite/remove users, [change user roles](./users.md#role-types)

[^3]: Add/delete Teams, Edit Team Members

[^4]: Configure Allowed environments/actions

[^5]: Add/edit/delete [environments](/install-and-configure/manage-environments/)

[^6]: Add/recreate/delete [access tokens](/integrate-with-steadybit/api/)

[^7]: Add / edit / delete [platform integrations](/integrate-with-steadybit/) like Slack Integration, Webhooks, and Preflight Actions

[^8]: Add / edit / delete [service profile](/install-and-configure/manage-service-profiles/), set a profile as default

[^9]: Add / edit / delete [service](/use-steadybit/services/)