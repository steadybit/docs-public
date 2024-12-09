# Install on Amazon ECS

The Steadybit Agent can be installed on **Amazon Elastic Container Service**.

## Amazon ECS with EC2

### Compatibility

{% hint style="warning" %}
Due to security constraints, the Host Shutdown Attack will not work. You can use
the [Change EC2 Instance State](https://hub.steadybit.com/action/com.steadybit.extension_aws.ec2_instance.state) attack from the extension-aws instead.
{% endhint %}

### Installation

#### Pre-requisites

- You need to have an ECS cluster running with at least one EC2 instance.
- You need to know the (private) Subnet-IDs where you want to place the agent and extension tasks. 
- The security group used by the ec2 instances need to allow inbound traffic to the `extension-host` and `extension-container` (ports 8085 and 8086) as they are running as daemon service using the host network.

#### Step-By-Step Guide

1. Copy the required Files

- [steadybit-agent.json](ecs/steadybit-agent.json)
- [steadybit-agent-role-trust-policy.json](ecs/steadybit-agent-role-trust-policy.json)
- [steadybit-agent-role-permissions.json](ecs/steadybit-agent-role-permissions.json)
- [steadybit-extension-host.json](ecs/steadybit-extension-host.json)
- [steadybit-extension-container.json](ecs/steadybit-extension-container.json)
- [steadybit-extension-http.json](ecs/steadybit-extension-http.json)
- [steadybit-extension-aws.json](ecs/steadybit-extension-aws.json)

2. Create a IAM role for the agent task with the following permissions:
   ```bash
   aws iam create-role --role-name steadybit-agent-task-role --assume-role-policy-document file://steadybit-agent-role-trust-policy.json
   aws iam put-role-policy --role-name steadybit-agent-task-role --policy-name steadybit-agent-extension-discovery --policy-document file://steadybit-agent-role-permissions.json
   ``` 

3. If you like to install the `extension-aws` you need to create a new IAM role with the following permissions. Please have a look at the [extension documentation](https://github.com/steadybit/extension-aws?tab=readme-ov-file#required-permissions-policies) for the latest list of required permissions.
   ```bash
   aws iam create-role --role-name steadybit-extension-aws-task-role --assume-role-policy-document file://steadybit-agent-role-trust-policy.json
   aws iam put-role-policy --role-name steadybit-extension-aws-task-role --policy-name steadybit-extension-aws --policy-document file://steadybit-extension-aws-role-permissions.json
   ```

4. Replace all placeholders in the JSON files with your values. All placeholders are prefixed with `MY-`. Take care, the placeholders are used multiple times in
   the JSON files.
    - `MY-AGENT-KEY`: Your agent key
    - `MY-CLUSTER-NAME`: The name of your ECS cluster
    - `MY-PLATFORM-URL`: The URL of your Steadybit platform, for SaaS use `https://platform.steadybit.com`
    - `MY-REGION`: The AWS region where your ECS cluster is running
    - `MY-ACCOUNT`: The AWS account ID

5. Register the Task Definitions
   ```bash
   aws ecs register-task-definition --cli-input-json file://steadybit-agent.json 
   aws ecs register-task-definition --cli-input-json file://steadybit-extension-host.json
   aws ecs register-task-definition --cli-input-json file://steadybit-extension-container.json
   aws ecs register-task-definition --cli-input-json file://steadybit-extension-http.json
   aws ecs register-task-definition --cli-input-json file://steadybit-extension-aws.json
   ```

6. Create the Services
    - **Agent** - please replace the cluster-name, subnet-ids, and security-group-id with your values. The security group needs to allow outbound traffic to the
      Steadybit platform and to the extensions (ports 8080-8099). 
   ```bash
   aws ecs create-service \
    --cluster MY-CLUSTER \
    --service-name steadybit-agent \
    --task-definition steadybit-agent \
    --propagate-tags TASK_DEFINITION \
    --desired-count 1 \
    --deployment-configuration maximumPercent=101,minimumHealthyPercent=0 \
    --tags key=steadybit.com/discovery-disabled,value=true \
    --network-configuration '{"awsvpcConfiguration": {"subnets": ["MY-SUBNET-1", "MY-SUBNET-2", "MY-SUBNET-3"], "securityGroups": ["MY-SECURITY-GROUP-ID"], "assignPublicIp": "DISABLED"}}'
   ```
    - **Extension Host** - please replace the cluster-name. The extension will use the host network strategy and use the security groupd and subnets of your ec2
      instances.
   ```bash
   aws ecs create-service \
    --cluster MY-CLUSTER \
    --service-name steadybit-extension-host \
    --task-definition steadybit-extension-host \
    --propagate-tags TASK_DEFINITION \
    --launch-type EC2 \
    --tags key=steadybit.com/discovery-disabled,value=true \
    --scheduling-strategy DAEMON
   ```
    - **Extension Container** - please replace the cluster-name. The extension will use the host network strategy and use the security groupd and subnets of your ec2
      instances.
   ```bash
   aws ecs create-service \
    --cluster MY-CLUSTER \
    --service-name steadybit-extension-container \
    --task-definition steadybit-extension-container \
    --propagate-tags TASK_DEFINITION \
    --launch-type EC2 \
    --tags key=steadybit.com/discovery-disabled,value=true \
    --scheduling-strategy DAEMON
   ```
    - **Extension HTTP** - please replace the cluster-name, subnet-ids, and security-group-id with your values. The security group needs to allow inbound traffic
      to the extension (port 8085) and outbound traffic to all ports/destination you want to reach out with the http checks implemented in the extension.
   ```bash
   aws ecs create-service \
    --cluster MY-CLUSTER \
    --service-name steadybit-extension-http \
    --task-definition steadybit-extension-http \
    --propagate-tags TASK_DEFINITION \
    --desired-count 1 \
    --deployment-configuration maximumPercent=101,minimumHealthyPercent=0 \
    --tags key=steadybit.com/discovery-disabled,value=true \
    --network-configuration '{"awsvpcConfiguration": {"subnets": ["MY-SUBNET-1", "MY-SUBNET-2", "MY-SUBNET-3"], "securityGroups": ["MY-SECURITY-GROUP-ID"], "assignPublicIp": "DISABLED"}}'    
   ```
    - **Extension AWS** - please replace the cluster-name, subnet-ids, and security-group-id with your values. The security group needs to allow inbound traffic
      to the extension (port 8085)
   ```bash
   aws ecs create-service \
    --cluster MY-CLUSTER \
    --service-name steadybit-extension-aws \
    --task-definition steadybit-extension-aws \
    --propagate-tags TASK_DEFINITION \
    --desired-count 1 \
    --deployment-configuration maximumPercent=101,minimumHealthyPercent=0 \
    --tags key=steadybit.com/discovery-disabled,value=true \
    --network-configuration '{"awsvpcConfiguration": {"subnets": ["MY-SUBNET-1", "MY-SUBNET-2", "MY-SUBNET-3"], "securityGroups": ["MY-SECURITY-GROUP-ID"], "assignPublicIp": "DISABLED"}}'    
   ```

## Amazon ECS with Fargate

### Compatibility

The agent and most of the extensions can be run as an ECS service in Fargate.

However, [extension-host](https://hub.steadybit.com/extension/com.steadybit.extension_host)
and [extension-container](https://hub.steadybit.com/extension/com.steadybit.extension_container) are not compatible with AWS Fargate because they require access
to the underlying compute instance which is not possible with Fargate.

[extension-aws](https://hub.steadybit.com/extension/com.steadybit.extension_aws) can also be used with Fargate and offers some alternative actions to discover
and attack ECS resources.

### Installation

To be done...

## FAQ

- **Q:** Can I use `readonlyRootFilesystem` for the agent in Fargate?
    - **A:** Yes, you can use `readonlyRootFilesystem` for the agent, but `tmpfs` mounts are currently not possible with that. You would need to mount an
      external volume for the agent to `/tmp` to.
- **Q:** How can I update the agent/extensions and force pulling a new image version when using `latest`?
    - **A:** `aws ecs update-service --cluster <your-cluster> --service <your-service> --force-new-deployment`
- **Q:** Can I shell into the agent/extension tasks?
    - **A:** Yes, with ECS Exec, details can be found [here](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html), short summary below:
        - You need to allow update your service to allow it, e.g.:
          `aws ecs update-service --service steadybit-agent --cluster <your-cluster> --enable-execute-command`
        - The task role needs the following permissions:
            - `ssmmessages:CreateControlChannel`
            - `ssmmessages:CreateDataChannel`
            - `ssmmessages:OpenControlChannel`
            - `ssmmessages:OpenDataChannel`
        - The task definition needs to include `initProcessEnabled` in the `linuxParameters`, e.g:
          ```json
          {
            "containerDefinitions": [
              {
                "name": "steadybit-agent",
                ...
                "linuxParameters": {
                  "initProcessEnabled": true
                }
              }
            ]
          }
          ```
        - After that, you can shell into the agent task with
          `aws ecs execute-command --cluster <your-cluster> --task <your-task-id> --container <container-name> --interactive --command "/bin/bash"`