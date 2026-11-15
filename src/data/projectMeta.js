// Presentation metadata layered on top of portfolioData.projects (keyed by id),
// so the content file stays untouched. `slug` powers /work/<slug> deep links.
//
// - featured:  position among the featured case studies (1 = first)
// - logo:      small logo shown on the cover
// - shots:     real product screenshots. `src` is the base path; files exist as
//              `${src}-960.webp` and `${src}-1600.webp` (16:10).
// - og:        1200×630 share image for /work/<slug>
// - internal:  company code that isn't public → no repo button, shows a note
// - academic:  coursework / exam / concept project → honest label instead of a
//              client name, grouped separately and excluded from headline counts

const ACADEMIC = (en, id) => ({ academic: { en, id } });

export const projectMeta = {
  2: { slug: 'lion', featured: 1, internal: true },
  3: { slug: 'noc-ran', featured: 2, internal: true },
  23: {
    slug: 'nexusflow',
    featured: 3,
    logo: '/projects/nexusflow-dag/logo.svg',
    og: '/projects/nexusflow-dag/og.jpg',
    shots: [
      { src: '/projects/nexusflow-dag/shot-canvas', alt: { en: 'NexusFlow workflow canvas with webhook, rule gate and HTTP action nodes', id: 'Kanvas workflow NexusFlow dengan node webhook, rule gate, dan HTTP action' } },
      { src: '/projects/nexusflow-dag/shot-dashboard', alt: { en: 'NexusFlow dashboard listing managed workflows and worker status', id: 'Dashboard NexusFlow berisi daftar workflow dan status worker' } },
    ],
  },
  22: {
    slug: 'cortex-rag',
    featured: 4,
    logo: '/projects/cortex-rag/logo.svg',
    og: '/projects/cortex-rag/og.jpg',
    shots: [
      { src: '/projects/cortex-rag/shot-landing', alt: { en: 'Cortex RAG landing page with the vector search playground', id: 'Halaman utama Cortex RAG dengan playground pencarian vektor' } },
      { src: '/projects/cortex-rag/shot-workspace', alt: { en: 'Cortex RAG workspace with knowledge base sidebar and grounded assistant', id: 'Workspace Cortex RAG dengan sidebar knowledge base dan asisten grounded' } },
    ],
  },
  1: { slug: 'asset-management-wfm', internal: true },
  20: {
    slug: 'fintrack-ai',
    logo: '/projects/fintrack/logo-256.webp',
    og: '/projects/fintrack/og.jpg',
    shots: [
      { src: '/projects/fintrack/shot-dashboard', alt: { en: 'FinTrack AI financial dashboard with balance, health meter and wallet cards', id: 'Dashboard keuangan FinTrack AI dengan saldo, health meter, dan kartu dompet' } },
    ],
  },
  19: {
    slug: 'taskflow',
    logo: '/projects/taskflow/icon-192.png',
    og: '/projects/taskflow/og.jpg',
    shots: [
      { src: '/projects/taskflow/shot-board', alt: { en: 'TaskFlow Kanban board with Planned, In Development and Shipped columns', id: 'Papan Kanban TaskFlow dengan kolom Planned, In Development, dan Shipped' } },
    ],
  },
  12: { slug: 'kino-appraisal-dss' },
  7: { slug: 'tsa', internal: true },
  21: { slug: 'fintrack-mobile', logo: '/projects/fintrack/logo-256.webp' },
  9: { slug: 'smart-city-citizen-app' },
  4: { slug: 'renata', internal: true },
  5: { slug: 'wbs', internal: true },
  8: { slug: 'bay-pacific-saas' },
  6: { slug: 'kepo', internal: true },
  10: { slug: 'ai-research-engine' },
  11: { slug: 'wings-distribution', ...ACADEMIC('Concept project · inspired by Wings Group', 'Proyek konsep · terinspirasi Wings Group') },
  18: { slug: 'indosehat-clinic', ...ACADEMIC('Academic project · clinic case study', 'Proyek akademik · studi kasus klinik') },
  13: { slug: 'apotek-abc-pos', ...ACADEMIC('Academic project · pharmacy case study', 'Proyek akademik · studi kasus apotek') },
  14: { slug: 'umkm-cirebon-marketplace', ...ACADEMIC('Academic project · Cirebon MSME case study', 'Proyek akademik · studi kasus UMKM Cirebon') },
  16: { slug: 'bpn-ptsl-portal', ...ACADEMIC('Academic project · land registry (PTSL) case study', 'Proyek akademik · studi kasus pendaftaran tanah (PTSL)') },
  17: { slug: 'pln-billing-portal', ...ACADEMIC('Vocational exam project (UKK) · PLN billing case study', 'Proyek ujian kompetensi (UKK) · studi kasus tagihan PLN') },
  15: { slug: 'smkn2-library', ...ACADEMIC('School project · SMKN 2 Kuningan library', 'Proyek sekolah · perpustakaan SMKN 2 Kuningan') },
};

const slugify = (s) =>
  s
    .toLowerCase()
    .split(/\s[—-]\s/)[0]
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

/** Projects enriched with presentation metadata, in the original order. */
export function enrichProjects(projects) {
  return projects.map((p) => {
    const meta = projectMeta[p.id] || {};
    const enriched = {
      ...p,
      slug: meta.slug || `${slugify(p.title)}-${p.id}`,
      featured: meta.featured || 0,
      logo: meta.logo || null,
      shots: meta.shots || [],
      og: meta.og || null,
      internal: !!meta.internal,
      academic: meta.academic || null,
    };
    // Company repositories aren't public: never link to them.
    if (enriched.internal) delete enriched.gitlabUrl;
    return enriched;
  });
}

/** Client line shown on cards: honest label for academic work. */
export const clientLabel = (project, language) => (project.academic ? project.academic[language] : project.client);

/** Short display name: the part of the title before the em dash. */
export const shortTitle = (title) => title.split(/\s—\s/)[0];
export const subtitleOf = (title) => title.split(/\s—\s/)[1] || '';
