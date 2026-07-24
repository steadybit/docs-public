---
title: Remote MCP Server
---

# Remote MCP Server

Steadybit ships a hosted [Model Context Protocol](https://modelcontextprotocol.io) (MCP) server, so you can connect AI agents such as Claude Code, Claude Desktop, or GitHub Copilot in VS Code directly to your Steadybit tenant. Once connected, the assistant can explore your environments, targets, actions, services, experiments, and execution results — and, with the right permissions, help you design, save, and run experiments — so you can understand your system, reason about resilience, and act on it.

Every tool runs with the permissions of the credential you connect with — the same team permissions, environment allowances, and license that apply in the UI and public API — so the assistant can only do what that credential is allowed to do. With OAuth the credential is your own user account; an access token acts with the token's own scope (a single team, all teams, or an admin token's tenant-wide access).

{% hint style="info" %}
The MCP server is a licensed feature. If the endpoints below reject your requests, ask your Steadybit administrator to confirm that MCP is enabled for your tenant. The AI-assisted tools (experiment design, suggestions, and run analysis) additionally require the Steadybit AI feature.
{% endhint %}

## Capabilities

The server groups its tools into a few areas:

**Explore & analyze**

* Environments, teams, targets (with counts and statistics), and actions
* Services and their Service Risk breakdown
* Experiments and experiment templates
* Executions (runs): per-step results, notably failed targets, logs, and the metrics collected during a run
* Reliability advice for your targets
* Reporting trends — experiment executions and Service Risk over time

**Design & author**

* Turn a natural-language description into an experiment design, or get experiment suggestions for an environment or service
* Create a new experiment, update an existing one, or create one from a template

**Run**

* Start an experiment execution, or cancel a running one

{% hint style="warning" %}
Running an experiment injects **real faults** into your infrastructure. Treat the run tools as destructive — a well-behaved client will confirm with you before starting a run, and execution requires the same team and environment permissions as running from the UI or public API.
{% endhint %}

## Authentication

There are two ways to authenticate an MCP client. Pick whichever fits your client and workflow — both connect to the same server and expose the same capabilities.

| Method | Endpoint | Best for |
| --- | --- | --- |
| **Access token** | `https://platform.steadybit.com/mcp` | Any MCP client; scripted or headless setups |
| **OAuth** | `https://platform.steadybit.com/mcp/<tenant>` | Clients with an interactive browser login |

### Method 1 — Access token

The simplest option, supported by every MCP client that can send an HTTP header. Create an [access token](api/api.md#access-tokens) in the UI under **Settings → API Access Tokens**, then pass it in the `Authorization` header when adding the server. The token already carries its tenant, so you connect to the plain `/mcp` endpoint.

For [Claude Code](https://docs.claude.com/en/docs/claude-code):

```bash
claude mcp add --transport http steadybit \
  https://platform.steadybit.com/mcp \
  --header "Authorization: Bearer <your-access-token>"
```

The same works for any other MCP client — point it at `https://platform.steadybit.com/mcp` and configure an `Authorization: Bearer <your-access-token>` header.

### Method 2 — OAuth

With OAuth, the client opens your browser, you log in to Steadybit through your identity provider, and you approve access on a consent screen — no token to copy or store. Point the client at the tenant-scoped endpoint `https://platform.steadybit.com/mcp/<tenant>`, replacing `<tenant>` with your tenant key.

For [Claude Code](https://docs.claude.com/en/docs/claude-code):

```bash
claude mcp add --transport http steadybit \
  https://platform.steadybit.com/mcp/<tenant>
```

On first use the client opens a browser window where you sign in and confirm the connection:

<figure><img src="../.gitbook/assets/mcp-oauth-consent.png" alt="OAuth consent screen granting an MCP client access to Steadybit"><figcaption></figcaption></figure>

Access is granted based on your existing Steadybit membership: the assistant acts as you, within the same tenant and permissions you already have.

#### Supported clients

The OAuth path works with MCP clients that Steadybit has registered with its identity provider:

* **Claude Code**
* **Claude Desktop / Web**
* **VS Code** — including **GitHub Copilot** chat and agent mode, which connect through VS Code's built-in MCP client

Other clients that require Dynamic Client Registration (for example Cursor, Windsurf, the Codex CLI, and the GitHub Copilot CLI) are not supported on the OAuth path today. Use the [access token](#method-1-access-token) method with those clients instead.
