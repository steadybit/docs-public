---
title: "Install on Linux Hosts"
navTitle: "Linux Hosts"
---

The following command will download and run the latest steadybit agent package on your system:

```shell
curl -sfL https://get.steadybit.io/agent-linux.sh | sh -s -- -a <agent-key> -e <platform-url>
```

For your convenience you can use the [setup page](https://platform.steadybit.io/settings/agents/setup) in the SaaS platform, where your agent key is already prepared in the command.

After the setup check the logfiles with a suitable command for your linux system, e.g. `journalctl -u steadybit-agent.service`.

The path to the original log file is: `/opt/steadybit/agent/data/log/steadybit-agent.log`

### Uninstall Agent From Linux Hosts
The steadybit Agent is installed via the system-default package manager.
So, depending on your Linux distribution you can uninstall the Agent by using one of the following commands.

#### Package Manager apt-get
```shell
apt-get remove steadybit-agent
```

#### Package Manager yum
```shell
yum remove steadybit-agent
```

#### Package Manager dnf
```shell
dnf remove steadybit-agent
```

#### Package Manager zypper
```shell
zypper remove steadybit-agent
```

