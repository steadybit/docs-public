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

  val durationInSeconds = java.lang.Long.getLong("duration", 10L)
  val scn1 = scenario("BasicSimulation")
    .during(durationInSeconds seconds) {
      exec(Crawl.crawl)
    }

  val vuCount = Integer.getInteger("vus", 1)
  setUp(
    scn1.inject(atOnceUsers(vuCount))
  ).protocols(httpProtocol)
}

object Crawl {

  val feeder = csv("/opt/gatling/user-files/test-url.csv").random

  val crawl = exec(feed(feeder)
    .exec(http("${testurl}")
      .get("${testurl}")
    ).pause(1.seconds))
}
