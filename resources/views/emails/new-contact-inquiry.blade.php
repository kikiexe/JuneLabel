<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Inquiry</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #FFF6EC;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #B9A292 0%, #DEC7B5 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">New Contact Inquiry</h1>
                            <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 14px; opacity: 0.9;">JuneLabel Contact Form</p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                                You have received a new contact inquiry from your website.
                            </p>

                            <!-- Inquiry Details -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                                <tr>
                                    <td style="padding: 12px; background-color: #F8F1EB; border-bottom: 1px solid #E5D5C5;">
                                        <strong style="color: #7C634D; font-size: 14px;">Name:</strong>
                                    </td>
                                    <td style="padding: 12px; background-color: #F8F1EB; border-bottom: 1px solid #E5D5C5;">
                                        <span style="color: #333333; font-size: 14px;">{{ $inquiry->name }}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #E5D5C5;">
                                        <strong style="color: #7C634D; font-size: 14px;">Email:</strong>
                                    </td>
                                    <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #E5D5C5;">
                                        <a href="mailto:{{ $inquiry->email }}" style="color: #B9A292; font-size: 14px; text-decoration: none;">{{ $inquiry->email }}</a>
                                    </td>
                                </tr>
                                @if($inquiry->phone)
                                <tr>
                                    <td style="padding: 12px; background-color: #F8F1EB; border-bottom: 1px solid #E5D5C5;">
                                        <strong style="color: #7C634D; font-size: 14px;">Phone:</strong>
                                    </td>
                                    <td style="padding: 12px; background-color: #F8F1EB; border-bottom: 1px solid #E5D5C5;">
                                        <span style="color: #333333; font-size: 14px;">{{ $inquiry->phone }}</span>
                                    </td>
                                </tr>
                                @endif
                                <tr>
                                    <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #E5D5C5;">
                                        <strong style="color: #7C634D; font-size: 14px;">Subject:</strong>
                                    </td>
                                    <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #E5D5C5;">
                                        <span style="color: #333333; font-size: 14px;">{{ $inquiry->subject }}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="padding: 20px; background-color: #F8F1EB;">
                                        <strong style="color: #7C634D; font-size: 14px; display: block; margin-bottom: 10px;">Message:</strong>
                                        <p style="margin: 0; color: #333333; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">{{ $inquiry->message }}</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- CTA Button -->
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="{{ config('app.url') }}/admin/contact-inquiries/{{ $inquiry->id }}"
                                   style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #B9A292 0%, #DEC7B5 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
                                    View in Admin Panel →
                                </a>
                            </div>

                            <p style="margin: 20px 0 0 0; color: #666666; font-size: 13px; line-height: 1.6;">
                                <strong>Received:</strong> {{ $inquiry->created_at->format('d M Y, H:i') }} WIB
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #F8F1EB; padding: 20px 30px; text-align: center; border-top: 1px solid #E5D5C5;">
                            <p style="margin: 0; color: #7C634D; font-size: 12px;">
                                This is an automated notification from JuneLabel Contact Form
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
