import React from 'react';
import clsx from 'clsx';

export function Input({ className, ...props }) {
  return (
    <input
      className={clsx(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        className
      )}
      {...props}
    />
  );
}
