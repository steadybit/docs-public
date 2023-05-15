# Anatomy of an Extension

To get the most out of Steadybit extensions, we believe that everyone can benefit from a fundamental understanding of the anatomy of extensions. This understanding will help you choose, deploy and secure extensions. This document provides an overview of a typical extension's architecture.

## Architecture

From a high-level, extensions are:

* Separately deployed processes,
* which are typically packaged as Docker images,
* running within your infrastructure that
* expose an HTTP interface that complies with one or more extension APIs.

That is a mouthful – let's dissect this. The following UML sequence diagram shows how the Steadybit agent would call an extension.

![UML sequence diagram showing how an extension implementing ActionKit APIs would be called by the Steadybit agent.](<../../.gitbook/assets/action-kit-sequence-diagram.png>)

Let us first note that the Steadybit agent and the extension are deployed within customers' infrastructure. Steadybit agents take on the role of outposts facilitating the communication between the Steadybit platform and extensions. This approach ensures that extensions do not need to be internet accessible. Instead, you can place them within networks that do not have a direct internet connection. From a security perspective, this is highly beneficial as it avoids several security challenges. Furthermore, it allows extensions to receive configuration, especially credentials, that Steadybit should not be aware of.

Extensions are typically packaged as Docker images and consequently run as containers. Because extensions may require additional configuration & permissions, users carry the responsibility for the rollout of extensions. We offer ready-made Helm charts to facilitate the rollout of our official extensions.

Extensions expose HTTP interfaces. These interfaces need to comply with extension APIs. For example, a custom attack implementation must comply with the API defined in ActionKit. Such extensions must define an HTTP endpoint that returns a list of supported actions. The UML sequence diagram above depicts this.

The agent always initiates communication between itself and extensions. Consequently, agents need to know how to reach extensions, not vice versa. Learn how to configure extensions in agents [in our separate article](extension-installation.md).
