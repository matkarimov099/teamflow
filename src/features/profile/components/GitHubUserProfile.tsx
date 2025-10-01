import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { Typography } from '@/components/ui/typography';
import type { GitHubUser } from '@/features/profile/types';
import { humanizeDate } from '@/utils/humanize.ts';
import {
  Award,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  Code2,
  ExternalLink,
  GitFork,
  Globe,
  Mail,
  MapPin,
  Star,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';
import { InfoRow } from './InfoRow';
import { StatCard } from './StatCard';

interface GitHubUserProfileProps {
  user: GitHubUser;
}

export const GitHubUserProfile = ({ user }: GitHubUserProfileProps) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="w-full space-y-4 sm:space-y-5">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-[var(--system-blue)]/10 via-[var(--system-purple)]/10 to-[var(--system-pink)]/10 border border-[var(--border)]/50 rounded-2xl p-6 sm:p-8"
      >
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--system-blue)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--system-purple)]/5 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col sm:flex-row gap-6 sm:gap-8">
          {/* Avatar Section */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="flex-shrink-0 mx-auto sm:mx-0"
          >
            <div className="relative">
              <Avatar className="h-28 w-28 sm:h-32 sm:w-32 border-4 border-[var(--border)]/50 shadow-xl">
                <AvatarImage src={user.avatar_url} alt={user.name || user.login} />
                <AvatarFallback className="text-4xl bg-gradient-to-br from-[var(--system-blue)] to-[var(--system-purple)] text-white">
                  {user.login[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 rounded-full bg-[var(--system-green)] p-2 border-2 border-[var(--card-bg)]">
                <Zap className="h-4 w-4 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Profile Info */}
          <div className="flex-1 space-y-3">
            <div className="text-center sm:text-left">
              <Typography variant="muted" className="text-center sm:text-left">
                {getGreeting()}! 👋
              </Typography>
              <Typography variant="h1" className="text-center sm:text-left">
                {user.name || user.login}
              </Typography>
              <Typography variant="large" className="text-center sm:text-left">
                @{user.login}
              </Typography>
            </div>

            {user.bio && (
              <Typography variant="p" className="text-center sm:text-left">
                {user.bio}
              </Typography>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 text-sm text-[var(--secondaryLabel)]">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--control-bg)]">
                <Briefcase className="h-4 w-4" />
                <Typography variant="muted">{user.type}</Typography>
              </div>
              {user.hireable !== null && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--system-green)]/10 border border-[var(--system-green)]/20">
                  <Award className="h-4 w-4 text-[var(--system-green)]" />
                  <Typography variant="muted">
                    {user.hireable ? 'Available for Hire' : 'Not Hiring'}
                  </Typography>
                </div>
              )}
              {user.company && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--control-bg)]">
                  <Building2 className="h-4 w-4" />
                  <Typography variant="muted">{user.company}</Typography>
                </div>
              )}
              {user.location && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--control-bg)]">
                  <MapPin className="h-4 w-4" />
                  <Typography variant="muted">{user.location}</Typography>
                </div>
              )}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--control-bg)]">
                <Calendar className="h-4 w-4" />
                <Typography variant="muted">Joined {humanizeDate(user.created_at)}</Typography>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              {user.email && (
                <Typography
                  variant="a"
                  href={`mailto:${user.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--control-bg)] hover:bg-[var(--control-hover-bg)] border border-[var(--border)]/50 transition-all hover:scale-105"
                >
                  <Mail className="h-4 w-4 text-[var(--label)]" />
                  <Typography variant="small" className="text-[var(--label)]">
                    Email
                  </Typography>
                </Typography>
              )}
              {user.twitter_username && (
                <Typography
                  variant="a"
                  href={`https://twitter.com/${user.twitter_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--control-bg)] hover:bg-[var(--control-hover-bg)] border border-[var(--border)]/50 transition-all hover:scale-105"
                >
                  <X className="h-4 w-4 text-[var(--label)]" />
                  <Typography variant="small">Twitter</Typography>
                </Typography>
              )}
              {user.blog && (
                <Typography
                  variant="a"
                  href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--control-bg)] hover:bg-[var(--control-hover-bg)] border border-[var(--border)]/50 transition-all hover:scale-105"
                >
                  <Globe className="h-4 w-4 text-[var(--label)]" />
                  <Typography variant="small">Website</Typography>
                </Typography>
              )}
              <Typography
                variant="a"
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--system-blue)] hover:bg-[var(--system-blue)]/90 transition-all hover:scale-105"
              >
                <ExternalLink className="h-4 w-4 text-white" />
                <Typography variant="small" className="text-white">
                  View GitHub
                </Typography>
              </Typography>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        <StatCard
          icon={Code2}
          label="Public Repositories"
          value={user.public_repos}
          gradient="from-[var(--system-blue)]/10 to-[var(--system-blue)]/5"
          description="Code projects"
        />
        <StatCard
          icon={GitFork}
          label="Public Gists"
          value={user.public_gists}
          gradient="from-[var(--system-purple)]/10 to-[var(--system-purple)]/5"
          description="Code snippets"
        />
        <StatCard
          icon={Users}
          label="Followers"
          value={user.followers}
          gradient="from-[var(--system-pink)]/10 to-[var(--system-pink)]/5"
          description="Community"
        />
        <StatCard
          icon={Star}
          label="Following"
          value={user.following}
          gradient="from-[var(--system-yellow)]/10 to-[var(--system-yellow)]/5"
          description="Connections"
        />
      </motion.div>

      {/* More Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="relative overflow-hidden bg-gradient-to-br from-[var(--card-bg)] to-[var(--card-bg)]/80 border border-[var(--border)]/50 rounded-xl p-4 sm:p-5 shadow-sm">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--system-blue)]/5 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[var(--system-purple)]/5 rounded-full blur-2xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-lg bg-gradient-to-br from-[var(--system-blue)]/20 to-[var(--system-purple)]/20 p-2 shadow-sm">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--system-blue)]" />
              </div>
              <Typography variant="large">More Details</Typography>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <InfoRow icon={BookOpen} label="Public Repos" value={user.public_repos.toString()} />
              <InfoRow icon={GitFork} label="Public Gists" value={user.public_gists.toString()} />
              <InfoRow icon={Calendar} label="Member Since" value={humanizeDate(user.created_at)} />
              <InfoRow icon={Calendar} label="Last Updated" value={humanizeDate(user.updated_at)} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
