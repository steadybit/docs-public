# OpenTelemetry Integration

The Steadybit agent and extensions are instrumented with [OpenTelemetry](https://opentelemetry.io/). Once you point them at your own OTLP endpoint, every experiment run produces distributed traces in your tracing backend, such as Grafana Tempo, Jaeger, Zipkin, or Datadog. Here are some scenarios in which this data helps:

* Your organization is evaluating Steadybit, and you want to understand what is happening during experiments — including the nitty-gritty details.
* You are developing an extension, and something went wrong. You want to know precisely how your extension was called, the parameters, and how it responded.
* You want to correlate experiment runs with your other monitoring and observability data.
* Something went wrong, and you need help from Steadybit's support staff to resolve the situation. Share the run's trace to give them context.

Steadybit does not store traces itself: they go only to the backend you configure.

![Trace encompassing the Steadybit platform and three Steadybit agents in Jaeger](<../../../.gitbook/assets/Screenshot 2023-04-12 at 11.47.53.png>)

## Find a Run's Traces

Every span of an experiment run carries an `experiment.execution.id` attribute holding the run's ID. The **Tracing** tab of the experiment run view shows that ID together with ready-to-copy queries for common backends:

| Backend                 | Query                                        |
|-------------------------|----------------------------------------------|
| Grafana Tempo (TraceQL) | `{ span.experiment.execution.id = "<id>" }`  |
| Jaeger (tag)            | `experiment.execution.id=<id>`               |
| Datadog                 | `@experiment.execution.id:<id>`              |

Tracing backends search a time window rather than all history, so make sure the window covers the run. A matching span belongs to a trace that spans the agent and the extensions it called, so opening any result shows the whole call — including what happened inside the extension.

## Export OpenTelemetry Data

Tracing is off by default. Each component exports on its own, configured through the standard OpenTelemetry environment variables, so enable it for the agent and for every extension whose spans you want to see.

### Agent Configuration

The Steadybit agent uses the [OpenTelemetry SDK auto-configuration module](https://opentelemetry.io/docs/languages/java/configuration/), so all of its configuration parameters are supported. Setting `OTEL_JAVA_GLOBAL_AUTOCONFIGURE_ENABLED=true` switches tracing on. Without it, the agent records nothing but still passes the trace context on to the extensions it calls.

```bash
# switch tracing on
export OTEL_JAVA_GLOBAL_AUTOCONFIGURE_ENABLED="true"
# Name the service. You most likely want to keep it as 'steadybit-agent'
export OTEL_SERVICE_NAME="steadybit-agent"
# Define where to export the data to. The agent defaults to OTLP over gRPC.
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317"
# The Steadybit agent does not expose any metrics through OpenTelemetry.
export OTEL_METRICS_EXPORTER="none"
```

When you install the agent with the `steadybit-agent` Helm chart, pass the same variables through `agent.env`:

```yaml
agent:
  env:
    - name: OTEL_JAVA_GLOBAL_AUTOCONFIGURE_ENABLED
      value: "true"
    - name: OTEL_SERVICE_NAME
      value: "steadybit-agent"
    - name: OTEL_EXPORTER_OTLP_ENDPOINT
      value: "http://otel-collector:4317"
    - name: OTEL_METRICS_EXPORTER
      value: "none"
```

To switch tracing off again, remove `OTEL_JAVA_GLOBAL_AUTOCONFIGURE_ENABLED` or set `OTEL_SDK_DISABLED=true`.

### Extension Configuration

Extensions built on [extension-kit](https://github.com/steadybit/extension-kit) export as soon as an OTLP endpoint is configured. Unlike the agent, they default to OTLP over HTTP, so set `OTEL_EXPORTER_OTLP_PROTOCOL=grpc` when you point them at a gRPC port such as 4317 — otherwise nothing is exported. With the Helm chart, set the variables through each extension's `extraEnv`:

```yaml
extension-host:
  extraEnv:
    - name: OTEL_EXPORTER_OTLP_ENDPOINT
      value: "http://otel-collector:4317"
    - name: OTEL_EXPORTER_OTLP_PROTOCOL
      value: "grpc"
    - name: OTEL_SERVICE_NAME
      value: "extension-host"
```

`OTEL_SDK_DISABLED=true` switches an extension's tracing off even when an endpoint is configured. See the [extension-kit README](https://github.com/steadybit/extension-kit#opentelemetry-tracing) for details.

### On-Prem Platform

An on-prem platform can export its own spans the same way as the agent: set `OTEL_JAVA_GLOBAL_AUTOCONFIGURE_ENABLED=true` and the `OTEL_*` variables on the platform. Its spans then join the agent's and extensions' in the same traces.

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
