---
title: "Install Agent on Amazon Elastic Container Service (ECS) running on EC2"
navTitle: "AWS ECS (EC2)"
---

This page describes how to install the agent into an Elastic Container Service (ECS) cluster running on EC2 using [ECS Daemon Scheduling](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler).

There are two ways to setup the agent:

##  ECS Task definition

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
            ]
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
            "image": "steadybit/agent:latest",
            "name": "steadybit-agent",
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

##   EC2 User Data

See the [Amazon ECS Container Instance documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_container_instance.html) for using User Data mechanism on new EC2 instances. See also our [Install on Linux Hosts](install-configure/30-install-agents/30-host) section for setting up the agent.
