# Install on Linux Hosts

This method will install the Steadybit outpost agent on your linux machine using the respective package managers. By default it will install the extension-It will run the Outpost agent as well as the [extension-http](https://hub.steadybit.com/extension/com.github.steadybit.extension\_http), [extension-container](https://hub.steadybit.com/extension/com.github.steadybit.extension\_container) and [extension-host](https://hub.steadybit.com/extension/com.github.steadybit.extension\_host).

#### Supported Package Managers

* apt
* yum / dnf

### Outpost Installation

The following command will download and run the latest Steadybit outpost package on your system:

<pre class="language-shell"><code class="lang-shell"><strong>wget https://get.steadybit.com/outpost-linux.sh
</strong>chmod a+x outpost-linux.sh
./outpost-linux.sh --key &#x3C;agent-key>
</code></pre>

<table><thead><tr><th width="195">Parameter</th><th width="325">Description</th><th>Default</th></tr></thead><tbody><tr><td><code>--key</code></td><td>The API key the agent uses</td><td></td></tr><tr><td><code>-extensions</code></td><td>The extensions to install</td><td><code>steadybit-extension-host,steadybit-extension-container,steadybit-extension-http</code></td></tr><tr><td><code>--platform-url</code></td><td>If running on-prem, the url of your platform installation</td><td><code>https://platform.steadybit.com</code></td></tr><tr><td><code>--version</code></td><td>Override the used package version</td><td></td></tr><tr><td><code>--repo-url</code></td><td>Override the default package repository URL</td><td><code>https://artifacts.steadybit.io/repository/{yum|deb}-public/</code></td></tr><tr><td><code>--repo-user</code></td><td>Override the username for accessing the package repository</td><td></td></tr><tr><td><code>--repo-password</code></td><td>Override the password for accessing the package repository</td><td></td></tr></tbody></table>

#### Additional Extensions

If you want to use additional extensions (e.g [extension-jvm](https://hub.steadybit.com/extension/com.github.steadybit.extension\_jvm) for attacking Java applications), you can do so by using the `--extensions` parameter.

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

The same applies for extensions. The services are named `steadybit-extension-*`.

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

The Steadybit Outpost Agent uses HTTP and websockets to communicate with the platform and to download updates. To simplify the agent deployment, you should consider allowing direct communication to our platform. In case using a single entry into and out of your network is required, you can configure the agent to use a proxy.

For configuring the proxy, you need to edit two files after installation:

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
