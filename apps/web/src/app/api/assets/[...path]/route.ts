import { s3Client } from "@/server/storage";
import { getObject } from "@better-upload/server/helpers";
import { prisma } from "@workspace/db";
import { NextResponse } from "next/server";

type RouteParams = { params: Promise<{ path: string[] }> };

export async function GET(_req: Request, { params }: RouteParams) {
  const { path } = await params;
  const [bucket, ...keyParts] = path;
  const key = keyParts.join("/");

  if (!bucket || !key) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const asset = await prisma.asset.findFirst({
    where: { bucket, key },
    select: { bucket: true, key: true, mimeType: true, filename: true },
  });

  if (!asset) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const object = await getObject(s3Client, {
    bucket: asset.bucket,
    key: asset.key,
  });

  return new NextResponse(object.blob, {
    headers: {
      "Cache-Control": "private, max-age=3600",
      "Content-Disposition": `inline; filename="${asset.filename}"`,
      "Content-Type": asset.mimeType,
    },
  });
}
