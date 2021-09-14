---
title: "JMeter"
---
[JMeter](https://jmeter.apache.org/) is open source software, designed to load test functional behavior and measure performance.
You can integrate the execution of JMeter load tests directly into your experiments.

### Usage

There is no default usage at all. You have to create your own docker image with your specific loadtest executed in it.

### Parameters

| Parameter   | Environment Variable   |      Description      | Default | Required |
|----------|-------------|-------------|-------------|-------------|
| Duration | DURATION | How long should the load test run? | inherited from experiment duration | no |
| Virtual Users | VUS | How many virtual users should be started? | 1 | yes |
| Docker Image | - |  Which image should be used for executing the action? | - | yes |
| Path to jtl report | - | The jtl report at this location will be shown in the report after experiment execution. | /jmeter/result.jtl | no |

### Create your custom JMeter Tests Docker image
For using a custom load test you can exchange the `jmeter/default.jmx` file with your version.

```
# Inherit existing image
FROM steadybit/action-jmeter:latest

# provide custom test
COPY custom.jmx /jmeter/default.jmx
```

#### Extended explanation

1. Create a custom.js JMeter file. At best you use the attached [custom.js](content/integrate/20-loadtests/attachments/jmeter/custom.jmx) file as starting point, as it demonstrates how the passed in parameters are used.
2. Put the custom.js and the attached [Dockerfile](attachments/jmeter/Dockerfile) into the same directory and run the following command in the same directory: docker build --tag `<your-docker-hub-huser>/action-jmeter:latest` .
3. Login to dockerhub: docker login
4. Push the image docker push `<your-docker-hub-huser>/action-jmeter:latest`
5. In the experiment with the JMeter load test use `<your-docker-hub-huser>/action-jmeter:latest` for the Docker Image parameter.
6. Only in case the image is not public and requires authentication to be pulled: configure the Pull-Secrets in the platform via Application Settings -> Agents -> Pull Secrets
   Tip: Instead of the dockerhub registry you can also use a custom one - you then need to use a prefixed image tag and the correct login

