Steadybit's capabilities for AWS EC2 work at the level of [physical and virtual hosts](#physical-and-virtual-hosts).

<details>

<summary>EC2 Host Level</summary>

### Network-related Attacks

{% include "./fragment-hosts-network.md" %}

### Resource-related Attacks

{% include "./fragment-hosts-resource.md" %}

## State-related Attacks

{% include "./fragment-hosts-state.md" %}

</details>

On top, it supports attacks based on the AWS EC2 API:

|              | Hibernate | Reboot | Start | Stop | Terminate | 
|--------------|-----------|:-------|:------|:-----|:----------|
| EC2 Instance | ✅         | ✅      | ✅     | ✅    | ✅   |