---
title: "Install as Docker Container"
navTitle: "Docker Container"
---

## Prerequisites

To use steadybit with the SaaS platform you only need Docker on the host where the attacks will be executed.

## Oneliner

The agent container image is available in the steadybit Docker Registry.
Please note that the container needs to run in a privileged mode, allowing it to discover and attack your Infratructure.
And check before installation whether the platform is accessible via the corresponding ports (443 and 7878).

```bash
curl -sfL https://get.steadybit.io/agent.sh | sh -s -- -a <agent-key> -e <platform-url>
```

For your convenience you can use the [setup page](https://platform.steadybit.io/settings/agents/setup) in the SaaS platform, where your agent key is already prepared in the command.

## Manual setup

First login to the steadybit Docker Registry:

```bash
docker login -u=_ -p=<agent-key> docker.steadybit.io
```

Then run the steadybit Agent Container:

```bash
sudo docker run \
  --detach \
  --name steadybit-agent \
  --volume /var/run:/var/run \
  --volume /var/run/docker.sock:/var/run/docker.sock \
  --volume /sys:/sys \
  --privileged \
  --net=host \
  --pid=host \
  --ipc=host \
  --env="STEADYBIT_AGENT_KEY=<agent.key>" \
  docker.steadybit.io/steadybit/agent
```

## Non-privileged container

In case you need to run the container non-privileged you can add the individual capabilities with `--cap-add`:
```bash
sudo docker run \
  --detach \
  --name steadybit-agent \
  --volume /var/run:/var/run \
  --volume /var/run/docker.sock:/var/run/docker.sock \
  --volume /sys:/sys \
  --cap-add=NET_ADMIN \
  --cap-add=SYS_BOOT \
  --cap-add=SYS_TIME \
  --cap-add=KILL \
  --security-opt apparmor:unconfined \
  --net=host \
  --pid=host \
  --ipc=host \
  --env="STEADYBIT_AGENT_KEY=<agent-key>" \
  --env="STEADYBIT_AGENT_REGISTER_URL=<platform-url>" \
  docker.steadybit.io/steadybit/agent
```

## Running behind a http proxy server

The Steadybit Agent uses http and websockets to communicate with the platform and to download updates.
To simplify the agent deployment you should consider to allow direct communication to our platform.
In case using a single entry into and out of your network is required, you can configure the agent to use a proxy.

For the docker agent you need to run the container with additional environment variables.
You can set these by adding the following arguments to the `docker run` command:

```bash
  --env="STEADYBIT_AGENT_PROXY_HOST=<hostname or address of your proxy"> \
  --env="STEADYBIT_AGENT_PROXY_PORT=<port of your proxy>" \
  --env="STEADYBIT_AGENT_PROXY_PROTOCOL=<proxy protocol e.g. http>" \
  --env="STEADYBIT_AGENT_PROXY_USER=<username of the proxy (if needed)>" \
  --env="STEADYBIT_AGENT_PROXY_PASSWORD=<password of the proxy (if needed)>" \
```