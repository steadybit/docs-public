# Schedule

Experiments can be run on the fly using the UI, API, or CLI, or scheduled to run automatically in the future. Scheduling an experiment can be done via [UI](./#scheduling-via-ui) or [API](./#scheduling-via-api).

{% hint style="info" %}
To schedule an experiment, you must have permission to edit it, which means you have to be a member of the team.

Please note that an experiment schedule always starts the experiment. In case of validation errors, these are documented as canceled experiment runs to check them out asynchronously.
{% endhint %}

## Scheduling via UI

You can open the scheduling configuration dialog in the platform either in the experiment editor or the experiment list's context menu.

![Schedule experiment within the experiment editor](../../../.gitbook/assets/create-experiment-schedule.png)

When the configuration dialog opens, you can manage multiple experiment schedules. Each schedule can run the experiment just once or repeatedly in the future.

### One-Time Schedule

The configuration is straightforward if you decide to run it once. Just select a date and time in the future and save the schedule. Please keep the "Activate Schedule" toggle enabled. Otherwise, the schedule will be ignored and not run.

![Scheduling Experiments just once](../../../.gitbook/assets/create-experiment-schedule-once.png)

{% hint style="info" %}
The date and time selections are done in the user’s configured timezone.
{% endhint %}

### Recurring Schedule

Experiments can be scheduled to run repeatedly (like every hour or every Friday morning). To do so, you have to configure a cron-like expression.

![Scheduling Experiments repeatedly](../../../.gitbook/assets/create-experiment-schedule-recurrently.png)

{% hint style="info" %}
**Just so you know**, we are using the [Quartz cron trigger syntax](http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html). The Quartz cron expression is evaluated in the user’s configured timezone. The currently configured timezone will also be shown for the next experiment run.
{% endhint %}

### Schedules Overview

In the experiment list section on the left-hand side, you can find a quick overview of all configured schedules. Here you can see when each schedule will next be triggered, and enable, disable or delete it.

![Scheduled Experiment overview](../../../.gitbook/assets/experiment-schedule-overview.png)

### Experiment Variable Overrides

If the experiment is making use of an [environment, service, or experiment variable](../variables.md), you can override them in the schedule. As in the experiment editor, the experiment is validated when you enter unsupported values (e.g. entering "name" into a duration variable). Schedule variables override the environment, service and experiment values for every run triggered by this schedule.

![Experiment Schedule override](../../../.gitbook/assets/experiment-schedule-overrides.png)

## Scheduling via API

Schedules can also be configured using the following API endpoints. Check out [Integrate with Steadybit / API](../../../integrate-with-steadybit/api/api.md) to learn how to access the API.

* [Create or update an experiment schedule](https://platform.steadybit.com/api/swagger/swagger-ui/index.html#/Experiment%20Schedule/upsertSchedule)
* [Get an experiment schedule](https://platform.steadybit.com/api/swagger/swagger-ui/index.html#/Experiment%20Schedule/getSchedules)
* [Remove an experiment schedule](https://platform.steadybit.com/api/swagger/swagger-ui/index.html#/Experiment%20Schedule/removeExperimentScheduleById)
* [List all schedules currently configured](https://platform.steadybit.com/api/swagger/swagger-ui/index.html#/Experiment%20Schedule/getAllSchedulesV2)

Each experiment schedule can be identified via a UUID (`id`) which can be used to update or delete a specific schedule.
