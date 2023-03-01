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

* Discover and [shutdown EC2 instances](broken-reference)
* [Blackhole Availability Zones](broken-reference)
* [Integrate AWS FIS Experiments](broken-reference)

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

<summary>AWS Fis Experiments Integration</summary>

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
      "Resource": "arn:aws:iam::<YOUR-ACCOUNT>:role/aws-service-role/fis.amazonaws.com/AWSServiceRoleForFIS"
    }
  ]
}
```
{% endcode %}

FIS will create a [ServiceLinkedRole](https://docs.aws.amazon.com/fis/latest/userguide/using-service-linked-roles.html) `AWSServiceRoleForFIS` when you start an experiment. If you started the experiment from the ui and the role is already existing, you can omit the `iam:CreateServiceLinkedRole` permission. If you want to start the very first fis experiment via the steadybit agent, you will need to add the permission. 

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

The following command will download and run the latest steadybit agent package on your EC2 instance:

```shell
curl -sfL https://get.steadybit.com/agent-linux.sh | sh -s -- -a <agent-key> -e <platform-url> -o aws
```

For your convenience you can use the [setup page](https://platform.steadybit.com/settings/agents/setup) in the SaaS platform, where your agent key is already prepared in the command. Make sure to add `-o aws` to the copied command.

See also the [Amazon ECS Container Instance documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch\_container\_instance.html) for using User Data mechanism on new EC2 instances to automate the agent installation.

**Authentication**

If you installed the agent on an EC2 instance, the easiest way is to use the 6th option from the [default credentials provider chain](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials.html#credentials-chain), namely the [InstanceProfileCredentialsProvider](https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/auth/credentials/InstanceProfileCredentialsProvider.html) .

Steps:

* Assign your previous created IAM role to the ec2 instance. There is a slight difference between IAM Roles and Instance Profiles, if you see a message like `No roles attached to instance profile`, make sure to check [this page](https://docs.aws.amazon.com/IAM/latest/UserGuide/id\_roles\_use\_switch-role-ec2\_instance-profiles.html)
* The IAM role needs a trust relationship so that EC2 is able to assume the role.

```json
{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "Service": [
            "ec2.amazonaws.com"
          ]
        },
        "Action": "sts:AssumeRole"
      }
    ]
}
```

</details>

<details>

<summary>Install as ECS Task</summary>

**Example**

For your convenience we have prepared an example task definition to use for ECS in EC2 (or FARGATE). Please fill in the missing "replace-with" prefixed fields:

```json
{
    "family": "steadybit-agent",
    "requiresCompatibilities": [
        "<EC2 or FARGATE>"
    ],
    "networkMode": "awsvpc",
    "cpu": "512",
    "memory": "1024",
    "taskRoleArn": "<replace-with-task-role-arn>",
    "executionRoleArn": "<replace-with-execution-role-arn>",
    "containerDefinitions": [
        {
            "portMappings": [],
            "environment": [
                {
                    "name": "STEADYBIT_AGENT_KEY",
                    "value": "<replace-with-agent-key>"
                },
                {
                    "name": "STEADYBIT_AGENT_MODE",
                    "value": "aws"
                }
            ],
            "image": "steadybit/agent:latest",
            "name": "steadybit-agent"
        }
    ]
}
```

**Authentication**

The `taskRoleArn` needs to have the required permissions mentioned before.

Make sure, that the role can be assumed by ECS and provide a trust relationship to the role.

```json
{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "Service": [
            "ecs-tasks.amazonaws.com"
          ]
        },
        "Action": "sts:AssumeRole"
      }
    ]
  }
```

</details>

<details>

<summary>Install on EKS</summary>

You can use our [helm chart](https://github.com/steadybit/helm-charts/blob/main/charts/steadybit-agent/README.md) with the parameter \`agent.mode=aws\`.

**Authorization in EKS with WebIdentityTokenFileCredentialsProvider**

If you installed the agent into an EKS cluster, the recommend way to provide credentials is to use the 3th option from the [default credentials provider chain](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials.html#credentials-chain), namely the [WebIdentityTokenFileCredentialsProvider](https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/auth/credentials/WebIdentityTokenFileCredentialsProvider.html) .

With this option you need to [associate an IAM role with a Kubernetes service account](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html).

1. [Create an OIDC Provider for your cluster](https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html)
2. Create an IAM Role with the required permissions.
3. Allow the Role to be assumed by the OIDC Provider. Add the following trust relationship to the IAM Role

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Federated": "arn:aws:iam::<ACCOUNT>:oidc-provider/oidc.eks.<REGION>.amazonaws.com/id/<ID>"
            },
            "Action": "sts:AssumeRoleWithWebIdentity",
            "Condition": {
                "StringEquals": {
                    "oidc.eks.<REGION>.amazonaws.com/id/<ID>:aud": "sts.amazonaws.com",
                    "oidc.eks.<REGION>.amazonaws.com/id/<ID>:sub": "system:serviceaccount:<SERVICE-ACCOUNT-NAMESPACE>:<SERVICE-ACCOUNT-NAME>"
                }
            }
        }
    ]
}
```

1. Associate the IAM Role to your Kubernetes Service Account. If you are using our helm charts to create the Service Account, you can use the parameter `serviceAccount.eksRoleArn`.

</details>

<details>

<summary>Outside of AWS</summary>

You can dedicate any agent running outside of your AWS infrastructure to communicate with the AWS API. In this case you need to setup an IAM User with API credentials which is allowed to access the resources already described in the section above.

The following variables needs to be added to the environment configuration:

```
AWS_REGION=<replace-with-region-to-attack>
AWS_ACCESS_KEY_ID=<replace-with-aws-access-key>
AWS_SECRET_ACCESS_KEY=<replace-with-aws-secret-access-key>
```

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

***

**Q:** Can I run multiple instances of the agent on the same host?

**A:** Yes, you can. If you want to run multiple instances of the AWS-Cloud-Agent you need to consider, that the agent needs a unique identifier. By default, the hostname is used for that. If you are running multiple instances on the same host, you need to provide an identifier via `STEADYBIT_AGENT_IDENTIFIER`.

***

**Q:** Can I run multiple instances of the agent using the helm chart?

**A:** Yes, but you currently need to use an own namespace for each agent. The namespace is then used as identifier.

***

**Q:** How can I make sure, that I don't attack the agent itself?

**A:** We recommend running the cloud agent in a separate subnet to be sure that the agent is still working properly, when you are attacking the cloud resources. The subnet of the agent will be excluded from network based attacks like the Blackhole Zone Attack.
