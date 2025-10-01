import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator.tsx';
import { Typography } from '@/components/ui/typography.tsx';
import type { UserStats } from '@/features/user-stats/types.ts';
import { humanizeDate } from '@/utils/humanize.ts';
import {
  CalendarIcon,
  ExternalLinkIcon,
  FileTextIcon,
  GitBranchIcon,
  GitCommitIcon,
  MinusIcon,
  PlusIcon,
} from 'lucide-react';
import { useState } from 'react';
import { CommitAnalysisPopover } from './CommitAnalysisPopover';

interface UserStatsDisplayProps {
  stats: UserStats;
}

export function UserStatsDisplay({ stats }: UserStatsDisplayProps) {
  const [openPopovers, setOpenPopovers] = useState<Record<string, boolean>>({});

  const togglePopover = (commitSha: string, isOpen: boolean) => {
    setOpenPopovers(prev => ({
      ...prev,
      [commitSha]: isOpen,
    }));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Overview Header */}
      <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <CardContent className="p-3 sm:px-6 sm:py-2">
          {/* Mobile Layout - Ultra Compact & Beautiful */}
          <div className="block sm:hidden">
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="h-9 w-9">
                <AvatarImage src={stats.user.avatarUrl} alt={stats.user.firstName} />
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  {stats.user.firstName[0]}
                  {stats.user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <Typography variant="h4" className="text-sm font-bold leading-tight">
                  {stats.user.firstName} {stats.user.lastName}
                </Typography>
                <Typography variant="muted" className="text-xs leading-tight">
                  @{stats.user.username}
                </Typography>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 min-w-0 flex-1">
                <GitBranchIcon className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                <Typography variant="small" className="font-medium text-xs truncate">
                  {stats.project.name}
                </Typography>
                <Typography
                  variant="a"
                  href={stats.project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0"
                >
                  <ExternalLinkIcon className="h-3 w-3 text-muted-foreground" />
                </Typography>
              </div>
              <div className="flex items-center gap-1 ml-2">
                <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                <Typography variant="muted" className="text-xs whitespace-nowrap">
                  {humanizeDate(stats.dateFrom)} - {humanizeDate(stats.dateTo)}
                </Typography>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={stats.user.avatarUrl} alt={stats.user.firstName} />
                <AvatarFallback className="text-lg bg-primary/10 text-primary">
                  {stats.user.firstName[0]}
                  {stats.user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <Typography variant="h3" className="text-2xl font-bold">
                  {stats.user.firstName} {stats.user.lastName}
                </Typography>
                <Typography variant="muted" className="flex items-center gap-2">
                  <span>@{stats.user.username}</span>
                  <span>•</span>
                  <span>{stats.user.email}</span>
                </Typography>
                <div className="flex items-center gap-2 mt-2">
                  <GitBranchIcon className="h-4 w-4 text-muted-foreground" />
                  <Typography variant="small" className="font-medium">
                    {stats.project.name}
                  </Typography>
                  <Typography
                    variant="a"
                    href={stats.project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLinkIcon className="h-3 w-3 text-muted-foreground" />
                  </Typography>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <CalendarIcon className="h-4 w-4" />
                <Typography variant="small">Analysis Period</Typography>
              </div>
              <Typography variant="small" className="font-medium">
                {humanizeDate(stats.dateFrom)} - {humanizeDate(stats.dateTo)}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics and Language Distribution */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Stats Cards */}
        <Card className="p-3 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left space-y-1 sm:space-y-0 sm:space-x-2">
              <div className="p-1 sm:p-1.5 bg-blue-100 dark:bg-blue-900/20 rounded-md">
                <GitCommitIcon className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="min-w-0 flex-1">
                <Typography variant="small" className="text-xs font-medium text-muted-foreground">
                  Commits
                </Typography>
                <Typography variant="large" className="text-sm sm:text-lg font-bold truncate">
                  {stats.totalCommits}
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-3 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left space-y-1 sm:space-y-0 sm:space-x-2">
              <div className="p-1 sm:p-1.5 bg-green-100 dark:bg-green-900/20 rounded-md">
                <PlusIcon className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="min-w-0 flex-1">
                <Typography variant="small" className="text-xs font-medium text-muted-foreground">
                  Added
                </Typography>
                <Typography
                  variant="large"
                  className="text-sm sm:text-lg font-bold text-green-600 truncate"
                >
                  +{stats.totalAdditions.toLocaleString()}
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-3 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left space-y-1 sm:space-y-0 sm:space-x-2">
              <div className="p-1 sm:p-1.5 bg-red-100 dark:bg-red-900/20 rounded-md">
                <MinusIcon className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 dark:text-red-400" />
              </div>
              <div className="min-w-0 flex-1">
                <Typography variant="small" className="text-xs font-medium text-muted-foreground">
                  Removed
                </Typography>
                <Typography
                  variant="large"
                  className="text-sm sm:text-lg font-bold text-red-600 truncate"
                >
                  -{stats.totalDeletions.toLocaleString()}
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-3 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left space-y-1 sm:space-y-0 sm:space-x-2">
              <div className="p-1 sm:p-1.5 bg-purple-100 dark:bg-purple-900/20 rounded-md">
                <FileTextIcon className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="min-w-0 flex-1">
                <Typography variant="small" className="text-xs font-medium text-muted-foreground">
                  Files
                </Typography>
                <Typography variant="large" className="text-sm sm:text-lg font-bold truncate">
                  {stats.totalChangedFiles}
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Most Active Files */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <GitBranchIcon className="h-4 w-4" />
              Most Active Files
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2 sm:space-y-3 max-h-64 sm:max-h-96 overflow-y-auto">
              {stats.topFiles.slice(0, 8).map(file => (
                <div key={file.filename} className="space-y-2 p-2 sm:p-3 rounded-md bg-muted/30">
                  <div className="flex items-start justify-between">
                    <Typography
                      variant="small"
                      className="font-medium text-xs sm:text-sm truncate flex-1"
                      title={file.filename}
                    >
                      {file.filename}
                    </Typography>
                    <Badge
                      size="xs"
                      variant={
                        file.status === 'added'
                          ? 'success'
                          : file.status === 'modified'
                            ? 'default'
                            : file.status === 'deleted'
                              ? 'destructive'
                              : 'secondary'
                      }
                    >
                      {file.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs">
                    <div className="flex items-center gap-1 text-green-600">
                      <PlusIcon className="h-3 w-3" />
                      {file.additions}
                    </div>
                    <div className="flex items-center gap-1 text-red-600">
                      <MinusIcon className="h-3 w-3" />
                      {file.deletions}
                    </div>
                    <Typography variant="muted" className="text-xs hidden sm:block">
                      {file.changes} changes
                    </Typography>
                  </div>
                  <Separator />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Commits */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <GitCommitIcon className="h-4 w-4" />
              Recent Commits
              <Badge variant="secondary" className="ml-auto text-xs">
                {stats.commits.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2 sm:space-y-3 max-h-64 sm:max-h-96 overflow-y-auto">
              {stats.commits.slice(0, 8).map(commit => (
                <div key={commit.sha} className="space-y-2 p-2 sm:p-3 rounded-md bg-muted/30">
                  <div className="flex items-start justify-between">
                    <Typography
                      variant="small"
                      className="font-medium text-xs sm:text-sm leading-relaxed flex-1"
                    >
                      {commit.message}
                    </Typography>
                    <CommitAnalysisPopover
                      commitSha={commit.sha}
                      projectId={stats.project.id}
                      isOpen={openPopovers[commit.sha] || false}
                      onOpenChange={open => togglePopover(commit.sha, open)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3 text-xs">
                      <div className="flex items-center gap-1 text-green-600">
                        <PlusIcon className="h-3 w-3" />
                        <span>{commit.additions.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1 text-red-600">
                        <MinusIcon className="h-3 w-3" />
                        <span>{commit.deletions.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1 text-blue-600">
                        <FileTextIcon className="h-3 w-3" />
                        <span>{commit.changedFiles}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Typography
                        variant="code"
                        className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono"
                      >
                        {commit.sha.substring(0, 6)}
                      </Typography>
                      <Typography variant="muted" className="text-xs">
                        {humanizeDate(commit.date)}
                      </Typography>
                    </div>
                  </div>
                  <Separator />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
