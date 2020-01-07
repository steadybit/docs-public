---
title: "Resource"
metaTitle: "Resource Attacks - chaosmesh Docs"

metaDescription: "chaosmesh state attacks can cause turbulent conditions on the infrastructure and platform level"
---

Resource attacks are a good starting point to start Chaos Engineering.

You can find out how your application behaves when the machine it is running on has a high CPU load, is running out of memory or is performing many IO operations.

> All attacks can have a <b>Host</b> or a <b>Container</b> as their target, the configuration is the same.

---

### Stress CPU
Generate CPU load for one or more cores

| Parameter   |      Description      | Default |
|----------|-------------|-------------|
| CPU Worker |  How many CPU cores should be consumed? | 2 |
| CPU Load |  How much CPU should be consumed? | 80 |
| Duration |  How long should CPU be consumed? | 30s |

---
### Stress IO
Generate read/write operation on hard disks.

> If the Stress IO attack is executed on a host, the `stress-ng` tool is required.

| Parameter   |      Description      | Default |
|----------|-------------|-------------|
| Duration |  How long should IO be consumed? | 30s |
| Workers |  Note that this can cause systems to trip the kernel OOM killer on Linux systems if not enough physical memory and swap is not available | 1 |

---
### Stress Memory
Allocate a specific amount of memory.

> If Stress Memory attack is executed on a host, the `stress-ng` tool is required.

| Parameter   |      Description      | Default |
|----------|-------------|-------------|
| Duration | How long should CPU be consumed? | 30s |
| Percentage | How much memory should be wasted? | 75 |
| Workers |  Note that this can cause systems to trip the kernel OOM killer on Linux systems if not enough physical memory and swap is not available | 1 |

