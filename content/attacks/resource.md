---
title: "Resource Attacks"
navTitle: "Resource"
metaTitle: "Resource Attacks - chaosmesh Docs"
metaDescription: "chaosmesh state attacks can cause turbulent conditions on the infrastructure and platform level"
---

Resource attacks are a good starting point to start Chaos Engineering.

You can find out how your application behaves when the machine it is running on has a high CPU load, is running out of memory or is performing many IO operations.

> All attacks can have a **Host** or a **Container** as their target, the configuration is the same.<br/>
> If you are not using our container images for the agents, you need install the `stress-ng` tool to attack **Hosts**.

## Stress CPU
Generate CPU load for one or more cores

| Parameter   |      Description      | Default |
|----------|-------------|-------------|
| Worker   |  How many CPU cores should be consumed? | 2 |
| CPU Load |  How many workers should be used to stress the CPU? (0 = 1 per core) | 80 |
| Duration |  How long should CPU be consumed? | 30s |

## Stress IO
Generate read/write operation on hard disks.

| Parameter   |      Description      | Default |
|----------|-------------|-------------|
| Duration |  How long should IO be consumed? | 30s |
| Workers  |  How many workers should continually write, read and remove temporary files? (0 = 1 per core)| 1 |

## Stress Memory
Allocate a specific amount of memory. Note that this can cause systems to trip the kernel OOM killer on Linux if not enough physical memory and swap is available.

| Parameter   |      Description      | Default |
|----------|-------------|-------------|
| Duration | How long should memory be wasted? | 30s |
| Percentage | How much memory should be wasted? | 75 |
| Workers  |  How many workers should produce memory waste? (0 = 1 per core) | 1 |

