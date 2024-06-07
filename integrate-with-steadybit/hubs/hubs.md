# Hubs

The Steadybit platform has a built-in Hub connection to our [Reliability Hub](https://hub.steadybit.com/). The Reliability Hub is a central place where you can find extensions, actions, and templates to use with Steadybit.

This hub connection can, for example, be used to import [experiment templates](../../install-and-configure/manage-experiment-templates) into your Steadybit environment.

Steadybit supports connecting your own hub to the platform. Hub connections can be managed by an administrator via `Settings`> `Hubs`.

## Requirements of a hub connection

Steadybit supports two types of hub connections:

1. GitHub-Repository or GitLab-Repository
   1. The repository must be accessible from the platform.
   2. The URL needs to be the repository url, like `https://github.com/steadybit/reliability-hub-db`.
   3. A branch name needs to be provided. Example: `main`
   4. If you want to import templates from that repository
      1. The repository must contain a file `templates/index.json`. An example can be found [here](https://github.com/steadybit/reliability-hub-db/blob/main/templates/index.json).
      2. The `index.json` needs a list of relative links to templates json files. You can export experiment templates from the Steadybit platform ui and use the json format in your custom hub.
2. Any other HTTP endpoint, with a given <url>, that:
   1. Returns a json via `GET` at `<url>/templates/index.json`. An example can be found [here](https://raw.githubusercontent.com/steadybit/reliability-hub-db/main/templates/index.json).
   2. The `index.json` needs a list of relative links to templates json files. You can export experiment templates from the Steadybit platform ui and use the json format in your custom hub.
   3. If a branch name is provided, the platform will append it to the url. Example: `<url>/<branch>/templates/index.json`.You can omit the branch name if you don't need it.
