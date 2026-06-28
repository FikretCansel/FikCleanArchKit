import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  if (body.username === "fikret" && body.password === "fikret") {
    return NextResponse.json({
      user: {
        username: "fikret",
        displayName: "Fikret"
      },
      token: "a125sdfg"
    });
  }

  return NextResponse.json(
    { message: "Kullanici adi veya sifre hatali." },
    { status: 401 }
  );
}
