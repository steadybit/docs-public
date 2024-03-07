# Install on Linux Hosts

This method will install the Steadybit agent on your Linux machine using the respective package managers.
By default, it will install the agent as well as
the extensions [extension-http](https://hub.steadybit.com/extension/com.steadybit.extension\_http), [extension-container](https://hub.steadybit.com/extension/com.steadybit.extension\_container),
and [extension-host](https://hub.steadybit.com/extension/com.steadybit.extension\_host).

## Supported Package Managers

* apt
* yum / dnf

## Prerequisites

To install the agent, you must be able to access the following URLs via HTTPS (443) on your target environment:

* https://platform.steadybit.com (Platform)
* https://artifacts.steadybit.io (.deb and .rpm packages)
* https://get.steadybit.com (Setup Scripts)

## Agent Installation
To install the agent on your Linux system, you can copy the installation script from the [setup page](https://platform.steadybit.com/settings/agents/setup) in the SaaS platform.

Alternatively, you can update and run the script below with your agent key, which you find in the platform's [setup page](https://platform.steadybit.com/settings/agents/setup):

```shell
wget https://get.steadybit.com/agent-linux.sh
chmod a+x agent-linux.sh
./agent-linux.sh --key <agent-key>
```

| Parameter         | Description                                                | Default                                                                                                                 |
|-------------------|------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| `--key`           | The API key the agent uses                                 |                                                                                                                         |
| `--extensions`    | The extensions to install                                  | `steadybit-extension-host,steadybit-extension-container,steadybit-extension-http`                                       |
| `--platform-url`  | If running on-prem, the URL of your platform installation  | `https://platform.steadybit.com`                                                                                        |
| `--version`       | Override the used package version                          |                                                                                                                         |
| `--repo-url`      | Override the default package repository URL                | `https://artifacts.steadybit.io/repository/{yum}-public/` or  `https://artifacts.steadybit.io/repository/{deb}-public/` |
| `--repo-user`     | Override the username for accessing the package repository |                                                                                                                         |
| `--repo-password` | Override the password for accessing the package repository |                                                                                                                         |

### Configure HTTP Proxy Server

The Steadybit Agent uses HTTP and websockets to communicate with the platform and to download updates.
To simplify the agent deployment, consider allowing direct communication to our platform.

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

```
systemctl daemon-reload && systemctl restart steadybit-agent
```

When using **InitV**

```
service steadybit-agent restart
```

## Managing the Agent and Extension

### Logs

The logs for agent and extensions are located in `/var/log/steadybit-*.log`

### Configuration

The configurations for agent and extensions are located in `/etc/steadybit`

### Start/Stop

When using **systemd**

```
systemctl start steadybit-agent
systemctl stop steadybit-agent
systemctl restart steadybit-agent
```

When using **InitV**

```
service steadybit-agent start
service steadybit-agent stop
service steadybit-agent restart
```

The same applies to extensions. The services are named `steadybit-extension-*`.

## Removing the Agent

Remove the packages using the package manager:

```
apt-get remove --purge steadybit-agent \
  steadybit-extension-http \
  steadybit-extension-container \
  steadybit-extension-host
```

Or when using yum:

```
yum remove steadybit-agent \
  steadybit-extension-http \
  steadybit-extension-container \
  steadybit-extension-host
```

## Additional Extensions

If you want to use additional extensions (e.g. [extension-jvm](https://hub.steadybit.com/extension/com.steadybit.extension\_jvm) for attacking Java
applications), you can apply the `--extensions` parameter.

```
./agent-linux.sh --key <agent-key> --extensions steadybit-extension-host,steadybit-extension-container,steadybit-extension-http,steadybit-extension-jvm
```
