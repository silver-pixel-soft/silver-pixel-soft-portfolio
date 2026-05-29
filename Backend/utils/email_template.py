def email_template(first_name, last_name, email, service_needed, budget, project_description):
  return f"""
  <div style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; -webkit-font-smoothing: antialiased; width: 100% !important;">

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f6f8; padding: 40px 10px;">
        <tr>
            <td align="center">
                
                <table role="presentation" width="100%" max-width="600px" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                    
                    <tr>
                        <td style="background-color: #1e293b; padding: 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: 0.5px;">New Project Inquiry  from Silver Pixel Soft</h1>
                            <p style="margin: 5px 0 0 0; color: #94a3b8; font-size: 14px;">A user has submitted a contact form.</p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="margin: 0 0 25px 0; font-size: 16px; line-height: 1.5; color: #334155;">
                                Hello Team,
                            </p>
                            <p style="margin: 0 0 25px 0; font-size: 16px; line-height: 1.5; color: #334155;">
                                You have received a new service request. Here are the details submitted by the prospect:
                            </p>

                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse: collapse; margin-bottom: 30px;">
                                
                                <tr>
                                    <td width="35%" style="padding: 12px 10px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 600; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">Full Name</td>
                                    <td width="65%" style="padding: 12px 10px; border-bottom: 1px solid #e2e8f0; font-size: 15px; color: #0f172a;">{first_name} {last_name}</td>
                                </tr>

                                <tr>
                                    <td style="padding: 12px 10px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 600; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">Email Address</td>
                                    <td style="padding: 12px 10px; border-bottom: 1px solid #e2e8f0; font-size: 15px; color: #2563eb; font-weight: 500;"><a href="mailto:{email}" style="color: #2563eb; text-decoration: none;">{email}</a></td>
                                </tr>

                                <tr>
                                    <td style="padding: 12px 10px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 600; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">Service Needed</td>
                                    <td style="padding: 12px 10px; border-bottom: 1px solid #e2e8f0; font-size: 15px; color: #0f172a;"><span style="background-color: #f1f5f9; padding: 4px 8px; border-radius: 4px; font-weight: 500; color: #1e293b;">{service_needed}</span></td>
                                </tr>

                                <tr>
                                    <td style="padding: 12px 10px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 600; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">Estimated Budget</td>
                                    <td style="padding: 12px 10px; border-bottom: 1px solid #e2e8f0; font-size: 15px; font-weight: 600; color: #16a34a;">₹ {budget}</td>
                                </tr>

                                <tr>
                                    <td colspan="2" style="padding: 20px 10px 8px 10px; font-size: 14px; font-weight: 600; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">Project Description</td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="padding: 12px 15px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 15px; line-height: 1.6; color: #334155; white-space: pre-line;">
                                        {project_description}
                                    </td>
                                </tr>
                            </table>

                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td align="center" style="padding-top: 10px;">
                                        <a href="mailto:{email}?subject=Re:Your Inquiry for [service_needed]" style="background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 30px; font-size: 15px; font-weight: 600; border-radius: 5px; display: inline-block; transition: background-color 0.2s ease;">
                                            Reply to Lead
                                        </a>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    <tr>
                        <td style="background-color: #f8fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                            <p style="margin: 0; font-size: 12px; color: #94a3b8; line-height: 1.5;">
                                This is an automated notification from your website's contact form.
                            </p>
                        </td>
                    </tr>

                </table>
                </td>
        </tr>
    </table>

</div>
  """