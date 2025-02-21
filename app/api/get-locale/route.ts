import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const locale = cookies().get("locale")?.value || "en";

  return NextResponse.json({ locale });
}
