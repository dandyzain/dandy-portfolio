import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useCopy } from '../hooks/useCopy';
import Button from './ui/Button';

/** Shown for any path other than "/" (Vercel rewrites every path to the SPA). */
export default function NotFound() {
  const { ui } = useCopy();
  return (
    <main id="main" className="relative grid min-h-[100dvh] place-items-center px-6">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" aria-hidden="true" />
      <div className="max-w-lg text-center">
        <p className="font-mono text-sm text-signal-ink">404 · SIGNAL LOST</p>
        <h1 className="mt-4 text-display-lg font-semibold">{ui.notFound.title}</h1>
        <p className="mt-4 text-ink-2">{ui.notFound.body}</p>
        <Button href="/" size="lg" className="mt-8" external={false}>
          <ArrowLeft size={17} aria-hidden="true" />
          {ui.notFound.home}
        </Button>
      </div>
    </main>
  );
}
