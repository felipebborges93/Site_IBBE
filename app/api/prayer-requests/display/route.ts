import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");
  const expectedToken = process.env.TELAO_API_TOKEN;

  if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("prayer_requests")
    .select("id, name, request, is_anonymous")
    .eq("status", "approved")
    .eq("displayed", false)
    .order("created_at", { ascending: true })
    .limit(10); // Batch size

  if (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }

  return NextResponse.json({ data });
}
