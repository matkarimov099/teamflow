import { cn } from '@/utils/utils';
import { CheckCircle, Loader2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface StepperStep {
  key: string;
  icon: LucideIcon;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
}

interface StepperProps {
  steps: StepperStep[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'vertical' | 'horizontal';
}

export const Stepper = ({
  steps,
  className,
  size = 'md',
  orientation = 'vertical',
}: StepperProps) => {
  const sizeConfig = {
    sm: {
      circle: 'w-8 h-8',
      icon: 'h-4 w-4',
      title: 'text-sm',
      description: 'text-xs',
      connector: orientation === 'vertical' ? 'h-6' : 'w-6',
      gap: 'gap-3',
    },
    md: {
      circle: 'w-10 h-10',
      icon: 'h-5 w-5',
      title: 'text-base',
      description: 'text-sm',
      connector: orientation === 'vertical' ? 'h-8' : 'w-8',
      gap: 'gap-4',
    },
    lg: {
      circle: 'w-12 h-12',
      icon: 'h-6 w-6',
      title: 'text-lg',
      description: 'text-base',
      connector: orientation === 'vertical' ? 'h-10' : 'w-10',
      gap: 'gap-5',
    },
  };

  const config = sizeConfig[size];

  const getStepStyles = (status: StepperStep['status']) => {
    switch (status) {
      case 'completed':
        return {
          circle:
            'bg-green-600 border-green-600 text-white dark:bg-green-500 dark:border-green-500',
          title: 'text-green-700 dark:text-green-400',
          description: 'text-green-600 dark:text-green-500',
          connector: 'bg-green-600 dark:bg-green-500',
        };
      case 'current':
        return {
          circle:
            'bg-blue-600 border-blue-600 text-white shadow-lg dark:bg-blue-500 dark:border-blue-500',
          title: 'text-blue-700 dark:text-blue-400',
          description: 'text-blue-600 dark:text-blue-500',
          connector: 'bg-gray-300 dark:bg-gray-600',
        };
      case 'pending':
        return {
          circle:
            'bg-gray-100 border-gray-300 text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400',
          title: 'text-gray-600 dark:text-gray-300',
          description: 'text-gray-500 dark:text-gray-400',
          connector: 'bg-gray-300 dark:bg-gray-600',
        };
    }
  };

  if (orientation === 'horizontal') {
    return (
      <div className={cn('flex items-center justify-between', className)}>
        {steps.map((step, index) => {
          const Icon = step.icon;
          const styles = getStepStyles(step.status);

          return (
            <div key={step.key} className="flex items-center">
              <div className="flex flex-col items-center text-center">
                <div
                  className={cn(
                    'flex items-center justify-center rounded-full border-2 transition-all duration-300',
                    config.circle,
                    styles.circle
                  )}
                >
                  {step.status === 'completed' ? (
                    <CheckCircle className={config.icon} />
                  ) : step.status === 'current' ? (
                    <Loader2 className={cn(config.icon, 'animate-spin')} />
                  ) : (
                    <Icon className={config.icon} />
                  )}
                </div>
                <div className="mt-2">
                  <h4
                    className={cn(
                      'font-semibold transition-colors duration-300',
                      config.title,
                      styles.title
                    )}
                  >
                    {step.title}
                  </h4>
                  <p
                    className={cn(
                      'mt-1 transition-colors duration-300',
                      config.description,
                      styles.description
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={cn('mx-4 h-0.5 flex-1 transition-all duration-300', styles.connector)}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {steps.map((step, index) => {
        const Icon = step.icon;
        const styles = getStepStyles(step.status);

        return (
          <div key={step.key} className={cn('flex items-start', config.gap)}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex items-center justify-center rounded-full border-2 transition-all duration-300',
                  config.circle,
                  styles.circle
                )}
              >
                {step.status === 'completed' ? (
                  <CheckCircle className={config.icon} />
                ) : step.status === 'current' ? (
                  <Loader2 className={cn(config.icon, 'animate-spin')} />
                ) : (
                  <Icon className={config.icon} />
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'w-0.5 mt-2 transition-all duration-300',
                    config.connector,
                    styles.connector
                  )}
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4
                className={cn(
                  'font-semibold transition-colors duration-300',
                  config.title,
                  styles.title
                )}
              >
                {step.title}
              </h4>
              <p
                className={cn(
                  'mt-1 transition-colors duration-300',
                  config.description,
                  styles.description
                )}
              >
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
