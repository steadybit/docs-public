---
title: Landscape
---

# Landscape

One key aspect when doing Chaos Engineering is to have visibility into the system. Knowing the system's architecture, understand dependencies and identify effects of your experiments is crucial.

> Landscape is currently limited to Kubernetes Cluster and Kubernetes Deployments. Dependencies are discovered when you use your system and only support TCP-based connections to other Kubernetes Deployments. Future Extension is part of our roadmap.

### Explore the Landscape

When viewing the landscape you see by default the `Global`-environment (if allowed by your team). This way, you see your entire Kubernetes cluster. In case you have multiple clusters, you can choose the right one by the additional dropdown below.

![Landscape in Global-Envirnoment](../use/20-img-landscape/global.png)

However, it is usually very crowded in the `Global`-environment. So, we strongly recommend you to divide your system by creating [environments](../install-configure/50-set-up-environments/).

### Drill Down

After choosing your [environment](../install-configure/50-set-up-environments/) in the top left dropdown you have higher focus on the right system parts. You can further zoom into your system using e.g. your mouse scroll wheel and select a namespace (e.g. `steadybit-demo`). This way, you get a list of all Kubernetes deployments in that namespace as well as the discovered connections of your deployments. ![Landscape Namespace](../use/20-img-landscape/shop.png)

> ### Call for Feedback
>
> Landscape and Resilience Score are two new features which we would like to get your opinion on. Feel free to [reach out to us](https://www.steadybit.com/contact) and share your experience.
