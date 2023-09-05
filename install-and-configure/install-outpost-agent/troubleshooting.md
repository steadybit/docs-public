---
title: FAQ
---

# Troubleshooting

#### Why can't I install the extensions container, host or jvm on my Kubernetes cluster?

If you are using for example GKE Autopilot, you might not be able to install the extension container, host or jvm on your Kubernetes cluster. This is because the extension needs to run with special privileges and this is not possible on GKE Autopilot.
Please use a GKE Standard cluster instead.

The error could look like this:

```
autopilot-default-resources-mutator:Autopilot updated DaemonSet steadybit-outpost/steadybit-outpost-extension-host: adjusted resources to meet requirements for containers [extension-host] (see http://g.co/gke/autopilot-resources)
Violations details: {"[denied by autogke-default-linux-capabilities]":["linux capability 'SYS_ADMIN,SYS_RESOURCE,SYS_BOOT,SYS_TIME,NET_ADMIN' on container 'extension-host' not allowed; Autopilot only allows the capabilities: 'AUDIT_WRITE,CHOWN,DAC_OVERRIDE,FOWNER,FSETID,KILL,MKNOD,NET_BIND_SERVICE,NET_RAW,SETFCAP,SETGID,SETPCAP,SETUID,SYS_CHROOT,SYS_PTRACE'."],"[denied by autogke-disallow-hostnamespaces]":["enabling hostNetwork is not allowed in Autopilot.","enabling hostPID is not allowed in Autopilot."],"[denied by autogke-no-host-port]"
```


#### We get certificate errors when the agent connects to our on-premise Steadybit installation. What do we need to do?

The most common reasons for connectivity issues are related to:

* Self-signed certificates that are not trusted.
* Root certificate authorities that are not trusted.
* Incomplete certificate chains.

At runtime, this will typically manifest in the agent through log entries like this:

```
2022-03-14T20:31:30.562 WARN  [istration-task-1] | AgentRegistrator | agent-platform-connector - 0.7.17 | Failed to register agent: I/O error on POST request for "https://steadybit.acme.example.com/api/agents": PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target; nested exception is javax.net.ssl.SSLHandshakeException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
```

To analyze the situation from your end, we recommend starting by ensuring that TLS is correctly configured. You can do so via the `openssl` command-line tool.

```
openssl s_client -showcerts -connect {{YOUR DOMAIN HERE}}:443 -servername {{YOUR DOMAIN HERE}}
```

This should print a whole lot of information. Most relevant are the `Verify return code:` sections. These sections should always report `Verify return code: 0 (ok)`. For other return codes, please check out the following sub-sections:

**Verify return code: 19 (self-signed certificate in certificate chain)**

This happens for self-signed certificates. You can typically resolve these problems through the `STEADYBIT_AGENT_EXTRA_CERTS_PATH` environment variable. This environment variable should point to a directory containing your root certificates. The agent will load all certificates in this directory into the Java key store upon agent startup. This, in turn, makes the agent trust your custom certificates.

You can also check the environment variable's effect by adding the `-CAfile root-certificate.pem` command-line argument to the `openssl` command shown in the previous section.

**Verify return code: 21 (unable to verify the first certificate)**

The agent requires a complete certificate chain configuration for security reasons and this return code indicates that your server responded with an incomplete certificate chain. You can fix this issue by modifying the server that terminates the TLS connection. Please refer to your server/proxy/CDN documentation to learn how to configure a complete certificate chain.
