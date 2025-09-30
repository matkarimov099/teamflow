import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/utils/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-colors duration-200 overflow-hidden font-sans',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-[var(--system-blue)] text-white [a&]:hover:bg-[color-mix(in_srgb,var(--system-blue)_85%,black)]',
        secondary:
          'border-transparent bg-[var(--secondaryBackground)] text-[var(--label)] [a&]:hover:bg-[color-mix(in_srgb,var(--secondaryBackground)_85%,var(--label))]',
        destructive:
          'border-transparent bg-[var(--system-red)] text-white [a&]:hover:bg-[color-mix(in_srgb,var(--system-red)_85%,black)]',
        success:
          'border-transparent bg-[var(--system-green)] text-white [a&]:hover:bg-[color-mix(in_srgb,var(--system-green)_85%,black)]',
        warning:
          'border-transparent bg-[var(--system-yellow)] text-black [a&]:hover:bg-[color-mix(in_srgb,var(--system-yellow)_85%,black)]',
        info: 'border-transparent bg-[var(--system-cyan)] text-white [a&]:hover:bg-[color-mix(in_srgb,var(--system-cyan)_85%,black)]',
        outline:
          'text-[var(--label)] border-[var(--border)] bg-transparent [a&]:hover:bg-[var(--control-ghost-bg)] [a&]:hover:text-[var(--label)]',
      },
      size: {
        xs: 'px-1.5 py-0.5 text-xs rounded-sm',
        sm: 'px-2 py-0.5 text-xs rounded-md',
        md: 'px-2.5 py-1 text-sm rounded-md',
        lg: 'px-3 py-1.5 text-sm rounded-lg',
        xl: 'px-4 py-2 text-base rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
);

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
