export const portfolioData = {
  personal: {
    fullName: "Dandy Rahmat Zain",
    preferredName: "Dandy Zain",
    role: {
      en: "Full Stack Developer",
      id: "Full Stack Developer"
    },
    tagline: "Quality Code, Inspired Design: Shaping the Digital World with Precision and Creativity.",
    location: {
      en: "North Jakarta, DKI Jakarta, Indonesia",
      id: "Jakarta Utara, DKI Jakarta, Indonesia"
    },
    address: "Jl. Warakas Gg. 8, Tanjung Priok, Jakarta Utara, DKI Jakarta, Indonesia",
    phone: "+62 878-2504-9777",
    rawPhone: "6287825049777",
    email: "dandyzain.personal@gmail.com",
    linkedin: "https://www.linkedin.com/in/dandy-zain-ab380a290",
    github: "https://github.com/dandyzain",
    avatar: "/images/dandy-profile.png",
    avatarOriginal: "/images/dandy-original.jpg",
    status: {
      en: "Available for Hire & Collaborations",
      id: "Terbuka untuk Peluang Kerja & Kolaborasi"
    },
    bio: {
      en: [
        "I am a Full Stack Developer with experience in web and mobile application development. I specialize in building robust enterprise applications using Laravel and Express.js for backend architectures, alongside modern JavaScript frameworks like React, Next.js, Vue, and Nuxt for frontend development.",
        "At PT. Infrastruktur Telekomunikasi Indonesia (Telkominfra), I actively engineer and maintain mission-critical telecommunications web applications including nationwide submarine cable monitoring (LION), radio access network monitoring (NOC-RAN), tower site assessment (TSA), and workforce asset management (AssetMgmt WFM).",
        "On the mobile side, I build cross-platform and native applications using Flutter and Kotlin, ensuring smooth performance and intuitive UX across multiple platforms.",
        "With a comprehensive full-stack approach, I manage projects from database architecture to frontend polish, API integration, and cloud deployment. I also leverage Artificial Intelligence (AI) to accelerate software development workflows."
      ],
      id: [
        "Saya adalah Full Stack Developer dengan pengalaman dalam perancangan dan pengembangan aplikasi web serta mobile. Keahlian backend saya berfokus pada Laravel dan Express.js untuk arsitektur API yang tangguh, aman, dan scalable, serta framework modern seperti React, Next.js, Vue, dan Nuxt untuk sisi frontend.",
        "Di PT. Infrastruktur Telekomunikasi Indonesia (Telkominfra), saya aktif merancang dan mengelola aplikasi web misi-kritis termasuk pemantauan kabel bawah laut nasional (LION), monitoring radio access network (NOC-RAN), audit aktivitas menara (TSA), dan manajemen aset & work force (AssetMgmt WFM).",
        "Di platform mobile, saya mengembangkan aplikasi menggunakan Flutter dan Kotlin native, memastikan performa tinggi serta pengalaman pengguna yang mulus di berbagai sistem operasi.",
        "Dengan pendekatan full-stack menyeluruh, saya menangani proyek dari hulu ke hilir. Saya juga aktif mengintegrasikan kecerdasan buatan (AI) untuk riset teknis dan percepatan alur kerja rekayasa perangkat lunak modern."
      ]
    },
    stats: [
      { label: { en: "Years Experience", id: "Tahun Pengalaman" }, value: "4+" },
      { label: { en: "Completed Projects", id: "Proyek Selesai" }, value: "25+" },
      { label: { en: "Enterprise Systems", id: "Sistem Enterprise" }, value: "10+" },
      { label: { en: "Client Satisfaction", id: "Kepuasan Klien" }, value: "99%" },
    ]
  },

  experiences: [
    {
      id: "telkominfra",
      company: "PT. Infrastruktur Telekomunikasi Indonesia",
      role: "Full Stack Developer",
      period: {
        en: "February 2024 - Present",
        id: "Februari 2024 - Sekarang"
      },
      duration: {
        en: "Active",
        id: "Aktif"
      },
      location: "Jakarta, Indonesia",
      type: "Full-time",
      color: "lavender",
      description: {
        en: "Responsible for full-stack engineering of mission-critical telecom infrastructure systems (LION, NOC-RAN, AssetMgmt WFM, TSA, RENATA, WBS, and KEPO) supporting nationwide cellular towers, submarine fiber optic cables, and workforce operations of Telkom Group.",
        id: "Bertanggung jawab penuh atas rekayasa full-stack sistem infrastruktur telekomunikasi misi-kritis (LION, NOC-RAN, AssetMgmt WFM, TSA, RENATA, WBS, dan KEPO) yang mendukung operasional menara seluler nasional, kabel fiber optik laut, dan tenaga kerja lapangan Telkom Group."
      },
      highlights: {
        en: [
          "Developed GIS mapping and automated maritime hazard proximity alerts (100m, 1km, 2km buffer) for submarine cables in LION NOC Submarine.",
          "Architected Preventive Maintenance (PM) & Corrective Maintenance (CM) Work Force Management order pipelines with QR code & GPS tracking.",
          "Processed real-time high-throughput cellular BTS, eNodeB, and gNodeB alarm telemetry in NOC-RAN with Redis caching.",
          "Modernized legacy systems with Docker containerization, Kubernetes manifests, and Laravel/Vue architecture standards."
        ],
        id: [
          "Membangun visualisasi Web GIS dan notifikasi peringatan bahaya kapal (buffer 100m, 1km, 2km) untuk kabel laut di LION NOC Submarine.",
          "Merancang alur order Work Force Management Preventive Maintenance (PM) & Corrective Maintenance (CM) dengan QR code & pelacakan GPS.",
          "Memproses telemetri alarm Base Station (BTS), eNodeB, dan gNodeB secara real-time di NOC-RAN dengan integrasi Redis caching.",
          "Memodernisasi sistem warisan dengan kontainerisasi Docker, konfigurasi Kubernetes, dan standarisasi arsitektur Laravel/Vue."
        ]
      },
      techStack: ["Laravel", "Vue.js", "Leaflet GIS", "MySQL", "Oracle DB", "Redis", "Docker", "Kubernetes", "Git"]
    },
    {
      id: "bay-pacific",
      company: "PT. Bay Pacific Software Group",
      role: "Full Stack Developer",
      period: {
        en: "October 2023 - February 2024",
        id: "Oktober 2023 - Februari 2024"
      },
      duration: {
        en: "5 mos",
        id: "5 bln"
      },
      location: "Yogyakarta, Indonesia (Remote/Hybrid)",
      type: "Full-time",
      color: "mint",
      description: {
        en: "Developing scalable enterprise web solutions for international and domestic clients, ranging from multi-tenant SaaS systems and ERP modules to third-party payment and reporting integrations.",
        id: "Mengembangkan aplikasi web berbasis enterprise untuk berbagai klien internasional dan domestik, mulai dari modul ERP, platform manajemen bisnis, hingga integrasi pihak ketiga."
      },
      highlights: {
        en: [
          "Architected microservices and REST APIs utilizing Express.js and Laravel with high test coverage.",
          "Crafted dynamic, responsive user interfaces with Next.js, React, Vue.js, and Tailwind CSS.",
          "Implemented Redis caching and database indexing, significantly improving client request throughput.",
          "Collaborated cross-functionally with Product Managers, UI/UX designers, and QA engineers within Agile/Scrum cycles."
        ],
        id: [
          "Merancang arsitektur microservices dan REST API menggunakan Express.js dan Laravel.",
          "Membangun frontend dinamis dan responsif dengan Next.js, React, dan Vue.js.",
          "Melakukan optimasi performa aplikasi web, caching Redis, dan perbaikan keamanan data klien.",
          "Berkolaborasi aktif dengan Product Manager, UI/UX Designer, dan tim QA dalam metodologi Agile/Scrum."
        ]
      },
      techStack: ["Next.js", "Express.js", "Vue.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Redis"]
    },
    {
      id: "citiasia",
      company: "Citiasia Inc.",
      role: "Mobile Developer",
      period: {
        en: "June 2022 - December 2022",
        id: "Juni 2022 - Desember 2022"
      },
      duration: {
        en: "7 months",
        id: "7 bulan"
      },
      location: "Jakarta, Indonesia",
      type: "Contract / Project",
      color: "sky",
      description: {
        en: "Engineered smart city mobile applications enabling citizens to interact with municipal public services, submit local infrastructure reports, and access regional emergency directories.",
        id: "Berfokus pada pengembangan aplikasi smart city mobile yang melayani kebutuhan pelayanan publik dan interaksi warga digital pemerintah daerah."
      },
      highlights: {
        en: [
          "Built cross-platform smartphone applications using Flutter with native Android (Kotlin) bridge modules.",
          "Integrated precise GPS geolocation, real-time push notifications, camera capture, and cloud reporting APIs.",
          "Employed robust architectural state management patterns (Bloc/Provider) for predictable application state.",
          "Maintained smooth 60fps rendering speeds with accessible, citizen-friendly UI designs."
        ],
        id: [
          "Mengembangkan aplikasi mobile cross-platform menggunakan Flutter dan modul native Android (Kotlin).",
          "Mengintegrasikan fitur geolocation, push notification, kamera, serta pelaporan keluhan warga secara real-time.",
          "Mengimplementasikan state management yang clean (Bloc/Provider) untuk stabilitas aplikasi.",
          "Memastikan aplikasi memiliki waktu rendering 60fps dengan UI yang intuitif dan mudah digunakan oleh masyarakat luas."
        ]
      },
      techStack: ["Flutter", "Kotlin", "Android SDK", "REST API", "Firebase", "Geolocation"]
    },
    {
      id: "advertnative",
      company: "Advertnative Inc.",
      role: "Frontend Developer",
      period: {
        en: "September 2018 - September 2019",
        id: "September 2018 - September 2019"
      },
      duration: {
        en: "1 year 1 month",
        id: "1 tahun 1 bulan"
      },
      location: "South Jakarta, Indonesia",
      type: "Full-time",
      color: "peach",
      description: {
        en: "Developed lightweight interactive web advertising components and high-conversion landing pages for a leading digital native ad network.",
        id: "Mengembangkan widget iklan digital interaktif dan landing page berkonversi tinggi untuk platform periklanan native digital."
      },
      highlights: {
        en: [
          "Built ultra-lightweight dynamic ad widgets (<30kb) using vanilla JavaScript, React, and modular CSS.",
          "Optimized Core Web Vitals and browser paint performance across millions of daily user impressions.",
          "Executed A/B multivariate testing to optimize layout click-through rates (CTR)."
        ],
        id: [
          "Membangun dynamic ad widgets dengan JavaScript murni, React, dan CSS responsif dengan ukuran bundel ultra-ringan.",
          "Mengoptimalkan Core Web Vitals dan kecepatan rendering iklan untuk jutaan impresi harian.",
          "Melakukan A/B testing desain antarmuka pengguna untuk memaksimalkan rasio klik-tayang (CTR)."
        ]
      },
      techStack: ["React.js", "JavaScript ES6+", "HTML5/CSS3", "Webpack", "Performance Optimization"]
    }
  ],

  skills: {
    frontend: [
      { name: "React.js", level: 95, tag: "Primary" },
      { name: "Next.js", level: 90, tag: "SSR / App Router" },
      { name: "Vue.js / Nuxt.js", level: 90, tag: "Enterprise Frontend" },
      { name: "Tailwind CSS", level: 95, tag: "Styling" },
      { name: "JavaScript / TypeScript", level: 92, tag: "Core Language" },
      { name: "Leaflet GIS Mapping", level: 88, tag: "Geospatial" },
    ],
    backend: [
      { name: "Laravel (PHP)", level: 95, tag: "Enterprise Core" },
      { name: "Express.js / Node.js", level: 88, tag: "API & Microservices" },
      { name: "PHP (7.x - 8.x)", level: 94, tag: "Enterprise Backend" },
      { name: "RESTful APIs", level: 96, tag: "Architecture" },
      { name: "MySQL / Oracle DB", level: 90, tag: "Databases" },
      { name: "Redis", level: 88, tag: "Caching & Queues" },
    ],
    mobile: [
      { name: "Flutter (Dart)", level: 88, tag: "Cross-Platform" },
      { name: "Kotlin", level: 82, tag: "Android Native" },
      { name: "Firebase Services", level: 85, tag: "Push / Auth" },
      { name: "Mobile UI/UX", level: 88, tag: "Responsive Design" },
    ],
    aiAndTools: [
      { name: "Docker & Kubernetes", level: 86, tag: "DevOps & K8s" },
      { name: "Git & GitLab CI/CD", level: 94, tag: "Version Control" },
      { name: "AI Integration & Prompting", level: 90, tag: "Automation" },
      { name: "Data Analytics", level: 84, tag: "Insights" },
      { name: "Systems Thinking", level: 90, tag: "Architecture" },
      { name: "Postman / API Testing", level: 92, tag: "QA & Documentation" },
    ]
  },

  projects: [
    {
      id: 1,
      title: "Asset Management & WFM System v2.1",
      category: "Full Stack",
      role: {
        en: "Full Stack Developer",
        id: "Full Stack Developer"
      },
      client: "PT. Infrastruktur Telekomunikasi Indonesia (Telkominfra)",
      gitlabUrl: "https://gitlab.com/telkominfraapps/assetmgmt_v2.1",
      description: {
        en: "Enterprise Asset Management and Work Force Management (WFM) platform for Telkominfra. Manages field Preventive Maintenance (PM) and Corrective Maintenance (CM) orders, QR code asset tagging, GPS location stamping, and automated Twilio dispatching.",
        id: "Platform Enterprise Asset Management dan Work Force Management (WFM) Telkominfra. Mengelola siklus order Preventive Maintenance (PM) dan Corrective Maintenance (CM), pemindaian label QR-code aset fisik di menara, pelacakan koordinat GPS teknisi, dan integrasi notifikasi otomatis Twilio."
      },
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      tags: ["Laravel", "Vue.js", "Oracle DB", "MySQL", "QR-Code", "Twilio", "Geolocation"],
      color: "lavender",
      features: {
        en: [
          "Automated Work Force Management (WFM) order pipeline for PM and CM nationwide schedules.",
          "Mobile-friendly physical asset scanning using dynamic QR-code generation and validation.",
          "Technician GPS geolocation tracking with geofence validation for tower site visits.",
          "High-volume Oracle Database integration using server-side DataTables and Excel exports."
        ],
        id: [
          "Manajemen alur kerja order Work Force Management (WFM) untuk jadwal PM dan CM menara nasional.",
          "Pemindaian aset fisik berbasis mobile dengan generator dan validator QR-code dinamis.",
          "Pelacakan koordinat GPS teknisi dengan validasi geofence saat kunjungan menara.",
          "Integrasi Oracle Database volume tinggi dengan server-side DataTables dan ekspor laporan berkala."
        ]
      },
      linkText: "GitLab Repository"
    },
    {
      id: 2,
      title: "LION — NOC Submarine Cable Monitoring",
      category: "Full Stack",
      role: {
        en: "Full Stack Developer",
        id: "Full Stack Developer"
      },
      client: "PT. Infrastruktur Telekomunikasi Indonesia (Telkominfra)",
      gitlabUrl: "https://gitlab.com/telkominfraapps/lion",
      description: {
        en: "Real-time GIS Marine Traffic and Subsea Cable Monitoring Platform. Visualizes Indonesian archipelago submarine fiber-optic cables (SKKL) with KML/KMZ overlay and automated buffer hazard detection (100m, 1km, 2km radius) against marine vessels.",
        id: "Sistem Web GIS pemantauan kabel bawah laut dan lalu lintas maritim nasional (NOC Submarine). Memvisualisasikan jalur Sistem Komunikasi Kabel Laut (SKKL) via overlay KML/KMZ serta deteksi peringatan zona bahaya otomatis (radius 100m, 1km, 2km) terhadap pergerakan kapal laut."
      },
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      tags: ["Laravel", "Vue.js", "Leaflet GIS", "Rotated Marker", "KML/KMZ", "Redis", "MySQL"],
      color: "sky",
      features: {
        en: [
          "Interactive Leaflet geospatial map overlaying subsea cable lines across Indonesian seas.",
          "KML/KMZ geographic file parser and renderer with dynamic cable segment coordinate mapping.",
          "Real-time vessel proximity buffer zones (100m, 1km, 2km) alerting against anchor hazards.",
          "High-performance caching with Redis for rapid multi-vessel telemetry updates."
        ],
        id: [
          "Peta geospasial Leaflet interaktif yang memetakan jalur kabel serat optik bawah laut di perairan Indonesia.",
          "Modul uploader dan parser file KML/KMZ untuk render koordinat rute kabel secara dinamis.",
          "Zona penyangga (buffer radius 100m, 1km, 2km) peringatan dini ancaman labuh jangkar kapal laut.",
          "Caching berkecepatan tinggi dengan Redis untuk pembaruan telemetri banyak kapal secara bersamaan."
        ]
      },
      linkText: "GitLab Repository"
    },
    {
      id: 3,
      title: "NOC-RAN — Radio Access Network Center",
      category: "Full Stack",
      role: {
        en: "Full Stack Developer",
        id: "Full Stack Developer"
      },
      client: "PT. Infrastruktur Telekomunikasi Indonesia (Telkominfra)",
      gitlabUrl: "https://gitlab.com/telkominfraapps/noc-ran",
      description: {
        en: "Nationwide Radio Access Network (RAN) Operations Center monitoring thousands of Base Station (BTS), eNodeB (4G), and gNodeB (5G) nodes across Telkom Group operational territories with real-time alarm telemetry and incident heatmap analysis.",
        id: "Pusat operasi monitoring jaringan akses radio seluler (NOC-RAN) nasional. Memantau kesehatan ribuan node Base Station (BTS), eNodeB (4G), dan gNodeB (5G) di seluruh wilayah operasional Telkom Group dengan telemetri alarm anomali real-time dan pemetaan geografis insiden."
      },
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      tags: ["Laravel", "Vue.js", "Leaflet GIS", "Redis", "High-Throughput Telemetry", "MySQL"],
      color: "mint",
      features: {
        en: [
          "Real-time operational dashboard visualizing cellular tower statuses across all Indonesian regions.",
          "Automated incident alert engine filtering critical network faults and outage triggers.",
          "Batch CSV and Excel ingestion pipeline for bulk telecommunication node configurations.",
          "Containerized architecture prepared for high availability enterprise deployment."
        ],
        id: [
          "Dashboard operasional real-time yang memvisualisasikan status menara seluler di seluruh wilayah Indonesia.",
          "Mesin peringatan anomali otomatis yang menyaring kegagalan transmisi kritis jaringan.",
          "Pipeline import data massal CSV dan Excel untuk konfigurasi ribuan node perangkat telekomunikasi.",
          "Arsitektur ter-kontainerisasi siap pakai untuk ketersediaan tinggi di level enterprise."
        ]
      },
      linkText: "GitLab Repository"
    },
    {
      id: 4,
      title: "RENATA — HR Talent & E-Learning Portal",
      category: "Full Stack",
      role: {
        en: "Full Stack Developer",
        id: "Full Stack Developer"
      },
      client: "PT. Infrastruktur Telekomunikasi Indonesia (Telkominfra)",
      gitlabUrl: "https://gitlab.com/telkominfraapps/renata",
      description: {
        en: "Comprehensive Enterprise HR-Tech Platform managing end-to-end recruitment pipelines, applicant tracking, internal employee LMS/E-Learning course modules, and technical competency matrices.",
        id: "Platform Enterprise HR-Tech terpadu Telkominfra untuk manajemen rekrutmen karyawan, pelacakan proses lamaran kerja, modul pembelajaran E-Learning / LMS internal, serta pemetaan matriks kompetensi keahlian staf teknis."
      },
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      tags: ["Laravel", "Vue.js", "JWT Auth", "Spatie Permission", "Oracle DataTables", "Redis"],
      color: "peach",
      features: {
        en: [
          "End-to-end job vacancy publishing and candidate application tracking workflow (ATS).",
          "Integrated corporate E-Learning portal with video lessons, quiz assessments, and progress tracking.",
          "Role-Based Access Control (RBAC) powered by Spatie with secure JWT session tokens.",
          "Staff technical skills taxonomy and competency assessment matrices for internal promotions."
        ],
        id: [
          "Alur kerja publikasi lowongan kerja dan pelacakan lamaran kandidat terintegrasi (ATS).",
          "Portal E-Learning korporat internal dengan materi video, kuis evaluasi, dan pelacakan progres belajar.",
          "Sistem hak akses bertingkat (RBAC) Spatie Permission dengan keamanan token autentikasi JWT.",
          "Taksonomi keahlian teknis karyawan dan evaluasi matriks kompetensi untuk pengembangan karier."
        ]
      },
      linkText: "GitLab Repository"
    },
    {
      id: 5,
      title: "WBS — Telkominfra Whistleblowing System",
      category: "Full Stack",
      role: {
        en: "Full Stack Developer",
        id: "Full Stack Developer"
      },
      client: "PT. Infrastruktur Telekomunikasi Indonesia (Telkominfra)",
      gitlabUrl: "https://gitlab.com/telkominfraapps/wbs",
      description: {
        en: "Secure Corporate Governance and Compliance Reporting Channel. Provides confidential, encrypted whistleblowing submission for corporate fraud, ethical violations, and compliance audits with automated officer routing.",
        id: "Saluran pelaporan tata kelola perusahaan (*Good Corporate Governance*) dan kepatuhan hukum Telkominfra. Menyediakan kanal pengaduan pelanggaran, kecurangan (anti-fraud), dan pelanggaran kode etik secara anonim dan terenkripsi dengan alur investigasi berjenjang."
      },
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
      tags: ["Laravel", "Vue.js", "Notification Service", "Captcha", "Audit Logs", "MySQL"],
      color: "butter",
      features: {
        en: [
          "Anonymous reporting workflow with encrypted ticket identification tokens for whistleblowers.",
          "Tiered compliance officer investigation dashboard with confidential evidence attachments.",
          "Instant notification dispatching to authorized internal audit committees upon report filing.",
          "Spam resilience with multi-layer Captcha and brute-force rate limiting protections."
        ],
        id: [
          "Alur pelaporan anonim dengan token identifikasi tiket terenkripsi untuk pelapor (whistleblower).",
          "Dashboard investigasi komite audit internal dengan manajemen lampiran bukti rahasia.",
          "Notifikasi instan otomatis kepada tim kepatuhan dan manajemen saat laporan baru masuk.",
          "Perlindungan keamanan berlapis dengan integrasi Captcha dan pembatasan frekuensi pengiriman (rate limiting)."
        ]
      },
      linkText: "GitLab Repository"
    },
    {
      id: 6,
      title: "KEPO — Knowledge Enterprise & Doc Repository",
      category: "Full Stack",
      role: {
        en: "Full Stack Developer",
        id: "Full Stack Developer"
      },
      client: "PT. Infrastruktur Telekomunikasi Indonesia (Telkominfra)",
      gitlabUrl: "https://gitlab.com/telkominfraapps/kepo",
      description: {
        en: "Centralized Knowledge Enterprise and Institutional Document Repository Portal. Facilitates technical SOP access, policy versioning, automated PDF watermarking, and rapid document discovery for nationwide engineering staff.",
        id: "Portal repositori manajemen pengetahuan dan arsip dokumen institusional Telkominfra. Memfasilitasi akses cepat SOP teknis, manajemen versi kebijakan, otomatisasi watermarking PDF via Browsershot/DomPDF, dan pencarian dokumen instan bagi ribuan staf operasional."
      },
      image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=800&q=80",
      tags: ["Laravel", "Vue.js", "Spatie Browsershot", "DomPDF", "PhpSpreadsheet", "Redis"],
      color: "lavender",
      features: {
        en: [
          "Categorized digital archive for Standard Operating Procedures (SOP), work instructions, and telecom standards.",
          "Automated dynamic PDF watermarking with user identity stamping to prevent unauthorized leaks.",
          "Full-text search indexing across technical manuals and operational engineering files.",
          "Document approval cycles and version history tracking for corporate policy updates."
        ],
        id: [
          "Arsip digital terstruktur untuk Standard Operating Procedure (SOP), instruksi kerja, dan standar telekomunikasi.",
          "Watermarking PDF dinamis otomatis dengan identitas pengunduh untuk mencegah kebocoran dokumen internal.",
          "Pencarian cepat berbasis indeks kategori dokumen dan panduan teknis rekayasa lapangan.",
          "Siklus persetujuan dokumen bertingkat dan pelacakan riwayat versi pembaruan kebijakan."
        ]
      },
      linkText: "GitLab Repository"
    },
    {
      id: 7,
      title: "TSA — Tower Site Activity & Assessment",
      category: "Full Stack",
      role: {
        en: "Full Stack Developer",
        id: "Full Stack Developer"
      },
      client: "PT. Infrastruktur Telekomunikasi Indonesia (Telkominfra)",
      gitlabUrl: "https://gitlab.com/telkominfraapps/tsa",
      description: {
        en: "Field Telecommunication Tower Site Audit and Activity Management System. Tracks contractor maintenance visits, telemetry event imports, and real-time operational status with containerized Kubernetes deployment.",
        id: "Sistem audit dan manajemen aktivitas kunjungan menara telekomunikasi lapangan (TSA). Melacak pencatatan kunjungan teknisi kontraktor, histori aktivitas pemeliharaan, impor data event telemetri, serta orkestrasi container dengan Kubernetes."
      },
      image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80",
      tags: ["CodeIgniter", "PHP", "Kubernetes", "Docker", "Event Import", "MySQL"],
      color: "mint",
      features: {
        en: [
          "Operational activity logging and site assessment tracking for thousands of telecom towers.",
          "Batch telemetry event data importer supporting operational performance benchmarking.",
          "Dockerized container builds orchestrated on Kubernetes clusters for continuous uptime.",
          "Custom administrative reporting dashboards monitoring field technical milestones."
        ],
        id: [
          "Pencatatan log aktivitas operasional dan histori audit fisik untuk ribuan menara telekomunikasi.",
          "Modul import data event telemetri berkala untuk tolok ukur performa operasional infrastruktur.",
          "Build container Docker ter-orkestrasi pada cluster Kubernetes untuk stabilitas uptime maksimal.",
          "Dashboard pelaporan KPI operasional untuk memonitor pencapaian target pemeliharaan teknisi."
        ]
      },
      linkText: "GitLab Repository"
    },
    {
      id: 8,
      title: "Bay Pacific SaaS Cloud Manager",
      category: "Full Stack",
      role: {
        en: "Full Stack Developer",
        id: "Full Stack Developer"
      },
      client: "PT. Bay Pacific Software Group",
      description: {
        en: "A multi-tenant enterprise business operation platform featuring automated subscription billing, modular CRM tools, and cross-team collaboration.",
        id: "Aplikasi SaaS multi-tenant untuk manajemen operasional bisnis, tagihan otomatis, dan kolaborasi antar tim perusahaan dalam satu platform terpadu."
      },
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      tags: ["Next.js", "Express.js", "PostgreSQL", "Tailwind CSS", "Stripe API"],
      color: "mint",
      features: {
        en: [
          "Isolated, secure multi-tenant relational database architecture.",
          "Financial analytics dashboard with automated recurring invoicing schedules.",
          "Modern OAuth2 authentication with Two-Factor Verification (2FA)."
        ],
        id: [
          "Arsitektur database multi-tenant yang aman dan terisolasi.",
          "Modul analitik finansial dan otomatisasi faktur berkala.",
          "Sistem autentikasi modern OAuth2 dan Two-Factor Authentication (2FA)."
        ]
      },
      linkText: "Client SaaS Product"
    },
    {
      id: 9,
      title: "Smart City Citizen Portal Mobile App",
      category: "Mobile",
      role: {
        en: "Mobile Developer",
        id: "Mobile Developer"
      },
      client: "Citiasia Inc.",
      description: {
        en: "A citizen-facing civic service mobile application streamlining public infrastructure incident reporting, digital permits, and municipal emergency helplines.",
        id: "Aplikasi mobile layanan publik untuk mempermudah warga dalam melaporkan permasalahan infrastruktur kota, perizinan daring, dan direktori info darurat daerah."
      },
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
      tags: ["Flutter", "Kotlin", "Firebase", "Google Maps SDK", "REST API"],
      color: "sky",
      features: {
        en: [
          "Public facility incident reporting with high-precision camera geotagging.",
          "Automated push notifications tracking civic ticket processing stages.",
          "Cross-platform iOS and Android support with sub-1.5 second cold app launch time."
        ],
        id: [
          "Pelaporan keluhan fasilitas umum dengan foto ber-geotagging akurat.",
          "Pemberitahuan push otomatis saat status laporan diproses dinas terkait.",
          "Tersedia untuk Android dan iOS dengan waktu buka aplikasi di bawah 1.5 detik."
        ]
      },
      linkText: "Smart City App"
    },
    {
      id: 10,
      title: "AI Research & Brainstorming Engine",
      category: "AI & Web",
      role: {
        en: "Creator & Developer",
        id: "Creator & Developer"
      },
      client: "Personal & Research Project",
      description: {
        en: "An AI-powered productivity system assisting software engineers in visualizing architectural diagrams, generating system schemas, and summarizing dense technical documentation.",
        id: "Tool produktivitas berbasis kecerdasan buatan (AI) yang membantu perekayasa perangkat lunak dalam memetakan arsitektur sistem dan merangkum riset teknis kompleks."
      },
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      tags: ["React.js", "Nuxt.js", "OpenAI API", "Tailwind CSS", "Python"],
      color: "peach",
      features: {
        en: [
          "Automated prompt pipeline transforming functional requirements into system flowcharts.",
          "Key takeaway extraction from API documentation and academic computer science papers.",
          "Clean pastel interface featuring real-time token streaming responses."
        ],
        id: [
          "Prompting pipeline otomatis untuk menghasilkan diagram arsitektur sistem.",
          "Ekstraksi poin penting dari dokumen spesifikasi teknis dan jurnal ilmiah.",
          "Antarmuka pastel modern dengan respons streaming real-time."
        ]
      },
      linkText: "Open Research Tool"
    },
    {
      id: 11,
      title: "Wings FMCG Distribution & E-Commerce Platform",
      category: "Full Stack",
      role: {
        en: "Full Stack Developer",
        id: "Full Stack Developer"
      },
      client: "Wings Distribution Consumer Goods",
      githubUrl: "https://github.com/dandyzain/wings.git",
      description: {
        en: "A robust FMCG consumer goods digital ordering and distribution catalog system inspired by Wings Group. Features multi-tier product hierarchies, dynamic cart management, multi-vendor merchant onboarding (Penjual), simulated e-money payment workflows, and automated sales reporting.",
        id: "Sistem katalog pemesanan digital dan distribusi produk FMCG yang terinspirasi dari Wings Group. Dilengkapi hierarki kategori produk berjenjang, keranjang belanja interaktif, modul merchant multi-vendor (Penjual), simulasi transaksi e-money, serta pelaporan audit penjualan otomatis."
      },
      image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80",
      tags: ["Laravel 8", "Livewire", "MySQL", "Bootstrap", "E-Money Mock", "REST API"],
      color: "sky",
      features: {
        en: [
          "Hierarchical FMCG product catalog with slug-based SEO routing and real-time inventory checks.",
          "Interactive shopping cart with dynamic order quantity recalculation using Livewire.",
          "Vendor merchant portal allowing sellers to upload SKU images, set pricing, and track incoming orders.",
          "Multi-tier payment simulation supporting simulated e-money balance deductions and transaction logging.",
          "Automated periodic sales reports with date range filtering and order status tracking."
        ],
        id: [
          "Katalog produk FMCG berjenjang dengan routing SEO berbasis slug dan pengecekan stok real-time.",
          "Keranjang belanja interaktif dengan kalkulasi ulang total pesanan dinamis menggunakan Livewire.",
          "Portal pedagang/mitra untuk unggah foto SKU, pengaturan harga, dan pemantauan pesanan masuk.",
          "Simulasi pembayaran multi-metode dengan pengurangan saldo e-money dan rekam jejak transaksi.",
          "Laporan rekapitulasi transaksi penjualan periodik dengan filter rentang tanggal dan status order."
        ]
      },
      linkText: "GitHub Repository"
    },
    {
      id: 12,
      title: "KINO Employee Performance Appraisal DSS (TOPSIS)",
      category: "Full Stack",
      role: {
        en: "Full Stack Developer",
        id: "Full Stack Developer"
      },
      client: "PT. Kino Indonesia Tbk",
      githubUrl: "https://github.com/dandyzain/KINO-Web-APP.git",
      description: {
        en: "A Decision Support System (DSS / SPK) engineered for PT. Kino Indonesia Tbk to evaluate employee performance objectively using the TOPSIS (Technique for Order of Preference by Similarity to Ideal Solution) algorithm. Features configurable criteria weighting, normalized decision matrices, and period ranking reports.",
        id: "Sistem Pendukung Keputusan (SPK) penilaian kinerja karyawan di PT. Kino Indonesia Tbk menggunakan algoritma TOPSIS (Technique for Order of Preference by Similarity to Ideal Solution). Menyediakan pembobotan kriteria dinamis, kalkulasi matriks keputusan ternormalisasi, dan laporan perangkingan periodik."
      },
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      tags: ["Laravel 8", "TOPSIS Algorithm", "MySQL", "Bootstrap", "Decision Support System"],
      color: "lavender",
      features: {
        en: [
          "Algorithmic decision engine implementing TOPSIS vector normalization, ideal positive, and ideal negative solutions.",
          "HR administration module to manage employee directories across departments and operational divisions.",
          "Dynamic criteria management with custom benefit and cost weight distributions.",
          "Periodic appraisal runs generating rank-ordered preference scores (V value) for merit promotion.",
          "Printable evaluation summary reports with breakdown of intermediate normalization calculations."
        ],
        id: [
          "Engine algoritma TOPSIS dengan kalkulasi normalisasi vektor, solusi ideal positif (A+), dan ideal negatif (A-).",
          "Modul administrasi HR untuk pendataan direktori karyawan lintas divisi dan departemen.",
          "Manajemen kriteria penilaian fleksibel dengan pembobotan tipe benefit dan cost.",
          "Eksekusi penilaian berkala dengan pemeringkatan nilai preferensi (V) untuk rekomendasi promosi/kinerja.",
          "Cetak rekapitulasi hasil evaluasi lengkap dengan transparansi detail perhitungan matematis."
        ]
      },
      linkText: "GitHub Repository"
    },
    {
      id: 13,
      title: "Apotek ABC Pharmacy Inventory & POS System",
      category: "Full Stack",
      role: {
        en: "Full Stack Developer",
        id: "Full Stack Developer"
      },
      client: "Apotek ABC Healthcare",
      githubUrl: "https://github.com/dandyzain/Web-Apotik.git",
      description: {
        en: "A full-scale pharmacy management and point-of-sale (POS) web system. Regulates pharmaceutical supplies, batch expiry tracking, physical rack/cabinet storage mapping, supplier purchase orders, cashier sales transactions, and audit reporting.",
        id: "Sistem informasi manajemen apotek dan point-of-sale (POS) komprehensif. Mengatur sirkulasi persediaan obat, pemantauan masa kedaluwarsa, pemetaan lokasi rak/lemari penyimpanan, pengadaan dari distributor/pemasok, kasir penjualan, dan laporan transaksi akuntansi."
      },
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80",
      tags: ["Laravel 8", "MySQL", "Bootstrap", "DataTables", "Inventory Management", "POS"],
      color: "mint",
      features: {
        en: [
          "Comprehensive medicine cataloging with unit metrics, categories, dosages, and stock threshold alerts.",
          "Storage unit mapping tracking exact cabinet and shelf positions for rapid medication retrieval.",
          "Supplier procurement pipeline managing purchase orders and incoming inventory balance increments.",
          "Cashier POS interface with automated invoice generation and customer transaction logs.",
          "Audit reports detailing periodic financial revenue, fast-moving medications, and inventory adjustments."
        ],
        id: [
          "Katalog obat terstruktur dengan satuan unit, klasifikasi kategori, dosis, dan batas peringatan stok minimum.",
          "Pemetaan lokasi unit penyimpanan lemari dan rak fisik untuk percepatan pengambilan obat.",
          "Alur pengadaan dari pemasok dengan pencatatan faktur pembelian dan penambahan stok otomatis.",
          "Antarmuka kasir (POS) dengan kalkulasi transaksi cepat dan pencetakan struk penjualan.",
          "Laporan audit berkala mencakup omzet pendapatan, obat paling laris, dan rekap penyesuaian stok."
        ]
      },
      linkText: "GitHub Repository"
    },
    {
      id: 14,
      title: "UMKM Kota Cirebon Digital Marketplace & Directory",
      category: "Full Stack",
      role: {
        en: "Full Stack Developer",
        id: "Full Stack Developer"
      },
      client: "Dinas Koperasi & UMKM Kota Cirebon",
      githubUrl: "https://github.com/dandyzain/UMKM-Kota-Cirebon.git",
      description: {
        en: "A localized digital marketplace and community business directory created to empower Micro, Small, and Medium Enterprises (MSMEs / UMKM) across Cirebon City. Enables culinary, batik, and artisan sellers to showcase products, accept orders, and manage sales digitally.",
        id: "Platform marketplace digital dan direktori pelaku usaha lokal yang dibangun untuk memberdayakan Usaha Mikro, Kecil, dan Menengah (UMKM) se-Kota Cirebon. Memfasilitasi perajin kuliner, batik, dan kriya lokal untuk memajang produk, melayani pesanan, dan mencatat transaksi secara digital."
      },
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
      tags: ["Laravel 8", "Livewire", "MySQL", "Bootstrap", "E-Commerce", "Local Business"],
      color: "peach",
      features: {
        en: [
          "Digital storefront directory categorizing culinary specialties, traditional Cirebonese batik, and handicrafts.",
          "Merchant portal enabling local business owners to manage product variants, pricing, and orders independently.",
          "Interactive customer shopping cart powered by reactive Laravel Livewire components.",
          "Order receipt and payment confirmation pipeline with seller status notifications.",
          "Administrative monitoring dashboard evaluating MSME growth and product traction."
        ],
        id: [
          "Direktori etalase digital UMKM dengan klasifikasi kuliner khas, batik Cirebonan, dan produk kriya.",
          "Portal mitra mandiri bagi pelaku usaha untuk mengelola varian produk, harga, dan pesanan masuk.",
          "Keranjang belanja interaktif pelanggan dengan komponen reaktif Laravel Livewire.",
          "Alur konfirmasi pembayaran dan bukti transaksi dengan pembaruan status pengiriman.",
          "Dashboard pemantauan pertumbuhan UMKM dan statistik produk lokal terpopuler."
        ]
      },
      linkText: "GitHub Repository"
    },
    {
      id: 15,
      title: "SMKN 2 Kuningan Library Circulation System",
      category: "Full Stack",
      role: {
        en: "Full Stack Developer",
        id: "Full Stack Developer"
      },
      client: "SMK Negeri 2 Kuningan",
      githubUrl: "https://github.com/dandyzain/Perpustakaan-Sekolah.git",
      description: {
        en: "An institutional library management and circulation system built for SMK Negeri 2 Kuningan. Automates member registration, book cataloging with cover imagery, barcode-friendly borrowing and return processing, overdue fines calculation, and Excel reporting.",
        id: "Sistem informasi sirkulasi dan manajemen perpustakaan sekolah yang dibangun untuk SMK Negeri 2 Kuningan. Mengotomatisasi pendaftaran anggota, katalog buku dengan sampul digital, pencatatan peminjaman dan pengembalian, kalkulasi denda keterlambatan, serta ekspor laporan Excel."
      },
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80",
      tags: ["PHP Native", "MySQL", "Bootstrap", "Excel Export", "Library Circulation"],
      color: "butter",
      features: {
        en: [
          "Member card management storing student identifiers, classes, and contact records.",
          "Book collection indexing with digital cover uploads, categorization, and physical inventory tracking.",
          "Fast-track circulation counter handling loan timestamps, return deadlines, and automatic overdue fine formulas.",
          "One-click spreadsheet export generating Excel inventory balance and loan history sheets.",
          "Printable official library administration reports for periodic school accreditation audits."
        ],
        id: [
          "Manajemen kartu anggota perpustakaan mencakup data NIS siswa, jurusan, dan kontak.",
          "Pendataan inventaris buku dengan upload sampul digital, kategori keilmuan, dan stok ketersediaan.",
          "Loket sirkulasi peminjaman dan pengembalian buku dengan kalkulasi otomatis denda keterlambatan.",
          "Ekspor rekapitulasi inventaris dan buku pinjaman ke format Microsoft Excel dengan satu klik.",
          "Cetak format laporan resmi administrasi perpustakaan untuk kebutuhan pelaporan akreditasi sekolah."
        ]
      },
      linkText: "GitHub Repository"
    },
    {
      id: 16,
      title: "BPN Land Registration & PTSL Admin Portal",
      category: "Full Stack",
      role: {
        en: "Full Stack Developer",
        id: "Full Stack Developer"
      },
      client: "Badan Pertanahan Nasional (BPN)",
      githubUrl: "https://github.com/dandyzain/Pendaftaran-Tanah.git",
      description: {
        en: "A land administration information system tailored for Badan Pertanahan Nasional (BPN) supporting PTSL (Pendaftaran Tanah Sistematis Lengkap). Manages village land parcel clusters, committee adjudication teams, ownership search, and official Lampiran 13 legal documentation.",
        id: "Sistem informasi administrasi pendaftaran tanah yang dikembangkan untuk Badan Pertanahan Nasional (BPN) dalam mendukung program PTSL (Pendaftaran Tanah Sistematis Lengkap). Mengelola klaster data desa, tim panitia adjudikasi, pencarian status bidang tanah, serta format resmi Lampiran 13 yuridis."
      },
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
      tags: ["PHP Native", "MySQL", "Bootstrap", "Session Auth", "Legal Administration", "PTSL"],
      color: "emerald",
      features: {
        en: [
          "Village parcel cluster registry recording land status, applicant identity, and location coordinates.",
          "Adjudication committee management structuring surveyor teams and administrative verifiers.",
          "High-speed parcel search engine querying national land records by applicant name or parcel number.",
          "Automated generation of official BPN legal documents including standardized Lampiran 13 dossiers.",
          "Role-based access control protecting state land legal data integrity."
        ],
        id: [
          "Registrasi klaster data bidang tanah desa dengan rekam data pemohon dan bukti alas hak.",
          "Manajemen susunan panitia adjudikasi PTSL untuk tim yuridis dan tim pengukuran fisik.",
          "Mesin pencarian cepat berkas tanah berdasarkan nomor berkas, nama pemohon, atau desa.",
          "Generator otomatis format yuridis resmi Badan Pertanahan Nasional termasuk Lampiran 13.",
          "Autentikasi keamanan data berbasis hak akses untuk menjaga kerahasiaan berkas pertanahan."
        ]
      },
      linkText: "GitHub Repository"
    },
    {
      id: 17,
      title: "PLN Post-Paid Electricity Billing & Payment Portal",
      category: "Full Stack",
      role: {
        en: "Full Stack Developer",
        id: "Full Stack Developer"
      },
      client: "Perusahaan Listrik Negara (PLN) / UKK",
      githubUrl: "https://github.com/dandyzain/Pembayaran-Listrik.git",
      description: {
        en: "A full-featured post-paid electricity utility billing and cashier payment portal developed for the national vocational competency assessment (UKK/Ujikom). Handles power tariff structures, monthly meter readings, automated bill calculation with penalties, payment transactions, and receipt printing.",
        id: "Portal sistem penagihan dan pembayaran loket listrik pascabayar PLN yang dikembangkan untuk Uji Kompetensi Keahlian (UKK) Rekayasa Perangkat Lunak. Mengelola golongan tarif daya, pencatatan meteran berkala, kalkulasi tagihan dan denda keterlambatan otomatis, transaksi loket, serta cetak struk pembayaran resmi."
      },
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
      tags: ["CodeIgniter 3", "MySQL", "Bootstrap", "DataTables", "Billing Gateway", "MVC"],
      color: "cyan",
      features: {
        en: [
          "Tiered power tariff management structuring daya categories (VA) and cost per kWh formulas.",
          "Customer monthly meter usage logging with initial/final readings and delta consumption auditing.",
          "Automated billing generator applying tariff rates, administrative charges, and overdue penalties.",
          "Cashier payment processing gateway logging operator credentials, payment timestamps, and change calculations.",
          "Official PLN transaction receipt printing and periodic financial reconciliation reports."
        ],
        id: [
          "Manajemen golongan tarif daya listrik (VA) beserta formula penentuan tarif dasar per kWh.",
          "Pencatatan meteran penggunaan bulanan pelanggan dengan input meter awal, meter akhir, dan kalkulasi pemakaian.",
          "Generator tagihan otomatis yang menerapkan beban tarif, biaya admin, dan denda keterlambatan.",
          "Loket kasir pembayaran tagihan dengan validasi operator, pencatatan waktu transaksi, dan penghitungan kembalian.",
          "Pencetakan struk pembayaran resmi dan laporan rekapitulasi penerimaan kas loket periodik."
        ]
      },
      linkText: "GitHub Repository"
    },
    {
      id: 18,
      title: "Indosehat Clinical Service & Patient QR Management",
      category: "Full Stack",
      role: {
        en: "Full Stack Developer",
        id: "Full Stack Developer"
      },
      client: "Klinik Pratama Indosehat",
      githubUrl: "https://github.com/dandyzain/Web-Indosehat.git",
      description: {
        en: "An integrated healthcare clinic and patient intake administration system. Streamlines online patient appointments, multi-branch clinic directory management (master_klinik), dynamic Endroid QR-code digital patient card generation, and automated medical checkup report exports with DomPDF.",
        id: "Sistem informasi manajemen pelayanan klinik kesehatan dan administrasi pasien terpadu. Menyederhanakan pendaftaran pasien daring, direktori cabang klinik (master_klinik), penerbitan kartu berobat digital dengan QR-Code dinamis (Endroid QR-Code), serta cetak laporan rekam medis via DomPDF."
      },
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
      tags: ["CodeIgniter 3", "MySQL", "Argon Dashboard", "DomPDF", "Endroid QR-Code", "Healthcare"],
      color: "lavender",
      features: {
        en: [
          "Online patient self-registration portal capturing demographic records, complaints, and target clinic selection.",
          "Multi-branch clinic master database regulating service capacities, doctors on duty, and clinical operational data.",
          "Dynamic Endroid QR-Code generation embedding encrypted patient identification for instant front-desk check-in.",
          "Automated medical checkup and consultation report export engine using DomPDF formatting.",
          "Modern administrative interface built upon the Argon Dashboard UI design system."
        ],
        id: [
          "Portal pendaftaran mandiri pasien online mencakup data demografis, riwayat keluhan, dan pilihan cabang klinik.",
          "Master data multi-cabang klinik untuk pengaturan kapasitas layanan, jadwal dokter, dan operasional poli.",
          "Penerbitan kartu pasien digital berbasis QR-Code dinamis (Endroid QR-Code) untuk verifikasi cepat di loket.",
          "Ekspor surat keterangan medis dan rekapitulasi data pemeriksaan pasien otomatis dengan DomPDF.",
          "Antarmuka admin responsif dan modern berbasis sistem desain Argon Dashboard."
        ]
      },
      linkText: "GitHub Repository"
    }
  ],

  education: [
    {
      institution: "Universitas Catur Insan Cendikia (UCIC)",
      degree: {
        en: "Bachelor's Degree (S.Kom), Informatics Engineering",
        id: "Gelar Sarjana (S1), Teknik Informatika"
      },
      period: "September 2019 - September 2023",
      location: "Cirebon, Indonesia",
      description: {
        en: "Comprehensive studies in software engineering, data structures & algorithms, computer system architecture, relational database management, and intelligent application development. Graduated with honors.",
        id: "Mempelajari rekayasa perangkat lunak, algoritma & struktur data, arsitektur sistem komputer, basis data relasional, dan pengembangan aplikasi cerdas. Lulus dengan predikat memuaskan."
      }
    },
    {
      institution: "SMK Negeri 2 Kuningan",
      degree: {
        en: "Vocational High School Diploma, Software Engineering (RPL)",
        id: "Pendidikan Menengah Kejuruan, Rekayasa Perangkat Lunak (RPL)"
      },
      period: "June 2015 - June 2018",
      location: "Kuningan, West Java, Indonesia",
      description: {
        en: "Built core foundations in computational logic, C/PHP/Java fundamentals, relational database schema modeling, and foundational web application development.",
        id: "Membangun fondasi logika pemrograman, dasar bahasa C/PHP/Java, pemodelan database, dan pengembangan aplikasi web dasar."
      }
    }
  ],

  certifications: [
    {
      title: "AI for Research and Insights",
      issuer: "LinkedIn Learning / Professional Certificate",
      category: "AI & Innovation",
      badgeColor: "bg-pastel-lavender/60 text-indigo-700 dark:text-indigo-300"
    },
    {
      title: "AI for Brainstorming and Planning",
      issuer: "Professional AI Certificate",
      category: "AI & Innovation",
      badgeColor: "bg-pastel-peach/60 text-rose-700 dark:text-rose-300"
    },
    {
      title: "Thinking In Systems",
      issuer: "System Architecture & Problem Solving",
      category: "Methodology",
      badgeColor: "bg-pastel-mint/60 text-emerald-700 dark:text-emerald-300"
    },
    {
      title: "Introduction to Git and GitHub",
      issuer: "Google / Tech Foundation",
      category: "Software Engineering",
      badgeColor: "bg-pastel-sky/60 text-sky-700 dark:text-sky-300"
    },
    {
      title: "Automating Real-World Tasks with Python",
      issuer: "Google IT Automation Series",
      category: "Automation & Scripting",
      badgeColor: "bg-pastel-butter/60 text-amber-800 dark:text-amber-300"
    },
    {
      title: "Data Analytics Essentials",
      issuer: "Analytics Foundation",
      category: "Data & Insights",
      badgeColor: "bg-pastel-lilac/60 text-purple-700 dark:text-purple-300"
    },
    {
      title: "Make Change Starting With Public Speaking",
      issuer: "Leadership & Communication",
      category: "Soft Skills",
      badgeColor: "bg-pastel-peach/50 text-orange-700 dark:text-orange-300"
    }
  ],

  translations: {
    en: {
      nav: {
        about: "About",
        experience: "Experience",
        skills: "Skills",
        projects: "Projects",
        education: "Education & Certs",
        contact: "Contact",
        viewCV: "View CV",
        contactMe: "Get in Touch",
        available: "Available",
      },
      hero: {
        greeting: "Hello world, I am",
        headlineStart: "Crafting Mission-Critical",
        headlineHighlight: "Modern Systems",
        headlineRotating: [
          "Modern Systems",
          "Web Apps",
          "GIS Platforms",
          "Cloud APIs",
          "Telecom NOC"
        ],
        activeAt: "Active at PT. Infrastruktur Telekomunikasi Indonesia",
        exploreProjects: "Explore Projects",
        viewCV: "View / Print CV",
        whatsapp: "WhatsApp",
        connected: "CONNECT:",
        roles: {
          fullstack: "Full Stack Developer",
          experience: "4+ Years Experience"
        }
      },
      about: {
        badge: "About Me",
        title: "Dedicated to High Quality Code & Impactful Solutions",
        subtitle: "Bridging powerful telecommunication architecture with elegant, human-centered digital experiences.",
        professionalSummary: "Professional Summary",
        principlesTitle: "Core Engineering Principles:",
        principles: [
          "Clean & Scalable Architecture",
          "Mission-Critical Reliability",
          "Geospatial & Real-Time Telemetry",
          "Continuous Learning & AI Adoption"
        ],
        workLocation: "Primary Location",
        cards: [
          {
            title: "Telecom & Enterprise Solutions",
            desc: "Engineering national telecom portals (LION Submarine Cable GIS, NOC-RAN Radio Access, Asset Management WFM, TSA) for Telkom Group."
          },
          {
            title: "Full Stack Web Mastery",
            desc: "End-to-end web engineering using Laravel, Express.js, React.js, Next.js, and Vue.js with a laser focus on clean architecture and low latency."
          },
          {
            title: "Mobile App Development",
            desc: "Specializing in Flutter cross-platform and Kotlin native Android with responsive 60fps UX across mobile devices."
          },
          {
            title: "DevOps & Cloud Orchestration",
            desc: "Containerized application workflows utilizing Docker, Kubernetes orchestration, Redis caching, and CI/CD pipelines."
          }
        ]
      },
      experience: {
        badge: "Career History",
        title: "Professional Work Experience",
        subtitle: "Building software across enterprise telecom infrastructure, global SaaS platforms, smart cities, and high-scale ad-tech.",
        selectPrompt: "Select Experience for Details:",
        activeBadge: "Active",
        contributions: "Key Contributions & Impact:",
        techUsed: "Technologies Used:"
      },
      skills: {
        badge: "Skills & Tech Stack",
        title: "Technical Arsenal & Development Tools",
        subtitle: "A modern combination of technologies applied to engineer resilient, high-speed software.",
        categories: {
          all: "All Skills",
          frontend: "Frontend",
          backend: "Backend & DB",
          mobile: "Mobile (Flutter & Kotlin)",
          aiAndTools: "DevOps & Tools"
        },
        groups: {
          frontend: {
            title: "Frontend & Web GIS Development",
            desc: "Crafting aesthetic, modular, and interactive interfaces with React, Next.js, Vue, and Leaflet Geospatial mapping."
          },
          backend: {
            title: "Backend & Telecom Architecture",
            desc: "Designing secure business logic, high-throughput transaction processing, and standardized REST APIs using Laravel and Express."
          },
          mobile: {
            title: "Cross-Platform & Native Mobile",
            desc: "Building smooth smartphone apps for Android & iOS using Flutter and Kotlin with efficient memory utilization."
          },
          aiAndTools: {
            title: "DevOps, Kubernetes & Workflow Tools",
            desc: "Container orchestration (Docker/K8s), Git/GitLab CI/CD, AI prompt engineering, and Systems Thinking methodologies."
          }
        }
      },
      projects: {
        badge: "Portfolio Showcase",
        title: "Featured Enterprise Projects & Case Studies",
        subtitle: "Real-world productions spanning Telkominfra telecommunication platforms, multi-tenant SaaS, and mobile applications.",
        categories: ["All", "Full Stack", "Mobile", "AI & Web"],
        studyCase: "Explore Case Study",
        openGitLab: "GitLab Repository",
        openGitHub: "GitHub Repository",
        modal: {
          aboutProject: "About This Project:",
          keyFeatures: "Key Features & Implementation:",
          techUsed: "Technologies Used:",
          openGitLabButton: "Open on GitLab",
          openGitHubButton: "Open on GitHub",
          close: "Close Details"
        }
      },
      education: {
        badge: "Education & Credentials",
        title: "Academic Background & Professional Certifications",
        subtitle: "A computer science degree complemented by verified certifications in AI, systems engineering, and automation.",
        academicHistory: "Academic History",
        higherEd: "Higher Education",
        vocationalEd: "Vocational High School",
        certificationsTitle: "Official Certifications & Licenses",
        verifiedCount: "7 Verified Credentials"
      },
      contact: {
        badge: "Let's Collaborate",
        title: "Get In Touch & Discuss Your Next Project",
        subtitle: "Open for full-time software engineering roles, technical consulting, and medium-to-large application projects.",
        directChannels: "Direct Communication Channels",
        sendChat: "Send Message →",
        viewProfile: "Open Profile →",
        fullAddress: "Full Address",
        viewCVPrompt: "View & Download Curriculum Vitae (PDF)",
        formTitle: "Send a Message",
        formSubtitle: "This form will prepare a pre-filled email draft directly to my verified inbox.",
        successNotice: "Thank you! Your message has been prepared. Your email client will open for confirmation.",
        nameLabel: "Full Name *",
        namePlaceholder: "Enter your name",
        emailLabel: "Email Address *",
        emailPlaceholder: "name@company.com",
        topicLabel: "Inquiry Topic / Service Needed",
        topicOptions: [
          { value: "Enterprise Telecom & Web Development", label: "Enterprise Telecom & Web Development (Laravel / React / Vue)" },
          { value: "Mobile App Development", label: "Mobile App Development (Flutter / Kotlin)" },
          { value: "Full Stack Web Development", label: "Full Stack Web Development (Next.js / Express)" },
          { value: "Full-time / Remote Opportunity", label: "Career Opportunity (Full-time / Remote)" },
          { value: "Technical Consulting", label: "Technical & Architectural Consulting" }
        ],
        messageLabel: "Your Message *",
        messagePlaceholder: "Describe your project requirements, challenges, or opportunity...",
        sendButton: "Send Message Now"
      },
      cvModal: {
        title: "Curriculum Vitae Preview — Dandy Rahmat Zain",
        downloadOriginal: "Download Original PDF",
        printSave: "Print / Save as PDF",
        summaryTitle: "Professional Summary",
        experienceTitle: "Work Experience",
        educationTitle: "Formal Education",
        certificationsTitle: "Key Certifications",
        skillsTitle: "Core Technical Skills"
      },
      footer: {
        tagline: "Full Stack Developer committed to clean code, high performance scalability, and inspired design.",
        quickLinks: "Quick Navigation",
        quickConsult: "Direct Consultation",
        quickConsultDesc: "Looking to discuss project availability or schedule an interview?",
        whatsappChat: "Chat via WhatsApp",
        copyright: "All rights reserved. Built with React.js & Tailwind CSS (Pastel Edition).",
        backToTop: "Back to Top"
      }
    },
    id: {
      nav: {
        about: "Tentang",
        experience: "Pengalaman",
        skills: "Keahlian",
        projects: "Proyek",
        education: "Edukasi & Sertifikasi",
        contact: "Kontak",
        viewCV: "Lihat CV",
        contactMe: "Hubungi Saya",
        available: "Tersedia",
      },
      hero: {
        greeting: "Halo dunia, perkenalkan saya",
        headlineStart: "Membangun Sistem Misi-Kritis",
        headlineHighlight: "Sistem Modern",
        headlineRotating: [
          "Sistem Modern",
          "Aplikasi Web",
          "Platform GIS",
          "Layanan API",
          "Pusat Jaringan"
        ],
        activeAt: "Aktif di PT. Infrastruktur Telekomunikasi Indonesia",
        exploreProjects: "Jelajahi Proyek",
        viewCV: "Lihat / Cetak CV",
        whatsapp: "WhatsApp",
        connected: "TERHUBUNG:",
        roles: {
          fullstack: "Full Stack Developer",
          experience: "4+ Tahun Pengalaman"
        }
      },
      about: {
        badge: "Tentang Saya",
        title: "Dedikasi Menghadirkan Kode Berkualitas & Solusi Berdampak",
        subtitle: "Menghubungkan logika telekomunikasi yang tangguh dengan pengalaman visual digital yang elegan.",
        professionalSummary: "Ringkasan Profesional",
        principlesTitle: "Prinsip Rekayasa Perangkat Lunak:",
        principles: [
          "Clean & Scalable Architecture",
          "Mission-Critical Reliability",
          "Geospatial & Real-Time Telemetry",
          "Continuous Learning & AI Adoption"
        ],
        workLocation: "Lokasi Kerja",
        cards: [
          {
            title: "Solusi Telekomunikasi & Enterprise",
            desc: "Rekayasa aplikasi nasional (LION GIS Kabel Laut, NOC-RAN Seluler, Asset Management WFM, TSA) untuk Telkom Group."
          },
          {
            title: "Full Stack Web Mastery",
            desc: "Pengembangan end-to-end dengan Laravel, Express.js, React.js, Next.js, dan Vue.js. Fokus pada arsitektur bersih dan latensi rendah."
          },
          {
            title: "Mobile App Development",
            desc: "Spesialisasi dalam Flutter cross-platform dan Kotlin native Android dengan performa 60fps yang responsif di berbagai perangkat smartphone."
          },
          {
            title: "DevOps & Orkestrasi Cloud",
            desc: "Alur kerja aplikasi ter-kontainerisasi dengan Docker, orkestrasi Kubernetes, Redis caching, dan pipeline otomatisasi CI/CD."
          }
        ]
      },
      experience: {
        badge: "Riwayat Karier",
        title: "Pengalaman Kerja Profesional",
        subtitle: "Kiprah dalam membangun produk digital berskala enterprise, infrastruktur telekomunikasi nasional, smart city, hingga ad-tech.",
        selectPrompt: "Pilih Pengalaman untuk Detail:",
        activeBadge: "Aktif",
        contributions: "Kontribusi Kunci & Pencapaian:",
        techUsed: "Teknologi yang Digunakan:"
      },
      skills: {
        badge: "Keahlian & Tech Stack",
        title: "Kekuatan Teknis & Perangkat Kerja",
        subtitle: "Kombinasi teknologi modern yang digunakan untuk mewujudkan produk perangkat lunak handal.",
        categories: {
          all: "Semua Keahlian",
          frontend: "Frontend",
          backend: "Backend & DB",
          mobile: "Mobile (Flutter & Kotlin)",
          aiAndTools: "DevOps & Tools"
        },
        groups: {
          frontend: {
            title: "Frontend & Web GIS Development",
            desc: "Menciptakan antarmuka yang estetis, modular, responsif, dan kaya interaksi dengan React, Next.js, Vue, dan pemetaan Leaflet GIS."
          },
          backend: {
            title: "Backend & Arsitektur Telekomunikasi",
            desc: "Membangun logika bisnis yang aman, pemrosesan transaksi berkecepatan tinggi, dan integrasi API terstandar dengan Laravel dan Express."
          },
          mobile: {
            title: "Cross-Platform & Native Mobile",
            desc: "Pengalaman membangun aplikasi smartphone Android & iOS dengan Flutter dan Kotlin yang efisien dalam penggunaan memori."
          },
          aiAndTools: {
            title: "DevOps, Kubernetes & Workflow Tools",
            desc: "Orkestrasi kontainer (Docker/K8s), Git/GitLab CI/CD, prompt engineering kecerdasan buatan, dan metodologi Systems Thinking."
          }
        }
      },
      projects: {
        badge: "Showcase Portofolio",
        title: "Proyek Enterprise & Studi Kasus Pilihan",
        subtitle: "Kumpulan proyek nyata yang mencakup platform telekomunikasi Telkominfra, aplikasi SaaS multi-tenant, dan mobile application.",
        categories: ["Semua", "Full Stack", "Mobile", "AI & Web"],
        studyCase: "Pelajari Studi Kasus",
        openGitLab: "Repositori GitLab",
        openGitHub: "Repositori GitHub",
        modal: {
          aboutProject: "Tentang Proyek:",
          keyFeatures: "Fitur & Implementasi Utama:",
          techUsed: "Teknologi yang Digunakan:",
          openGitLabButton: "Buka di GitLab",
          openGitHubButton: "Buka di GitHub",
          close: "Tutup Rincian"
        }
      },
      education: {
        badge: "Pendidikan & Kredensial",
        title: "Fondasi Akademik & Sertifikasi Profesional",
        subtitle: "Kombinasi gelar sarjana ilmu komputer dan sertifikasi spesialisasi yang terus diperbarui.",
        academicHistory: "Riwayat Akademik",
        higherEd: "Perguruan Tinggi",
        vocationalEd: "Pendidikan Vokasi",
        certificationsTitle: "Sertifikasi & Lisensi Resmi",
        verifiedCount: "7 Sertifikat Terverifikasi"
      },
      contact: {
        badge: "Mari Berkolaborasi",
        title: "Hubungi Saya & Diskusikan Proyek Anda",
        subtitle: "Terbuka untuk kesempatan kerja full-time, konsultasi teknis, maupun proyek aplikasi skala menengah & besar.",
        directChannels: "Saluran Komunikasi Langsung",
        sendChat: "Kirim Chat →",
        viewProfile: "Buka Profil →",
        fullAddress: "Alamat Lengkap",
        viewCVPrompt: "Lihat & Download Curriculum Vitae (PDF)",
        formTitle: "Kirimkan Pesan Anda",
        formSubtitle: "Formulir ini akan otomatis menyiapkan draf pesan ke email resmi saya.",
        successNotice: "Terima kasih! Pesan Anda telah disiapkan. Klien email Anda akan terbuka untuk konfirmasi pengiriman.",
        nameLabel: "Nama Lengkap *",
        namePlaceholder: "Masukkan nama Anda",
        emailLabel: "Alamat Email *",
        emailPlaceholder: "nama@perusahaan.com",
        topicLabel: "Kebutuhan / Topik Diskusi",
        topicOptions: [
          { value: "Enterprise Telecom & Web Development", label: "Enterprise Telecom & Web Development (Laravel / React / Vue)" },
          { value: "Mobile App Development", label: "Mobile App Development (Flutter / Kotlin)" },
          { value: "Full Stack Web Development", label: "Full Stack Web Development (Next.js / Express)" },
          { value: "Full-time / Remote Opportunity", label: "Tawaran Posisi Kerja (Full-time / Remote)" },
          { value: "Konsultasi Teknis", label: "Konsultasi Teknis & Arsitektur" }
        ],
        messageLabel: "Pesan Anda *",
        messagePlaceholder: "Ceritakan proyek, tantangan, atau peluang yang ingin Anda diskusikan...",
        sendButton: "Kirim Pesan Sekarang"
      },
      cvModal: {
        title: "Pratinjau Curriculum Vitae — Dandy Rahmat Zain",
        downloadOriginal: "Unduh File PDF Asli",
        printSave: "Cetak / Simpan PDF",
        summaryTitle: "Ringkasan Profesional",
        experienceTitle: "Pengalaman Kerja",
        educationTitle: "Pendidikan Formal",
        certificationsTitle: "Sertifikasi Utama",
        skillsTitle: "Keahlian Teknis Utama"
      },
      footer: {
        tagline: "Full Stack Developer dengan komitmen pada kode bersih, skalabilitas performa, dan desain yang menginspirasi.",
        quickLinks: "Navigasi Halaman",
        quickConsult: "Konsultasi Cepat",
        quickConsultDesc: "Ingin berdiskusi langsung perihal ketersediaan proyek atau jadwal wawancara?",
        whatsappChat: "Chat via WhatsApp",
        copyright: "Hak cipta dilindungi. Dibuat dengan React.js & Tailwind CSS (Pastel Edition).",
        backToTop: "Kembali ke Atas"
      }
    }
  }
};
