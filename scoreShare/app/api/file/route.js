import { resolveError } from "@/lib/error-resolver";
import { supDownloadFile } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req) {
  const url = new URL(req.url);
  const fileName = url.searchParams.get("fileName");
  try {
    const { data, error } = await supDownloadFile(fileName);
    if (error) {
      throw Error(error.message);
    }
    if (!data) {
      return res.status(404).json({ error: "File not found" });
    }

    const headers = new Headers();
    headers.set("Content-Type", data.type)

    return new NextResponse(data, {status: 200, headers});
  } catch (error) {
    const [status, message] = resolveError(error)
    return Response.json({ message: message }, { status: status });
  }
}
