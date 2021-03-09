---
title: "Scheduling Experiments"
navTitle: "Schedule"
---

It is advised to execute an experiment at least once successfully before automating.

Using the dropdown next to the `Start` button you can schedule an experiment for later execution. You can either choose to execute the experiment just one time
using the `Start At` option or periodically using a `Cron` expression.

| Example         | Description
|------------------------------|-----------
| `0 15 10 * * ?` | 10:15am every day
| `0 15 10 ? * MON-FRI` | 10:15 from Monday till Friday
| `0 0 8-11 * * ?` | every hour between 8-11am, every day

If a scheduled experiment fails to meet the preconditions any execution is recorded with the failure reason.

If an experiment is due to be executed while experimenting is disabled, it will fail. The run will not be caught up after experimenting is continued, it will be
executed the next time it is due (only when using a cron expression).
