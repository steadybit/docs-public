The following command will download and run the latest steadybit agent package on your EC2 instance:

```shell
curl -sfL https://get.steadybit.io/agent-linux.sh | sh -s -- -a <agent-key> -e <platform-url> -o aws
```

For your convenience you can use the [setup page](https://platform.steadybit.io/settings/agents/setup) in the SaaS platform, where your agent key is already
prepared in the command.

See also the [Amazon ECS Container Instance documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_container_instance.html)
for using User Data mechanism on new EC2 instances to automate the agent installation.

### Trust Relationship for EC2

```
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
