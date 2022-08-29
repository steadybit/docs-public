# Advanced Agent Authentication

By default, the agent uses the agent key to authenticate itself to the platform. There is only a single unique agent key, which you need to use in all your environments, stages, and for all teams. If you need more security, you can set up agent and platform to use OAuth 2.0.\
\
The agent will request a token from the issuer using the client credentials flow and pass it to the platform. Tokens are required as soon, as you set the properties in your platform. The platform will ignore the incoming tokens if you only set the agent properties.

This settings are only available for On-Prem installations.

#### Agent Settings

| Environment Variable                        | Description                                                                                                                           |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `STEADYBIT_AGENT_AUTH_PROVIDER`             | <p>The provider to use - <code>OAUTH2</code> if you like to use OAuth 2.0.</p><p><strong>Default:</strong> <code>AGENT-KEY</code></p> |
| `STEADYBIT_AGENT_AUTH_OAUTH2_CLIENT_ID`     | The public identifier of your OAuth 2.0 Client                                                                                        |
| `STEADYBIT_AGENT_AUTH_OAUTH2_CLIENT_SECRET` | The client secret                                                                                                                     |
| `STEADYBIT_AGENT_AUTH_OAUTH2_ISSUER_URI`    | The issuer uri                                                                                                                        |
| `STEADYBIT_AGENT_AUTH_OAUTH2_AUDIENCE`      | Optional - Some provider needs the audience parameter to authenticate the client.                                                     |

#### Platform Settings

| Environment Variable                     | Description                                                                                                                           |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `STEADYBIT_AUTH_AGENT_PROVIDER`          | <p>The provider to use - <code>OAUTH2</code> if you like to use OAuth 2.0.</p><p><strong>Default:</strong> <code>AGENT-KEY</code></p> |
| `STEADYBIT_AUTH_AGENT_OAUTH2_ISSUER_URI` | The issuer uri                                                                                                                        |
