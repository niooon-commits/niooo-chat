---
name: niooon-automation
description: >
  Zero-retention DevOps and cloud automation for GitHub, Vercel, and Supabase using the NIOOON
  platform vault and @niooon/github SDK / niooon-manage-token client. Use whenever the user
  requests operations, deployments, repository management, database queries, or automations
  involving GitHub, Vercel, or Supabase.
---

# NIOOON Automation & Vault Integration Skill

This skill provides instant, persistent instructions and workflows for managing and automating **GitHub**, **Vercel**, and **Supabase** via the NIOOON platform ecosystem.

---

## 1. Saved Platform Credentials & Configuration

* **NIOOON Platform API Key**: `nio_live_e1d0f78910dd10d71a43bee79a0681990474a9f8836e958c97e577e98146a06b`
* **Vault API URL**: `https://nioon.lovable.app`
* **Vault Tokens Endpoint**: `https://nioon.lovable.app/api/public/vault/tokens`
* **Default Target Accounts**:
  * **GitHub Account**: `niooon-commits`
  * **Vercel Account**: `niooon-commits` (`niooon@cinelink.fun`)
  * **Supabase Project ID**: `rpagjdzvpaylxnqiddvb` (Project Name: `niooon.cc`, Region: `ap-southeast-1`)

---

## 2. Core Architecture & Philosophy

1. **Zero-Retention Sourcing**:
   - The platform key dynamically exchanges for GitHub PAT (`ghp_...`), Vercel token (`vcp_...`), and Supabase token (`sbp_...`) at runtime.
   - Tokens are kept in-memory only for transient execution (TTL 300s) and wiped when complete (`vault.clear()`).
   - Tokens must **never** be logged in plain text or written to disk.

2. **CommonJS Requirement**:
   - When using `@niooon/github` in Node.js scripts, use CommonJS (`require("@niooon/github")`) or configure explicit file imports to ensure full compatibility.

---

## 3. Quick SDK Execution Patterns

### A. Sourcing All Credentials at Runtime

```javascript
const { NiooonVault } = require("niooon-manage-token");
const { NexusGitHub, NexusVercel, NexusSupabase } = require("@niooon/github");

const PLATFORM_KEY = "nio_live_e1d0f78910dd10d71a43bee79a0681990474a9f8836e958c97e577e98146a06b";

async function getServices() {
  const vault = new NiooonVault({ apiKey: PLATFORM_KEY });
  const tokens = await vault.getTokens(["github", "vercel", "supabase"]);

  const github = new NexusGitHub({ token: tokens.github });
  const vercel = new NexusVercel({ token: tokens.vercel });
  const supabase = new NexusSupabase({ 
    token: tokens.supabase, 
    projectRef: "rpagjdzvpaylxnqiddvb" 
  });

  return { github, vercel, supabase, vault };
}
```

---

## 4. Workflows by Provider

### GitHub Automation (`NexusGitHub`)

* **Get Current User**: `await github.getAuthenticatedUser()`
* **List Repositories**: `await github.repos.list()`
* **Create Repository**: `await github.repos.create({ name: "repo-name", private: true, description: "..." })`
* **Read File**: `await github.files.get({ repo: "repo-name", path: "file/path.txt" })`
* **Write/Commit File**: `await github.files.write({ repo: "repo-name", path: "file/path.txt", content: "...", message: "Commit message" })`
* **Branch Management**: `await github.branches.list({ repo: "repo-name" })`, `await github.branches.create({ ... })`
* **Pull Requests & Issues**: `await github.pulls.list({ repo: "repo-name" })`, `await github.issues.create({ ... })`
* **Workflows / Actions**: `await github.workflows.list({ repo: "repo-name" })`, `await github.workflows.dispatch({ ... })`

### Vercel Automation (`NexusVercel`)

* **Verify User**: `await vercel.auth.whoami()`
* **List Projects**: `await vercel.projects.list()`
* **Create Project**: `await vercel.projects.create({ name: "project-name" })`
* **Trigger Deploy**: `await vercel.deploy.create({ name: "project-name", prod: true })`
* **Check Deployment Status**: `await vercel.deploy.status({ deploymentId: "..." })`
* **Manage Environment Variables**: `await vercel.env.list({ projectId: "..." })`, `await vercel.env.add({ projectId: "...", key: "KEY", value: "VAL" })`

### Supabase Management (`NexusSupabase`)

* **Verify Credentials**: `await supabase.auth.whoami()`
* **List Database Tables**: `await supabase.database.listTables()`
* **List Edge Functions**: `await supabase.functions.list()`
* **List RLS Policies**: `await supabase.policies.list()`
* **Execute SQL Query** *(Mutating requires explicit confirmation)*:
  ```javascript
  await supabase.database.runQuery({
    sql: "SELECT * FROM my_table LIMIT 10;",
    confirmed: true
  });
  ```
* **Create Table**:
  ```javascript
  await supabase.database.createTable({
    name: "users_data",
    columns: [
      { name: "id", type: "uuid", isPrimary: true },
      { name: "email", type: "text" }
    ],
    confirmed: true
  });
  ```

---

## 5. Agent Safety & Permission Protocol

Before executing any **destructive or mutating Supabase operation** (dropping tables, altering schema, executing DDL/DML, deploying edge functions):
1. **Always inform the user** about the exact action and target.
2. **Obtain user confirmation** before proceeding.
3. Once completed, always invoke `vault.clear()` to immediately wipe tokens from memory.
