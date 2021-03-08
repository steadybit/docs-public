---
title: "Running Experiments"
navTitle: "Run"
---

## Run
Every member is permitted to run the experiments belonging to the team.
If you hit the `Run` button the experiment is immediately started when the following conditions are met:

1. Experimenting is currently enabled.
2. There is no other experiment running.
3. The blast radius resolves to one or more targets.

If one of the condition is not met, you'll get an error message and the execution is not recorded.
If all conditions are met the experiment is started.


## Experiment Phases

![experiment phases](experiment-phases.png)

| State   | Description    |
|---------|----------------|
| CREATED | The experiment was created and is waiting for the agents to connect and the state check to be executed.
| PREPARED | All agents taking part in the experiment are connected, the state check reported at least one success and the warm up begins.
| ATTACKS_STARTED | The warm up has ended and attacks were started and are executing right now.
| ATTACKS_STOPPED | The attacks were stopped and the cool down begins.
| COMPLETED | All attacks were executed, the cool down has ended and the state check reported no failures.
| CANCELED | The experiment was canceled by user interaction and all attacks were rolled back.
| FAILED | The execution failed, the reason is indicated in the UI. Can be any one of: <ul><li>Failed attack execution or rollback</li><li>Failed state check</li><li>Agent disconnected unexpectedly.</li></ul>

If an agent looses the connection to the platform during an experiment, it will immediately stop and rollback running attacks.
There are some attacks (like `Stop Container`) which can't be rolled back due to it's nature.

## Reports

Each execution is recorded and the results can be viewed in the `Reports` section.
In the detailed view for the execution you can document any **findings** you made by the experiment.
You can also indicate if any additional action is required to mitigate the incident in the future.

## Canceling/Preventing Experiments

In the case the running experiment causes unforeseen severe errors any authenticated user can stop any running experiment by clicking the stop button.

You can prevent further executions if you disable experimenting using the `Stop All` button.
If you disable experimenting, no (manual or scheduled) experiments will be executed until experimenting is continued.
Stopping and continuing experimenting can be triggered by any authenticated user.
