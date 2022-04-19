---
title: "JVM Application Attacks"
navTitle: "JVM Application"
---
Our platform supports the injection of errors and latency at runtime. Our Discovery determines the potential targets and the appropriate attacks.
You can choose between many different attacks on the application level and there will be more and more.


## Method Delay
Inject latency into any Java based application.
The delay is applied before the handler method is executed.

| Parameter   |      Description      | Default |
|----------|-------------|-------------|
| Class Name | Which Java class should be attacked? | |
| Method Name | Which public method should be attacked? |  |
| Duration |  How long should the traffic be delayed? | 30s |
| Delay | How much should the traffic be delayed? | 500ms |
| Jitter | Random +-30% jitter to network delay | true |

## Method Exception
Injects a RuntimeException into a Spring™ MVC controller.
The exception is thrown before the handler method is executed.
When an exception is thrown the handler itself will not be executed.

| Parameter   |      Description      | Default |
|----------|-------------|-------------|
| Class Name | Which Java class should be attacked? | |
| Method Name | Which public method should be attacked? |  |
| Duration | How long should the traffic be delayed? | 30s |
| Erroneous Call Rate | How many percent of requests should trigger an exception? | 100 |


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

## Spring MVC Controller Exception

Injects a RuntimeException into a Spring™ MVC controller.
The exception is thrown before the handler method is executed.
When an exception is thrown the handler itself will not be executed.

| Parameter   |      Description      | Default |
|----------|-------------|-------------|
| Request Mapping | Which request mapping pattern should be used to match the requests? | |
| Http Method |Which http method should be used to match the requests?  | Any |
| Duration | How long should the traffic be delayed? | 30s |
| Erroneous Call Rate | What percentage of requests should trigger an exception? | 100 |

## Spring JDBC Template Delay

Delay a Spring™ JDBC Template response by the given duration.

| Parameter   |      Description      | Default |
|----------|-------------|-------------|
| Operation | Which operation should be attacked? | Any |
| Duration |  How long should the traffic be delayed? | 30s |
| Delay | How much should the traffic be delayed? | 500ms |
| Jitter | Random +-30% jitter to network delay | true |
| JDBC Connection Url | Which JDBC connection should be attacked? | Any |

## Spring JDBC Template Exception

Throws an exception in a  Spring™ JDBC Template.

| Parameter   |      Description      | Default |
|----------|-------------|-------------|
| Operation | Which operation should be attacked? | Any |
| Duration |  How long should the traffic be delayed? | 30s |
| Jitter | Random +-30% jitter to network delay | true |
| JDBC Connection Url | Which JDBC connection should be attacked? | Any |
| Erroneous Call Rate | How many percent of calls should trigger an exception? | 100 |
