import sgMail from '@sendgrid/mail';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';
const EMAIL_FROM = process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@aevixchemical.com';

console.log('Mailer: Using SendGrid');
console.log('Mailer: SENDGRID_API_KEY set?', !!SENDGRID_API_KEY);
console.log('Mailer: EMAIL_FROM:', EMAIL_FROM);

if (!SENDGRID_API_KEY) {
  console.error('Mailer: ✗ SENDGRID_API_KEY is not set!');
  console.error('Mailer: Get your API key from: https://app.sendgrid.com/settings/api_keys');
  console.error('Mailer: Add to .env: SENDGRID_API_KEY=SG.xxxxx');
} else {
  sgMail.setApiKey(SENDGRID_API_KEY);
  console.log('Mailer: ✓ SendGrid initialized');
}

export const sendOtpMail = async (email, otp) => {
  console.log('>>> sendOtpMail called with email:', email);
  
  if (!SENDGRID_API_KEY) {
    console.error('>>> ERROR: No SendGrid API key!');
    throw new Error('SendGrid API key not configured. Set SENDGRID_API_KEY in your .env file.');
  }

  console.log('>>> SendGrid API key is set');
  console.log('>>> EMAIL_FROM:', EMAIL_FROM);

  try {
    console.log('>>> Preparing email message...');
    
    const msg = {
      to: email,
      from: EMAIL_FROM, // Must be verified sender in SendGrid
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

    console.log('>>> Calling SendGrid API...');
    const response = await sgMail.send(msg);
    console.log('>>> ✓ SendGrid response received');
    console.log('>>> Response status:', response[0]?.statusCode);
    console.log('>>> OTP sent successfully via SendGrid');
    return response;
  } catch (err) {
    console.error('>>> ✗ SendGrid ERROR caught!');
    console.error('>>> Error message:', err?.message);
    console.error('>>> Error code:', err?.code);
    
    if (err.response) {
      console.error('>>> SendGrid response body:', JSON.stringify(err.response.body, null, 2));
      console.error('>>> SendGrid response status:', err.response.statusCode);
      
      // Check for common SendGrid errors
      if (err.response.body?.errors) {
        const errors = err.response.body.errors;
        console.error('>>> SendGrid errors:', JSON.stringify(errors, null, 2));
        
        // Check if sender not verified
        if (errors.some(e => e.message?.includes('not verified') || e.message?.includes('does not have a verified'))) {
          throw new Error(`Sender email ${EMAIL_FROM} is not verified in SendGrid. Go to https://app.sendgrid.com/settings/sender_auth/senders and verify it.`);
        }
        
        // Check for API key issues
        if (err.response.statusCode === 401 || err.response.statusCode === 403) {
          throw new Error('SendGrid API key is invalid or doesn\'t have permission to send emails. Check your SENDGRID_API_KEY in .env');
        }
      }
    }
    
    console.error('>>> Full error object:', err);
    throw new Error(`SendGrid error: ${err?.message || 'Unknown error'}`);
  }
};

export default sgMail;
