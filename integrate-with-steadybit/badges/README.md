# Badges
Get a badge for your experiment to integrate the latest run state, e.g., in wikis, ticketing tools, or wherever else it is valuable for you. You can easily integrate the badge using HTML, Markdown, or just a hosted image.

We support two badges:

- an [experiment badge](#experiment-badges) that shows the latest run state of a specific experiment
- an [incident badge](#badges-linked-to-external-references) that either creates an experiment linked to an external reference or shows the latest run as soon as it is created state

## Experiment Badges

You can reference an experiment on any external web page using badges, like this one:

![Example Badge](https://platform.steadybit.com/api/experiments/SHOP-61/badge.svg?tenantKey=demo)

It’s an excellent way to get a link to your experiment and view the status without navigating and logging into the Steadybit platform.\

Simply go to an experiment that is of interest for you, and click on the experiment badge icon on the top right.
![Steadybit Experiment Editor - Create Experiment Badge](experiment-badge-1.png)

You can choose the desirable format and scale of your badge and simply copy the resulting script.

![Steadybit Experiment Editor - Configure Experiment Badge](experiment-badge-2.png)

Alternatively, below are examples to copy and adjust to create your badge manually

### Example Markdown

{% code title="example.md" %}
```markdown
Template:
[![{{expermiment-key}}](https://platform.steadybit.com/api/experiments/{{experiment-key}}/badge.svg?tenantKey={{tenant-key}})](https://platform.steadybit.com/experiments/{{team-key}}/edit/{{experiment-key}}/executions/?tenant={{tenant-key}}~)

Example:
[![SHOP-61](https://platform.steadybit.com/api/experiments/SHOP-61/badge.svg?tenantKey=demo)](https://platform.steadybit.com/experiments/SHOP/edit/SHOP-61/executions/?tenant=demo~)
```
{% endcode %}

### Example HTML

{% code title="example.html" %}
```html
Template: 
<a href="https://platform.steadybit.com/experiments/{{team-key}}/edit/{{experiment-key}}/executions/?tenant={{tenant-key}}~" rel="nofollow"><img alt="{{experiment-key}}" src="https://platform.steadybit.com/api/experiments/{{experiment-key}}/badge.svg?tenantKey={{tenant-key}}" style="max-width: 100%;"></a>

Example
<a href="https://platform.steadybit.com/experiments/SHOP/edit/SHOP-61/executions/?tenant=demo~" rel="nofollow"><img alt="SHOP-61" src="https://platform.steadybit.com/api/experiments/SHOP-61/badge.svg?tenantKey=demo" style="max-width: 100%;"></a>
```
{% endcode %}

## Badges linked to external references

Experiment Badges always links to an existing experiment.
But what if you like to have some kind of external reference?
Let's say you have an "INCIDENT-100", you are writing a documentation about it and want to add one or more experiment badges to it.
Maybe even before you've actually created.
This is where the second kind of badges comes into play.

![Example Badge before a experiment is created](https://platform.dev.steadybit.com/api/badges/linked-badge.svg?tenantKey=demo\&externalReference=INCIDENT-100\&createCaption=Create%20experiment%20for%20incident%20100)

![Example Badge after a experiment is created](https://platform.dev.steadybit.com/api/badges/linked-badge.svg?tenantKey=demo\&externalReference=BADGE-TEST-2\&createCaption=Create%20experiment%20for%20incident%20100)

![Example Badge after multiple experiments are linked to the external reference](https://platform.dev.steadybit.com/api/badges/linked-badge.svg?tenantKey=demo\&externalReference=BADGE-TEST-3\&createCaption=Create%20experiment%20for%20incident%20100)

You can simply create the incident badge at the Steadybit dashboard by clicking 'Create Incident Badge'.

![Steadybit Dashboard - Create Incident Badge](incident-badge-1.png)

Next you need to specify your external unique identifier (e.g. `INCIDENT-100`) and can choose the desirable format and scale of your badge.


![Steadybit Dashboard - Create Incident Badge](incident-badge-2.png)

Alternatively, below are examples to copy and adjust to create your badge manually

### Markdown

{% code title="example.md" %}
```markdown
Template:
[![{{external-reference}}](https://platform.steadybit.com/api/badges/linked-badge.svg?tenantKey=demo&externalReference={{external-reference}})](https://platform.steadybit.com/api/badges/link?tenantKey=demo&externalReference={{external-reference}})

Example:
[![INCIDENT-100](https://platform.steadybit.com/api/badges/linked-badge.svg?tenantKey=demo&externalReference=INCIDENT-100&createCaption=Create%20experiment%20for%20incident%20100)](https://platform.steadybit.com/api/badges/link?tenantKey=demo&externalReference=INCIDENT-100)
```
{% endcode %}

### HTML

{% code title="example.html" %}
```html
Template: 
<a href='https://platform.steadybit.com/api/badges/link?tenantKey=demo&externalReference={{external-reference}}' target='_blank'><img alt="{{external-reference}}" src='https://platform.steadybit.com/api/badges/linked-badge.svg?tenantKey=demo&externalReference={{external-reference}}'></a>

Example
<a href='https://platform.steadybit.com/api/badges/link?tenantKey=demo&externalReference=INCIDENT-100' target='_blank'><img alt="INCIDENT-100" src='https://platform.steadybit.com/api/badges/linked-badge.svg?tenantKey=demo&externalReference=INCIDENT-100&createCaption=Create%20experiment%20for%20incident%20100'></a>
```
{% endcode %}
