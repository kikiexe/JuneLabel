<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>Order Cancelled</title>
    <style type="text/css">
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap');

        body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }

        @media only screen and (max-width: 600px) {
            .email-container { width: 100% !important; }
            .mobile-padding { padding: 40px 24px !important; }
            .mobile-title { font-size: 32px !important; line-height: 1.2 !important; }
            .mobile-text { font-size: 15px !important; }
            .mobile-btn { width: 100% !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #FAFAFA; width: 100%;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #FAFAFA;">
        <tr>
            <td style="padding: 60px 20px;">

                <table role="presentation" class="email-container" cellspacing="0" cellpadding="0" border="0" align="center" width="560" style="margin: auto; max-width: 560px; width: 100%; background: #FFFFFF;">

                    <!-- Minimal Top Border -->
                    <tr>
                        <td style="height: 1px; background-color: #1A1A1A;"></td>
                    </tr>

                    <!-- Header -->
                    <tr>
                        <td style="padding: 72px 64px 48px; font-family: 'Cormorant', Georgia, serif;" class="mobile-padding">
                            <h1 style="margin: 0 0 16px; color: #1A1A1A; font-size: 42px; font-weight: 300; line-height: 1.1; letter-spacing: -0.02em;" class="mobile-title">Order Cancelled</h1>
                            <p style="margin: 0; color: #666666; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase;">Cancellation Confirmed</p>
                        </td>
                    </tr>

                    <!-- Divider Line -->
                    <tr>
                        <td style="padding: 0 64px;" class="mobile-padding">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="border-top: 1px solid #E5E5E5;"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td style="padding: 48px 64px 56px; font-family: 'Inter', sans-serif;" class="mobile-padding">

                            <p style="margin: 0 0 8px; color: #1A1A1A; font-size: 16px; line-height: 1.6; font-weight: 400;" class="mobile-text">Assalamualaikum {{ $order->customer_name }},</p>

                            <p style="margin: 0 0 40px; color: #4A4A4A; font-size: 16px; line-height: 1.7; font-weight: 300;" class="mobile-text">Your order #{{ $order->order_id }} has been cancelled as requested.</p>

                            @if($order->cancellation_reason)
                            <!-- Cancellation Reason -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: #F8F8F8; border-left: 2px solid #1A1A1A; margin-bottom: 40px;">
                                <tr>
                                    <td style="padding: 24px 28px;">
                                        <p style="margin: 0 0 4px; color: #1A1A1A; font-size: 12px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase;">Cancellation Reason</p>
                                        <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.6; font-weight: 300;">{{ $order->cancellation_reason }}</p>
                                    </td>
                                </tr>
                            </table>
                            @endif

                            <p style="margin: 0 0 24px; color: #4A4A4A; font-size: 16px; line-height: 1.7; font-weight: 300;" class="mobile-text">If you have already made a payment, a refund will be processed according to our refund policy. Please allow 3-5 business days for the refund to reflect in your account.</p>

                            <p style="margin: 0 0 48px; color: #4A4A4A; font-size: 16px; line-height: 1.7; font-weight: 300;" class="mobile-text">If this cancellation was made in error or if you have any questions, please contact our support team.</p>

                            <!-- CTA Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="left">
                                        <a href="{{ route('home') }}" style="display: inline-block; padding: 18px 48px; background-color: #1A1A1A; color: #FFFFFF; text-decoration: none; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; transition: background-color 0.2s ease;">Continue Shopping</a>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    <!-- Footer Divider -->
                    <tr>
                        <td style="padding: 0 64px;" class="mobile-padding">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="border-top: 1px solid #E5E5E5;"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 40px 64px 56px; font-family: 'Inter', sans-serif;" class="mobile-padding">
                            <p style="margin: 0 0 4px; color: #999999; font-size: 12px; line-height: 1.6; font-weight: 300;">Questions? Contact us at support@junelabel.com</p>
                            <p style="margin: 0; color: #CCCCCC; font-size: 12px; line-height: 1.6; font-weight: 300;">JuneLabel — Modest fashion, modern elegance</p>
                        </td>
                    </tr>

                    <!-- Minimal Bottom Border -->
                    <tr>
                        <td style="height: 1px; background-color: #1A1A1A;"></td>
                    </tr>

                </table>

                <!-- Copyright -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="560" style="margin: 32px auto 0; max-width: 560px; width: 100%;">
                    <tr>
                        <td style="padding: 0 20px; text-align: center; font-family: 'Inter', sans-serif;">
                            <p style="margin: 0; color: #CCCCCC; font-size: 11px; line-height: 1.6; font-weight: 300;">© {{ date('Y') }} JuneLabel. All rights reserved.</p>
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>
</body>
</html>
