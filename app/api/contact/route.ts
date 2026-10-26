import { NextResponse, type NextRequest } from "next/server";
import { normalise, validateContact } from "@/lib/validation";
import { saveSubmission } from "@/lib/submissions";
import { emailConfigured, sendNotification } from "@/lib/notify";

export const runtime = "nodejs";

// Basic in-memory rate limit: 5 submissions per IP per 10 minutes (per server instance).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
    if (!body || typeof body !== "object") throw new Error();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field. Pretend success for bots.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages in a short time. Please try again later or email directly." },
      { status: 429 },
    );
  }

  const input = normalise(body);
  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "Please fix the highlighted fields.", errors }, { status: 400 });
  }

  let stored = false;
  let emailed = false;
  const createdAt = new Date().toISOString();

  try {
    await saveSubmission(input, req.headers.get("user-agent") ?? undefined);
    stored = true;
  } catch (err) {
    console.error("[contact] failed to store submission", err);
  }

  try {
    emailed = await sendNotification({ ...input, createdAt });
  } catch (err) {
    console.error("[contact] failed to send email notification", err);
  }

  if (!stored && !emailed) {
    return NextResponse.json(
      { ok: false, error: "Your message could not be sent right now. Please try again or email directly." },
      { status: 500 },
    );
  }

  if (!emailConfigured()) console.info("[contact] stored submission; email notifications not configured");
  return NextResponse.json({ ok: true });
}
