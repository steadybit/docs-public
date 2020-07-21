---
title: "FAQ"
navTitle: "FAQ"
---

## How do I exclude my JVM from the discovery mechanism?

Simply add the `chaosmesh.agent.disable-javattachment` flag to your JVM commandline like in this example:

```
java -Dchaosmesh.agent.disable-javattachment -jar spring-boot-sample.jar --server.port=0
```

