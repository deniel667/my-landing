import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type InquiryPayload = {
  source?: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  businessType?: string;
  products?: string;
  quantity?: string;
  notes?: string;
  requestsPdf?: string;
};

const allowedSources = new Set(['Homepage Contact', 'Private June Selection']);

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: Request) {
  let body: InquiryPayload;

  try {
    body = (await request.json()) as InquiryPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const source = asString(body.source);
  const name = asString(body.name);
  const email = asString(body.email);

  if (!allowedSources.has(source)) {
    return NextResponse.json({ error: 'Invalid inquiry source.' }, { status: 400 });
  }

  if (!name || !email) {
    return NextResponse.json({ error: 'Missing required inquiry fields.' }, { status: 400 });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.INQUIRY_WEBHOOK_SECRET;

  if (!webhookUrl || !secret) {
    console.error('Inquiry webhook environment is not configured.', {
      hasWebhookUrl: Boolean(webhookUrl),
      hasWebhookSecret: Boolean(secret),
    });
    return NextResponse.json({ error: 'Inquiry webhook is not configured.' }, { status: 500 });
  }

  let response: Response;

  try {
    response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        secret,
        source,
        name,
        company: asString(body.company),
        email,
        phone: asString(body.phone),
        businessType: asString(body.businessType),
        products: asString(body.products),
        quantity: asString(body.quantity),
        notes: asString(body.notes),
        requestsPdf: asString(body.requestsPdf),
      }),
      redirect: 'follow',
      cache: 'no-store',
    });
  } catch (error) {
    console.error('Inquiry webhook request failed.', error);
    return NextResponse.json({ error: 'Inquiry webhook request failed.' }, { status: 502 });
  }

  if (!response.ok) {
    const detail = await response.text();
    console.error('Inquiry webhook returned an error.', {
      status: response.status,
      detail,
    });
    return NextResponse.json({ error: 'Inquiry webhook returned an error.' }, { status: 502 });
  }

  let result: { ok?: boolean };

  try {
    result = (await response.json()) as { ok?: boolean };
  } catch {
    return NextResponse.json({ error: 'Invalid inquiry webhook response.' }, { status: 502 });
  }

  if (result.ok !== true) {
    return NextResponse.json({ error: 'Inquiry webhook did not confirm success.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
