import nodemailer from "nodemailer";

// Basic diagnostics for missing credentials
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn('Mailer: EMAIL_USER or EMAIL_PASS is not set. SMTP auth will fail. Check your .env and ensure EMAIL_USER and EMAIL_PASS are configured.');
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kayalabhi04@gmail.com", // your gmail
    pass: "gigigoplfivuedrt", // gmail app password
  },
});

export default transporter;
