---
title: JMeter
---

# JMeter

[JMeter](https://jmeter.apache.org/) is open source software, designed to load test functional behavior and measure performance. You can integrate the execution of JMeter load tests directly into your experiments.

### Integrate JMeter Load Tests

To use JMeter you need to upload your JMeter-Test-File. This can be done simply by adding a step of type "Loadtest", choose "JMeter" as Loadtest-Type and use the provided File-Upload.

![Experiment with JMeter Load Test](jmeter-experiment.png)

#### Parameters

Within the JMeter load test you have access to your provided parameters. You can use them in the script via e.g. `${__P(TARGET)}` as shown in the attached [example.jmx](jmeter-example.jmx). The parameter `DURATION` is always accessible in your script, it contains the estimated total duration of your experiment, based on the duration of the other steps in seconds.

If you don't know where to start, feel free to use our [example.jmx](jmeter-example.jmx). It is a very basic script and will just perform some HTTP-Calls on a specified endpoint. You can find a table of parameters below:

| Parameter       | Environment Variable | Description                                                                 | Default                                                                           | 
|-----------------|----------------------|-----------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| Duration        | DURATION             | How long should the load test run?                                          | will be passed to the loadtest from steadybit, inherited from experiment duration |
| Virtual Users   | VUS                  | How many virtual users should be started?                                   | 1                                                                                 | 
| Target Host     | TARGET\_HOST         | Which host should be targeted? (i.e. `www.steadybit.com`)                   |                                                                                   |
| Target Protocol | TARGET\_PROTOCOL     | Which protocol should be used? (`http`                                      | `https`)                                                                          | `http` | 
| Target Port     | TARGET\_PORT         | Which port should be used? (Remember to use port 443 if you choose `https`) | 80                                                                                | 
| Target Path     | TARGET\_PATH         | Which path should be targeted?                                              | `/`                                                                               |

#### Report

If your script contains a JMeter-Listener writing a log-file, we will transfer it to the steadybit platform after the execution.

We will override the file-name to `result.jtl`.

#### Step result / Assertions

You can use [jmeter assertions](https://jmeter.apache.org/usermanual/component\_reference.html#assertions) to control the loadtest-step-result in the platform.

We will scan the report for non empty `<failureMessage>`-Tags and let the step fail if there are any.
