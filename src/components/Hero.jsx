import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useCopy } from '../hooks/useCopy';
import { scrollToSection } from '../hooks/useActiveSection';
import { duration, ease, pop, rowRise, stagger } from '../lib/motion';
import Button from './ui/Button';
import IconButton from './ui/IconButton';
import Counter from './ui/Counter';
import SplitText from './ui/SplitText';
import ScrambleText from './ui/ScrambleText';
import MarkedText from './ui/MarkedText';
import Magnetic from './ui/Magnetic';
import { useTilt } from '../hooks/usePointerFx';
import { allProjects } from '../hooks/useProjects';

// Entrance choreography: one sequence (~1.2s), never repeated.
const seq = (i) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: duration.slow + 0.1, ease: ease.out, delay: 0.08 + i * 0.09 } },
});

// Borders for a 2-col grid on mobile that becomes 4-col on desktop.
const PROOF_CELL = [
  '',
  'border-l pl-5 sm:pl-6',
  'border-t lg:border-l lg:border-t-0 lg:pl-6',
  'border-l border-t pl-5 sm:pl-6 lg:border-t-0',
];

/** Hand-drawn stroke under a headline word; draws itself after the words rise. */
function HeadlineUnderline() {
  return (
    <svg
      viewBox="0 0 200 14"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-[0.06em] left-0 h-[0.22em] w-full overflow-visible"
    >
      <motion.path
        d="M3 9 C 40 3, 78 3, 112 7 S 176 12, 197 5"
        fill="none"
        stroke="rgb(var(--c-amber))"
        strokeWidth="4"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1, transition: { duration: 0.7, ease: ease.out, delay: 1.05 } }}
      />
    </svg>
  );
}

const CABLE = 'M-10 215 C 30 195, 40 145, 70 132 S 200 62, 262 72 S 318 84, 340 70 S 398 38, 420 30';

function Portrait({ alt, coords, status }) {
  const figRef = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(figRef);
  const tilt = useTilt(5);
  // Gentle parallax: the portrait drifts up a little as the page scrolls.
  const { scrollY } = useScroll();
  const drift = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -48]);

  return (
    <motion.figure
      ref={figRef}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: duration.story, ease: ease.out, delay: 0.25 } }}
      style={{ y: drift }}
      className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-none"
    >
      <motion.div
        ref={tilt.ref}
        {...tilt.handlers}
        style={tilt.style}
        className="group relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line bg-surface-2 will-change-transform"
      >
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_40%,black_30%,transparent_80%)]" aria-hidden="true" />

        {/* The cable: drawn once on load */}
        <svg
          viewBox="0 0 400 500"
          className="absolute inset-0 h-full w-full"
          fill="none"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <motion.path
            d={CABLE}
            stroke="rgb(var(--c-signal))"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1, transition: { duration: 1.6, ease: ease.inOut, delay: 0.5 } }}
          />
          <motion.path
            d="M-10 300 C 40 290, 30 240, 60 228 S 120 236, 150 250"
            stroke="rgb(var(--c-amber))"
            strokeOpacity="0.7"
            strokeWidth="1"
            strokeDasharray="3 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1, transition: { duration: 1.6, ease: ease.inOut, delay: 0.8 } }}
          />
          {/* Ambient signal pulse: a short bright segment that travels the
              cable every few seconds once it has been drawn. Paused off-screen. */}
          {!reduce && (
            <motion.path
              d={CABLE}
              pathLength={1}
              stroke="rgb(var(--c-signal))"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="0.08 1"
              style={{ filter: 'drop-shadow(0 0 6px rgb(var(--c-signal) / 0.8))' }}
              initial={{ strokeDashoffset: 0.08, opacity: 0 }}
              animate={
                inView
                  ? {
                      strokeDashoffset: [0.08, -1],
                      opacity: [0, 1, 1, 0],
                      transition: { duration: 2.4, ease: 'easeInOut', delay: 2.3, repeat: Infinity, repeatDelay: 3.2, times: [0, 0.1, 0.85, 1] },
                    }
                  : { opacity: 0 }
              }
            />
          )}
          {[
            [70, 132],
            [340, 70],
          ].map(([cx, cy], i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 1.1 + i * 0.35, duration: duration.base } }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            >
              <circle cx={cx} cy={cy} r="9" fill="rgb(var(--c-signal) / 0.18)" />
              <circle cx={cx} cy={cy} r="3.5" fill="rgb(var(--c-signal))" />
            </motion.g>
          ))}
        </svg>

        <picture>
          <source type="image/avif" srcSet="/images/portrait-640.avif 640w, /images/portrait-960.avif 960w" sizes="(min-width: 1024px) 420px, 80vw" />
          <source type="image/webp" srcSet="/images/portrait-640.webp 640w, /images/portrait-960.webp 960w" sizes="(min-width: 1024px) 420px, 80vw" />
          <img
            src="/images/portrait-640.webp"
            alt={alt}
            width="640"
            height="640"
            fetchpriority="high"
            decoding="async"
            className="absolute bottom-0 left-1/2 w-[98%] max-w-none -translate-x-1/2 select-none object-contain"
          />
        </picture>

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface-2 to-transparent" aria-hidden="true" />
        <div className="spotlight" aria-hidden="true" />
      </motion.div>

      <figcaption className="mt-3 flex items-center justify-between gap-3 font-mono text-[0.68rem] uppercase tracking-wider text-muted">
        <span>{coords}</span>
        <span className="inline-flex items-center gap-1.5 text-signal-ink">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
          {status}
        </span>
      </figcaption>
    </motion.figure>
  );
}

export default function Hero({ onOpenCVModal }) {
  const { ui, language } = useCopy();
  const { personal, certifications } = portfolioData;
  // Headline count excludes coursework/exam/concept projects.
  const projectCount = allProjects.filter((p) => !p.academic).length;
  const h = ui.hero;

  const years = personal.stats.find((s) => /year/i.test(s.label.en))?.value || '4+';
  const proof = [
    { value: years, label: h.proofYears, count: true },
    { value: String(projectCount), label: h.proofProjects, count: true },
    { value: String(certifications.length), label: h.proofCerts, count: true },
    { value: 'Telkominfra', label: h.proofEmployer },
  ];

  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative overflow-hidden pb-16 pt-[calc(var(--nav-h)+3rem)] sm:pb-24 sm:pt-[calc(var(--nav-h)+5rem)]">
      <div
        className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
        aria-hidden="true"
      />
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <motion.p {...seq(0)} className="eyebrow mb-6 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-2.5 py-1 normal-case tracking-normal text-signal-ink">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="status-ping absolute inset-0 rounded-full bg-signal motion-reduce:hidden" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-signal" />
                </span>
                <span className="font-sans text-xs font-semibold">{h.status}</span>
              </span>
              <ScrambleText lines={h.roles} />
            </motion.p>

            <h1 id="hero-heading" className="text-display-xl font-semibold" key={language}>
              <SplitText
                text={h.titleA}
                trigger="mount"
                delay={0.12}
                step={0.06}
                className="block"
                decorate={(word) => ({
                  className: h.titleAccent.includes(word) ? 'text-accent' : undefined,
                  after: word === h.titleUnderline ? <HeadlineUnderline /> : null,
                })}
              />
              <motion.span {...seq(2)} className="mt-4 block max-w-[30ch] text-display-md font-medium text-muted">
                <motion.span
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1, transition: { duration: duration.slow, ease: ease.out, delay: 0.75 } }}
                  className="inline-block origin-left text-signal-ink"
                >
                  —
                </motion.span>{' '}
                <MarkedText text={h.titleB} marks={h.titleBMarks} delay={1.25} step={0.35} markClassName="text-ink-2" />
              </motion.span>
            </h1>

            <motion.p {...seq(3)} className="mt-7 max-w-prose text-base leading-relaxed text-ink-2 sm:text-lg">
              <MarkedText text={h.lead} marks={h.leadTerms} variant="underline" delay={1.9} step={0.09} duration={0.45} markClassName="font-medium text-ink" />
            </motion.p>

            <motion.div {...seq(4)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Magnetic className="flex sm:inline-flex [&>*]:flex-1">
                <Button
                  size="lg"
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('projects');
                  }}
                >
                  {h.ctaWork}
                  <motion.span
                    aria-hidden="true"
                    className="inline-flex"
                    animate={{ y: [0, 4, 0], transition: { duration: 0.9, ease: 'easeInOut', delay: 2.6, repeat: Infinity, repeatDelay: 2.8 } }}
                  >
                    <ArrowDown size={17} />
                  </motion.span>
                </Button>
              </Magnetic>
              <Magnetic className="flex sm:inline-flex [&>*]:flex-1">
                <Button size="lg" variant="secondary" onClick={onOpenCVModal}>
                  <FileText size={17} aria-hidden="true" />
                  {h.ctaCV}
                </Button>
              </Magnetic>
              <motion.div initial="hidden" animate="visible" variants={stagger(0.08, 0.9)} className="flex items-center gap-1 sm:ml-2">
                {[
                  { label: 'LinkedIn', href: personal.linkedin, Icon: Linkedin },
                  { label: 'GitHub', href: personal.github, Icon: Github },
                  { label: 'Email', href: `mailto:${personal.email}`, Icon: Mail },
                ].map(({ label, href, Icon }) => (
                  <motion.span key={label} variants={pop} whileHover={{ y: -3, rotate: -8 }} whileTap={{ scale: 0.9 }} className="inline-flex">
                    <IconButton label={label} href={href} variant="ghost">
                      <Icon size={18} />
                    </IconButton>
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <Portrait alt={h.portraitAlt} coords={h.coords} status="WIB · UTC+7" />
          </div>
        </div>

        {/* Proof strip */}
        <motion.dl
          key={language}
          initial="hidden"
          animate="visible"
          variants={stagger(0.09, 0.6)}
          className="mt-16 grid grid-cols-2 border-y border-line sm:mt-20 lg:grid-cols-4"
        >
          {proof.map((p, i) => (
            <motion.div key={p.label} variants={rowRise} className={`flex flex-col gap-1 border-line py-5 sm:py-6 ${PROOF_CELL[i]}`}>
              <dt className="order-2 text-sm text-muted">{p.label}</dt>
              <dd className={`order-1 font-display font-semibold tracking-tight ${p.count ? 'text-3xl sm:text-4xl' : 'text-xl leading-[2.25rem] sm:text-2xl sm:leading-[2.5rem]'}`}>
                {p.count ? <Counter value={p.value} /> : p.value}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
