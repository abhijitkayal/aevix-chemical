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

// Use environment variables for SMTP configuration. On Render set these in service settings.
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
const SMTP_SECURE = (process.env.SMTP_SECURE === 'true') || SMTP_PORT === 465;
const EMAIL_USER = "kayalabhi04@gmail.com";
const EMAIL_PASS = "gigigoplfivuedrt";

console.log('Mailer config:', { SMTP_HOST, SMTP_PORT, SMTP_SECURE });
console.log('Mailer: EMAIL_USER set?', !!EMAIL_USER, 'EMAIL_PASS set?', !!EMAIL_PASS);
if (!EMAIL_USER || !EMAIL_PASS) {
  console.warn('Mailer: EMAIL_USER or EMAIL_PASS is not set. Configure these as environment variables in your hosting provider (e.g., Render).');
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: EMAIL_USER && EMAIL_PASS ? { user: EMAIL_USER, pass: EMAIL_PASS } : undefined,
});

// Verify transporter at startup to fail fast and log useful info
transporter.verify()
  .then(() => console.log('Mailer: SMTP connection verified'))
  .catch((err) => console.error('Mailer: SMTP verify failed', err && err.message ? err.message : err));

export default transporter;
