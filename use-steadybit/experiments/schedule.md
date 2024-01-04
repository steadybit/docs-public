# Schedule

Experiments can be run on the fly using the “Run Experiment” button (or via API) but also can be scheduled to be automatically run in the future. Scheduling an experiment can be done via [UI](schedule.md#scheduling-via-ui) or [API](schedule.md#scheduling-via-api).

{% hint style="info" %}
To schedule an experiment one must have permissions to edit the experiment. This means, one has to be a member of the team.

Please note that a scheduled experiments is always executed even when another experiment runs in parallel.
{% endhint %}

## Scheduling via UI

There are two ways to open up the scheduling configuration dialog in the platform: One is in the experiment list, and the other is in the experiment editor.

![Schedule experiment via context menu in the experiment list](schedule/create-experiment-schedule-step1.png)

![Schedule experiment within the experiment editor](schedule/create-experiment-schedule-step2.png)

When the configuration dialog opens up, one can decide either to run the experiment just once in the future or repeatedly.

### Once Schedule

The configuration is straightforward if you decide to run it once. Just select a date and time in the future and save the schedule. Please keep the "Activate Schedule" toggle enabled. Otherwise, the schedule will be ignored and not executed.

![Scheduling Experiments just once](schedule/create-experiment-schedule-step3.png)

{% hint style="info" %}
The date and time selections are done in the user’s configured timezone. The currently configured timezone will also be printed above the time selection for awareness.
{% endhint %}

### Recurrent Schedule

Experiments can be scheduled to run repeatedly (like every hour or every Friday morning). To do so, you have to configure a cron-like expression.

![Scheduling Experiments repeatedly](../../.gitbook/assets/create-experiment-schedule-step4-fixed.png)

{% hint style="info" %}
**Just so you know**, we are using the [Quartz cron trigger syntax](http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html). The Quartz cron expression is evaluated in the user’s configured timezone. The currently configured timezone will also be shown for the next experiment run.
{% endhint %}

### Schedules Overview

In the experiment list section on the left-hand side, you can find a quick overview of all configured schedules. Here, you can easily see when the schedules will be triggered next, enable/disable or even delete the schedule.

![Scheduled Experiment overview](schedule/create-experiment-schedule-step5.png)

## Scheduling via API

Schedules can also be configured using the following API endpoints. Check out [Integrate with Steadybit / API](../../integrate-with-steadybit/api.md) how to access the API.

### Once Schedule

* [Create new once-schedule](https://platform.steadybit.com/api/swagger/swagger-ui/index.html#/Experiments/scheduleExperimentOnce)
* [Update existing once-schedule](https://platform.steadybit.com/api/swagger/swagger-ui/index.html#/Experiments/updateScheduleOnce)

### Recurrent Schedule

* [Create recurrent schedule](https://platform.steadybit.com/api/swagger/swagger-ui/index.html#/Experiments/scheduleExperimentRecurrently)
* [Update existing recurrent-schedule](https://platform.steadybit.com/api/swagger/swagger-ui/index.html#/Experiments/updateScheduleRecurrently)

### Schedules Overview

* [List all schedules currently configured](https://platform.steadybit.com/api/swagger/swagger-ui/index.html#/Experiments/getAllSchedules)
* [Get experiment schedule](https://platform.steadybit.com/api/swagger/swagger-ui/index.html#/Experiments/getSchedule)
* [Remove existing schedule](https://platform.steadybit.com/api/swagger/swagger-ui/index.html#/Experiments/removeExperimentSchedule)
