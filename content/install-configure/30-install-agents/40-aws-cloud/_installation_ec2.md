### Installation on EC2 Instance

The following command will download and run the latest steadybit agent package on your EC2 instance:

```shell
curl -sfL https://get.steadybit.io/agent-linux.sh | sh -s -- -a <agent-key> -e <platform-url> -o aws
```

For your convenience you can use the [setup page](https://platform.steadybit.io/settings/agents/setup) in the SaaS platform, where your agent key is already
prepared in the command. Make sure to add `-o aws` to the copied command.

See also the [Amazon ECS Container Instance documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_container_instance.html)
for using User Data mechanism on new EC2 instances to automate the agent installation.

#### Authentication

If you installed the agent on an EC2 instance, the easiest way is to use the 6th option from
the [default credentials provider chain](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials.html#credentials-chain), namely
the [InstanceProfileCredentialsProvider](https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/auth/credentials/InstanceProfileCredentialsProvider.html)
.

Steps:

- Assign your previous created IAM role to the ec2 instance. There is a slight difference between IAM Roles and Instance Profiles, if you see a message like
  `No roles attached to instance profile`, make sure to
  check [this page](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html)
- The IAM role needs a trust relationship so that EC2 is able to assume the role.

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
