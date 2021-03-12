---
title: "Slack Notifications"
---
You want to receive a Slack message whenever an experiment has started or failed? This can be achieve via `Settings / Application Settings / Integrations / Slack`.

> If you use an on-prem installation make sure to set the `STEADYBIT_WEB_PUBLIC_URL`, so we can add links to open steadybit via links in the message.

| | |
|--------------|-------|
| **Name**     | The name for this integration will not show up in the message. |
| **URL**      | The Slack webhook URL, which you can create in Slack by navigating Manage apps > Custom Integrations > Incoming Webhooks. |
| **Channel**  | The Slack channel which receives the message. If omitted the default from the Slack Webhook configuration will be used. <br/> **optional**   |
| **Icon Url** | You may specify a different icon to be used for the message. <br/> **optional** |
| **Team**     | If no team is specified, you'll receieve all events. If you do specify a team you'll only receive notifications relevant for this team |
| **Events**   | You may select the events you want to recieve. |

If you want, you can also use a [custom Webhook](50-webhooks) to further customize Slack message or integrate with other chat applications.
