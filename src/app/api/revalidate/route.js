import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * On-demand revalidation API.
 * Called by Laravel Backend when Admin updates content to invalidate Next.js cache immediately.
 *
 * POST body: { secret: string, tags?: string[], path?: string }
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { secret, tags, path } = body;

    const expectedSecret = process.env.REVALIDATION_SECRET;
    if (!expectedSecret || secret !== expectedSecret) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    const hasTags = tags && Array.isArray(tags) && tags.length > 0;
    const hasPath = path && typeof path === "string";
    if (!hasTags && !hasPath) {
      return NextResponse.json(
        { error: "Provide tags or path" },
        { status: 400 }
      );
    }

    if (hasTags) {
      for (const tag of tags) {
        revalidateTag(tag);
      }
    }
    if (hasPath) {
      revalidatePath(path);
    }

    return NextResponse.json({ revalidated: true });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { error: "Revalidation failed" },
      { status: 500 }
    );
  }
}
