# June Label (Toko Hijab Online)

Proyek E-commerce berbasis Laravel 11, Inertia.js (React), dan FilamentPHP.

---

## 🚀 Panduan Instalasi (Pilih Salah Satu Jalur)

Proyek ini dapat dijalankan menggunakan **DDEV (Docker)** atau secara **Lokal (Non-Docker)**.

### Opsi A: Menggunakan DDEV (Docker) - *Direkomendasikan*
Gunakan metode ini jika Anda ingin lingkungan yang terisolasi dan instan.

1. **Clone & Masuk ke Folder:**
   ```bash
   git clone https://github.com/kikiexe/junelabel.git
   cd junelabel
   ```
2. **Jalankan DDEV:**
   ```bash
   ddev start
   ```
3. **Install Dependensi:**
   ```bash
   ddev composer install
   ddev npm install
   ddev npm run build
   ```
4. **Setup Environment:**
   ```bash
   cp .env.example .env
   ddev artisan key:generate
   ```
5. **Migrasi & Seed:**
   ```bash
   ddev artisan migrate --seed
   ```

---

### Opsi B: Menggunakan Lokal (Non-Docker)
Gunakan metode ini jika Anda ingin menjalankan aplikasi langsung di sistem operasi Anda.

1. **Prasyarat:**
   - PHP 8.3+, Composer 2.x, Node.js 20+, MySQL/MariaDB.
2. **Clone & Install:**
   ```bash
   git clone https://github.com/kikiexe/junelabel.git
   cd junelabel
   composer install
   npm install
   ```
3. **Setup Environment:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   *Edit file `.env` dan sesuaikan `DB_HOST=127.0.0.1` serta kredensial database lokal Anda.*
4. **Migrasi & Seed:**
   ```bash
   php artisan migrate --seed
   ```

---

## ⚙️ Konfigurasi API (Wajib diisi di `.env`)

Aplikasi ini membutuhkan API Key agar fitur berjalan:

**A. Midtrans (Payment)**
```env
MIDTRANS_SERVER_KEY=SB-Mid-server-xxxx...
MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxx...
MIDTRANS_IS_PRODUCTION=false
```

**B. RajaOngkir (Shipping)**
```env
RAJAONGKIR_API_KEY=your_key_here
RAJAONGKIR_ORIGIN_DISTRICT_ID=5473
```

---

## 🏃 Cara Menjalankan Aplikasi

| Lingkungan | Perintah Backend | Perintah Frontend |
| :--- | :--- | :--- |
| **DDEV** | Otomatis (via ddev) | `ddev npm run dev` |
| **Lokal** | `php artisan serve` | `npm run dev` |

---

## 🛡️ Catatan Keamanan & Pengembangan

### Penanganan Telescope (Anti-Error 500)
Proyek ini menggunakan cara registrasi `TelescopeServiceProvider` yang aman di `AppServiceProvider.php`. 
- **PENTING:** Jangan mendaftarkan manual di `bootstrap/providers.php`. 
- Sistem akan mendeteksi secara otomatis apakah Anda berada di lingkungan `local` dan apakah paketnya terinstal sebelum menjalankannya. Ini mencegah Error 500 jika Anda melakukan `composer install --no-dev`.

### Troubleshooting Layar Putih (Vite)
Jika halaman muncul putih kosong (Error `ERR_CONNECTION_REFUSED` di konsol), pastikan aset sudah di-build atau server dev Vite berjalan:
```bash
# Untuk DDEV
ddev npm run build
# Untuk Lokal
npm run build
```

---
© 2026 June Label.
