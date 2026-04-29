---
title: Share Experiment Design With Another Team
navTitle: Share Experiment Design
---

# Share Experiment Design

Sharing an experiment lets another team run the original experiment in your environment without creating a copy.
The experiment design stays in the owning team and remains the single source of truth, while the team it is shared with can run it, schedule it and adjust [per-run custom properties](../properties/README.md).

## Who Can Share

Only **Team Owners** and **Administrators** can share an experiment.
See [Permissions](../../../install-and-configure/manage-teams-and-users/permissions.md) for details.

## What the Receiving Team Can Do

A team that an experiment has been shared with can:

* Run the experiment
* Schedule the experiment
* [Edit custom properties of a run](../properties/README.md)

The receiving team **cannot** edit the experiment design itself.
Any change to the design has to be done by the owning team.

## Share an Experiment

Open the experiment you want to share and select **Share with teams** in the experiment designer's context menu. Choose the team you want to share it with and confirm.

![Experiment designer's context menu allowing to share the experiment with other teams](10-experiment-share.png)

![Experiment sharing](20-experiment-share.png)

## Find Shared Experiments

Experiments shared with your team appear in **Experiments** → **Shared Designs** and can be filtered based on the owning team.
From there you can run, schedule, or override run properties just like for your own experiments.

![List of shared experiment designs](30-experiment-shared.png)