import React, { Suspense, lazy, useRef } from 'react';
import { Award, Building2, CalendarDays, Download, ExternalLink, ShieldCheck, Loader2 } from 'lucide-react';
import { useCopy } from '../hooks/useCopy';
import Dialog from './ui/Dialog';
import Chip from './ui/Chip';
import Button from './ui/Button';

// pdf.js is heavy: load it only when a PDF certificate is opened.
const PdfViewer = lazy(() => import('./PdfViewer'));

function ViewerFallback({ label }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-[#c4c9d6]" role="status">
      <Loader2 size={28} className="animate-spin text-[#2dd4bf]" aria-hidden="true" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export default function CertificateModal({ isOpen, onClose, certificate }) {
  const { ui, language } = useCopy();
  const c = ui.credentials;

  // Keep the last certificate so the exit animation has content.
  const lastRef = useRef(certificate);
  if (certificate) lastRef.current = certificate;
  const cert = certificate || lastRef.current;
  if (!cert) return null;

  const isImage = cert.fileType === 'image' || /\.(jpe?g|png|webp)$/i.test(cert.file);
  const fileUrl = encodeURI(cert.file);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      size="xl"
      title={cert.title}
      closeLabel={ui.common.close}
      bodyClassName="bg-[#090D18]"
      header={
        <div className="mb-1.5 flex flex-wrap items-center gap-2">
          <Chip tone="signal" className="!py-0.5">
            {cert.categoryLabel ? cert.categoryLabel[language] : cert.category}
          </Chip>
          {cert.isSpecialization && (
            <Chip tone="amber" className="!py-0.5">
              <Award size={12} aria-hidden="true" />
              {c.specialization}
            </Chip>
          )}
        </div>
      }
      footer={
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <dl className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-ink-2">
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">Issuer</dt>
              <Building2 size={14} aria-hidden="true" />
              <dd>{cert.issuer}</dd>
            </div>
            {cert.issueDate && (
              <div className="flex items-center gap-1.5">
                <dt className="sr-only">Date</dt>
                <CalendarDays size={14} aria-hidden="true" />
                <dd>{cert.issueDate}</dd>
              </div>
            )}
            {cert.credentialId && (
              <div className="font-mono text-xs text-muted">
                <dt className="sr-only">Credential ID</dt>
                <dd>ID {cert.credentialId}</dd>
              </div>
            )}
          </dl>
          <div className="flex flex-wrap gap-2">
            {cert.credentialUrl && (
              <Button href={cert.credentialUrl} size="sm">
                <ShieldCheck size={15} aria-hidden="true" />
                {c.verify}
                <span className="sr-only">{ui.common.opensInNewTab}</span>
              </Button>
            )}
            <Button href={fileUrl} variant="secondary" size="sm" external>
              <ExternalLink size={15} aria-hidden="true" />
              {c.openFile}
            </Button>
            <Button href={fileUrl} variant="secondary" size="sm" download external={false}>
              <Download size={15} aria-hidden="true" />
              {c.download}
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-2 sm:p-4">
        {isImage ? (
          <img src={fileUrl} alt={cert.title} className="max-h-[68vh] w-auto max-w-full rounded-lg object-contain shadow-lift" />
        ) : (
          <Suspense fallback={<ViewerFallback label={c.loading} />}>
            <PdfViewer fileUrl={fileUrl} title={cert.title} language={language} />
          </Suspense>
        )}
      </div>
    </Dialog>
  );
}
