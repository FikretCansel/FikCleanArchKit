import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const username = String(body.username ?? "").trim();
  const password = String(body.password ?? "").trim();

  if (username.length < 3 || password.length < 3) {
    return NextResponse.json(
      { message: "Kullanici adi ve sifre en az 3 karakter olmali." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    user: {
      username,
      displayName: username
    },
    token: `register-token-${username}`
  });
}
