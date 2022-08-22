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

The API gateway Kong can be interacted with through the Kong extension. It facilitates verifying how Kong services behave during intermittent outages or when
services misbehave.

#### Kong Services

* Kong service discovery
* attack to configure the [request termination plugin](https://docs.konghq.com/hub/kong-inc/request-termination/) for a service/consumer/trigger combination

### References

* [GitHub](https://github.com/steadybit/extension-kong)
* [Installation Instructions](https://github.com/steadybit/extension-kong#readme)

## Postman ([extension-postman](https://github.com/steadybit/extension-postman#readme))

### ![](../../.gitbook/assets/postman.png)

This extension allows to integrate Postman Cloud resources within steadybit.

:warning: The Postman extension is currently bundled in the out-of-the-box version of steadybit. This code should help you to understand the usage
of [Action kit](https://github.com/steadybit/action-kit).

### Capabilities

* Execute Collections

### References

* [GitHub](https://github.com/steadybit/extension-postman)
* [Installation Instructions](https://github.com/steadybit/extension-postman#readme)