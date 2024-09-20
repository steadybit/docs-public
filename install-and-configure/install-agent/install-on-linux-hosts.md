# Install on Linux Hosts

This method will install the Steadybit agent on your Linux machine using the respective package managers. By default, it will install the agent as well as the extensions [extension-http](https://hub.steadybit.com/extension/com.steadybit.extension\_http), [extension-container](https://hub.steadybit.com/extension/com.steadybit.extension\_container), and [extension-host](https://hub.steadybit.com/extension/com.steadybit.extension\_host).

## Supported Package Managers

* apt
* yum / dnf

## Prerequisites

To install the agent, you must be able to access the following URLs via HTTPS (443) on your target environment:

* https://platform.steadybit.com (Platform)
* https://packages.steadybit.com (.deb and .rpm packages)
* https://get.steadybit.com (Setup Scripts)

## Agent Installation

To install the agent on your Linux system, copy the installation script from the [setup page](https://platform.steadybit.com/settings/agents/setup) in the SaaS platform.

Alternatively, you can update and run the script below with your agent key, which you find on the platform's [setup page](https://platform.steadybit.com/settings/agents/setup):

```shell
wget https://get.steadybit.com/agent-linux.sh
chmod a+x agent-linux.sh
./agent-linux.sh --key <agent-key>
```

| Parameter         | Description                                                | Default                                                                           |
| ----------------- | ---------------------------------------------------------- |-----------------------------------------------------------------------------------|
| `--key`           | The API key the agent uses                                 |                                                                                   |
| `--extensions`    | The extensions to install                                  | `steadybit-extension-host,steadybit-extension-container,steadybit-extension-http` |
| `--platform-url`  | If running on-prem, the URL of your platform installation  | `https://platform.steadybit.com`                                                  |
| `--version`       | Override the used package version                          |                                                                                   |

{% hint style="info" %}
There is a pull limit on the package repository. If you're rolling installing the packages on a huge number of servers please consider using a mirror repository.

### Configure HTTP Proxy Server

The Steadybit Agent uses HTTP and websockets to communicate with the platform and to download updates. To simplify the agent deployment, consider allowing direct communication to our platform.

If you require a single entry into and out of your network, you can configure the agent to use a proxy:

1. Edit `/etc/steadybit/agent` and set the values for these variables:

```shell
STEADYBIT_AGENT_PROXY_HOST="<hostname or address of your proxy>"
STEADYBIT_AGENT_PROXY_PORT="<port of your proxy>"
STEADYBIT_AGENT_PROXY_PROTOCOL="<proxy protocol e.g. http>"
STEADYBIT_AGENT_PROXY_USER="<username of the proxy (if needed)>"
STEADYBIT_AGENT_PROXY_PASSWORD="<password of the proxy (if needed)>"
```

2. Restart the service

When using **systemd**

```shell
systemctl daemon-reload && systemctl restart steadybit-agent
```

When using **InitV**

```shell
service steadybit-agent restart
```

### Configure container runtime

For linux installations the docker runtime is auto-configured by the extension by looking at the system paths. If you freshly installed docker etc., please restart your host or the needed services.

If this is incorrect auto-configured it can be set in `/etc/steadybit/extension-container` using `STEADYBIT_EXTENSION_CONTAINER_SOCKET` and `STEADYBIT_EXTENSION_CONTAINER_RUNTIME`

## Managing the Agent and Extension

### Logs

The logs for agent and extensions are located in `/var/log/steadybit-*.log`

### Configuration

The configurations for agent and extensions are located in `/etc/steadybit`

### Start/Stop

When using **systemd**

```shell
systemctl start steadybit-agent
systemctl stop steadybit-agent
systemctl restart steadybit-agent
```

When using **InitV**

```shell
service steadybit-agent start
service steadybit-agent stop
service steadybit-agent restart
```

The same applies to extensions. The services are named `steadybit-extension-*`.

## Removing the Agent

Remove the packages using the package manager:

```shell
apt-get remove --purge steadybit-agent \
  steadybit-extension-http \
  steadybit-extension-container \
  steadybit-extension-host
```

Or when using yum:

```shell
yum remove steadybit-agent \
  steadybit-extension-http \
  steadybit-extension-container \
  steadybit-extension-host
```

## Additional Extensions

If you want to use additional extensions (e.g. [extension-jvm](https://hub.steadybit.com/extension/com.steadybit.extension\_jvm) for attacking Java applications), you can apply the `--extensions` parameter.

<pre><code><strong>./agent-linux.sh --key &#x3C;agent-key> --extensions steadybit-extension-host,steadybit-extension-container,steadybit-extension-http,steadybit-extension-jvm
</strong></code></pre>

## Using a single agent across multiple hosts

By default the `agent-linux.sh` installs the agent and extension on a single host. When installed on multiple hosts, each runs an agent instance, allocating many resources. Installing the agent on a dedicated host and only the container and host extension on each host is possible.

#### Non-Agent Hosts

* Install only container and host extensions by using `--no-agent` flag

```bash
./agent-linux.sh --key <agent-key> --no-agent --extensions steadybit-extension-host,steadybit-extension-container
```

* Reconfigure the extension to listen on http by editing `/etc/steadybit/extension-container` and `/etc/steadybit/extension-host` and removing the `STEADYBIT_EXTENSION_UNIX_SOCKET=...` line.\
  If you want to override the default port set `STEADYBIT_EXTENSION_PORT`.
* Restart the extensions

```bash
systemctl restart steadybit-extension-container
systemctl restart steadybit-extension-host
```

#### Agent Host

* Install the Agent as usual
* For each extension running on a different host, create a `/etc/steadybit/extensions.d/extension-*.yaml` to configure the remote-located extensions

{% code title="/etc/steadybit/extensions.d/extension-container-172-31-16-248.yaml" %}
```yaml
url: http://172.31.16.248:8085 # replace with your host
types:
  - ACTION
  - DISCOVERY
```
{% endcode %}
