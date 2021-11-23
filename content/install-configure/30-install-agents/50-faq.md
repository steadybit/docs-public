---
title: "FAQ"
---

### How do I exclude my JVM from the discovery mechanism?

You can add the label `com.steadybit.agent/jvm-attach=false` to your container and the agent will not perform an attachment.

If the application is not running as container, add the `steadybit.agent.disable-javattachment` flag to your JVM commandline like in this example:

```
java -Dsteadybit.agent.disable-javattachment -jar spring-boot-sample.jar --server.port=0
```

### How much system resources (CPU/Memory) does the agent consume?

The resource consumption of the agent depends significantly on the following influencing factors and can therefore not be named exactly:

* Discovered targets
* Configured discovery interval (default ist 5000ms)
* Active experiments
* Active actions

There is also a hibernation feature, which disables all attacks, the discovery mechanism and minimizes communication to the platform.
However, it can generally be said that the resource consumption is very low and basically not noticeable in normal operation.
