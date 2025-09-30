import { cn } from '@/utils/utils';
import { cva } from 'class-variance-authority';
import * as React from 'react';

const typographyVariants = cva('transition-colors duration-200', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight',
      h2: 'scroll-m-20 pb-2 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-lg sm:text-xl md:text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-base sm:text-lg md:text-xl font-semibold tracking-tight',
      h5: 'scroll-m-20 text-sm sm:text-base md:text-lg font-semibold tracking-tight',
      h6: 'scroll-m-20 text-xs sm:text-sm md:text-base font-semibold tracking-tight',
      p: 'text-sm sm:text-base leading-6 sm:leading-7 [&:not(:first-child)]:mt-4 sm:[&:not(:first-child)]:mt-6',
      code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs sm:text-sm font-semibold',
      blockquote: 'mt-4 sm:mt-6 border-l-2 pl-4 sm:pl-6 italic text-sm sm:text-base',
      small: 'text-xs sm:text-sm font-medium leading-none',
      muted: 'text-xs sm:text-sm text-gray-600 dark:text-gray-400',
      large: 'text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100',
      title: 'text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100',
      a: 'text-sm sm:text-base font-medium text-blue-600 dark:text-blue-400 underline underline-offset-4 hover:text-blue-700 dark:hover:text-blue-300',
      lead: 'text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed',
      caption: 'text-[10px] sm:text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wide',
      label: 'text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300',
      error: 'text-xs sm:text-sm text-red-600 dark:text-red-400 font-medium',
      success: 'text-xs sm:text-sm text-green-600 dark:text-green-400 font-medium',
      warning: 'text-xs sm:text-sm text-yellow-600 dark:text-yellow-400 font-medium',
      gradient:
        'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },
    truncate: {
      true: 'truncate',
      false: '',
    },
    italic: {
      true: 'italic',
      false: 'not-italic',
    },
    uppercase: {
      true: 'uppercase',
      false: 'normal-case',
    },
    color: {
      default: '',
      primary: 'text-blue-600 dark:text-blue-400',
      secondary: 'text-gray-600 dark:text-gray-400',
      success: 'text-green-600 dark:text-green-400',
      error: 'text-red-600 dark:text-red-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
      muted: 'text-gray-500 dark:text-gray-500',
    },
  },
  defaultVariants: {
    variant: 'p',
    align: 'left',
    truncate: false,
    italic: false,
    uppercase: false,
    color: 'default',
  },
});

type VariantType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'code'
  | 'blockquote'
  | 'small'
  | 'muted'
  | 'large'
  | 'title'
  | 'a'
  | 'lead'
  | 'caption'
  | 'label'
  | 'error'
  | 'success'
  | 'warning'
  | 'gradient';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: VariantType;
  asChild?: boolean;
  // Typography variants
  align?: 'left' | 'center' | 'right' | 'justify';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  truncate?: boolean;
  italic?: boolean;
  uppercase?: boolean;
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'muted';
  // Link props for 'a' variant
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  // Accessibility props
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-hidden'?: boolean;
}

const variantToElement: Record<VariantType, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  code: 'code',
  blockquote: 'blockquote',
  small: 'small',
  muted: 'p',
  large: 'div',
  title: 'h1',
  a: 'a',
  lead: 'p',
  caption: 'span',
  label: 'label',
  error: 'span',
  success: 'span',
  warning: 'span',
  gradient: 'h1',
};

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      variant = 'p',
      asChild = false,
      align,
      weight,
      truncate,
      italic,
      uppercase,
      color,
      href,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? 'span' : variantToElement[variant];

    // Add security attributes for external links
    const linkProps =
      variant === 'a' && href
        ? {
            href,
            target,
            rel: target === '_blank' ? 'noopener noreferrer' : rel,
            // Add accessibility attributes for external links
            ...(target === '_blank' && !props['aria-label']
              ? {
                  'aria-label': `${props.children} (opens in new tab)`,
                }
              : {}),
          }
        : {};

    return (
      <Component
        className={cn(
          typographyVariants({ variant, align, weight, truncate, italic, uppercase, color }),
          className
        )}
        ref={ref}
        {...linkProps}
        {...props}
      />
    );
  }
);

Typography.displayName = 'Typography';

export { Typography, typographyVariants };
