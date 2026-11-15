import React, { forwardRef } from 'react';
import { cn } from '../../lib/cn';

const base =
  'group/btn inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap select-none ' +
  'transition-[transform,background-color,color,border-color,box-shadow] duration-fast ease-out ' +
  'active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50';

const variants = {
  primary: 'bg-ink text-bg hover:bg-ink/85 shadow-card',
  secondary: 'bg-surface text-ink border border-line hover:border-ink/40',
  ghost: 'text-ink-2 hover:text-ink hover:bg-surface-2',
  signal: 'bg-signal text-[#04201d] hover:brightness-105 shadow-card',
};

const sizes = {
  sm: 'h-9 px-3.5 text-sm rounded-xl',
  md: 'h-11 px-5 text-sm rounded-xl',
  lg: 'h-12 px-6 text-[0.95rem] rounded-2xl',
};

/**
 * Button — renders <a> when `href` is set, otherwise <button>.
 * External links get target/rel automatically.
 */
const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', href, external, className, children, type, ...props },
  ref
) {
  const classes = cn(base, variants[variant], sizes[size], className);
  if (href) {
    const ext = external ?? /^https?:\/\//.test(href);
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <button ref={ref} type={type || 'button'} className={classes} {...props}>
      {children}
    </button>
  );
});

export default Button;
