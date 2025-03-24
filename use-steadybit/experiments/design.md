# Design

To start and eventually run a Chaos Engineering experiment, you first need to design it.
That includes defining, e.g., where to run it (environment), what actions to perform (attacks, checks, load tests), and what should be attacked (targets).

## Basic Elements

An experiment generally consists of the following elements:

- **Name**: Giving your experiment a meaningful name makes it easier to find it again.
  You can change it at any time.
- **Team**: Each experiment is associated with a team.
  If you are a member of multiple teams, you can see and change your current team in the left-hand navigation sidebar.
  Once created, you can't change the experiment's team.
- **Environment**: An experiment always runs in one specific environment of your system landscape.
  This environment spans a set of targets you want to address in an experiment, such as containers and JVM applications in a Development stage.
  How the [environments are configured and assigned to your team](../../install-and-configure/manage-environments/) is up to your admin.
- **Variables**: A variable allows you to reference a value in your experiment's configuration to have a single source of truth.
  Steadybit supports different scopes (e.g., experiment variables or environment variables).
  Learn more in the [variables section](/use-steadybit/experiments/variables.md).
- **Hypothesis**: The hypothesis should answer the question of the expected outcome.
  In addition, you can describe the steady state, the turbulent condition, and the expected behavior.
  See this example of a hypothesis: 'When requests to the recommendation service exceed 1000ms, the catalog responds using an empty recommendation list.'
- **Tags**: Besides the hypothesis, tags can be applied to an experiment as useful metadata. Tags are not only listed in the experiments overview, but also you can use them to search for specific experiments. In the experiment list, the top 10 used tags are listed right below the searchbar (where you find the full list of used tags), so you have a quick access.
- **Actions**: Performed when running the experiment, sequentially or in parallel.
  An action can be either
  - an **attack** to inject a fault into your system
  - a **check** to validate your expectation in your system or observability tooling
  - a **load test** to inject load into your system and validate functionality.

The team influences the experiment in the following aspects:

1. **Short Handle:** Each experiment gets a unique key with a team prefix (e.g., `SRE-23`), which is used, e.g., to trigger an experiment via the [API](../../integrate-with-steadybit/api/api.md).
2. **Run/Edit Permissions:** Only team members are allowed to edit or run an experiment.
3. **Environment and Action Permissions:** A team's permission determines which environments (a set of targets or infrastructure components you can attack) and actions are eligible for an experiment.

## Create New Experiment

In general, you have three possibilities to get started:

![Approaches to create an experiment](create-experiment-approaches.png)

- **From scratch**: in case you have already an experiment in mind
- **From template**: benefit from existing templates and apply them easily in a wizard-style to your context
- **Upload** a YAML- or JSON-based file containing an exported experiment

### From Scratch

When creating an experiment from scratch, you land directly into our timeline-based experiment editor.
If your team can access only one environment, it is selected automatically.
Otherwise, you have to define which environment you want to experiment in.
In addition, you can specify the experiment's name and hypothesis at any point you like.

After that, you can add all actions (attacks, checks, and load tests) to your experiment by dragging and dropping.
When you place actions in the same horizontal lane, they will be performed sequentially, putting them below each other results in a parallel run.
Choose actions with the desired effect to perform your overall experiment.

![Create Experiment - Drag'n Drop Editor](create-experiment-blank.png)

Once you've dropped the action or selected it later, you can define its configuration on the right-hand side.
For example, you can specify an attack's target selection and blast radius.

#### Target Selection

![Create Experiment - Target Selection in the Editor](create-experiment-blank-target-selection.png)

You can now select your desired targets of your environment via a target query referencing [discovered attributes](../../concepts/discovery/).
Since these attribute values are always discovered live, some can change from one moment to the next.
So, it is wise to choose stable attributes.
Good examples are labels, namespaces, or symbolic names - whereas a unique identifier of targets (like the container id) is usually a bad idea.
When you run the experiment, these attributes are resolved into a concrete set of targets under attack.
You can preview matching targets using the 'show targets' button next to the query.

#### Limiting Targets via Blast Radius

![Create Experiment - Limiting Targets in the Editor](create-experiment-blank-limit-targets.png)

Furthermore, you can limit your targets randomly to only attack a subset of your target selection and avoid attacking all at once.
You can specify the target limitation as a percentage or a fixed number.

Finally, you can also rename each step to reveal the intention by clicking on the step's label in the sidebar.

![Create Experiment - Rename Steps in the Editor](create-experiment-blank-step-label.png)

Continue with these steps until you've designed your experiment.
A reasonable experiment could easily look like the one below.
Once you have saved it, you are ready to [run it](./#run) to learn how your system behaves.

![Create Experiment - Example in the Editor](create-experiment-blank-example.png)

### From Template

A second option for creating a new experiment is using an existing template.
This approach is best when you want to learn from others' experiences and apply them to your context via a step-by-step wizard.
You can simply browse all available templates or use our search feature to find one using the template's **tags**, **targets** or **actions** used in the experiment, or free text search.

![Create Experiment - Browse and Search Templates](create-experiment-template.png)

Once you've decided to use an experiment template, you are guided step-by-step through applying it to your context.
The first step asks you to select the environment where you eventually want to run your experiment.
If the experiment template references any environment variable, they are also listed.
You only need to specify a value for new environment variables.

![Create Experiment - Use Template: Environment](create-experiment-template-wizard1.png)

The subsequent steps depend on the selected experiment template and will guide you step-by-step to a ready-to-be-executed experiment.
Each step consists of a specific question for a value (i.e., a Kubernetes deployment) to adapt the template's experiment to your context.

![Create Experiment - Use Template: Further Steps](create-experiment-template-wizard2.png)

Eventually, you end up in the experiment editor, where you can adjust the experiment or [run it](./#run) to learn how your system behaves.

![Create Experiment - Use Template: Further Steps](create-experiment-template-wizard3.png)

### Via File Upload

The third option for creating a new experiment is to upload a YAML- or JSON-based experiment file.
Once you've uploaded the file, the experiment is created in the defined team.
Please note that when the experiment file references an explicit team and environment (e.g., `team: "ADM"` or `environment: "Online shop"`), they have to exist.
If you want to be flexible, you can use the variable `{{teamKey}}` to apply it to the current team and `{{environmentName}}` to apply it to the team's first environment.

## Supported Actions

Check out our [Reliability Hub](https://hub.steadybit.com/actions) to learn about actions you can leverage with Steadybit or learn more about the [concept of an action](../../concepts/actions/).
