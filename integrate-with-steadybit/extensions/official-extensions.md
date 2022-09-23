# Official Extensions

## AWS ([extension-aws](https://github.com/steadybit/extension-aws#readme))

<img src="../../.gitbook/assets/aws-logo.jpeg" alt="" data-size="original">

The AWS extension enhances Steadybit's native capabilities to discover and inject chaos within usages of Amazon Web Services (AWS).

### Capabilities

#### Amazon Elastic Cloud Compute (EC2)

* State change attack for EC2 instances, e.g., stop, hibernate, terminate and reboot.

#### Amazon Relational Database Service (RDS)

* RDS instance discovery
* attack to reboot RDS instances

### References

* [GitHub](https://github.com/steadybit/extension-aws)
* [Installation Instructions](https://github.com/steadybit/extension-aws#readme)

## Kong ([extension-kong](https://github.com/steadybit/extension-kong))

### ![](../../.gitbook/assets/kong-logo.png)

### Capabilities

The API gateway Kong can be interacted with through the Kong extension. It facilitates verifying how Kong services behave during intermittent outages or when services misbehave.

#### Kong Services

* Kong service discovery
* attack to configure the [request termination plugin](https://docs.konghq.com/hub/kong-inc/request-termination/) for a service/consumer/trigger combination

### References

* [GitHub](https://github.com/steadybit/extension-kong)
* [Installation Instructions](https://github.com/steadybit/extension-kong#readme)

## Kubernetes (beta, [extension-kubernetes](https://github.com/steadybit/extension-kubernetes))

### ![](<../../.gitbook/assets/logo (1).png>)

### Capabilities

The Kubernetes extension complements Steadybit's natively supported Kubernetes actions and discoveries.

#### Deployments

* Rollout restart attack with an optional check to verify rollout completion

### References

* [GitHub](https://github.com/steadybit/extension-kubernetes)
* [Installation Instructions](https://github.com/steadybit/extension-kubernetes#readme)

## Postman ([extension-postman](https://github.com/steadybit/extension-postman#readme))

### ![](../../.gitbook/assets/postman.png)

This extension allows to integrate Postman cloud resources within Steadybit.

:warning: The Postman extension is currently bundled in the out-of-the-box version of Steadybit. This code should help you to understand the usage of [ActionKit](https://github.com/steadybit/action-kit).

### Capabilities

* Execute collections

### References

* [GitHub](https://github.com/steadybit/extension-postman)
* [Installation Instructions](https://github.com/steadybit/extension-postman#readme)



## Prometheus (_beta_, [extension-prometheus](https://github.com/steadybit/extension-prometheus))

![](../../.gitbook/assets/logo.png)

A Steadybit check implementation to gather Prometheus metrics within chaos engineering experiment executions. These can be used as checks within experiments, e.g., to implement pre- and post-conditions.

### Capabilities

* Execute metric queries
* Support for multiple Prometheus instances

### References

* [GitHub](https://github.com/steadybit/extension-prometheus)
* [Installation Instructions](https://github.com/steadybit/extension-prometheus#readme)
