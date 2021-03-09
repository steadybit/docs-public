---
title: "Discovery in a Custom Context"
navTitle: "Customizing Context"
---

## Custom Attributes

You can tell the agent to add custom attributes to each discovered target by setting `STEADYBIT_LABEL_*` environment variables for the agent.

For example if you set `STEADYBIT_LABEL_TEAM=Fullfillment`, all targets reported by this agent will have the attribute `team: Fullfillment`.

## Custom Attributes using Environment Variables

The agent can pick up environment variables and add them as a attribute to any target discovered by this agent.
You need to set the `STEADYBIT_DISCOVERY_ENV_LIST` environment variable to a list of variables you want to pick up.

For example if you set `STEADYBIT_DISCOVERY_ENV_LIST=STAGE,LOCATION`, all targets reported by this agent will have the attribute `stage: <value of $STAGE>` and `location: <value of $LOCATION>` associated.



