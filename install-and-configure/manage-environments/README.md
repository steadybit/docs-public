---
title: Manage Environments
---

# Manage Environments

No one knows your system better than you, so you should be the one who structures the discovered targets.

Each environment should combine a stage (like development, QA, or production) with the part of your system a team is responsible for (like a "bounded context" in domain-driven design).

## Default Environment: Global

By default, your system contains one environment called `Global`. It contains **every** target that Steadybit has discovered. Using Global to get started is fine while you are trying Steadybit out, but it is dangerous in the long run, so you should create your own environments.

## Define your own Environment

To create or change an environment go to `/settings/environments` and choose to either add an environment or edit an existing one. An environment consists of a

* **Name**: A meaningful name helps you find the environment later (e.g. "Onlineshop DEV" or "Contract Management PROD").
* **Team**: To use an environment for running an experiment, you need to assign a team to it. You can do this from the environment side (`/settings/environments`) as well as from the team side (`/settings/teams`). This restricts a team's users to certain environments, and therefore to certain targets.
* **Environment Scope**: The environment scope defines targets belonging to an environment by using our [discovery data](../../concepts/discovery/). This is the upper limit of targets that can be attacked when running an experiment in a certain environment.

### Define Environment Scope

With the query UI, you can build regular queries which are connected with an AND expression. For most use cases that is sufficient. Sometimes, though, you need more control over the query — for instance, to check whether a key-value pair exists at all, or to match everything except one specific attribute, e.g. `cluster.name="prod"`. Queries like that can easily be written with the Query Language. For detailed information, please [visit the query language documentation](../../concepts/query-language/).

#### Examples

A good environment scope always answers two questions: **which stage** (e.g. staging or production) and **which part of the infrastructure** the team is responsible for. Typically, you'll create one environment per team and stage, using the same query for the team's part and changing only the stage.

**Kubernetes: the namespaces a team owns, per cluster**

```
// "Shop - Staging": the shop team's namespaces in the staging cluster
k8s.cluster-name="staging" AND k8s.namespace IN ("checkout", "cart")

// "Shop - Production": the same namespaces in the production cluster
k8s.cluster-name="prod-eu" AND k8s.namespace IN ("checkout", "cart")
```

**Cloud: a team's account and region**

```
// "Payments - Production": the payments team's production AWS account in Frankfurt
aws.account="111122223333" AND aws.region="eu-central-1"
```

If your organization uses one cloud account per team and stage, the account already covers both questions. Add the region to keep experiments away from other regions.

**Application: a team's service across namespaces**

```
// "Recommendations - Production": every workload labeled with the team's app in the production cluster
k8s.cluster-name="prod-eu" AND k8s.label.app="recommendation"
```

**Classic hosts: following a naming convention**

```
// "Inventory - Staging": the inventory team's staging VMs, named e.g. inventory-stg-01
host.hostname~"inventory-stg-"
```

**Combining it all**

Real-world scopes are rarely that tidy. A team often runs parts of its system in Kubernetes, in a cloud account, and on a few classic hosts, so its scope becomes a combination of the examples above, joined with `OR`. Use parentheses to keep each stage-and-part pair together:

```
// "Shop - Staging": everything the shop team runs in staging
(k8s.cluster-name="staging" AND k8s.namespace IN ("checkout", "cart"))
OR (aws.account="444455556666" AND aws.region="eu-central-1")
OR (k8s.cluster-name="staging" AND k8s.label.app="shop-search")
OR host.hostname~"shop-stg-"
```

Queries like this can only be edited with the Query Language, not the Query UI. Check every `OR` branch for the stage: a branch without one, e.g. `host.hostname~"shop-"`, would pull production targets into a staging environment.

Finally, don't forget to assign the environment to a team and give it a meaningful name. That's it, you are ready to use that environment in an experiment!

![Create a new environment](../../.gitbook/assets/new_environment.png)

### Use Environments

Once the environments are defined and assigned to teams, you can make use of them when e.g. [designing an experiment](../../use-steadybit/experiments/).

## Environment Variables

With an environment often come variables that are useful in an experiment associated with the provided environment (e.g., the name of the Kubernetes cluster, the HTTP base path of a load-balanced ingress, or the AWS account). You can manage environment variables to define those and use them consistently across all your experiments referencing the environment. Each variable can hold a fixed value or a [dynamic value](../../use-steadybit/experiments/variables.md#value-settings) that is resolved from your infrastructure when an experiment run starts. You can [learn more in the experiment's variable section](../../use-steadybit/experiments/variables.md).
