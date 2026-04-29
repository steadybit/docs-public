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

Ordered from most-coupled (single live experiment) to least-coupled (detached copy):

* [Share Experiment Design](share-experiment/README.md) — give another team read-only access to your experiment; the design, the instance and all runs stay on the owning team's experiment.
* [Service Provided Experiment](service-provided/README.md) — derive read-only experiments from a template via a service profile; design changes propagate automatically to every service that uses the profile.
* [Experiment Templates](templates/README.md) — provide a starting point that other teams instantiate into their own, independently editable experiment.
* [Duplicate Experiment](duplicate-experiment/README.md) — create a fully editable copy across teams and environments within the same tenant.
* [File Import/Export](file-import-export/README.md) — export to JSON to move experiments across Steadybit platforms or into version control.

## Single Source of Truth Comparison

| Single Source of Truth for...➡️                           | Experiment Instance | Experiment Design            | Experiment Runs |
|-----------------------------------------------------------|:--------------------|------------------------------|-----------------|
| [Share Experiment Design](share-experiment/README.md)     | ✅                   | ✅                            | ✅               |
| [Service Provided Experiment](service-provided/README.md) | ❌                   | ✅                            | ❌               |
| [Experiment Templates](templates/README.md)               | ❌                   | [☑️](#user-content-fn-1)[^1] | ✅               |
| [Duplicate Experiment](duplicate-experiment/README.md)    | ❌                   | ❌                            | ❌               |
| [File Import/Export](file-import-export/README.md)        | ❌                   | ❌                            | ❌               |

[^1]: Experiment templates can be instantiated to create individual experiments without individually designing them. However, this experiment design is detached from the template. Thus, template changes are not propagated to individual experiments created from the template.

## How to Choose

* Another team should run a specific experiment as-is, with one shared run history → [Share Experiment Design](share-experiment/README.md)
* The same reliability scenario should apply to many services, with central control over the design → [Service Provided Experiment](service-provided/README.md)
* Other teams should start from your design and adapt it to their own context → [Experiment Templates](templates/README.md)
* One-off, fully editable copy in another team or environment within the same tenant → [Duplicate Experiment](duplicate-experiment/README.md)
* Move an experiment across Steadybit platforms, into version control, or through CI/CD → [File Import/Export](file-import-export/README.md)
