import React from 'react';
import clsx from 'clsx';

export function Card({ children, className }) {
  return (
    <div className={clsx('rounded-2xl border bg-card text-card-foreground shadow-sm', className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }) {
  return <div className={clsx('p-6', className)}>{children}</div>;
}
