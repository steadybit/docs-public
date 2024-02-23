# Migrating From the Outpost Agent

## Helm Chart

We replaced the `steadybit-outpost` chart with the `steadybit-agent` chart. While the charts are structurally the same, this is not a drop-in replacement, as some defaults and prefixes change:

* The default container image is now `steadybit/agent`
* All `outpost.*` values were renamed to `agent.*`
* The sample command provided in the platform in the platform now suggests the `steadybit-agent` namespace.

For migrating:

1. Remove the old Helm release using `helm uninstall`
2. Update your custom values to use the `agent.*` instead `outpost.*` of the  prefix
3. Install the new Helm chart using `helm install`

## Docker

The [https://get.steadybit.com/outpost.sh](https://get.steadybit.com/outpost.sh) was renamed to [https://get.steadybit.com/agent.sh](https://get.steadybit.com/agent.sh). The scripts are structurally identical but refer to the new `steadybit/agent` container image.&#x20;

For migrating: &#x20;

1. stop and remove the running containers&#x20;
2. Install using the new `agent.sh`

## Linux Packages

The  [https://get.steadybit.com/outpost-linux.sh](https://get.steadybit.com/outpost-linux.sh) was renamed to [https://get.steadybit.com/agent-linux.sh](https://get.steadybit.com/agent-linux.sh)[. ](https://get.steadybit.com/agent-linux.sh)The scripts are structurally identical but now install the steadybit-agent packages, and the configuration is located in `/etc/steadybit/agent.`

For migrating:

1. Remove the old `steadybit-outpost` packages using the system package manager
2. Move the configuration using `sudo mv /etc/steadybit/outpost /etc/steadybit/agent`
3. Install the new `steadybit-agent` package using your system package manager
