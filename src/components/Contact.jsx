import React, { useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Copy, FileText, Linkedin, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { sectionIndex, whatsappLink } from '../data/sections';
import { useCopy } from '../hooks/useCopy';
import { duration, ease, rowRise, stagger, viewportOnce } from '../lib/motion';
import { cn } from '../lib/cn';
import Section from './ui/Section';
import Button from './ui/Button';
import Reveal from './ui/Reveal';
import { useToast } from './ui/Toast';
import { track } from '../lib/analytics';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0, transition: { duration: duration.fast } }}
            exit={{ opacity: 0 }}
            className="mt-1.5 text-sm text-danger"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls = (invalid) =>
  cn(
    'w-full rounded-xl border bg-surface px-4 py-3 text-[0.95rem] text-ink placeholder:text-muted transition-[border-color,box-shadow] duration-fast focus:outline-none focus:ring-2',
    invalid ? 'border-danger focus:ring-danger/25' : 'border-line focus:border-signal-ink focus:ring-signal/30'
  );

export default function Contact({ onOpenCVModal }) {
  const { t, ui, language } = useCopy();
  const { personal } = portfolioData;
  const c = ui.contact;
  const tc = t.contact;
  const toast = useToast();
  const uid = useId();

  const [form, setForm] = useState({ name: '', email: '', service: tc.topicOptions[2]?.value || tc.topicOptions[0].value, message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | opening | done | fallback
  const [website, setWebsite] = useState(''); // honeypot — humans never see it
  const mountedAt = useRef(Date.now());

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = c.required;
    if (!form.email.trim()) er.email = c.required;
    else if (!EMAIL_RE.test(form.email.trim())) er.email = c.invalidEmail;
    if (!form.message.trim()) er.message = c.required;
    else if (form.message.trim().length < 10) er.message = c.tooShort;
    return er;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      toast(ui.common.copied);
    } catch {
      /* clipboard blocked: the address is visible on screen */
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) {
      document.getElementById(`${uid}-${Object.keys(er)[0]}`)?.focus();
      return;
    }
    setStatus('opening');

    const celebrate = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const { default: confetti } = await import('canvas-confetti');
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.7 }, colors: ['#14B8A6', '#F59E0B', '#0E1220', '#5EEAD4'] });
    };

    // 1) Send through /api/contact (Resend).
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          service: form.service,
          message: form.message.trim(),
          lang: language,
          website,
          elapsedMs: Date.now() - mountedAt.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus('done');
        track('contact_submit', { method: 'api', topic: form.service });
        setForm((f) => ({ ...f, message: '' }));
        celebrate();
        return;
      }
    } catch {
      /* network error or no API in local dev → fall through */
    }

    // 2) Fallback: a ready-to-send draft in the visitor's email app.
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${form.service} from ${form.name}`);
    const body = encodeURIComponent(
      `Hello Dandy,\n\nName: ${form.name}\nEmail: ${form.email}\nService Topic: ${form.service}\n\nMessage:\n${form.message}\n\nBest regards.`
    );
    // Same tab: avoids an empty new tab when no mail app handles mailto:
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    track('contact_submit', { method: 'mailto', topic: form.service });
    setTimeout(() => setStatus('fallback'), 600);
  };

  const waText = language === 'id' ? 'Halo Dandy, saya tertarik bekerja sama dengan Anda.' : 'Hi Dandy, I’d like to work with you.';

  const channels = [
    { label: c.email, value: personal.email, href: `mailto:${personal.email}`, icon: Mail, copy: true },
    { label: c.whatsapp, value: personal.phone, href: whatsappLink(personal.rawPhone, waText), icon: MessageCircle },
    { label: c.linkedin, value: 'in/dandy-zain-ab380a290', href: personal.linkedin, icon: Linkedin },
  ];

  return (
    <Section id="contact" index={sectionIndex('contact')} eyebrow={c.eyebrow} title={c.title} intro={tc.subtitle}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <h3 className="eyebrow mb-3">{c.channels}</h3>
          <motion.ul
            key={language}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={stagger(0.07, 0.1)}
            className="divide-y divide-line border-y border-line"
          >
            {channels.map(({ label, value, href, icon: Icon, copy }) => (
              <motion.li key={label} variants={rowRise} className="flex items-center gap-3 py-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-surface text-ink-2">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <a
                  href={href}
                  {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group min-w-0 flex-1"
                >
                  <span className="block font-mono text-[0.68rem] uppercase tracking-wider text-muted">{label}</span>
                  <span className="flex items-center gap-1 truncate font-medium text-ink">
                    <span className="link-underline truncate">{value}</span>
                    <ArrowUpRight size={14} aria-hidden="true" className="shrink-0 text-muted transition-transform duration-fast group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </a>
                {copy && (
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-muted transition-colors hover:bg-surface-2 hover:text-ink"
                    aria-label={ui.common.copyEmail}
                    title={ui.common.copyEmail}
                  >
                    <Copy size={16} aria-hidden="true" />
                  </button>
                )}
              </motion.li>
            ))}
            <motion.li variants={rowRise} className="flex items-center gap-3 py-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-surface text-ink-2">
                <MapPin size={18} aria-hidden="true" />
              </span>
              <div>
                <span className="block font-mono text-[0.68rem] uppercase tracking-wider text-muted">{c.location}</span>
                <span className="font-medium text-ink">{c.timezone}</span>
              </div>
            </motion.li>
          </motion.ul>

          <div className="mt-8 rounded-2xl border border-line bg-surface p-5">
            <p className="font-display text-lg font-semibold">{c.cvTitle}</p>
            <p className="mt-1 text-sm text-ink-2">{c.cvBody}</p>
            <Button variant="secondary" className="mt-4" onClick={onOpenCVModal}>
              <FileText size={16} aria-hidden="true" />
              {ui.hero.ctaCV}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-7">
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-8">
            <AnimatePresence mode="wait" initial={false}>
              {status === 'done' || status === 'fallback' ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: duration.base, ease: ease.out } }}
                  exit={{ opacity: 0 }}
                  role="status"
                  className="py-6"
                >
                  <motion.span
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 380, damping: 18 } }}
                    className="grid h-12 w-12 place-items-center rounded-full bg-signal/15 text-signal-ink"
                  >
                    {/* Checkmark draws itself */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <motion.path
                        d="M5 12.5l4.5 4.5L19 7.5"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1, transition: { duration: duration.slow, ease: ease.out, delay: 0.15 } }}
                      />
                    </svg>
                  </motion.span>
                  <h3 className="mt-5 text-2xl font-semibold">{status === 'done' ? c.doneTitle : c.fallbackTitle}</h3>
                  <p className="mt-2 text-ink-2">{status === 'done' ? c.doneBody : c.fallbackBody}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <code className="rounded-lg bg-surface-2 px-3 py-2 font-mono text-sm text-ink">{personal.email}</code>
                    <Button variant="secondary" size="sm" onClick={copyEmail}>
                      <Copy size={14} aria-hidden="true" />
                      {ui.common.copyEmail}
                    </Button>
                  </div>
                  <Button variant="ghost" className="mt-8 -ml-3" onClick={() => setStatus('idle')}>
                    {c.reset}
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: duration.fast } }}
                  exit={{ opacity: 0 }}
                  onSubmit={onSubmit}
                  noValidate
                  className="space-y-5"
                >
                  <div>
                    <h3 className="text-2xl font-semibold">{c.formTitle}</h3>
                    <p className="mt-1.5 text-sm text-muted">{c.formNote}</p>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id={`${uid}-name`} label={tc.nameLabel} error={errors.name}>
                      <input
                        id={`${uid}-name`}
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={set('name')}
                        placeholder={tc.namePlaceholder}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? `${uid}-name-error` : undefined}
                        className={inputCls(errors.name)}
                      />
                    </Field>
                    <Field id={`${uid}-email`} label={tc.emailLabel} error={errors.email}>
                      <input
                        id={`${uid}-email`}
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        value={form.email}
                        onChange={set('email')}
                        placeholder={tc.emailPlaceholder}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? `${uid}-email-error` : undefined}
                        className={inputCls(errors.email)}
                      />
                    </Field>
                  </div>
                  <Field id={`${uid}-service`} label={tc.topicLabel}>
                    <div className="relative">
                      <select id={`${uid}-service`} value={form.service} onChange={set('service')} className={cn(inputCls(false), 'appearance-none pr-10')}>
                        {tc.topicOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={16} aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted" />
                    </div>
                  </Field>
                  <Field id={`${uid}-message`} label={tc.messageLabel} error={errors.message}>
                    <textarea
                      id={`${uid}-message`}
                      rows={5}
                      value={form.message}
                      onChange={set('message')}
                      placeholder={tc.messagePlaceholder}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? `${uid}-message-error` : undefined}
                      className={cn(inputCls(errors.message), 'resize-y')}
                    />
                  </Field>
                  {/* Honeypot: hidden from people and assistive tech, tempting to bots */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label>
                      Website
                      <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                    </label>
                  </div>
                  <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === 'opening'}>
                    <Send size={16} aria-hidden="true" />
                    {status === 'opening' ? c.opening : c.submit}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
