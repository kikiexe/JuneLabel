<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>Admin: Payment Received</title>
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
            .item-table td { font-size: 13px !important; padding: 12px 8px !important; }
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
                            <h1 style="margin: 0 0 16px; color: #1A1A1A; font-size: 42px; font-weight: 300; line-height: 1.1; letter-spacing: -0.02em;" class="mobile-title">Payment Received</h1>
                            <p style="margin: 0; color: #666666; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase;">Process This Order</p>
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

                            <!-- Order Number -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 32px;">
                                <tr>
                                    <td style="padding: 0 0 8px; color: #999999; font-size: 11px; font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase;">Order Number</td>
                                </tr>
                                <tr>
                                    <td style="padding: 0 0 24px; color: #1A1A1A; font-size: 18px; font-weight: 400; letter-spacing: -0.01em;">#{{ $order->order_id }}</td>
                                </tr>
                            </table>

                            <!-- Payment Details -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: #F8F8F8; border-left: 2px solid #1A1A1A; margin-bottom: 32px;">
                                <tr>
                                    <td style="padding: 24px 28px;">
                                        <p style="margin: 0 0 16px; color: #1A1A1A; font-size: 12px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase;">Payment Details</p>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding: 0 0 8px; color: #999999; font-size: 11px; font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase;">Status</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0 0 12px; color: #1A1A1A; font-size: 14px; font-weight: 400;">Successfully received</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0 0 8px; color: #999999; font-size: 11px; font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase;">Paid At</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0 0 12px; color: #1A1A1A; font-size: 14px; font-weight: 400;">{{ $order->paid_at ? $order->paid_at->format('d M Y, H:i') : 'N/A' }}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0 0 8px; color: #999999; font-size: 11px; font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase;">Method</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0 0 12px; color: #1A1A1A; font-size: 14px; font-weight: 400;">{{ $order->payment_method ?? 'Midtrans' }}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0 0 8px; color: #999999; font-size: 11px; font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase;">Transaction ID</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0; color: #666666; font-size: 13px; font-weight: 300; font-family: 'Courier New', monospace;">{{ $order->transaction_id ?? 'N/A' }}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Customer Information -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 32px;">
                                <tr>
                                    <td style="padding: 0 0 12px; color: #1A1A1A; font-size: 12px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase;">Customer Information</td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px 24px; background: #F8F8F8;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding: 0 0 8px; color: #999999; font-size: 11px; font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase;">Name</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0 0 12px; color: #1A1A1A; font-size: 14px; font-weight: 400;">{{ $order->customer_name }}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0 0 8px; color: #999999; font-size: 11px; font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase;">Email</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0 0 12px; color: #1A1A1A; font-size: 14px; font-weight: 400;">{{ $order->email }}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0 0 8px; color: #999999; font-size: 11px; font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase;">Phone</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0 0 12px; color: #1A1A1A; font-size: 14px; font-weight: 400;">{{ $order->customer_phone }}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0 0 8px; color: #999999; font-size: 11px; font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase;">Shipping Address</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0; color: #666666; font-size: 14px; font-weight: 300; line-height: 1.6;">{{ $order->shipping_address }}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Order Items -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 32px;">
                                <tr>
                                    <td colspan="3" style="padding: 0 0 16px; color: #1A1A1A; font-size: 12px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; border-bottom: 1px solid #E5E5E5;">Items</td>
                                </tr>
                                @foreach($order->orderItems as $item)
                                <tr class="item-table">
                                    <td style="padding: 14px 0; color: #999999; font-size: 14px; font-weight: 300; width: 50px; vertical-align: top;">{{ $item->quantity }}</td>
                                    <td style="padding: 14px 0; color: #1A1A1A; font-size: 14px; font-weight: 400; vertical-align: top;">{{ $item->product_name }}</td>
                                    <td style="padding: 14px 0; color: #1A1A1A; font-size: 14px; font-weight: 400; text-align: right; vertical-align: top;">Rp {{ number_format($item->unit_price, 0, ',', '.') }}</td>
                                </tr>
                                @endforeach
                                <tr>
                                    <td colspan="3" style="padding: 16px 0 0; border-top: 1px solid #E5E5E5;"></td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="padding: 12px 0; color: #666666; font-size: 14px; font-weight: 300;">Shipping Cost</td>
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

                            <!-- Action Required -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: #F8F8F8; border-left: 2px solid #666666; margin-bottom: 40px;">
                                <tr>
                                    <td style="padding: 24px 28px;">
                                        <p style="margin: 0 0 4px; color: #1A1A1A; font-size: 12px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase;">Action Required</p>
                                        <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.6; font-weight: 300;">Please process this order immediately and prepare items for shipping.</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- CTA Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="left">
                                        <a href="{{ url('/admin/orders/' . $order->id) }}" style="display: inline-block; padding: 18px 48px; background-color: #1A1A1A; color: #FFFFFF; text-decoration: none; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; transition: background-color 0.2s ease;">View in Admin Panel</a>
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
                            <p style="margin: 0 0 4px; color: #999999; font-size: 12px; line-height: 1.6; font-weight: 300;">JuneLabel Admin</p>
                            <p style="margin: 0; color: #CCCCCC; font-size: 12px; line-height: 1.6; font-weight: 300;">Automated payment notification</p>
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
