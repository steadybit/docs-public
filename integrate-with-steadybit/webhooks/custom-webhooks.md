---
title: Custom Webhooks
---

# Custom Webhooks

Custom webhooks are triggered by Steadybit whenever an experiment has progressed or the killswitch's status changes.

## Configure

You can configure custom webhooks at `Settings` -> `Integrations` -> `Custom webhook`. The content type is `application/json`, and the message is described in our [OpenAPI specification](https://platform.steadybit.com/api/spec) as `WebhookPayload`.

|            |                                                                                                                                                                                    |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**   | The name for this integration will not show up in the JSON body.                                                                                                                   |
| **URL**    | The URL, which will receive an HTTP Post request with the JSON body                                                                                                                |
| **Secret** | <p>You may specify a secret that will be used to sign the body. <a href="custom-webhooks.md#verifying-the-signature">Verifying the signature.</a><br><strong>optional</strong></p> |
| **Team**   | If no team is specified, you'll receieve all events. If you do specify a team, you'll only receive events relevant to this team                                                    |
| **Events** | Choose the events you want to receive.                                                                                                                                             |

## Supported Events

You can decide to react to the following events individually or get informed about all events.

### Experiment Executions

The body contains the event identifier (`event`), the `time`, and the experiment `execution` (see below).

| Event                | Event Identifier                      | Description                                                                                                                 |
| -------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Created**          | `experiment.execution.created`        | A new experiment execution was just started. As soon as all required agents have connected, the first step will be executed |
| **Step Started**     | `experiment.execution.step-started`   | One step of a running experiment started.                                                                                   |
| **Step Completed**   | `experiment.execution.step-completed` | One step of a running experiment completed successfully (e.g. a check succeeded or the attack was performed).               |
| **Step Failed**      | `experiment.execution.step-failed`    | One step of a running experiment failed (e.g. a check didn't match the defined expectation).                                |
| **Step Errored**     | `experiment.execution.step-errored`   | One step of a running experiment errored (e.g. a check or attack couldn't be executed due to a technical error).            |
| **Canceled**         | `experiment.execution.step-canceled`  | The experiment execution was canceled, e.g., by a user.                                                                     |
| **Completed**        | `experiment.execution.completed`      | The experiment completed succesfully, e.g., all steps have been completed successfully.                                     |
| **Failed**           | `experiment.execution.failed`         | The experiment execution failed because at least one step failed.                                                           |
| **Errored**          | `experiment.execution.errored`        | The experiment execution errored because at least one step errored.                                                         |
| **Preflight Checks** | `experiment.execution.preflight`      | A [preflight webhook check](preflight-webhooks/) is performed before the experiment is allowed to start.                    |

### Killswitch

The body contains the event identifier (`event`), the `time` and the `killswitch`'s state (see below).

| Event                         | Event Identifier        | Description                                                                                                                               |
| ----------------------------- | ----------------------- |-------------------------------------------------------------------------------------------------------------------------------------------|
| **Engaged Emergency Stop**    | `killswitch.disengaged` | The [emergency stop](../../use-steadybit/experiments/emergencyStop.md) was triggered to stop all experiment runs and prevent future runs. |
| **Disengaged Emergency Stop** | `killswitch.engaged`    | The [emergency stop](../../use-steadybit/experiments/emergencyStop.md) was disengaged to allow future experiment runs.                       |

## Developing Webhooks

A webhook uses an HTTP POST request at an endpoint reachable from the Steadybit platform. The HTTP request sends a body with the content-type `application/json`. Our [OpenAPI specification](https://platform.steadybit.com/api/spec) describes the exact body in `WebhookPayload`.

### Examples

This section covers some example requests to ease developing the webhook endpoint.

#### Experiment Execution Created

The request body that is sent to your endpoint depends on the specific experiment that is executed.

```bash
curl --request POST \
--url https://<your-custom-webhook-endpoint> \
--header 'accept: */*' \
--header 'accept-encoding: gzip' \
--header 'content-type: application/json' \
--data '{
  "event": "experiment.execution.created",
  "time": "2024-01-01T00:00:00.000000000Z",
  "execution": {
    "id": 78151,
    "experimentKey": "ADM-1",
    "teamKey": "ADM",
    "environment": "a7efb4f1-9b8e-46a7-a3eb-ffc29ba75eae",
    "name": "Stress CPU",
    "created": "2024-01-01T00:00:00.000000Z",
    "createdVia": "UI",
    "experimentVersion": 0,
    "state": "CREATED",
    "steps": [
      {
        "id": "0192fc6e-b1b8-7593-a2d6-ed9443172ba0",
        "state": "CREATED",
        "ignoreFailure": false,
        "parameters": {
          "cpuLoad": "1",
          "workers": 0,
          "duration": "30s"
        },
        "actionId": "com.steadybit.extension_container.stress_cpu",
        "actionKind": "ATTACK",
        "radius": {
          "targetType": "com.steadybit.extension_container.container",
          "percentage": 100,
          "predicate": {
            "operator": "AND",
            "predicates": [
              {
                "key": "k8s.deployment",
                "operator": "EQUALS",
                "values": [
                  "gateway"
                ]
              }
            ]
          }
        },
        "targetExecutions": [
          {
            "type": "com.steadybit.extension_container.container",
            "name": "aa815cb361e65806a6938670d71a7af94666cf3a08acce990c1d131ae4533b07",
            "attributes": [
              {
                "key": "aws.account",
                "value": "244471902119"
              }
            ]
          }
        ],
        "totalTargetCount": 1
      }
    ]
  }
}'
```

#### Killswitch Disengaged

```bash
curl --request POST \
--url https://<your-custom-webhook-endpoint> \
--header 'accept: */*' \
--header 'accept-encoding: gzip' \
--header 'content-type: application/json' \
--data '{
  "event": "killswitch.disengaged",
  "time": "2024-01-01T01:00:00.000000Z",
  "killswitch": {
    "engagedBy": "99c9ed40-6b85-439c-bd14-04787f2443d2",
    "engaged": "2024-01-01T00:00:00.000000Z",
    "disengagedBy": "e7ff1799-0430-4b1f-a835-c383b2a19543",
    "disengaged": "2024-01-01T01:00:00.000000Z"
  }
}'
```

### Verify Webhook Requests

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
