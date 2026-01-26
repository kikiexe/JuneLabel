# 📋 TO-DO LIST: Perbaikan Strategis JuneLabel

## ✅ FASE 1: Bersih-bersih Arsitektur (SELESAI!)

**Tujuan:** Memastikan tidak ada user yang "terjebak" login tapi dianggap Guest.

- [x] **Hapus Controller Konflik:** ✅ Deleted `app/Http/Controllers/Api/AuthController.php`
- [x] **Bersihkan Route API:** ✅ Cleaned `routes/api.php` - removed manual login/register/logout routes
- [x] **Fix Frontend Login:** ✅ Updated `Login.jsx` - now uses `route('login')` with Inertia `useForm`
- [x] **Fix Frontend Register:** ✅ Updated `Register.jsx` - now uses `route('register')` with Inertia `useForm`

### 📝 Detail Perubahan:

1. **Deleted:** `app/Http/Controllers/Api/AuthController.php`
2. **Updated:** `routes/api.php` - Only kept `/api/user` route for future use
3. **Fixed:** `Login.jsx` - Removed axios, Cookies, manual token handling
4. **Fixed:** `Register.jsx` - Removed axios, Cookies, manual token handling
5. **Result:** All auth now uses Laravel Breeze (Session-based) ✅

---

## 🚚 FASE 2: Persiapan Logistik (Backend)

**Tujuan:** Menyiapkan otak di server agar bisa menghitung ongkir real-time.

- [ ] **Daftar RajaOngkir:** Buat akun di [rajaongkir.com](https://rajaongkir.com) (tipe Starter/Gratis) dan salin API Key
- [ ] **Update Environment:** Masukkan API Key dan ID Kota Asal ke `.env`
  ```env
  RAJAONGKIR_API_KEY=your_api_key_here
  RAJAONGKIR_ORIGIN_CITY_ID=153  # Contoh: Jakarta = 153
  ```
- [ ] **Buat Service Logic:** Buat `app/Services/RajaOngkirService.php` untuk:
  - Get list kota
  - Calculate shipping cost
- [ ] **Buka Jalur Data Kota:** Buat endpoint untuk Frontend:
  - `GET /api/cities` - List semua kota
  - `POST /api/shipping-cost` - Calculate ongkir
- [ ] **Update Checkout Logic:** Di `CheckoutController.php`:
  - Panggil `RajaOngkirService`
  - Replace `$shippingCost = 0` dengan calculation real

---

## 💻 FASE 3: Update Tampilan (Frontend)

**Tujuan:** Agar user bisa memilih kota tujuan, bukan mengetik manual.

- [ ] **Ambil Data Kota:** Di `Checkout.jsx`, fetch list kota dari backend
- [ ] **Ubah Input Alamat:**
  - [ ] Tambahkan Dropdown **Provinsi** (Opsional, untuk filter)
  - [ ] Tambahkan Dropdown **Kota/Kabupaten** (WAJIB, data dari API)
  - [ ] Tambahkan Dropdown **Kurir** (JNE/POS/TIKI)
  - [ ] Tetap ada field text untuk detail alamat (jalan, RT/RW, dll)
- [ ] **Update Form Data:** Pastikan kirim:
  - `destination_city_id` (integer)
  - `courier` (string: jne/pos/tiki)
  - `shipping_address` (string: full address)
- [ ] **(Bonus UX) Hitung Live:** Real-time shipping cost calculation:
  - User pilih Kota + Kurir
  - Fetch biaya ongkir via API
  - Update "Total Bayar" otomatis

---

## 🎯 FASE 4: Testing & Validation (Belum Mulai)

- [ ] **Test Full Flow:**
  - [ ] Register → Email Verification → Login
  - [ ] Browse Products → Add to Cart
  - [ ] Checkout → Select City/Courier → See Real Shipping Cost
  - [ ] Place Order → Verify `user_id` populated
  - [ ] Check Order → Verify shipping cost is correct
- [ ] **Test Edge Cases:**
  - [ ] Guest checkout (if allowed)
  - [ ] Invalid shipping address
  - [ ] Out of stock during checkout
  - [ ] Multiple items with different weights

---

## 📊 Progress Tracker

| Fase                         | Status            | Completion |
| ---------------------------- | ----------------- | ---------- |
| Fase 1: Architecture Cleanup | ✅ DONE           | 100%       |
| Fase 2: Backend Logistics    | 🔄 READY TO START | 0%         |
| Fase 3: Frontend UI          | ⏸️ WAITING        | 0%         |
| Fase 4: Testing              | ⏸️ WAITING        | 0%         |

---

## 🚀 Next Action

**START FASE 2:**

1. Register RajaOngkir account
2. Get API Key
3. Update `.env` file
4. Create `RajaOngkirService.php`

**Timeline Estimate:**

- Fase 2: 2-3 hours
- Fase 3: 1-2 hours
- Fase 4: 1 hour

**Total:** ~4-6 hours untuk shipping integration complete

---

**Last Updated:** 2026-01-18 00:15 WIB  
**Status:** Fase 1 ✅ COMPLETE | Ready for Fase 2
