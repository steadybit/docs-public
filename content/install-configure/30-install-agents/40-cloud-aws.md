---
title: "Install Cloud Agent on AWS"
navTitle: "Cloud Agent (AWS)"
---

This page describes how to install the cloud agent on AWS. This setup is not intented to run infrastructure based attacks, because it is using the
API af the Cloud Provider to execute attacks on this level. For attacking the host and software running on Virtual Machines running on AWS EC2,
refer to the [Install on Linux Hosts](30-install-agents/30-host) documentation.

# AWS API Access

For querying metadata and using the AWS API executing the attacks a suitable IAM policy needs to be created.
See this example IAM policy which enables the agent to discover and attack your AWS (EC2) resources.

```
{
    "Version": "2012-10-17",
    "Statement": [
      {
        Action: [
          "ec2:DescribeInstances",
          "ec2:DescribeTags",
          "ec2:StopInstances",
          "ec2:TerminateInstances",
          "ec2:StartInstances",
          "ec2:RebootInstances"
        ],
        Effect: "Allow",
        Resource: "*"
      }
    ]
}
```

This role needs to be attached to the IAM role of the AWS resource, which is running the agent (see below).
The IAM role containing the permissions from above needs to be able to perform the "AssumeRole" action,
so make sure to edit the "Trust Relationship" with something like the following:

### ECS

```
{
    "Version": "2012-10-17",
    "Statement": [
      {
        Effect: "Allow",
        Principal: {
          "Service": [
            "ecs-tasks.amazonaws.com"
          ]
        },
        Action: "sts:AssumeRole"
      }
    ]
  }
```

### EC2

```
{
    "Version": "2012-10-17",
    "Statement": [
      {
        Effect: "Allow",
        Principal: {
          "Service": [
            "ec2.amazonaws.com"
          ]
        },
        Action: "sts:AssumeRole"
      }
    ]
  }
```

# EC2

The following command will download and run the latest steadybit agent package on your EC2 instance:

```shell
curl -sfL https://get.steadybit.io/agent-linux.sh | sh -s -- -a <agent-k**ey> -e <platform-url> -o aws
```

For your convenience you can use the [setup page](https://platform.steadybit.io/settings/agents/setup) in the SaaS platform, where your agent key is already prepared in the command.

See also the [Amazon ECS Container Instance documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_container_instance.html)
for using User Data mechanism on new EC2 instances to automate the agent installation.


# ECS Task

## Secret for accessing the agent image

First you need to [create a secret](https://docs.aws.amazon.com/secretsmanager/latest/userguide/manage_create-basic-secret.html)
for accessing our private Docker Registry (docker.steadybit.io) to download the agent image.

```
{
  "username": "_",
  "password": "<replace-with-agent-key>"
}
```

## Example

For your convenience we have prepared an example task definition to use for ECS in EC2 (or FARGATE). Please fill in the missing "replace-with" prefixed fields:

```
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
            "repositoryCredentials": {
              "credentialsParameter": "<replace-with-secret-arn-from-secretmanager>"
            },
            "image": "docker.steadybit.io/steadybit/agent:latest",
            "name": "steadybit-agent"
        }
    ]
}
```

# Running outside of AWS

You can also dedicate any agent running outside of your AWS infrastructure to communicate with the AWS API.
In this case you need to setup an IAM with API credentials which is allowed to access the resources already described in the section above.

The following variables needs to be added to the environment configuration:

```
AWS_REGION=<replace-with-region-to-attack>
AWS_ACCESS_KEY_ID=<replace-with-aws-access-key>
AWS_SECRET_ACCESS_KEY=<replace-with-aws-secret-access-key>
```

