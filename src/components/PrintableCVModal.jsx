import React from 'react';
import { createPortal } from 'react-dom';
import { Printer, Download } from 'lucide-react';
import { useCopy } from '../hooks/useCopy';
import Dialog from './ui/Dialog';
import Button from './ui/Button';
import CVDocument from './CVDocument';

/**
 * CV preview dialog. Printing uses a separate print-only copy mounted directly
 * under <body>, so the dialog's scroll container can't clip or hide it.
 */
export default function PrintableCVModal({ isOpen, onClose }) {
  const { t, ui, language } = useCopy();
  const cv = t.cvModal;

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        size="lg"
        title={cv.title}
        closeLabel={ui.common.close}
        bodyClassName="bg-surface-2 p-3 sm:p-6"
        footer={
          <div className="flex flex-wrap items-center justify-end gap-2">
            <Button variant="secondary" href="/cv-dandy-rahmat-zain.pdf" download="CV-Dandy-Rahmat-Zain.pdf" external={false}>
              <Download size={16} aria-hidden="true" />
              {cv.downloadOriginal}
            </Button>
            <Button onClick={() => window.print()}>
              <Printer size={16} aria-hidden="true" />
              {cv.printSave}
            </Button>
          </div>
        }
      >
        <div className="mx-auto max-w-[210mm] overflow-hidden rounded-xl shadow-card ring-1 ring-line">
          <CVDocument language={language} t={cv} />
        </div>
      </Dialog>

      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className="print-only" aria-hidden="true">
            <CVDocument language={language} t={cv} id="printable-cv" />
          </div>,
          document.body
        )}
    </>
  );
}
