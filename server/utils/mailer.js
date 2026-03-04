import nodemailer from 'nodemailer';

const EMAIL_USER = process.env.EMAIL_USER || '';
const EMAIL_PASS = process.env.EMAIL_PASS || '';

console.log('Mailer: Using Nodemailer with SMTP');
console.log('Mailer: EMAIL_USER set?', !!EMAIL_USER);
console.log('Mailer: EMAIL_PASS set?', !!EMAIL_PASS);

if (!EMAIL_USER || !EMAIL_PASS) {
  console.error('Mailer: ✗ EMAIL_USER or EMAIL_PASS is not set!');
  console.error('Mailer: Add to .env file:');
  console.error('Mailer: EMAIL_USER=your-email@gmail.com');
  console.error('Mailer: EMAIL_PASS=your-app-password');
}

// Create transporter with Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Mailer: ✗ SMTP connection failed:', error.message);
  } else {
    console.log('Mailer: ✓ SMTP server is ready to send emails');
  }
});

export const sendOtpMail = async (email, otp) => {
  console.log('>>> sendOtpMail called with email:', email);
  
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.error('>>> ERROR: No email credentials configured!');
    throw new Error('Email credentials not configured. Set EMAIL_USER and EMAIL_PASS in your .env file.');
  }

  console.log('>>> Email credentials are set');
  console.log('>>> Sending from:', EMAIL_USER);

  try {
    console.log('>>> Preparing email message...');
    
    const mailOptions = {
      from: `"Aevix Chemical" <${EMAIL_USER}>`,
      to: email,
      subject: 'Your Login OTP - Aevix Chemical',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Login Verification</h2>
          <p>Your OTP code is:</p>
          <div style="background: #f0f0f0; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
            <h1 style="color: #4F46E5; font-size: 36px; letter-spacing: 8px; margin: 0; font-weight: bold;">${otp}</h1>
          </div>
          <p>This code is valid for <strong>5 minutes</strong>.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">If you didn't request this code, please ignore this email.</p>
          <p style="color: #666; font-size: 12px;">© 2026 Aevix Chemical. All rights reserved.</p>
        </div>
      `,
      text: `Your OTP code is: ${otp}\n\nThis code is valid for 5 minutes.\n\nIf you didn't request this, please ignore this email.`,
    };

    console.log('>>> Sending email via SMTP...');
    const info = await transporter.sendMail(mailOptions);
    console.log('>>> ✓ Email sent successfully');
    console.log('>>> Message ID:', info.messageId);
    console.log('>>> Response:', info.response);
    return info;
  } catch (err) {
    console.error('>>> ✗ SMTP ERROR caught!');
    console.error('>>> Error message:', err?.message);
    console.error('>>> Error code:', err?.code);
    
    // Provide helpful error messages
    if (err.code === 'EAUTH') {
      throw new Error('SMTP Authentication failed. Check your EMAIL_USER and EMAIL_PASS. If using Gmail, make sure you\'re using an App Password, not your regular password.');
    }
    
    if (err.code === 'ESOCKET' || err.code === 'ETIMEDOUT') {
      throw new Error('SMTP connection failed. Check your internet connection and firewall settings.');
    }
    
    console.error('>>> Full error object:', err);
    throw new Error(`SMTP error: ${err?.message || 'Unknown error'}`);
  }
};

export default transporter;
