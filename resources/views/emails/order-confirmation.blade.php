<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>Order Confirmation</title>
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
            .item-table td { font-size: 12px !important; padding: 10px 6px !important; }
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
                        <td style="padding: 45px 40px 35px; text-align: center; background: linear-gradient(135deg, #E5CCC0 0%, #DEC7B5 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;" class="mobile-header-padding">
                            <h1 style="margin: 0 0 8px; color: #5a4a42; font-size: 32px; font-weight: 700; line-height: 1.2; letter-spacing: -0.5px;" class="mobile-font-xxl">Thank You for Your Order!</h1>
                            <p style="margin: 0; color: #6b5d52; font-size: 16px; line-height: 1.5; font-weight: 500;" class="mobile-font-md">Order confirmation</p>
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td style="padding: 40px 45px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #ffffff;" class="mobile-padding">

                            <h2 style="margin: 0 0 25px; color: #5a4a42; font-size: 24px; font-weight: 600; line-height: 1.3;" class="mobile-font-xl">Assalamualaikum {{ $order->customer_name }},</h2>
                            <p style="margin: 0 0 30px; color: #6b5d52; font-size: 16px; line-height: 1.6;">We have received your order <strong style="color: #B9A292;">#{{ $order->order_id }}</strong> and it is currently being processed.</p>

                            <!-- Order Info Box -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 30px; background: #FAF4E5; border-radius: 8px; border: 1px solid #E4E5DD;">
                                <tr>
                                    <td style="padding: 24px;">
                                        <p style="margin: 0 0 10px; color: #5a4a42; font-size: 15px; line-height: 1.6;"><strong style="color: #B9A292;">Order ID:</strong> #{{ $order->order_id }}</p>
                                        <p style="margin: 0 0 10px; color: #5a4a42; font-size: 15px; line-height: 1.6;"><strong style="color: #B9A292;">Date:</strong> {{ $order->created_at->format('d M Y, H:i') }}</p>
                                        <p style="margin: 0; color: #5a4a42; font-size: 15px; line-height: 1.6;"><strong style="color: #B9A292;">Payment Status:</strong> {{ $order->payment_status->value ?? $order->payment_status }}</p>
                                    </td>
                                </tr>
                            </table>

                            <h3 style="margin: 0 0 15px; color: #5a4a42; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;" class="mobile-font-sm">Order Items</h3>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="item-table" style="margin: 0 0 20px;">
                                @foreach($order->orderItems as $item)
                                <tr>
                                    <td style="padding: 12px 10px; border-bottom: 1px solid #E4E5DD; font-size: 14px; color: #6b5d52; width: 15%;">{{ $item->quantity }}x</td>
                                    <td style="padding: 12px 10px; border-bottom: 1px solid #E4E5DD; font-size: 14px; color: #5a4a42; font-weight: 500;">{{ $item->product_name }}</td>
                                    <td style="padding: 12px 10px; border-bottom: 1px solid #E4E5DD; font-size: 14px; color: #5a4a42; text-align: right;">Rp {{ number_format($item->subtotal, 0, ',', '.') }}</td>
                                </tr>
                                @endforeach
                                <tr>
                                    <td colspan="2" style="padding: 12px 10px; border-bottom: 1px solid #E4E5DD; font-size: 14px; color: #5a4a42;">Subtotal</td>
                                    <td style="padding: 12px 10px; border-bottom: 1px solid #E4E5DD; font-size: 14px; color: #5a4a42; text-align: right;">Rp {{ number_format($order->subtotal, 0, ',', '.') }}</td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="padding: 12px 10px; border-bottom: 2px solid #B9A292; font-size: 14px; color: #5a4a42; font-weight: 600;">Shipping Cost</td>
                                    <td style="padding: 12px 10px; border-bottom: 2px solid #B9A292; font-size: 14px; color: #5a4a42; font-weight: 600; text-align: right;">Rp {{ number_format($order->shipping_cost, 0, ',', '.') }}</td>
                                </tr>
                            </table>

                            <p style="margin: 0 0 35px; color: #B9A292; font-size: 22px; font-weight: 700; text-align: right;" class="mobile-font-lg">Total: Rp {{ number_format($order->gross_amount, 0, ',', '.') }}</p>

                            <!-- Shipping Address -->
                            <h3 style="margin: 0 0 15px; color: #5a4a42; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;" class="mobile-font-sm">Shipping Address</h3>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 30px; background: #FAF4E5; border-radius: 8px; border: 1px solid #E4E5DD;">
                                <tr>
                                    <td style="padding: 24px;">
                                        <p style="margin: 0; color: #5a4a42; font-size: 14px; line-height: 1.6; white-space: pre-line;">{{ $order->shipping_address }}</p>
                                    </td>
                                </tr>
                            </table>

                            @if($order->payment_status === \App\Enum\PaymentStatus::Pending)
                            <!-- Payment Pending Notice -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 30px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 600; line-height: 1.6;">⚠️ Please complete your payment immediately if you haven't done so.</p>
                                    </td>
                                </tr>
                            </table>
                            @endif

                            <!-- CTA Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" class="mobile-btn" style="margin: 0 auto;">
                                <tr>
                                    <td style="border-radius: 6px; background-color: #B9A292; box-shadow: 0 4px 14px rgba(185, 162, 146, 0.30);">
                                        <a href="{{ route('my.orders') }}" style="display: inline-block; padding: 17px 45px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; line-height: 1.4; letter-spacing: 0.3px;">View Order Status</a>
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
                            <p style="margin: 0; color: #DEC7B5; font-size: 13px; line-height: 1.6;">Thank you for shopping with us!</p>
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>
</body>
</html>
