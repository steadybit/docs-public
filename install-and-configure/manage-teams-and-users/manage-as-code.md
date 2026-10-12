---
title: Manage Teams and Environments as Code
---

# Manage Teams and Environments as Code

With the [Steadybit CLI](../../integrate-with-steadybit/cli.md), you can keep teams, their members and permissions, and environments as YAML files in a Git repository and apply them to the platform from a pipeline. Onboarding a new team then means opening a pull request instead of clicking through the UI. It works like infrastructure as code: `diff` shows what a change would do, and `apply` makes it so.

The same works for experiment templates, property definitions, hubs, integrations, and service profiles. This page focuses on teams and environments.

## Prerequisites

* The [CLI installed](../../integrate-with-steadybit/cli.md#installation).
* An [access token](../../integrate-with-steadybit/api/api.md#access-tokens) of type **Admin**. Creating teams and environments, and exporting the tenant, needs admin permissions.

## Step 1 - Export Your Current Setup

Start from what the platform already has, so that the files have the right format and nothing is lost on the first apply:

```bash
steadybit export --tenant -d ./platform
```

This writes one directory per kind, among them `environments/` and `teams/`. Delete the directories of kinds you don't want to manage from Git. `apply` and `diff` only look at the directories that exist.

Commit the result to a Git repository.

## Step 2 - Describe Environments

An environment is a file in `platform/environments/`. The [query](../../concepts/query-language/README.md) selects the targets the environment contains:

```yaml
name: Payments Prod
query: k8s.cluster-name="prod" and k8s.namespace="payments"
```

A file without an `id` creates a new environment. The CLI writes the new id back into the file. Commit it, though a file without an id still matches an existing environment by its name.

## Step 3 - Describe Teams

A team is a file in `platform/teams/`. The key identifies the team, so changing it creates a new team:

```yaml
key: PAY
name: Payments
description: Payments squad
allowedEnvironments:
  - Payments Prod
allowedActions:
  - wait
  - service-validation
  - com.steadybit.extension_container.stop
  - com.steadybit.extension_http.check.periodically
members:
  - email: jane@example.com
    role: OWNER
  - email: bob@example.com
    role: MEMBER
```

* `allowedEnvironments` names the environments the team may use, by name.
* `allowedActions` lists the ids of the actions the team may run. `steadybit action list` shows the ids available in your tenant.
* `members` gives each member's email, or the `username` an export writes, and a role of `OWNER` or `MEMBER`.

Together, `allowedEnvironments` and `allowedActions` are the team's maximum blast radius, as described in [Teams](teams.md#permissions).

## Step 4 - Review and Apply

```bash
steadybit diff -d ./platform              # what differs from the platform; exits with 2 if anything does
steadybit apply -d ./platform --dry-run   # what an apply would create or update
steadybit apply -d ./platform
```

`apply` handles the kinds in an order that resolves their references. Environments come before teams, so a team can name an environment created in the same apply.

To apply a single kind, use its own command, for example `steadybit team apply -f ./platform/teams -R` or `steadybit environment diff -f ./platform/environments -R`.

## Run It From a Pipeline

Store the admin access token as a CI secret, review the dry run on pull requests, and apply on the main branch. With GitHub Actions:

```yaml
name: Steadybit platform
on:
  pull_request:
    paths: ['platform/**']
  push:
    branches: [main]
    paths: ['platform/**']

jobs:
  platform:
    runs-on: ubuntu-latest
    env:
      STEADYBIT_TOKEN: ${{ secrets.STEADYBIT_ADMIN_TOKEN }}
      # STEADYBIT_URL: https://steadybit.example.com   # on-prem installations only
    steps:
      - uses: actions/checkout@v4
      - uses: steadybit/cli@v6
      - if: github.event_name == 'pull_request'
        run: steadybit apply -d ./platform --dry-run
      - if: github.event_name == 'push'
        run: steadybit apply -d ./platform
```

Running `steadybit diff -d ./platform` on a schedule tells you when someone changed the platform in the UI, as it exits with 2 when the platform and the files differ.

To let the new team run its own experiments from its own pipeline, give it a team access token:

```bash
steadybit access-token create --name payments-ci --type TEAM --team PAY --expires-at 2027-12-31
```

## Caveats

Compared to a tool like Terraform, keep the following in mind:

* **Nothing is deleted.** `apply` creates and updates, but never deletes a team or an environment whose file is gone. Delete those explicitly with `steadybit team delete` or `steadybit environment delete`.
* **Only files are compared.** `diff` reports differences for the files you have, not for teams or environments created in the UI that have no file.
* **There is no state file.** Teams are matched by their key, and environments by their id or else their name. Renaming an environment in a file without an `id` creates a new environment.
* **The member list is complete.** Applying a team file sets its members to exactly those listed: members missing from the file are removed from the team. `members: []` removes everyone not managed by OIDC or LDAP.
* **Users must exist before they can be added.** Members whose email the platform doesn't know yet are skipped without an error. Invite them first with `steadybit user invite --email jane@example.com` (SaaS only), or let them log in once with single sign-on, then apply again.
* **Actions must be available.** The platform rejects a team whose `allowedActions` include an action no installed extension provides. Install the extensions before applying.
* **OIDC and LDAP manage their own members.** If the [OIDC Integration](../install-on-prem-platform/oidc-integration.md) or [LDAP Integration](../install-on-prem-platform/ldap-integration.md) syncs teams, membership comes from the identity provider: `apply` never removes members it manages. Manage the team's environments and actions from Git, and its members in the identity provider.
* **The token needs admin permissions.** Keep the admin token in the pipeline's secrets only, and give teams their own team tokens for their experiments.
