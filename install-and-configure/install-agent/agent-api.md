# Agent API

The Agent provides some HTTP endpoints to interact with the agent itself. It's only needed for advanced use cases, like debugging, troubleshooting or for example manual extension registrations.

The agent listens on port `42899` by default.

## Swagger UI & Spec

The Spec is available at `http(s)://<host>:42899/spec`.

Swagger UI is available at `http(s)://<host>:42899/swagger-ui/index.html`.

## Authentication

Modifying endpoints require basic authentication. The default username is `_` with the agent-key as password.

Credentials might be changed using the properties `steadybit.agent.api.auth.username` and `steadybit.agent.api.auth.password` in the agent configuration.
