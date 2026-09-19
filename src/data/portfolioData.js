export const portfolioData = {
  personal: {
    fullName: "Dandy Rahmat Zain",
    preferredName: "Dandy Zain",
    role: "Full Stack & Mobile Developer",
    tagline: "Quality Code, Inspired Design: Shaping the Digital World with Precision and Creativity.",
    location: "Jakarta Utara, DKI Jakarta, Indonesia",
    address: "Jl. Warakas Gg. 8, Tanjung Priok, Jakarta Utara, DKI Jakarta, Indonesia",
    phone: "+62 878-2504-9777",
    rawPhone: "6287825049777",
    email: "dandyzain.personal@gmail.com",
    linkedin: "https://www.linkedin.com/in/dandy-zain-ab380a290",
    github: "https://github.com/dandyzain",
    status: "Open for New Opportunities & Collaborations",
    bio: [
      "Saya adalah Full Stack & Mobile Developer dengan pengalaman lebih dari 4 tahun dalam merancang dan mengembangkan aplikasi web dan mobile berskala produksi.",
      "Keahlian backend saya berfokus pada Laravel dan Express.js/Node.js untuk arsitektur API yang tangguh, aman, dan scalable. Di sisi frontend, saya menguasai ekosistem modern seperti React.js, Next.js, Vue.js, Nuxt.js, serta Tailwind CSS.",
      "Untuk platform mobile, saya mengembangkan aplikasi menggunakan Flutter dan Kotlin native, memastikan performa tinggi dan pengalaman pengguna (UX) yang mulus di lintas sistem operasi.",
      "Saya juga aktif mengintegrasikan kecerdasan buatan (AI) untuk riset, automatisasi sistem, dan percepatan alur kerja pengembangan perangkat lunak modern."
    ],
    stats: [
      { label: "Tahun Pengalaman", value: "4+" },
      { label: "Proyek Selesai", value: "25+" },
      { label: "Teknologi Dikuasai", value: "15+" },
      { label: "Perusahaan Aktif", value: "2" },
    ]
  },

  experiences: [
    {
      id: "telkominfra",
      company: "PT Infrastruktur Telekomunikasi Indonesia (Telkominfra)",
      role: "Full Stack Developer",
      period: "Februari 2024 - Sekarang",
      duration: "Aktif",
      location: "Jakarta Raya, Indonesia",
      type: "Full-time",
      color: "lavender",
      description: "Bertanggung jawab atas arsitektur sistem perangkat lunak, pengembangan portal web internal, serta integrasi API telekomunikasi berskala besar untuk mendukung operasional infrastruktur jaringan Telkom Group.",
      highlights: [
        "Membangun dashboard monitoring dan manajemen inventaris infrastruktur telekomunikasi dengan React.js dan Laravel.",
        "Mengembangkan RESTful APIs berkecepatan tinggi untuk integrasi telemetri perangkat jaringan secara real-time.",
        "Mengoptimalkan query database relasional berskala data tinggi guna mempercepat waktu muat halaman analitik hingga 40%.",
        "Menerapkan best practice CI/CD dan standarisasi penulisan kode tim developer."
      ],
      techStack: ["Laravel", "React.js", "Tailwind CSS", "MySQL", "REST API", "Docker", "Git"]
    },
    {
      id: "bay-pacific",
      company: "PT. Bay Pacific Software Group",
      role: "Full Stack Developer",
      period: "Oktober 2023 - Sekarang",
      duration: "Aktif",
      location: "Yogyakarta, Indonesia (Remote/Hybrid)",
      type: "Full-time",
      color: "mint",
      description: "Mengembangkan aplikasi web berbasis enterprise untuk berbagai klien internasional dan domestik, mulai dari modul ERP, platform manajemen bisnis, hingga integrasi pihak ketiga.",
      highlights: [
        "Merancang arsitektur microservices dan REST API menggunakan Express.js dan Laravel.",
        "Membangun frontend dinamis dan responsif dengan Next.js, React, dan Vue.js.",
        "Melakukan optimasi performa aplikasi web, caching Redis, dan perbaikan keamanan data klien.",
        "Berkolaborasi aktif dengan Product Manager, UI/UX Designer, dan tim QA dalam metodologi Agile/Scrum."
      ],
      techStack: ["Next.js", "Express.js", "Vue.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Redis"]
    },
    {
      id: "citiasia",
      company: "Citiasia Inc.",
      role: "Mobile Developer",
      period: "Juni 2022 - Desember 2022",
      duration: "7 bulan",
      location: "Jakarta, Indonesia",
      type: "Contract / Project",
      color: "sky",
      description: "Berfokus pada pengembangan aplikasi smart city mobile yang melayani kebutuhan pelayanan publik dan interaksi warga digital pemerintah daerah.",
      highlights: [
        "Mengembangkan aplikasi mobile cross-platform menggunakan Flutter dan modul native Android (Kotlin).",
        "Mengintegrasikan fitur geolocation, push notification, kamera, serta pelaporan keluhan warga secara real-time.",
        "Mengimplementasikan state management yang clean (Bloc/Provider) untuk stabilitas aplikasi.",
        "Memastikan aplikasi memiliki waktu rendering 60fps dengan UI yang intuitif dan mudah digunakan oleh masyarakat luas."
      ],
      techStack: ["Flutter", "Kotlin", "Android SDK", "REST API", "Firebase", "Geolocation"]
    },
    {
      id: "advertnative",
      company: "Advertnative Inc.",
      role: "Frontend Developer",
      period: "September 2018 - September 2019",
      duration: "1 tahun 1 bulan",
      location: "Jakarta Selatan, Indonesia",
      type: "Full-time",
      color: "peach",
      description: "Mengembangkan widget iklan digital interaktif dan landing page berkonversi tinggi untuk platform periklanan native digital.",
      highlights: [
        "Membangun dynamic ad widgets dengan JavaScript murni, React, dan CSS responsif dengan ukuran bundel ultra-ringan.",
        "Mengoptimalkan Core Web Vitals dan kecepatan rendering iklan untuk jutaan impresi harian.",
        "Melakukan A/B testing desain antarmuka pengguna untuk memaksimalkan rasio klik-tayang (CTR)."
      ],
      techStack: ["React.js", "JavaScript ES6+", "HTML5/CSS3", "Webpack", "Performance Optimization"]
    }
  ],

  skills: {
    frontend: [
      { name: "React.js", level: 95, tag: "Primary" },
      { name: "Next.js", level: 90, tag: "SSR / App Router" },
      { name: "Tailwind CSS", level: 95, tag: "Styling" },
      { name: "Vue.js / Nuxt.js", level: 85, tag: "Secondary" },
      { name: "JavaScript / TypeScript", level: 90, tag: "Core Language" },
      { name: "HTML5 / Semantic CSS", level: 95, tag: "Foundation" },
    ],
    backend: [
      { name: "Laravel (PHP)", level: 92, tag: "Enterprise Backend" },
      { name: "Express.js / Node.js", level: 88, tag: "API & Microservices" },
      { name: "PHP", level: 90, tag: "Modern PHP 8+" },
      { name: "RESTful APIs", level: 95, tag: "Architecture" },
      { name: "MySQL / PostgreSQL", level: 88, tag: "Database" },
      { name: "Redis", level: 80, tag: "Caching & Queues" },
    ],
    mobile: [
      { name: "Flutter (Dart)", level: 88, tag: "Cross-Platform" },
      { name: "Kotlin", level: 82, tag: "Android Native" },
      { name: "Firebase Services", level: 85, tag: "Push / Auth" },
      { name: "Mobile UI/UX", level: 88, tag: "Responsive Design" },
    ],
    aiAndTools: [
      { name: "AI Integration & Prompting", level: 90, tag: "LLM / Automation" },
      { name: "Data Analytics", level: 82, tag: "Insights" },
      { name: "Git & GitHub Workflow", level: 92, tag: "Version Control" },
      { name: "Systems Thinking", level: 88, tag: "Architecture" },
      { name: "Docker & Laragon", level: 85, tag: "Dev Environment" },
      { name: "Postman / API Testing", level: 90, tag: "Quality Assurance" },
    ]
  },

  projects: [
    {
      id: 1,
      title: "Telkominfra Network Monitoring System",
      category: "Full Stack",
      role: "Lead Full Stack Developer",
      client: "PT Infrastruktur Telekomunikasi Indonesia",
      description: "Platform pemantauan telekomunikasi cerdas yang memvisualisasikan kondisi ribuan node jaringan di seluruh Indonesia secara live dengan peringatan insiden otomatis.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      tags: ["React.js", "Laravel", "Tailwind CSS", "MySQL", "WebSockets"],
      color: "lavender",
      features: [
        "Peta interaktif sebaran node BTS dengan status konektivitas live.",
        "Sistem notifikasi alert otomatis saat terjadi anomali transmisi.",
        "Ekspor laporan performa uptime bulanan format PDF & Excel.",
        "Role-based access control (RBAC) bertingkat untuk tim teknisi lapangan."
      ],
      linkText: "Internal Enterprise App"
    },
    {
      id: 2,
      title: "Bay Pacific SaaS Cloud Manager",
      category: "Full Stack",
      role: "Full Stack Developer",
      client: "PT. Bay Pacific Software Group",
      description: "Aplikasi SaaS multi-tenant untuk manajemen operasional bisnis, tagihan otomatis, dan kolaborasi antar tim perusahaan dalam satu platform terpadu.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      tags: ["Next.js", "Express.js", "PostgreSQL", "Tailwind CSS", "Stripe API"],
      color: "mint",
      features: [
        "Arsitektur database multi-tenant yang aman dan terisolasi.",
        "Modul analitik finansial dan otomatisasi faktur berkala.",
        "Sistem autentikasi modern OAuth2 dan Two-Factor Authentication (2FA)."
      ],
      linkText: "Client SaaS Product"
    },
    {
      id: 3,
      title: "Smart City Citizen Portal Mobile App",
      category: "Mobile",
      role: "Mobile Developer",
      client: "Citiasia Inc.",
      description: "Aplikasi mobile layanan publik untuk mempermudah warga dalam melaporkan permasalahan infrastruktur kota, perizinan daring, dan direktori info darurat daerah.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
      tags: ["Flutter", "Kotlin", "Firebase", "Google Maps SDK", "REST API"],
      color: "sky",
      features: [
        "Pelaporan keluhan fasilitas umum dengan foto ber-geotagging akurat.",
        "Pemberitahuan push otomatis saat status laporan diproses dinas terkait.",
        "Tersedia untuk Android dan iOS dengan waktu buka aplikasi di bawah 1.5 detik."
      ],
      linkText: "Smart City App"
    },
    {
      id: 4,
      title: "AI Research & Brainstorming Engine",
      category: "AI & Web",
      role: "Creator & Developer",
      client: "Personal & Research Project",
      description: "Tool produktivitas berbasis kecerdasan buatan (AI) yang membantu perekayasa perangkat lunak dalam memetakan arsitektur sistem dan merangkum riset teknis kompleks.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      tags: ["React.js", "Nuxt.js", "OpenAI API", "Tailwind CSS", "Python"],
      color: "peach",
      features: [
        "Prompting pipeline otomatis untuk menghasilkan diagram arsitektur sistem.",
        "Ekstraksi poin penting dari dokumen spesifikasi teknis dan jurnal ilmiah.",
        "Antarmuka pastel modern dengan respons streaming real-time."
      ],
      linkText: "Open Research Tool"
    },
    {
      id: 5,
      title: "High-Speed Native Ad Tech Widget Engine",
      category: "Frontend",
      role: "Frontend Developer",
      client: "Advertnative Inc.",
      description: "Mesin rendering widget iklan native modular ultra-ringan (<30kb) yang disematkan pada ratusan portal berita nasional dengan jutaan impresi per hari.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      tags: ["React.js", "JavaScript ES6", "CSS3", "Webpack"],
      color: "butter",
      features: [
        "Lazy-loading pintar dengan Intersection Observer API.",
        "Cross-browser compatibility hingga versi peramban lama tanpa ketergantungan berat.",
        "Pelacakan metrik klik dan impresi tahan-adblocker dengan privacy compliance."
      ],
      linkText: "High Scale Web Engine"
    }
  ],

  education: [
    {
      institution: "Universitas Catur Insan Cendikia (UCIC)",
      degree: "Gelar Sarjana (S1), Teknik Informatika",
      period: "September 2019 - September 2023",
      location: "Cirebon, Indonesia",
      description: "Mempelajari rekayasa perangkat lunak, algoritma & struktur data, arsitektur sistem komputer, basis data relasional, dan pengembangan aplikasi cerdas. Lulus dengan predikat memuaskan.",
      icon: "graduation"
    },
    {
      institution: "SMK Negeri 2 Kuningan",
      degree: "Pendidikan Menengah Kejuruan, Rekayasa Perangkat Lunak (RPL)",
      period: "Juni 2015 - Juni 2018",
      location: "Kuningan, Jawa Barat",
      description: "Membangun fondasi logika pemrograman, dasar bahasa C/PHP/Java, pemodelan database, dan pengembangan aplikasi web dasar.",
      icon: "school"
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
  ]
};
