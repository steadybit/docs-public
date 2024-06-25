# Hubs

Steadybit's hubs are the home for the chaos engineering community! They allow everyone to browse and contribute open-source extensions and templates made for Steadybit.
Steadybit hosts its own [Reliability Hub](https://hub.steadybit.com/) and always loves to see contributions via [pull requests](https://github.com/steadybit/reliability-hub-db).

Steadybit's chaos engineering platform lets you connect to a hub to ease [importing experiment templates](../../install-and-configure/manage-experiment-templates) or integrate documentation.

## Hub Connections
Admins can manage connected hubs in the platform's settings. By default, the platform is already connected to our [Reliability Hub](https://hub.steadybit.com/).

{% hint style="info" %}
On-premise platform installations connect to a bundled local copy of our Reliability hub's content. Thus, air-gapped environments are supported even when reading data from the hub connection.
{% endhint %}

### Connect New Hubs
Steadybit supports connecting your own hub to the platform. An administrator can manage hub connections via `Settings`> `Hubs`.

TODO IMAGE

Steadybit supports two types of hub connections:

1. GitHub-Repository or GitLab-Repository
 - The repository must be accessible from the platform.
 - The URL needs to be the repository URL, like `https://github.com/steadybit/reliability-hub-db`.
 - A branch name needs to be provided. Example: `main`
2. Any other HTTP endpoint, with a given <url>, that follows the convention mentioned in [TODO]
- If you provide a branch name, the platform will append it to the URL (`<url>/<branch>`). You can omit the branch name if you don't need it.

### Disconnect Hub
When you disconnect a connected hub, you can also decide to remove imported templates. Experiments created from a template are never deleted when you disconnect a hub.

TODO IMAGE

## Host Your Own Hub
You can host your own hub to share content within your organization instead of with the entire community. This is especially beneficial when you have developed a proprietary extension or need to share organization-specific templates.
So far, we only support hosting a private hub's database and connecting it to the platform. We do not yet support hosting a white-labeled hub UI.

### Directory Convention
To host your own hub, you need to provide an HTTP-enabled directory (e.g. GitHub or GitLab repository) that adheres to the following convention:

. If you want to import templates from that repository
1. The repository must contain a file `templates/index.json`. An example can be found [here](https://github.com/steadybit/reliability-hub-db/blob/main/templates/index.json).
2. The `index.json` needs a list of relative links to templates JSON files. You can export experiment templates from the Steadybit platform UI and use the JSON format in your custom hub.
1. Returns a JSON via `GET` at `<url>/templates/index.json`. An example can be found [here](https://raw.githubusercontent.com/steadybit/reliability-hub-db/main/templates/index.json).