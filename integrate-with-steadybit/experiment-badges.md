# Experiment Badges

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
