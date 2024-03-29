# Design

To get you started with an experiment you first need to design it. That means, defining e.g. where to execute it (environment, targets) and what should be done (attack, actions, checks).

In general, you have three possibilities to get started:

![Approaches to create an experiment](create-experiment-approaches.png)

* **Wizard (guided creation)**: to create your first experiment in a simple and lightweight way
* **Blank**: in case you exactly know what to design and just need to get it done
* **Templates**: benefit from existing recipes and only apply them to your setup

Before going into each approach, let's cover the basic elements of an experiment.

### Basic Elements

An experiment generally consists of the following elements:

* **Name**: Giving your experiment a meaningful name makes it easier to find it again, it can be changed at any time.
*   **Team**: Each experiment is associated with a team. In case you are member in more than one team you can change it at experiment creation time. After creation, it can not be changed.

    The team influences the experiment in the following aspects:

    1. **Short Handle:** Each experiment gets a unique key with team prefix (e.g. `SRE-23`) which can be used e.g. to trigger an experiment via the [API](../../integrate-with-steadybit/api.md).
    2. **Run/Edit Permissions:** Only members of the associated team are permitted to edit or execute the experiment.
    3. **Attack/Target Permissions:** The team settings determine which attacks and/or targets are eligible for the experiment.
* **Hypothesis**: The hypothesis should answer the question of the expected outcome. In addition, you can describe the steady state, the turbulent condition and the expected behaviour. See this example of a hypothesis: _"When requests for the recommendation service exceeds 1000ms the catalog responds within 1000ms using an empty recommendation list."_
* **Environment**: An experiment is always executed in one specific environment of your system landscape. This environment spans a set of targets which you want to address in an experiment. For instance a set of containers and JVM applications of a Development environment. How the [environments are configured and assigned to your team](../../install-and-configure/manage-environments/) is up to your admin.

### Design Experiment via Wizard

The wizard guides you step by step through the creation of the experiment. It consists of the following four steps:

1. **Define Experiment** First things first: Define the basic elements of the experiments like name, hypothesis and environment (see above).

![Create Experiment - Step 1: Define](<../../quick-start/run-experiment-step2 (2).png>)

1. **Select Attack** Now you are ready to choose a suitable attack from one of the available catgories to match your hypothesis. Choose the attack with the desired effect. If needed, you are able to provide additional settings for the attack. However, the defaults are usual a good way to go. To learn more about attacks, check out our [learn-attacks-section in the docs](../../concepts/actions/).

![Create Experiment - Step 2: Attack](<../../quick-start/run-experiment-step3 (2).png>)

1. **Select Target** You can now select your desired targets by attributes where you can use the [discovery data](../../concepts/discovery/) to specify them with a dynamically evaluated query. Since these attributes are discovered by the agents and can change from one moment to the next, it is wise to choose stable attributes. Good examples are labels, namespaces or symbolic names - whereas a unique identifier of targets (like the container id) are usually a bad idea. When the experiment is due to be executed those attributes are resolved into a concrete set of targets to be attacked. You can use the "show targets" button next to the query to evaluate it's effect and preview matching targets.

![Create Experiment - Step 3: Targets](<../../quick-start/run-experiment-step4 (2).png>)

1. **Impact and Attack Radius** You can limit your impact by defining an attack radius. It is a best practices to start easy and not by attacking your entire target selection. Therefore, specify the attack radius as a percentage or fixed number - limiting the amount of maximum affected e.g. hosts or containers. Even so, 100% is a valid value - but you need to be explicit about that.

![Create Experiment - Step 4: Impact Radius](<../../quick-start/run-experiment-step5 (3).png>)

After saving the experiment you are ready to [run it directly](./#run) or extend it using our editor (see blank experiment).

### Design Blank Experiment

When choosing to start by a blank experiment, you land directly into our experiment editor. In case your team has only access to one environment, it is automatically chosen. Otherwise you have to define in which environment you want to experiment. In addition, you can define the remaining basic elements (name and hypothesis) at any point you like.

After that, you can add attacks, actions, checks and load tests to your experiment by using drag'n drop.

![Create Experiment - Editor](create-experiment-blank.png)

As soon as the element is placed you can configure it on the right hand side. Specifying e.g. for an attack the target and attack radius (see previous section).

![Create Experiment - Editor](create-experiment-blank2.png)

### Design Experiment using Templates

The last option to define an experiment is using an existing template. This way, you only need to specify the targets but don't need to specify the sequence of the attacks.

![Create Experiment - Template](create-experiment-template.png)

Just click on each element to define e.g. for an attack the target and attack radius on the right hand side (see previous section).

### Additional Elements

If you want to learn more about elements which can be added to the experiment, check out [action documentation](../../concepts/actions/).
