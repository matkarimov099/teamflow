import { Button } from '@/components/ui/button.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { useTheme } from '@/hooks/use-theme.ts';
import { cn } from '@/utils/utils';
import { CheckIcon, MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    {
      value: 'light',
      label: 'Light',
      icon: SunIcon,
      iconColor: 'text-amber-800 dark:text-amber-400',
    },
    {
      value: 'dark',
      label: 'Dark',
      icon: MoonIcon,
      iconColor: 'text-slate-600 dark:text-slate-400',
    },
    {
      value: 'system',
      label: 'System',
      icon: MonitorIcon,
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
  ];

  // Actual theme'ni aniqlash
  const currentTheme = themeOptions.find(option => option.value === theme);
  const CurrentIcon = currentTheme?.icon || SunIcon;

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="group relative mr-2 h-9 w-9 overflow-hidden bg-card p-0 backdrop-blur-sm transition-colors duration-200 hover:border-[var(--system-blue)]/30 hover:bg-muted/50"
          >
            <div className="relative flex h-full w-full items-center justify-center">
              {/* Icon with rotation animation */}
              <CurrentIcon
                className={cn(
                  '!h-5 !w-5 transition-transform duration-200 group-hover:scale-110',
                  currentTheme?.iconColor,
                  theme === 'system' && 'animate-pulse'
                )}
              />
            </div>
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          {themeOptions.map(option => {
            const Icon = option.icon;
            const isSelected = theme === option.value;

            return (
              <DropdownMenuItem
                key={option.value}
                onClick={() => setTheme(option.value as 'light' | 'dark' | 'system')}
                className={cn(
                  'group relative mx-1 my-0.5 flex cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2 transition-colors duration-200 hover:bg-muted/80',
                  isSelected && 'bg-[var(--system-blue)]/10 text-foreground'
                )}
              >
                <div className="flex flex-1 items-center gap-3">
                  <Icon className={cn('!h-4 !w-4', option.iconColor)} />
                  <span className="font-medium text-sm">{option.label}</span>
                </div>
                {isSelected && <CheckIcon className="h-4 w-4" />}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
