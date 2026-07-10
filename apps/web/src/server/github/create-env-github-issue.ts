import {
  formatIssueBody,
  formatIssueTitle,
} from "@/server/github/format-issue-body";
import type { DiagnosticTrail } from "@fasterfixes/core";

type Feedback = {
  id: string;
  comment: string;
  pageUrl: string;
  selector: string | null;
  clickX: number | null;
  clickY: number | null;
  browserName: string | null;
  browserVersion: string | null;
  os: string | null;
  viewportWidth: number | null;
  viewportHeight: number | null;
  metadata: unknown;
  diagnosticTrail: unknown;
  projectId: string;
  reviewer: { name: string };
};

export async function createEnvGitHubIssue(
  feedback: Feedback,
  screenshotUrl: string | null,
) {
  const token = process.env.GITHUB_ISSUES_TOKEN;
  const repo = process.env.GITHUB_ISSUES_REPO;
  if (!token || !repo) return;

  const [owner, name] = repo.split("/");
  if (!owner || !name) throw new Error("GITHUB_ISSUES_REPO must be owner/repo");

  const baseUrl = process.env.BETTER_AUTH_URL ?? process.env.BASE_URL!;
  const labels = (process.env.GITHUB_ISSUES_LABELS ?? "faster-fixes")
    .split(",")
    .map((label) => label.trim())
    .filter(Boolean);

  const res = await fetch(`https://api.github.com/repos/${owner}/${name}/issues`, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "faster-fixes-self-hosted",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      title: formatIssueTitle(feedback.comment),
      body: formatIssueBody({
        id: feedback.id,
        comment: feedback.comment,
        pageUrl: feedback.pageUrl,
        selector: feedback.selector,
        clickX: feedback.clickX,
        clickY: feedback.clickY,
        browserName: feedback.browserName,
        browserVersion: feedback.browserVersion,
        os: feedback.os,
        viewportWidth: feedback.viewportWidth,
        viewportHeight: feedback.viewportHeight,
        screenshotUrl,
        reviewerName: feedback.reviewer.name,
        metadata: feedback.metadata as Record<string, unknown> | null,
        diagnosticTrail: feedback.diagnosticTrail as DiagnosticTrail | null,
        projectId: feedback.projectId,
        dashboardUrl: `${baseUrl}/inbox?feedbackId=${feedback.id}`,
      }),
      labels,
    }),
  });

  if (!res.ok) throw new Error(`GitHub issue create failed: ${res.status}`);
}
