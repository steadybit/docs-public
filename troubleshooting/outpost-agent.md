---
title: Troubleshooting Outpost Agent
---

# Troubleshooting Outpost Agent

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


#### Installation outpost agent on AWS EKS cluster

- First: make sure to configure the [Amazon-EBS-CSI-Driver](https://docs.aws.amazon.com/eks/latest/userguide/managing-ebs-csi.html#adding-ebs-csi-eks-add-on)
- Afterwards add the Amazon-EBS-CSI-Driver addon on your EKS cluster, with newly created IAM role
