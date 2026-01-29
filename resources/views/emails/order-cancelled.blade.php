<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>Order Cancelled</title>
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
                                    <td style="background-color: #8B7969; width: 72px; height: 72px; border-radius: 50%; text-align: center; vertical-align: middle; box-shadow: 0 4px 12px rgba(139, 121, 105, 0.25);">
                                        <span style="color: #ffffff; font-size: 36px; line-height: 72px; font-weight: 300;">!</span>
                                    </td>
                                </tr>
                            </table>
                            <h1 style="margin: 0 0 12px; color: #5a4a42; font-size: 34px; font-weight: 600; line-height: 1.2; letter-spacing: -0.5px;" class="mobile-font-xxl">Order Cancelled</h1>
                            <p style="margin: 0; color: #8B7969; font-size: 17px; line-height: 1.5; font-weight: 400;" class="mobile-font-md">Your order has been cancelled</p>
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td style="padding: 45px 45px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #ffffff;" class="mobile-padding">

                            <p style="margin: 0 0 10px; color: #5a4a42; font-size: 17px; line-height: 1.6; font-weight: 500;" class="mobile-font-sm">Assalamualaikum <strong style="color: #B9A292;">{{ $order->customer_name }}</strong>,</p>

                            <p style="margin: 0 0 28px; color: #6b5d52; font-size: 16px; line-height: 1.7;" class="mobile-font-sm">This email confirms that your order <strong style="color: #5a4a42;">#{{ $order->order_id }}</strong> has been cancelled.</p>

                            @if($order->cancellation_reason)
                            <!-- Reason Box -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 28px; background: #FEF6E7; border-radius: 10px; border-left: 4px solid #D4A574;">
                                <tr>
                                    <td style="padding: 24px;">
                                        <p style="margin: 0 0 10px; color: #8B6914; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Cancellation Reason</p>
                                        <p style="margin: 0; color: #6b5d52; font-size: 15px; line-height: 1.6;">{{ $order->cancellation_reason }}</p>
                                    </td>
                                </tr>
                            </table>
                            @endif

                            <p style="margin: 0 0 20px; color: #6b5d52; font-size: 16px; line-height: 1.7;" class="mobile-font-sm">If you've already made a payment, a refund will be processed according to our refund policy. Please allow 3-5 business days for the refund to reflect in your account.</p>

                            <p style="margin: 0 0 35px; color: #6b5d52; font-size: 16px; line-height: 1.7;" class="mobile-font-sm">If this was a mistake or if you have any questions, please reach out to our support team. We're here to help.</p>

                            <!-- CTA Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" class="mobile-btn" style="margin: 0 auto;">
                                <tr>
                                    <td style="border-radius: 6px; background-color: #8B7969; box-shadow: 0 4px 14px rgba(139, 121, 105, 0.25);">
                                        <a href="{{ route('home') }}" style="display: inline-block; padding: 17px 45px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; line-height: 1.4; letter-spacing: 0.3px;">Continue Shopping</a>
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
                                        <p style="margin: 0 0 10px; color: #6b5d52; font-size: 14px; line-height: 1.6;">We're always here to assist you with any questions or concerns.</p>
                                        <p style="margin: 0; color: #B9A292; font-size: 15px; font-weight: 600; letter-spacing: 0.3px;">JuneLabel</p>
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
