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

  - This is usally port 7878 and can be configured in the platform manifest via environment variable `STEADYBIT_WEB_PUBLIC_EXPERIMENT_PORT`
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
