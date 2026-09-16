# NIOOON Automation & DevOps Instructions

## 🔑 Platform Credentials & Environment
* **Platform Vault Key**: `nio_live_e1d0f78910dd10d71a43bee79a0681990474a9f8836e958c97e577e98146a06b`
* **Vault URL**: `https://nioon.lovable.app`
* **Default GitHub User**: `niooon-commits`
* **Default Vercel User**: `niooon-commits` (`niooon@cinelink.fun`)
* **Default Supabase Project**: `rpagjdzvpaylxnqiddvb` (Name: `niooon.cc`)

## 🛠️ Instant Action Protocol
Whenever the user asks to perform any action on **GitHub**, **Vercel**, or **Supabase**:
1. Do not ask for tokens or API keys again.
2. Dynamically fetch the required provider tokens in memory using `niooon-manage-token`:
   ```javascript
   const { NiooonVault } = require("niooon-manage-token");
   const vault = new NiooonVault({ apiKey: "nio_live_e1d0f78910dd10d71a43bee79a0681990474a9f8836e958c97e577e98146a06b" });
   const tokens = await vault.getTokens(["github", "vercel", "supabase"]);
   ```
3. Initialize the corresponding client from `@niooon/github` (always via `require("@niooon/github")`):
   - `new NexusGitHub({ token: tokens.github })`
   - `new NexusVercel({ token: tokens.vercel })`
   - `new NexusSupabase({ token: tokens.supabase, projectRef: "rpagjdzvpaylxnqiddvb" })`
4. Execute the requested operations immediately.
5. Wipe tokens from memory after completion (`vault.clear()`).
6. For destructive Supabase operations (DROP/ALTER/DELETE), prompt the user for confirmation before executing.
