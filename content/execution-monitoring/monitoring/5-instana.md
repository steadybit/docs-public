---
title: "Instana"
navTitle: "Instana"
---

## Instana

Instana is a fully automated Application Performance Management (APM) solution designed specifically for the challenges of managing microservice and
cloud-native applications.

Instana detects three major types of events to help you manage the Quality of Service of your applications:

- Issues
- Incidents
- Changes

With our integration, we track changes in the system via the API provided by Instana and react to them within the execution of an experiment. If Instana reports
an `issue` or `incident` during execution, the experiment is automatically aborted and marked as failed. Our report contains a short summary and a link to the
corresponding time window in Instana.
`Changes` noticed by Instana do not lead to an abort, since it may be intentional to start or shut down instances. Also check the Instana
docs [Instana Events & Incidents](https://docs.instana.io/core_concepts/events_and_incidents/)

### Configuration

Under `Settings/Monitoring Integrations` you have to enter the `Instana base URL` and the `API token` that was previously created in Instana.
That's all we need to react to the events and incidents in Instana.

### Usage

Once Instana has been configured in the platform's settings, you will find a button `Instana State Check` in section `Execution and Monitoring` within the
configuration dialog of an experiment.

