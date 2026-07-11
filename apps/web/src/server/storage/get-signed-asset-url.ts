import { presignGetObject } from "@better-upload/server/helpers";
import { s3Client } from "@/server/storage";

type AssetForSignedUrl = {
  key: string;
  bucket: string;
};

function encodeAssetPath(asset: AssetForSignedUrl) {
  return [asset.bucket, ...asset.key.split("/")]
    .map((part) => encodeURIComponent(part))
    .join("/");
}

export async function getSignedAssetUrl(
  asset: AssetForSignedUrl,
  expiresIn = 3600,
): Promise<string> {
  if (process.env.MINIO_ENDPOINT) {
    const baseUrl =
      process.env.NEXT_PUBLIC_STORAGE_BASE_URL ??
      process.env.BETTER_AUTH_URL ??
      process.env.BASE_URL;

    if (baseUrl) {
      return `${baseUrl}/api/assets/${encodeAssetPath(asset)}`;
    }
  }

  return presignGetObject(s3Client, {
    bucket: asset.bucket,
    key: asset.key,
    expiresIn,
  });
}
