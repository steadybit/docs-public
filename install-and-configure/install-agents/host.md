---
title: Install on Linux Hosts
navTitle: Linux Hosts
---

# Install on Linux Hosts

The following command will download and run the latest steadybit agent package on your system:

```shell
curl -sfL https://get.steadybit.io/agent-linux.sh | sh -s -- -a <agent-key> -e <platform-url>
```

For your convenience you can use the [setup page](https://platform.steadybit.io/settings/agents/setup) in the SaaS platform, where your agent key is already prepared in the command.

After the setup check the logfiles with a suitable command for your linux system , e.g. `journalctl -u steadybit-agent.service`.

The path to the original log file is: `/opt/steadybit/agent/data/log/steadybit-agent.log`

#### Running behind a http proxy server

The Steadybit Agent uses http and websockets to communicate with the platform and to download updates. To simplify the agent deployment you should consider to allow direct communication to our platform. In case using a single entry into and out of your network is required, you can configure the agent to use a proxy.

For the configuring the proxy you need to edit two files after installation:

**1) Setting Environment Variables for the Steadybit Platform Access via Proxy:**

**Either:** when using systemd edit `/opt/steadybit/agent/etc/systemd.env` and set the values for these variables:

```bash
STEADYBIT_AGENT_PROXY_HOST=<hostname or address of your proxy>
STEADYBIT_AGENT_PROXY_PORT=<port of your proxy>
STEADYBIT_AGENT_PROXY_PROTOCOL=<proxy protocol e.g. http>
STEADYBIT_AGENT_PROXY_USER=<username of the proxy (if needed)>
STEADYBIT_AGENT_PROXY_PASSWORD=<password of the proxy (if needed)>
```

**Or:** when using Init V edit `/etc/default/steadybit-agent` and set the values for these variables:

```shell
export STEADYBIT_AGENT_PROXY_HOST="<hostname or address of your proxy>"
export STEADYBIT_AGENT_PROXY_PORT="<port of your proxy>"
export STEADYBIT_AGENT_PROXY_PROTOCOL="<proxy protocol e.g. http>"
export STEADYBIT_AGENT_PROXY_USER="<username of the proxy (if needed)>"
export STEADYBIT_AGENT_PROXY_PASSWORD="<password of the proxy (if needed)>"
```

**2) Restart Steadybit Agent service**

**Either:** when using systemd: `systemctl daemon-reload && systemctl restart steadybit` **Or:** when using Init V: `service steadybit-agent restart`

#### Uninstall Agent From Linux Hosts

The steadybit Agent is installed via the system-default package manager. So, depending on your Linux distribution you can uninstall the Agent by using one of the following commands.

**Package Manager apt-get**

```shell
apt-get remove steadybit-agent
```

**Package Manager yum**

```shell
yum remove steadybit-agent
```

**Package Manager dnf**

```shell
dnf remove steadybit-agent
```

**Package Manager zypper**

```shell
zypper remove steadybit-agent
```
