---
title: Install Cloud Service Agent on AWS
navTitle: AWS Cloud Service Agent
---

# Install Cloud Service Agent on AWS

import PolicyAvailabilityZone from './40-aws-cloud/\_policy\_availability\_zones.md'; import PolicyEc2Instances from './40-aws-cloud/\_policy\_ec2\_instances.md'; import PolicyFisExperiments from './40-aws-cloud/\_policy\_fis\_experiments.md'; import InstallationEc2 from './40-aws-cloud/\_installation\_ec2.md'; import InstallationEcs from './40-aws-cloud/\_installation\_ecs.md'; import InstallationEks from './40-aws-cloud/\_installation\_eks.md'; import InstallationOutside from './40-aws-cloud/\_installation\_outside.md';

> Continue, if you want to install the cloud service agent to attack AWS cloud resources. In case you are interested in host based attacks, attacking e.g. the host and software running on it, refer to [Docker](../../install-agents/docker.md) , [Kubernetes](../../install-agents/kubernetes/README.md) or [Linux Hosts](../../install-agents/host.md) installation documentation.

### Capabilities

The cloud service agent uses cloud apis to interact with cloud resources.

The current features are:

* Discover and shutdown EC2 instances
* Blackhole Availability Zones
* Integrate AWS FIS Experiments

### Required permissions for AWS API Access

For querying metadata and using the AWS API executing the attacks a suitable IAM role needs to be created.

The following policies needs to be attached to the IAM role. If you don't want to provide permission for a particular feature, you can disable the discovery by creating an environment variable `STEADYBIT_AGENT_DISCOVERIES_DISABLED` containing a comma separated list of discovery names.

* EC2-Instance Discovery and Attack:
  * Discovery-Name: Ec2InstancesDiscovery
  * Required Policy \<Collapsible title={'Show'}>
* Availability Zone Discovery and Zone Blackhole Attack:
  * Discovery-Name: AvailabilityZoneDiscovery
  * Required Policy \<Collapsible title={'Show'}>
* Integrate AWS FIS Experiments:
  * Discovery-Name: FisExperimentTemplateDiscovery
  * Required Policy \<Collapsible title={'Show'}>

### Authentication

The agent is using the [default credentials provider chain](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials.html#credentials-chain). You can pass credentials using the following sequence:

1. Java System Properties (`aws.accessKeyId` and `aws.secretAccessKey`)
2. Environment variables (`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`)
3. Web identity token from AWS STS
4. The shared credentials and config files
5. Amazon ECS container credentials
6. Amazon EC2 instance profile credentials

You can find more information about best matching ways to provide credentials in the following installation guides.

### Installation guides

\<Collapsible title={'Installation on EC2 Instance'}>

\<Collapsible title={'Installation as ECS Task'}>

\<Collapsible title={'Installation in EKS'}>

\<Collapsible title={'Installation outside of AWS'}>

### Assume-Role into multiple AWS accounts

By default, the agent uses the provided credentials to discover all resources in the belonging AWS account.

Another option is to provide a comma separated list of role-ARNs via the environment variable `STEADYBIT_AGENT_AWS_ASSUME_ROLE_LIST`. The provided credentials are then only used to assume-role into the given role-ARNs.

In this case make sure:

*   The provided credentials are allowed to assume the provided role-ARNs.

    * Policy Example to allow AssumeRole

    ```
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": "sts:AssumeRole",
                "Resource": "arn:aws:iam::<TARGET-ACCOUNT>:role/steadybit-agent"
            }
        ]
    }
    ```
* The given roles themself have all [required permissions](./#required-permissions-for-aws-api-access).
*   The given roles do have trust relationship to allow to be assumed by the given credentials.

    * Example trust relationship

    ```
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": {
                    "AWS": "arn:aws:iam::<ACCOUNT-RUNNING-THE-AGENT>:<ROLE-RUNNING-THE-AGENT>"
                },
                "Action": "sts:AssumeRole",
                "Condition": {}
            }
        ]
    }
    ```

### F.A.Q

***

Q: The agent is running, but I can't see any AWS Attacks.

A: Maybe you missed allowing your team to execute the attack? Check your team settings and add the required permissions.

***

Q: Can I run multiple instances of the agent on the same host?

A: Yes, you can. If you want to run multiple instances of the AWS-Cloud-Agent you need to consider, that the agent needs a unique identifier. By default, the hostname is used for that. If you are running multiple instances on the same host, you need to provide an identifier via `STEADYBIT_AGENT_IDENTIFIER`.

***

Q: Can I run multiple instances of the agent using the helm chart?

A: Yes, but you currently need to use an own namespace for each agent. The namespace is then used as identifier.

***

Q: How can I make sure, that I don't attack the agent itself?

A: We recommend running the cloud agent in a separate subnet to be sure that the agent is still working properly, when you are attacking the cloud resources. The subnet of the agent will be excluded from network based attacks like the Blackhole Zone Attack.
