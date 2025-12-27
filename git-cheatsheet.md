

## 1. Setup & Inisiasi
- `git init`: Membuat repository baru di folder saat ini.
- `git clone [url]`: Menyalin (download) repository dari remote (GitHub/GitLab) ke lokal.
- `git config --global user.name "[nama]"`: Mengatur nama pengguna untuk riwayat commit.
- `git config --global user.email "[email]"`: Mengatur email pengguna.

## 2. Basic Workflow (Sehari-hari)
- `git status`: Mengecek status perubahan file (staged, modified, atau untracked).
- `git add [file]`: Memasukkan file tertentu ke *staging area*.
- `git add .`: Memasukkan **semua** file yang berubah ke *staging area*.
- `git commit -m "[pesan]"`: Menyimpan perubahan dari staging ke history dengan pesan.
- `git diff`: Melihat detail perbedaan baris kode sebelum di-add.

## 3. Branching & Navigasi
- `git branch`: Melihat daftar branch lokal.
- `git branch [nama-baru]`: Membuat branch baru (tanpa pindah).
- `git checkout [nama-branch]`: Pindah ke branch lain.
- `git checkout -b [nama-baru]`: Membuat branch baru dan **langsung pindah** ke situ.
- `git switch [nama-branch]`: Alternatif modern dari `checkout` khusus untuk pindah branch.
- `git merge [nama-branch]`: Menggabungkan branch target ke branch yang sedang aktif.
- `git branch -d [nama-branch]`: Menghapus branch.

## 4. Sinkronisasi (Remote / Tim)
- `git remote -v`: Melihat daftar URL remote yang terhubung.
- `git fetch`: Mengambil update dari remote tapi **tidak** menggabungkannya ke lokal.
- `git pull`: Mengambil update dari remote dan langsung menggabungkannya (`fetch` + `merge`).
- `git push`: Mengirim commit lokal ke repository remote.
- `git push -u origin [nama-branch]`: Upload branch baru lokal ke remote untuk pertama kali.

## 5. Undo & Reset (Perbaikan Masalah)
- `git stash`: Menyimpan perubahan sementara tanpa commit (hidden save).
- `git stash pop`: Mengembalikan perubahan yang tadi di-stash.
- `git restore [file]`: Membatalkan perubahan pada file (kembali ke commit terakhir).
- `git reset --soft HEAD~1`: Undo commit terakhir, tapi file perubahan tetap ada di staging.
- `git reset --hard HEAD~1`: Undo commit terakhir dan **menghapus** semua perubahan (Hati-hati!).
- `git revert [hash-commit]`: Membuat commit baru yang membatalkan efek commit tertentu (Safe undo).

## 6. Inspection & History
- `git log`: Melihat riwayat commit lengkap.
- `git log --oneline`: Melihat riwayat commit dalam satu baris (ringkas).
- `git blame [file]`: Melihat siapa yang mengedit baris tertentu pada file.

---
**Catatan:**
Gunakan `git switch` dan `git restore` untuk kejelasan fungsi yang lebih baik dibanding `git checkout` versi lama.