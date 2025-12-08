# June Label (Toko Hijab Online)

Proyek E-commerce berbasis Laravel 11, Inertia.js (React), dan FilamentPHP.

## Syarat Wajib (Prerequisites)

Sebelum mulai, pastikan laptop Anda sudah terinstall:

* **PHP:** Versi 8.2 atau lebih baru (Wajib)
* **Composer:** Untuk install library PHP
* **Node.js & NPM:** Untuk compile aset React
* **MySQL:** Database (Bisa dari Laragon, XAMPP, atau DBngin)

---

## Cara Install

Ikuti langkah ini satu per satu agar aplikasi berjalan lancar.

### 1. Clone Repository
Download source code dari GitHub:
```bash
git clone https://github.com/USERNAME_KAMU/junelabel.git
cd junelabel
```

### 2. Install Library
Download semua paket PHP dan JavaScript yang dibutuhkan:
```bash
composer install
npm install
```

### 3. Setup Environment
Duplikat file contoh konfigurasi:
```bash
cp .env.example .env
```

Lalu buka file `.env` di text editor, ubah bagian database sesuai konfigurasi laptop Anda:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=junelabel
DB_USERNAME=root
DB_PASSWORD=
```

### 4. Generate Key Aplikasi
```bash
php artisan key:generate
```

### 5. Setup Database
1. Buka aplikasi database manager (HeidiSQL / Laragon / TablePlus / phpMyAdmin)
2. Buat database kosong baru dengan nama: `junelabel`
3. Kembali ke terminal, jalankan migrasi untuk membuat tabel:
```bash
php artisan migrate
```

### 6. Buat Akun Admin (Filament)
Buat user untuk login ke dashboard admin:
```bash
php artisan make:filament-user
```
(Ikuti instruksi di layar untuk input Nama, Email, dan Password)

---

## Cara Menjalankan Aplikasi

Gunakan dua terminal yang berjalan bersamaan.

**Terminal 1** (Backend Server):
```bash
php artisan serve
```

**Terminal 2** (Frontend Asset Watcher):
```bash
npm run dev
```

**Akses Link:**
- **Toko (Frontend):** [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **Admin Panel:** [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin)

---

## Catatan Penting

1. Folder `vendor` dan `node_modules` tidak ada di GitHub, wajib menjalankan `composer install` & `npm install`
2. File `.env` tidak ada di GitHub demi keamanan
3. Jika muncul error **"Vite manifest not found"**, pastikan `npm run dev` sudah dijalankan minimal sekali
4. Jika ada error tentang **"SQLSTATE"**, pastikan:
   - Database sudah dibuat
   - Koneksi database di `.env` sudah benar
   - Service MySQL sedang berjalan
5. Untuk development, tambahkan data dummy dengan:
   ```bash
   php artisan db:seed
   ```

## Troubleshooting

**Error:** `Port 8000 already in use`
```bash
# Matikan server yang sedang berjalan, atau
php artisan serve --port=8001
```

**Error:** `Class "Filament\Panel" not found`
```bash
composer require filament/filament
```

**Error:** `npm run dev tidak bekerja`
```bash
# Clear cache
npm cache clean --force
# Install ulang
npm install
```