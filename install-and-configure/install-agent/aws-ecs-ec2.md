# Install on Amazon ECS

The Steadybit Agent can be installed on **Amazon Elastic Container Service** backed by AWS EC2 instances. It is **not compatible** with AWS Fargate.

In general, you have two options to install the Agent:

- Run and install the Agent and extensions on the underlying EC2 Instance
- Run the Agent and extensions as ECS service(s).

### EC2 Installation

Include the agent and the extensions in your AMI, or install them when the EC2 instance is launching using the user data. Please refer to [install-on-linux-hosts.md](install-on-linux-hosts.md "mention") for setting up the agent on Linux.

See the [Amazon ECS Container Instance documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_container_instance.html) for using the user data mechanism on new EC2 instances.

### ECS Task

{% hint style="warning" %}
Due to security constraints, the Host Shutdown Attack will not work. You can use the [Change EC2 Instance State](https://hub.steadybit.com/action/com.steadybit.extension_aws.ec2_instance.state) attack from the extension-aws instead.
{% endhint %}

You can run the agent and the extension as an ECS workload. You have to create daemonset task definitions for the extension-host and extension-container and a regular service for the agent and other extensions.

You can use the script from [Install using Docker Compose](/install-and-configure/install-agent/install-as-docker-container.md) to generate a docker compose file to get an idea how the container definitions have to look.

If you need any help with that, [let us know](https://steadybit.com/contact)!
