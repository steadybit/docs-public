---
title: OIDC Integration
navTitle: OIDC Integration
---

# OIDC Integration

The Steadybit Platform supports integration with OpenID Connect (OIDC) for centralized user management.
This integration enables OIDC-based authentication and automatic team membership assignment.

## Activation

To enable the OIDC integration, set the following environment variable:

```
STEADYBIT_AUTH_PROVIDER=OAUTH2
```

You can use any OIDC-compatible authentication provider for user authentication.

| Config        | Value                                      |
|---------------|--------------------------------------------|
| Grant type    | `authorization_code`                       |
| Redirect URI  | `https://<host>/oauth2/login/code/default` |
| Login URL     | `https://<host>/login`                     |
| Response type | `code`                                     |

Be sure to configure your ingress or load balancer to set the `X-Forwarded-Proto` and `X-Forwarded-For` headers. Otherwise, the correct redirect URL will not be generated.

## Authentication

{% hint style="info" %}
The first user to sign in will be assigned the `admin` role; all others will be assigned the `user` role.
{% endhint %}

To connect to a compatible Identity Provider (IdP), set the following environment variables:

- `STEADYBIT_AUTH_OAUTH2_ISSUER_URI`: URI for the OpenID Connect discovery endpoint
- `STEADYBIT_AUTH_OAUTH2_CLIENT_ID`: The client ID to use for the OIDC registration
- `STEADYBIT_AUTH_OAUTH2_CLIENT_SECRET`: The client secret to use for the OIDC registration

When a user authenticates via OIDC in the Steadybit Platform for the first time, a corresponding Steadybit user object is created.
The user has the type `user` (see [Permissions](../manage-teams-and-users/permissions.md)). If the ID token contains a groups claim, the user is automatically assigned to the corresponding teams (see [Synchronization](#synchronization)).

For detailed OIDC authentication configuration parameters, refer to [OpenID Connect Authentication](./advanced-configuration.md#openid-connect-authentication).

## Synchronization

To automate team assignment, the IdP can return a token with a claim (attribute) containing the team identifiers (team keys) the user should be assigned to.

### Configuration

Configure the name of the OIDC token claim used for team mapping with the following environment variable:

```
STEADYBIT_AUTH_OAUTH2_CLAIMS_TEAM_NAME_ATTRIBUTE_NAME
```

- The claim value must be a JSON array of team keys (for example, `["ADM", "TEAM1", "TEAM2"]`).
- By default, the platform expects the claim to be named `groups`. You can change it to any other claim name your IdP provides.
- Additional OAuth-related configuration options are listed under [OpenID-Connect authentication](./advanced-configuration.md#openid-connect-authentication).

#### Usage example

If the IdP returns team names in a claim called `mygroups`, configure:

```
STEADYBIT_AUTH_OAUTH2_CLAIMS_TEAM_NAME_ATTRIBUTE_NAME=mygroups
```

#### Team Key Pattern

By default the team key is the first 16 characters of the claim value. If your group names share a long common prefix (for example `steadybit-team-platform` and `steadybit-team-payments`), the first 16 characters collide and both groups would map to the same team. Configure a regular expression whose first capture group selects the part of the group name that should become the team key:

```
STEADYBIT_AUTH_OAUTH2_TEAM_KEY_PATTERN=^steadybit-team-(.+)$
```

- The captured text is uppercased, runs of characters other than letters, digits and `_` are replaced by `_`, and the result is cut to 16 characters.
- The pattern is matched with "find" semantics, so an unanchored pattern matches anywhere in the value. Anchor it with `^` and `$` to require a full match.
- The pattern is compiled in DOTALL mode, so `.` also matches line breaks inside a group name.
- Claim entries the pattern does not match are ignored and do not create a team, so the pattern also restricts synchronization to a subset of the groups your IdP returns.
- The default is `^(.{0,16})`. Changing the pattern changes the keys derived for existing groups: the next login creates the teams anew under the new keys and removes the user's OIDC-managed memberships from the teams under the old keys. The old teams themselves, and any experiments they own, are kept, but nobody is assigned to them by OIDC anymore. Decide on the pattern before teams have accumulated experiments, or move the experiments afterwards.
- The same option exists for LDAP synchronization as `STEADYBIT_AUTH_LDAP_SYNC_TEAM_KEY_PATTERN`. Note that LDAP synchronization deletes previously synchronized teams whose keys no longer appear in the directory, so changing the pattern there deletes the teams under the old keys together with their experiments.

#### Scoping

If the claim used for team association is not included by default, request it via the scope parameter in your OIDC configuration.

For example, if your IdP sends team information in a claim called `mygroups`, configure:

```
STEADYBIT_AUTH_OAUTH2_SCOPE=openid,profile,email,mygroups
```

The scopes `openid,profile,email` must always be included in the request.

### How it works

During authentication, the platform inspects the returned OIDC ID token for the configured claim and expects an array of team keys (for example, `["ADM", "TEAM1", "TEAM2"]`). The process is as follows:

1. Read the configured claim from the ID token and validate that it is an array of strings.
2. For each team key:
   - The team key is derived from the claim value: by default the first 16 characters, with runs of characters other than letters, digits and `_` replaced by `_` and the result uppercased (for example, `"my-developers"` becomes `MY_DEVELOPERS`). The full claim value is used as the team name. See [Team key pattern](#team-key-pattern) to change how the key is extracted.
   - Look up the corresponding team in Steadybit.
   - If the team does not exist, create it.
   - Assign the authenticated user to the team with the role `member`.
3. Remove the user from any OIDC-managed teams that are no longer present in the claim. If the claim is empty or absent, the user is removed from all OIDC-managed teams.

Teams and memberships created through OIDC synchronization are marked as **managed by OIDC**. This has the following effects:

- **Team key** of OIDC-managed teams cannot be edited by platform admins — it is controlled by the IdP.
- **Team name** of OIDC-managed teams can be edited by platform admins. The IdP-provided name is used when the team is first created; subsequent OIDC syncs do not overwrite the team name, so renames made in Steadybit are preserved.
- **OIDC-managed members** cannot be removed from teams via the UI or API by platform admins. Membership changes must be made in the IdP.
- **Manually added members** on an OIDC-managed team are preserved and can be managed normally. OIDC synchronization only affects OIDC-managed memberships.
- Other team properties (description, allowed environments, allowed actions) remain editable by admins.

### Limitations

- Scope of mapping: The dynamic mapping feature applies only to teams. Users are not assigned platform roles (for example, `admin`) or team-specific roles (for example, `team owner`) via this mechanism. Platform and team roles are managed separately (for example, during initial setup or by manual assignment).

- ID token requirement: The claim containing the team information must be included in the OIDC ID token. Claims present only in the access token are not processed for team mapping.

#### Example OIDC token

Below is an example payload from an OIDC ID token that includes team mapping information in the custom attribute `mygroups`:

```json
{
  "header": {
    "alg": "RS256",
    "typ": "JWT",
    "kid": "xxx"
  },
  "payload": {
    "usernames": ["auth0|1234", "google-oauth2|123"],
    "mygroups": ["TEAM1", "TEAM2", "ADM"],
    "nickname": "ansgar",
    "name": "max musterman",
    "picture": "https://s.gravatar.com/avatar/xxx?s=480&r=pg&d=identicon",
    "updated_at": "2025-03-26T16:52:18.722Z",
    "email": "max@musterman.com",
    "email_verified": true,
    "iss": "https://login.example.com/",
    "aud": "123",
    "sub": "auth0|1234",
    "iat": 1234567890,
    "exp": 1234567890,
    "sid": "xxxx",
    "nonce": "xxx"
  },
  "signature": "xxx"
}
```

### Troubleshooting

If team synchronization does not work as expected, check the following:

- Claim name mismatch: Ensure that the claim name in the OIDC ID token matches the value of `STEADYBIT_AUTH_OAUTH2_CLAIMS_TEAM_NAME_ATTRIBUTE_NAME`. For example, if the IdP sends teams in the claim `groups` but the parameter is set to `mygroups`, the teams will not be mapped.

- Claim location: Verify that the team attribute is present in the ID token. Dynamic mapping only processes claims in the ID token, not in the access token.

- Token content: Confirm that the claim contains a valid JSON array of team keys (for example, `["ADM", "TEAM1"]`).

- Missing groups claim in Okta: Make sure the groups claim is requested as described above and that the [Okta application is configured correctly](https://developer.okta.com/docs/guides/customize-tokens-groups-claim/main/#add-a-groups-claim-for-the-org-authorization-server).
