// Long-form case study content for featured projects, keyed by project slug.
// Rendered by CaseStudyDialog as: Problem → What I built → Key decisions → Outcome.
//
// Rules for editing this file:
// - Every statement must be true and defensible in an interview.
// - `outcomes` holds measurable results (numbers, users, time saved). A project
//   with an empty `outcomes` array simply hides that section, so leave it empty
//   rather than guessing. Fill in real figures when you have them, e.g.
//   { value: '1,200+', label: { en: 'cell sites monitored', id: 'site seluler dipantau' } }
// - `decisions` explains *why* something was built a certain way (the trade-off),
//   which is what reviewers look for beyond the feature list.

export const caseStudies = {
  lion: {
    problem: {
      en: 'Submarine fiber-optic cables (SKKL) link Indonesia’s islands, and anchoring or trawling vessels are one of the most common causes of cable faults. The NOC team needed to see cable routes and nearby ship traffic on one map and be warned before a vessel got too close — not after the link went down.',
      id: 'Kabel fiber-optik bawah laut (SKKL) menghubungkan pulau-pulau di Indonesia, dan kapal yang membuang jangkar atau menarik jaring adalah salah satu penyebab paling umum gangguan kabel. Tim NOC membutuhkan peta yang menampilkan jalur kabel sekaligus lalu lintas kapal di sekitarnya, dan peringatan sebelum kapal terlalu dekat — bukan setelah link putus.',
    },
    decisions: [
      {
        title: { en: 'Tiered buffer zones instead of a single alarm radius', id: 'Zona buffer bertingkat, bukan satu radius alarm' },
        body: {
          en: 'Proximity is evaluated against three radii (2 km, 1 km, 100 m) so operators get an early heads-up, an escalation, and a critical alert, rather than one alarm that is either too noisy or too late.',
          id: 'Kedekatan kapal dievaluasi terhadap tiga radius (2 km, 1 km, 100 m) sehingga operator mendapat peringatan dini, eskalasi, dan alert kritis — bukan satu alarm yang terlalu bising atau terlambat.',
        },
      },
      {
        title: { en: 'Import cable routes from KML/KMZ', id: 'Impor jalur kabel dari KML/KMZ' },
        body: {
          en: 'Cable routes already exist as KML/KMZ files from survey and engineering teams. Parsing those files directly into map segments keeps the map in sync with the source data and avoids manual re-digitising.',
          id: 'Jalur kabel sudah tersedia dalam file KML/KMZ dari tim survei dan engineering. Mem-parsing file tersebut langsung menjadi segmen peta menjaga peta tetap sinkron dengan data sumber dan menghindari digitasi ulang manual.',
        },
      },
      {
        title: { en: 'Redis between telemetry and the map', id: 'Redis di antara telemetri dan peta' },
        body: {
          en: 'Vessel positions update continuously for many ships at once. Caching the latest state in Redis lets the map refresh quickly without hitting MySQL on every update.',
          id: 'Posisi kapal diperbarui terus-menerus untuk banyak kapal sekaligus. Menyimpan state terbaru di Redis membuat peta bisa diperbarui cepat tanpa membebani MySQL di setiap update.',
        },
      },
    ],
    outcomes: [],
  },

  'noc-ran': {
    problem: {
      en: 'Operations staff were tracking the health of thousands of BTS (2G/3G), eNodeB (4G) and gNodeB (5G) nodes across Telkom Group territories. They needed one live view of which sites were down, where incidents were clustering, and a way to update node configuration in bulk.',
      id: 'Tim operasional memantau kesehatan ribuan node BTS (2G/3G), eNodeB (4G), dan gNodeB (5G) di seluruh wilayah Telkom Group. Mereka membutuhkan satu tampilan live untuk melihat site yang mati, lokasi penumpukan insiden, dan cara memperbarui konfigurasi node secara massal.',
    },
    decisions: [
      {
        title: { en: 'Filter alarms before they reach people', id: 'Saring alarm sebelum sampai ke operator' },
        body: {
          en: 'Raw network telemetry is mostly noise. An alert engine classifies faults and only surfaces critical outages, so the dashboard shows what needs action.',
          id: 'Telemetri jaringan mentah sebagian besar adalah noise. Mesin alert mengklasifikasikan gangguan dan hanya menampilkan outage kritis, sehingga dashboard menunjukkan hal yang perlu ditindaklanjuti.',
        },
      },
      {
        title: { en: 'Map + heatmap, not just tables', id: 'Peta + heatmap, bukan hanya tabel' },
        body: {
          en: 'Outages are often regional (power, backhaul, weather). Plotting node status on a Leaflet map with incident heatmaps makes those patterns visible at a glance.',
          id: 'Outage sering bersifat regional (listrik, backhaul, cuaca). Menampilkan status node di peta Leaflet dengan heatmap insiden membuat pola tersebut langsung terlihat.',
        },
      },
      {
        title: { en: 'Bulk CSV/Excel ingestion', id: 'Ingest massal CSV/Excel' },
        body: {
          en: 'Node configuration is maintained in spreadsheets by field teams. Accepting those files directly removes manual data entry for thousands of rows.',
          id: 'Konfigurasi node dikelola tim lapangan dalam spreadsheet. Menerima file tersebut secara langsung menghilangkan input manual untuk ribuan baris data.',
        },
      },
    ],
    outcomes: [],
  },

  nexusflow: {
    problem: {
      en: 'Workflow tools are easy to demo and hard to make correct: a single cycle between steps can loop forever, secrets end up in plain text, and slow webhook handlers make the sender retry. I built NexusFlow to solve those three problems properly, end to end.',
      id: 'Tool workflow mudah didemokan tetapi sulit dibuat benar: satu siklus antar langkah bisa berputar tanpa henti, secret tersimpan sebagai teks biasa, dan handler webhook yang lambat membuat pengirim mengulang request. Saya membangun NexusFlow untuk menyelesaikan ketiga masalah itu dengan benar, end to end.',
    },
    decisions: [
      {
        title: { en: 'Validate the graph before running it', id: 'Validasi graf sebelum dijalankan' },
        body: {
          en: 'DFS three-colour traversal rejects cycles at save time, and Kahn’s topological sort groups nodes into tiers so independent steps run in parallel while dependencies still run in order.',
          id: 'Traversal DFS tiga warna menolak siklus saat workflow disimpan, dan topological sort Kahn mengelompokkan node ke dalam tier sehingga langkah yang independen berjalan paralel sementara dependensi tetap berurutan.',
        },
      },
      {
        title: { en: 'Acknowledge webhooks first, work later', id: 'Balas webhook dulu, proses kemudian' },
        body: {
          en: 'Incoming webhooks return HTTP 202 immediately and the run is queued in BullMQ/Redis. Senders never time out, and a non-blocking fallback keeps the demo working when Redis is unavailable.',
          id: 'Webhook yang masuk langsung dibalas HTTP 202 dan eksekusinya dimasukkan ke antrean BullMQ/Redis. Pengirim tidak pernah timeout, dan fallback non-blocking menjaga demo tetap jalan saat Redis tidak tersedia.',
        },
      },
      {
        title: { en: 'Encrypt every credential with AES-256-GCM', id: 'Enkripsi setiap kredensial dengan AES-256-GCM' },
        body: {
          en: 'GCM gives confidentiality and tamper detection in one step; each secret gets its own 96-bit IV and is decrypted only at execution time.',
          id: 'GCM memberi kerahasiaan sekaligus deteksi perubahan data dalam satu langkah; setiap secret memakai IV 96-bit sendiri dan hanya didekripsi saat eksekusi.',
        },
      },
    ],
    outcomes: [
      { value: 'HTTP 202', label: { en: 'webhook acknowledged in <10 ms, work queued', id: 'webhook dibalas <10 ms, proses diantrekan' } },
      { value: 'Live', label: { en: 'public demo on Vercel, source on GitHub', id: 'demo publik di Vercel, kode di GitHub' } },
    ],
  },

  'cortex-rag': {
    problem: {
      en: 'Company knowledge sits in PDFs and docs that keyword search handles poorly, while plain LLM chat answers confidently even when the documents say nothing. Cortex combines retrieval that finds both exact terms and meaning with answers that must cite their sources.',
      id: 'Pengetahuan perusahaan tersimpan di PDF dan dokumen yang sulit dicari dengan pencarian kata kunci, sementara chat LLM biasa menjawab dengan yakin walaupun dokumennya tidak membahas hal itu. Cortex menggabungkan pencarian yang menemukan istilah persis sekaligus makna, dengan jawaban yang wajib menyertakan sumber.',
    },
    decisions: [
      {
        title: { en: 'Hybrid retrieval with Reciprocal Rank Fusion', id: 'Pencarian hybrid dengan Reciprocal Rank Fusion' },
        body: {
          en: 'Dense vectors miss exact codes like policy IDs; BM25 misses paraphrases. Running both and merging with RRF (k=60) keeps the strengths of each without tuning score weights.',
          id: 'Vektor dense sering melewatkan kode persis seperti ID kebijakan; BM25 melewatkan parafrase. Menjalankan keduanya dan menggabungkannya dengan RRF (k=60) mempertahankan kelebihan masing-masing tanpa perlu menyetel bobot skor.',
        },
      },
      {
        title: { en: 'Re-rank before generating', id: 'Re-ranking sebelum menghasilkan jawaban' },
        body: {
          en: 'A second-stage cross-encoder scores the top 15 candidates, so the model only sees the most relevant chunks and the context window is spent on evidence.',
          id: 'Cross-encoder tahap kedua menilai 15 kandidat teratas, sehingga model hanya melihat potongan paling relevan dan context window dipakai untuk bukti.',
        },
      },
      {
        title: { en: 'Grounding check on every answer', id: 'Pengecekan grounding di setiap jawaban' },
        body: {
          en: 'Each sentence is checked against the retrieved chunks and the answer shows a groundedness score. When nothing relevant is found, Cortex says so instead of guessing.',
          id: 'Setiap kalimat dicek terhadap potongan dokumen yang ditemukan dan jawaban menampilkan skor groundedness. Jika tidak ada yang relevan, Cortex menyatakannya alih-alih menebak.',
        },
      },
    ],
    outcomes: [
      { value: 'Live', label: { en: 'public demo with bring-your-own-key, source on GitHub', id: 'demo publik dengan bring-your-own-key, kode di GitHub' } },
    ],
  },
};
