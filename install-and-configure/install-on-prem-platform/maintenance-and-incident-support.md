# Maintenance & Incident Support

{% hint style="info" %}
This part of the documentation is only intended in the context of a supported PoC (Proof of Concept) together with the Steadybit team.
Please, [book an appointment](https://www.steadybit.com/book-demo) to scope your PoC before continuing to evaluate the on-prem solution.

If you just want to try out Steadybit, we recommend you [sign up for our SaaS platform](https://signup.steadybit.com).
{% endhint %}

During the operation of the on-premise Steadybit platform, you may run into situations that require users to be informed about incidents and planned maintenance that will affect on-premise Steadybit users. To inform these users, you can tell the Steadybit platform about incidents and maintenance windows. Once done, the platform can

- show banners in the user interface indicating the specific situation,
- require explicit confirmation when executing experiments via the user interface and
- optionally disable experiment runs entirely during an ongoing incident.

This feature is available in versions > 1.0.2 of the Steadybit platform.

## Learning about Platform Activity

You can use the following metrics to learn whether maintenance on the Steadybit platform would be affecting any users:

- `platform.experiments.executing` is exposed by the Steadybit platform as a Prometheus metric. It represents the number of currently executing experiments.&#x20;

## Admin API Endpoints

The maintenance and incident API endpoints are only reachable through the admin port `9090` on the platform Kubernetes deployment workload. This port is not exposed to users by default, and you should only use it for administrative purposes. API endpoints on port `9090` do not require authentication.

One option to reach this port from your local machine is a port forward, as the following snippet shows:

```
kubectl port-forward -n steadybit-platform deployment/steadybit-platform 9090
```

### Maintenance

To configure a maintenance window, you can use the API endpoints under path `/actuator/systemstatusmaintenance`. You can retrieve the maintenance configuration via HTTP `GET` or clear it via HTTP `DELETE`. The following example shows how you could leverage HTTP `POST` to configure a maintenance window.

```
curl -X POST \
  -H "Content-Type: application/json" \
  http://localhost:9090/actuator/systemstatusmaintenance -d '
{
  "title": "Planned maintenance",
  "statusPage": "https://status.example.com",
  "start": "2022-05-31T00:00:00Z",
  "end": "2022-06-01T00:00:00Z"
}
'
```

<figure><img src="../../.gitbook/assets/maintenance-planned.png" alt="System banner appearing at the top of the Steadybit UI presenting the information provided through the maintenance API"><figcaption><p>A banner appears at the top of the Steadybit UI when a maintenance is defined.</p></figcaption></figure>

### Incidents

You can use incidents to inform users of service disruption. In contrast to scheduled maintenance, an incident is never scheduled and has varying severity. To configure an incident, you can use the API endpoints under path `/actuator/systemstatusincident`. You can retrieve the incident configuration via HTTP `GET` or clear it via HTTP `DELETE`. The following example shows how you could leverage HTTP `POST` to configure an incident.

```
curl -X POST \
  -H "Content-Type: application/json" \
  http://localhost:9090/actuator/systemstatusincident -d '
{
  "title": "Platform Overloaded",
  "statusPage": "https://status.example.com",
  "allowExperimentExecution": true,
  "severity": "DEGRADED_PERFORMANCE"
}
'
```

<figure><img src="../../.gitbook/assets/incident.png" alt="System banner appearing at the top of the Steadybit UI presenting the information provided through the incident API"><figcaption><p>A banner appears at the top of the Steadybit UI when an incident is defined.</p></figcaption></figure>

The following severities are supported by the API. The user interface will adapt its banner style according to the chosen incident severity.

- `UNDER_MAINTENANCE`
- `DEGRADED_PERFORMANCE`
- `PARTIAL_OUTAGE`
- `MAJOR_OUTAGE`
