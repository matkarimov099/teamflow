import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import type { Repository } from '@/features/projects/types';
import { humanizeCompactNumber, humanizeDate } from '@/utils/humanize';
import {
  AlertCircleIcon,
  BookOpenIcon,
  CalendarIcon,
  CheckCircleIcon,
  CheckIcon,
  CodeIcon,
  CopyIcon,
  EyeIcon,
  GitBranchIcon,
  GitForkIcon,
  GitMergeIcon,
  GlobeIcon,
  LockIcon,
  ScaleIcon,
  StarIcon,
  UnlockIcon,
  UserIcon,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface RepositoryInfoProps {
  repository: Repository;
}

export function RepositoryInfo({ repository }: RepositoryInfoProps) {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedUrl(label);
      toast.success(`${label} copied to clipboard!`);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <div className="rounded-lg border bg-gradient-to-br from-primary/5 via-muted/40 to-muted/20 overflow-hidden">
      {/* Header Section with Owner */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 pb-5 border-b">
        <div className="flex items-start gap-4">
          {/* Owner Avatar */}
          <div className="relative flex-shrink-0">
            <Avatar className="h-16 w-16 rounded-xl ring-2 ring-background shadow-lg">
              <AvatarImage src={repository.owner.avatar_url} alt={repository.owner.login} />
              <AvatarFallback className="rounded-xl bg-primary/10">
                <UserIcon className="h-8 w-8 text-primary" />
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-background flex items-center justify-center shadow-md">
              <BookOpenIcon className="h-3.5 w-3.5 text-primary" />
            </div>
          </div>

          {/* Repository Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Typography variant="h3" className="font-bold truncate">
                    {repository.name}
                  </Typography>
                  {repository.private ? (
                    <Badge variant="warning" className="gap-1">
                      <LockIcon className="h-3 w-3" />
                      Private
                    </Badge>
                  ) : (
                    <Badge variant="success" className="gap-1">
                      <UnlockIcon className="h-3 w-3" />
                      Public
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <UserIcon className="h-4 w-4" />
                  <span className="font-medium">{repository.owner.login}</span>
                  {repository.owner.type && (
                    <Badge variant="secondary" className="text-xs">
                      {repository.owner.type}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {repository.description && (
              <Typography
                variant="small"
                className="mt-3 text-muted-foreground line-clamp-2 leading-relaxed"
              >
                {repository.description}
              </Typography>
            )}
          </div>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-background/40">
        {/* Stars */}
        <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-100/50 dark:from-yellow-900/20 dark:to-yellow-800/10 border border-yellow-200 dark:border-yellow-800/30 hover:shadow-md transition-all">
          <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center mb-2">
            <StarIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400 fill-yellow-500/50" />
          </div>
          <Typography variant="h3" className="font-bold text-yellow-700 dark:text-yellow-400">
            {humanizeCompactNumber(repository.stargazers_count)}
          </Typography>
          <Typography
            variant="small"
            className="text-yellow-600/80 dark:text-yellow-500/80 text-xs font-medium"
          >
            Stars
          </Typography>
        </div>

        {/* Forks */}
        <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 border border-blue-200 dark:border-blue-800/30 hover:shadow-md transition-all">
          <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-2">
            <GitForkIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <Typography variant="h3" className="font-bold text-blue-700 dark:text-blue-400">
            {humanizeCompactNumber(repository.forks_count)}
          </Typography>
          <Typography
            variant="small"
            className="text-blue-600/80 dark:text-blue-500/80 text-xs font-medium"
          >
            Forks
          </Typography>
        </div>

        {/* Watchers */}
        <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10 border border-purple-200 dark:border-purple-800/30 hover:shadow-md transition-all">
          <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-2">
            <EyeIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <Typography variant="h3" className="font-bold text-purple-700 dark:text-purple-400">
            {humanizeCompactNumber(repository.watchers_count)}
          </Typography>
          <Typography
            variant="small"
            className="text-purple-600/80 dark:text-purple-500/80 text-xs font-medium"
          >
            Watchers
          </Typography>
        </div>

        {/* Open Issues */}
        <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-900/20 dark:to-red-800/10 border border-red-200 dark:border-red-800/30 hover:shadow-md transition-all">
          <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center mb-2">
            <AlertCircleIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
          <Typography variant="h3" className="font-bold text-red-700 dark:text-red-400">
            {humanizeCompactNumber(repository.open_issues_count)}
          </Typography>
          <Typography
            variant="small"
            className="text-red-600/80 dark:text-red-500/80 text-xs font-medium"
          >
            Open Issues
          </Typography>
        </div>
      </div>

      {/* Repository Details */}
      <div className="px-6 pb-6 space-y-4">
        {/* Tech Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {repository.language && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-background to-muted/30 border hover:shadow-sm transition-all">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <CodeIcon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <Typography variant="small" className="text-xs text-muted-foreground mb-0.5">
                  Language
                </Typography>
                <Typography variant="p" className="font-semibold truncate text-sm">
                  {repository.language}
                </Typography>
              </div>
            </div>
          )}

          {repository.default_branch && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-background to-muted/30 border hover:shadow-sm transition-all">
              <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                <GitBranchIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <Typography variant="small" className="text-xs text-muted-foreground mb-0.5">
                  Default Branch
                </Typography>
                <Typography variant="p" className="font-semibold truncate text-sm">
                  {repository.default_branch}
                </Typography>
              </div>
            </div>
          )}

          {repository.license && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-background to-muted/30 border hover:shadow-sm transition-all">
              <div className="h-9 w-9 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                <ScaleIcon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <Typography variant="small" className="text-xs text-muted-foreground mb-0.5">
                  License
                </Typography>
                <Typography variant="p" className="font-semibold truncate text-sm">
                  {repository.license.name}
                </Typography>
              </div>
            </div>
          )}

          {repository.visibility && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-background to-muted/30 border hover:shadow-sm transition-all">
              <div className="h-9 w-9 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                <GlobeIcon className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div className="flex-1 min-w-0">
                <Typography variant="small" className="text-xs text-muted-foreground mb-0.5">
                  Visibility
                </Typography>
                <Typography variant="p" className="font-semibold truncate text-sm capitalize">
                  {repository.visibility}
                </Typography>
              </div>
            </div>
          )}

          {repository.created_at && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-background to-muted/30 border hover:shadow-sm transition-all">
              <div className="h-9 w-9 rounded-lg bg-slate-500/10 flex items-center justify-center flex-shrink-0">
                <CalendarIcon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                <Typography variant="small" className="text-xs text-muted-foreground mb-0.5">
                  Created
                </Typography>
                <Typography variant="p" className="font-semibold truncate text-sm">
                  {humanizeDate(repository.created_at)}
                </Typography>
              </div>
            </div>
          )}

          {repository.pushed_at && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-background to-muted/30 border hover:shadow-sm transition-all">
              <div className="h-9 w-9 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                <GitMergeIcon className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="flex-1 min-w-0">
                <Typography variant="small" className="text-xs text-muted-foreground mb-0.5">
                  Last Push
                </Typography>
                <Typography variant="p" className="font-semibold truncate text-sm">
                  {humanizeDate(repository.pushed_at)}
                </Typography>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 pt-2">
          {repository.has_issues && (
            <Badge variant="secondary" className="gap-1.5">
              <CheckCircleIcon className="h-3 w-3" />
              Issues
            </Badge>
          )}
          {repository.has_projects && (
            <Badge variant="secondary" className="gap-1.5">
              <CheckCircleIcon className="h-3 w-3" />
              Projects
            </Badge>
          )}
          {repository.has_wiki && (
            <Badge variant="secondary" className="gap-1.5">
              <CheckCircleIcon className="h-3 w-3" />
              Wiki
            </Badge>
          )}
          {repository.has_pages && (
            <Badge variant="secondary" className="gap-1.5">
              <CheckCircleIcon className="h-3 w-3" />
              Pages
            </Badge>
          )}
          {repository.archived && (
            <Badge variant="destructive" className="gap-1.5">
              <AlertCircleIcon className="h-3 w-3" />
              Archived
            </Badge>
          )}
          {repository.is_template && (
            <Badge variant="default" className="gap-1.5">
              <BookOpenIcon className="h-3 w-3" />
              Template
            </Badge>
          )}
        </div>
      </div>

      {/* Clone URLs */}
      <div className="px-6 pb-6 space-y-3">
        <Typography
          variant="small"
          className="text-muted-foreground font-semibold text-xs flex items-center gap-2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Clone URLs
        </Typography>

        {/* HTTPS Clone URL */}
        {repository.clone_url && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 sm:p-4 rounded-lg bg-gradient-to-br from-background to-muted/30 border hover:shadow-sm transition-all">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="h-9 w-9 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <GlobeIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <Typography variant="small" className="text-xs text-muted-foreground mb-1 block">
                  HTTPS
                </Typography>
                <Typography variant="small" className="font-mono text-xs truncate block">
                  {repository.clone_url}
                </Typography>
              </div>
            </div>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => handleCopy(repository.clone_url, 'HTTPS URL')}
              className="flex-shrink-0 h-8 w-8 p-0 self-end sm:self-center"
            >
              {copiedUrl === 'HTTPS URL' ? (
                <CheckIcon className="h-4 w-4 text-green-600" />
              ) : (
                <CopyIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}

        {/* SSH URL */}
        {repository.ssh_url && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 sm:p-4 rounded-lg bg-gradient-to-br from-background to-muted/30 border hover:shadow-sm transition-all">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="h-9 w-9 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <CodeIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <Typography variant="small" className="text-xs text-muted-foreground mb-1 block">
                  SSH
                </Typography>
                <Typography variant="small" className="font-mono text-xs truncate block">
                  {repository.ssh_url}
                </Typography>
              </div>
            </div>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => handleCopy(repository.ssh_url, 'SSH URL')}
              className="flex-shrink-0 h-8 w-8 p-0 self-end sm:self-center"
            >
              {copiedUrl === 'SSH URL' ? (
                <CheckIcon className="h-4 w-4 text-green-600" />
              ) : (
                <CopyIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Topics */}
      {repository.topics && repository.topics.length > 0 && (
        <div className="px-6 pb-6 pt-0">
          <div className="p-4 rounded-lg bg-muted/30 border border-dashed">
            <Typography
              variant="small"
              className="text-muted-foreground font-semibold text-xs mb-3 flex items-center gap-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Topics
            </Typography>
            <div className="flex flex-wrap gap-2">
              {repository.topics.map(topic => (
                <Badge
                  key={topic}
                  variant="outline"
                  className="px-2.5 py-1 text-xs font-medium hover:bg-primary/10 hover:border-primary/50 transition-all"
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
