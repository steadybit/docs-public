---
title: "Gatling"
navTitle: "Gatling"
---

## Gatling

Gatling is an open-source load- and performance-testing framework based on Scala, Akka and Netty.
With our integration you can integrate the execution of Gatling load tests directly into your experiments.

[Read more about Gatling](https://gatling.io/docs/current/)

### Configuration

| Parameter   | Environment Variable   |      Description      | Default | Required |
|----------|-------------|-------------|-------------|-------------|
| Duration | DURATION | How long should the load test run? | inherited from experiment duration | no |
| Virtual Users | VUS | How many virtual users should be started? | 1 | yes |
| Target URL | TARGETURL | Which url should be the target for the load test? | - | yes |
| Docker Image | - |  Which image should be used for executing the action? |steadybit/action-gatling:latest | yes |

### Usage

When you are using our default Docker image ('steadybit/action-gatling:latest') then the following load test will be executed during the experiment:

```
package com.steadybit.gatling

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._

class BasicSimulation extends Simulation {

  val httpProtocol = http
    .baseUrl("http://127.0.0.1")
    .acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
    .doNotTrackHeader("1")
    .acceptLanguageHeader("en-US,en;q=0.5")
    .acceptEncodingHeader("gzip, deflate")
    .userAgentHeader("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36")

  val scn1 = scenario("BasicSimulation")
    .exec(Crawl.crawl)

  val vuCount = Integer.getInteger("vus", 1)
  val durationInSeconds = java.lang.Long.getLong("duration", 10L)
  setUp(
    scn1.inject(rampUsers(vuCount) during (durationInSeconds seconds))
  ).protocols(httpProtocol)
}

object Crawl {

  val feeder = csv("/opt/gatling/user-files/test-url.csv").random

  val crawl = exec(feed(feeder)
    .exec(http("${testurl}")
      .get("${testurl}")
    ))
}

```

The `entrypoint.sh` script contains the other parameters which are necessary for running a Gatling load test:

```
#!/bin/sh -l
echo "Executing Gatling load test against target url ${TARGETURL} with duration ${DURATION} and ${VUS} VUs"
echo 'testurl' > /opt/gatling/user-files/test-url.csv
echo ${TARGETURL} >> /opt/gatling/user-files/test-url.csv
export JAVA_OPTS="-Dvus=${VUS} -Dduration=${DURATION}"
/opt/gatling/bin/gatling.sh -s com.steadybit.gatling.BasicSimulation
```

Of course it is also possible to store your own script or customize the `entrypoint.sh`. All you have to do is to provide your own Docker image, which contains the corresponding script:

```
# Inherit existing image
FROM steadybit/action-gatling:latest

# provide custom test
COPY user-files/simulations/basic.scala /opt/gatling/user-files/simulations/basic.scala

#optional
COPY entrypoint.sh /opt/gatling/bin/entrypoint.sh

ENTRYPOINT [ "sh", "-c", "/opt/gatling/bin/entrypoint.sh" ]
```
