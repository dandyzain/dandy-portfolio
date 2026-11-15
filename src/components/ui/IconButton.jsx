import React, { forwardRef } from 'react';
import { cn } from '../../lib/cn';

/**
 * Square icon-only control. `label` is required: it becomes aria-label and title.
 */
const IconButton = forwardRef(function IconButton(
  { label, href, external, size = 'md', variant = 'outline', className, children, ...props },
  ref
) {
  const classes = cn(
    'inline-flex shrink-0 items-center justify-center rounded-xl transition-[transform,background-color,color,border-color] duration-fast ease-out active:scale-[0.94]',
    size === 'sm' ? 'h-9 w-9' : 'h-11 w-11',
    variant === 'outline' && 'border border-line bg-surface text-ink-2 hover:text-ink hover:border-ink/40',
    variant === 'ghost' && 'text-ink-2 hover:text-ink hover:bg-surface-2',
    className
  );
  if (href) {
    const ext = external ?? /^https?:\/\//.test(href);
    return (
      <a
        ref={ref}
        href={href}
        aria-label={label}
        title={label}
        className={classes}
        {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <button ref={ref} type="button" aria-label={label} title={label} className={classes} {...props}>
      {children}
    </button>
  );
});

export default IconButton;
