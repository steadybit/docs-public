---
title: CLI
---

# CLI

The [Steadybit CLI](https://github.com/steadybit/cli) runs experiments from your CI/CD pipeline and keeps your chaos engineering setup in Git: experiments, templates, schedules, services, service profiles, environments, teams, properties, and integrations. It is a single binary for Linux, macOS, and Windows that calls the [API](api/api.md) under the hood.

## Installation

The CLI is a single binary for Linux, macOS, and Windows, on amd64 (x86-64) and arm64. On Windows, download the archive for your platform, listed below.

With Homebrew on macOS or Linux, which also installs the shell completions:

```bash
brew install steadybit/tap/steadybit
```

Or download the archive for your platform from the latest release and put the binary on your `PATH`: `steadybit`, or `steadybit.exe` on Windows. `checksums.txt` lists the SHA-256 of every file, and the [releases](https://github.com/steadybit/cli/releases) have the earlier versions.

| Platform | amd64 (x86-64)                                                                                                           | arm64                                                                                                                    |
| -------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Windows  | [steadybit_windows_amd64.zip](https://github.com/steadybit/cli/releases/latest/download/steadybit_windows_amd64.zip)     | [steadybit_windows_arm64.zip](https://github.com/steadybit/cli/releases/latest/download/steadybit_windows_arm64.zip)     |
| macOS    | [steadybit_darwin_amd64.tar.gz](https://github.com/steadybit/cli/releases/latest/download/steadybit_darwin_amd64.tar.gz) | [steadybit_darwin_arm64.tar.gz](https://github.com/steadybit/cli/releases/latest/download/steadybit_darwin_arm64.tar.gz) |
| Linux    | [steadybit_linux_amd64.tar.gz](https://github.com/steadybit/cli/releases/latest/download/steadybit_linux_amd64.tar.gz)   | [steadybit_linux_arm64.tar.gz](https://github.com/steadybit/cli/releases/latest/download/steadybit_linux_arm64.tar.gz)   |

For example, on Linux:

```bash
curl -sL https://github.com/steadybit/cli/releases/latest/download/steadybit_linux_amd64.tar.gz | tar -xz steadybit
sudo mv steadybit /usr/local/bin/
```

Alternatively:

* **Debian, Ubuntu, Fedora, RHEL**: install the `.deb` or `.rpm` package attached to every release, which also installs the shell completions. See the [CLI README](https://github.com/steadybit/cli#installation).
* **Container image**: `steadybit/cli`, for example `docker run --rm -e STEADYBIT_TOKEN steadybit/cli experiment run -k ADM-1 --yes`
* **GitHub Actions**: `uses: steadybit/cli@v6` installs the CLI on the runner.
* **Go**: `go install github.com/steadybit/cli/v6/cmd/steadybit@latest`

{% hint style="info" %}
Up to version 5, the CLI was an npm package. That package is no longer updated: uninstall it with `npm uninstall -g steadybit` and install the CLI as above. Commands, flags, and profiles in `~/.steadybit` keep working.

The `steadybit/run-experiment` GitHub Action is deprecated in favor of the CLI, which does everything it does. Each of its inputs has an `experiment run` flag: see [moving from steadybit/run-experiment](https://github.com/steadybit/cli#moving-from-steadybitrun-experiment).
{% endhint %}

## Authentication

The CLI needs an [access token](api/api.md#access-tokens). Store it in a profile:

```bash
steadybit config profile add
```

In a pipeline, set the environment variables `STEADYBIT_TOKEN` and, for an on-prem installation, `STEADYBIT_URL` instead.

## Usage

Run an experiment in a pipeline. The command waits for the run and fails when the run fails, cancels the run when the pipeline is canceled, and writes a JUnit report:

```bash
steadybit experiment run -f experiment.yml --yes --timeout 30m --report steadybit.xml
```

Keep a team's experiments, schedules, services, and custom service profiles in Git:

```bash
steadybit export --team ADM -d ./chaos    # write them as files
steadybit diff -d ./chaos                 # what differs from the platform; exits with 2 if anything does
steadybit apply -d ./chaos                # create or update them on the platform
```

Teams, environments, and the rest of the tenant's configuration can be kept in Git the same way: see [Manage Teams and Environments as Code](../install-and-configure/manage-teams-and-users/manage-as-code.md).

Every command documents its options and examples in `--help`, for example `steadybit experiment run --help`. The [README](https://github.com/steadybit/cli#readme) covers everything else, including GitLab CI and shell completion.
