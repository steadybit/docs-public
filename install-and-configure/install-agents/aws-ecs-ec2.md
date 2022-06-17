---
title: Install on Amazon Elastic Container Service (ECS) running on EC2
navTitle: AWS ECS (EC2)
---

# Install on Amazon Elastic Container Service (ECS) running on EC2

This page describes how to install the host-based agent into an Elastic Container Service (ECS) cluster running on EC2 using [ECS Daemon Scheduling](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs\_services.html#service\_scheduler).

There are two ways to setup the agent:

### EC2 User Data

Note: This is the preferred mechanism to deploy the agent across your ECS on EC2 clusters!

See the [Amazon ECS Container Instance documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch\_container\_instance.html) for using User Data mechanism on new EC2 instances. See also our [Install on Linux Hosts](../../content/install-configure/30-install-agents/install-configure/30-install-agents/30-host/) section for setting up the agent.

## AWS Metadata

For querying metadata the IAM role `arn:aws:iam::aws:policy/AmazonEC2ReadOnlyAccess` must be assigned to the EC2 Task Definition running the steadybit agent.

Alternatively you can create your own policy with the following IAM permissions and attach that to the Task Definition Role:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "ec2:Describe*",
            "Resource": "*"
        }
    ]
}
```

### ECS Task

Note: Due to security issues the Host Shutdown Attack will not work with this setup method.

#### Secret for accessing the agent image

First you need to [create a secret](https://docs.aws.amazon.com/secretsmanager/latest/userguide/manage\_create-basic-secret.html) for accessing our private Docker Registry (docker.steadybit.io) to download the agent image.

```
{
  "username": "_",
  "password": "<replace-with-agent-key>"
}
```

#### Example

For your convenience we have prepared an example task definition to use. Please fill in the missing "replace-with" prefixed fields:

```
{
    "ipcMode": "host",
    "placementConstraints": [],
    "taskRoleArn": "",
    "family": "steadybit-agent",
    "pidMode": "host",
    "requiresCompatibilities": [
        "EC2"
    ],
    "networkMode": "host",
    "cpu": "512",
    "memory": "1024",
    "executionRoleArn": "<replace-with-execution-role-arn>",
    "containerDefinitions": [
        {
            "logConfiguration": {
                "logDriver": "json-file"
            },
            "portMappings": [],
            "environment": [
                {
                    "name": "STEADYBIT_AGENT_KEY",
                    "value": "<replace-with-agent-key>"
                }
            ],
            "repositoryCredentials": {
              "credentialsParameter": "<replace-with-secret-arn-from-secretmanager>"
            },
            "mountPoints": [
                {
                    "readOnly": false,
                    "containerPath": "/var/run",
                    "sourceVolume": "var_run"
                },
                {
                    "readOnly": false,
                    "containerPath": "/run",
                    "sourceVolume": "run"
                },
                {
                    "readOnly": false,
                    "containerPath": "/sys",
                    "sourceVolume": "sys"
                },
                {
                    "readOnly": false,
                    "containerPath": "/dev",
                    "sourceVolume": "dev"
                },
                {
                    "readOnly": false,
                    "containerPath": "/var/log",
                    "sourceVolume": "var_log"
                }
            ],
            "image": "docker.steadybit.io/steadybit/agent:latest",
            "name": "steadybit-agent"
        }
    ],
    "volumes": [
        {
            "name": "dev",
            "host": {
                "sourcePath": "/dev"
            },
            "dockerVolumeConfiguration": null
        },
        {
            "name": "sys",
            "host": {
                "sourcePath": "/sys"
            },
            "dockerVolumeConfiguration": null
        },
        {
            "name": "var_run",
            "host": {
                "sourcePath": "/var/run"
            },
            "dockerVolumeConfiguration": null
        },
        {
            "name": "run",
            "host": {
                "sourcePath": "/run"
            },
            "dockerVolumeConfiguration": null
        },
        {
            "name": "var_log",
            "host": {
                "sourcePath": "/var/log"
            },
            "dockerVolumeConfiguration": null
        }
    ]
}
```
