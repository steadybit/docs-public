---
title: Discovery
---

# Discovery

The steadybit agent discovers your system by providing meta data about potential targets as well as the context your system is running in.

Thereby, the steadybit agents collects information about the following target types:

* [Host Targets](host.md)
* [Container Targets](container.md)
* [Application Targets](application.md)

In addition, the agent gathers information about the context where the targets are running. We support

* [Cloud Context](cloud.md) for major Cloud Providers
* [Custom Context](custom.md) for customizable on-prem solutions

Read about [adding custom attributes](custom.md)

# Build your own via DiscoveryKit
You are missing support for a target type?
No problem, we over development kits in order to provide your own discovery.
More infos can be found in the GitHub project [DiscoveryKit](https://github.com/steadybit/discovery-kit)
