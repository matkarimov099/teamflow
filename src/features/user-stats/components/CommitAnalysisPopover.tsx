import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Spinner } from '@/components/ui/spinner.tsx';
import { Typography } from '@/components/ui/typography.tsx';
import { useCommitAnalysis } from '@/features/user-stats/hooks/use-commit-analysis.ts';
import { BrainIcon, CopyIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { MarkdownRenderer } from './MarkdownRenderer';

interface CommitAnalysisPopoverProps {
  commitSha: string;
  projectId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommitAnalysisPopover({
  commitSha,
  projectId,
  isOpen,
  onOpenChange,
}: CommitAnalysisPopoverProps) {
  const {
    mutate: commitAnalysis,
    isPending,
    isError,
    variables,
    data,
    isSuccess,
  } = useCommitAnalysis();

  const handleAnalyzeCommit = () => {
    commitAnalysis(
      {
        projectId,
        commitSha,
      },
      {
        onSuccess: () => {
          toast.success('Commit analysis completed successfully');
        },
        onError: error => {
          toast.error(error.message || 'Failed to analyze commit');
        },
      }
    );
  };

  const handleCopyAnalysis = async (analysis: string) => {
    try {
      await navigator.clipboard.writeText(analysis);
      toast.success('Analysis copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy analysis');
    }
  };

  const handleTriggerClick = () => {
    onOpenChange(true);
    handleAnalyzeCommit();
  };

  return (
    <Popover open={isOpen} onOpenChange={() => {}}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 ml-2"
          onClick={handleTriggerClick}
          disabled={isPending}
        >
          {isPending && variables?.commitSha === commitSha ? (
            <Spinner className="h-3 w-3" />
          ) : (
            <BrainIcon className="h-3 w-3" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[700px]" align="end">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Typography variant="small" className="font-semibold">
                Commit Analysis
              </Typography>
              <Typography variant="code" className="text-xs">
                {commitSha.substring(0, 8)}
              </Typography>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => onOpenChange(false)}
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>

          {isPending && variables?.commitSha === commitSha ? (
            <div className="flex items-center justify-center py-8">
              <Spinner className="h-6 w-6" />
            </div>
          ) : isSuccess && variables?.commitSha === commitSha ? (
            <div className="space-y-3">
              <div className="max-h-96 overflow-y-auto">
                <MarkdownRenderer content={data || ''} />
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyAnalysis(data || '')}
                  className="flex items-center gap-2"
                >
                  <CopyIcon className="h-3 w-3" />
                  Copy
                </Button>
              </div>
            </div>
          ) : isError && variables?.commitSha === commitSha ? (
            <div className="text-center py-4">
              <Typography variant="small" className="text-destructive">
                Failed to analyze commit
              </Typography>
            </div>
          ) : (
            <div className="text-center py-4">
              <Typography variant="small" className="text-muted-foreground">
                Click the analyze button to get commit analysis
              </Typography>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
