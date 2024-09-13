---
title: Troubleshooting OnPrem Platform
navTitle: Troubleshooting
---

# Troubleshooting

{% hint style="info" %}
This part of the documentation is only intended in the context of a supported PoC (Proof of Concept) together with the Steadybit team.
Please, [book an appointment](https://www.steadybit.com/book-demo) to scope your PoC before continuing to evaluate the on-prem solution.

If you just want to try out Steadybit, we recommend you [sign up for our SaaS platform](https://signup.steadybit.com).
{% endhint %}

This page describes some common issues and how to solve them.

### Platform and Postgres are in CrashLoopBackOff

- Check the logs of the platform and Postgres containers

```bash
    kubectl logs -f -n steadybit-platform steadybit-platform-postgresql-0 --previous
    kubectl logs -f -n steadybit-platform steadybit-platform-0 --previous
```

- Verify that the Postgres password is correct and base64 encoded in the manifest file

### Kubernetes namespaces and deployments show up multiple times in the landscape table

- Check the logs of the agents

```bash
    kubectl logs -f -n steadybit-agent steadybit-agent-0
```

- If you see this error: `Missing permissions to create leases for the leader elections` or `Cannot perform leader election. All agents will behave as leader.`

  - Check if the agent has the correct permissions to create leases.

  ```bash
  NAME            APIGROUP↑                    GET            LIST           WATCH          CREATE         PATCH          UPDATE          DELETE          DEL-LIST
  leases          coordination.k8s.io           ✓              ✓              ✓              ✓              ×              ✓               ×               ×
  ```

### Agents are not able to connect to the platform during an experiment

- Check if you can reach the platform from the agent:

```bash
    kubectl exec -it -n steadybit-agent steadybit-agent-0 -- curl -k https://steadybit-platform.steadybit-platform.svc.cluster.local:8080
```

- Check if the agent can reach the Websocket port of the platform.

  - This is usally port 7878 and can be configured in the platform manifest via environment variable `STEADYBIT_WEB_PUBLIC_EXPERIMENT_PORT` (helm chart: `platform.publicWebsocketPort`)
  - If setting the port is not enough, you can set the url via environment variable `STEADYBIT_WEB_PUBLIC_EXPERIMENT_URL` (helm chart: `platform.ingressOrigin`)
  - Please also check your ingress configuration.

  ```yaml
  spec:
  rules:
    - http:
        paths:
          - pathType: Prefix
            path: /ws
            backend:
              service:
                name: steadybit-platform
                port:
                  number: 7878
          - pathType: Prefix
            path: /
            backend:
              service:
                name: steadybit-platform
                port:
                  number: 80
  ```
  - You can try to connect to the websocket port via curl:
  ```bash
  curl 'https://platform.steadybit.com:443/ws' \
    -H 'Upgrade: websocket' \
    -H 'Connection: Upgrade' \
    -H 'Sec-WebSocket-Key: dummy' \
    -H 'Sec-WebSocket-Version: 13' \
    -v --http1.1
  ```
  
  ```
  > GET /ws HTTP/1.1
  > Host: platform.steadybit.com
  > User-Agent: curl/8.1.2
  > Accept: */*
  > Upgrade: websocket
  > Connection: Upgrade
  > Sec-WebSocket-Key: dummy
  > Sec-WebSocket-Version: 13
  >
  < HTTP/1.1 101 Switching Protocols
  < Date: Thu, 14 Dec 2023 14:37:03 GMT
  < Connection: upgrade
  < upgrade: websocket
  ```

### Platform is behind Nginx and the agents are not able to connect to the platform
Error message in the platform logs:
```
java.lang.IllegalArgumentException: Invalid character found in method name [0x160x030.....[us ]. HTTP method names must be tokens
	at org.apache.coyote.http11.Http11InputBuffer.parseRequestLine(Http11InputBuffer.java:407)
```

Solution:
- set the nginx backend protocol is HTTPS instead of HTTP

### Configured the Platform with a oidc provider and the redirect to the platform is been send as http instead of https
Example error message in the browser:
```
The redirect URI 'http://steadybit-platform.example.com/oauth2/login/code/default' specified in the request does not match the redirect URIs configured for the application 'xyz'. Make sure the redirect URI sent in the request matches one added to your application.
```

Solution:

Set the environment variable: server.tomcat.remoteip.trusted-proxies to a regex that matches the CIDRs of the loadbalancer or reverse proxy.
Add the following environment variable to the platform manifest:
(Example for Google Cloud Load Balancer CIRDs regex)
```yaml
env:
  - name: server.tomcat.remoteip.trusted-proxies
    value: "(35\\.191\\.(?:[0-9]|[1-9][0-9]|1(?:[0-9][0-9])|2(?:[0-4][0-9]|5[0-5]))\\.(?:[0-9]|[1-9][0-9]|1(?:[0-9][0-9])|2(?:[0-4][0-9]|5[0-5])))|(130\\.211\\.(?:[0-3])\\.(?:[0-9]|[1-9][0-9]|1(?:[0-9][0-9])|2(?:[0-4][0-9]|5[0-5])))"
```