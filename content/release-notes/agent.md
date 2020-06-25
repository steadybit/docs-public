---
title: "Release Notes - Agent"
navTitle: "Agent"
metaTitle: "Release Notes Agent - chaosmesh Docs"
---
## 2020-06-24
#### Bugfixes
 * Fix NoSuchMethodError when discovering JVMs
 * Fix JVM Attachment uses wrong java executable

## 2020-06-16
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


## 2020-06-16
#### Features
 * Add Java Method Delay Attack
 * Add Java Method Exception Attack
 * Add Java JDBC datasource Discovery
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
 * Exclude the Chaosmesh Platform from all Network Traffic Attacks
#### Bugfixes
 * Force the communication to Java Agent use UTF-8
 * Unload all Java Agent Plugins when the Java Agent is unloaded

## 2020-04-09
#### Features
 * Add time-travel attack
#### Improvements
 * Refine the gke/aks/eks attributes to appear in kubernetes category
 * Add initial jitter for the platform registration, to distribute the registration calls when many agents get deployed at the same time

