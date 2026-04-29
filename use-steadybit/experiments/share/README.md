## Share

To share your experiments, you have various options available:

* [Share Experiment](share-experiment/README.md) - allowing another team to run your experiment in your environment
* [Service Provided Experiment](service-provided/README.md) - to share an experiment template readonly
* [Experiment Templates](templates/README.md) - to share the experiment design and have placeholders that are filled out individually
* [Duplicate Experiment](duplicate-experiment/README.md) - even across teams and environments
* [File Import/Export](file-import-export/README.md) - to share experiments with other on-prem platform instances


| Single Source of Truth for...➡️                           | Experiment Instance | Experiment Design            | Experiment Runs |
|-----------------------------------------------------------|:--------------------|------------------------------|-----------------|
| [Share Experiment Design](share-experiment/README.md)     | ✅                   | ✅                            | ✅               |
| [Service Provided Experiment](service-provided/README.md) | ❌                   | ✅                            | ❌               |
| [Experiment Templates](templates/README.md)               | ❌                   | [☑️](#user-content-fn-1)[^1] | ✅               |
| [Duplicate Experiment](duplicate-experiment/README.md)    | ❌                   | ❌                            | ❌               |
| [File Import/Export](file-import-export/README.md)        | ❌                   | ❌                            | ❌               |

[^1]: Experiment templates can be instantiated to create individual experiments without individually designing them. However, this experiment design is detached from the template. Thus, template changes are not propagated to individual experiments created from the template. 