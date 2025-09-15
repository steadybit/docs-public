# Syncing Teams via OIDC Attribute

This feature allows dynamic synchronization of teams between your identity provider (IdP) and the Steadybit platform. By leveraging an OIDC attribute, you can automatically map or create teams in Steadybit based on the values provided in the OIDC token. This streamlines onboarding and team management, ensuring that users are assigned to the appropriate teams during authentication.


## Overview

When a user authenticates via OIDC, the token can include a claim (attribute) containing an array of team identifiers. The platform reads this claim and performs the following actions:
- Team Mapping: If a team referenced in the token already exists in the platform, the user is added as a member.
- Team Creation: If a team does not exist, it is created automatically and the user is assigned to it.
- Default Role: Each authenticated user is granted the default platform role of `user`. Note that dynamic mapping only applies to teams, not to platform roles such as `admin` or team owner. Platform roles must be assigned separately (for example via manual configuration).

## Configuration Parameter

The behavior of the team synchronization can be customized using the configuration parameter:

```
STEADYBIT_AUTH_OAUTH2_CLAIMS_TEAM_NAME_ATTRIBUTE_NAME
```


- Purpose:
Specifies the name of the OIDC token claim to be used for team mapping. By default, the platform expects the claim to be named `groups`. However, you can change it to another attribute (e.g., mygroups) that your IdP provides.

- Usage Example:
If your IdP sends team information in a claim called mygroups, set the configuration as follows:

```
  STEADYBIT_AUTH_OAUTH2_CLAIMS_TEAM_NAME_ATTRIBUTE_NAME=mygroups
  STEADYBIT_AUTH_OAUTH2_SCOPE=openid,profile,email,mygroups
```

## Scoping:

If the claim used for the team association is not returned by default, you need to request it by the scope parameter in your OIDC configuration. 

For example, if your IdP sends team information in a claim called mygroups, set the configuration as follows.

The scopes "openid,profile,email" must always be included in the request.

```
  STEADYBIT_AUTH_OAUTH2_SCOPE=openid,profile,email,mygroups
```

## How It Works
1. Token Processing:
  During authentication, the platform inspects the OIDC idToken for the specified claim. The claim must contain an array of team keys (e.g., ["ADM", "TEAM1", "TEAM2"]).

2. Team Assignment:
- Existing Teams:
If a team identified by a key (e.g., ADM or TEAM1) already exists, the user is automatically added as a member.
- New Teams:
If a team (e.g., TEAM2) does not exist, it is created dynamically, and the user is added as a member.

3. Limitations:
- Dynamic Mapping:
The dynamic mapping feature applies solely to teams. Users will not be assigned platform roles (e.g., admin or team owner) via this mechanism. Platform roles are managed separately (for instance, the very first user logging in during setup or via manual assignment).
- IdToken Requirement:
The claim containing the team information must be included in the idToken (and not only in the access token).


### Example OIDC Token Claim

Below is an example payload from an OIDC idToken that includes the team mapping information under the custom attribute mygroups:

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

In this example, the claim named `mygroups` is used to identify the teams. Based on this configuration, the platform will:
- Assign the user to the existing teams ADM and TEAM1.
- Create the new team TEAM2 (if it does not already exist) and add the user as a member.

## Troubleshooting
If team synchronization is not working as expected, consider the following:

- Claim Name Mismatch:
Ensure that the claim name in your OIDC token matches the value set in STEADYBIT_AUTH_OAUTH2_CLAIMS_TEAM_NAME_ATTRIBUTE_NAME. For instance, if your IdP sends teams under groups but the parameter is set to mygroups, the teams will not be mapped.


- Claim Location:
Verify that the team attribute is present in the idToken. The dynamic mapping only processes claims in the idToken, not in the access token.


- Token Content:
Confirm that the claim contains a valid array of team keys (e.g., ["ADM", "TEAM1"]).


- Missing groups claim in Okta:
Make sure the group claims is requested as described above and the [Okta application is configured correctly](https://developer.okta.com/docs/guides/customize-tokens-groups-claim/main/#add-a-groups-claim-for-the-org-authorization-server)
