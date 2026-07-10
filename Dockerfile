FROM node:22-alpine

WORKDIR /app
RUN npm install -g pnpm@10.4.1

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.json ./
COPY apps/web/package.json apps/web/package.json
COPY packages packages
RUN NPM_TOKEN=${NPM_TOKEN:-} pnpm install --frozen-lockfile

COPY apps apps
RUN pnpm --filter @workspace/db build && pnpm --filter web build

ENV NODE_ENV=production PORT=3000
EXPOSE 3000

CMD ["sh", "-c", "pnpm --filter @workspace/db migrate:prod && pnpm --filter web start"]
