import { track as vercelTrack } from '@vercel/analytics';

// Thin wrapper around Vercel Analytics custom events so a blocked or missing
// analytics script never breaks the UI. Page views are recorded by <Analytics />
// in App.jsx. Note: custom events are only stored on Vercel plans that include
// them; on other plans these calls are harmless no-ops.
export function track(name, props) {
  try {
    vercelTrack(name, props);
  } catch {
    /* analytics unavailable */
  }
}
