---
title: Preflight Webhooks
---

# Preflight Webhooks

`
This is an enterprise feature. Please contact us at to get access.
`
[https://steadybit.com/contact](https://steadybit.com/contact)

Preflight webhooks are triggered by steadybit whenever e.g. an experiment should start. You can configure them at `Settings / Application Settings / Integrations / Preflight webhook`. The content type is `application/json` and the message is described in our [OpenAPI specification](https://platform.steadybit.com/api/spec) as `WebhookPayload`.
If the webhook returns a HTTP status code other than 2xx, the experiment will not be started.

![addPreflightWebhook.png](addPreflightWebhook.png)

|            |                                                                                                                                                                                               |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Name**   | The name for this preflight webhook will not show up in the JSON body.                                                                                                                        |
| **URL**    | The URL, which will receive a HTTP Post request with the JSON body                                                                                                                            |
| **Secret** | <p>You may a specify a secret which will be used to sign the body. <a href="webhooks.md#verifying-the-signature">Verifying the signature.</a><br><strong>optional</strong></p>                |
| **Team**   | If no team is specified, preflight checks will be performed for all teams. If you do specify a team only preflight checks are made for this team. Other teams are not involved in this check. |
| **Events** | There is only one event here. The event: Execution preflight checks                                                                                                                           |

#### Verifying the Signature

If a secret is provided a signature of the body is computed using `HMAC SHA-256` and sent as `X-SB-Signature` http header. You can use this header to verify the message.

Here is an example of doing this in Java:

```java
private static boolean validateSignature(byte[] body, String secret, String header) throws Exception {
    //calculate the signature using the secret
    Mac mac = Mac.getInstance("HmacSHA256");
    mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
    byte[] signature = mac.doFinal(body);

    //remove the algorithm prefix and decode the hex to bytes[]
    byte[] receivedSignature = Hex.decode(header.replaceFirst("^hmac-sha256 ", ""));

    //compare using time-constant algorithm
    return MessageDigest.isEqual(signature, receivedSignature);
}
```

### Run Status

During the experiment run you can see that preflight webhooks are triggered

![prefligtRunStatusSuccess.png](prefligtRunStatusSuccess.png)

![prefligtRunStatusFail.png](prefligtRunStatusFail.png)