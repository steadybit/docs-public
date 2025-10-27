---
title: OIDC Integration
navTitle: OIDC Integration
---

# OIDC Integration

The Steadybit Platform supports integration with OpenID Connect (OIDC) into a centralized user management. 
This integration enables OIDC-based authentication and automatic team membership assignment.

## Activation

To enable the OIDC integration, set the following environment variable:

```
STEADYBIT_AUTH_PROVIDER=OAUTH2
```

You can use an OIDC compatible authentication provider for user authentication.

| Config        | Value                                      |
|---------------|--------------------------------------------|
| Grant type    | `authorization_code`                       |
| Redirect uri  | `https://<host>/oauth2/login/code/default` |
| Login url     | `https://<host>/login`                     |
| Response type | `code`                                     |

Be aware to configure your ingress / loadbalancer to set the `X-Forwarded-Proto` and `x-forwarded-for` headers. Otherwise, the correct redirect URL will not be generated.

## Authentication

{% hint style="info" %}
The first user to sign in will be assigned the `admin` role; all others will be assigned the `user` role.
{% endhint %}

To connect to a compatible Identity Provider (IdP) set the following environment variables:

- `STEADYBIT_AUTH_OAUTH2_ISSUER_URI`: URI for the OpenID Connect discovery endpoint
- `STEADYBIT_AUTH_OAUTH2_CLIENT_ID`: The client ID to use for the OIDC registration
- `STEADYBIT_AUTH_OAUTH2_CLIENT_SECRET`: The client secret to use for the OIDC registration

When a user authenticates via OIDC in the Steadybit Platform for the first time, a corresponding Steadybit user object is created.
The user has the type `user` (see [Permissions](../manage-teams-and-users/permissions.md)) and is not assigned to any team.

For detailed OIDC authentication configuration parameters, refer to [OpenID Connect Authentication](./advanced-configuration.md#openid-connect-authentication).

## Synchronization

To automate team assignment, the IdP can return a token with a claim (attribute) containing team identifiers (team keys), the user should be assigned to.

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
   - Look up the corresponding team in Steadybit.
   - If the team does not exist, create it.
   - Assign the authenticated user to the team with the role `member`.

**Note**: Team memberships can also be managed manually. A user is not automatically removed from a team if the team key is not present in the claim.

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
