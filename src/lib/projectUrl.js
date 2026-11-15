// Path-based routing for the single-page portfolio:
//   /                 English home        /id/                Indonesian home
//   /work/<slug>      case study (EN)     /id/work/<slug>     case study (ID)
// Each of these has a prerendered HTML file (scripts/prerender.mjs) with its own
// title, description and share image, so links unfurl properly.
// Opening a case study pushes a history entry so Back closes it.
// Legacy ?project=<slug> links are upgraded to /work/<slug> on load.

const EVENT = 'projectchange';
const ROUTE_RE = /^(\/id)?(?:\/work\/([a-z0-9-]+))?\/?$/;

/** Parse a pathname → { lang: 'en'|'id'|null, slug } or null if it isn't a site route. */
export function parseRoute(pathname = typeof window !== 'undefined' ? window.location.pathname : '/') {
  const path = pathname.replace(/\/index\.html$/, '/') || '/';
  const m = path.match(ROUTE_RE);
  if (!m) return null;
  return { lang: m[1] ? 'id' : null, slug: m[2] || null };
}

export const langPrefix = (lang) => (lang === 'id' ? '/id' : '');

/** Current UI language as encoded in the URL (null = no prefix). */
const currentLang = () => (parseRoute()?.lang === 'id' ? 'id' : 'en');

export function projectPath(slug, lang = currentLang()) {
  return `${langPrefix(lang)}/work/${slug}`;
}

export function homePath(lang = currentLang()) {
  return `${langPrefix(lang)}/`;
}

export function getProjectSlug() {
  if (typeof window === 'undefined') return null;
  return parseRoute()?.slug || null;
}

export function projectUrl(slug) {
  return new URL(projectPath(slug), window.location.origin).toString();
}

export function openProject(slug, { replace = false } = {}) {
  const url = projectPath(slug);
  if (replace) {
    // keep whether *this* entry was pushed by us, so closing a deep-linked
    // case study never navigates away from the site
    history.replaceState({ project: slug, fromApp: !!history.state?.fromApp }, '', url);
  } else {
    history.pushState({ project: slug, fromApp: true }, '', url);
  }
  window.dispatchEvent(new Event(EVENT));
}

export function closeProject() {
  if (history.state?.fromApp) {
    // we pushed this entry — going back restores the previous URL
    history.back();
    return;
  }
  history.replaceState(null, '', homePath());
  window.dispatchEvent(new Event(EVENT));
}

/** Rewrite the language prefix of the current URL without reloading. */
export function setUrlLanguage(lang) {
  const route = parseRoute();
  if (!route) return;
  const target = route.slug ? projectPath(route.slug, lang) : homePath(lang);
  if (target !== window.location.pathname) {
    history.replaceState(history.state, '', target + window.location.hash);
  }
}

/** Upgrade legacy ?project=<slug> links to the path form. Call once on startup. */
export function upgradeLegacyUrl() {
  const params = new URLSearchParams(window.location.search);
  const legacy = params.get('project');
  if (!legacy) return;
  params.delete('project');
  const qs = params.toString();
  history.replaceState(null, '', projectPath(legacy) + (qs ? `?${qs}` : '') + window.location.hash);
}

/** Subscribe to slug changes (open/close/back/forward). Returns unsubscribe. */
export function onProjectChange(cb) {
  const handler = () => cb(getProjectSlug());
  window.addEventListener('popstate', handler);
  window.addEventListener(EVENT, handler);
  return () => {
    window.removeEventListener('popstate', handler);
    window.removeEventListener(EVENT, handler);
  };
}
