---
title: "Designing Experiments"
navTitle: "Design"
---
To get you started with an experiment you first need to design it. That means, defining e.g. where to execute it (area, targets) and how (attack). In general,
we distinguish between

- an **infrastructure experiment**: attacking hosts and containers
- an **application experiment**: attacking a Java-based application

### Experiment Definition

#### Name

The simplest thing to start is giving a new experiment a **name**. This name can be changed after creation.

#### Team

Each experiment is associated with a team, in case you are member in more than one team you can change the team via the dropdown next to the name. This
association cannot be changed after creation. This association deals multiple purposes:

1. **Short Handle:** After creation the experiment design is assigned a unique key with the team prefix (e.g. `SRE-23`). This short handle can be easily
   recognized by the user and is a good way to reference experiments in your communication.
2. **Run/Edit Permissions:** Only members of the associated team are permitted to edit or execute the experiment.
3. **Attack/Target Restrictions:** The team settings determine which attacks and/or targets are eligible for the experiment.

#### Which outcome are you expecting?

You can write a hypothesis for your experiment describing the steady state, the actions/events and the expected behaviour. The hypothesis could read like this:
_"When requests for the recommendation service exceeds 1000ms the catalog responds within 1000ms using an empty recommendation list."_

#### Area

An experiment is always executed in one or multiple areas. This limits the scope of the experiment to a specific environment (e.g. Development or Production) or
to a specific set of systems (similar to "bounded contexts" in domain driven design). How
the [areas are configured and assigned to your team](../../install-configure/50-set-up-areas) is up to your admin.

### Targets

In case you are designing an infrastructure experiment you can specify which targets you want to attack (e.g. host or containers) and how to choose the targets.

Our recommended way is to select them by attributes where you can use the [discovery data](../../learn/30-discovery) to specify a query. Since these attributes
are discovered by the agents and can change from one moment to the next, it is wise to choose stable attributes. Good examples are labels, namespaces or
symbolic names - whereas a unique identifier of targets (like the container id) are usually a bad idea. When the experiment is due to be executed those
attributes are resolved into a concrete set of targets to be attacked. To preview the targets which would be affected if the experiment would be executed right
now, click the "show targets" button at the bottom right.

As an alternative and more static approach you can also choose from a list based on names. When attacking an application the target definition is always
specified via the application name.

### Impact and Attack Radius

You can limit your impact by defining an attack radius. It is a best practices to start easy and not by attacking your entire target selection. Therefore,
specify the attack radius as a percentage or fixed number - limiting the amount of maximum affected e.g. hosts or containers. Even so, 100% is a valid value -
but you need to be explicit about that.

### Attack
Now you are ready to choose a suitable attack to match your hypothesis. The attacks for infrastructure experiments are additionally divided into the categories `Network`, `Resource` and `State`. Each
attack is capable of attacking a specific target type (e.g. `Container` or `Host`). Choose the attack with the desired effect and the matching target type
for your experiment. When having picked one, you may want to provide additional settings for the attack. To learn more about attacks, [check out this documentation](../../learn/20-attacks).


### Execution and Monitoring

The final step is about getting some load into your system and automatically checking before and during the experiment the state of your system. We skip these for now and refer to the corresponding sections of [Load Tests](../../learn/40-loadtests) and [Monitoring](../../learn/40-integrate-monitoring).
