import { NextResponse } from "next/server";

import { createLead } from "@/lib/db";
import { leadSchema } from "@/lib/leadSchema";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = leadSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid form data" },
        { status: 400 }
      );
    }

    await createLead(parsed.data);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to submit quote request" }, { status: 500 });
  }
}
