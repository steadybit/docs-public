---
title: Troubleshooting Extension
---

# Extension

### Why is the extension-container failing due to failed volume mounting?

**Problem** When deploying the extension-container, the extension startup fails with an error message as shown below.

```
MountVolume.SetUp failed for volume "..." : hostPath type check failed: /run/.../runc/k8s.io is not a directory
```

**Solution** The error indicates that the extension runs on the wrong container runtime (Docker, cri-o, or containerd). To fix this issue, you must configure another one in the installation. You can change the extension's runtime easily via helm parameter. If you've used the Agent helm-chart to deploy Agent and extensions, you can configure the `extension-container.container.runtime` parameter.

```
  --set extension-container.container.runtime=... //containerd, docker or cri-io
```

If you deployed the extension-container standalone, the parameter's name is `container.runtime`.

### Why can't I install any extensions on my GKE Kubernetes cluster?

**Problem** When installing an extension in my Kubernetes cluster with enabled GKE autopilot, I'm getting an error like
```
autopilot-default-resources-mutator:Autopilot updated DaemonSet steadybit-agent/steadybit-agent-extension-host: adjusted resources to meet requirements for containers [extension-host] (see http://g.co/gke/autopilot-resources)
Violations details: {"[denied by autogke-default-linux-capabilities]":["linux capability 'SYS_ADMIN,SYS_RESOURCE,SYS_BOOT,SYS_TIME,NET_ADMIN' on container 'extension-host' not allowed; Autopilot only allows the capabilities: 'AUDIT_WRITE,CHOWN,DAC_OVERRIDE,FOWNER,FSETID,KILL,MKNOD,NET_BIND_SERVICE,NET_RAW,SETFCAP,SETGID,SETPCAP,SETUID,SYS_CHROOT,SYS_PTRACE'."],"[denied by autogke-disallow-hostnamespaces]":["enabling hostNetwork is not allowed in Autopilot.","enabling hostPID is not allowed in Autopilot."],"[denied by autogke-no-host-port]"
```

**Solution** Our extensions do not work when GKE Autopilot is activated, as they need to run with special privileges and this is not possible on GKE Autopilot.
Please use a GKE Standard cluster instead.


### Why can't I install the extension-container on my Docker-Desktop with Kubernetes enabled?

**Problem** I'm using Docker-Desktop with enabled Kubernetes support and see errors for the extension-container like:
```
Warning  FailedMount  11s (x6 over 26s)  kubelet            MountVolume.SetUp failed for volume "runtime-runc-root" : hostPath type check failed: /run/docker/runtime-runc/moby is not a directory 
```

**Solution** Kubernetes by Docker-Desktop is not supported by the extension-container. Please use [Minikube](https://minikube.sigs.k8s.io/docs/start/) instead.

### Why are my extensions not working reliably, noticeable by intermittent OOMs, timeouts, or high CPU usage?

**Problem** Some of my extensions aren't running reliably and are killed due to Out-of-Memory or show timeouts due to high CPU usage.

**Solution** We aim for sane defaults in our Helm Charts regarding CPU and Memory requests/limits and design the extensions to have a low resource consumption.
However, resource usage depends on the size of your environment.
You need to increase the settings if you have massive Kubernetes clusters or big container hosts.\
\
Running observability tools that instrument your applications by injecting processes (e.g., Dynatrace) or manipulating bytecode (e.g., Instana) can lead to increased resource consumption.
You might want to exclude the Steadybit Agent and Extensions from this, or need to adapt your resource requests.


### Why is my JVM application warning about dynamic loading of agents?

**Problem** I see a warning in the logs of my JVM that a dynamic agent has been attached to the JVM, like:

```
WARNING: A Java agent has been loaded dynamically (...javaagent-init.jar)
WARNING: Dynamic loading of agents will be disallowed by default in a future release
```

**Solution** This warning is normal and expected because to be able to discover your JVM applications the extension-jvm needs access to the java process.
This is done by using the `attach` mechanism of the JVM which is a standard mechanism and is used by many other tools as well.
To avoid this warning or be able to use this extension in future java releases you can use the `-XX:+EnableDynamicAgentLoading` flag in your JVM commandline to be able to load the javaagent dynamically.
