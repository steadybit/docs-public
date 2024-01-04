# Extension Kits

Four extension kits exist through which Steadybit's capabilities can be extended. Unless you are thinking about authoring a custom extension, you probably do not need to know about these kits.

## ActionKit

<figure><img src="../../.gitbook/assets/action-kit.png" alt="ActionKit logo depicting the text action kit and a crosshair icon"><figcaption><p>ActionKit logo depicting the text action kit and a crosshair icon</p></figcaption></figure>

The Steadybit ActionKit enables the extension of Steadybit with new action capabilities that you can use within experiments. For example, ActionKit can be used to author open/closed source:

* attacks to attack AWS, Azure, and Google Cloud services that Steadybit cannot natively attack,
* integrate load testing tools,
* health and state checks and
* every other runnable action!

You can learn more about ActionKit through its [GitHub repository](https://github.com/steadybit/action-kit).

## DiscoveryKit

<figure><img src="../../.gitbook/assets/discovery-kit.png" alt="DiscoveryKit logo depicting the text discovery kit and a radar dish icon"><figcaption><p>DiscoveryKit logo depicting the text discovery kit and a radar dish icon</p></figcaption></figure>

The Steadybit DiscoveryKit enables the extension of Steadybit with new discovery capabilities. For example, DiscoveryKit can be used to author open/closed source discoveries for:

* proprietary technology,
* non-natively supported open-source tech,
* hardware components and
* every other _"thing"_ you would want to see and attack with Steadybit.

You can learn more about DiscoveryKit through its [GitHub repository](https://github.com/steadybit/discovery-kit).

## EventKit

<figure><img src="../../.gitbook/assets/logo.png" alt="EventKit logo depicting the text event kit and a bell icon"><figcaption><p>EventKit logo depicting the text event kit and a bell icon</p></figcaption></figure>

EventKit allows extensions to consume events from the Steadybit platform to integrate with third-party systems. Extensions leveraging EventKit are similar to webhooks but do not face the typical web routing issues as Steadybit agents handle this aspect. You can use EventKit to:

* Forward audit logs to an external system.
* Add markers to monitoring systems' charts during experiment runs.
* Capture experiment run statistics.
* Report information about experiment runs to Slack, Discord etc.

You can learn more about EventKit through its [GitHub repository](https://github.com/steadybit/event-kit).

## ExtensionKit

<figure><img src="../../.gitbook/assets/extension-kit.png" alt="ExtensionKit logo depicting the text extension kit and a wrench icon"><figcaption><p>ExtensionKit logo depicting the text extension kit and a wrench icon</p></figcaption></figure>

Through kits like ActionKit and DiscoveryKit, Steadybit can be extended with new capabilities. ExtensionKit on the other hand contains helpful utilities and best practices for extension authors leveraging the Go programming language.

You can learn more about ExtensionKit through its [GitHub repository](https://github.com/steadybit/extension-kit).
