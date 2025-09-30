import { cn } from '@/utils/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('animate-pulse rounded-md border', className)}
      {...props}
    />
  );
}

export { Skeleton };
