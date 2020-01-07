---
title: "Network"
---
Find out how lost or delayed traffic affects your application with our network attacks. Test how your service behaves when it can't reach the required resources internally or externally. You can limit the effects by specifying host names, IP addresses or port numbers.


> All attacks can have a <b>Host</b> or a <b>Container</b> as their target, the configuration is the same.

---

### Delay Traffic
Inject latency into all matching egress traffic.

This attack can be adjusted using the following parameters and the effects can be limited.

| Parameter   |      Description      | Default |
|----------|-------------|-------------|
| Duration |  How long should the traffic be delayed? | 30s |
| Hostname |    Restrict from/to which hosts the traffic is delayed   | |
| IP Address | Restrict from/to which ip address the traffic is delayed | |
| Network Delay | How much should the traffic be delayed? | 500ms |
| Network Interface | Target Network Interface which should be attacked | eth0 |
| Port Number | Restrict to which port number the traffic is delayed | |

---
### Drop Traffic
Drops all matching network traffic.

This attack can be adjusted using the following parameters and the effects can be limited.

| Parameter   |      Description      | Default |
|----------|-------------|-------------|
| Duration |  How long should the traffic be lost? | 30s |
| Hostname |    Restrict from/to which hosts the traffic is lost   | |
| IP Address | Restrict from/to which ip address the traffic is lost | |
| Network Loss | How much percentage of traffic should be lost? | 70 |
| Network Interface | Target Network Interface which should be attacked | eth0 |
| Port Number | Restrict to which port number the traffic is delayed | |

---
### Limit Bandwith
Limits bandwith for all matching network traffic.

This attack can be adjusted using the following parameters and the effects can be limited.

| Parameter   |      Description      | Default |
|----------|-------------|-------------|
| Network Bandwith |  How much traffic should be allowed per second? | 1024kbit |
| Duration |    How long should the bandwidth be reduced?   | 30s |
| Hostname |    Restrict from/to which hosts the traffic is reduced   | |
| IP Address | Restrict from/to which ip address the traffic is reduced | |
| Network Interface | Target Network Interface which should be attacked | eth0 |
| Port Number | Restrict to which port number the traffic is reduced | |

