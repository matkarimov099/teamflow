import { AvatarGroup } from '@/components/custom/avatar-group';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/typography';
import type { Analysis } from '@/features/analysis/types';
import { humanizeDateTime } from '@/utils/humanize.ts';
import {
  BarChart3Icon,
  BotIcon,
  CalendarIcon,
  ClockIcon,
  DownloadIcon,
  FileTextIcon,
  FolderIcon,
  UsersIcon,
} from 'lucide-react';

interface ViewAnalysisProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  analysis: Analysis;
}

export const ViewAnalysis = ({ open, onOpenChange, analysis }: ViewAnalysisProps) => {
  const handleDownload = () => {
    const blob = new Blob([analysis.response], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analysis-${analysis.project.name}-${analysis.dateFrom}-${analysis.dateTo}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:!max-w-6xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <BarChart3Icon className="h-6 w-6 text-blue-600" />
            Analysis Report
          </DialogTitle>
          <DialogDescription className="text-base">
            Comprehensive analysis generated on {humanizeDateTime(analysis.createdAt)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 overflow-y-auto">
          {/* Analysis Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card className="border-l-4 border-l-blue-500 p-0">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <FolderIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">Project</span>
                </div>
                <Typography variant="small" className="font-semibold truncate">
                  {analysis.project.name}
                </Typography>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500 p-0">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <BotIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">AI Agent</span>
                </div>
                <Typography variant="small" className="font-semibold truncate">
                  {analysis.agent.name}
                </Typography>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500 p-0">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <ClockIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">Duration</span>
                </div>
                <Typography variant="small" className="font-semibold">
                  {Math.floor(analysis.durationSeconds / 60)}m {analysis.durationSeconds % 60}s
                </Typography>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500 p-0">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">Period</span>
                </div>
                <Typography
                  variant="small"
                  className="font-semibold truncate text-muted-foreground"
                >
                  {analysis.dateFrom} - {analysis.dateTo}
                </Typography>
              </CardContent>
            </Card>
          </div>

          {/* Users Section */}
          <Card className="p-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UsersIcon className="h-4 w-4 text-indigo-500" />
                  <span className="text-sm font-medium">
                    Analyzed Users ({analysis.users.length})
                  </span>
                </div>
                <AvatarGroup
                  users={analysis.users.map(user => ({
                    id: user.id,
                    name: `${user.firstName} ${user.lastName}`,
                    image: user.avatarUrl, // Add user.avatar if available
                  }))}
                  maxVisible={6}
                  size="lg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Analysis Report */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileTextIcon className="h-5 w-5 text-emerald-500" />
                Analysis Report
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
              <ScrollArea className="h-[400px] w-full rounded-lg bg-muted/30">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                  {analysis.response}
                </pre>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleDownload} className="gap-2">
            <DownloadIcon className="h-4 w-4" />
            Download Report
          </Button>
          <Button onClick={() => onOpenChange(false)} className="gap-2">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
