import React, { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/cn';
import { dialogMotion } from '../../lib/motion';

// Shared scroll lock so stacked dialogs don't unlock each other.
let lockCount = 0;
function lockScroll() {
  if (lockCount === 0) {
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    document.getElementById('root')?.setAttribute('inert', '');
  }
  lockCount += 1;
}
function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    document.getElementById('root')?.removeAttribute('inert');
  }
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function DialogPanel({ onClose, closeLabel = 'Close', fullscreenMobile = false, title, hideTitle, size, className, bodyClassName, header, footer, children, initialFocusRef }) {
  const panelRef = useRef(null);
  const titleId = useId();
  const restoreRef = useRef(null);

  useEffect(() => {
    restoreRef.current = document.activeElement;
    lockScroll();
    const focusTarget = initialFocusRef?.current || panelRef.current;
    // wait one frame so the portal is painted
    const raf = requestAnimationFrame(() => focusTarget?.focus({ preventScroll: true }));

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const nodes = Array.from(panelRef.current.querySelectorAll(FOCUSABLE)).filter(
        (n) => n.offsetParent !== null || n === document.activeElement
      );
      if (nodes.length === 0) {
        e.preventDefault();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
      unlockScroll();
      const el = restoreRef.current;
      if (el && typeof el.focus === 'function') el.focus({ preventScroll: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const widths = { md: 'max-w-2xl', lg: 'max-w-4xl', xl: 'max-w-5xl' };

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center sm:items-center sm:p-6">
      <motion.div
        {...dialogMotion.backdrop}
        className="absolute inset-0 bg-[#05070d]/70 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        {...dialogMotion.panel}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cn(
          'relative flex w-full flex-col overflow-hidden border border-line bg-surface shadow-lift outline-none sm:max-h-[92dvh] sm:rounded-3xl',
          fullscreenMobile ? 'h-[100dvh] max-sm:border-0 sm:h-auto' : 'max-h-[92dvh] rounded-t-3xl',
          widths[size] || widths.md,
          className
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-7">
          <div className="min-w-0 flex-1">
            {header}
            <h2 id={titleId} className={cn('font-display text-lg font-semibold leading-tight sm:text-xl', hideTitle && 'sr-only')}>
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="-mr-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-muted transition-colors hover:bg-surface-2 hover:text-ink"
            aria-label={closeLabel}
            title={closeLabel}
          >
            <X size={18} />
          </button>
        </div>
        <div className={cn('flex-1 overflow-y-auto overscroll-contain', bodyClassName)}>{children}</div>
        {footer && <div className="border-t border-line px-5 py-3.5 sm:px-7">{footer}</div>}
      </motion.div>
    </div>
  );
}

/**
 * Accessible modal dialog: role=dialog + aria-modal, labelled by `title`,
 * focus trap, Esc to close, focus restore, shared scroll lock, background inert.
 */
export default function Dialog({ open, ...props }) {
  if (typeof document === 'undefined') return null;
  return createPortal(<AnimatePresence>{open && <DialogPanel key="dialog" {...props} />}</AnimatePresence>, document.body);
}
