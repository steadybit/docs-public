# Using Mutual TLS for Extensions

For stronger security, the communication between the agent and extensions can be secured using mutual TLS.&#x20;

You need to configure a client certificate at the agent that will be used to communicate with the extensions. And also a server certificate and client CAs at the extension to verify the client certificate.

## Configuring a Client Certificate for Agent

{% tabs %}
{% tab title="using Helm Chart" %}
#### Using a Secret

In case the client certificate is stored in a secret, you can directly reference it:

`agent.extensions.tls.clientCertificate.fromSecret=some-client-secret`

#### Using a Container path

If you put the client certificate into the container some other way, use this option to tell the agent where to find it:

`agent.extensions.clientCertificate.path=/some/client.crt`\
`agent.extensions.clientCertificate.key.path=/some/client.key`

#### Password Protected Private Keys

In case the private key is password protected, you can specify it as well:

**Using a Value**

`agent.extensions.tls.clientCertificate.key.password.value=password123`

**Using a Secret**

`agent.extensions.tls.clientCertificate.key.password.valueFrom.secretKeyRef.name=some-secret`\
`agent.extensions.tls.clientCertificate.key.password.valueFrom.secretKeyRef.key=some-key`

#### Additional Certificate Authorities

In case the extension uses custom CAs that are not known to the agent, you can add them as well:

**Using a Volume Mount**

The volume in this sample refers to a config map, but any other volume config would work as well.

`agent.extraCertificates.fromVolume=extra-certs`\
`agent.extraVolumes[0].name=extra-certs`\
`agent.extraVolumes[0].configMap.name=self-signed-ca`

**Using Container Path**

If you put the extra CAs into the container another way, you can specify the path to it:

`agent.extraCertificates.fromVolume=extra-certs`
{% endtab %}

{% tab title="using Environment Variables" %}
#### Client Certificate

`STEADYBIT_AGENT_EXTENSIONS_CLIENT_CERT_CHAIN_FILE=/some/client.crt`\
`STEADYBIT_AGENT_EXTENSIONS_CLIENT_CERT_KEY_FILE=/some/client.key`

#### Password Protected Private Keys

In case the private key is password protected, you can specify it as well:

`STEADYBIT_AGENT_EXTENSIONS_CLIENT_CERT_PASSWORD=password123`

#### Additional Certificate Authorities

In case the extension uses a custom CA that is not known to the agent you can add them as well.

`STEADYBIT_AGENT_EXTRA_CERTS_PATH=/some/ca-certs/`
{% endtab %}
{% endtabs %}

If you have successfully configured the client certificate for the agent, the log should contain similar output to this:

{% code overflow="wrap" %}
```
2023-07-29 06:27:05.836  INFO 1 --- [     parallel-1] c.s.k.c.service.ExtensionHttpClient      : Configuring extension http client using mutual TLS (keyFile=/opt/steadybit/agent/etc/extensions/client/tls.key, chainFile=/opt/steadybit/agent/etc/extensions/client/tls.crt)
```
{% endcode %}

## Requiring Client Certificates in Extensions

{% tabs %}
{% tab title="Using Helm Chart" %}
The `steadybit-agent` helm charts include all extensions provided by Steadybit using a `extension-*` prefix.  This sample is for `extension-container`, the options shown here apply to the other extensions as well. And in case you use the extensions helm chart directly, you need to strip the prefix from the examples.

For the extension to require client certificates, you need to configure both the server certificate and allowed client certificates. If you only specify a server certificate, TLS is used, but client certificates are not mandatory.

#### Server Certificate

**Using a Secret**

In case the server certificate is stored in a secret, you can directly reference it:

`extension-container.tls.server.certificate.fromSecret=some-server-secret`

**Using a Container Path**

If you put the server certificate into the container some other way, use this option to tell the agent where to find it:

`extension-container.tls.server.certificate.path=/some/server.crt`\
`extension-container.tls.server.certificate.key.path=/some/server.key`

#### Client Certificates

**Using Secrets**

In case the client certificates are stored in secrets, you can directly reference them:

`extension-container.tls.client.certificates.fromSecrets[0]=some-secret-1`\
`extension-container.tls.client.certificates.fromSecrets[1]=some-secret-2`

**using Container Path**

If you put the client certificates into the container some other way, use this option to tell the agent where to find them:

`extension-container.tls.client.certificates.paths[0]=/some/client.crt`\
`extension-container.tls.client.certificates.paths[1]=/some/clients/`
{% endtab %}

{% tab title="Using Environment Variables" %}
#### Server Certificate

`STEADYBIT_EXTENSION_TLS_SERVER_CERT=/some/server.crt`\
`STEADYBIT_EXTENSION_TLS_SERVER_KEY=/some/server.key`

#### Client Certificates

`STEADYBIT_EXTENSION_TLS_CLIENT_CAS=/some/client.crt,/some/clients/`
{% endtab %}
{% endtabs %}

If you have successfully configured the server certificate and the allowed client certificates for an extension, the log should contain similar output to this:

```
2023-07-29 06:26:51.600 INF Starting extension server on port 9093 (TLS: true)
```
