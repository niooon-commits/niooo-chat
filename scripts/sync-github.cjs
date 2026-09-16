const { NiooonVault } = require("niooon-manage-token");
const { execSync } = require("child_process");

async function syncToGitHub() {
  const commitMsg = process.argv[2] || "chore: update android codebase and trigger build";
  console.log(`Syncing codebase to GitHub (commit: "${commitMsg}")...`);

  const vault = new NiooonVault({
    apiKey: "nio_live_e1d0f78910dd10d71a43bee79a0681990474a9f8836e958c97e577e98146a06b"
  });

  const tokens = await vault.getTokens(["github"]);
  if (!tokens.github) {
    throw new Error("Failed to retrieve GitHub token from Vault.");
  }

  const token = tokens.github;
  const orgOrUser = "niooon-commits";
  const repoName = "niooo-chat";

  const authRemoteUrl = `https://x-access-token:${token}@github.com/${orgOrUser}/${repoName}.git`;
  const cleanRemoteUrl = `https://github.com/${orgOrUser}/${repoName}.git`;

  try {
    execSync("git add -A");
    execSync(`git commit -m "${commitMsg.replace(/"/g, '\\"')}"`, { stdio: "inherit" });
  } catch (e) {
    console.log("No new local changes to commit or commit failed:", e.message);
  }

  try {
    execSync(`git remote set-url origin ${authRemoteUrl}`);
    execSync("git push origin main", { stdio: "inherit" });
    console.log("Successfully pushed changes to GitHub!");
  } finally {
    execSync(`git remote set-url origin ${cleanRemoteUrl}`);
    if (typeof vault.clear === "function") {
      vault.clear();
    }
    console.log("Remote cleaned and vault memory cleared.");
  }
}

syncToGitHub().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});
