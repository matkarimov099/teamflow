import { Typography } from '@/components/ui/typography';
import { ExternalLink, type LucideIcon } from 'lucide-react';

interface InfoRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

export const InfoRow = ({ icon: Icon, label, value, href }: InfoRowProps) => {
  const content = (
    <div className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-[var(--control-hover-bg)] transition-all duration-200 group border border-transparent hover:border-[var(--border)]/30">
      <div className="flex-shrink-0 rounded-lg bg-gradient-to-br from-[var(--control-bg)] to-[var(--control-bg)]/50 p-2 shadow-sm">
        <Icon className="h-3.5 w-3.5 text-[var(--system-blue)]" />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <Typography variant="small">{label}</Typography>
        <Typography variant="small">{value}</Typography>
      </div>
      {href && (
        <ExternalLink className="h-3.5 w-3.5 text-[var(--system-blue)] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
      )}
    </div>
  );

  if (href) {
    return (
      <Typography href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </Typography>
    );
  }

  return content;
};
