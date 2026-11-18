# Agent API

The agent provides HTTP endpoints to interact with the agent itself. You only need them for advanced use cases such as debugging, troubleshooting, or [manual extension registration](extension-registration.md).

The agent listens on port `42899` by default.

## OpenAPI Spec

The OpenAPI spec of the extension registration API is available at `http(s)://<host>:42899/spec` (JSON) and `http(s)://<host>:42899/spec.yaml` (YAML). Open it in any OpenAPI viewer.

## Access and Authentication

The agent sorts its endpoints into three groups:

| Endpoints                                                                                                                       | Who can call them                                                                                  |
|---------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| `/health`, `/health/liveness`, `/health/readiness`, `/prometheus`, `/metrics`, and `/info` (`GET` and `HEAD`)                   | Anyone, without credentials.                                                                       |
| `/env` and `/threaddump`                                                                                                        | Only the agent's own host or pod. Credentials don't grant access from elsewhere.                   |
| All other endpoints, such as `/extensions`, `/extensions/bulk`, `/discovery/targets`, `/actions/metadata`, and the OpenAPI spec | The agent's own host or pod without credentials, or any other host with HTTP basic authentication. |

The default username is `_`, with the agent key as the password. A request that sends wrong credentials is rejected, even from the agent's own host or pod.

```bash
curl -u _:<agent key> http://<host>:42899/extensions
```

You can change the credentials, or turn authentication off, with these settings:

| Environment Variable                | Property                            | Description                                                                                                                                                                           |
|-------------------------------------|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `STEADYBIT_AGENT_API_AUTH_USERNAME` | `steadybit.agent.api.auth.username` | Username for basic authentication. **Default:** `_`. The auto-registration sidecars always use `_`.                                                                                   |
| `STEADYBIT_AGENT_API_AUTH_PASSWORD` | `steadybit.agent.api.auth.password` | Password for basic authentication. **Default:** the agent key.                                                                                                                        |
| `STEADYBIT_AGENT_API_AUTH_ENABLED`  | `steadybit.agent.api.auth.enabled`  | Set to `false` to let any host call the endpoints in the last group without credentials. Use this only if your network already restricts who can reach the agent. **Default:** `true` |

Agents from 2.3.10 to 2.4.10 behave differently: only `/health` and `/prometheus` are reachable from other hosts without credentials, extension registration (`POST` and `DELETE` on `/extensions`) requires basic authentication from every host, and all other endpoints are reachable from the agent's own host or pod only.
