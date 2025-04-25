# Extension Registration

## Overview

Extensions needs to be registered with the agent. There are multiple ways to do that:

* [Kubernetes Auto Registration](extension-registration.md#kubernetes-auto-registration) (default behavior when using Kubernetes with our helm charts)
* [Environment Variables](extension-registration.md#using-environment-variables)
* [Configuration Files](extension-registration.md#using-configuration-files) (default behavior when using Linux packages)
* [Agent API](extension-registration.md#using-the-agent-api)

### Kubernetes Auto Registration

The agent is looking for services and pods with an annotation `steadybit.com/extension-auto-registration`. These annotations are already added to our extensions if you use our official helm charts.

#### Kubernetes Auto Registration fine tuning

If you want to fine tune the auto registration, you can configure the mechanism to:

* include only extension pods matching a given label selector
* exclude extensions pod matching a given label selector
* include only extension from a specific namespace

{% tabs %}
{% tab title="using Helm Chart" %}
```yaml
agent:
  extensions:
    autoregistration:
      matchLabelsInclude:
        custom/extension-i-want-to-register: true
      matchLabelsExclude:
        app.kubernetes.io/name: extension-host
      namespace: my-namespace
```
{% endtab %}

{% tab title="using Environment Variables" %}
```
STEADYBIT_AGENT_EXTENSIONS_AUTOREGISTRATION_MATCHLABELS_0_KEY=custom/extension-i-want-to-discover
STEADYBIT_AGENT_EXTENSIONS_AUTOREGISTRATION_MATCHLABELS_0_VALUE=true
STEADYBIT_AGENT_EXTENSIONS_AUTOREGISTRATION_MATCHLABELSEXCLUDE_0_KEY=app.kubernetes.io/name
STEADYBIT_AGENT_EXTENSIONS_AUTOREGISTRATION_MATCHLABELSEXCLUDE_0_VALUE=extension-host
STEADYBIT_AGENT_EXTENSIONS_AUTOREGISTRATION_NAMESPACE=my-namespace
```
{% endtab %}
{% endtabs %}

### Using Environment Variables

You can specify environment Variables via `agent.env` files or directly via the command line.

Please note that these environment variables are index-based (referred to as `n`) to register multiple extension instances.

Valid Types are:

* `DISCOVERIES` referring to a [index response of a discovery](https://github.com/steadybit/discovery-kit/blob/main/docs/discovery-api.md#index-response).
* `ACTIONS` referring to a [list of actions](https://github.com/steadybit/action-kit/blob/main/docs/action-api.md#action-list).
* `EVENTS` referring to a [list of event listeners](https://github.com/steadybit/event-kit/blob/main/docs/event-api.md#event-listeners-list).
* `ADVICE` referring to a [list of advices](https://github.com/steadybit/advice-kit/blob/main/docs/advice-api.md#index-response).

{% tabs %}
{% tab title="with specified type" %}
| <p>Environment Variable<br>(<code>n</code> refers to the index of the extension's instance)<br>(<code>type</code> refers to the type of the extension's endpoint)</p> | Required | Description                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `STEADYBIT_AGENT_type_EXTENSIONS_n_URL`                                                                                                                               | yes      | Fully-qualified URL of the endpoint, e.g., `http://my-extension.steadybit-extension.svc.cluster.local:8080/actions` |
| `STEADYBIT_AGENT_type_EXTENSIONS_n_METHOD`                                                                                                                            |          | Optional HTTP method to use. Default: `GET`                                                                         |
| `STEADYBIT_AGENT_type_EXTENSIONS_n_BASIC_USERNAME`                                                                                                                    |          | Optional basic authentication username to use within HTTP requests.                                                 |
| `STEADYBIT_AGENT_type_EXTENSIONS_n_BASIC_PASSWORD`                                                                                                                    |          | Optional basic authentication password to use within HTTP requests.                                                 |

**Example:** To register, e.g., two ACTION extensions, where the second one requires basic authentication, you use

* `STEADYBIT_AGENT_ACTIONS_EXTENSIONS_0_URL`,
* `STEADYBIT_AGENT_ACTIONS_EXTENSIONS_1_URL`,
* `STEADYBIT_AGENT_ACTIONS_EXTENSIONS_1_BASIC_USERNAME` and
* `STEADYBIT_AGENT_ACTIONS_EXTENSIONS_1_BASIC_PASSWORD`.
{% endtab %}

{% tab title="without specifying a type" %}
You can also register extension without specifying the type, e.g., `STEADYBIT_AGENT_EXTENSIONS_REGISTRATIONS_0_URL`. In this case, the agent will try all known Types.

| <p>Environment Variable<br>(<code>n</code> refers to the index of the extension's instance)</p> | Required | Description                                                                                                         |
| ----------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `STEADYBIT_AGENT_EXTENSIONS_REGISTRATIONS_n_URL`                                                | yes      | Fully-qualified URL of the endpoint, e.g., `http://my-extension.steadybit-extension.svc.cluster.local:8080/actions` |
| `STEADYBIT_AGENT_EXTENSIONS_REGISTRATIONS_n_METHOD`                                             |          | Optional HTTP method to use. Default: `GET`                                                                         |
| `STEADYBIT_AGENT_EXTENSIONS_REGISTRATIONS_n_BASIC_USERNAME`                                     |          | Optional basic authentication username to use within HTTP requests.                                                 |
| `STEADYBIT_AGENT_EXTENSIONS_REGISTRATIONS_n_BASIC_PASSWORD`                                     |          | Optional basic authentication password to use within HTTP requests.                                                 |
{% endtab %}
{% endtabs %}

### Using Configuration Files

Linux packages installations are using this approach by default. The package installer of the extensions is writing configuration files to `/etc/steadybit/extensions.d/extension-*.yaml` which are read by the agent.

The content of each file is a YAML document with the following structure:

```yaml
url: http://123.45.67.890:8085
types:
  - ACTION
  - DISCOVERY
```

### Using the Agent API

You can also register extensions via the [Agent API](agent-api.md).

Extension registrations are persisted using the configured persistence provider. With each agent restart, the agent will re-register these manual extensions registrations.

You can find detailed information about the agent API in the [Agent API](agent-api.md) documentation.

Example:

**POST** `http://localhost:42899/extensions`

```json
{
  "url": "http://123.45.67.890:8085",
  "types": [
    "ACTION",
    "DISCOVERY"
  ]
}
```

## Verify registered extensions

To check which extensions are registered in the agent, you need to take a look at the agent's logs.

Example output:

```
Jan 16 07:50:49 steadybit-agent-0 steadybit-agent INFO Extension-registry change: ADD Extension{source='KubernetesExtensionRegistrator', httpEndpointRef=GET http://steadybit-agent-extension-jmeter.steadybit-agent.svc.cluster.local:8087}
Jan 16 07:50:49 steadybit-agent-0 steadybit-agent INFO Extension-registry change: ADD Extension{source='KubernetesExtensionRegistrator', httpEndpointRef=GET http://steadybit-extension-loadtest-9005.steadybit-agent.svc.cluster.local:9005}
Jan 16 07:50:49 steadybit-agent-0 steadybit-agent INFO Extension-registry change: ADD Extension{source='KubernetesExtensionRegistrator', httpEndpointRef=GET http://steadybit-agent-extension-gatling.steadybit-agent.svc.cluster.local:8087}
Jan 16 07:50:49 steadybit-agent-0 steadybit-agent INFO Extension-registry change: ADD Extension{source='KubernetesExtensionRegistrator', httpEndpointRef=GET http://steadybit-agent-extension-k6.steadybit-agent.svc.cluster.local:8087}
```
