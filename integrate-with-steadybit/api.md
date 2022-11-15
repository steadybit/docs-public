# API

The steadybit Web API allows interfacing with the platform to create, start, stop experiments, etc.

#### Tokens

In order to use the API you need to create an API access token via the user interface. API access tokens are managed by the admin and team owners and is bound to a single team.

API token management can be found in Access Control → API Access Tokens.

#### OpenApi Specification

We provide a [OpenApi 3.0 Specification for the API](https://platform.steadybit.io/api/spec) as well as an [interactive documentation](https://platform.steadybit.io/api/swagger). In case you are using our on-prem variant you can access it at `http://<your-installation-url>/api/spec`.

#### Example: Create Experiment

This is how you can create an experiment (json is supported as well):

```bash
curl \
  -i \
  -H 'Content-Type: application/x-yaml' \
  -H 'Authorization: accessToken XXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' \
  https://platform.steadybit.io/api/experiments \
  --data '
---
name: Experiment API Test
team: ADM
environment: Global
lanes:
  - steps:
      - !<action>
        actionType: check:http
        parameters:
          method: "GET"
          url: "https://example.com"
          headers: []
          successRate: 100
          maxConcurrent: 5
          requestsPerSecond: 1
          duration: "10s"
          followRedirects: false
          readTimeout: "5s"
          connectTimeout: "5s"
          statusCode: "200-299"
'
```

The `Location` header of the response indicates the url of the newly created experiment:

```
location: https://platform.steadybit.io/api/experiments/ADM-
```

#### Example: Run Experiment

You can then run the experiment:

```bash
curl \
  -i \
  -X POST \
  -H 'Authorization: accessToken XXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' \
  https://platform.steadybit.io/api/experiments/ADM-1/execute
```
