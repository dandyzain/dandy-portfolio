// ?project=<slug> deep links for case studies. Opening pushes a history entry
// so the browser Back button closes the case study.
const EVENT = 'projectchange';

export function getProjectSlug() {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get('project');
}

export function projectUrl(slug) {
  const url = new URL(window.location.href);
  url.searchParams.set('project', slug);
  url.hash = '';
  return url.toString();
}

export function openProject(slug, { replace = false } = {}) {
  const url = projectUrl(slug);
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
  const url = new URL(window.location.href);
  url.searchParams.delete('project');
  history.replaceState(null, '', url.toString());
  window.dispatchEvent(new Event(EVENT));
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
