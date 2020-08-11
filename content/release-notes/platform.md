---
title: "Release Notes - Platform"
navTitle: "Platform"
metaTitle: "Release Notes Platform - steadybit Docs"
---

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
