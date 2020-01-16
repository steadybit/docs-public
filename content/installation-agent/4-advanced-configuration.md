---
title: "Advanced Agent Configuration"
navTitle: "Advanced Configuration"
---

| agent.sh Argument | Environment Variable                                | Description
|-------------------|-----------------------------------------------------|----------------------------------------------------------------------------------------------------------
| -a                | `CHAOSMESH_AGENT_API_KEY`                           | The API key the agent uses <br/> **Example:** `abcdefghijklmn`
| -e                | `CHAOSMESH_AGENT_REGISTER_URL`                      | The baseUrl where the agent registers. <br/> **Default:** `https://platform.chaosmesh.io`
| -i                | `CHAOSMESH_AGENT_DOCKER_IMAGE`                      | The Agent Docker image to use. <br/> **Default:** `docker.chaosmesh.io/chaosmesh/agent:latest`
| -r                | `CHAOSMESH_DOCKER_REGISTRY`                         | The Agent Docker registry to use. <br/> **Default:** `docker.chaosmesh.io`
| -u                | `CHAOSMESH_DOCKER_REGISTRY_USER`                    | User for authenticating against the Docker Registry. <br/> **Default:** `_`
| -p                | `CHAOSMESH_DOCKER_REGISTRY_PASSWORD`                | Password for authenticating against the Docker Registry. <br/> **Default:** CHAOSMESH_AGENT_API_KEY
| -b                | `CHAOSMESH_DOWNLOAD_USER`                           | The User to authenticate with the feature repository <br/> **Default:** `_`
| -c                | `CHAOSMESH_DOWNLOAD_PASSWORD`                       | The Password to authenticate with the feature repository <br/> **Default:** CHAOSMESH_AGENT_API_KEY
| -l                | `CHAOSMESH_LOG_LEVEL`                               | Sets the loglevel for the com.chaosmesh logger <br/> **Default:** `INFO`
|                   | `CHAOSMESH_ROOT_LOG_LEVEL`                          | Sets the loglevel for the root logger <br/> **Default:** `ERROR`
|                   | `CHAOSMESH_LOG_CONSOLE`                             | Sets the loglevel threshold for the console logger <br/> **Default:** `ALL`
|                   | `CHAOSMESH_AGENT_REGISTER_TIMEOUT`                  | Timeout for the registration request. <br/> **Default:** `5s`
|                   | `CHAOSMESH_AGENT_REGISTER_INTERVAL`                 | The interval how often the agent registers at the platform. <br/> **Default:** `5s`
|                   | `CHAOSMESH_AGENT_EXPERIMENT_TIMEOUT`                | Timeout for the request to connect to an experiment. <br/> **Default:** `5s`
|                   | `CHAOSMESH_AGENT_EXPERIMENT_KEEP_ALIVE_INTERVAL`    | Interval how often a keep alive is sent during an experiment. <br/> **Default:** `5s`
|                   | `CHAOSMESH_AGENT_EXPERIMENT_KEEP_ALIVE_TIMEOUT`     | Timeout for a keep alive during an experiment <br/> **Default:** `5s`
|                   | `CHAOSMESH_AGENT_EXPERIMENT_KEEP_ALIVE_MISSED_ACKS` | Max. Number of missed acknowledgements during an experiment. <br/> **Default:** `5`
|                   | `CHAOSMESH_AGENT_DISCOVERY_INTERVAL`                | The interval of often the agent runs the discovery. <br/> **Default:** `5s`
|                   | `CHAOSMESH_AGENT_DISCOVERY_TIMEOUT`                 | Timeout for the discovery. <br/> **Default:** `10s`
|                   | `CHAOSMESH_DOCKER_SOCKET`                           | Docker Socket to connect to. <br/> **Default:** `/var/run/docker.sock`
|                   | `CHAOSMESH_DISCOVERY_ENV_LIST`                      | List of environment variables to inlude in the discovery <br/> **Example:** `CHAOSMESH_DISCOVERY_ENV_LIST=STAGE,REGION`
|                   | `CHAOSMESH_LABEL_*`                                 | All env vars with this prefix will be added as label <br/> **Example:** `CHAOSMESH_LABEL_STAGE=test`
|                   | `CHAOSMESH_FEATURES_UPDATE_INTERVAL`                | Update Interval for Features <br/> **Default:** `PT6H` (6 Hours)
|                   | `CHAOSMESH_AGENT_AWS_EC2_METADATA_URL`              | AWS EC2 Metadata URL <br/> **Default:** `http://169.254.169.254/latest/`
| -m                | `CHAOSMESH_MVN_REPOSITORIES`                        | chaosmesh Maven feature repositories <br/> **Default:** `https://artifacts.chaosmesh.io/repository/features-public@id=chaosmesh-features@snapshots@snapshotsUpdate=always,https://artifacts.chaosmesh.io/repository/releases-public@id=chaosmesh-releases@snapshots@snapshotsUpdate=always,https://repo1.maven.org/maven2@id=central` |
|                   | `CHAOSMESH_HTTP_ENDPOINT_PORT`                      | HTTP endpoint port for the health check url <br/> **Default:** `42999`
