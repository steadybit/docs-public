---
title: "Host Discovery"
navTitle: "Host"
---

## Host Targets

Each agent contributes the host it's running on as target.
For each host the following attributes are provided:
 * Hostname
 * Domainname
 * OS Family
 * OS Version
 * Ipv4 Addresses

## Process Targets

The agent discovers all running processes by reading `/proc` and will report them to the platform.
For each process the following attributes are provided:
 * PID (only for process 1)
 * Command
 * User
 * Group
 * Hostname
