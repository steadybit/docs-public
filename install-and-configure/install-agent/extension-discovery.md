# Extension Discovery

## Overview

Extensions needs to be discovered by the agent. There are two ways to do that:

### Kubernetes Auto Discovery

The agent is looking for services and pods with an annotation `steadybit.com/extension-auto-discovery`. These annotations are already added to our
extensions if you use our official helm charts. You can find an example in our [extension-datadog](https://github.com/steadybit/helm-charts/blob/2c7c40e193fdbe386b10ff08e2547d27d7ac749a/charts/steadybit-extension-datadog/templates/service.yaml#L10-L19)

#### Kuberenetes Auto Discovery fine tuning

If you want to fine tune the auto discovery, you can fine tune the mechanism to:

- include only extensions pods matching a given label selector
- exclude extensions pods matching a given label selector

{% tabs %}
{% tab title="using Helm Chart" %}

```yaml
agent:
  extensions:
    autodiscovery:
      matchLabelsInclude:
        custom/extension-i-want-to-discover: true
      matchLabelsExclude:
        app.kubernetes.io/name: extension-host
```

{% endtab %}

{% tab title="using Environment Variables" %}

`STEADYBIT_AGENT_EXTENSIONS_AUTODISCOVERY_MATCHLABELS_0_KEY=custom/extension-i-want-to-discover`
`STEADYBIT_AGENT_EXTENSIONS_AUTODISCOVERY_MATCHLABELS_0_VALUE=true`
`STEADYBIT_AGENT_EXTENSIONS_AUTODISCOVERY_MATCHLABELSEXCLUDE_0_KEY=app.kubernetes.io/name`
`STEADYBIT_AGENT_EXTENSIONS_AUTODISCOVERY_MATCHLABELSEXCLUDE_0_VALUE=extension-host`

{% endtab %}
{% endtabs %}


### Manual Extension Registration

If you can't use the Kubernetes Auto Discovery, you need to register the extension manually.

#### Using ENV Variables

You can specify ENV Variables via agent.env files or directly via the command line.

Please note that these environment variables are index-based (referred to as `n`) to register multiple extension instances.

Valid replacement for `type` are:
- `DISCOVERIES` referring to a [index response of a discovery](https://github.com/steadybit/discovery-kit/blob/main/docs/discovery-api.md#index-response).
- `ACTIONS` referring to a [list of actions](https://github.com/steadybit/action-kit/blob/main/docs/action-api.md#action-list).
- `EVENTS` referring to a [list of event listeners](https://github.com/steadybit/event-kit/blob/main/docs/event-api.md#event-listeners-list).
- `ADVICE` referring to a [list of advices](https://github.com/steadybit/advice-kit/blob/main/docs/advice-api.md#index-response).

| Environment Variable<br/>(`n` refers to the index of the extension's instance)<br/>(`type` refers to the type of the extension's endpoint) | Required | Description                                                                                                         |
|--------------------------------------------------------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------------------------------------------------|
| `STEADYBIT_AGENT_type_EXTENSIONS_n_URL`                                                                                                    | yes      | Fully-qualified URL of the endpoint, e.g., `http://my-extension.steadybit-extension.svc.cluster.local:8080/actions` |
| `STEADYBIT_AGENT_type_EXTENSIONS_n_METHOD`                                                                                                 |          | Optional HTTP method to use. Default: `GET`                                                                         |
| `STEADYBIT_AGENT_type_EXTENSIONS_n_BASIC_USERNAME`                                                                                         |          | Optional basic authentication username to use within HTTP requests.                                                 |
| `STEADYBIT_AGENT_type_EXTENSIONS_n_BASIC_PASSWORD`                                                                                         |          | Optional basic authentication password to use within HTTP requests.                                                 |

**Example:**
To register, e.g., two ACTION extensions, where the second one requires basic authentication, you use
- `STEADYBIT_AGENT_ACTIONS_EXTENSIONS_0_URL`,
- `STEADYBIT_AGENT_ACTIONS_EXTENSIONS_1_URL`,
- `STEADYBIT_AGENT_ACTIONS_EXTENSIONS_1_BASIC_USERNAME` and
- `STEADYBIT_AGENT_ACTIONS_EXTENSIONS_1_BASIC_PASSWORD`.

#### Using Configuration Files

Linux packages installations are using this approach by default. The package installer of the extensions is writing configuration files to `/etc/steadybit/extensions.d/extension-*.yaml ` which are read by the agent.

The content of each file is a YAML document with the following structure:

```yaml
url: http://123.45.67.890:8085
types:
  - ACTION
  - DISCOVERY
```

#### Using the Agent API

You can also register extensions via the [Agent API](agent-api.md).

Extension registrations are persisted using the configured persistence provider. With each agent restart, the agent will re-register these manual extensions registrations.

You can find detailed information about the agent API in the [Agent API](agent-api.md) documentation.

Example:

**POST** `http://localhost:42899/extensions`
```json
{
  "url": "http://123.45.67.890:8085",
  "types": ["ACTION", "DISCOVERY"]
}
```

### Verify registered extensions

To check which extensions are registered in the agent, you need to take a look at the agent's logs.

Example output:
```
2024-09-16T14:02:35.687+02:00  INFO 22305 --- [steadybit-agent] [           main] c.s.e.d.s.ExtensionDiscoveryService      : Extension-discovery change: ADD DiscoveredExtension[source=PropertyBasedExtensionDiscovery, type=ACTION, httpEndpointRef=GET http://xxx.yy:8082]
2024-09-16T14:02:35.688+02:00  INFO 22305 --- [steadybit-agent] [           main] c.s.e.d.s.ExtensionDiscoveryService      : Extension-discovery change: ADD DiscoveredExtension[source=PropertyBasedExtensionDiscovery, type=ACTION, httpEndpointRef=GET http://xxx.yy:8084]
2024-09-16T14:02:35.688+02:00  INFO 22305 --- [steadybit-agent] [           main] c.s.e.d.s.ExtensionDiscoveryService      : Extension-discovery change: ADD DiscoveredExtension[source=PropertyBasedExtensionDiscovery, type=DISCOVERY, httpEndpointRef=GET http://xxx.yy:8091]
2024-09-16T14:02:35.688+02:00  INFO 22305 --- [steadybit-agent] [           main] c.s.e.d.s.ExtensionDiscoveryService      : Extension-discovery change: ADD DiscoveredExtension[source=PropertyBasedExtensionDiscovery, type=EVENT, httpEndpointRef=GET http://xxx.yy:8088]
2024-09-16T14:02:35.688+02:00  INFO 22305 --- [steadybit-agent] [           main] c.s.e.d.s.ExtensionDiscoveryService      : Extension-discovery change: ADD DiscoveredExtension[source=PropertyBasedExtensionDiscovery, type=EVENT, httpEndpointRef=GET http://xxx.yy:8087]
2024-09-16T14:02:35.688+02:00  INFO 22305 --- [steadybit-agent] [           main] c.s.e.d.s.ExtensionDiscoveryService      : Extension-discovery change: ADD DiscoveredExtension[source=PropertyBasedExtensionDiscovery, type=ADVICE, httpEndpointRef=GET http://xxx.yy:8089]
2024-09-16T14:02:35.688+02:00  INFO 22305 --- [steadybit-agent] [           main] c.s.e.d.s.ExtensionDiscoveryService      : Extension-discovery change: ADD DiscoveredExtension[source=PropertyBasedExtensionDiscovery, type=DISCOVERY, httpEndpointRef=GET http://xxx.yy:8090]
```