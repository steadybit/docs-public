# Install on Linux Hosts

This method will install the Steadybit outpost agent on your Linux machine using the respective package managers.
By default, it will install the Outpost agent as well as
the extensions [extension-http](https://hub.steadybit.com/extension/com.steadybit.extension\_http), [extension-container](https://hub.steadybit.com/extension/com.steadybit.extension\_container),
and [extension-host](https://hub.steadybit.com/extension/com.steadybit.extension\_host).

#### Supported Package Managers

* apt
* yum / dnf

### Outpost Installation

The following command will download and run the latest Steadybit outpost package on your system:

```shell
wget https://get.steadybit.com/outpost-linux.sh
chmod a+x outpost-linux.sh
./outpost-linux.sh --key <agent-key>
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

#### Additional Extensions

If you want to use additional extensions (e.g. [extension-jvm](https://hub.steadybit.com/extension/com.steadybit.extension\_jvm) for attacking Java
applications), you can apply the `--extensions` parameter.

```
./outpost-linux.sh --key <agent-key> --extensions steadybit-extension-host,steadybit-extension-container,steadybit-extension-http,steadybit-extension-jvm
```

### Managing the Outpost Agent and Extension

#### Logs

The logs for outpost agent and extensions are located in `/var/log/steadybit-*.log`

#### Configuration

The configurations for outpost agent and extensions are located in `/etc/steadybit`

#### Start/Stop

When using **systemd**

```
systemctl start steadybit-outpost
systemctl stop steadybit-outpost
systemctl restart steadybit-outpost
```

When using **InitV**

```
service steadybit-outpost start
service steadybit-outpost stop
service steadybit-outpost restart
```

The same applies to extensions. The services are named `steadybit-extension-*`.

#### Removing the Outpost Agent

Remove the packages using the package manager:

```
apt-get remove --purge steadybit-outpost \
  steadybit-extension-http \
  steadybit-extension-container \
  steadybit-extension-host
```

Or when using yum:

```
yum remove steadybit-outpost \
  steadybit-extension-http \
  steadybit-extension-container \
  steadybit-extension-host
```

### Configure HTTP Proxy Server

The Steadybit Outpost Agent uses HTTP and websockets to communicate with the platform and to download updates.
To simplify the agent deployment, consider allowing direct communication to our platform.

If you require a single entry into and out of your network, you can configure the agent to use a proxy:

1. Edit `/etc/steadybit/outpost` and set the values for these variables:

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
systemctl daemon-reload && systemctl restart steadybit-outpost
```

When using **InitV**

```
service steadybit-outpost restart
```
