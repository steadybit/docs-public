# Experiments

An experiment describes a chaos engineering scenario to validate your application's reliability.
You can add attacks, like network latency and pod crashes, to inject turbulent conditions and checks or load tests to validate system's state.
[Experiments are designed](design.md) using the drag'n drop experiment editor or easing creation via [experiment templates](design.md#from-template) or benefitting from [provided experiments in services](../services/README.md#provided-experiments).

Once designed, you can [run the experiment](run.md) directly and see everything in action or use the [scheduler](schedule/), [API](../../integrate-with-steadybit/api/api.md) or [CLI](../../integrate-with-steadybit/cli.md) to run the experiment later on.

- [Design](design.md)
- [Run](run.md)
- [Run History](run-history.md)
- [Schedule](schedule/README.md)
- [Variables](variables.md)
- [Properties](properties/)
- [Emergency Stop](emergencyStop.md)
- [Share](share.md)
- [OpenTelemetry Integration](opentelemetry-integration/)
