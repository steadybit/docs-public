# Extensions

Steadybit ships with various discoveries, attacks, checks and more to run chaos-engineering experiments and automatic weak spot identification. These capabilities ensure an excellent out-of-the-box experience. However, not every technology is supported natively by Steadybit. To this end, Steadybit exposes extension mechanisms through which everyone can add capabilities. For example, this enables

* the discovery of new targets that one can attack within experiments,
* the definition of new attacks for existing or new targets,
* custom verification logic to run as part of experiments or
* the usage of custom (shell) scripts in experiments.

## Terminology

To understand the following content, we must clarify the used terminology. This clarification will help you find relevant content and skip the content you may not need.

### Extensions

Extensions are what most regular users will interact with to extend Steadybit’s capabilities. They are deployable units (typically containers) exposing a remote HTTP interface with which Steadybit agents communicate.

Extensions are deployed manually within customers’ networks.

### Extension APIs

Extension authors, maintainers and contributors will leverage extension APIs to enhance Steadybit’s capabilities. Typically, extensions are required to expose a remote HTTP interface complying with extension APIs.

### Extension Kits

Kits are the combination of extension APIs, conventions, contracts, documentation, examples and more. They are leveraged mainly by the same audience that would author extension.

## Next Steps

* [What exactly is an extension?](anatomy-of-an-extension.md)
* [What officially maintained extensions are there?](https://hub.steadybit.com/extensions)
* [How do I install an extension?](extension-installation.md)
* [What extension kits are available?](extension-kits.md)
