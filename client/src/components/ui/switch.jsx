import React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import clsx from 'clsx';

export function Switch({ className, ...props }) {
  return (
    <SwitchPrimitive.Root
      className={clsx('relative inline-flex h-6 w-11 items-center rounded-full bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2', className)}
      {...props}
    >
      <SwitchPrimitive.Thumb className='pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform' />
    </SwitchPrimitive.Root>
  );
}
