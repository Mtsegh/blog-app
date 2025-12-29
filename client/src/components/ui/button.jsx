import React from 'react';
import clsx from 'clsx';

export function Button({ children, className, ...props }) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
