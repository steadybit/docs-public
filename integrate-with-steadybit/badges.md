# Badges

## Experiment Badges

You can reference an experiment on any external web page using badges. It’s an excellent way to get a link to your experiment and view the status without navigating and logging into the steadybit platform.\


![Example Badge](https://platform.steadybit.io/api/experiments/SHOP-61/badge.svg?tenantKey=demo)

{% code title="example.md" %}
```markdown
Template:
[![{{expermiment-key}}](https://platform.steadybit.io/api/experiments/{{experiment-key}}/badge.svg?tenantKey={{tenant-key}})](https://platform.steadybit.io/experiments/{{team-key}}/edit/{{experiment-key}}/executions/?tenant={{tenant-key}}~)

Example:
[![SHOP-61](https://platform.steadybit.io/api/experiments/SHOP-61/badge.svg?tenantKey=demo)](https://platform.steadybit.io/experiments/SHOP/edit/SHOP-61/executions/?tenant=demo~)

```
{% endcode %}

{% code title="example.html" %}
```html
Template: 
<a href="https://platform.steadybit.io/experiments/{{team-key}}/edit/{{experiment-key}}/executions/?tenant={{tenant-key}}~" rel="nofollow"><img alt="{{experiment-key}}" src="https://platform.steadybit.io/api/experiments/{{experiment-key}}/badge.svg?tenantKey={{tenant-key}}" style="max-width: 100%;"></a>

Example
<a href="https://platform.steadybit.io/experiments/SHOP/edit/SHOP-61/executions/?tenant=demo~" rel="nofollow"><img alt="SHOP-61" src="https://platform.steadybit.io/api/experiments/SHOP-61/badge.svg?tenantKey=demo" style="max-width: 100%;"></a>

```
{% endcode %}


## Badges linked to external references

Experiment Badges always links to an existing experiment. But what if you like to have some kind of external reference? Let's say you have an "INCIDENT-100",
you are writing a documentation about it and want to add one or more experiment badges to it. Maybe even before you've actually created. This is where the
second kind of badges comes into play.

![Example Badge before a experiment is created](https://platform.dev.steadybit.io/api/badges/linked-badge.svg?tenantKey=demo&externalReference=INCIDENT-100&createCaption=Create%20experiment%20for%20incident%20100)

![Example Badge after a experiment is created](https://platform.dev.steadybit.io/api/badges/linked-badge.svg?tenantKey=demo&externalReference=BADGE-TEST-2&createCaption=Create%20experiment%20for%20incident%20100)

![Example Badge after multiple experiments are linked to the external reference](https://platform.dev.steadybit.io/api/badges/linked-badge.svg?tenantKey=demo&externalReference=BADGE-TEST-3&createCaption=Create%20experiment%20for%20incident%20100)

{% code title="example.md" %}
```markdown
Template:
[![{{external-reference}}](https://platform.steadybit.io/api/badges/linked-badge.svg?tenantKey=demo&externalReference={{external-reference}})](https://platform.steadybit.io/api/badges/link?tenantKey=demo&externalReference={{external-reference}})

Example:
[![INCIDENT-100](https://platform.steadybit.io/api/badges/linked-badge.svg?tenantKey=demo&externalReference=INCIDENT-100&createCaption=Create%20experiment%20for%20incident%20100)](https://platform.steadybit.io/api/badges/link?tenantKey=demo&externalReference=INCIDENT-100)

```
{% endcode %}

{% code title="example.html" %}
```html
Template: 
<a href='https://platform.steadybit.io/api/badges/link?tenantKey=demo&externalReference={{external-reference}}' target='_blank'><img alt="{{external-reference}}" src='https://platform.steadybit.io/api/badges/linked-badge.svg?tenantKey=demo&externalReference={{external-reference}}'></a>

Example
<a href='https://platform.steadybit.io/api/badges/link?tenantKey=demo&externalReference=INCIDENT-100' target='_blank'><img alt="INCIDENT-100" src='https://platform.steadybit.io/api/badges/linked-badge.svg?tenantKey=demo&externalReference=INCIDENT-100&createCaption=Create%20experiment%20for%20incident%20100'></a>

```
{% endcode %}