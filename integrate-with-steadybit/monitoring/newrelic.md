---
title: New Relic
---

# New Relic

There are two general possibilities to integrate with New Relic:

* New Relic to Steadybit: checking for specific events from New Relic in Steadybit during experiment execution
* Steadybit to New Relic: pushing Steadybit events during experiment execution to New Relic

### New Relic to Steadybit

We are able to react to the different events of New Relic and process them within the execution of an experiment. Once New Relic has been [configured](../../install-and-configure/configure-monitoring/new-relic.md) by your admin, you will automatically find all events of `New Relic` in the [execution view ](../../use-steadybit/experiments/#run)of an experiment.

### Steadybit to New Relic

By connecting Steadybit to New Relic Insights you are able to investigate the effect of an attack within your familiar monitoring setup (e.g. New Relic dashboards). Thus you can see the direct effect of an attack to certain metrics like erroneous calls, CPU usage or whatever metric is important to you. The only thing required is to setup the [configuration](../../install-and-configure/configure-monitoring/new-relic.md#steadybit-to-new-relic) once by your admin.
