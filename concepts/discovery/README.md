# Discovery

Steadybit automatically discovers your system and makes them available as potential Chaos Engineering targets.
Each target is associated with attributes you can use to specify the exact set of targets when designing or running a Chaos Engineering experiment.

What kind of targets are discovered (e.g., containers, hosts, Kubernetes deployments, or JVM applications), and what kind of attributes are associated
(e.g., `k8s.cluster-name`, `aws.zone` or `application.name`) depends on the installed extensions.

{% hint style="info" %}
Target discovery is always performed by a Steadybit extension. The discovered metadata is submitted via the Steadybit Agent to the platform.

If you haven't installed any extensions, you aren't seeing any targets and can't make use of Steadybit's Chaos Engineering platform.
{% endhint %}

## Supported Targets

Check out our [Reliability Hub](https://hub.steadybit.com/targets) to learn about which targets are discovered by a Steadybit extension.

## Missing a target? Extend Steadybit!

Are you missing support for a particular technology? No problem, Steadybit is extensible, allowing you to use open- and closed-source extensions to enhance its capabilities. Learn more within our [extension documentation](../../integrate-with-steadybit/extensions/)!
