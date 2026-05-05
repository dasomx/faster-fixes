type DocHowTo = {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
};

export const docsHowToSchemas: Record<string, DocHowTo> = {
  "integrations/github": {
    name: "Set up the Faster Fixes GitHub integration",
    description:
      "Install the Faster Fixes GitHub App and link a repository so client feedback creates GitHub issues automatically with full developer context, and feedback status syncs bidirectionally.",
    steps: [
      {
        name: "Open Organization Settings → Integrations",
        text: "Sign in to the Faster Fixes dashboard and open your organization's Integrations settings.",
      },
      {
        name: "Install the Faster Fixes GitHub App",
        text: "Click Install and authorize the Faster Fixes GitHub App on the GitHub account or organization that owns your repositories.",
      },
      {
        name: "Select repositories to grant access to",
        text: "Choose which GitHub repositories the app can access. You can change this list later from your GitHub account settings.",
      },
      {
        name: "Link a project to a repository",
        text: "Open Project Settings → GitHub for the project you want to connect, then pick a repository, configure auto-create issues, and set default labels.",
      },
    ],
  },
};
