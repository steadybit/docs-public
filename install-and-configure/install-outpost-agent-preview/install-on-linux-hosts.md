# Install on Linux Hosts

You need to install the Steadybit outpost agent itself and all extensions you may want to use.

### Outpost Installation

The following command will download and run the latest Steadybit outpost package on your system:

<pre class="language-shell"><code class="lang-shell"><strong>curl -sfL https://get.steadybit.com/outpost-linux.sh | sh -s -- --key &#x3C;agent-key>
</strong></code></pre>

<table><thead><tr><th width="194">Parameter</th><th width="258">Description</th><th>Default</th></tr></thead><tbody><tr><td><code>--key</code></td><td>The API key the agent uses</td><td></td></tr><tr><td><code>--platform-url</code></td><td>If running on-prem, the url of your platform installation</td><td><code>https://platform.steadybit.com</code></td></tr><tr><td><code>--version</code></td><td>Override the used package version</td><td></td></tr><tr><td><code>--repo-url</code></td><td>Override the default package repository URL</td><td><code>https://{auth}@artifacts.steadybit.io/repository/{yum|deb}-public/</code></td></tr></tbody></table>

After the setup, check the logfiles with a suitable command for your Linux system, e.g. `journalctl -u steadybit-outpost.service`.

The path to the original log file is: `/opt/steadybit/outpost/data/log/steadybit-agent.log`

#### Running behind an HTTP proxy server

The Steadybit Outpost Agent uses HTTP and websockets to communicate with the platform and to download updates. To simplify the agent deployment, you should consider allowing direct communication to our platform. In case using a single entry into and out of your network is required, you can configure the agent to use a proxy.

For configuring the proxy, you need to edit two files after installation:

Edit `/etc/steadybit/outpost` and set the values for these variables:

```shell
export STEADYBIT_AGENT_PROXY_HOST="<hostname or address of your proxy>"
export STEADYBIT_AGENT_PROXY_PORT="<port of your proxy>"
export STEADYBIT_AGENT_PROXY_PROTOCOL="<proxy protocol e.g. http>"
export STEADYBIT_AGENT_PROXY_USER="<username of the proxy (if needed)>"
export STEADYBIT_AGENT_PROXY_PASSWORD="<password of the proxy (if needed)>"
```

**2) Restart Steadybit Agent service**

**Either:** when using systemd: `systemctl daemon-reload && systemctl restart steadybit` **Or:** when using Init V: `service steadybit-outpost restart`

#### Uninstall Agent From Linux Hosts

The Steadybit Outpost Agent is installed via the system-default package manager. So, depending on your Linux distribution, you can uninstall the Agent by using one of the following commands.

**Package Manager apt-get**

```shell
apt-get remove steadybit-outpost
```

**Package Manager yum**

```shell
yum remove steadybit-outpost
```

**Package Manager dnf**

```shell
dnf remove steadybit-outpost
```

**Package Manager zypper**

```shell
zypper remove steadybit-outpost
```

### Extension Installation

Coming soon - Extension Installations on Linux Hosts are not yet supported - we are working on it.
