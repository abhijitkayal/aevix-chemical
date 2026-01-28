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

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kayalabhi04@gmail.com",
    pass:"gigigoplfivuedrt",
  },
});

// Basic diagnostics for environment and credentials
console.log('Mailer: DOTENV_LOADED?', process.env.DOTENV_LOADED === 'true');
console.log('Mailer: EMAIL_USER set?', !!process.env.EMAIL_USER, 'EMAIL_PASS set?', !!process.env.EMAIL_PASS);
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn('Mailer: EMAIL_USER or EMAIL_PASS is not set. SMTP auth will fail. Check your .env and ensure EMAIL_USER and EMAIL_PASS are configured.');
}

export default transporter;
