---
title: "Execution and Monitoring"
metaTitle: "Execution and Monitoring - steadybit Docs"
metaDescription: "steadybit platform offers you extensive, safe and customizable attacks"
---

## Execution

To perform experiments it is recommended to have a base load in the system. With Steadybit it is possible to execute a load test automatically.

The following tools are currently supported:

* [K6](execution-monitoring/1-k6)
* [Gatling](execution-monitoring/2-gatling)
* [JMeter](execution-monitoring/3-jmeter)

## Monitoring

Without knowing what is going on in the system and how it is currently behaving or within an experiment is critical. We have therefore created integrations that
you can use during the execution of experiments. These integrations automatically help you to react to errors and to abort experiments. We automatically check
the state before, during and after the execution of an experiment.

* [Prometheus](execution-monitoring/4-prometheus)
* [Instana](execution-monitoring/5-instana)
* [Http Check](execution-monitoring/6-http-check)
* [Datadog](execution-monitoring/7-datadog)
