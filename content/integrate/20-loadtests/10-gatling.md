---
title: "Gatling"
---
[Gatling](https://gatling.io/) is an open-source load- and performance-testing framework based on Scala, Akka and Netty.
You can integrate the execution of Gatling load tests directly into your experiments.


## Integrate Custom Load Tests

We base our integration of custom load test on the concept of Docker-images.
Therefore, you need a Docker Hub user or a private Docker registry as prerequisite.
After that, just follow the steps below to integrate your custom load test:

1. Place your Gatling load test file in a separate folder. We assume for this steps that it is named *custom.scala*. Alternatively, download an example [custom.scala](attachments/gatling/custom.scala) load test and adjust it as needed.
2. Put a [Dockerfile](attachments/gatling/Dockerfile) into the same directory which simply copies the custom load test into the Docker image. It looks like:

```
# Inherit existing image
FROM steadybit/action-gatling:latest

# Provide custom test
COPY custom.scala /script.js
```

3. Build the docker image and tag it with your own Docker Hub user by running ` docker build . --tag <your-docker-hub-huser>/action-gatling:latest`.
3. Login to dockerhub via `docker login`
4. Push the Docker image to Docker Hub Registry via `docker push <your-docker-hub-huser>/action-gatling:latest`
5. In the experiment using the Gatling load test you have to specify `<your-docker-hub-huser>/action-gatling:latest` as *Docker Image* parameter.

![Experiment with Custom Gatling Load Test](10-experiment-gatling.png)

In case the image is not public and requires authentication to be pulled you can configure the Pull-Secrets in the platform via Application Settings -> Agents -> Pull Secrets.

**Tip:** Instead of the dockerhub registry you can also use a custom one - you then need to use a prefixed image tag and the correct login

### Parameters

Within the Gatling load test you have access to the following parameters as environment variables.
You can use them in the script via e.g. `${__ENV.DURATION}` as shown in the attached [custom.scala](attachments/gatling/custom.scala).

| Parameter   | Environment Variable   |      Description      | Default |
|----------|-------------|-------------|-------------|-------------|
| Duration | DURATION | How long should the load test run? | inherited from experiment duration |
| Virtual Users | VUS | How many virtual users should be started? | 1 |
