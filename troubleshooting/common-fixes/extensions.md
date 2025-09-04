---
title: Troubleshooting Extension
---

# Extensions

#### Why is the extension-container failing due to failed volume mounting?

When deploying the extension-container, the extension startup may fail with an error message as shown below.

```
MountVolume.SetUp failed for volume "..." : hostPath type check failed: /run/.../runc/k8s.io is not a directory
```

This error indicates that the extension runs on the wrong container runtime (Docker, cri-o, or containerd). To fix this issue, you must configure another one in the installation. You can change the extension's runtime easily via helm parameter. If you've used the Agent helm-chart to deploy Agent and extensions, you can configure the `extension-container.container.runtime` parameter.

```
  --set extension-container.container.runtime=... //containerd, docker or cri-io
```

If you deployed the extension-container standalone, the parameter's name is `container.runtime`.

#### My nodes report that they run on containerd but the extension-container fails with the error message `SetUp failed for volume "runtime-socket" : hostPath type check failed: /run/containerd/containerd.sock is not a socket file`

You might run on k3s, which uses containerd as the container runtime, but has a different path for the containerd socket. You can fix this issue by setting the correct path to the containerd socket via the `extension-container.containerEngines.containerd.socket` parameter.

```
--set extension-container.containerEngines.containerd.socket=/var/run/k3s/containerd/containerd.sock
```

#### Why can't I install the extensions container, host or jvm on my Kubernetes cluster?

If you are using for example GKE Autopilot, you might not be able to install the extension container, host or jvm on your Kubernetes cluster. This is because the extension needs to run with special privileges and this is not possible on GKE Autopilot.

Please use a GKE Standard cluster instead.

The error could look like this:

```
autopilot-default-resources-mutator:Autopilot updated DaemonSet steadybit-agent/steadybit-agent-extension-host: adjusted resources to meet requirements for containers [extension-host] (see http://g.co/gke/autopilot-resources)
Violations details: {"[denied by autogke-default-linux-capabilities]":["linux capability 'SYS_ADMIN,SYS_RESOURCE,SYS_BOOT,SYS_TIME,NET_ADMIN' on container 'extension-host' not allowed; Autopilot only allows the capabilities: 'AUDIT_WRITE,CHOWN,DAC_OVERRIDE,FOWNER,FSETID,KILL,MKNOD,NET_BIND_SERVICE,NET_RAW,SETFCAP,SETGID,SETPCAP,SETUID,SYS_CHROOT,SYS_PTRACE'."],"[denied by autogke-disallow-hostnamespaces]":["enabling hostNetwork is not allowed in Autopilot.","enabling hostPID is not allowed in Autopilot."],"[denied by autogke-no-host-port]"
```

#### Why can't I install the extensions-container on my Docker-Desktop with Kubernetes enabled?

Docker-Desktop is not supported by the extensions-container. Please use minikube instead.

[Minikube](https://minikube.sigs.k8s.io/docs/start/)

The error could look like this:

```
Warning  FailedMount  11s (x6 over 26s)  kubelet            MountVolume.SetUp failed for volume "runtime-runc-root" : hostPath type check failed: /run/docker/runtime-runc/moby is not a directory 
```

#### We see intermittent OOMs on extensions or timeouts due to high CPU usage. This makes the extensions unreliable.

We aim for sane defaults in our Helm Charts regarding CPU and Memory requests/limits and design the extensions to have a low resource consumption. However, resource usage depends on the size of your environment. You need to increase the settings if you have massive Kubernetes clusters or big container hosts.\
\
Running observability tools that instrument your applications by injecting processes (e.g., Dynatrace) or manipulating bytecode (e.g., Instana) can lead to increased resource consumption. You might want to exclude the Steadybit Agent and Extensions from this, or need to adapt your resource requests.

#### Extension-jvm warning about `Dynamic loading of agents`

To be able to discover we need access to the java process. This is done by using the `attach` mechanism of the JVM. This is a standard mechanism and is used by many other tools. You may see a warning in the logs of the JVM that the extension is attaching to the JVM. This is normal and expected. It will look like this:

```
WARNING: A Java agent has been loaded dynamically (...javaagent-init.jar)
WARNING: Dynamic loading of agents will be disallowed by default in a future release
```

To avoid this warning or be able to use this extension in future java releases you can use the `-XX:+EnableDynamicAgentLoading` flag in your JVM commandline to be able to load the javaagent dynamically.
