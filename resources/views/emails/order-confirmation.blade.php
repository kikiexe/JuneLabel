<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>Order Confirmation</title>
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
            .item-table td { font-size: 13px !important; padding: 14px 8px !important; }
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
                            <h1 style="margin: 0 0 16px; color: #1A1A1A; font-size: 42px; font-weight: 300; line-height: 1.1; letter-spacing: -0.02em;" class="mobile-title">Order Confirmed</h1>
                            <p style="margin: 0; color: #666666; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase;">Thank You for Your Purchase</p>
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

                            <p style="margin: 0 0 40px; color: #4A4A4A; font-size: 16px; line-height: 1.7; font-weight: 300;" class="mobile-text">We have received your order and it is currently being processed. You will receive a notification once your items have been shipped.</p>

                            <!-- Order Info -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 40px;">
                                <tr>
                                    <td style="padding: 0 0 8px; color: #999999; font-size: 11px; font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase;">Order Number</td>
                                </tr>
                                <tr>
                                    <td style="padding: 0 0 16px; color: #1A1A1A; font-size: 18px; font-weight: 400; letter-spacing: -0.01em;">#{{ $order->order_id }}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 0 0 8px; color: #999999; font-size: 11px; font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase;">Order Date</td>
                                </tr>
                                <tr>
                                    <td style="padding: 0 0 16px; color: #666666; font-size: 14px; font-weight: 300;">{{ $order->created_at->format('d M Y, H:i') }}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 0 0 8px; color: #999999; font-size: 11px; font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase;">Payment Status</td>
                                </tr>
                                <tr>
                                    <td style="padding: 0 0 24px; color: #666666; font-size: 14px; font-weight: 300;">{{ $order->payment_status->value ?? $order->payment_status }}</td>
                                </tr>
                            </table>

                            <!-- Order Items -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 32px;">
                                <tr>
                                    <td colspan="3" style="padding: 0 0 16px; color: #1A1A1A; font-size: 12px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; border-bottom: 1px solid #E5E5E5;">Items</td>
                                </tr>
                                @foreach($order->orderItems as $item)
                                <tr class="item-table">
                                    <td style="padding: 16px 0; color: #999999; font-size: 14px; font-weight: 300; width: 50px; vertical-align: top;">{{ $item->quantity }}</td>
                                    <td style="padding: 16px 0; color: #1A1A1A; font-size: 14px; font-weight: 400; vertical-align: top;">{{ $item->product_name }}</td>
                                    <td style="padding: 16px 0; color: #1A1A1A; font-size: 14px; font-weight: 400; text-align: right; vertical-align: top;">Rp {{ number_format($item->subtotal, 0, ',', '.') }}</td>
                                </tr>
                                @endforeach
                                <tr>
                                    <td colspan="3" style="padding: 16px 0 0; border-top: 1px solid #E5E5E5;"></td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="padding: 12px 0; color: #666666; font-size: 14px; font-weight: 300;">Subtotal</td>
                                    <td style="padding: 12px 0; color: #666666; font-size: 14px; font-weight: 300; text-align: right;">Rp {{ number_format($order->subtotal, 0, ',', '.') }}</td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="padding: 12px 0; color: #666666; font-size: 14px; font-weight: 300;">Shipping</td>
                                    <td style="padding: 12px 0; color: #666666; font-size: 14px; font-weight: 300; text-align: right;">Rp {{ number_format($order->shipping_cost, 0, ',', '.') }}</td>
                                </tr>
                                <tr>
                                    <td colspan="3" style="padding: 16px 0 0; border-top: 1px solid #1A1A1A;"></td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="padding: 16px 0; color: #1A1A1A; font-size: 16px; font-weight: 500;">Total</td>
                                    <td style="padding: 16px 0; color: #1A1A1A; font-size: 16px; font-weight: 500; text-align: right;">Rp {{ number_format($order->gross_amount, 0, ',', '.') }}</td>
                                </tr>
                            </table>

                            <!-- Shipping Address -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 40px;">
                                <tr>
                                    <td style="padding: 0 0 12px; color: #1A1A1A; font-size: 12px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase;">Shipping Address</td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px 24px; background: #F8F8F8; color: #4A4A4A; font-size: 14px; line-height: 1.7; font-weight: 300; white-space: pre-line;">{{ $order->shipping_address }}</td>
                                </tr>
                            </table>

                            @if($order->payment_status === \App\Enum\PaymentStatus::Pending)
                            <!-- Payment Notice -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: #F8F8F8; border-left: 2px solid #1A1A1A; margin-bottom: 40px;">
                                <tr>
                                    <td style="padding: 24px 28px;">
                                        <p style="margin: 0 0 4px; color: #1A1A1A; font-size: 12px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase;">Payment Required</p>
                                        <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.6; font-weight: 300;">Please complete your payment at your earliest convenience to proceed with your order.</p>
                                    </td>
                                </tr>
                            </table>
                            @endif

                            <!-- CTA Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="left">
                                        <a href="{{ route('my.orders') }}" style="display: inline-block; padding: 18px 48px; background-color: #1A1A1A; color: #FFFFFF; text-decoration: none; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; transition: background-color 0.2s ease;">View Order Status</a>
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
