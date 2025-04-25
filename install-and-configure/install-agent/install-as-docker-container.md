# Install using Docker Compose

This method will install the Steadybit Agent on your machine using Docker compose. It will run the agent as well as the [extension-http](https://hub.steadybit.com/extension/com.steadybit.extension_http), [extension-container](https://hub.steadybit.com/extension/com.steadybit.extension_container), and [extension-host](https://hub.steadybit.com/extension/com.steadybit.extension_host).

## Prerequisites

To install the agent, you must be able to access the following URLs via HTTPS (443) on your target environment:

* https://platform.steadybit.com (Platform)
* https://get.steadybit.com (Setup Scripts)
* https://ghcr.io and https://github.com (Container Images)

## Supported Platforms:

* Linux (needs the Docker and Docker compose plugin installed)
* Windows (using Docker Desktop using the WSL2 engine)
* MacOS (using Docker Desktop)

{% hint style="warning" %}
**Docker Desktop:** You're only able to attack containers and processes running on Docker

**Windows Subsystem for Linux:** With the default Kernel you won't be able to execute network attacks.
{% endhint %}

## Agent Installation

To deploy the agent to Docker, you can copy the installation script from the [setup page](https://platform.steadybit.com/settings/agents/setup) in the SaaS platform.

Alternatively, you can update and run the script below with your agent key, which you find in the platform's [setup page](https://platform.steadybit.com/settings/agents/setup):

```bash
wget https://get.steadybit.com/agent.sh
chmod a+x agent.sh
./agent.sh --key <agent-key> <command>
```

| Parameter        | Description                                                                                                          | Default                          |
| ---------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `<command>`      | The action to take. Either one of `up`, `down`, `restart`, `config`                                                  | `up`                             |
| `--key`          | The agent key. Can be found on your platform's \[https://platform.steadybit.com/settings/agents/setup]\(setup page). |                                  |
| `--platform-url` | If running on-prem, the url of your platform installation to use                                                     | `https://platform.steadybit.com` |
| `--image`        | The Agent Docker image to use.                                                                                       | `steadybit/agent:latest`         |

{% hint style="info" %}
In case you don't want to deploy to Docker directly using the script or you need to modify it, you can use the `config` command to print the Docker compose configuration and apply it yourself.
{% endhint %}

### Configure HTTP Proxy Server

The Steadybit Agent uses HTTP and websockets to communicate with the platform. To simplify the agent deployment, consider to allow direct communication to our platform.

If a single entry into and out of your network is required, you can configure the agent to use an HTTP proxy. Export the following environment variables before running the script or edit the Docker compose configuration printed by the `config` command.

```bash
export STEADYBIT_AGENT_PROXY_HOST="<hostname or address of your proxy>" 
export STEADYBIT_AGENT_PROXY_PORT="<port of your proxy>" 
export STEADYBIT_AGENT_PROXY_PROTOCOL="<proxy protocol e.g. http>" 
export STEADYBIT_AGENT_PROXY_USER="<username of the proxy (if needed)>" 
export STEADYBIT_AGENT_PROXY_PASSWORD="<password of the proxy (if needed)>"
./agent.sh --key <agent-key> <command>
```

## Additional Extensions

To use additional extensions (e.g. [extension-jvm](https://hub.steadybit.com/extension/com.steadybit.extension_jvm) for attacking Java applications), you need to edit the Docker compose file generated using the `config` command: Add the extension as an additional service in the Docker compose and register it via environment variables to the agent. See [extension installation](../../integrate-with-steadybit/extensions/extension-installation.md) to learn more about extension registration.
