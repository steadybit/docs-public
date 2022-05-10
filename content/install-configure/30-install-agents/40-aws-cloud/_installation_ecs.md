### Installation as ECS Task

#### Secret for accessing the agent image

First you need to [create a secret](https://docs.aws.amazon.com/secretsmanager/latest/userguide/manage_create-basic-secret.html)
for accessing our private Docker Registry (docker.steadybit.io) to download the agent image.

```
{
  "username": "_",
  "password": "<replace-with-agent-key>"
}
```

#### Example

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

#### Trust Relationship for ECS

```
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
