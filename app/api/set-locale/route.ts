import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { locale } = await req.json();

  // Set the cookie (valid for 30 days)
  cookies().set("locale", locale, { maxAge: 60 * 60 * 24 * 30 });

  return NextResponse.json({ message: "Locale updated", locale });
}
