# Install using Docker Compose

This method will install the Steadybit outpost agent on your machine using docker compose. It will run the Outpost agent as well as
the [extension-http](https://hub.steadybit.com/extension/com.github.steadybit.extension\_http), [extension-container](https://hub.steadybit.com/extension/com.github.steadybit.extension\_container)
and [extension-host](https://hub.steadybit.com/extension/com.github.steadybit.extension\_host).

#### Supported Platforms:

* Linux (needs the docker and docker compose plugin installed)
* Windows (using Docker Desktop using the WSL2 engine)
* MacOS (using Docker Desktop)

{% hint style="warning" %}
**Docker Desktop:** You're only able to attack containers and processes running on Docker

**Windows Subsystem for Linux:** With the default Kernel you won't be able to execute network attacks.
{% endhint %}

### Outpost Installation

We do provide a simple wrapper script that you can use to deploy the outpost agent to docker:

```bash
wget https://get.steadybit.com/outpost.sh
chmod a+x outpost.sh
./outpost.sh --key <agent-key> <command>
```

<table><thead><tr><th width="200.33333333333331">Parameter</th><th>Description</th><th>Default</th></tr></thead><tbody><tr><td>&#x3C;command></td><td>The action to take. Either one of  <code>up</code>, <code>down</code>, <code>restart</code>, <code>config</code></td><td><code>up</code></td></tr><tr><td><code>--key</code></td><td>The agent key, can be found on the <a href="https://platform.steadybit.com/settings/agents/setup">setup page</a>.</td><td></td></tr><tr><td><code>--platform-url</code></td><td>If running on-prem, the url of your platform installation to use</td><td><code>https://platform.steadybit.com</code></td></tr><tr><td><code>--image</code></td><td>The Outpost Docker image to use.</td><td><code>steadybit/outpost:latest</code></td></tr></tbody></table>

| Parameter        | Description                                                                                                        | Default                          |
|------------------|--------------------------------------------------------------------------------------------------------------------|----------------------------------|
| `<command>`      | The action to take. Either one of `up`, `down`, `restart`, `config`                                                | `up`                             |
| `--key`          | The agent key. Can be found on your platform's [https://platform.steadybit.com/settings/agents/setup](setup page). |                                  |
| `--platform-url` | If running on-prem, the url of your platform installation to use                                                   | `https://platform.steadybit.com` |
| `--image`        | The Outpost Docker image to use.                                                                                   | `steadybit/outpost:latest`       |


{% hint style="info" %}
In case you don't want deploy to docker directly using the script or you need to modify it, you can use the `config` command to print the docker
compose configuration and apply it yourself.
{% endhint %}

#### Additional Extensions

If you want to use additional extensions (e.g [extension-jvm](https://hub.steadybit.com/extension/com.github.steadybit.extension\_jvm) for attacking Java
applications), you need to edit the docker compose file generated using the `config` command. You need to add the extension as an additional service in the
docker compose and register it via environment variables to the
agent. [More about extension registration](../../integrate-with-steadybit/extensions/extension-installation.md)

### Configure HTTP Proxy Server&#x20;

The Steadybit Outpost uses HTTP and websockets to communicate with the platform. To simplify the outpost deployment, you should consider allowing direct
communication to our platform.&#x20;

In case a single entry into and out of your network is required, you can configure the outpost to use a HTTP proxy. Export the following environment
variables before running the script or edit the docker compose configuration printed by the `config` command

```bash
export STEADYBIT_AGENT_PROXY_HOST="<hostname or address of your proxy>" 
export STEADYBIT_AGENT_PROXY_PORT="<port of your proxy>" 
export STEADYBIT_AGENT_PROXY_PROTOCOL="<proxy protocol e.g. http>" 
export STEADYBIT_AGENT_PROXY_USER="<username of the proxy (if needed)>" 
export STEADYBIT_AGENT_PROXY_PASSWORD="<password of the proxy (if needed)>"
./outpost.sh --key <agent-key> <command>
```
