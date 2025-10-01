import { Typography } from '@/components/ui/typography';
import { cn } from '@/utils/utils';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface InfoCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export const InfoCard = ({ icon: Icon, label, value }: InfoCardProps) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
    className={cn(
      'flex items-center gap-2.5 sm:gap-3 rounded-lg p-2.5 sm:p-3',
      'bg-[var(--control-bg)] hover:bg-[var(--control-hover-bg)]',
      'border border-[var(--border)]/30 hover:border-[var(--border)]/50',
      'transition-all duration-200 shadow-sm'
    )}
  >
    <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--system-blue)]/20 to-[var(--system-blue)]/10 flex-shrink-0">
      <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-[var(--system-blue)]" />
    </div>
    <div className="flex items-center gap-2 min-w-0">
      <Typography variant="small">{label}:</Typography>
      <Typography variant="p" className="!mt-0">
        {value}
      </Typography>
    </div>
  </motion.div>
);
