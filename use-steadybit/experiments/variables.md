# Variables

Steadybit supports using variables in an experiment, so you only need to define specific values once and benefit from a single source of truth. Variables are helpful if multiple steps refer to the same configuration (e.g., in a query to define the target or the HTTP endpoint URL), see the example below, or when having multiple experiments using common infrastructure names in the experiment's definition (e.g., Kubernetes cluster name).

![Variables in an experiment](../../.gitbook/assets/variable-experiment.png)

## Syntax

A variable is referenced via double curly brackets, like this: `{{variable}}`. The variable is resolved within an experiment using different scopes, moving from inner to outer scope (see below).

If you want to use a literal string `{{..}}` in your experiment design, you can escape it by using a single backslash like `\{{..}}`.

## Scopes

A variable in an experiment design / run supports different scopes to be resolved:

| Order     | Scope       | Time of resolving variable                   |
| --------- | ----------- | -------------------------------------------- |
| outermost | Environment | When designing and/or running the experiment |
| ...       | Experiment  | When designing and/or running the experiment |
| innermost | Run         | Only when running the experiment             |

### Environment

Some values are associated with an experiment's environment and change whenever you use another environment in an experiment. Also, once you change the variable's value, all experiments using the same environment will also use the new value. Environment-scoped variables are the perfect place to name, e.g., common infrastructure components. You can edit environment-scoped variables in settings -> environments. Admins can edit all environment variables, users only variables of environments their team can access.

![Variables scoped to an environment](../../.gitbook/assets/variable-environment.png)

### Experiment

The next scope in an experiment design is the 'experiment' scope of a variable. An experiment-scoped variable is only accessible from within the current experiment, and changing the variable's value only affects the current experiment. If you have two different experiments, they can each use the same variable name but assign different values without affecting each other, as they refer to different variable definitions.

An experiment-scoped variable can shadow variables in an outer-scope (i.e., environment variable). If that is the case, the experiment uses the value of the experiment variable instead of the environment variable. Steadybit indicates shadowing as shown below, where the value for the `k8sClusterName` variable is defined as `docs-demo` for this specific experiment and `demo` for all other experiments using the environment `Global`. The variable doesn't exist for experiments that aren't using the environment `Global`.

![Variable shadowing in an experiment an environment-scoped variable](../../.gitbook/assets/variable-experiment-shadow.png)

### Run

For single experiment runs you can override used variables. Doing so, will apply different values, which can be defined by the user. The overrides are just applied of a single run. To do so, access the modal through the `Run Experiment` button in the editor.

![How to access experiment overrides](../../.gitbook/assets/experiment-run-with-overrides.png)

Doing so will open a modal where you can specify new values for each used variable. Experiment variable overrides will only be applied for this specific run. After the run was triggered, overrides are gone and environment/experiment variable values are applied again.

![Defining experiment variable overrides](../../.gitbook/assets/experiment-run-with-overrides-modal.png)

Alternatively, you can define different overrides for different experiment schedules, see [experiment schedules](schedule/)

## Resolved Variables in Experiment Run

In case you want to check which variables have been used for a single experiment run, you can check this in experiment rus view by clicking `See used variables` on the top section. The icon on the variable key will tell you about the scope of the used variable (environment, experiment or override).

![Defining experiment variable overrides](../../.gitbook/assets/experiment-run-overrides.png)
