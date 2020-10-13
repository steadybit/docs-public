---
title: "Release Notes - Platform"
navTitle: "Platform"
metaTitle: "Release Notes Platform - steadybit Docs"
---

## Prepared for next versions
 * Static-Authentication accepts lists of users. Configuration needs to be updated, for example
  ```
    STEADYBIT_AUTH_STATIC_0_USERNAME:admin
    STEADYBIT_AUTH_STATIC_0_PASSWORD:...
    STEADYBIT_AUTH_STATIC_1_USERNAME:user
    STEADYBIT_AUTH_STATIC_1_PASSWORD:...
  ```

## 0.1.4
 * Rename SUCCESSFUL to COMPLETED
 * Add PodSecurityPolicy to K8s template
 * Save logs from actions

## 0.1.3

> **First steadybit release**
>
> Update
> 1. Switch to the `docker.steadybit.io/steadybit/platform` docker image.
> 2. If you're deploying on kubernetes you need to update the `dockerconfigjson` secret with the registry authentication.
> 3. Change all `CHAOSMESH_*` environment variables to `STEADYBIT_*`.
> 4. We can provide you a db-migration script if you want to keep your data.

#### Features:
 * Added Agent log viewer


## 0.0.38

#### Improvements:
 * Allow selecting multiple values for an attribute in blast-radius / team-restrictions

## 0.0.37

#### Improvements:
 * Dependency Updates

## 0.0.36

#### Improvements:
 * Allow saving experiment without an attack

## 0.0.35

#### Bugfixes:
 * Replace flaky auto-save in findings with save button.

## 0.0.34

#### Bugfixes:
 * Add missing colon in k8s daemonset template

## 0.0.33

#### Bugfixes:
 * Fix performance regression in orphaned target deletion

## 0.0.32

#### Improvements:
 * Add agent setup page for kubernetes daemonset

## 0.0.31

#### Improvements:
 * Enable JSON log format using `LOGGING_FORMAT=json`

#### Bugfixes:
 * Document Findings is disabled

## 0.0.30
#### Bugfixes:
 * Add missing EventTarget polyfill for Safari

## 0.0.28
#### Improvements:
 * Hide Agent-Key in UI by default
 * Provide debug container images `platform:<version>-debug` (e.g. `steadybit/platform:0.0.28-debug`)

## 0.0.27
#### Bugfixes
 * Disable AWS Paramstore per default. Needs to be activated explicitly when running in SaaS mode.

## 0.0.26
#### Improvements
 * Allow the platform to run behind proxies doing path rewriting by setting the `STEADYBIT_WEB_PUBLIC_URL`
 * Allow deletion of execution reports
 * Verify Attack version during experiment preparation.
 * Redirect from live-view to report if experiment has ended more than 60s ago

## 0.0.25
#### Features
 * Add warm-up and cool-down to experiments
 * Add experiments opt-In for webhooks with corresponding scope
#### Bugfixes
 * Mark state checks as stopped when experiment is canceled before first check execution.
