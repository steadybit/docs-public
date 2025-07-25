# Hubs

Steadybit's hubs are the home for the chaos engineering community! They allow everyone to browse and contribute open-source extensions and templates made for Steadybit. Steadybit hosts its own [Reliability Hub](https://hub.steadybit.com/) and always loves to see contributions via [pull requests](https://github.com/steadybit/reliability-hub-db).

Steadybit's chaos engineering platform lets you connect to a hub to enable [importing experiment templates](../../install-and-configure/manage-experiment-templates/) or integrating [documentation of an action](../../use-steadybit/experiments/design.md#action-and-template-documentation).

## Hub Connections

Admins can manage connected hubs in the platform's settings. By default, the platform connects to our [Reliability Hub](https://hub.steadybit.com/).

{% hint style="info" %}
On-premise platform installations connect to a bundled local copy of our Reliability hub's content. Thus, air-gapped environments are supported even when reading data from the hub connection.
{% endhint %}

### Connect New Hubs

Steadybit supports connecting your own hub to the platform. An administrator can manage hub connections via `Settings`> `Hubs`. To add a hub, you need to specify the URL to the hub's index.json (see section [hub convention](./#hub-connections)).

![Platform - connect new hub](hub-connect.png)

Once you've added your hub, you can [import templates from the hub easily](../../install-and-configure/manage-experiment-templates/) and view documentation of actions integrated into the experiment editor.

### Disconnect Hub

When you disconnect a connected hub, you can decide to remove imported templates. Experiments created from a template are never deleted when you disconnect a hub.

![Platform - disconnect hub](hub-disconnect.png)

## Host Your Own Hub

You can host your own hub to share content within your organization instead of with the public community. This is especially beneficial when you have developed a proprietary extension or need to share organization-specific templates. So far, we only support hosting a private hub's database and connecting it to the platform. We do not yet support hosting a white-labeled hub UI.

### Hub Convention

To host your own hub, you have to serve a JSON-based endpoint via HTTP with a last modified unix timestamp (`lastChange`) and path references to templates and action documentation (see below).
The platform will only update the referenced content when the unix timestamp (`lastChange`) has changed.

```json
{
  "lastChange": 1719498293,
  "templates": [
    "/templates/aws-zone.zone-outage/template.json",
    "/templates/kubernetes-deployment.time-to-readiness/template.json"
    //...
  ],
   "actions": [
    "/actions/com.steadybit.extension_container.stress_cpu/description.yml",
    "/actions/com.steadybit.extension_host.shutdown/description.yml",
    //...
   ]
}
```

You can check out the `index.json` and all referenced content of [Steadybit's Reliability Hub](https://hub.steadybit.com/) in our [open-source GitHub repository](https://github.com/steadybit/reliability-hub-db/blob/main/index.json).

#### Experiment Templates
Experiment templates, that can be [imported to your platform](../../install-and-configure/manage-experiment-templates/), are listed in the `templates` section and are referencing the [exported templates](../../install-and-configure/manage-experiment-templates/README.md#export-templates-as-files) from your platform.

#### Action Documentation
The [documentation of an action](../../use-steadybit/experiments/design.md#action-and-template-documentation) references a `description.yml` with the following format:

````yaml
---
id:  com.steadybit.extension_host.shutdown
label: Trigger Shutdown Host
description: Triggers a reboot or shutdown of the host.
icon: |
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.231 1a.75.75 0 01.75.75v9.304a.75.75 0 01-1.5 0V1.75a.75.75 0 01.75-.75zm2.156 3.852a.75.75 0 01.957-.457 9.338 9.338 0 010 17.608l-.01.003A9.339 9.339 0 019.11 4.398a.75.75 0 11.52 1.408 7.839 7.839 0 005.22 14.781 7.838 7.838 0 00-.005-14.778.75.75 0 01-.457-.957z" fill="currentColor"/></svg>
kind: attack
category: state
targetType: com.steadybit.extension_host.host
extension: com.steadybit.extension_host
promotedActions:
  - com.steadybit.extension_aws.ec2_instance.state
tags:
  - Host
  - Kubernetes
````
The `id` needs to match the action-id provided by your extension.

Also, in the same folder as the `description.yml`, the platform will look for a `summary.mdx` containing Markdown content, see for example:

```markdown
# Introduction

This action executes a shutdown on the host by issuing the `shutdown` command/syscall (depending on the operating system). You can instruct the action to issue a host restart when desired - in which case the command/syscall will be adapted as necessary.

...

# Parameters

| Parameter | Description                                 | Default |
|-----------|---------------------------------------------|---------|
| Reboot    | Should the host reboot after shutting down? | true    |
```
