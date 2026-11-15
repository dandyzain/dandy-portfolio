import React from 'react';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

// The A4 CV content. Rendered inside the CV dialog (screen) and in a
// print-only container (print). Always light: it represents paper.
const KEY_PROJECTS = [
  ['Asset Management & WFM System v2.1', 'PM & CM work orders, dynamic QR code tagging, GPS tracking, Oracle DB.'],
  ['LION — NOC Submarine Cable GIS', 'Web GIS submarine cable mapping, KML/KMZ overlay, vessel hazard buffer alerts.'],
  ['NOC-RAN — Radio Access Center', 'Nationwide 4G/5G cellular tower monitoring, alarm telemetry, Redis caching.'],
  ['RENATA — HR Talent & E-Learning', 'Recruitment pipeline, corporate LMS, technical skill competency matrix.'],
  ['WBS — Whistleblowing System', 'Encrypted compliance incident reporting, tiered investigation workflows.'],
  ['KEPO & TSA — Docs & Tower Audit', 'Dynamic PDF watermarking repository & tower site activity telemetry audit.'],
];

const SKILL_LINES = [
  ['Frontend', 'React, Next.js, Vue, Nuxt, Tailwind CSS, TypeScript'],
  ['Backend', 'Laravel, Express.js, PHP, Node.js, MySQL, PostgreSQL, Redis'],
  ['Mobile', 'Flutter, Kotlin Native, Android SDK, Firebase'],
  ['Tools & AI', 'Git/GitHub, Docker, AI Prompting, Systems Thinking'],
];

function H({ children }) {
  return (
    <h2 className="mb-2 border-b border-[#DDDAD1] pb-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#0F766E]">
      {children}
    </h2>
  );
}

export default function CVDocument({ language, t, id }) {
  const { personal, experiences, education, certifications } = portfolioData;
  return (
    <div id={id} className="cv-paper bg-white px-6 py-8 text-[#0E1220] sm:px-10 sm:py-10">
      <header className="mb-6 flex flex-col justify-between gap-4 border-b-2 border-[#0E1220] pb-6 sm:flex-row sm:items-end">
        <div className="flex items-center gap-4">
          <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg border border-[#DDDAD1] bg-[#EFEDE7]">
            <img src="/images/portrait-320.webp" alt={personal.fullName} className="h-full w-full object-cover object-top" />
          </div>
          <div>
            <h1 className="font-display text-[26px] font-semibold leading-tight tracking-tight text-[#0E1220]">{personal.fullName}</h1>
            <p className="mt-0.5 text-sm font-semibold text-[#0F766E]">{personal.role[language]}</p>
            <p className="mt-1 max-w-md text-xs italic text-[#585F72]">“{personal.tagline}”</p>
          </div>
        </div>
        <ul className="shrink-0 space-y-1 text-xs text-[#343A4C] sm:text-right">
          <li className="flex items-center gap-1.5 sm:justify-end">
            <MapPin size={12} aria-hidden="true" />
            {personal.location[language]}
          </li>
          <li className="flex items-center gap-1.5 sm:justify-end">
            <Phone size={12} aria-hidden="true" />
            {personal.phone}
          </li>
          <li className="flex items-center gap-1.5 sm:justify-end">
            <Mail size={12} aria-hidden="true" />
            {personal.email}
          </li>
          <li className="flex items-center gap-1.5 sm:justify-end">
            <Linkedin size={12} aria-hidden="true" />
            linkedin.com/in/dandy-zain-ab380a290
          </li>
        </ul>
      </header>

      <section className="mb-6">
        <H>{t.summaryTitle}</H>
        <p className="text-xs leading-relaxed text-[#343A4C]">{personal.bio[language].join(' ')}</p>
      </section>

      <section className="mb-6">
        <H>{t.experienceTitle}</H>
        <div className="space-y-4">
          {experiences.map((exp) => (
            <article key={exp.id} className="cv-avoid-break text-xs">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <p className="text-sm font-semibold leading-snug">{exp.role}</p>
                <p className="font-mono text-[10.5px] text-[#585F72]">{exp.period[language]}</p>
              </div>
              <p className="font-medium text-[#343A4C]">{exp.company}</p>
              <p className="mt-1 leading-relaxed text-[#585F72]">{exp.description[language]}</p>
              <ul className="mt-1.5 list-inside list-disc space-y-0.5 text-[#343A4C]">
                {exp.highlights[language].slice(0, 3).map((hl) => (
                  <li key={hl} className="leading-normal">
                    {hl}
                  </li>
                ))}
              </ul>
              <p className="mt-1.5 font-mono text-[10px] text-[#585F72]">{exp.techStack.join(' · ')}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cv-avoid-break mb-6">
        <H>{language === 'en' ? 'Key Enterprise Projects (Telkominfra)' : 'Proyek Unggulan Enterprise (Telkominfra)'}</H>
        <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
          {KEY_PROJECTS.map(([title, desc], i) => (
            <div key={title}>
              <p className="font-semibold">
                {i + 1}. {title}
              </p>
              <p className="text-[11px] text-[#585F72]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="cv-avoid-break mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <section>
          <H>{t.educationTitle}</H>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.institution} className="text-xs">
                <p className="font-semibold">{edu.institution}</p>
                <p className="font-medium text-[#0F766E]">{edu.degree[language]}</p>
                <p className="text-[11px] text-[#585F72]">
                  {edu.period} • {edu.location}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section>
          <H>{t.certificationsTitle}</H>
          <ul className="space-y-1.5">
            {certifications.slice(0, 6).map((cert) => (
              <li key={cert.id} className="flex items-baseline justify-between gap-3 text-xs">
                <span className="font-medium">• {cert.title}</span>
                <span className="shrink-0 text-[10px] text-[#585F72]">{cert.issueDate}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="cv-avoid-break">
        <H>{t.skillsTitle}</H>
        <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
          {SKILL_LINES.map(([k, v]) => (
            <div key={k}>
              <span className="mb-0.5 block font-semibold">{k}</span>
              <span className="text-[11px] text-[#585F72]">{v}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
