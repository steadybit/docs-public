---
title: "Application Attacks"
navTitle: "Application"
---

## Spring MVC Controller Delay

Inject latency into a Spring™ MVC controller.
The delay is applied before the handler method is executed.

| Parameter   |      Description      | Default |
|----------|-------------|-------------|
| Request Mapping | Which request mapping pattern should be used to match the requests? | |
| Http Method |Which http method should be used to match the requests?  | Any |
| Duration |  How long should the traffic be delayed? | 30s |
| Delay | How much should the traffic be delayed? | 500ms |
| Jitter | Random +-30% jitter to network delay | true |

## Spring MVC Controller Delay

Injects a RuntimeException into a Spring™ MVC controller.
The exception is thrown before the handler method is executed.
When an exception is thrown the handler itself will not be executed.

| Parameter   |      Description      | Default |
|----------|-------------|-------------|
| Request Mapping | Which request mapping pattern should be used to match the requests? | |
| Http Method |Which http method should be used to match the requests?  | Any |
| Duration | How long should the traffic be delayed? | 30s |
| Erroneous Call Rate | What percentage of requests should trigger an exception? | 80 |
