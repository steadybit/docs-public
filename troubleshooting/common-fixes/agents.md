---
title: Troubleshooting Agent
---

# Troubleshooting Agent

### We get certificate errors when the agent connects to our on-premise Steadybit installation. What do we need to do?

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


### Installation agent on AWS EKS cluster

1. First: make sure to configure the [Amazon-EBS-CSI-Driver](https://docs.aws.amazon.com/eks/latest/userguide/managing-ebs-csi.html#adding-ebs-csi-eks-add-on)
2. Afterwards add the Amazon-EBS-CSI-Driver addon on your EKS cluster, with newly created IAM role
3. Then add your first node group to the cluster.


### Occasional connection timeouts on the agent -> extension discovery calls, which cause remove targets from discovery

We are using resilience4j for the retry mechanism. The default configuration is to retry 3 times with a wait duration of 30s with an exponential backoff multiplier of 2. This means that the first retry will be after 30s, the second after 60s, and the third after 120s. If all retries fail, the agent will remove the target from the discovery.
You can configure the retry mechanism by setting the following environment variables:


| Environment Variable                                                      | Description                                                                                                                                                |
|---------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `RESILIENCE4J.RETRY_INSTANCES_HTTPDISCOVERY_MAXATTEMPTS`                  | Optional - Resilience4j: The maximum number of attempts (including the initial call as the first attempt) for DiscoveryKit resources                       |
| `RESILIENCE4J.RETRY_INSTANCES_HTTPDISCOVERY_WAITDURATION`                 | Optional - Resilience4j: A fixed wait duration between retry attempts for DiscoveryKit resources                                                           |
| `RESILIENCE4J.RETRY_INSTANCES_HTTPDISCOVERY_ENABLEEXPONENTIALBACKOFF`     | Optional - Resilience4j: Enable or disable exponential backoff for DiscoveryKit resources                                                                  |
| `RESILIENCE4J.RETRY_INSTANCES_HTTPDISCOVERY_EXPONENTIALBACKOFFMULTIPLIER` | Optional - Resilience4j: The multiplier for exponential backoff for DiscoveryKit resources                                                                 |
| `STEADYBIT_AGENT_HTTP_DISCOVERY_USE_RETRY`                                | Optional - Resilience4j: Enable/Disable the retry mechanism. Default is true / enabled                                                                     |

### Agent takes a long time registering the extensions and to submit the first targets

In a very large cluster it might take a while to read all pods in your cluster and scan them for extensions. You can limit the extension auto-registration to a single namespace using the environment variable `STEADYBIT_AGENT_EXTENSIONS_AUTODISCOVERY_NAMESPACE` (helm-value `agent.extensions.autodiscovery.namespace`).

### Install Agent and extension-kubernetes in a managed Kubernetes cluster where you are only allowed to deploy to one namespace

Install the agent/extension with the following helm settings to use roles instead of clusterroles:

```shell
  --set rbac.roleKind="role" \
  --set agent.extensions.autodiscovery.namespace=<replaceme-with-your-namespace> \
  --set extension-kubernetes.role.create=true \
  --set extension-kubernetes.roleBinding.create=true \
  --set extension-kubernetes.clusterRole.create=false \
  --set extension-kubernetes.clusterRoleBinding.create=false \
```

Full example:

```shell
helm upgrade steadybit-agent --install --namespace <replace-me-with-namespace> \
  --create-namespace \
  --set agent.key="<replace-me>" \
  --set global.clusterName="<replace-me>" \
  --set extension-container.container.runtime="<replace-me>" \
  --set agent.registerUrl="<replace-me>"\
  --set rbac.roleKind="role" \
  --set agent.extensions.autodiscovery.namespace="<replace-me-with-namespace>" \
  --set extension-kubernetes.role.create=true \
  --set extension-kubernetes.roleBinding.create=true \
  --set extension-kubernetes.clusterRole.create=false \
  --set extension-kubernetes.clusterRoleBinding.create=false \
  steadybit/steadybit-agent
```