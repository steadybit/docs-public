---
title: "State Attacks"
navTitle: "State"
metaDescription: "steadybit state attacks can cause turbulent conditions on the infrastructure and platform level"
---

With the state attacks you can try out what happens when a single process, a container or an entire hosts fails.
These attacks can be useful to see for example:
 - Does an application handle all in-flight requests gracefully on shutdown?
 - Properly configured readiness checks; Does the application handles all traffic successfully after startup?
 - Is the container/host restarted or replaced automatically and does the application recover?
 - How long does the application need to recover?

## Pause Container
Pauses one or more container for a certain time.

*Note:* Only available for the docker container runtime

| Parameter   |      Description      | Default |
|----------|-------------|-------------|
| Duration | How long should the container be paused? | 30s |

## Stop Container
Terminates one or more containers.

| Parameter   |      Description      | Default |
|----------|-------------|-------------|
| Graceful |  Should the container be stopped gracefully using the `SIGTERM` or immediately killed using the `SIGKILL` | true |

## Shutdown Host
Perform a host reboot or shutdown.

| Parameter   |      Description      | Default |
|----------|-------------|-------------|
| Reboot | Should the host reboot after shutting down? | true |

> **Reboot with Kubernetes**
> If you're using the reboot option on Kubernetes nodes, it might be the case that the host finished rebooting and restarting the containers before the control plane takes notice.
> You can verify the behaviour of this attack for example by using the `uptime` command on the hosts.

## Stop Processes
Stops targeted processes on the host in the given time period. Useful for simulating unexpected process failures.

| Parameter   |      Description      | Default |
|----------|-------------|-------------|
| Process |  PID or string to match the process name or command | |
| Graceful | If true a TERM signal is sent before the KILL signal, so the process can cleanup. | true |
| Duration | Over this period the matching processes are killed. | 30s |
| Delay | The delay before the kill signal is sent. | 5s |

## Time Travel
Changes the clock time of a host.

| Parameter   |      Description      | Default |
|----------|-------------|-------------|
| Offset |  The offset that will be added to the current time. | 1h |
| Disable NTP |  Prevent NTP from correcting time during attack. | true |
