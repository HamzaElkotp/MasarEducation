export async function sendOrderRecievedEmail(email:string, name:string, trackcode:string){
    try {
        const res = await fetch("/api/sendmail", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: email,
                subject: 'Your Health Insurance Application Has Been Received',
                html: `
                <!DOCTYPE html>
                <html>
                  <head>
                    <meta charset="UTF-8" />
                    <title>Application Received</title>
                  </head>
                  <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                      <h2 style="color: #103c5c;">Dear ${name},</h2>
                      <p>
                        Thank you for submitting your health insurance application to <strong style="color: #e85f5e">Masar Education</strong>.
                        We have successfully received your request, and our team is currently reviewing your documents.
                      </p>

                      <p><strong style="color: #e85f5e">Tracking Code:</strong> <span style="font-size: 16px; color: #374252;">${trackcode}</span></p>

                      <p>
                        You can check the current status of your application at any time by entering your tracking code on our website:
                      </p>

                      <div style="text-align: center; margin: 20px 0;">
                        <a
                          href="https://masartr.com/insurance/track?code=${trackcode}"
                          style="background: linear-gradient(to right, #e85f5e, #103c5c); color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;"
                        >
                          Check My Application Status
                        </a>
                      </div>

                      <p>
                        We appreciate your patience and will notify you once your application has been processed.
                      </p>

                      <p style="margin-top: 30px;">Best regards, <br />Masar Education Team</p>
                    </div>
                  </body>
                </html>                
                `,
            }),
        });

        const data = await res.json();

        if (data.success) {
            console.log('✅ Email sent!', data.result);
        } else {
            console.error('❌ Email send failed:', data.error);
            sendOrderRecievedEmail(email, name, trackcode);
        }
    } catch (error) {
        console.error('❌ Error calling API:', error);
    }
};


export async function orderApprovedEmail(email:string, name:string, trackcode:string){
    try {
        const res = await fetch("/api/sendmail", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: email,
                subject: 'Your Health Insurance Application Has Been Received',
                html: `
                <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="UTF-8" />
                        <title>Application Approved</title>
                    </head>
                    <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; color: #333;">
                        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                            <h2 style="color: #103c5c;">Dear ${name},</h2>

                            <p>We are pleased to inform you that your health insurance application has been <strong style="color: #103c5c">approved</strong>.</p>

                            <p><strong style="color: #e85f5e">Tracking Code:</strong> <span style="font-size: 16px; color: #374252;">${trackcode}</span></p>

                            <p>You can access and download your insurance policy at any time by entering your tracking code on our website:</p>

                            <div style="text-align: center; margin: 20px 0;">
                                <a
                                href="https://masartr.com/insurance/track?code=${trackcode}"
                                style="background: linear-gradient(to right, #e85f5e, #103c5c); color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;"
                                >
                                Check My Application Status
                                </a>
                            </div>

                            <p>If you have any questions or need further assistance, feel free to contact us.</p>

                            <p style="margin-top: 30px;">Best regards,<br />Masar Education Team</p>
                        </div>
                    </body>
                </html>             
                `,
            }),
        });

        const data = await res.json();

        if (data.success) {
            console.log('✅ Email sent!', data.result);
        } else {
            console.error('❌ Email send failed:', data.error);
            orderApprovedEmail(email, name, trackcode);
        }
    } catch (error) {
        console.error('❌ Error calling API:', error);
    }
};


export async function orderRejectedEmail(email:string, name:string, trackcode:string, rejectionReason:string){
    try {
        const res = await fetch("/api/sendmail", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: email,
                subject: 'Your Health Insurance Application Has Been Received',
                html: `
                <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="UTF-8" />
                        <title>Application Rejected</title>
                    </head>
                    <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; color: #333;">
                        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                            <h2 style="color: #FF001E;">Dear ${name},</h2>

                            <p>
                                We regret to inform you that your health insurance application has been <strong>rejected</strong> for the following reason:
                            </p>

                            <p style="background-color: #f8d7da; color: #721c24; padding: 12px; border-radius: 6px; border-left: 4px solid #FF002B;">
                                ${rejectionReason}
                            </p>

                            <p><strong>Tracking Code:</strong> <span style="font-size: 16px; color: #374252;">${trackcode}</span></p>

                            <p>You may review the status and details of your application at:</p>

                            <div style="text-align: center; margin: 20px 0;">
                                <a
                                href="https://masartr.com/insurance/track?code=${trackcode}"
                                style="background-color: #FF001E; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;"
                                >
                                Check My Application Status
                                </a>
                            </div>

                            <p>
                                If you have any questions or believe this decision was made in error, please contact us for clarification or to reapply.
                            </p>

                            <p style="margin-top: 30px;">Sincerely,<br />Masar Education Team</p>
                        </div>
                    </body>
                </html>          
                `,
            }),
        });

        const data = await res.json();

        if (data.success) {
            console.log('✅ Email sent!', data.result);
        } else {
            console.error('❌ Email send failed:', data.error);
            orderRejectedEmail(email, name, trackcode, rejectionReason);
        }
    } catch (error) {
        console.error('❌ Error calling API:', error);
    }
};


export async function orderReceivedEmail(email:string, trackcode:string){
    try {
        const res = await fetch("/api/sendmail", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: email,
                subject: 'Your Health Insurance Application Has Been Received',
                html: `
                <!DOCTYPE html>
                <html>
                  <head>
                    <meta charset="UTF-8" />
                    <title>New Order Received</title>
                  </head>
                  <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                      <h2 style="color: #103c5c;">Dear Admin,</h2>
                      <p>
                        New Order Was received to <strong style="color: #e85f5e">Masar Education</strong>.
                      </p>

                      <p><strong style="color: #e85f5e">Tracking Code:</strong> <span style="font-size: 16px; color: #374252;">${trackcode}</span></p>

                      <p>
                        You can check the current status of the order and manage it at any time By clicking this button:
                      </p>

                      <div style="text-align: center; margin: 20px 0;">
                        <a
                          href="https://masartr.com/admin/orders/insurance/${trackcode}"
                          style="background: linear-gradient(to right, #e85f5e, #103c5c); color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;"
                        >
                          Manage Order
                        </a>
                      </div>

                      <p style="margin-top: 30px;">Best regards, <br />From yourself To yourself</p>
                    </div>
                  </body>
                </html>         
                `,
            }),
        });

        const data = await res.json();

        if (data.success) {
            console.log('✅ Email sent!', data.result);
        } else {
            console.error('❌ Email send failed:', data.error);
            orderReceivedEmail(email, trackcode);
        }
    } catch (error) {
        console.error('❌ Error calling API:', error);
    }
};