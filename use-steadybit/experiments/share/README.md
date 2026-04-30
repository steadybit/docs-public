---
title: Share Experiments
navTitle: Share
---

# Share Experiments

Steadybit offers several ways to share an experiment — from a **deep link** where the experiment, its design and its runs all stay in one place, to a **detached copy** that drifts independently once shared.
Pick the approach that matches who should evolve the design and how tightly the shared experiments should stay in sync.

{% hint style="info" %}
**Just want to show someone what an experiment looks like?** Every authenticated user can view experiments and their runs read-only ([see Permissions](../../../install-and-configure/manage-teams-and-users/permissions.md)), so sharing the deep link to an experiment or a run is the simplest solution for knowledge sharing.
The options below are only needed when the receiving team should *do* something with the experiment — run it, schedule it, or evolve the design.
{% endhint %}

## Options

Ordered from simplest (perfect for knowledge sharing) to more involved (easy for large-scaled rollouts):

* Deep link  — Just share the deep-link to any authenticated user. If they are not part of your team, they won't be able to edit or run the experiment. 
* [Duplicate Experiment](duplicate-experiment/README.md) — create a fully editable copy across teams and environments within the same tenant.
* [File Import/Export](file-import-export/README.md) — export to JSON to move experiments across Steadybit platforms or into version control.
* [Share With Teams](share-experiment/README.md) — give another team read-only access to your experiment design and allow them to run it in your team's environment.
* [Experiment Templates](templates/README.md) — provide a starting point that other teams instantiate into their own, independently editable experiment.
* [Service Provided Experiment](service-provided/README.md) — derive read-only experiments from a template via a service profile; design changes propagate automatically to every service that uses the profile.

### Comparison

| ️                                                         | Single Source for Experiment Design | Single shared Run History | Receiving team can edit experiment design | Receiving team can run experiment |
|-----------------------------------------------------------|-------------------------------------|---------------------------|:------------------------------------------|:----------------------------------|
| Deep link                                                 | ✅                                   | ✅                         | ❌                                         | ❌                                 |
| [Duplicate Experiment](duplicate-experiment/README.md)    | ❌                                   | ❌                         | [❌ / ✅️](#user-content-fn-1)[^1]          | [❌ / ✅️](#user-content-fn-1)[^1]  |
| [File Import/Export](file-import-export/README.md)        | ❌                                   | ❌                         | [❌ / ✅️](#user-content-fn-1)[^1]          | [❌ / ✅️](#user-content-fn-1)[^1]  |
| [Share With Teams](share-experiment/README.md)            | ✅                                   | ✅                         | ❌                                         | ✅                                 |
| [Experiment Templates](templates/README.md)               | [☑️](#user-content-fn-2)[^2]        | ❌                         | [✅](#user-content-fn-2)[^2]               | ✅                                 |
| [Service Provided Experiment](service-provided/README.md) | ✅                                   | ❌                         | ❌                                         | ✅                                 |

[^1]: The original experiment is readonly for non-team members and they can't run it. The copy of the experiment is editable and runnable.

[^2]: Experiment templates can be used to create multiple experiments. However, these experiments are detached from the template. Thus, template changes are not propagated to already created experiments - and created experiments can be changed by team members.

### How to Choose

* Just sharing a useful experiment's scenario or run for shared analysis → use deep link
* One-off, fully editable copy in another team or environment within the same tenant → [Duplicate Experiment](duplicate-experiment/README.md)
* Move an experiment across Steadybit platforms, into version control, or to CI/CD → [File Import/Export](file-import-export/README.md)
* Another team should run a specific experiment as-is, with one shared run history → [Share With Teams](share-experiment/README.md)
* Other teams should start from your design and adapt it to their own needs → [Experiment Templates](templates/README.md)
* The same design needs to be tested for different environments/targets, with central control over the design → [Service Provided Experiment](service-provided/README.md)
