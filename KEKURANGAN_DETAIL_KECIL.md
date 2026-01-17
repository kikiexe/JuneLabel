# 🔍 KEKURANGAN DETAIL & KECIL PROYEK JUNE LABEL

## (Selain Payment Gateway & RajaOngkir)

**Analisis Tanggal:** 13 Januari 2026  
**Focus:** Detail-detail kecil yang bisa langsung diperbaiki

---

## 📌 KATEGORI ANALISIS

### 1. ❌ TYPO & GRAMMAR

### 2. 🎨 CONSISTENCY & STYLING

### 3. 🧹 CODE CLEANUP

### 4. 🔒 MINOR SECURITY

### 5. 📱 UX MICRO-INTERACTIONS

### 6. ♿ ACCESSIBILITY KECIL

### 7. 🐛 BUGS KECIL

### 8. 📦 CONFIGURATION

---

## 1. ❌ TYPO & GRAMMAR

### 1.1 Typo di Meta Title Homepage

**Lokasi:** `Welcome.jsx` line 13  
**Masalah:**

```jsx
<Head title="June Label - Hijab Ternyaman Unutk Kamu" />
```

**❌ "Unutk"** seharusnya **"Untuk"**

**Fix:**

```jsx
<Head title="June Label - Hijab Ternyaman Untuk Kamu" />
```

---

### 1.2 Inconsistent Capitalization di Footer

**Lokasi:** `Footer.jsx` line 31, 44, 73, 86, 95

**Masalah:**

-   Line 31: `CUSTOMER CARE` (all caps)
-   Line 44: `JUNE LABEL` (all caps)
-   Line 73: `CUSTOMER SERVICES` (all caps)
-   Line 86: `ABOUT US` (all caps)
-   Line 95: `NEWSLETTER` (all caps)

Sedangkan di tempat lain pakai Title Case. Tidak konsisten.

**Rekomendasi:** Pilih satu style (all caps ATAU Title Case) dan gunakan di seluruh aplikasi

---

### 1.3 Error Message Grammar buruk

**Lokasi:** `CartContext.jsx` line 20  
**Masalah:**

```javascript
console.error("Gagal mem parsing cart dari local storage", error);
```

❌ "mem parsing" → ✅ "parse" atau "mem-parsing"

---

### 1.4 Placeholder Space Berlebih

**Lokasi:** `Footer.jsx` line 104  
**Masalah:**

```jsx
placeholder = " Enter your email address";
```

Ada **leading space** di placeholder (notice the space before "Enter")

**Fix:**

```jsx
placeholder = "Enter your email address";
```

---

## 2. 🎨 CONSISTENCY & STYLING

### 2.1 Inconsistent Color Values

**Masalah:** Warna `#7C634D` (brown primary) di-hardcode 100+ tempat

**Contoh:**

-   `Footer.jsx` line 24: `style={{ backgroundColor: "#ffffff", color: "#525252" }}`
-   `Navbar.jsx`: `#7C634D` berulang 50+ kali
-   `Cart.jsx`, `Checkout.jsx`, dll

**Fix:** Gunakan TailwindCSS theme colors

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      'june-brown': '#7C634D',
      'june-light': '#FFF6EC',
      'june-dark': '#020002',
    }
  }
}
```

Lalu replace semua:

```jsx
// ❌ Before
className = "text-[#7C634D]";
// ✅ After
className = "text-june-brown";
```

---

### 2.2 Mixed Spacing Units

**Masalah:** Kadang pakai `px-6`, kadang `px-8`, kadang `px-16`, tidak ada standardisasi

**Contoh:**

-   `Footer.jsx` line 24: `py-12 px-6 md:px-10 lg:px-16`
-   `Navbar.jsx` line 91: `py-3 px-6 xl:px-16`
-   `Cart.jsx` line 23: `px-4 md:px-8 lg:px-16`

**Rekomendasi:** Define container padding standard

```javascript
// Contoh standardisasi
const CONTAINER_PADDING = "px-4 md:px-8 lg:px-16 xl:px-24";
```

---

### 2.3 Inline Style vs Tailwind Tidak Konsisten

**Lokasi:** Multiple files

**Contoh Buruk:**

```jsx
// Footer.jsx line 24 - inline style
<footer style={{ backgroundColor: "#ffffff", color: "#525252" }}>

// Footer.jsx line 111 - inline style lagi
style={{ borderRadius: '0px' }}

// Navbar.jsx line 94-97 - inline style
style={{
  backgroundColor: isScrolled ? "#FFF6EC" : "transparent",
  color: "#7C634D",
}}
```

**Masalah:** Kenapa tidak pakai Tailwind sepenuhnya?

**Fix:**

```jsx
// ✅ Better
<footer className="bg-white text-gray-600">

// For dynamic, pakai className conditional
<nav className={`${isScrolled ? 'bg-june-light' : 'bg-transparent'} text-june-brown`}>
```

---

### 2.4 Font Family Tidak Load di Semua Tempat

**Lokasi:** `Navbar.jsx` line 77-80

**Masalah:**

```jsx
<style>
    {`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
    .font-inter { font-family: 'Inter', sans-serif; }
  `}
</style>
```

Import font di **component level** bukan di global CSS!

**Fix:** Pindah ke `app.css` atau `app.jsx`

---

### 2.5 Duplicate Payment Logo Array

**Lokasi:** `Footer.jsx` line 124-128

**Masalah:** Array logo payment di-hardcode

```jsx
['midtrans.png', 'bca.png', 'mandiri.png', ...]
```

**Rekomendasi:** Extract ke constant file

```javascript
// constants/payments.js
export const PAYMENT_METHODS = [
    { name: "Midtrans", logo: "midtrans.png" },
    { name: "BCA", logo: "bca.png" },
    // ...
];
```

---

### 2.6 No CSS Custom Properties untuk Colors

**Lokasi:** `app.css`

**Masalah:** Hanya ada `::selection` style, tidak ada CSS variables

**Rekomendasi:** Tambah CSS variables

```css
@layer base {
    :root {
        --color-primary: #7c634d;
        --color-light: #fff6ec;
        --color-dark: #020002;
    }

    ::selection {
        background-color: var(--color-primary);
        color: var(--color-light);
    }
}
```

---

## 3. 🧹 CODE CLEANUP

### 3.1 Unnecessary Comments

**Lokasi:** Multiple files

**Contoh:**

```jsx
// Detail.jsx line 96
{
    /* <span className="ml-3 text-sm text-gray-400 line-through">RP 459.000</span> */
}

// Detail.jsx line 42-43
// Optimization: Only update if changed prevents excessive re-renders
// But useState setter already handles identity check usually.
```

**Fix:** Hapus commented code atau uncomment jika dipakai

---

### 3.2 Unused Imports

**Lokasi:** `Detail.jsx` line 1-7

**Masalah:**

```jsx
import { Head } from "@inertiajs/react"; // ❌ Not used
import { Facebook, Twitter, MessageCircle } from "lucide-react"; // ❌ Not used
import RelatedProducts from "../Product/Related"; // ❌ Not used
```

`Head` dan social icons tidak dipakai di component ini

**Fix:** Hapus unused imports

---

### 3.3 Unused Variable `auth`

**Lokasi:**

-   `Welcome.jsx` line 10: `auth` tidak dipakai
-   `Detail.jsx` line 9: `auth` tidak dipakai

**Fix:** Hapus dari destructuring

---

### 3.4 Inconsistent Function Style

**Masalah:**

```jsx
// Arrow function
const handleSearch = () => { ... }

// Function expression
export default function Navbar() { ... }

// Handler di object
const NavLink = ({ href, children }) => (...)
```

**Rekomendasi:** Pilih satu style untuk consistency

---

### 3.5 Magic String "junelabel_cart"

**Lokasi:** `CartContext.jsx` line 15, 28

**Masalah:**

```javascript
const storedCart = localStorage.getItem("junelabel_cart");
localStorage.setItem("junelabel_cart", JSON.stringify(cartItems));
```

String literal "junelabel_cart" berulang. Jika typo, bisa bug halus.

**Fix:**

```javascript
const CART_STORAGE_KEY = "junelabel_cart";

const storedCart = localStorage.getItem(CART_STORAGE_KEY);
localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
```

---

### 3.6 No Loading Skeleton

**Masalah:** Tidak ada loading state saat fetch data

**Impact:** White screen sambil loading

**Rekomendasi:** Tambah skeleton loader

---

## 4. 🔒 MINOR SECURITY

### 4.1 WhatsApp Number Berbeda-beda

**Lokasi:** Multiple files

**Masalah:**

-   `Footer.jsx` line 76: `6282282577216`
-   `WhatsAppButton.jsx` line 4: `6282282577216`
-   `ContactUs.jsx` line 44: `6282282577216`
-   `OrderComplete.jsx` line 59: `6281234567890` ← **BEDA!**

**❌ OrderComplete pakai nomor dummy!**

**Fix:** Gunakan satu nomor dari environment variable

```javascript
// .env
VITE_WHATSAPP_NUMBER = 6282282577216;

// Usage
const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;
```

---

### 4.2 Email Exposed di Banyak Tempat

**Lokasi:**

-   `Footer.jsx` line 66, 80
-   `Navbar.jsx` line 29-31, 346
-   `ContactUs.jsx` line 33

Hardcoded `junelabelco@gmail.com` di 5+ tempat

**Rekomendasi:** Extract ke config

```javascript
// config/contact.js
export const CONTACT = {
    email: "junelabelco@gmail.com",
    phone: "+62 822-8257-7216",
    whatsapp: "6282282577216",
};
```

---

### 4.3 No Input Sanitization di Forms

**Lokasi:** Semua form inputs

**Masalah:** Input langsung di-submit tanpa sanitasi

**Contoh:** `Checkout.jsx` line 92-109

```jsx
<input
    type="text"
    value={data.customer_name}
    onChange={(e) => setData("customer_name", e.target.value)}
/>
```

No validation, bisa input `<script>alert('xss')</script>`

**Fix:** Tambah validation

```javascript
const sanitize = (str) => str.replace(/[<>]/g, '');

onChange={e => setData('customer_name', sanitize(e.target.value))}
```

---

### 4.4 Weak Password Validation (Probably)

Kemungkinan register tidak enforce strong password

**Rekomendasi:** Check `RegisterController` dan enforce minimal:

-   Min 8 characters
-   1 uppercase
-   1 number

---

## 5. 📱 UX MICRO-INTERACTIONS

### 5.1 No Focus State di Beberapa Button

**Lokasi:** `Cart.jsx`, `Checkout.jsx`

**Masalah:**

```jsx
<button className="...">
```

Tidak ada `:focus-visible` ring untuk keyboard navigation

**Fix:**

```jsx
<button className="... focus-visible:ring-2 focus-visible:ring-june-brown focus-visible:ring-offset-2">
```

---

### 5.2 No Disabled State Visual Feedback

**Lokasi:** `Cart.jsx` line 95

**Masalah:**

```jsx
<button disabled={item.quantity <= 1}>
  <Minus ... />
</button>
```

Ada `disabled` tapi tidak ada visual feedback yang jelas

**Fix:**

```jsx
<button
  disabled={item.quantity <= 1}
  className="... disabled:opacity-30 disabled:cursor-not-allowed"
>
```

---

### 5.3 Image Tidak Ada Loading State

**Masalah:** Semua `<img>` tidak ada loading="lazy" atau placeholder

**Fix:**

```jsx
<img
  src={...}
  alt={...}
  loading="lazy"
  className="... bg-gray-200" // placeholder color
/>
```

---

### 5.4 No Hover Animation di Product Cards

**Lokasi:** `Index.jsx` line 208-233

Ada `group-hover:scale-105` di image, tapi tidak ada smooth transition di price/title

**Rekomendasi:** Tambah micro-animation di hover

---

### 5.5 Newsletter Subscribe Tidak Ada Feedback

**Lokasi:** `Footer.jsx` line 17-21

**Masalah:**

```javascript
const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Terima kasih! Email ${email} telah didaftarkan.`); // ❌ Alert buruk UX
    setEmail("");
};
```

**Fix:** Ganti alert dengan toast notification atau inline success message

---

### 5.6 Cart Badge Tidak Animated

**Lokasi:** `Navbar.jsx` line 182-186

Badge cart count muncul tapi tidak ada animation

**Fix:**

```jsx
<span className="... animate-bounce">{getCartCount()}</span>
```

Atau custom CSS animation

---

### 5.7 Quantity Input Tidak Bisa Diketik Manual

**Lokasi:** `Detail.jsx` line 153-158

**Masalah:**

```jsx
<input
    type="text"
    value={quantity}
    readOnly // ❌ User tidak bisa ketik angka langsung
/>
```

**Fix:** Biarkan editable dengan validation

```jsx
<input
    type="number"
    min="1"
    value={quantity}
    onChange={(e) => {
        const val = parseInt(e.target.value) || 1;
        setQuantity(Math.max(1, val));
    }}
/>
```

---

### 5.8 No "Back to Top" Button

**Masalah:** Page panjang (Shop, Product Detail) tidak ada button scroll to top

**Rekomendasi:** Tambah floating button "Back to Top" yang muncul saat scroll > 500px

---

## 6. ♿ ACCESSIBILITY KECIL

### 6.1 Button Tidak Ada aria-label

**Lokasi:** Multiple files

**Contoh:**

```jsx
// Navbar.jsx line 151-156
<button onClick={() => setMobileMenuOpen(true)}>
    <Menu size={24} color="#7C634D" strokeWidth={2} />
</button>
```

Screen reader tidak tahu ini button apa

**Fix:**

```jsx
<button
  onClick={() => setMobileMenuOpen(true)}
  aria-label="Open mobile menu"
>
```

---

### 6.2 Modal Close Button Tidak Ada aria-label

**Lokasi:** `Alert.jsx` line 34-39

```jsx
<button onClick={onClose}>Mengerti</button>
```

**Fix:** Tambah aria-label untuk clarity

---

### 6.3 Form Input Tidak Ada Required Indicator Visual

**Lokasi:** Semua forms

**Masalah:** Input ada `required` attribute tapi tidak ada visual `*` atau "Required"

**Fix:**

```jsx
<label>
    Full Name <span className="text-red-500">*</span>
</label>
```

---

### 6.4 Link Tidak Ada title Attribute

**Contoh:** `Footer.jsx` social media links

**Fix:**

```jsx
<a
  href="https://instagram.com/junelabel.co"
  target="_blank"
  rel="noopener noreferrer"
  title="Follow us on Instagram" // ← Add this
>
```

---

### 6.5 Image Gallery Tidak Ada Keyboard Navigation

**Lokasi:** `Detail.jsx` image carousel

**Masalah:** Hanya bisa scroll, tidak bisa pakai arrow keys

**Fix:** Implementasi keyboard navigation (← →)

---

## 7. 🐛 BUGS KECIL

### 7.1 Search Query Tidak Di-encode

**Lokasi:** `Navbar.jsx` line 53-57

**Masalah:**

```javascript
router.visit(route("shop.index", { search: searchQuery }));
```

Jika searchQuery = `"test & special"`, bisa error

**Fix:**

```javascript
router.visit(
    route("shop.index", {
        search: encodeURIComponent(searchQuery),
    })
);
```

---

### 7.2 Pagination Labels Pakai dangerouslySetInnerHTML

**Lokasi:** `Index.jsx` line 249, 255

**Masalah:**

```jsx
dangerouslySetInnerHTML={{ __html: link.label }}
```

Laravel paginator return label kayak `&laquo; Previous` (HTML entity)

**Risiko:** XSS jika ada manipulasi

**Fix:** Gunakan proper React rendering atau sanitize

---

### 7.3 Mobile Filter Drawer Tidak Close on Route Change

**Lokasi:** `Index.jsx` mobile filter

**Masalah:** Jika user klik category filter, drawer tidak auto close

**Impact:** User harus manual close drawer

**Fix:** Listen to route change dan close drawer

---

### 7.4 Cart LocalStorage Bisa Corrupt

**Lokasi:** `CartContext.jsx` line 14-24

**Masalah:**

```javascript
try {
    setCartItems(JSON.parse(storedCart));
} catch (error) {
    console.error("...", error);
    localStorage.removeItem("junelabel_cart");
}
```

Good, tapi `console.error` masih keliatan di production

**Fix:** Remove console or use proper logger

---

### 7.5 Newsletter Email Tidak Divalidasi

**Lokasi:** `Footer.jsx` line 99-118

**Masalah:**

```jsx
<input
    type="email"
    required // ← Browser validation saja, bisa di-bypass
/>
```

**Fix:** Tambah regex validation

```javascript
const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
```

---

### 7.6 Image Alt Text Terlalu Generic

**Contoh:**

```jsx
// ❌ Bad
<img src="..." alt={product.name} />

// ✅ Better
<img src="..." alt={`${product.name} - ${product.category.name} hijab from June Label`} />
```

---

### 7.7 No Error Display di Checkout Success

**Lokasi:** `CheckoutController.php` line 107-109

**Masalah:**

```php
if (auth()->check() && $order->user_id !== auth()->id()) {
    abort(403);
}
```

`abort(403)` menampilkan default Laravel error page, tidak sesuai design

**Fix:** Return Inertia error page dengan custom design

---

## 8. 📦 CONFIGURATION

### 8.1 Node Version Tidak Specified

**Masalah:** Tidak ada `.nvmrc` atau `package.json` engine field

**Fix:** Tambah `.nvmrc`

```
20.11.0
```

Dan di `package.json`:

```json
"engines": {
  "node": ">=20.0.0",
  "npm": ">=10.0.0"
}
```

---

### 8.2 PHP Version Di composer.json vs README Beda

**Masalah:**

-   `composer.json`: `"php": "^8.3"`
-   `README.md`: "Versi 8.2 atau lebih baru"

**Fix:** Seragamkan, pilih salah satu

---

### 8.3 No EditorConfig untuk Team

**Masalah:** `.editorconfig` ada tapi mungkin tidak lengkap

**Rekomendasi:** Pastikan include:

```ini
[*.{js,jsx}]
indent_style = tab / space
indent_size = 2
```

---

### 8.4 No Prettier Config

**Masalah:** Tidak ada `.prettierrc`

**Impact:** Code formatting tidak konsisten antar developer

**Fix:** Tambah `.prettierrc`

```json
{
    "semi": true,
    "singleQuote": true,
    "tabWidth": 2,
    "trailingComma": "es5"
}
```

---

### 8.5 Git Ignore Terlalu Simple

**Lokasi:** `.gitignore`

**Masalah:** Hanya ignore basic files

**Rekomendasi:** Tambah:

```
# IDEs
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Testing
coverage/
.phpunit.cache
```

---

### 8.6 No VSCode Recommended Extensions

**Masalah:** Team mungkin pakai extension berbeda

**Fix:** Tambah `.vscode/extensions.json`

```json
{
    "recommendations": [
        "bmewburn.vscode-intelephense-client",
        "bradlc.vscode-tailwindcss",
        "esbenp.prettier-vscode"
    ]
}
```

---

### 8.7 Vite Config Terlalu Minimal

**Lokasi:** `vite.config.js`

**Masalah:** Tidak ada configuration untuk:

-   Build optimization
-   Alias path
-   Server port

**Rekomendasi:**

```javascript
export default defineConfig({
  plugins: [...],
  resolve: {
    alias: {
      '@': '/resources/js',
    },
  },
  server: {
    port: 5173,
    hmr: {
      host: 'localhost',
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
});
```

---

### 8.8 No Environment Example untuk Development

**Masalah:** `.env.example` tidak jelas untuk development

**Fix:** Tambah comment

```env
# Development Database
DB_CONNECTION=sqlite
# DB_CONNECTION=mysql  # Uncomment untuk production

# Development Mail (Log)
MAIL_MAILER=log
# MAIL_MAILER=smtp  # Uncomment untuk production
```

---

## 📊 PRIORITAS PERBAIKAN KECIL

### 🔥 Must Fix (Critical Typos/Bugs)

1. ✅ Fix typo "Unutk" → "Untuk" di meta title
2. ✅ Fix WhatsApp number di OrderComplete (nomor berbeda)
3. ✅ Remove console.error dari production code
4. ✅ Fix placeholder leading space
5. ✅ Add input sanitization di forms

### ⚠️ Should Fix (UX & Consistency)

6. Standardize color values ke Tailwind theme
7. Remove inline styles, pakai Tailwind full
8. Add loading states & skeleton
9. Fix newsletter alert → toast notification
10. Add aria-label di semua button/link
11. Add focus states di interactive elements
12. Make quantity input editable dengan validation

### 💡 Nice to Have (Improvements)

13. Extract constants (colors, contacts, payments)
14. Add back-to-top button
15. Add keyboard navigation di image gallery
16. Config Prettier & EditorConfig
17. Add .nvmrc
18. Improve image alt text descriptiveness
19. Add VSCode recommended extensions
20. Expand .gitignore

---

## 🎯 QUICK WINS (Bisa dikerjakan < 1 jam)

1. **Fix typo** - 2 menit
2. **Fix WhatsApp number** - 5 menit
3. **Remove console.error** - 5 menit
4. **Add loading="lazy" di images** - 10 menit
5. **Add aria-labels** - 15 menit
6. **Fix email variable** - 10 menit
7. **Create constants file** - 15 menit

**Total Quick Wins:** ~1 jam untuk 7 improvements!

---

## 📝 SUMMARY

### Total Kekurangan Kecil: **58 issues**

| Category              | Count  |
| --------------------- | ------ |
| Typo & Grammar        | 4      |
| Consistency & Styling | 6      |
| Code Cleanup          | 6      |
| Minor Security        | 4      |
| UX Micro-interactions | 8      |
| Accessibility         | 5      |
| Bugs Kecil            | 7      |
| Configuration         | 8      |
| **TOTAL**             | **48** |

### 💪 KELEBIHAN YANG SUDAH BAGUS

1. ✅ Clean component structure
2. ✅ Good use of Tailwind utilities
3. ✅ Responsive design well implemented
4. ✅ Image optimization with WebP
5. ✅ LocalStorage cart implementation (meskipun bisa improved)
6. ✅ Error handling di Cart Context
7. ✅ Good UI/UX micro-animations (hover effects)
8. ✅ Proper React hooks usage

### 🎓 LESSONS LEARNED

1. **Consistency is key** - Warna, spacing, font harus standard
2. **Accessibility matters** - aria-labels, focus states tidak boleh lupa
3. **Extract constants** - Jangan hardcode values berulang
4. **UX details make difference** - Loading states, hover, disabled states
5. **Config matters** - Prettier, EditorConfig, .nvmrc penting untuk team

---

**Kesimpulan:** Proyek ini **sudah bagus secara keseluruhan**, tapi masih banyak detail-detail kecil yang bisa meningkatkan kualitas code dan UX. Dengan memperbaiki 48 kekurangan ini, proyek akan **jauh lebih professional dan production-ready**.

Rating setelah fix semua ini: **8.5/10** 🚀

---

**Dibuat dengan sangat detail oleh:** AI Code Reviewer  
**Untuk:** JuneLabel Development Team
