# Run

After having your [experiment fully designed](./) you can simply use the `Run`-button to execute it. This action can be performed if all the following conditions are met:

1. No validation errors
2. Every attack resolves at that moment to at least one target.
3. You are member of the same team as the experiment
4. [Emergency stop](./#Emergency-Stop) has not been triggered.

Otherwise, you'll get an error message and the experiment is not started.

As soon as the experiment starts, the platform automatically switches over to the execution view. The first step of the platform is to establish the connection to the matching agents. In addition, the running experiment is indicated at the top right execution icon.

![Experiment Execution View](<../../quick-start/run-experiment-run2 (1) (1).png>)

The execution view consists of the following elements.

* **Experiment Player**: At the top you see the sequence defined previously in the [design](./#design). While the experiment is running a special marker indicates the current point of time. Some attacks need a little bit of extra time before being started which is indicated by a light green colouring in the front. The extra time is added to the timing of the attack and is currently caused by technical reasons.
* **Execution Log**: The execution log lists more details to the experiment attacks and actions. For instance, you can see which exact containers are affected by the attack or what is the exact reason for a failed experiment
* **Deployment Replica Count**: When using an experiment in a Kubernetes context we will automatically monitor how many PODs are ready in your cluster and indicate whenever there is a discrepancy.
* **Kubernetes Event Log**: When using an experiment in a Kubernetes context we provide you access to the Kubernetes Events so that you can identify what exactly happens in the Kubernetes cluster.
* **HTTP Call**: If your experiment contains a `HTTP Call`-action you can see the response time as well as HTTP response status as a separate widget in the execution window.
* **Monitoring Events**: In case your admin has connected a monitoring solution to steadybit (like [Datadog](../../integrate-with-steadybit/monitoring/datadog.md), [Instana](../../integrate-with-steadybit/monitoring/instana.md), [New Relic](../../integrate-with-steadybit/monitoring/newrelic.md) or [Prometheus](../../integrate-with-steadybit/monitoring/prometheus.md)) you can see occuring events and alerts of your setup directly in the execution view.

Every execution has a unique identifier (e.g. **#33131**), which you can use to identify older executions (visible on the left side).

Eventually, every execution ends in one of the following states:

| End state | Description                                                                                                                                                                                                                                                |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| COMPLETED | Entire experiment (all attacks, actions and checks) were successfully executed - so no failure reported by any check.                                                                                                                                      |
| CANCELED  | The experiment was canceled by user interaction and all attacks were rolled back.                                                                                                                                                                          |
| FAILED    | The execution failed due to some failing checks, for example a _HTTP Check_ not reaching the required success rate.                                                                                                                                        |
| ERRORED   | The execution failed due to some technical reasons like _Failed attack execution_ or _Agent disconnected unexpectedly_. This shouldn't happen frequently, in case it does, let us know. We are constantly improving the platform to reduce failure states. |

In case an agent looses the connection to the platform during an experiment, it will immediately stop and rollback running attacks. There are some attacks (like `Stop Container`) which can't be rolled back due to it's nature.
