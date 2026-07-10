import { createAppAuth } from "@octokit/auth-app";
import { Octokit } from "@octokit/core";

function getGitHubAppAuth() {
  const appId = process.env.GITHUB_APP_ID;
  const rawPrivateKey = process.env.GITHUB_PRIVATE_KEY;

  if (!appId || !rawPrivateKey) {
    throw new Error("GITHUB_APP_ID and GITHUB_PRIVATE_KEY are required.");
  }

  return { appId, privateKey: rawPrivateKey.replace(/\\n/g, "\n") };
}

export function getAppOctokit() {
  return new Octokit({
    authStrategy: createAppAuth,
    auth: getGitHubAppAuth(),
  });
}

export function getInstallationOctokit(installationId: number) {
  return new Octokit({
    authStrategy: createAppAuth,
    auth: { ...getGitHubAppAuth(), installationId },
  });
}
