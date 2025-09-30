import { Typography } from '@/components/ui/typography';
import { cn } from '@/utils/utils.ts';
import type { ReactNode } from 'react';

export const CustomCard = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        'group hover-lift mx-auto w-full max-w-sm rounded-lg border bg-card p-8 shadow-md saturate-[150%] backdrop-blur-[10px] transition-all duration-[var(--motion-medium)]',
        className
      )}
    >
      {children}
    </div>
  );
};

export const CustomCardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Typography variant="h3" className={cn('py-2 text-primary', className)}>
      {children}
    </Typography>
  );
};

export const CustomCardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'max-w-sm font-[var(--font-sans)] text-secondary text-sm leading-[1.35]',
        className
      )}
    >
      {children}
    </div>
  );
};

export const CustomCardSkeletonContainer = ({
  className,
  children,
  showGradient = true,
}: {
  className?: string;
  children: React.ReactNode;
  showGradient?: boolean;
}) => {
  return (
    <div
      className={cn(
        'z-40 h-[15rem] rounded-lg md:h-[20rem]',
        className,
        showGradient &&
          'bg-[var(--secondaryBackground)] [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]'
      )}
    >
      {children}
    </div>
  );
};
