# 🚀 QUICK START - Email Verification & Password Reset

**Last Updated:** 29 Januari 2026  
**Estimated Time:** 5 menit

---

## ⚡ QUICK TEST (5 Menit)

### Step 1: Start Server (1 menit)

```bash
# Terminal 1 - Backend
php artisan serve

# Terminal 2 - Frontend (jika belum jalan)
npm run dev
```

### Step 2: Register User Baru (1 menit)

```
1. Buka browser: http://localhost:8000/register
2. Isi form:
   - Name: Test User
   - Email: test@junelabel.com
   - Password: password123
   - Confirm: password123
3. Klik "Register"
4. Anda akan diarahkan ke halaman "Verify Email"
```

### Step 3: Cek Email (1 menit)

```
Option A - Mailtrap (Recommended):
1. Login ke https://mailtrap.io
2. Buka inbox Anda
3. Cari email "Verify Your Email Address - JuneLabel"
4. Klik link "Verify Email Address"

Option B - Log File:
1. Buka: storage/logs/laravel.log
2. Cari link yang dimulai dengan: http://localhost:8000/verify-email/
3. Copy link tersebut
4. Paste di browser
```

### Step 4: Verify Email (30 detik)

```
1. Klik link dari email
2. Anda akan diarahkan ke dashboard
3. Email sudah terverifikasi! ✅
```

### Step 5: Test Password Reset (2 menit)

```
1. Logout dari aplikasi
2. Buka: http://localhost:8000/login
3. Klik "Forgot your password?"
4. Masukkan email: test@junelabel.com
5. Klik "Email Password Reset Link"
6. Cek email di Mailtrap atau log file
7. Klik link "Reset Password"
8. Set password baru: newpassword123
9. Klik "Reset Password"
10. Login dengan password baru ✅
```

---

## 🎯 EXPECTED RESULTS

### ✅ Email Verification:

- Email diterima dengan subject "Verify Your Email Address - JuneLabel"
- Email memiliki design JuneLabel (warna coklat/cream)
- Button "Verify Email Address" berfungsi
- Setelah klik, user diarahkan ke dashboard
- Database: `email_verified_at` terisi dengan timestamp

### ✅ Password Reset:

- Email diterima dengan subject "Reset Your Password - JuneLabel"
- Email memiliki design JuneLabel
- Button "Reset Password" berfungsi
- Form reset password muncul
- Password berhasil diubah
- Login dengan password baru berhasil

---

## 🐛 TROUBLESHOOTING CEPAT

### Email Tidak Terkirim?

```bash
# Clear cache
php artisan config:clear
php artisan cache:clear

# Restart server
Ctrl+C (stop server)
php artisan serve
```

### Link Verification Expired?

```bash
# Resend verification email via tinker
php artisan tinker

# Di tinker:
$user = User::where('email', 'test@junelabel.com')->first();
$user->sendEmailVerificationNotification();
exit
```

### Tidak Bisa Lihat Email di Mailtrap?

```bash
# Ganti ke log driver di .env
MAIL_MAILER=log

# Clear cache
php artisan config:clear

# Cek log file
tail -f storage/logs/laravel.log
```

---

## 📊 VERIFICATION CHECKLIST

Centang jika berhasil:

### Email Verification:

- [ ] User bisa register
- [ ] Redirect ke verification notice
- [ ] Email diterima di Mailtrap/log
- [ ] Email design sesuai JuneLabel branding
- [ ] Link verification berfungsi
- [ ] User diarahkan ke dashboard setelah verify
- [ ] `email_verified_at` terisi di database

### Password Reset:

- [ ] Form forgot password berfungsi
- [ ] Email reset diterima di Mailtrap/log
- [ ] Email design sesuai JuneLabel branding
- [ ] Link reset password berfungsi
- [ ] Form reset password muncul
- [ ] Password berhasil diubah
- [ ] Login dengan password baru berhasil

### Email Design:

- [ ] Warna JuneLabel (#B9A292, #DEC7B5, dll)
- [ ] Gradient bar di top & bottom
- [ ] Icon badge (✉ atau 🔑)
- [ ] Button CTA jelas
- [ ] Alternative text link tersedia
- [ ] Security notice terlihat
- [ ] Footer dengan branding

---

## 🎨 PREVIEW EMAIL

### Verify Email:

```
Subject: Verify Your Email Address - JuneLabel
From: JuneLabel <noreply@junelabel.com>

[Gradient Bar - Coklat/Cream]
┌─────────────────────┐
│        ✉            │
│  Verify Your Email  │
└─────────────────────┘

Assalamualaikum [Name],

Thank you for registering...

[Button: Verify Email Address]

🔒 Security Notice
This link expires in 60 minutes...
```

### Reset Password:

```
Subject: Reset Your Password - JuneLabel
From: JuneLabel <noreply@junelabel.com>

[Gradient Bar - Coklat/Cream]
┌─────────────────────┐
│        🔑           │
│  Reset Password     │
└─────────────────────┘

Assalamualaikum,

We received a request...

[Button: Reset Password]

🔒 Security Notice
This link expires in 60 minutes...

⚠️ Didn't Request This?
Please ignore this email...
```

---

## 🔗 USEFUL LINKS

- **Register:** http://localhost:8000/register
- **Login:** http://localhost:8000/login
- **Forgot Password:** http://localhost:8000/forgot-password
- **Dashboard:** http://localhost:8000/dashboard
- **Mailtrap:** https://mailtrap.io

---

## 📞 NEED HELP?

### Check Logs:

```bash
# Laravel logs
tail -f storage/logs/laravel.log

# Vite logs (frontend)
npm run dev
```

### Database Check:

```bash
php artisan tinker

# Check user verification status:
User::where('email', 'test@junelabel.com')->first()->email_verified_at
```

### Email Configuration:

```bash
# Check current config
php artisan tinker

config('mail.default')
config('mail.from.address')
```

---

## ✅ SUCCESS CRITERIA

Jika semua checklist di atas ✅, maka:

🎉 **IMPLEMENTASI BERHASIL!**

Email Verification & Password Reset sudah berfungsi dengan sempurna dan siap untuk:

- ✅ Development testing
- ✅ User acceptance testing
- ✅ Production deployment (setelah ganti email provider)

---

**Happy Testing! 🚀**

Jika ada pertanyaan, cek dokumentasi lengkap di:

- `EMAIL_VERIFICATION_SETUP.md` - Setup guide lengkap
- `IMPLEMENTATION_SUMMARY_EMAIL.md` - Summary implementasi
- `EMAIL_TEMPLATES_PREVIEW.md` - Preview design email
