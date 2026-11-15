// Post-build: write one HTML file per route with its own <head> so every URL
// has a correct title, description, canonical, hreflang and share image, then
// generate sitemap.xml and robots.txt. The body is the same SPA shell; the app
// reads the URL on load.
//
//   dist/index.html                 → /
//   dist/id/index.html              → /id/
//   dist/work/<slug>/index.html     → /work/<slug>
//   dist/id/work/<slug>/index.html  → /id/work/<slug>
//
// Set SITE_URL (e.g. https://dandyzain.dev) in the Vercel project's environment
// variables when you move to a custom domain; everything below follows it.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { portfolioData } from '../src/data/portfolioData.js';
import { enrichProjects, shortTitle, subtitleOf } from '../src/data/projectMeta.js';
import { caseStudies } from '../src/data/caseStudies.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const DEFAULT_URL = 'https://dandy-portfolio.vercel.app';
const SITE_URL = (process.env.SITE_URL || process.env.VITE_SITE_URL || DEFAULT_URL).replace(/\/+$/, '');
const LANGS = ['en', 'id'];

const { personal, education } = portfolioData;
const projects = enrichProjects(portfolioData.projects);

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const clip = (s, n = 158) => {
  const t = String(s).replace(/\s+/g, ' ').trim();
  if (t.length <= n) return t;
  return `${t.slice(0, n - 1).replace(/[\s,.;:—-]+\S*$/, '')}…`;
};
const prefix = (lang) => (lang === 'id' ? '/id' : '');
const abs = (path) => `${SITE_URL}${path}`;

const HOME = {
  en: {
    title: 'Dandy Rahmat Zain | Full Stack & Mobile Developer Portfolio',
    description:
      'Full Stack & Mobile Developer at Telkominfra (Telkom Group). Case studies in GIS, real-time telemetry, workflow automation and RAG search — Laravel, Vue, React, Next.js, React Native, Flutter.',
    ogTitle: 'Dandy Rahmat Zain — Full Stack & Mobile Developer',
    ogDescription: 'I build mission-critical systems — from submarine cable monitoring to mobile apps. Case studies, experience and CV.',
  },
  id: {
    title: 'Dandy Rahmat Zain | Portofolio Full Stack & Mobile Developer',
    description:
      'Full Stack & Mobile Developer di Telkominfra (Telkom Group). Studi kasus GIS, telemetri real-time, otomasi workflow, dan pencarian RAG — Laravel, Vue, React, Next.js, React Native, Flutter.',
    ogTitle: 'Dandy Rahmat Zain — Full Stack & Mobile Developer',
    ogDescription: 'Saya membangun sistem misi-kritis — dari pemantauan kabel bawah laut hingga aplikasi mobile. Studi kasus, pengalaman, dan CV.',
  },
};

const person = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: personal.fullName,
  alternateName: personal.preferredName,
  jobTitle: 'Full Stack & Mobile Developer',
  url: `${SITE_URL}/`,
  image: abs('/images/portrait-640.webp'),
  worksFor: { '@type': 'Organization', name: 'PT. Infrastruktur Telekomunikasi Indonesia (Telkominfra)' },
  alumniOf: education?.[0]?.institution ? { '@type': 'CollegeOrUniversity', name: education[0].institution } : undefined,
  address: { '@type': 'PostalAddress', addressLocality: 'Jakarta', addressCountry: 'ID' },
  sameAs: [personal.linkedin, personal.github].filter(Boolean),
  knowsAbout: ['Laravel', 'Vue.js', 'React', 'Next.js', 'React Native', 'Flutter', 'Kotlin', 'GIS', 'Leaflet', 'Redis', 'PostgreSQL', 'RAG'],
};

function pagesFor(lang) {
  const home = {
    path: `${prefix(lang)}/`,
    alt: { en: '/', id: '/id/' },
    title: HOME[lang].title,
    description: HOME[lang].description,
    ogTitle: HOME[lang].ogTitle,
    ogDescription: HOME[lang].ogDescription,
    image: abs('/og-image.jpg'),
    type: 'website',
    jsonld: { '@context': 'https://schema.org', '@graph': [person, { '@type': 'WebSite', url: `${SITE_URL}/`, name: personal.fullName, inLanguage: lang }] },
    priority: '1.0',
  };
  const work = projects.map((p) => {
    const name = shortTitle(p.title);
    const sub = subtitleOf(p.title);
    const study = caseStudies[p.slug];
    const summary = clip(study ? study.problem[lang] : p.description[lang]);
    const caseLabel = lang === 'id' ? 'Studi kasus' : 'Case study';
    return {
      path: `${prefix(lang)}/work/${p.slug}`,
      alt: { en: `/work/${p.slug}`, id: `/id/work/${p.slug}` },
      title: `${name}${sub ? ` — ${sub}` : ''} | ${caseLabel} · Dandy Rahmat Zain`,
      description: summary,
      ogTitle: `${name}${sub ? ` — ${sub}` : ''}`,
      ogDescription: summary,
      image: abs(p.og || '/og-image.jpg'),
      type: 'article',
      jsonld: {
        '@context': 'https://schema.org',
        '@graph': [
          person,
          {
            '@type': 'CreativeWork',
            name: p.title,
            description: clip(p.description[lang], 300),
            url: abs(`${prefix(lang)}/work/${p.slug}`),
            inLanguage: lang,
            author: { '@id': `${SITE_URL}/#person` },
            keywords: p.tags.join(', '),
            ...(p.liveUrl ? { sameAs: p.liveUrl } : {}),
            ...(p.og ? { image: abs(p.og) } : {}),
          },
        ],
      },
      priority: p.featured ? '0.8' : p.academic ? '0.3' : '0.5',
    };
  });
  return [home, ...work];
}

function headFor(page, lang) {
  const url = abs(page.path);
  const tags = [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<link rel="alternate" hreflang="en" href="${esc(abs(page.alt.en))}" />`,
    `<link rel="alternate" hreflang="id" href="${esc(abs(page.alt.id))}" />`,
    `<link rel="alternate" hreflang="x-default" href="${esc(abs(page.alt.en))}" />`,
    `<meta property="og:type" content="${page.type}" />`,
    `<meta property="og:site_name" content="Dandy Rahmat Zain" />`,
    `<meta property="og:locale" content="${lang === 'id' ? 'id_ID' : 'en_US'}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:title" content="${esc(page.ogTitle)}" />`,
    `<meta property="og:description" content="${esc(page.ogDescription)}" />`,
    `<meta property="og:image" content="${esc(page.image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(page.ogTitle)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(page.ogTitle)}" />`,
    `<meta name="twitter:description" content="${esc(page.ogDescription)}" />`,
    `<meta name="twitter:image" content="${esc(page.image)}" />`,
    `<script type="application/ld+json">${JSON.stringify(page.jsonld).replace(/</g, '\\u003c')}</script>`,
  ];
  return tags.map((t) => `    ${t}`).join('\n');
}

const SEO_START = '<!-- seo:start -->';
const SEO_END = '<!-- seo:end -->';

async function main() {
  const template = await readFile(join(DIST, 'index.html'), 'utf8');
  if (!template.includes(SEO_START) || !template.includes(SEO_END)) {
    throw new Error('index.html is missing the <!-- seo:start --> / <!-- seo:end --> markers');
  }
  const [before, rest] = template.split(SEO_START);
  const after = rest.split(SEO_END)[1];

  const sitemap = [];
  let count = 0;
  for (const lang of LANGS) {
    for (const page of pagesFor(lang)) {
      const html = `${before}${SEO_START}\n${headFor(page, lang)}\n    ${SEO_END}${after}`.replace('<html lang="en">', `<html lang="${lang}">`);
      const file = join(DIST, page.path, 'index.html');
      await mkdir(dirname(file), { recursive: true });
      await writeFile(file, html);
      count += 1;
      if (lang === 'en') sitemap.push(page);
    }
  }

  const today = new Date().toISOString().slice(0, 10);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemap
  .flatMap((p) =>
    ['en', 'id'].map(
      (l) => `  <url>
    <loc>${esc(abs(p.alt[l]))}</loc>
    <lastmod>${today}</lastmod>
    <priority>${p.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${esc(abs(p.alt.en))}" />
    <xhtml:link rel="alternate" hreflang="id" href="${esc(abs(p.alt.id))}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(abs(p.alt.en))}" />
  </url>`
    )
  )
  .join('\n')}
</urlset>
`;
  await writeFile(join(DIST, 'sitemap.xml'), xml);
  await writeFile(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

  console.log(`prerender: ${count} pages, sitemap with ${sitemap.length * 2} URLs → ${SITE_URL}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
