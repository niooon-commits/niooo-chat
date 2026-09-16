const { NiooonVault } = require("niooon-manage-token");
const { execSync } = require("child_process");

async function setupRepo() {
  console.log("Fetching GitHub credentials from Niooon Vault...");
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

  console.log(`Checking repository https://api.github.com/repos/${orgOrUser}/${repoName}...`);
  const checkRes = await fetch(`https://api.github.com/repos/${orgOrUser}/${repoName}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "NiooonAgent"
    }
  });

  let repoData;
  if (checkRes.status === 404) {
    console.log(`Creating new repository '${repoName}' for user '${orgOrUser}'...`);
    const createRes = await fetch("https://api.github.com/user/repos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "NiooonAgent",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: repoName,
        description: "niooo Chat - Android Application with Single Release CI/CD Workflow",
        private: false,
        auto_init: false
      })
    });

    if (!createRes.ok) {
      const err = await createRes.text();
      throw new Error(`Failed to create repository: ${createRes.status} ${err}`);
    }
    repoData = await createRes.json();
    console.log(`Repository created successfully: ${repoData.html_url}`);
  } else if (checkRes.ok) {
    repoData = await checkRes.json();
    console.log(`Repository already exists: ${repoData.html_url}`);
  } else {
    const err = await checkRes.text();
    throw new Error(`Error checking repository: ${checkRes.status} ${err}`);
  }

  // Push local repository to GitHub
  console.log("Configuring git remote and pushing codebase...");
  const authRemoteUrl = `https://x-access-token:${token}@github.com/${orgOrUser}/${repoName}.git`;
  const cleanRemoteUrl = `https://github.com/${orgOrUser}/${repoName}.git`;

  try {
    execSync("git remote remove origin", { stdio: "ignore" });
  } catch (e) {
    // Ignore if origin didn't exist
  }

  execSync(`git remote add origin ${authRemoteUrl}`);
  execSync("git branch -M main");
  execSync("git push -u origin main --force");

  // Wipe token from local git config
  execSync(`git remote set-url origin ${cleanRemoteUrl}`);
  console.log("Git remote cleaned and updated to public URL.");

  // Wipe vault memory as instructed in Protocol
  if (typeof vault.clear === "function") {
    vault.clear();
  }
  console.log("Vault tokens cleared from memory.");

  console.log(`\nAll done! Repository URL: https://github.com/${orgOrUser}/${repoName}`);
  console.log(`Actions Workflow URL: https://github.com/${orgOrUser}/${repoName}/actions`);
  console.log(`Releases URL: https://github.com/${orgOrUser}/${repoName}/releases`);
}

setupRepo().catch((err) => {
  console.error("Setup failed:", err);
  process.exit(1);
});
