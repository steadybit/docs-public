---
title: "FAQ"
---

### How do I exclude my JVM from the discovery mechanism?

You can add the label `com.steadybit.agent/jvm-attach=false` to your container and the agent will not perform an attachment.

If the application is not running as container, add the `steadybit.agent.disable-javattachment` flag to your JVM commandline like in this example:

```
java -Dsteadybit.agent.disable-javattachment -jar spring-boot-sample.jar --server.port=0
```


