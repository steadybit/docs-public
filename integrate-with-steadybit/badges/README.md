# Badges

Get a badge for your experiment to integrate the latest run state, e.g., in wikis, ticketing tools, or wherever else it is valuable for you. You can easily integrate the badge using HTML, Markdown, or just a hosted image.

We support two badges:

* an [experiment badge](./#experiment-badges) that shows the latest run state of a specific experiment
* an [incident badge](./#badges-linked-to-external-references) that either creates an experiment linked to an external reference or shows the latest run as soon as it is created state

## Experiment Badges

You can reference an experiment on any external web page using badges, like this one:

![Example Badge](https://platform.steadybit.com/api/experiments/SHOP-61/badge.svg?tenantKey=demo)

It’s an excellent way to get a link to your experiment and view the status without navigating and logging into the Steadybit platform.

Go to an experiment that interests you, and click on the experiment badge icon on the top right.

![Steadybit Experiment Editor - Create Experiment Badge](experiment-badge-1.png)

You can choose your badge's desirable format and scale and copy the resulting script.

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

## Tag Badges

Experiment badges always link to a single existing experiment. If you want to refer to experiments that have a common purpose, you can instead use tag badges. Example use cases for this are linking to experiments reproducing a past issue from within your post-mortem documentation, indicating whether a specific architecture requirement is fulfilled, or providing visual evidence of the outcome of your latest disaster recovery test. Unlike experiment badges, tag badges can be created even if no experiment with the chosen tag exists, allowing you to use them as a call to action for creating a new experiment. This is how they look like in different states:

<figure><img src="bade-example-create.png" alt="Tag badge when no experiment with the chosen tag exists" width="400"><figcaption><p>Tag badge when no experiment with the chosen tag exists</p></figcaption></figure>

<figure><img src="badge-example-1.png" alt="Tag badge when a single experiment with the chosen tag exists" width="240"><figcaption><p>Tag badge when a single experiment with the chosen tag exists</p></figcaption></figure>

<figure><img src="badge-example-2.png" alt="Tag badge when multiple experiments with the chosen tag exist" width="200"><figcaption><p>Tag badge when multiple experiments with the chosen tag exist</p></figcaption></figure>

To create a tag badge, navigate to the Steadybit dashboard and click on 'Create a Badge'.

![Steadybit Dashboard - Create a Badge](tag-badge-1.png)

You then either choose an existing tag or create a new one. That tag will be automatically added to any experiment created via the badge and used to identify experiments that should be associated with it.

You can then configure the desired format and scale for your badge and provide the text that will be shown when no experiment with the chosen tag exists.

![Steadybit Dashboard - Create a Tag Badge](tag-badge-2.png)

Alternatively, below are some examples that you can copy and adjust to create your tag badge manually:

### Markdown

{% code title="example.md" %}
```markdown
Template:
[![{{external-reference}}](https://platform.steadybit.com/api/badges/linked-badge.svg?tenantKey=demo&tag={{tag}})](https://platform.steadybit.com/api/badges/link?tenantKey=demo&tag={{tag}})

Example:
[![INCIDENT-100](https://platform.steadybit.com/api/badges/linked-badge.svg?tenantKey=demo&tag=INCIDENT-100&createCaption=Create%20experiment%20for%20incident%20100)](https://platform.steadybit.com/api/badges/link?tenantKey=demo&tag=INCIDENT-100)
```
{% endcode %}

### HTML

{% code title="example.html" %}
```html
Template: 
<a href='https://platform.steadybit.com/api/badges/link?tenantKey=demo&tag={{tag}}' target='_blank'><img alt="{{external-reference}}" src='https://platform.steadybit.com/api/badges/linked-badge.svg?tenantKey=demo&tag={{tag}}'></a>

Example
<a href='https://platform.steadybit.com/api/badges/link?tenantKey=demo&tag=INCIDENT-100' target='_blank'><img alt="INCIDENT-100" src='https://platform.steadybit.com/api/badges/linked-badge.svg?tenantKey=demo&tag=INCIDENT-100&createCaption=Create%20experiment%20for%20incident%20100'></a>
```
{% endcode %}
