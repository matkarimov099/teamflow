import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Typography } from '@/components/ui/typography';
import { useState } from 'react';

interface User {
  id: string;
  name: string;
  image?: string;
  role?: string;
}

interface AvatarGroupProps {
  users: User[];
  maxVisible?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const AvatarGroup = ({ users, maxVisible = 5, size = 'md' }: AvatarGroupProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visibleUsers = users.slice(0, maxVisible);
  const remainingCount = users.length - maxVisible;

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex -space-x-2 *:ring-2 *:ring-background">
        {visibleUsers.map((user, index) => (
          <Tooltip key={user.id}>
            <TooltipTrigger asChild>
              <Avatar
                className={`transition-transform ${sizeClasses[size]} ${
                  activeIndex === index ? 'z-10 scale-110' : ''
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback className="text-xs font-medium">
                  {user.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <Typography variant="p" className="font-semibold">
                {user.name}
              </Typography>
              {user.role && (
                <Typography variant="small" className="text-muted-foreground">
                  {user.role}
                </Typography>
              )}
            </TooltipContent>
          </Tooltip>
        ))}

        {remainingCount > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className={`transition-transform ${sizeClasses[size]} bg-muted`}>
                <AvatarFallback className="text-xs font-medium">+{remainingCount}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <Typography variant="small">
                {remainingCount} more user{remainingCount > 1 ? 's' : ''}
              </Typography>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
};
