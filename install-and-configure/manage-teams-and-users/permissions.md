---
title: Permissions
---

# Permissions

The roles in Steadybit are associated with permissions, which cannot be altered. See the table for the permissions:

<table>
    <tr>
        <th>Permission/Role</th>
        <th>Admin</th>
        <th>Team Owner</th>
        <th>Team Member</th>
        <th>Any Authenticated User</th>
    </tr>
    <tr>
        <td colspan="5">**Administration (Permissions and Integrations)**</td>
    </tr>
    <tr>
        <td>Manage[^2] Users</td>
        <td>x[^1]</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Manage[^3] Teams</td>
        <td>x[^1]</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Manage[^4] Team Permissions</td>
        <td>x</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Manage[^5] Environments</td>
        <td>x</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Manage[^6] Access Tokens</td>
        <td>x</td>
        <td>x</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Add Agents</td>
        <td>x</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Manage[^7] Integrations</td>
        <td>x</td>
        <td>x</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>View Audit Log</td>
        <td>x</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Database Export</td>
        <td>x[^8]</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td colspan="5">**Prepare Rollout**</td>
    </tr>
    <tr>
        <td>Manage[^9] Services</td>
        <td>x</td>
        <td>x</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Manage[^10] Service Profiles</td>
        <td>x</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Manage[^11] Experiment Templates</td>
        <td>x</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td colspan="5">**Validate and Improve Reliability of Your Infrastructure (Services, Experiments)**</td>
    </tr>
    <tr>
        <td>Work[^12] within Services</td>
        <td>x</td>
        <td>x</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Design and run[^13] Experiments</td>
        <td>x</td>
        <td>x</td>
        <td>x</td>
        <td></td>
    </tr>
    <tr>
        <td>View Experiments</td>
        <td>x</td>
        <td>x</td>
        <td>x</td>
        <td>X</td>
    </tr>
    <tr>
        <td>Stop Experiments</td>
        <td>x</td>
        <td>x</td>
        <td>x</td>
        <td>X</td>
    </tr>
    <tr>
        <td>Stop all Experiments via [Emergency Stop](../../use-steadybit/experiments/#Emergency-Stop)</td>
        <td>x</td>
        <td>x</td>
        <td>x</td>
        <td>X</td>
    </tr>

</table>

| Database Export                                                                                                   | <2>   |            |             |                        |

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