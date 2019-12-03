---
title: "Install on Linux Hosts"
---

The following command will download and run the latest chaosmesh agent package on your system:

```shell
curl -o install_agent.sh https://setup.chaosmesh.io/agent \
&& chmod 700 ./install_agent.sh \
&& sudo ./install_agent.sh -a <apikey>
```
