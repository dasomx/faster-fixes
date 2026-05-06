-- CreateTable
CREATE TABLE "linear_installation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "organizationId" TEXT NOT NULL,
    "linearOrgId" TEXT NOT NULL,
    "linearOrgName" TEXT NOT NULL,
    "linearOrgUrlKey" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT,
    "tokenScope" TEXT NOT NULL,
    "tokenExpiresAt" TIMESTAMP(3),
    "installedById" TEXT,

    CONSTRAINT "linear_installation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_linear_link" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectId" TEXT NOT NULL,
    "linearInstallationId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "teamKey" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "autoCreateIssues" BOOLEAN NOT NULL DEFAULT true,
    "defaultLabelIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "defaultPriority" INTEGER NOT NULL DEFAULT 0,
    "defaultStateId" TEXT NOT NULL,
    "linkHealthIssue" TEXT,

    CONSTRAINT "project_linear_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback_linear_issue_link" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "feedbackId" TEXT NOT NULL,
    "projectLinearLinkId" TEXT NOT NULL,
    "issueId" TEXT NOT NULL,
    "issueIdentifier" TEXT NOT NULL,
    "issueUrl" TEXT NOT NULL,
    "issueStateId" TEXT NOT NULL,
    "issueStateType" TEXT NOT NULL,
    "lastSyncSource" TEXT,
    "lastSyncAt" TIMESTAMP(3),

    CONSTRAINT "feedback_linear_issue_link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "linear_installation_organizationId_key" ON "linear_installation"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "linear_installation_linearOrgId_key" ON "linear_installation"("linearOrgId");

-- CreateIndex
CREATE INDEX "linear_installation_organizationId_idx" ON "linear_installation"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "project_linear_link_projectId_key" ON "project_linear_link"("projectId");

-- CreateIndex
CREATE INDEX "project_linear_link_linearInstallationId_idx" ON "project_linear_link"("linearInstallationId");

-- CreateIndex
CREATE INDEX "project_linear_link_teamId_idx" ON "project_linear_link"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "feedback_linear_issue_link_feedbackId_key" ON "feedback_linear_issue_link"("feedbackId");

-- CreateIndex
CREATE INDEX "feedback_linear_issue_link_projectLinearLinkId_idx" ON "feedback_linear_issue_link"("projectLinearLinkId");

-- CreateIndex
CREATE INDEX "feedback_linear_issue_link_issueId_idx" ON "feedback_linear_issue_link"("issueId");

-- AddForeignKey
ALTER TABLE "linear_installation" ADD CONSTRAINT "linear_installation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "linear_installation" ADD CONSTRAINT "linear_installation_installedById_fkey" FOREIGN KEY ("installedById") REFERENCES "member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_linear_link" ADD CONSTRAINT "project_linear_link_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_linear_link" ADD CONSTRAINT "project_linear_link_linearInstallationId_fkey" FOREIGN KEY ("linearInstallationId") REFERENCES "linear_installation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_linear_issue_link" ADD CONSTRAINT "feedback_linear_issue_link_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_linear_issue_link" ADD CONSTRAINT "feedback_linear_issue_link_projectLinearLinkId_fkey" FOREIGN KEY ("projectLinearLinkId") REFERENCES "project_linear_link"("id") ON DELETE CASCADE ON UPDATE CASCADE;
