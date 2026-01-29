<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>Reset Your Password</title>
    <style type="text/css">
        body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }

        @media only screen and (max-width: 600px) {
            .email-container { width: 100% !important; }
            .mobile-padding { padding: 30px 20px !important; }
            .mobile-header-padding { padding: 40px 20px !important; }
            .mobile-font-xxl { font-size: 28px !important; }
            .mobile-font-xl { font-size: 22px !important; }
            .mobile-font-lg { font-size: 18px !important; }
            .mobile-font-md { font-size: 16px !important; }
            .mobile-font-sm { font-size: 15px !important; }
            .mobile-btn { display: block !important; width: 100% !important; }
        }

        @media only screen and (max-width: 400px) {
            .mobile-padding { padding: 25px 15px !important; }
            .mobile-header-padding { padding: 35px 15px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF4E5; width: 100%;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #FAF4E5;">
        <tr>
            <td style="padding: 40px 10px;">

                <table role="presentation" class="email-container" cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="margin: auto; max-width: 600px; width: 100%; background: #ffffff; border-radius: 0; box-shadow: 0 4px 20px rgba(185, 162, 146, 0.12); overflow: hidden;">

                    <!-- Decorative Top Bar -->
                    <tr>
                        <td style="height: 6px; background: linear-gradient(90deg, #B9A292 0%, #DEC7B5 50%, #E5CCC0 100%);"></td>
                    </tr>

                    <!-- Header -->
                    <tr>
                        <td style="padding: 50px 40px; text-align: center; background-color: #FAF4E5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;" class="mobile-header-padding">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin-bottom: 20px;">
                                <tr>
                                    <td style="background-color: #B9A292; width: 72px; height: 72px; border-radius: 50%; text-align: center; vertical-align: middle; box-shadow: 0 4px 12px rgba(185, 162, 146, 0.25);">
                                        <span style="color: #ffffff; font-size: 36px; line-height: 72px; font-weight: 300;">🔑</span>
                                    </td>
                                </tr>
                            </table>
                            <h1 style="margin: 0 0 12px; color: #5a4a42; font-size: 34px; font-weight: 600; line-height: 1.2; letter-spacing: -0.5px;" class="mobile-font-xxl">Reset Password</h1>
                            <p style="margin: 0; color: #8B7969; font-size: 17px; line-height: 1.5; font-weight: 400;" class="mobile-font-md">Secure your account</p>
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td style="padding: 45px 45px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #ffffff;" class="mobile-padding">

                            <p style="margin: 0 0 10px; color: #5a4a42; font-size: 17px; line-height: 1.6; font-weight: 500;" class="mobile-font-sm">Assalamualaikum,</p>

                            <p style="margin: 0 0 20px; color: #6b5d52; font-size: 16px; line-height: 1.7;" class="mobile-font-sm">We received a request to reset the password for your JuneLabel account associated with this email address.</p>

                            <p style="margin: 0 0 35px; color: #6b5d52; font-size: 16px; line-height: 1.7;" class="mobile-font-sm">Click the button below to create a new password:</p>

                            <!-- CTA Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" class="mobile-btn" style="margin: 0 auto 35px;">
                                <tr>
                                    <td style="border-radius: 6px; background-color: #B9A292; box-shadow: 0 4px 14px rgba(185, 162, 146, 0.30);">
                                        <a href="{{ $resetUrl }}" style="display: inline-block; padding: 17px 45px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; line-height: 1.4; letter-spacing: 0.3px;">Reset Password</a>
                                    </td>
                                </tr>
                            </table>

                            <!-- Alternative Link -->
                            <p style="margin: 0 0 10px; color: #8B7969; font-size: 14px; line-height: 1.6; text-align: center;">If the button doesn't work, copy and paste this link into your browser:</p>
                            <p style="margin: 0 0 35px; color: #B9A292; font-size: 13px; line-height: 1.6; text-align: center; word-break: break-all;">{{ $resetUrl }}</p>

                            <!-- Security Notice -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: #FFF9F0; border-radius: 8px; border-left: 4px solid #B9A292; margin-bottom: 25px;">
                                <tr>
                                    <td style="padding: 20px 24px;">
                                        <p style="margin: 0 0 8px; color: #5a4a42; font-size: 14px; font-weight: 600; line-height: 1.4;">🔒 Security Notice</p>
                                        <p style="margin: 0; color: #6b5d52; font-size: 13px; line-height: 1.6;">This password reset link will expire in <strong>60 minutes</strong>. For your security, we recommend using a strong, unique password.</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Warning Notice -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: #FFF0F0; border-radius: 8px; border-left: 4px solid #D9534F;">
                                <tr>
                                    <td style="padding: 20px 24px;">
                                        <p style="margin: 0 0 8px; color: #8B3A3A; font-size: 14px; font-weight: 600; line-height: 1.4;">⚠️ Didn't Request This?</p>
                                        <p style="margin: 0; color: #6b5d52; font-size: 13px; line-height: 1.6;">If you didn't request a password reset, please ignore this email or contact our support team immediately. Your password will remain unchanged.</p>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    <!-- Divider -->
                    <tr>
                        <td style="padding: 0 45px;" class="mobile-padding">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="border-top: 1px solid #E4E5DD;"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer Info -->
                    <tr>
                        <td style="padding: 35px 45px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #ffffff;" class="mobile-padding">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #FAF4E5 0%, #E4E5DD 100%); border-radius: 8px; border: 1px solid #DEC7B5;">
                                <tr>
                                    <td style="padding: 28px;">
                                        <p style="margin: 0 0 10px; color: #6b5d52; font-size: 14px; line-height: 1.6;">Need help? Contact our customer service team at:</p>
                                        <p style="margin: 0; color: #B9A292; font-size: 15px; font-weight: 600; letter-spacing: 0.3px;">support@junelabel.com</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Decorative Bottom Bar -->
                    <tr>
                        <td style="height: 6px; background: linear-gradient(90deg, #E5CCC0 0%, #DEC7B5 50%, #B9A292 100%);"></td>
                    </tr>

                </table>

                <!-- Email Footer -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="margin: 30px auto 0; max-width: 600px; width: 100%;">
                    <tr>
                        <td style="padding: 0 20px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                            <p style="margin: 0 0 8px; color: #B9A292; font-size: 13px; line-height: 1.6;">© {{ date('Y') }} JuneLabel. All rights reserved.</p>
                            <p style="margin: 0; color: #DEC7B5; font-size: 13px; line-height: 1.6;">Modest fashion, modern elegance</p>
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>
</body>
</html>
