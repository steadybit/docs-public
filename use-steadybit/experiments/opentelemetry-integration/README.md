# OpenTelemetry Integration

For every experiment run, the Steadybit platform, the agents and the extensions emit distributed tracing spans using [OpenTelemetry](https://opentelemetry.io/). Access to this data benefits users, extension authors and Steadybit maintainers alike. Here are some scenarios as part of which you might access this data:

* Your organization is interested in Steadybit, and you are in the process of building trust in the solution. As part of this, you want to understand what is happening as part of experiments – including the nitty-gritty details.
* You are developing an extension, and something went wrong. You want to know precisely how your extension was called, the parameters, and how it responded.
* An action timed out and you want to see where the time went – the agent's call, the extension's handling of it, or the target itself.
* You want to correlate experiment runs with other monitoring and observability data, e.g., in your Jaeger or Grafana Tempo installations.

Spans are exported to the OTLP endpoint you configure, so an experiment run's traces arrive in your own observability stack alongside the rest of your telemetry. The sections below explain how to configure the agent and the extensions, and how to find a particular run's traces afterwards.

![Trace encompassing the Steadybit platform and three Steadybit agents in Jaeger](<../../../.gitbook/assets/Screenshot 2023-04-12 at 11.47.53.png>)

## Finding the Traces for an Experiment Run

Every span the platform, the agent and the extensions record for a run carries the run's identifier as an `experiment.execution.id` attribute. Search your tracing backend for it to pull up everything that happened during that run:

| Backend       | Query                                         |
|---------------|-----------------------------------------------|
| Grafana Tempo | `{ span.experiment.execution.id = "138004" }` |
| Jaeger        | tag `experiment.execution.id=138004`          |
| Datadog       | `@experiment.execution.id:138004`             |

The experiment run view shows the identifier and these queries for the run you are looking at.

A matching span belongs to a trace that spans the platform, the agent and the extension it called, so opening any result shows the whole call – including what happened inside the extension.

{% hint style="info" %}
Tracing backends search a time window rather than all of history. Set the window to cover the run: a default of "last 1 hour" will silently find nothing for an older run, which looks the same as the traces being missing.
{% endhint %}

## Exporting OpenTelemetry Data

Both the Steadybit agent and the extensions export distributed tracing data to OpenTelemetry-compatible systems. Each is configured separately, and each stays inactive until you give it an endpoint.

This section explains how to configure them. To validate the configuration, it also contains optional guidance on how to set up a local Jaeger instance, a local Zipkin instance and an OpenTelemetry collector.

### Agent Configuration

The Steadybit agent internally leverages the OpenTelemetry SDK auto-configuration module. Consequently, all of the [module's configuration parameters](https://github.com/open-telemetry/opentelemetry-java/blob/v1.24.0/sdk-extensions/autoconfigure/README.md#sampler) are supported. This section only shows the most basic configuration to achieve data export.

The configuration parameters are set through environment variables, as the following `shell` snippet shows. You may also pass these environment variables when deploying the agent through any other mechanism, e.g., Helm charts.

```bash
# enable the auto-configuration mechanism
export JAVA_OPTS="-Dotel.java.global-autoconfigure.enabled=true"
# Name the service. You most likely want to keep it as 'steadybit-agent'
export OTEL_SERVICE_NAME="steadybit-agent"
# Define where to export the data to.
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317"
# The Steadybit agent does not currently expose any metrics through OpenTelemetry.
export OTEL_METRICS_EXPORTER="none"
```

### Extension Configuration

Extensions built on `extension-kit` v1.12.1 or later export spans for every request they serve, so you can see what an action did inside the extension rather than only the agent's side of the call. Incoming trace context is honoured, so an extension's spans join the agent's trace.

Extensions are configured through the standard `OTEL_*` environment variables:

| Variable                      | Meaning                                                        | Default |
|-------------------------------|----------------------------------------------------------------|---------|
| `OTEL_EXPORTER_OTLP_ENDPOINT` | Where to export to. **Tracing stays off while this is unset.** |         |
| `OTEL_EXPORTER_OTLP_PROTOCOL` | `grpc` or `http/protobuf`                                      | `grpc`  |
| `OTEL_SERVICE_NAME`           | Service name on the exported spans                             |         |
| `OTEL_SDK_DISABLED`           | `true` turns tracing off even with an endpoint configured      | `false` |

Sampling and batching use the standard SDK variables (`OTEL_TRACES_SAMPLER`, `OTEL_BSP_*`).

{% hint style="warning" %}
**Match the protocol to the port.** The default is `grpc`, which means port **4317** — the same as the agent. If you export to an OTLP/HTTP collector on **4318**, set `OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf` as well, otherwise the extension talks gRPC to an HTTP port and no spans arrive.
{% endhint %}

With the official Helm charts, set these through the `otel` values instead. A `global.otel` block configures every extension in the release at once:

```yaml
global:
  otel:
    endpoint: "http://otel-collector.observability:4317"
    protocol: "grpc"
```

Per-extension values override the global ones:

```yaml
otel:
  endpoint: "http://otel-collector.observability:4317"
  protocol: "grpc"
  serviceName: "steadybit-extension-http"
```

If an extension configures the OpenTelemetry SDK itself rather than through `extotel`, it must also call `exthttp.SetTracingEnabled(true)` or its handlers will not be traced.

### Sample Jaeger and OpenTelemetry Collector Setup

The following sections explain how to spin up a local Jaeger instance, a Zipkin instance and an OpenTelemetry collector. These steps are optional for a successful configuration of the export mechanism. We list these here for your convenience if you want to check the setup locally.

#### OpenTelemetry Collector Configuration

We start with a configuration for an OpenTelemetry collector. The collector will accept the telemetry data from Steadybit agents, batch it and then forward it to both Jaeger and Zipkin.

Store this in a file called `otel-config.yml` within your current working directory.

```yaml
receivers:
  otlp:
    protocols:
      grpc:
      http:

processors:
  batch:

exporters:
  otlp:
    endpoint: jaeger-service:4317
    tls:
      insecure: true
  zipkin:
    endpoint: http://zipkin-service:9411/api/v2/spans
    tls:
      insecure: true

service:
  pipelines:
    traces:
      receivers: [ otlp ]
      processors: [ batch ]
      exporters: [ otlp, zipkin ]
```

#### Docker Compose Configuration

Next, we start all the systems locally using [Docker Compose](https://docs.docker.com/compose/). Note the comments about UI endpoints within the snippet.

Store this in a file called `docker-compose.yml` within your current working directory. Then run `docker compose up` to start everything.

Once the startup completes, you can use the following URLs to interact with the systems:

* Jaeger UI: http://localhost:16686/
* Zipkin UI: http://127.0.0.1:9411/
* OpenTelemetry collector OTLP gRPC endpoint: http://127.0.0.1:4317

```yaml
services:
  zipkin-service:
    image: openzipkin/zipkin:latest
    ports:
      # UI and ingestion endpoint
      - "9411:9411"

  jaeger-service:
    image: jaegertracing/all-in-one:latest
    ports:
      # UI endpoint
      - "16686:16686"
      # OTLP gRPC endpoint
      - "4317"
      # OTLP HTTP endpoint
      - "4318:4318"
    environment:
      - COLLECTOR_OTLP_ENABLED=true

  collector:
    image: otel/opentelemetry-collector:latest
    command: [ "--config=/etc/otel-collector-config.yml" ]
    volumes:
      - ./otel-config.yml:/etc/otel-collector-config.yml
    ports:
      # OTLP gRPC endpoint the agent will be interacting with
      - "4317:4317"
    depends_on:
      - jaeger-service
      - zipkin-service
```
