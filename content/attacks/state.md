---
title: "State Attacks"
navTitle: "State"
metaTitle: "State Attacks - chaosmesh Docs"
metaDescription: "chaosmesh state attacks can cause turbulent conditions on the infrastructure and platform level"
---

With the state attacks you can cause turbulent conditions on the infrastructure and platform level and for example increase the CPU load for a certain period of time. Each attack at this level can be configured in detail.

The state attacks support Docker Containers, a Host or Processes. This information is determined by the Auto Discovery and processed and analyzed in the chaosmesh Platform.

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

## Stop Process
Terminates the specified process, useful for simulating application or dependency crashes.

| Parameter   |      Description      | Default |
|----------|-------------|-------------|
| Graceful |  Should the process be stopped gracefully using the `SIGTERM` or immediately killed using the `SIGKILL` | true |

## Time Travel
Changes the clock time of a host.

| Parameter   |      Description      | Default |
|----------|-------------|-------------|
| Offset |  The offset that will be added to the current time. | true |
| Disable NTP |  Prevent NTP from correcting time during attack. | true |
