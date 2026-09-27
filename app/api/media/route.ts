import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { readdir, stat, unlink } from "fs/promises";
import { join } from "path";

const UPLOAD_DIR = join(process.cwd(), "public", "uploads");

export async function GET() {
  const session = await getSession();
  if (!session.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userDir = join(UPLOAD_DIR, String(session.userId));
  try {
    const files = await readdir(userDir);
    const items = await Promise.all(
      files.map(async (file) => {
        try {
          const s = await stat(join(userDir, file));
          return {
            name: file,
            url: `/uploads/${session.userId}/${file}`,
            size: s.size,
            createdAt: s.birthtime.toISOString(),
          };
        } catch {
          return null;
        }
      }),
    );
    const sorted = items
      .filter(Boolean)
      .sort((a, b) => new Date(b!.createdAt).getTime() - new Date(a!.createdAt).getTime());
    return NextResponse.json({ files: sorted });
  } catch {
    return NextResponse.json({ files: [] });
  }
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("file");
  if (!filename || filename.includes("/") || filename.includes("..")) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  const filePath = join(UPLOAD_DIR, String(session.userId), filename);
  try {
    await unlink(filePath);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
