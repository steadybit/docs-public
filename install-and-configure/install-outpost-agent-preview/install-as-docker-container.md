# Install as Docker Container

You need to install the Steadybit outpost agent itself and all extensions you may want to use.

### Outpost Installation

#### Oneliner

```bash
curl -sfL https://get.steadybit.com/outpost.sh | sh -s -- --key <agent-key>
```

<table><thead><tr><th width="194">Parameter</th><th width="276">Description</th><th>Default</th></tr></thead><tbody><tr><td><code>--key</code></td><td>The agent key, can be found on the <a href="https://platform.steadybit.com/settings/agents/setup">setup page</a>.</td><td></td></tr><tr><td><code>--platform-url</code></td><td>If running on-prem, the url of your platform installation</td><td><code>https://platform.steadybit.com</code></td></tr><tr><td><code>--image</code></td><td>The Outpost Docker image to use.</td><td><code>steadybit/outpost:latest</code></td></tr><tr><td><code>--state-dir</code></td><td>Override the host directory to store the state</td><td><code>/var/lib/steadybit-outpost</code></td></tr></tbody></table>

#### Manual Installation

```bash
docker run \
  --detach \
  --name steadybit-outpost \
  --env="STEADYBIT_AGENT_KEY=<agent.key>" \
  steadybit/outpost
```

#### Running behind an HTTP proxy server&#x20;

The Steadybit Outpost uses HTTP and websockets to communicate with the platform. To simplify the outpost deployment, you should consider allowing direct communication to our platform. In case using a single entry into and out of your network is required, you can configure the outpost to use a proxy. For the docker agent, you need to run the container with additional environment variables. You can set these by adding the following arguments to the docker run command:&#x20;

```bash
  --env="STEADYBIT_AGENT_PROXY_HOST=<hostname or address of your proxy>" \
  --env="STEADYBIT_AGENT_PROXY_PORT=<port of your proxy>" \
  --env="STEADYBIT_AGENT_PROXY_PROTOCOL=<proxy protocol e.g. http>" \
  --env="STEADYBIT_AGENT_PROXY_USER=<username of the proxy (if needed)>" \
  --env="STEADYBIT_AGENT_PROXY_PASSWORD=<password of the proxy (if needed)>"
```

### Extension Installation

The outpost should now already be visible in the UI. But without any extension, the outpost will not provide any value. Check our [reliability hub](https://hub.steadybit.com/extensions) for an up-to-date list of extensions. \
\
A very good candidate for a first extension is the [extension-host](https://github.com/steadybit/extension-host). Please refer to the repository for documentation about installing the host extension with docker.

#### Extension registration

After you have installed an extension, you need to reconfigure the outpost agent. The outpost needs to know where it can find the extensions and which capabilities it has.

There is an auto-discovery for extensions installed within the same Kubernetes cluster, but as we have used docker, we need to set some environment variables in the outpost installation. You can find more information about extension registration [here](../../integrate-with-steadybit/extensions/extension-installation.md).\
\
Example for the extension-host to be added to the outpost installation:

```bash
--env="STEADYBIT_AGENT_ACTIONS_EXTENSIONS_0_URL=http://localhost:8085" \
--env="STEADYBIT_AGENT_DISCOVERIES_EXTENSIONS_0_URL=http://localhost:8085" \
```
