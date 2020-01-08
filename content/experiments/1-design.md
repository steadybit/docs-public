---
title: "Designing Experiments"
navTitle: "Design"
---

## Name
In the create dialog you should first enter a **name** for the Experiment.
The name can be edited after creation.

## Team
Each experiment is associated with a team, in case you are member in more than one team you can change the team via the dropdown next to the name.
This association cannot be changed after creation. This association deals multiple purposes:

1. **Short Handle:** After creation the experiment design is assigned a unqiue key with the team prefix (e.g. `SRE-23`).
   This short handle can be easily recognized by the user and is a good way to reference experiments in your communication.
2. **Run/Edit Permissions:** Only members of the associated team are permitted to edit or execute the experiment.
3. **Attack/Target Restrictions:** The team settings determine which attacks and/or targets are eligible for the experiment

## Hypothesis
You should write a hypothesis for your experiment describing the steady state, the actions/events and the expected behaviour.
The hypothesis could read like this:
_"When requests for the recommendation service exceeds 1000ms the catalog responds within 1000ms using an empty recommendation list."_

## Attack
Now you are ready to choose a suitable attack to match your hypothesis.
The attacks are divided into the categories `Resource`, `State` and `Network`.
Each attack is capable of attacking a specific target type (`Process`, `Container` or `Host`).
Choose the attack with the desired effect and the matching target type for your experiment.
After choosing you may provide additional parameters for the attack.

## Blast Radius
Now you need to specifiy the blast radius of the experiment.
The blast radius is narrowed down by choosing attributes.
If the team is restricted to certain targets, the mandatory attributes will be shown.
You can filter down the the list with the available attributes using the search field.
Selecting an attribute is done by clicking on it, deselecting by clicking on the attribute in the list on the right hand side.

After selecting the attributes you must limit the selected targets to a fixed number or percentage.
This is mandatory to not accidentally attack all instances. 100% is a valid value - but you need to be explicit about that.

To preview the targets which would be affected if the experiment would be run right now, click the target button at the top right.

The attributes are provided by the discovery run by the agents and can change from one moment to the next.
So it is wise to choose stable attributes like labels, namespaces or symbolic names and not ones that are unique to targets (like the container id).
When the experiment is due to be executed those attributes are resolved into a concrete set of targets to be attacked.

In case the mandatory attributes for the team changes all new attributes will be added to the experiments when executing, but the removed ones will also be kept to not accidentally increase the blast radius.

## Steady State Check
You may add an automated steady state check to the experiment.
The check is executed before and during the experiment.
If the check fails at any time the experiment is immediately stopped.

Currently only a simple http check is supported.
The check issues a http `GET` request on the specified URL and asserts the returned status to be successful.
The URL must be reachable from the platform server.
