---
title: Custom Webhooks
---

# Webhooks

Custom webhooks are triggered by steadybit whenever e.g. an experiment has started or failed. You can configure them at `Settings / Application Settings / Integrations / Custom webhook`. The content type is `application/json` and the message is described in our [OpenAPI specification](https://platform.steadybit.com/api/spec) as `WebhookPayload`.

|            |                                                                                                                                                                                |
|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Name**   | The name for this integration will not show up in the JSON body.                                                                                                               |
| **URL**    | The URL, which will receive a HTTP Post request with the JSON body                                                                                                             |
| **Secret** | <p>You may a specify a secret which will be used to sign the body. <a href="webhooks.md#verifying-the-signature">Verifying the signature.</a><br><strong>optional</strong></p> |
| **Team**   | If no team is specified, you'll receieve all events. If you do specify a team you'll only receive events relevant for this team                                                |
| **Events** | You may select the events you want to recieve.                                                                                                                                 |

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
