// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

// // Basic diagnostics for missing credentials
// if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
//   console.warn('Mailer: EMAIL_USER or EMAIL_PASS is not set. SMTP auth will fail. Check your .env and ensure EMAIL_USER and EMAIL_PASS are configured.');
// }

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER, // your gmail
//     pass: process.env.EMAIL_PASS, // gmail app password
//   },
// });

// export default transporter;

import nodemailer from 'nodemailer';
import dns from 'dns';

// Use environment variables for SMTP configuration. On Render set these in service settings.
const SMTP_HOST = "smtp.gmail.com";
const SMTP_PORT = 587;
const SMTP_SECURE = false;
const EMAIL_USER = "kayalabhi04@gmail.com";
const EMAIL_PASS = "gigigoplfivuedrt";

console.log('Mailer config:', { SMTP_HOST, SMTP_PORT, SMTP_SECURE });
console.log('Mailer: EMAIL_USER set?', !!EMAIL_USER, 'EMAIL_PASS set?', !!EMAIL_PASS);
if (!EMAIL_USER || !EMAIL_PASS) {
  console.warn('Mailer: EMAIL_USER or EMAIL_PASS is not set. Configure these as environment variables in your hosting provider (e.g., Render).');
}

// Best-effort: prefer IPv6 by attempting to set DNS order but be resilient if Node doesn't accept 'ipv6first'.
if (dns.setDefaultResultOrder) {
  try {
    dns.setDefaultResultOrder('ipv6first');
    console.log('Mailer: attempted to set DNS result order to ipv6first');
  } catch (err) {
    console.warn('Mailer: dns.setDefaultResultOrder("ipv6first") not supported on this Node version:', err && err.message ? err.message : err);
  }
}

// Try to resolve an IPv6 address for SMTP_HOST; if successful prefer it, otherwise fallback to hostname.
let smtpHostToUse = SMTP_HOST;
try {
  const res = await dns.promises.lookup(SMTP_HOST, { family: 6 });
  if (res && res.address) {
    smtpHostToUse = res.address;
    console.log('Mailer: resolved IPv6 address for SMTP_HOST:', smtpHostToUse);
  }
} catch (err) {
  console.log('Mailer: IPv6 lookup failed, using hostname. Error:', err && err.message ? err.message : err);
}

const transporter = nodemailer.createTransport({
  host: smtpHostToUse,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: EMAIL_USER && EMAIL_PASS ? { user: EMAIL_USER, pass: EMAIL_PASS } : undefined,
  // Add timeouts and relaxed TLS for better diagnostics in dev. Remove rejectUnauthorized:false in production.
  tls: { rejectUnauthorized: false },
  connectionTimeout: 10000, // 10s
  socketTimeout: 10000,
});

// Verify transporter at startup to fail fast and log useful info
transporter.verify()
  .then(() => console.log('Mailer: SMTP connection verified'))
  .catch((err) => console.error('Mailer: SMTP verify failed', err && err.message ? err.message : err));

export default transporter;
