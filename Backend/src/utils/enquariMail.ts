interface EmailOptions {
  firstName: string;
  lastName: string;
  email: string;
  serviceNeeded: string;
  budget: number;
  message: string;
}

async function sendEmail({ firstName, lastName, email, serviceNeeded, budget, message }: EmailOptions): Promise<boolean> {
  const mailServiceUrl: string = process.env.MAIL_SERVICE_URL || "";
  const recipient: string = process.env.DEFAULT_EMAIL_RECEPITENT || "";
  const subject: string = `Enquiry Mail From ${firstName} for ${serviceNeeded}`;

  if (!mailServiceUrl || !recipient) {
    console.error("Missing MAIL_SERVICE_URL or DEFAULT_EMAIL_RECEPITENT configuration");
    return false;
  }

  const html = `
    <div style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333333; -webkit-font-smoothing: antialiased;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f6f9; padding: 40px 0;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
          <tr>
            <td align="center" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); background-color: #0f172a; padding: 36px 30px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 24px; font-weight: 700; margin: 0; tracking: 0.5px;">
                Silver Pixel Soft
              </h1>
              <p style="color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; margin: 6px 0 0 0; font-weight: 600;">
                New Service Inquiry Received
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 40px 10px 40px;">
              <h2 style="color: #0f172a; font-size: 18px; margin: 0 0 10px 0; font-weight: 600;">
                Hello Team,
              </h2>
              <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0;">
                You have received a new contact inquiry from the Silver Pixel Soft. Below are the details provided by the potential client:
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 15px 20px;">
                <tr>
                  <td width="35%" style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #64748b; border-bottom: 1px solid #edf2f7;">
                    Client Name:
                  </td>
                  <td width="65%" style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #0f172a; border-bottom: 1px solid #edf2f7;">
                    ${firstName} ${lastName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #64748b; border-bottom: 1px solid #edf2f7;">
                    Email Address:
                  </td>
                  <td style="padding: 10px 0; font-size: 14px; color: #2563eb; border-bottom: 1px solid #edf2f7;">
                    <a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #64748b; border-bottom: 1px solid #edf2f7;">
                    Service Needed:
                  </td>
                  <td style="padding: 10px 0; font-size: 14px; color: #0f172a; border-bottom: 1px solid #edf2f7;">
                    <span style="background-color: #e0f2fe; color: #0369a1; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; display: inline-block;">
                      ${serviceNeeded}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #64748b;">
                    Estimated Budget:
                  </td>
                  <td style="padding: 10px 0; font-size: 15px; font-weight: 700; color: #16a34a;">
                    ₹${budget}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <h3 style="color: #0f172a; font-size: 14px; font-weight: 600; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">
                Message / Inquiry Details:
              </h3>
              <div style="background-color: #ffffff; border-left: 4px solid #3b82f6; padding: 15px 20px; font-size: 14px; color: #334155; line-height: 1.6; border-top: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9; border-radius: 0 6px 6px 0;">
                ${message}
              </div>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 0 40px 35px 40px;">
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="background-color: #2563eb; border-radius: 6px;">
                    <a href="mailto:${email}?subject=Re:%20Inquiry%20regarding%20${serviceNeeded}" target="_blank" style="display: inline-block; padding: 12px 28px; font-size: 14px; color: #ffffff; font-weight: 600; text-decoration: none; border-radius: 6px;">
                      Reply to Inquiry
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #94a3b8; font-size: 12px; margin: 0 0 6px 0;">
                Sent automatically via Website Contact Form | <a href="https://silver-pixel-soft.pages.dev/" style="color: #64748b; text-decoration: underline;" target="_blank">Silver Pixel Soft</a>
              </p>
              <p style="color: #cbd5e1; font-size: 11px; margin: 0;">
                © Silver Pixel Soft. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</div>
  `;

  try {
    const response = await fetch(mailServiceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipients: recipient,
        subject,
        body: html,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Mail service responded with error (status ${response.status}):`, errorText);
      return false;
    }

    const data = await response.json();
    return true;
  } catch (error) {
    console.error("Failed to send email via mail service:", error);
    return false;
  }
}

export { sendEmail };
