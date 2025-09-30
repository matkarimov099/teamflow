import { BarChart3Icon, GitBranchIcon, UsersIcon } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography.tsx';

export function EmptyState() {
  return (
    <Card className="border-dashed border-2 border-muted-foreground/25">
      <CardContent className="flex flex-col items-center justify-center py-12 sm:py-16 px-4 sm:px-6 text-center">
        <div className="rounded-full bg-muted p-3 sm:p-4 mb-4 sm:mb-6">
          <GitBranchIcon className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
        </div>
        <Typography variant="h2" align="center" className="mb-2">
          GitHub Statistics Awaiting
        </Typography>
        <Typography variant="muted" align="center" className="mb-6 max-w-md">
          Select a project, user, and date range to generate comprehensive GitHub statistics and
          insights.
        </Typography>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs sm:text-sm text-muted-foreground">
            <BarChart3Icon className="h-4 w-4 flex-shrink-0" />
            <Typography variant="small" className="text-xs sm:text-sm">
              Commit Analysis
            </Typography>
          </div>
          <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs sm:text-sm text-muted-foreground">
            <UsersIcon className="h-4 w-4 flex-shrink-0" />
            <Typography variant="small" className="text-xs sm:text-sm">
              Team Insights
            </Typography>
          </div>
          <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs sm:text-sm text-muted-foreground">
            <GitBranchIcon className="h-4 w-4 flex-shrink-0" />
            <Typography variant="small" className="text-xs sm:text-sm">
              File Changes
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
