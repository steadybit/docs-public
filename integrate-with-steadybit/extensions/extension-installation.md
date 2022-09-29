# Extension Installation

Extensions follow common installation patterns that look something like this:

1. Deploy the extension within your infrastructure.
2. Extend the agent configuration so that the agent can communicate with the extension.
    - the agent needs to know how to reach the extension via configuration values
    - Action Extensions see here: [Extension Registration](https://github.com/steadybit/action-kit/blob/main/docs/action-registration.md)
    - Discovery Extensions see here: [Discovery Provider Registration](https://github.com/steadybit/discovery-kit/blob/main/docs/discovery-registration.md)

Most extensions will require extension-specific configuration. For example, the Kong extension needs to know how to reach\&authenticate with Kong API gateways, while the AWS extensions require the configuration of IAM roles. As a result, no single set of instructions covers all extensions. However, extensions' documentation should describe the exact configuration and installation steps.

## Manage your Extensions

In the platform, you can manage your extensions in the Extensions tab. You can see the extensions that are currently installed.
Go to [Settings -> Extensions](https://platform.steadybit.io/settings/extensions) to see the list of extensions that are currently installed.

![Extensions Overview](extensions.png)