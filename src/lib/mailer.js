import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
})

export async function sendContactEmail({ name, email, message }) {
  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    replyTo: email,
    subject: `New Contact Form Message from ${name}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: 'Segoe UI', sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .wrapper {
              max-width: 600px;
              margin: 40px auto;
              background-color: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            }
            .header {
              background-color: #1C1F24;
              padding: 32px 40px;
              text-align: center;
            }
            .header h1 {
              color: #C96A4A;
              font-size: 24px;
              margin: 0;
              letter-spacing: 1px;
            }
            .header p {
              color: rgba(255,255,255,0.4);
              font-size: 12px;
              margin: 8px 0 0;
              font-family: monospace;
            }
            .body {
              padding: 40px;
            }
            .label {
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              color: #C96A4A;
              font-weight: 600;
              margin-bottom: 6px;
            }
            .value {
              font-size: 15px;
              color: #1C1F24;
              margin-bottom: 24px;
              padding: 12px 16px;
              background: #f9f7f5;
              border-radius: 8px;
              border-left: 3px solid #C96A4A;
            }
            .message-box {
              font-size: 15px;
              color: #1C1F24;
              padding: 16px;
              background: #CCD5FF;
              border-radius: 8px;
              border-left: 3px solid #C96A4A;
              line-height: 1.7;
              white-space: pre-wrap;
            }
            .footer {
              background-color: #1C1F24;
              padding: 20px 40px;
              text-align: center;
            }
            .footer p {
              color: rgba(255,255,255,0.2);
              font-size: 11px;
              margin: 0;
              font-family: monospace;
            }
            .reply-btn {
              display: inline-block;
              margin-top: 28px;
              padding: 12px 28px;
              background-color: #C96A4A;
              color: #ffffff;
              text-decoration: none;
              border-radius: 50px;
              font-size: 14px;
              font-weight: 600;
            }
            .divider {
              height: 1px;
              background: #f0ebe6;
              margin: 8px 0 24px;
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <h1>New Message Received</h1>
              <p>${new Date().toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}</p>
            </div>

            <div class="body">
              <div class="label">Sender Name</div>
              <div class="value">${name}</div>

              <div class="label">Email Address</div>
              <div class="value">${email}</div>

              <div class="divider"></div>

              <div class="label">Message</div>
              <div class="message-box">${message}</div>

              <div style="text-align: center;">
                <a href="mailto:${email}" class="reply-btn">
                  Reply to ${name} →
                </a>
              </div>
            </div>

            <div class="footer">
              <p>This email was sent from your portfolio contact form</p>
              <p style="margin-top: 6px;">Dev.Portfolio © ${new Date().getFullYear()}</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }

  await transporter.sendMail(mailOptions)
}