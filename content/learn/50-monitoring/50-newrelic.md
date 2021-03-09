---
title: "New Relic"
navTitle: "New Relic"
---

There are two general possibilities to integrate with New Relic:

* New Relic to steadybit: checking for specific events from New Relic in steadybit during experiment execution
* steadybit to New Relic: pushing steadybit events during experiment execution to New Relic

## New Relic to steadybit

We are able to react to the different events of New Relic and process them within the execution of an experiment. Once New Relic has
been [configured](../../install-configure/70-configure-monitoring/30-new-relic#newrelictosteadybit) by your admin, you will find a `New Relic State Check` in
section `Execution and Monitoring` within the configuration dialog of an experiment. The filtering of events is possible on New Relic Product, Entity Type and
Event Type. We are supporting the following types of events and products are supported.

##### Product

APM, Browser, Mobile, Servers, Plugins, Synthetics, Infrastructure, Alerts

##### Event Type

Application, Server, Key Transaction, Plugin, Mobile Application, Brwoser Application, Monitor, Host

##### Entity Type

Notfication, Deployment, Incident (open/close), Violation (open/close), Instrumentation

## steadybit to New Relic

By connecting steadybit to New Relic Insights you are able to investigate the effect of an attack within your familiar monitoring environment (e.g. New Relic
dashboards). Thus you can see the direct effect of an attack to certain metrics like erroneous calls, CPU usage or whatever metric is important to you.
The only thing required is to setup the [configuration](../../install-configure/70-configure-monitoring/30-new-relic#steadybittonewrelic) once by your admin.
