# Advanced Agent Authentication

{% hint style="info" %}
This part of the documentation is only intended in the context of a supported PoC (Proof of Concept) together with the Steadybit team.
Please, [book an appointment](https://www.steadybit.com/request-demo) to scope your PoC before continuing to evaluate the on-prem solution.

If you just want to try out Steadybit, we recommend you [sign up for our SaaS platform](https://signup.steadybit.com).
{% endhint %}

## Agent authentication using agent-key

By default, the agents are authenticating using the configured agent-key.\
This key is global and all the same for all agents of your organization.

{% hint style="warning" %}
In case your agent key got compromised and you need to rotate the agent key, contact our [support](mailto:support@steadybit.com).
{% endhint %}

## Agent Authentication using [OpenID Connect](https://openid.net/connect/)

If you want to have more security controls, you can use OIDC for the agent authentication instead of the agent key. This requires a OIDC identity provider (e.g. Keycloak).

For each request to the platform the agent will use an access token which was issued by the identity provider. The platform verifies the token.

### Platform Configuration

To instruct the platform to validate all incoming agent requests against a specific identity provider,  set `STEADYBIT_AUTH_AGENT_PROVIDER=OAUTH2` and the  `STEADYBIT_AUTH_AGENT_OAUTH2_ISSUER_URI` to the issuer URI of your identity provider.

All options are described in [Platform Configuration Options](advanced-configuration.md#openid-connect-authentication).

### Agent Configuration

To tell the agent to use OIDC, set `STEADYBIT_AGENT_AUTH_PROVIDER=OAUTH2`, `STEADYBIT_AGENT_AUTH_OAUTH2_ISSUER_URI` to the issuer URI of your identity provider and the `STEADYBIT_AGENT_AUTH_OAUTH2_CLIENT_ID` to the client id to use.\
Alternatively instead of using the issuer URI you can directly configure the `STEADYBIT_AGENT_AUTH_OAUTH2_TOKEN_URI` to tell the agents where to get the access tokens from, this won't try to read the OIDC discovery endpoint.

All options are described in [Agent Configuration Options](docs-public/install-and-configure/install-agents-legacy/advanced-configuration.md).

#### Using client credentials flow

To use the client credentials flow you need to set the `STEADYBIT_AGENT_AUTH_OAUTH2_CLIENT_SECRET` to the client secret.

#### Using password flow (with credentials or mutual TLS)

For using username and password set `STEADYBIT_AGENT_AUTH_OAUTH2_AUTHORIZATION_GRANT_TYPE=password` and provide a username and password with `STEADYBIT_AGENT_AUTH_OAUTH2_USERNAME` and `STEADYBIT_AGENT_AUTH_OAUTH2_PASSWORD`.

For using mutual TLS specify PEM-files containing a X.509 certificate and a PKCS#8 private key by setting `STEADYBIT_AGENT_AUTH_OAUTH2_CLIENT_CERT_KEY_FILE` and `STEADYBIT_AGENT_AUTH_OAUTH2_CLIENT_CERT_CHAIN_FILE`. In case the key is encrypted you can specify the password using `STEADYBIT_AGENT_AUTH_OAUTH2_CLIENT_CERT_PASSWORD`.\
The agent will re-load the certificates when the file changes automatically, but it might take up to ten seconds.
