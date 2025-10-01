import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { Typography } from '@/components/ui/typography';
import type { CurrentUser } from '@/features/auth/types';
import { humanizeDate } from '@/utils/humanize.ts';
import { cn } from '@/utils/utils';
import { Briefcase, Calendar, Mail, Shield, User } from 'lucide-react';
import { motion } from 'motion/react';
import { InfoCard } from './InfoCard';

interface RegularUserProfileProps {
  user: CurrentUser;
}

export const RegularUserProfile = ({ user }: RegularUserProfileProps) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 sm:space-y-6"
      >
        {/* Welcome, Header */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block"
          >
            <Avatar className="h-24 w-24 sm:h-28 sm:w-28 border-4 border-[var(--border)]/30 shadow-xl">
              <AvatarImage src={user.avatarUrl} alt={user.firstName} />
              <AvatarFallback className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-[var(--system-blue)] to-[var(--system-purple)] text-white">
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
          </motion.div>

          <div className="space-y-1">
            <Typography variant="h1" align="center">
              {getGreeting()}, {user.firstName}! 👋
            </Typography>
            <Typography variant="large" align="center">
              Welcome back to your dashboard
            </Typography>
          </div>
        </div>

        {/* Profile Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={cn(
            'rounded-xl p-4 sm:p-5',
            'bg-gradient-to-br from-[var(--card-bg)] to-[var(--card-bg)]/80',
            'backdrop-blur-xl border border-[var(--border)]/50',
            'shadow-lg'
          )}
        >
          <div className="mb-4">
            <Typography variant="h2">Profile Information</Typography>
            <Typography variant="muted">Your account details and settings</Typography>
          </div>

          <div className="grid gap-2.5 sm:gap-3 sm:grid-cols-2">
            <InfoCard icon={User} label="Full Name" value={`${user.firstName} ${user.lastName}`} />
            <InfoCard icon={User} label="Username" value={`@${user.username}`} />
            <InfoCard icon={Mail} label="Email" value={user.email} />
            <InfoCard icon={Briefcase} label="Position" value={user.position} />
            <InfoCard
              icon={Shield}
              label="Role"
              value={user.role.charAt(0) + user.role.slice(1).toLowerCase()}
            />
            <InfoCard icon={Calendar} label="Member Since" value={humanizeDate(user.createdAt)} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
