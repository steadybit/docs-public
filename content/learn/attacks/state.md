---
title: "State Attacks"
navTitle: "State"
metaTitle: "State Attacks - steadybit Docs"
metaDescription: "steadybit state attacks can cause turbulent conditions on the infrastructure and platform level"
---

With the state attacks you can cause turbulent conditions on the infrastructure and platform level and for example increase the CPU load for a certain period of time. Each attack at this level can be configured in detail.

The state attacks support Docker Containers, a Host or Processes. This information is determined by the Auto Discovery and processed and analyzed in the steadybit Platform.

## Pause Container
Pauses one or more Docker Container for a certain time.

| Parameter   |      Description      | Default |
|----------|-------------|-------------|
| Duration | How long should the container be paused? | 30s |

## Stop Container
Terminates one or more Docker Containers.

| Parameter   |      Description      | Default |
|----------|-------------|-------------|
| Graceful |  Should the container be stopped gracefully using the `SIGTERM` or immediately killed using the `SIGKILL` | true |

## Shutdown Host
Perform a host reboot or shutdown.

| Parameter   |      Description      | Default |
|----------|-------------|-------------|
| Reboot | Should the host reboot after shutting down? | true |

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
