---
title: "Permissions"
---

The roles in Steadybit are associated with permissions, which cannot be altered.
See the table for the permissions:

| Permission/Role                                                             | Admin | Team Owner | Team Member | Any Authenticated User |
|-----------------------------------------------------------------------------|-------|------------|-------------|------------------------|
| Change User Role (Admin, User)                                              | <1>   |            |             |                        |
| Remove User                                                                 | <1>   |            |             |                        |
| Create Team                                                                 | <1>   |            |             |                        |
| Delete Team                                                                 | <1>   | <1>        |             |                        |
| Manage* Team Members                                                        | <1>   | <1>        |             |                        |
| Manage* Access Tokens                                                       | x     | x          |             |                        |
| Edit Team Permissions                                                       | x     |            |             |                        |
| Manage* Experiment Templates                                                | x     |            |             |                        |
| Manage* Experiments                                                         |       | x          | x           |                        |
| Use Experiment Templates                                                    |       | x          | x           |                        |
| Run Experiment                                                              |       | x          | x           |                        |
| Stop Experiment                                                             |       |            |             | x                      |
| View Experiment                                                             |       |            |             | x                      |
| [Emergency Stops](../../use-steadybit/experiments/README.md#Emergency-Stop) |       |            |             | x                      |
| Database Export                                                             | <2>   |            |             |                        |

- \* Manage means create, update and delete
- <1> unless synced via LDAP
- <2> unless disabled via configuration
