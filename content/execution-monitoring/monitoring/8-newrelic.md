---
title: "New Relic"
navTitle: "New Relic"
---

## New Relic

We are able to react to the different events of New Relic and process them within the execution of an experiment. You can filter the events and determine at
which event type the experiment should fail.

### Configuration

Under `Settings/Monitoring Integrations` you have to enter the New Relic `API URL` and the `API token` that was previously created in New Relic. That's all we
need to react to the events New Relic.

### Usage

Once New Relic has been configured in the platform's settings, you will find a `New Relic State Check` in section `Execution and Monitoring` within the
configuration dialog of an experiment. The filtering of events is possible on New Relic Product, Entity Type and Event Type. We are supporting the following
types of events and products are supported.

#### Product

APM, Browser, Mobile, Servers, Plugins, Synthetics, Infrastructure, Alerts

#### Event Type

Application, Server, Key Transaction, Plugin, Mobile Application, Brwoser Application, Monitor, Host

#### Entity Type

Notfication, Deployment, Incident (open/close), Violation (open/close), Instrumentation
