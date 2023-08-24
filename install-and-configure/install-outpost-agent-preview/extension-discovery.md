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
outpost:
  extensions:
    autodiscovery:
      matchLabelsInclude:
        - key: custom/extension-i-want-to-discover
          value: true
      matchLabelsExclude:
        - key: app.kubernetes.io/name
          value: extension-host
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

If you can't use the Kubernetes Auto Discovery, you need to register the extension manually. You can do that by adding environment variables to the agent.
See the respective documentation of the extension or the extension kits' respective documentation.

* [ActionKit](https://github.com/steadybit/action-kit/blob/main/docs/action-registration.md#with-environment-variables)
* [DiscoveryKit](https://github.com/steadybit/discovery-kit/blob/main/docs/discovery-registration.md#with-environment-variables)
* [EventKit](https://github.com/steadybit/event-kit/blob/main/docs/event-registration.md#with-environment-variables)
