---
title: Install Cloud Service Agent on AWS
navTitle: AWS Cloud Service Agent
---

# Install AWS Cloud Service Agent

{% hint style="info" %}
Continue, if you want to install the cloud service agent to attack AWS cloud resources. In case you are interested in host based attacks, attacking e.g. the host and software running on it, refer to [Docker](../docker.md) , [Kubernetes](../kubernetes/) or [Linux Hosts](../host.md) installation documentation.
{% endhint %}

### Capabilities

The cloud service agent uses cloud apis to interact with cloud resources.

The current features are:

* Discover and shutdown EC2 instances
* Blackhole Availability Zones
* Integrate AWS FIS Experiments

### Required permissions for AWS API Access

For querying metadata and using the AWS API executing the attacks a suitable IAM role needs to be created.

The following policies needs to be attached to the IAM role. If you don't want to provide permission for a particular feature, you can disable the discovery by creating an environment variable `STEADYBIT_AGENT_DISCOVERIES_DISABLED` containing a comma separated list of discovery names.

<details>

<summary>EC2 Instance Discovery and Attack</summary>

Discovery Name: `EC2InstancesDiscovery`

{% code title="iam-policy-ec2.json" %}
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "ec2:DescribeInstances",
        "ec2:DescribeTags",
        "ec2:StopInstances",
        "ec2:TerminateInstances",
        "ec2:StartInstances",
        "ec2:RebootInstances",
        "ec2:CreateTags"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
```
{% endcode %}

</details>

<details>

<summary>Availability Zone Discovery and Attack</summary>

Discovery Name: `AvailabilityZoneDiscovery`

{% code title="iam-policy-az.json" %}
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "ec2:DescribeTags",
        "ec2:DescribeAvailabilityZones",
        "ec2:DescribeVpcs",
        "ec2:DescribeSubnets",
        "ec2:DescribeNetworkAcls",
        "ec2:CreateNetworkAcl",
        "ec2:CreateNetworkAclEntry",
        "ec2:ReplaceNetworkAclAssociation",
        "ec2:DeleteNetworkAcl",
        "ec2:CreateTags"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
```
{% endcode %}

</details>

<details>

<summary>AWS Fix Experiments Integration</summary>

Discovery Name: `FisExperimentTemplateDiscovery`

{% code title="iam-policy-fis.json" %}
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "fis:ListExperimentTemplates",
        "fis:GetExperiment",
        "fis:StartExperiment",
        "fis:StopExperiment",
        "fis:TagResource"
      ],
      "Effect": "Allow",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "iam:CreateServiceLinkedRole",
      "Resource": "arn:aws:iam::<YOUR-ACCOUNT>:role/<YOUR-ROLE-EXECUTING-FIS-EXPERIMENTS>"
    }
  ]
}
```
{% endcode %}

</details>

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

<details>

<summary>Install on EC2 Instance</summary>



</details>

<details>

<summary>Install as ECS Task</summary>



</details>

<details>

<summary>Install on EKS</summary>



</details>

<details>

<summary>Outside of AWS</summary>



</details>

### Assume-Role into multiple AWS accounts

By default, the agent uses the provided credentials to discover all resources in the belonging AWS account.

Another option is to provide a comma separated list of role-ARNs via the environment variable `STEADYBIT_AGENT_AWS_ASSUME_ROLE_LIST`. The provided credentials are then only used to assume-role into the given role-ARNs.

In this case make sure:

* The provided credentials are allowed to assume the provided role-ARNs.

{% code title="iam-policy-assume-role.yml" %}
```json
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
{% endcode %}

* The given roles themself have all [required permissions](./#required-permissions-for-aws-api-access).
* The given roles do have trust relationship to allow to be assumed by the given credentials.

{% code title="relationship.json" %}
```json
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
{% endcode %}

### F.A.Q

**Q:** The agent is running, but I can't see any AWS Attacks.

**A:** Maybe you missed allowing your team to execute the attack? Check your team settings and add the required permissions.



**Q:** Can I run multiple instances of the agent on the same host?

**A:** Yes, you can. If you want to run multiple instances of the AWS-Cloud-Agent you need to consider, that the agent needs a unique identifier. By default, the hostname is used for that. If you are running multiple instances on the same host, you need to provide an identifier via `STEADYBIT_AGENT_IDENTIFIER`.

***

**Q:** Can I run multiple instances of the agent using the helm chart?

**A:** Yes, but you currently need to use an own namespace for each agent. The namespace is then used as identifier.

***

**Q:** How can I make sure, that I don't attack the agent itself?

**A:** We recommend running the cloud agent in a separate subnet to be sure that the agent is still working properly, when you are attacking the cloud resources. The subnet of the agent will be excluded from network based attacks like the Blackhole Zone Attack.
