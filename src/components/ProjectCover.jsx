import React, { useMemo } from 'react';
import { cn } from '../lib/cn';

// Deterministic pseudo-random generator so each project always gets the same art.
function rng(seed) {
  let s = (seed * 9301 + 49297) % 233280;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function motifFor(p) {
  const tags = p.tags.join(' ');
  if (/Telemetry/i.test(tags)) return 'signal';
  if (/Leaflet|KML|Geolocation|Maps SDK|GIS/i.test(tags)) return 'map';
  if (/DAG|xyflow|RAG|pgvector|Gemini|OpenAI|Vision AI|AI SDK/i.test(tags) || p.category === 'AI & Web') return 'graph';
  if (p.category === 'Mobile') return 'device';
  return 'blocks';
}

const W = 400;
const H = 250;

function MapMotif({ r }) {
  const contours = Array.from({ length: 6 }, (_, i) => {
    const y = 40 + i * 34 + r() * 10;
    return `M-10 ${y} C 90 ${y - 30 + r() * 20}, 160 ${y + 30 - r() * 20}, 240 ${y - 10} S 360 ${y + 20}, 410 ${y - 15}`;
  });
  return (
    <g>
      {contours.map((d, i) => (
        <path key={i} d={d} stroke="rgb(var(--c-ink) / 0.10)" strokeWidth="1" fill="none" />
      ))}
      <path d="M20 210 C 90 180, 120 120, 190 120 S 300 70, 380 40" stroke="rgb(var(--c-signal))" strokeWidth="2" fill="none" />
      {[0.25, 0.55, 0.85].map((t, i) => {
        const cx = 20 + t * 360;
        const cy = 210 - t * 170;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r="14" fill="rgb(var(--c-signal) / 0.12)" />
            <circle cx={cx} cy={cy} r="4" fill="rgb(var(--c-signal))" />
          </g>
        );
      })}
      <circle cx="300" cy="170" r="34" stroke="rgb(var(--c-amber))" strokeDasharray="3 5" fill="none" />
      <circle cx="300" cy="170" r="3" fill="rgb(var(--c-amber))" />
    </g>
  );
}

function GraphMotif({ r }) {
  const nodes = Array.from({ length: 9 }, (_, i) => ({
    x: 40 + (i % 3) * 140 + r() * 40,
    y: 45 + Math.floor(i / 3) * 75 + r() * 25,
  }));
  const edges = [
    [0, 1], [1, 2], [0, 4], [1, 4], [2, 5], [3, 4], [4, 5], [3, 6], [4, 7], [5, 8], [6, 7], [7, 8],
  ].filter(() => r() > 0.2);
  return (
    <g>
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="rgb(var(--c-ink) / 0.16)" strokeWidth="1.25" />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <rect x={n.x - 16} y={n.y - 10} width="32" height="20" rx="6" fill="rgb(var(--c-surface))" stroke={i === 4 ? 'rgb(var(--c-signal))' : 'rgb(var(--c-ink) / 0.2)'} strokeWidth={i === 4 ? 2 : 1} />
          <circle cx={n.x - 7} cy={n.y} r="2.5" fill={i === 4 ? 'rgb(var(--c-signal))' : i % 4 === 0 ? 'rgb(var(--c-amber))' : 'rgb(var(--c-ink) / 0.35)'} />
        </g>
      ))}
    </g>
  );
}

function SignalMotif({ r }) {
  const bars = Array.from({ length: 34 }, (_, i) => 20 + Math.abs(Math.sin(i / 3 + r())) * 120 * (0.4 + r() * 0.6));
  return (
    <g>
      {bars.map((h, i) => (
        <rect key={i} x={20 + i * 11} y={200 - h} width="5" height={h} rx="2.5" fill={i > 22 && i < 27 ? 'rgb(var(--c-amber))' : 'rgb(var(--c-signal) / 0.75)'} />
      ))}
      <line x1="10" y1="200" x2="390" y2="200" stroke="rgb(var(--c-ink) / 0.2)" />
    </g>
  );
}

function DeviceMotif({ r }) {
  return (
    <g>
      <rect x="150" y="28" width="100" height="200" rx="18" fill="rgb(var(--c-surface))" stroke="rgb(var(--c-ink) / 0.25)" strokeWidth="1.5" />
      <rect x="185" y="38" width="30" height="5" rx="2.5" fill="rgb(var(--c-ink) / 0.2)" />
      <rect x="164" y="56" width="72" height="44" rx="8" fill="rgb(var(--c-signal) / 0.18)" />
      <path d={`M170 92 L 186 ${80 - r() * 10} L 200 86 L 214 ${70 - r() * 10} L 230 74`} stroke="rgb(var(--c-signal))" strokeWidth="2" fill="none" />
      {[112, 132, 152, 172].map((y, i) => (
        <g key={y}>
          <circle cx="172" cy={y + 5} r="5" fill={i === 1 ? 'rgb(var(--c-amber))' : 'rgb(var(--c-ink) / 0.15)'} />
          <rect x="184" y={y + 1} width={40 - i * 5} height="4" rx="2" fill="rgb(var(--c-ink) / 0.25)" />
          <rect x="184" y={y + 8} width="24" height="3" rx="1.5" fill="rgb(var(--c-ink) / 0.12)" />
        </g>
      ))}
      <rect x="164" y="196" width="72" height="18" rx="9" fill="rgb(var(--c-ink))" />
    </g>
  );
}

function BlocksMotif({ r }) {
  const cols = [0, 1, 2, 3].map((c) => ({ x: 34 + c * 86, h: 70 + r() * 100 }));
  return (
    <g>
      {cols.map((c, i) => (
        <g key={i}>
          <rect x={c.x} y={215 - c.h} width="64" height={c.h} rx="8" fill={i === 2 ? 'rgb(var(--c-signal) / 0.22)' : 'rgb(var(--c-surface))'} stroke="rgb(var(--c-ink) / 0.18)" />
          {Array.from({ length: Math.floor(c.h / 22) }, (_, j) => (
            <rect key={j} x={c.x + 10} y={225 - c.h + j * 20} width={30 + r() * 14} height="4" rx="2" fill="rgb(var(--c-ink) / 0.18)" />
          ))}
        </g>
      ))}
      <line x1="20" y1="215" x2="380" y2="215" stroke="rgb(var(--c-ink) / 0.25)" />
      <circle cx={34 + 2 * 86 + 32} cy={215 - cols[2].h - 14} r="5" fill="rgb(var(--c-amber))" />
    </g>
  );
}

const MOTIFS = { map: MapMotif, graph: GraphMotif, signal: SignalMotif, device: DeviceMotif, blocks: BlocksMotif };

/** Responsive <picture> for a real screenshot (`${src}-960/1600.webp`). */
export function Screenshot({ shot, alt, sizes = '(min-width: 1024px) 60vw, 100vw', className, eager = false }) {
  return (
    <img
      src={`${shot.src}-960.webp`}
      srcSet={`${shot.src}-960.webp 960w, ${shot.src}-1600.webp 1600w`}
      sizes={sizes}
      alt={alt}
      width="1600"
      height="1000"
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={cn('h-full w-full object-cover object-top', className)}
    />
  );
}

/**
 * Cover for a project. Uses the first real screenshot when one exists;
 * otherwise generated SVG art (themed via CSS variables, deterministic per
 * project). Shows the real logo when present.
 */
export default function ProjectCover({ project, className, showLabel = true, sizes }) {
  const shot = project.shots?.[0];
  if (shot) {
    return (
      <div className={cn('relative overflow-hidden bg-surface-2', className)} aria-hidden="true">
        <Screenshot shot={shot} alt="" sizes={sizes} className="transition-transform duration-slow ease-out group-hover:scale-[1.02]" />
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-ink/5" />
      </div>
    );
  }

  const motif = motifFor(project);
  const Motif = MOTIFS[motif];
  const art = useMemo(() => <Motif r={rng(project.id + 7)} />, [Motif, project.id]);

  return (
    <div className={cn('relative overflow-hidden bg-surface-2', className)} aria-hidden="true">
      <div className="bg-grid absolute inset-0 opacity-70" />
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full transition-transform duration-slow ease-out group-hover:scale-[1.03]">
        {art}
      </svg>
      {project.logo && (
        <div className="absolute right-4 top-4 grid h-12 w-12 place-items-center overflow-hidden rounded-xl border border-line bg-white p-1.5 shadow-card">
          <img src={project.logo} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain" />
        </div>
      )}
      {showLabel && (
        <span className="absolute bottom-3 left-4 font-mono text-[0.65rem] uppercase tracking-wider text-muted">
          {project.slug.replace(/-/g, '_')}
        </span>
      )}
    </div>
  );
}
