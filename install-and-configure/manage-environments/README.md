---
title: Set Up Environments
---

# Manage Environments

No one knows your system better than you, so it is obvious that you should be the one who structures the discovered targets.

It's up to you whether you use environments to separate parts of your system from each other (like "bounded contexts" in domain driven design), to separate your environments (like development, QA and Production) or simply both.

### Default Environment: Global

Per default, your system contains one environment called `Global`. This is the place where **every** target that steadybit has discovered will be in. So, using Global for the start is fine (when trying out steadybit), but on the long run dangerous and you should create your own.

### Define your own Environment

To create or change an environment go to `/settings/environments` and choose to either add an environment or edit an existing one. An environment consists of a

* **Name**: A meaningful name helps to find the environment afterwards (e.g. "Onlineshop DEV" or "Contract Management PROD").
* **Included Targets**: The targets belonging to an environment are specified by using our [discovery data](../../use-steadybit/discovery/). This is the upper limit of targets that can be attacked when running an experiment in a certain environment.
* **Team**: For using that environment to run an experiment you need to assign the team to it. This can be done from environment-perspective (`/settings/environments` ) as well as from Team-perspective (`/settings/teams`). It limits access to the users of a team to certain environments (so systems and environments).

Environments can be defined using two different modes

* **Kubernetes** (_default_): Allow you to define the environment pretty easy and fast by using the landscape and choosing the cluster, namespace and deployments you want to have.
* **Advanced**: In case you need more fine-grained control (e.g. different availability zones, specific hosts or non-kubernetes applications)

#### Kubernetes Environments

When creating a new environment you end up by default in Kubernetes-based mode. In case you have no Kubernetes you need to switch to the Advanced Mode (see below).

![Kubernetes Environment: Select your cluster](add-cluster.png)

First thing is to select your Kubernetes cluster. After that you can add Kubernetes namespaces and deployments to your environment.

![Kubernetes Environment: Add namespaces and deployments](add.png)

Don't forget to finally assign the environment to a team and give it a meaningful name. That's it, you are ready to use that environment in an experiment!

#### Advanced Environments

An advanced environment is needed in case

* you are not only using Kubernetes
* you need more fine-grained control (e.g. limit the environment to a specific AWS Availability Zone).

Therefore, you can switch to the advanced mode and use the Query UI or the Query Language to define the environment. On the right-hand side, you can see all included targets for the given environment query.

<figure><img src="../../.gitbook/assets/local.platform-k8s.dev.steadybit.io_3000_settings_areas_%3Cnew%3E_tenant=demo_&#x26;team=SHOP_.png" alt=""><figcaption><p>Advanced Environment: Query Builder for fine-grained environments</p></figcaption></figure>

With the query UI, you can build regular queries which are connected with an AND expression. For most use cases this can be sufficient. But sometimes, it's necessary to have even more control over the query. For instance, if you want to check for any key-value pair existence or you want to match all, but not a specific attribute, e.g. cluster.name="prod". Queries like that can easily be written with the Query language. For detailed information, please [visit the query language documentation](../../use-steadybit/query-language.md).

Finally, don't forget to finally assign the environment to a team and give it a meaningful name. That's it, you are ready to use that environment in an experiment!

### Use Environments

Once the environments are defined and assigned to teams, you can make use of them when e.g. [designing an experiment](../../use-steadybit/experiments/).
