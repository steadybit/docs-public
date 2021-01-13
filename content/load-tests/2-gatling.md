---
title: "Gatling"
navTitle: "Gatling"
---

## Gatling

[Gatling](https://gatling.io/) is an open-source load- and performance-testing framework based on Scala, Akka and Netty.
You can integrate the execution of Gatling load tests directly into your experiments.

### Usage

When using the default, the load test will perform a GET request every second on the target url with the number of virtual users.

### Parameters

| Parameter   | Environment Variable   |      Description      | Default | Required |
|----------|-------------|-------------|-------------|-------------|
| Duration | DURATION | How long should the load test run? | inherited from experiment duration | no |
| Virtual Users | VUS | How many virtual users should be started? | 1 | yes |
| Target URL | TARGETURL | Which url should be the target for the load test? | - | yes |
| Docker Image | - |  Which image should be used for executing the action? |steadybit/action-gatling:latest | yes |


### Custom Gatling Tests
For using a custom load test you can exchange the `/opt/gatling/user-files/simulations/basic.scala` file with your custom one.

```
# Inherit existing image
FROM steadybit/action-gatling:latest

# provide custom test
COPY custom.scala /opt/gatling/user-files/simulations/basic.scala
```
