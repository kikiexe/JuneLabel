    # 🎯 Midtrans Payment Integration - Setup Complete!

## ✅ Perubahan yang Sudah Dilakukan

### 1. **Database Structure** ✨

- ✅ Kolom `order_code` → `order_id` (Midtrans standard)
- ✅ Kolom `total_price` → `gross_amount` (Midtrans standard)
- ✅ Database sudah di-migrate dengan struktur baru

### 2. **Snap.js Script** 📜

- ✅ Ditambahkan di `resources/views/app.blade.php`
- ✅ Client Key diambil dari `.env` secara otomatis
- ✅ Script tersedia di semua halaman

### 3. **CheckoutController** 🛒

- ✅ Generate Snap Token saat order dibuat
- ✅ Snap Token disimpan ke database
- ✅ Item details lengkap dikirim ke Midtrans
- ✅ Customer details & shipping info ter-include

### 4. **OrderComplete Page** 💳

- ✅ Payment button "💳 Pay Now" ditambahkan
- ✅ Button hanya muncul jika `payment_status = pending`
- ✅ Snap popup terintegrasi dengan callbacks
- ✅ Error handling untuk loading issues

### 5. **Webhook Handler** 🔔

- ✅ `MidtransWebhookController` dibuat
- ✅ Handle semua status: success, pending, failed, expired
- ✅ Update payment status otomatis
- ✅ Logging lengkap untuk debugging

### 6. **Routes** 🛣️

- ✅ POST `/midtrans/notification` - Webhook endpoint
- ✅ GET `/midtrans/check-status/{orderId}` - Manual check
- ✅ CSRF protection di-exclude untuk webhook

---

## 🔧 Environment Variables

Pastikan di `.env` sudah ada:

```env
# SANDBOX_MIDTRANS
MERCHANT_ID=G902172968
CLIENT_KEY=Mid-client-9BYYRIYHPueO0I-F
SERVER_KEY=Mid-server-aeKFMwRTxxJ7LnqiA71KHIcW
```

---

## 🚀 Cara Testing

### **Step 1: Start Development Server**

```bash
npm run dev
php artisan serve
```

### **Step 2: Buat Order Baru**

1. Pergi ke `/shop`
2. Pilih produk dan tambahkan ke cart
3. Checkout dengan data lengkap
4. Pilih metode pengiriman
5. Submit order

### **Step 3: Lakukan Pembayaran**

Setelah order dibuat, Anda akan redirect ke halaman **Order Complete**.

Di halaman ini akan ada tombol **"💳 Pay Now"** (hanya muncul jika payment_status = pending).

**Click tombol tersebut**, akan muncul Snap popup Midtrans.

### **Step 4: Test Payment di Sandbox**

Midtrans Sandbox menyediakan test cards:

#### ✅ **Successful Payment**

```
Card Number: 4811 1111 1111 1114
CVV: 123
Exp: 01/25
OTP/3DS: 112233
```

#### ❌ **Failed Payment**

```
Card Number: 4911 1111 1111 1113
CVV: 123
Exp: 01/25
```

#### ⏳ **Pending Payment (Bank Transfer)**

- Pilih "Bank Transfer" → "BCA Virtual Account"
- Copy nomor VA dan simpan
- Payment akan pending

#### 💰 **Other Payment Methods**

- GoPay
- ShopeePay
- Indomaret/Alfamart
- BRI/Mandiri/BNI Virtual Account

---

## 📊 Webhook Notification URL

Untuk production nanti, daftarkan URL webhook di Midtrans Dashboard:

```
Production URL: https://yourdomain.com/midtrans/notification
Development URL: https://your-ngrok-url.ngrok.io/midtrans/notification
```

### Testing Webhook di Localhost

Karena Midtrans tidak bisa hit `localhost`, gunakan **Ngrok**:

```bash
ngrok http 8000
```

Copy HTTPS URL dari ngrok, lalu:

1. Login ke [Midtrans Dashboard](https://dashboard.sandbox.midtrans.com)
2. Settings → Configuration
3. Payment Notification URL: `https://your-ngrok-url.ngrok.io/midtrans/notification`
4. Save

---

## 🔍 Monitoring Payments

### Check Logs

```bash
tail -f storage/logs/laravel.log
```

Semua notifikasi dari Midtrans akan ter-log di sini.

### Manual Check Status

Hit endpoint ini untuk cek status manual:

```
GET http://localhost:8000/midtrans/check-status/ORD-XXXX-123456
```

Replace `ORD-XXXX-123456` dengan order_id real.

---

## 📦 Payment Flow

```
1. Customer create order
   └─> Order tersimpan dengan status: payment_status = "pending"
   └─> Snap token generated & disimpan ke database

2. Customer click "💳 Pay Now"
   └─> Snap popup muncul
   └─> Customer pilih payment method
   └─> Customer complete payment

3. Midtrans send notification ke webhook
   └─> MidtransWebhookController process notification
   └─> Update order payment_status:
       • "settlement" → success
       • "pending" → pending
       • "deny/cancel" → failed
       • "expire" → expired

4. Customer bisa check order status di dashboard (future feature)
```

---

## 🎨 UI Payment Button

Button "💳 Pay Now" hanya muncul jika:

- ✅ `order.snap_token` exists
- ✅ `order.payment_status === 'pending'`

Jika sudah paid, button tidak muncul.

---

## 🐛 Troubleshooting

### "window.snap is not defined"

**Solusi**: Pastikan Snap.js sudah loaded. Check di browser console:

```javascript
console.log(window.snap);
```

### "Snap token invalid"

**Solusi**: Generate ulang snap token. Cek di database apakah `snap_token` terisi.

### Webhook tidak hit

**Solusi**:

1. Pastikan ngrok running
2. Pastikan URL webhook di Midtrans dashboard benar
3. Check CSRF exception sudah ditambahkan

### Payment success tapi status tidak update

**Solusi**: Check logs di `storage/logs/laravel.log`, cari error di webhook handler.

---

## 🎉 Next Steps

1. ✅ Test payment dengan berbagai metode
2. ✅ Verify webhook notifications
3. ⬜ Implement order history page untuk customer
4. ⬜ Add email notification setelah payment success
5. ⬜ Add admin dashboard untuk monitoring orders
6. ⬜ Production deployment & switch to production credentials

---

## 📚 Documentation Links

- [Midtrans Snap Docs](https://docs.midtrans.com/en/snap/overview)
- [Midtrans Sandbox Cards](https://docs.midtrans.com/en/technical-reference/sandbox-test)
- [Midtrans Webhooks](https://docs.midtrans.com/en/after-payment/http-notification)

---

**Integration Status**: ✅ **COMPLETE & READY TO TEST!**
