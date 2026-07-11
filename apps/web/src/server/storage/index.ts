import { cloudflare, minio } from "@better-upload/server/clients";

export const s3Client = process.env.MINIO_ENDPOINT
  ? minio()
  : cloudflare({
      accountId: process.env.R2_ACCOUNT_ID!,
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    });
