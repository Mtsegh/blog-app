import React from 'react';
import clsx from 'clsx';

export function Label({ children, className, ...props }) {
  return (
    <label className={clsx('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)} {...props}>
      {children}
    </label>
  );
}
