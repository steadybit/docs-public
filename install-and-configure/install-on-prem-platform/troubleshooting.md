---
title: "Troubleshooting OnPrem Platform"
navTitle: "Troubleshooting"
---

When you installed the platform on-premises, you might encounter some issues. This page describes some common issues and how to solve them.

## Platform and Postgres are in CrashLoopBackOff

- check the logs of the platform and postgres containers
```bash
    kubectl logs -f -n steadybit-platform steadybit-platform-postgresql-0 --previous
    kubectl logs -f -n steadybit-platform steadybit-platform-0 --previous
  ```
- verify that the postgres password is correct and base64 encoded in the manifest file

## Use see your Kubernetes namespaces and deployments multiple times in the Landscape table

- check the logs of the agents
```bash
    kubectl logs -f -n steadybit-agent steadybit-agent-0
  ```
- if you see this error: `Missing permissions to create leases for the leader elections` or `Cannot perform leader election. All agents will behave as leader.`

  - check if the agent has the correct permissions to create leases
  ```bash
  NAME            APIGROUP↑                    GET            LIST           WATCH          CREATE         PATCH          UPDATE          DELETE          DEL-LIST            
  leases          coordination.k8s.io           ✓              ✓              ✓              ✓              ×              ✓               ×               ×

  ```

## Agents are not able to connect to the platform during an experiment

- check if you can reach the platform from the agent
```bash
    kubectl exec -it -n steadybit-agent steadybit-agent-0 -- curl -k https://steadybit-platform.steadybit-platform.svc.cluster.local:8080
  ```
- check if the agent is able to reach the Websocket Port of the platform.
  - this is usally port 7878 and can be configured in the platform manifest via environment variable `STEADYBIT_WEB_PUBLIC_EXPERIMENT_PORT`
  - please check also your ingress configuration e.g.
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
  