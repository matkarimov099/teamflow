import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium select-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 font-sans transition-all duration-[120ms] ease-[cubic-bezier(0.2,0.9,0.25,1)] backdrop-blur-[10px] saturate-150 active:scale-[0.98]',
  {
    variants: {
      variant: {
        // Primary (Blue) - using proper contrast colors for light and dark modes
        default:
          'bg-blue-600 hover:bg-blue-700 text-white shadow-sm border-control focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white',
        primary:
          'bg-blue-600 hover:bg-blue-700 text-white shadow-sm border-control focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white',

        // Secondary (Green)
        secondary:
          'bg-green-600 text-white shadow-sm border-control hover:bg-green-700 focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2',
        success:
          'bg-green-600 text-white shadow-sm border-control hover:bg-green-700 focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2',

        // Destructive (Red)
        destructive:
          'bg-red-500 text-white shadow-sm border-control hover:bg-red-600 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2',

        // Outline/Ghost
        outline:
          'bg-control border-control text-primary hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        ghost:
          'bg-transparent text-foreground hover:bg-[color-mix(in_srgb,var(--system-blue)_8%,transparent)] hover:text-foreground focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',

        // Link
        link: 'text-blue-500 underline-offset-4 hover:underline hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
      },
      size: {
        xs: 'h-7 px-2 text-xs rounded [&_svg]:size-3',
        sm: 'h-8 px-3 text-sm rounded-md [&_svg]:size-3.5',
        default: 'h-9 px-4 text-sm rounded-md [&_svg]:size-4',
        md: 'h-9 px-4 text-sm rounded-md [&_svg]:size-4',
        lg: 'h-11 px-6 text-base rounded-lg [&_svg]:size-5',
        xl: 'h-12 px-8 text-lg rounded-lg [&_svg]:size-6',
        icon: 'h-9 w-9 rounded-md [&_svg]:size-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export { buttonVariants };
