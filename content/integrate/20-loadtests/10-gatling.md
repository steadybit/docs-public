---
title: "Gatling"
---
[Gatling](https://gatling.io/) is an open-source load- and performance-testing framework based on Scala, Akka and Netty.
You can integrate the execution of Gatling load tests directly into your experiments.

### Usage

When using the default, the load test will perform a GET request every second on the target url with the number of virtual users.

### Parameters

| Parameter   | Environment Variable   |      Description      | Default | Required |
|----------|-------------|-------------|-------------|-------------|
| Duration | DURATION | How long should the load test run? | inherited from experiment duration | no |
| Virtual Users | VUS | How many virtual users should be started? | 1 | yes |
| Docker Image | - |  Which image should be used for executing the action? | - | yes |


### Custom Gatling Tests
For using a custom load test you can exchange the `/opt/gatling/user-files/simulations/basic.scala` file with your custom one.

```
# Inherit existing image
FROM steadybit/action-gatling:latest

# provide custom test
COPY custom.scala /opt/gatling/user-files/simulations/basic.scala
```

#### Extended explanation

1. Create a custom.scala Gatling file. At best you use the attached [custom.scala](content/integrate/20-loadtests/attachments/gatling/custom.scala) file as starting point, as it demonstrates how the passed in parameters are used.
2. Put the custom.jmx and the attached [Dockerfile](attachments/gatling/Dockerfile) into the same directory and run the following command in the same directory: docker build --tag `<your-docker-hub-huser>/action-gatling:latest` .
3. Login to dockerhub: docker login
4. Push the image docker push `<your-docker-hub-huser>/action-gatling:latest`
5. In the experiment with the Gatling load test use `<your-docker-hub-huser>/action-gatling:latest` for the Docker Image parameter.
6. Only in case the image is not public and requires authentication to be pulled: configure the Pull-Secrets in the platform via Application Settings -> Agents -> Pull Secrets
   Tip: Instead of the dockerhub registry you can also use a custom one - you then need to use a prefixed image tag and the correct login

