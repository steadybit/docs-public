---
title: "Release Notes - Agent"
navTitle: "Agent"
metaTitle: "Release Notes Agent - steadybit Docs"
---

## 2020-08-19 (0.1.3)

> **First steadybit release**
>
> Update
>
> Just grab the new setup instructions from the [platforms agent setup page](https://platform.steadybit.io/settings/agentsetup)
>
> OR
>
> 1. Switch to the `docker.steadybit.io/steadybit/agent` docker image.
> 2. If you're deploying on kubernetes you need to update the `dockerconfigjson` secret with the registry authentication.
> 3. Change all `CHAOSMESH_*` environment variables to `STEADYBIT_*`.
> 4. If you are using our SaaS platform set `STEADYBIT_AGENT_REGISTER_URL=https://platform.steadybit.io`


## 2020-08-13 (0.0.40)
#### Bugfixes:
 * Fix typo in _JAVA_OPTIONS
 * Use growing threadpool for discovery, to reduce timeouts caused by queuing

## 2020-08-07 (0.0.38)
#### Bugfixes:
 * ignore _JAVA_OPTIONS when performing java agent attachment
#### Improvements:
 * Copy all container attributes to application if it runs in container

## 2020-08-04 (0.0.37)
#### Bugfixes:
 * Don't rollback container network attacks when target container is not running.

## 2020-07-21 (0.0.36)
#### Features:
 * Introduce commandline flag `chaosmesh.agent.disable-javattachment` for excluding target jvms from discovery.
#### Bugfixes:
 * Fix NoClassDefFoundError caused by chaosmesh java attachment on JBoss Undertow
 * Fix wrong log level for negative discovery of spring beans

## 2020-07-17 (0.0.35)
#### Improvements
 * Support JSON output using STEADYBIT_LOG_FORMAT=json
 * Filter sidecars in container discovery
 * Set default timeout for discovery to 10s
#### Bugfixes:
 * ignore JAVA_TOOL_OPTIONS when performing java agent attachment
 * warning for failed pull of sidecar image is only emitted every 10min
 * improve error handling for started sidecar containers
 * Fix Broken Pipe when discovering Kubernetes

## 2020-06-24 (0.0.34)
#### Bugfixes
 * Fix NoSuchMethodError when discovering JVMs
 * Fix JVM Attachment uses wrong java executable

## 2020-06-16 (0.0.33)
#### Features
 * Add Java Method Delay Attack
 * Add Java Method Exception Attack
 * Add Java JDBC Datasource Discovery
 * Add Spring JDBC Template Delay Attack
 * Add Spring JDBC Template Exception Attack
#### Improvements
 * Add default order for all Attack parameters
 * Changed error rate in all Attacks to default 100%
 * Verify Attack version during experiment preparation
 * Use aggressive mode for host IOAttack as well
 * No further sidecar containers are required for the execution of experiments
#### Bugfixes
 * Static Agent also includes all dependencies of the bytecode instrumentation

## 2020-05-04
#### Features
 * Add Spring MVC Controller Delay Attack
 * Add Spring MVC Controller Exception Attack
 * Discover Spring Applications and it's MVC mappings
#### Improvements
 * Add jitter parameter to Delay Network Traffic Delay Attack
 * Exclude the Steadybit Platform from all Network Traffic Attacks
#### Bugfixes
 * Force the communication to Java Agent use UTF-8
 * Unload all Java Agent Plugins when the Java Agent is unloaded

## 2020-04-09 (0.0.31)
#### Features
 * Add time-travel attack
#### Improvements
 * Refine the gke/aks/eks attributes to appear in kubernetes category
 * Add initial jitter for the platform registration, to distribute the registration calls when many agents get deployed at the same time

