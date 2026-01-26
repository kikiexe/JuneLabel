# INSTRUKSI SETTING EMAIL VERIFICATION - LOCALHOST

## Step 1: Edit file .env

Tambahkan atau update konfigurasi email berikut:

```env
# Email Configuration - LOG DRIVER (untuk development)
MAIL_MAILER=log
MAIL_FROM_ADDRESS="noreply@junelabel.com"
MAIL_FROM_NAME="${APP_NAME}"
```

## Step 2: Penjelasan

- MAIL_MAILER=log → Email akan masuk ke file `storage/logs/laravel.log`
- Email TIDAK akan dikirim ke email real
- Link verifikasi akan muncul di log file

## Step 3: Cara Lihat Email di Log

Setelah register, buka file:
`storage/logs/laravel.log`

Cari link seperti ini:

```
http://localhost:8000/verify-email/1/hash-nya-disini?expires=...&signature=...
```

Copy link tersebut dan paste di browser untuk verify email.

## Step 4: Clear Config Cache (Jika Perlu)

Jalankan command ini jika email tidak muncul di log:

```bash
php artisan config:clear
php artisan cache:clear
```

## Alternative: Pakai Mailtrap (Email Inbox Testing)

Jika mau lihat email dengan tampilan yang lebih bagus:

1. Daftar di https://mailtrap.io (gratis)
2. Dapatkan SMTP credentials
3. Update .env:

```env
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your-username-dari-mailtrap
MAIL_PASSWORD=your-password-dari-mailtrap
MAIL_ENCRYPTION=tls
```

Pilih salah satu sesuai kebutuhan Anda!
