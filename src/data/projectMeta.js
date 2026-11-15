// Presentation metadata layered on top of portfolioData.projects (keyed by id),
// so the content file stays untouched. `slug` powers ?project= deep links.
export const projectMeta = {
  2: { slug: 'lion', featured: 1 },
  3: { slug: 'noc-ran', featured: 2 },
  23: { slug: 'nexusflow', featured: 3, logo: '/projects/nexusflow-dag/logo.svg' },
  22: { slug: 'cortex-rag', featured: 4, logo: '/projects/cortex-rag/logo.svg' },
  1: { slug: 'asset-management-wfm' },
  20: { slug: 'fintrack-ai', logo: '/projects/fintrack/logo-256.webp' },
  19: { slug: 'taskflow', logo: '/projects/taskflow/icon-192.png' },
  12: { slug: 'kino-appraisal-dss' },
  7: { slug: 'tsa' },
  21: { slug: 'fintrack-mobile', logo: '/projects/fintrack/logo-256.webp' },
  9: { slug: 'smart-city-citizen-app' },
  4: { slug: 'renata' },
  5: { slug: 'wbs' },
  8: { slug: 'bay-pacific-saas' },
  6: { slug: 'kepo' },
  10: { slug: 'ai-research-engine' },
  11: { slug: 'wings-distribution' },
  18: { slug: 'indosehat-clinic' },
  13: { slug: 'apotek-abc-pos' },
  14: { slug: 'umkm-cirebon-marketplace' },
  16: { slug: 'bpn-ptsl-portal' },
  17: { slug: 'pln-billing-portal' },
  15: { slug: 'smkn2-library' },
};

const slugify = (s) =>
  s
    .toLowerCase()
    .split(/\s[—-]\s/)[0]
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

/** Projects enriched with slug / featured / logo, in the original order. */
export function enrichProjects(projects) {
  return projects.map((p) => {
    const meta = projectMeta[p.id] || {};
    return { ...p, slug: meta.slug || `${slugify(p.title)}-${p.id}`, featured: meta.featured || 0, logo: meta.logo || null };
  });
}

/** Short display name: the part of the title before the em dash. */
export const shortTitle = (title) => title.split(/\s—\s/)[0];
export const subtitleOf = (title) => title.split(/\s—\s/)[1] || '';
