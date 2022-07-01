# AWS Cloud Attacks

With the AWS Cloud Attacks, you can easily attack cloud resources without having to install agents on every machine. Make sure you have installed our [AWS Cloud Agent](../../install-and-configure/install-agents/aws-cloud/). steadybit is simply using the AWS CLI to perform the following attacks.

### Shutdown EC2 Host

Perform an ec2 host reboot or shutdown.

| Parameter | Description                                 | Default |
| --------- | ------------------------------------------- | ------- |
| Reboot    | Should the host reboot after shutting down? | true    |

### Blackhole Zone

Block all traffic for a selected availability zone.

Steadybit will add a network ACL to every subnet in every VPC in the selected zone.

The Attack won't start if you select a zone, where the agent is running in.

| Parameter | Description                           | Default |
| --------- | ------------------------------------- | ------- |
| Duration  | How long should traffic been blocked? | 30s     |

### FIS Experiment

Execute AWS FIS Experiments

| Parameter | Description                                            | Default                                                          |
| --------- | ------------------------------------------------------ | ---------------------------------------------------------------- |
| Duration  | Estimation on how long the experiment will be running? | steadybit tries to get the duration from the selected experiment |

