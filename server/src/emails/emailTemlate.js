

export function createUserVerificationTemplate(name, clientURL) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to Gettystories</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif; color:#333;">
  <div style="max-width:600px; margin:0 auto; padding:30px 20px;">
    
    <!-- Header -->
    <div style="background-color:#1f2937; padding:30px; text-align:center; border-radius:8px 8px 0 0;">
      <h1 style="color:#ffffff; margin:0; font-size:26px; font-weight:600;">
        Welcome to Gettystories
      </h1>
      <p style="color:#d1d5db; margin-top:10px; font-size:14px;">
        Where your words meet the world
      </p>
    </div>

    <!-- Body -->
    <div style="background-color:#ffffff; padding:30px; border-radius:0 0 8px 8px;">
      <p style="font-size:16px; margin-top:0;">
        Hello <strong>${name}</strong>,
      </p>

      <p style="font-size:15px; line-height:1.6;">
        We’re delighted to welcome you to <strong>Gettystories</strong> — a community built for writers who want their stories to inspire, inform, and connect with readers across the globe.
      </p>

      <p style="font-size:15px; line-height:1.6;">
        Whether you write to educate, entertain, or express yourself, Gettystories gives your voice a home and your ideas a platform.
      </p>

      <!-- Steps -->
      <div style="background-color:#f9fafb; padding:20px; border-radius:6px; margin:25px 0;">
        <p style="margin-top:0; font-size:15px;"><strong>Getting started is easy:</strong></p>
        <ul style="padding-left:18px; margin:0; font-size:14px;">
          <li style="margin-bottom:8px;">Complete your writer profile</li>
          <li style="margin-bottom:8px;">Explore topics and communities</li>
          <li style="margin-bottom:8px;">Publish your first story</li>
          <li>Engage with readers and fellow writers</li>
        </ul>
      </div>

      <!-- CTA -->
      <div style="text-align:center; margin:30px 0;">
        <span style="background: linear-gradient(to right, #36D1DC, #5B86E5); color: white; text-decoration: none; padding: 12px 30px; border-radius: 50px; font-weight: 500; display: inline-block;">${clientURL}</span>
      </div>

      <p style="font-size:14px; line-height:1.6;">
        If you have any questions or need assistance, our team is always happy to help.
      </p>

      <p style="font-size:14px; margin-bottom:0;">
        Happy writing,<br />
        <strong>The Gettystories Team</strong>
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align:center; padding:20px 10px; font-size:12px; color:#9ca3af;">
      <p style="margin:0;">© ${new Date().getFullYear()} Gettystories. All rights reserved.</p>
      <p style="margin-top:8px;">
        <a href="#" style="color:#2563eb; text-decoration:none; margin:0 8px;">Privacy Policy</a>
        |
        <a href="#" style="color:#2563eb; text-decoration:none; margin:0 8px;">Terms of Service</a>
      </p>
    </div>

  </div>
</body>
</html>`;
}

export function createResetPasswordTemplate(name, resetURL) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Your Password</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif; color:#333;">
  <div style="max-width:600px; margin:0 auto; padding:30px 20px;">

    <!-- Header -->
    <div style="background-color:#111827; padding:28px; text-align:center; border-radius:8px 8px 0 0;">
      <h1 style="color:#ffffff; margin:0; font-size:24px; font-weight:600;">
        Reset Your Password
      </h1>
    </div>

    <!-- Body -->
    <div style="background-color:#ffffff; padding:30px; border-radius:0 0 8px 8px;">
      <p style="font-size:16px; margin-top:0;">
        Hello <strong>${name}</strong>,
      </p>

      <p style="font-size:15px; line-height:1.6;">
        We received a request to reset your password for your <strong>Gettystories</strong> account.
      </p>

      <p style="font-size:15px; line-height:1.6;">
        Click the button below to create a new password. This link is valid for a limited time for your security.
      </p>

      <!-- CTA -->
      <div style="text-align:center; margin:30px 0;">
        <a href="${resetURL}"
           style="background-color:#dc2626; color:#ffffff; text-decoration:none; padding:12px 30px; border-radius:6px; font-size:15px; font-weight:500; display:inline-block;">
          Reset Password
        </a>
      </div>

      <!-- Fallback -->
      <p style="font-size:14px; line-height:1.6; color:#555;">
        If the button above doesn’t work, copy and paste the link below into your browser:
      </p>

      <p style="word-break:break-all; font-size:13px; background-color:#f9fafb; padding:12px; border-radius:6px; color:#111;">
        ${resetURL}
      </p>

      <p style="font-size:14px; line-height:1.6; margin-top:20px;">
        If you didn’t request a password reset, you can safely ignore this email — your account remains secure.
      </p>

      <p style="font-size:14px; margin-bottom:0;">
        Regards,<br />
        <strong>The Gettystories Security Team</strong>
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align:center; padding:20px 10px; font-size:12px; color:#9ca3af;">
      <p style="margin:0;">© ${new Date().getFullYear()} Gettystories. All rights reserved.</p>
      <p style="margin-top:8px;">
        <a href="#" style="color:#2563eb; text-decoration:none; margin:0 8px;">Privacy Policy</a>
        |
        <a href="#" style="color:#2563eb; text-decoration:none; margin:0 8px;">Contact Support</a>
      </p>
    </div>

  </div>
</body>
</html>`;
}
