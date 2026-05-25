import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type InquiryField = {
  label: string;
  value: string;
};

type InquiryPayload = {
  source?: string;
  subject?: string;
  replyTo?: string;
  fields?: InquiryField[];
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeFields(fields: unknown): InquiryField[] {
  if (!Array.isArray(fields)) return [];

  return fields
    .map((field) => {
      if (!field || typeof field !== 'object') return null;
      const record = field as Record<string, unknown>;
      const label = asString(record.label);
      const value = asString(record.value);
      if (!label || !value) return null;
      return { label, value };
    })
    .filter((field): field is InquiryField => Boolean(field));
}

function buildText(source: string, fields: InquiryField[]) {
  return [
    `source: ${source}`,
    '',
    ...fields.flatMap((field) => [`${field.label}:`, field.value, '']),
  ].join('\n');
}

function buildHtml(source: string, fields: InquiryField[]) {
  const rows = fields
    .map(
      (field) => `
        <tr>
          <th style="width: 180px; padding: 10px 12px; text-align: left; vertical-align: top; border-bottom: 1px solid #e8dfd2; color: #5b4a37;">${escapeHtml(field.label)}</th>
          <td style="padding: 10px 12px; white-space: pre-wrap; border-bottom: 1px solid #e8dfd2; color: #221c16;">${escapeHtml(field.value)}</td>
        </tr>
      `
    )
    .join('');

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #221c16;">
      <p style="margin: 0 0 16px; color: #6d5b45;">source: ${escapeHtml(source)}</p>
      <table style="width: 100%; border-collapse: collapse; border-top: 1px solid #e8dfd2;">
        ${rows}
      </table>
    </div>
  `;
}

export async function POST(request: Request) {
  let payload: InquiryPayload;

  try {
    payload = (await request.json()) as InquiryPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const source = asString(payload.source);
  const subject = asString(payload.subject);
  const replyTo = asString(payload.replyTo);
  const fields = normalizeFields(payload.fields);

  if (!source || !subject || fields.length === 0) {
    return NextResponse.json({ error: 'Missing required inquiry fields.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    console.error('Inquiry email environment is not configured.', {
      hasResendApiKey: Boolean(apiKey),
      hasContactFromEmail: Boolean(from),
      hasContactToEmail: Boolean(to),
    });
    return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 });
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text: buildText(source, fields),
      html: buildHtml(source, fields),
      reply_to: replyTo || undefined,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error('Inquiry email delivery failed.', {
      status: response.status,
      detail,
    });
    return NextResponse.json({ error: 'Email delivery failed.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
