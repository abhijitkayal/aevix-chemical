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


// Read SMTP configuration from environment variables, fallback to defaults
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
const SMTP_SECURE = process.env.SMTP_SECURE === 'true' || false;
const EMAIL_USER = process.env.EMAIL_USER || '';
const EMAIL_PASS = process.env.EMAIL_PASS || '';

console.log('Mailer config:', { SMTP_HOST, SMTP_PORT, SMTP_SECURE });
console.log('Mailer: EMAIL_USER set?', !!EMAIL_USER, 'EMAIL_PASS set?', !!EMAIL_PASS);
if (!EMAIL_USER || !EMAIL_PASS) {
  console.warn('Mailer: EMAIL_USER or EMAIL_PASS is not set. Configure these as environment variables in your hosting provider (e.g., Render).');
}

// Try to set DNS result order to prefer IPv6 where supported, but tolerate older Node versions
if (dns.setDefaultResultOrder) {
  try {
    dns.setDefaultResultOrder('ipv4first'); // prefer IPv4 by default on servers that may not have IPv6
    console.log('Mailer: attempted to set DNS result order to ipv4first');
  } catch (err) {
    console.warn('Mailer: dns.setDefaultResultOrder failed:', err && err.message ? err.message : err);
  }
}

// Helper to create a nodemailer transporter for given host (hostname or IP)
const makeTransport = (host) => nodemailer.createTransport({
  host,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: EMAIL_USER && EMAIL_PASS ? { user: EMAIL_USER, pass: EMAIL_PASS } : undefined,
  tls: { rejectUnauthorized: process.env.NODE_ENV === 'production', servername: SMTP_HOST },
  connectionTimeout: 10000,
  socketTimeout: 10000,
});

// Create initial transporter using hostname and verify; if verification fails due to IPv6 route issues, try IPv4 fallback
let transporter = makeTransport(SMTP_HOST);

(async () => {
  try {
    await transporter.verify();
    console.log('Mailer: SMTP connection verified using host:', SMTP_HOST);
  } catch (err) {
    console.error('Mailer: SMTP verify failed', err && err.message ? err.message : err);

    const shouldTryIPv4 = err && (err.code === 'ENETUNREACH' || err.code === 'ETIMEDOUT' || /ENETUNREACH|ETIMEDOUT|EHOSTUNREACH|ESOCKET|EAI_AGAIN/.test(err.message || ''));
    if (shouldTryIPv4) {
      try {
        const res4 = await dns.promises.lookup(SMTP_HOST, { family: 4 });
        if (res4 && res4.address) {
          const ipv4 = res4.address;
          console.log('Mailer: attempting fallback to IPv4 address', ipv4);
          const transporter4 = makeTransport(ipv4);
          try {
            await transporter4.verify();
            transporter = transporter4; // use the working transporter
            console.log('Mailer: SMTP verified via IPv4 fallback', ipv4);
          } catch (err2) {
            console.error('Mailer: IPv4 fallback verify failed', err2 && err2.message ? err2.message : err2);
          }
        } else {
          console.warn('Mailer: IPv4 lookup returned no address; cannot fallback to IPv4');
        }
      } catch (err2) {
        console.error('Mailer: IPv4 lookup failed:', err2 && err2.message ? err2.message : err2);
      }
    }
  }
})();

export default transporter;
