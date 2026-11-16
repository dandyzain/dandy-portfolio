# Dandy Rahmat Zain — Web Portfolio & CV

> **Quality Code, Inspired Design: Shaping the Digital World with Precision and Creativity.**

Portfolio web interaktif dan Curriculum Vitae modern untuk **Dandy Rahmat Zain**, Full Stack & Mobile Developer. Dibangun dengan **React 18 (Vite)**, **Tailwind CSS**, dan **Framer Motion**, memakai design system **Signal Editorial**.

---

## ✨ Fitur Utama

- 🧭 **Editorial hero + proof strip**: satu pernyataan yang jelas, dua CTA, dan angka yang bisa dicek (tahun, proyek, sertifikasi).
- 💼 **Experience timeline**: tab ARIA vertikal di desktop, accordion di mobile, lengkap dengan tautan ke studi kasus terkait.
- 🧩 **Skills berbasis bukti**: setiap skill menampilkan jumlah proyek yang memakainya dan langsung memfilter bagian Projects.
- 📁 **Case studies**: 4 proyek unggulan dengan struktur Masalah → Yang dibangun → Keputusan teknis → Hasil, screenshot asli untuk proyek yang punya demo, arsip dengan filter, dan grup terpisah untuk proyek akademik. Setiap studi kasus punya URL sendiri (`/work/lion`, `/id/work/lion`) dengan judul dan gambar share sendiri.
- 🎓 **Kredensial**: riwayat pendidikan dan 29 sertifikat yang bisa dicari; viewer PDF dimuat hanya saat dibuka.
- 📄 **CV**: pratinjau, unduh PDF asli, dan cetak A4 yang bersih.
- 💬 **Kontak**: form yang mengirim langsung lewat Resend (`/api/contact`), dengan honeypot anti-spam dan fallback otomatis ke draf email; kanal langsung (Email, WhatsApp, LinkedIn).
- 💬 **Rekomendasi**: bagian testimoni yang otomatis tampil setelah `src/data/testimonials.js` diisi.
- 🔎 **SEO & analytics**: halaman prerender per rute, hreflang EN/ID, JSON-LD `Person`, sitemap otomatis, dan Vercel Analytics.
- 🌗 **Light/Dark & EN/ID**: tema mengikuti sistem dan tersimpan, tanpa kedipan saat load.

---

## 🎨 Design System — Signal Editorial

Struktur editorial (tipografi besar, banyak ruang, studi kasus) dengan aksen "signal" yang terinspirasi dari pekerjaan NOC/GIS: garis "kabel", grid koordinat, dan label monospace.

| Token | Light | Dark | Kegunaan |
| --- | --- | --- | --- |
| `bg` | `#F7F6F2` | `#090D18` | Latar halaman |
| `ink` | `#0E1220` | `#ECEEF3` | Teks utama, tombol utama |
| `muted` | `#585F72` | `#9199AD` | Teks sekunder (≥ 4.5:1) |
| `signal` / `signal-ink` | `#14B8A6` / `#0F766E` | `#2DD4BF` / `#5EEAD4` | Aksen dekoratif / aksen untuk teks |
| `amber` / `amber-ink` | `#F59E0B` / `#B45309` | `#FBBF24` / `#FCD34D` | Highlight sekunder |

- **Token warna** ada di `src/index.css` (CSS variables, channel RGB) dan dipetakan ke Tailwind di `tailwind.config.js`.
- **Font** (self-hosted via Fontsource): Space Grotesk (heading), Plus Jakarta Sans (body), JetBrains Mono (metadata).
- **Motion** ada di `src/lib/motion.js`: durasi `instant 100ms · fast 180ms · base 280ms · slow 450ms · story 800ms`, easing `out` untuk masuk. Aturannya: hanya `transform`/`opacity` (plus stroke SVG untuk "kabel"), reveal sekali, satu-satunya animasi berulang adalah denyut sinyal di hero dan titik status (berhenti saat di luar layar), efek kursor hanya untuk mouse/trackpad, dan `MotionConfig reducedMotion="user"`.
  - Primitif: `SplitText` (judul muncul per kata), `Magnetic` (tombol tertarik ke kursor), `useTilt` & `useSpotlight` di `src/hooks/usePointerFx.js`, `Chip pillId` (latar filter yang bergeser).
- **Komponen dasar** ada di `src/components/ui/`: `Button`, `IconButton`, `Chip`, `Section`, `Reveal`, `Counter`, `Dialog` (aksesibel: focus trap, Esc, focus restore, scroll lock), `Toast`.
- **Konten** tetap di `src/data/portfolioData.js`. Teks antarmuka baru ada di `src/data/uiCopy.js`, dan metadata proyek (slug, unggulan, logo) di `src/data/projectMeta.js`.

---

## ✍️ Mengisi konten

| Yang ingin diubah | File |
| --- | --- |
| Masalah, keputusan teknis, dan **hasil terukur** studi kasus unggulan | `src/data/caseStudies.js` (isi `outcomes` dengan angka nyata; kosong = bagian disembunyikan) |
| Screenshot, logo, label proyek akademik, kode internal | `src/data/projectMeta.js` (`shots`, `og`, `academic`, `internal`) |
| Testimoni / rekomendasi | `src/data/testimonials.js` |
| Bio, pengalaman, proyek, sertifikat | `src/data/portfolioData.js` |

Screenshot disimpan sebagai `public/projects/<proyek>/shot-<nama>-960.webp` dan `-1600.webp` (rasio 16:10); gambar share 1200×630 di `og.jpg`.

## 🌐 Rute

`/` (EN), `/id/` (ID), `/work/<slug>`, `/id/work/<slug>`. Tautan lama `?project=<slug>` otomatis dialihkan. Setelah `vite build`, `scripts/prerender.mjs` membuat satu file HTML per rute dengan `<head>` sendiri, lalu `sitemap.xml` dan `robots.txt`.

## 🔐 Environment variables (Vercel)

| Variabel | Wajib | Keterangan |
| --- | --- | --- |
| `RESEND_API_KEY` | Ya, untuk form kontak | API key dari [resend.com](https://resend.com/api-keys). Tanpa ini form tetap jalan lewat fallback draf email. |
| `CONTACT_TO_EMAIL` | Tidak | Tujuan pesan (default `dandyzain.work@gmail.com`). |
| `CONTACT_FROM_EMAIL` | Tidak | Pengirim setelah domain diverifikasi di Resend, mis. `Portfolio <hello@domainanda.dev>`. |
| `SITE_URL` | Tidak | Domain utama untuk canonical, OG, dan sitemap (default `https://dandy-portfolio.vercel.app`). Isi saat pindah ke domain sendiri. |

Analytics: aktifkan **Analytics** di dashboard Vercel (tab Analytics) agar page view tercatat.

## 🔁 Mirror ke GitLab

Setiap push ke `main` otomatis dikirim ke GitLab lewat `.github/workflows/mirror-gitlab.yml`. Sekali setup di GitHub → Settings → Secrets and variables → Actions:

- Secret `GITLAB_TOKEN`: Personal Access Token GitLab dengan scope `write_repository`.
- Variable `GITLAB_REPO` (opsional): `namespace/proyek` di gitlab.com, default `dandyzain.personal/dandy-portfolio`.

Selama secret belum diisi, workflow dilewati tanpa error. Jalankan manual lewat tab **Actions → Mirror to GitLab → Run workflow**.

## 🛠️ Tech Stack

- **Frontend**: React 18, Tailwind CSS, Framer Motion, Lucide React, pdf.js
- **Build Tool**: Vite 5
- **Deployment**: Vercel (rewrite SPA kecuali `/api`, cache & security headers di `vercel.json`, serverless function `api/contact.js`)
- **Analytics**: Vercel Analytics

---

## 🚀 Menjalankan Proyek Secara Lokal

1. **Clone repository**:
   ```bash
   git clone <repository-url>
   cd dandy-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Jalankan development server**:
   ```bash
   npm run dev
   ```
   Buka peramban di `http://localhost:3000/`.

4. **Build untuk produksi**:
   ```bash
   npm run build
   ```

---

## 📬 Kontak

- **Email**: [dandyzain.work@gmail.com](mailto:dandyzain.work@gmail.com)
- **WhatsApp**: [+62 878-2504-9777](https://wa.me/6287825049777)
- **LinkedIn**: [linkedin.com/in/dandy-zain-ab380a290](https://www.linkedin.com/in/dandy-zain-ab380a290)
