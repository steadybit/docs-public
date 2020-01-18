---
title: "Permissions"
---

The roles in chaosmesh are associated with permissions, which cannot be altered.
See the table for the permissions:

| Permission/Role        |  Admin  | Team Owner | Team Member | Any Authenticated User |
|------------------------|---------|------------|-------------|------------------------|
| Remove User            |   <1>   |            |             |                        |
| Change User Role       |   <1>   |            |             |                        |
| Create Team            |   <1>   |            |             |                        |
| Delete Team            |   <1>   |    <1>     |             |                        |
| Manage Team Members    |   <1>   |    <1>     |             |                        |
| Manage Access Tokens   |    x    |     x      |             |                        |
| Edit Team Restrictions |    x    |     x      |             |                        |
| Create Experiment      |         |     x      |       x     |                        |
| Edit Experiment        |         |     x      |       x     |                        |
| Delete Experiment      |    x    |     x      |       x     |                        |
| Run Experiment         |         |     x      |       x     |                        |
| Schedule Experiment    |         |     x      |       x     |                        |
| Stop Experiment        |         |            |             |            x           |
| View Experiment        |         |            |             |            x           |
| Stop all Attacks       |         |            |             |            x           |
| Resume all Attacks     |         |            |             |            x           |
| Database Export        |  <2>    |            |             |                        |

<1> unless synced via LDAP
<2> unless disabled via configuration
