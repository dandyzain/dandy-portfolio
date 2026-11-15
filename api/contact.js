// Vercel Serverless Function: POST /api/contact
// Sends the portfolio contact form to your inbox through Resend.
//
// Required environment variables (Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY     API key from https://resend.com/api-keys
// Optional:
//   CONTACT_TO_EMAIL   where messages go (default: dandyzain.work@gmail.com)
//   CONTACT_FROM_EMAIL sender, e.g. "Portfolio <hello@yourdomain.com>" once your
//                      domain is verified in Resend. Until then the default
//                      onboarding@resend.dev sender works, but only for sending
//                      to the email address you signed up to Resend with.
//
// The browser falls back to a mailto: draft whenever this endpoint fails, so a
// missing key never loses a message silently.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = { name: 120, email: 200, service: 120, message: 5000 };

// Best-effort, per-instance rate limit (serverless instances are short-lived,
// so this only blunts bursts; the honeypot and timing check do most of the work).
const hits = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  let body;
  try {
    body = await readBody(req);
  } catch {
    return res.status(400).json({ ok: false, error: 'invalid_json' });
  }

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const service = String(body.service || '').trim();
  const message = String(body.message || '').trim();
  const lang = body.lang === 'id' ? 'id' : 'en';

  // Spam traps: a hidden field humans never fill, and forms submitted
  // impossibly fast after page load. Pretend success so bots don't retry.
  if (body.website || (Number(body.elapsedMs) > 0 && Number(body.elapsedMs) < 2500)) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return res.status(422).json({ ok: false, error: 'invalid_fields' });
  }
  if (name.length > LIMITS.name || email.length > LIMITS.email || service.length > LIMITS.service || message.length > LIMITS.message) {
    return res.status(422).json({ ok: false, error: 'too_long' });
  }

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    return res.status(429).json({ ok: false, error: 'rate_limited' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ ok: false, error: 'not_configured' });
  }

  const to = process.env.CONTACT_TO_EMAIL || 'dandyzain.work@gmail.com';
  const from = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';
  const subject = `[Portfolio] ${service || 'New message'} — ${name}`;

  const text = `Name: ${name}\nEmail: ${email}\nTopic: ${service}\nLanguage: ${lang}\n\n${message}`;
  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;line-height:1.6;color:#0E1220">
      <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin:0 0 4px"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      <p style="margin:0 0 4px"><strong>Topic:</strong> ${escapeHtml(service)}</p>
      <p style="margin:0 0 16px"><strong>Language:</strong> ${lang.toUpperCase()}</p>
      <div style="white-space:pre-wrap;border-left:3px solid #14B8A6;padding-left:12px">${escapeHtml(message)}</div>
    </div>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject, text, html }),
    });
    if (!r.ok) {
      const detail = await r.text().catch(() => '');
      console.error('Resend error', r.status, detail);
      return res.status(502).json({ ok: false, error: 'send_failed' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend request failed', err);
    return res.status(502).json({ ok: false, error: 'send_failed' });
  }
}
