---
title: Troubleshooting Extension
---

# Troubleshooting Extension

#### Why can't I install the extensions container, host or jvm on my Kubernetes cluster?

If you are using for example GKE Autopilot, you might not be able to install the extension container, host or jvm on your Kubernetes cluster. This is because the extension needs to run with special privileges and this is not possible on GKE Autopilot.

Please use a GKE Standard cluster instead.

The error could look like this:

```
autopilot-default-resources-mutator:Autopilot updated DaemonSet steadybit-outpost/steadybit-outpost-extension-host: adjusted resources to meet requirements for containers [extension-host] (see http://g.co/gke/autopilot-resources)
Violations details: {"[denied by autogke-default-linux-capabilities]":["linux capability 'SYS_ADMIN,SYS_RESOURCE,SYS_BOOT,SYS_TIME,NET_ADMIN' on container 'extension-host' not allowed; Autopilot only allows the capabilities: 'AUDIT_WRITE,CHOWN,DAC_OVERRIDE,FOWNER,FSETID,KILL,MKNOD,NET_BIND_SERVICE,NET_RAW,SETFCAP,SETGID,SETPCAP,SETUID,SYS_CHROOT,SYS_PTRACE'."],"[denied by autogke-disallow-hostnamespaces]":["enabling hostNetwork is not allowed in Autopilot.","enabling hostPID is not allowed in Autopilot."],"[denied by autogke-no-host-port]"
```

#### Why can't I install the extensions-container on my Docker-Desktop with Kubernetes enabled?

Docker-Desktop is not supported by the extensions-container. Please use minikube instead.

[Minikube](https://minikube.sigs.k8s.io/docs/start/)

The error could look like this:

```
Warning  FailedMount  11s (x6 over 26s)  kubelet            MountVolume.SetUp failed for volume "runtime-runc-root" : hostPath type check failed: /run/docker/runtime-runc/moby is not a directory 
```