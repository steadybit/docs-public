---
title: "Slack Notifications"
---
TODO
You can configure Webhooks in steadybit under Settings > Notifications & Webhooks.
You can use Webhooks to recieve notifications via Slack or to integrate with you custom tooling.

## Slack Notifications

You can use this Webhook to receive Slack/Rocket Chat messages, whenever a experiment is executed or experimenting is stopped/continued.

> If you use an on-prem installation make sure to set the `STEADYBIT_WEB_PUBLIC_URL`, so we can add links to open steadybit via links in the message.

| | |
|--------------|-------|
| **Name**     | The name for this integration will not show up in the message. |
| **URL**      | The Slack webhook URL, which you can create in Slack by navigating Manage apps > Custom Integrations > Incoming Webhooks. |
| **Channel**  | The Slack channel which receives the message. If omitted the default from the Slack Webhook configuration will be used. <br/> **optional**   |
| **Icon Url** | You may specify a different icon to be used for the message. <br/> **optional** |
| **Team**     | If no team is specified, you'll receieve all events. If you do specify a team you'll only receive notifications relevant for this team |
| **Events**   | You may select the events you want to recieve. |

## Webhooks

| | |
|--------------|-------|
| **Name**     | The name for this integration will not show up in the JSON body. |
| **URL**      | The URL, which will receive a HTTP Post request with the JSON body |
| **Secret**   | You may a specify a secret which will be used to sign the body. [Verifying the signature](#verifyingthesignature). <br/> **optional**   |
| **Team**     | If no team is specified, you'll receieve all events. If you do specify a team you'll only receive events relevant for this team |
| **Events**   | You may select the events you want to recieve. |

### Content

The content type is `application/json` and the message is described in our [OpenAPI specification](https://platform.steadybit.io/api/spec) as `WebhookPayload`.

### Verifying the Signature

If a secret is provided a signature of the body is computed using `HMAC SHA-256` and sent as `X-SB-Signature` http header.
You can use this header to verify the message.

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
