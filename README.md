# Dandy Rahmat Zain — Web Portfolio & CV

> **Quality Code, Inspired Design: Shaping the Digital World with Precision and Creativity.**

Portfolio web interaktif dan Curriculum Vitae modern untuk **Dandy Rahmat Zain**, Full Stack & Mobile Developer. Dibangun dengan **React 18 (Vite)**, **Tailwind CSS**, dan **Framer Motion**, memakai design system **Signal Editorial**.

---

## ✨ Fitur Utama

- 🧭 **Editorial hero + proof strip**: satu pernyataan yang jelas, dua CTA, dan angka yang bisa dicek (tahun, proyek, sertifikasi).
- 💼 **Experience timeline**: tab ARIA vertikal di desktop, accordion di mobile, lengkap dengan tautan ke studi kasus terkait.
- 🧩 **Skills berbasis bukti**: setiap skill menampilkan jumlah proyek yang memakainya dan langsung memfilter bagian Projects.
- 📁 **Case studies**: 4 proyek unggulan + arsip dengan filter; dialog studi kasus dengan URL yang bisa dibagikan (`?project=lion`), tombol Back/Esc untuk menutup, dan prev/next.
- 🎓 **Kredensial**: riwayat pendidikan dan 29 sertifikat yang bisa dicari; viewer PDF dimuat hanya saat dibuka.
- 📄 **CV**: pratinjau, unduh PDF asli, dan cetak A4 yang bersih.
- 💬 **Kontak**: form dengan validasi yang menyiapkan draf email, kanal langsung (Email, WhatsApp, LinkedIn).
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
- **Motion** ada di `src/lib/motion.js`: durasi `instant 100ms · fast 180ms · base 280ms · slow 450ms · story 800ms`, easing `out` untuk masuk. Aturannya: hanya `transform`/`opacity`, reveal sekali, tanpa loop tak berujung, dan `MotionConfig reducedMotion="user"`.
- **Komponen dasar** ada di `src/components/ui/`: `Button`, `IconButton`, `Chip`, `Section`, `Reveal`, `Counter`, `Dialog` (aksesibel: focus trap, Esc, focus restore, scroll lock), `Toast`.
- **Konten** tetap di `src/data/portfolioData.js`. Teks antarmuka baru ada di `src/data/uiCopy.js`, dan metadata proyek (slug, unggulan, logo) di `src/data/projectMeta.js`.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Tailwind CSS, Framer Motion, Lucide React, pdf.js
- **Build Tool**: Vite 5
- **Deployment**: Vercel (SPA rewrite + cache headers di `vercel.json`)

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
