# Agent State

The agent keeps most of its state in memory.

However, some information is persisted to ensure that the agent can recover from a restart.

## Configuration

The default state provider is a file-based provider that stores the agent's state by default in the directory `/var/lib/steadybit-agent`. The path can be configured via the `STEADYBIT_AGENT_STATE_PATH` environment variable. The helm chart is, by default, creating a statefulset with a persistent volume claim to store the agent's state.

Another option is to use [Redis](https://redis.io/) as a state provider. The following set of environment variables can be used to configure this.

| Environment Variable                      | Required | Description                                                                                  |
| ----------------------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| `STEADYBIT_AGENT_IDENTIFIER`              | yes      | The unique agent identifiert, required if `redis` is used. Should be stable across restarts. |
| `STEADYBIT_AGENT_STATE_PROVIDER`          | yes      | Needs to be set to `redis`                                                                   |
| `STEADYBIT_AGENT_STATE_REDIS_HOST`        | yes      | The redis host                                                                               |
| `STEADYBIT_AGENT_STATE_REDIS_PORT`        | no       | The redis port, defaults to `6379`                                                           |
| `STEADYBIT_AGENT_STATE_REDIS_USERNAME`    | no       | The redis username                                                                           |
| `STEADYBIT_AGENT_STATE_REDIS_PASSWORD`    | no       | The redis password                                                                           |
| `STEADYBIT_AGENT_STATE_REDIS_DB`          | no       | The redis database, defaults to `0`                                                          |
| `STEADYBIT_AGENT_STATE_REDIS_SSL_ENABLED` | no       | Should SSL be used                                                                           |

## Extension Registrations

The agent persists extension registrations to ensure they are not lost after a restart. Extension registrations can be maintained via the agent API, see [Extension Registration](extension-registration.md).

If redis is used as the state provider, existing file-based extension registrations are ignored.

Auto discovered extensions from Kubernetes are independently registered and not persisted via the configured persistence provider. They are also not visible or manageable via the agent API.

## Execution State

The agent keeps track of an experiment's current execution state. This state is persisted so that actions can be rolled back in case of an agent restart.
