---
title: "Prometheus"
navTitle: "Prometheus"
---

## Prometheus
Prometheus is able to manage so-called alerts and trigger them in certain situations. With our integration we can react to the alerts and use them for automatic steady state checks in experiments.

[Read more about Prometheus alerts](https://prometheus.io/docs/alerting/overview/)

### Configuration
Under `Settings/Monitoring Integrations` you have to enter the `Prometheus base URL`.
That's all we need to react to the alerts provided by Prometheus.

### Usage
Once Prometheus has been configured in the platform's settings, you will find a button to `Add Prometheus Steady State Check` in the experiment creation dialog.