---
title: Slack Notifications
---

# Slack Notifications

You want to receive a Slack message whenever an experiment has started or failed? This can be achieved via `Settings` → `Integrations` → `Slack`.

> If you use an on-prem installation, make sure to set `STEADYBIT_WEB_PUBLIC_URL` so that we can include working links to Steadybit in the message.

|              |                                                                                                                                                             |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Name**     | The name for this integration will not show up in the message.                                                                                              |
| **URL**      | The Slack webhook URL, which you can create in Slack by navigating to `Manage apps` → `Custom Integrations` → `Incoming Webhooks`.                          |
| **Channel**  | <p>The Slack channel which receives the message. If omitted the default from the Slack Webhook configuration will be used.<br><strong>optional</strong></p> |
| **Icon URL** | <p>You may specify a different icon to be used for the message.<br><strong>optional</strong></p>                                                            |
| **Team**     | If no team is specified, you'll receive all events. If you do specify a team, you'll only receive notifications relevant to that team.                      |
| **Events**   | You may select the events you want to receive.                                                                                                              |

If you want, you can also use a [custom webhook](webhooks/custom-webhooks.md) to further customize the Slack message, or to integrate with other chat applications.
