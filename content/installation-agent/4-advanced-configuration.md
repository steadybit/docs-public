---
title: "Advanced Agent Configuration"
navTitle: "Advanced Configuration"
---

| agent.sh Argument | Environment Variable                                | Description
|-------------------|-----------------------------------------------------|----------------------------------------------------------------------------------------------------------
| -a                | `STEADYBIT_AGENT_KEY`                               | The API key the agent uses <br/> **Example:** `foobar`
| -e                | `STEADYBIT_AGENT_REGISTER_URL`                      | The baseUrl where the agent registers. <br/> **Default:** `https://platform.steadybit.io`
| -i                | `STEADYBIT_AGENT_DOCKER_IMAGE`                      | The Agent Docker image to use. <br/> **Default:** `docker.steadybit.io/steadybit/agent:latest`
| -r                | `STEADYBIT_DOCKER_REGISTRY`                         | The Agent Docker registry to use. <br/> **Default:** `docker.steadybit.io`
| -u                | `STEADYBIT_DOCKER_REGISTRY_USER`                    | User for authenticating against the Docker Registry. <br/> **Default:** `_`
| -p                | `STEADYBIT_DOCKER_REGISTRY_PASSWORD`                | Password for authenticating against the Docker Registry. <br/> **Default:** STEADYBIT_AGENT_KEY
| -b                | `STEADYBIT_DOWNLOAD_USER`                           | The User to authenticate with the feature repository <br/> **Default:** `_`
| -c                | `STEADYBIT_DOWNLOAD_PASSWORD`                       | The Password to authenticate with the feature repository <br/> **Default:** STEADYBIT_AGENT_KEY
| -l                | `STEADYBIT_LOG_LEVEL`                               | Sets the loglevel for the com.steadybit logger <br/> **Default:** `INFO`
|                   | `STEADYBIT_ROOT_LOG_LEVEL`                          | Sets the loglevel for the root logger <br/> **Default:** `ERROR`
|                   | `STEADYBIT_LOG_CONSOLE`                             | Sets the loglevel threshold for the console logger <br/> **Default:** `ALL`
|                   | `STEADYBIT_LOG_FORMAT`                              | Sets the log format for the console logger (`json` or `text`) <br/> **Default:** `text`
|                   | `STEADYBIT_AGENT_REGISTER_TIMEOUT`                  | Timeout for the registration request. <br/> **Default:** `5s`
|                   | `STEADYBIT_AGENT_REGISTER_INTERVAL`                 | The interval how often the agent registers at the platform. <br/> **Default:** `5s`
|                   | `STEADYBIT_AGENT_EXPERIMENT_TIMEOUT`                | Timeout for the request to connect to an experiment. <br/> **Default:** `5s`
|                   | `STEADYBIT_AGENT_EXPERIMENT_KEEP_ALIVE_INTERVAL`    | Interval how often a keep alive is sent during an experiment. <br/> **Default:** `5s`
|                   | `STEADYBIT_AGENT_EXPERIMENT_KEEP_ALIVE_TIMEOUT`     | Timeout for a keep alive during an experiment <br/> **Default:** `5s`
|                   | `STEADYBIT_AGENT_EXPERIMENT_KEEP_ALIVE_MISSED_ACKS` | Max. Number of missed acknowledgements during an experiment. <br/> **Default:** `3`
|                   | `STEADYBIT_AGENT_DISCOVERY_INTERVAL`                | The interval of often the agent runs the discovery. <br/> **Default:** `30s`
|                   | `STEADYBIT_AGENT_DISCOVERY_TIMEOUT`                 | Timeout for the discovery. <br/> **Default:** `10s`
|                   | `STEADYBIT_AGENT_GZIP_ENABLED`                      | The interval of often the agent runs the discovery. <br/> **Default:** `true`
|                   | `STEADYBIT_DOCKER_SOCKET`                           | Docker Socket to connect to. <br/> **Default:** `/var/run/docker.sock`
|                   | `STEADYBIT_DISCOVERY_ENV_LIST`                      | List of environment variables to inlude in the discovery <br/> **Example:** `STEADYBIT_DISCOVERY_ENV_LIST=STAGE,REGION`
|                   | `STEADYBIT_LABEL_*`                                 | All env vars with this prefix will be added as label <br/> **Example:** `STEADYBIT_LABEL_STAGE=test`
|                   | `STEADYBIT_FEATURES_UPDATE_INTERVAL`                | Update Interval for Features <br/> **Default:** `PT6H` (6 Hours)
|                   | `STEADYBIT_AGENT_AWS_EC2_METADATA_URL`              | AWS EC2 Metadata URL <br/> **Default:** `http://169.254.169.254/latest/`
| -m                | `STEADYBIT_MVN_REPOSITORIES`                        | steadybit Maven feature repositories <br/> **Default:** `https://artifacts.steadybit.io/repository/features-public@id=steadybit-features@snapshots@snapshotsUpdate=always,https://artifacts.steadybit.io/repository/releases-public@id=steadybit-releases@snapshots@snapshotsUpdate=always,https://repo1.maven.org/maven2@id=central` |
|                   | `STEADYBIT_HTTP_ENDPOINT_PORT`                      | HTTP endpoint port for the health check url <br/> **Default:** `42999`
|                   | `STEADYBIT_AGENT_ACTIONS_ENABLED`                   | Should this agent be eligible for executing actions? <br/> **Default:** `true`
|                   | `STEADYBIT_REPOSITORY_PROXY_HOST`                   | Hostname of a proxy to access steadybit repository <br/>
|                   | `STEADYBIT_REPOSITORY_PROXY_PORT`                   | Port of a proxy to access steadybit repository <br/>
|                   | `STEADYBIT_REPOSITORY_PROXY_PROTOCOL`               | Protocol of a proxy to access steadybit repository <br/> **Default:** `http`
|                   | `STEADYBIT_REPOSITORY_PROXY_USER`                   | Username of a proxy to access steadybit repository <br/>
|                   | `STEADYBIT_REPOSITORY_PROXY_PASSWORD`               | Password of a proxy to access steadybit repository <br/>
