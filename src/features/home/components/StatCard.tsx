import { Typography } from '@/components/ui/typography';
import { cn } from '@/utils/utils';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  gradient: string;
  description?: string;
}

export const StatCard = ({ icon: Icon, label, value, gradient, description }: StatCardProps) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.02 }}
    className={cn(
      'relative overflow-hidden rounded-xl p-3 sm:p-5 border border-[var(--border)]/50',
      'bg-gradient-to-br shadow-sm hover:shadow-md transition-all duration-300',
      gradient
    )}
  >
    <div className="relative z-10">
      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
        <div className="rounded-lg bg-white/10 backdrop-blur-sm p-1.5 sm:p-2">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <Typography variant="large">{label}</Typography>
      </div>
      <Typography variant="h2">{value.toLocaleString()}</Typography>
      {description && (
        <Typography variant="muted" className="mt-2">
          {description}
        </Typography>
      )}
    </div>
    <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-2xl" />
  </motion.div>
);
