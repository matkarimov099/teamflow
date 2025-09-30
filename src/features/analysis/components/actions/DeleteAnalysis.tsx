import { AlertModal } from '@/components/custom/alert-modal';
import { useDeleteAnalysis } from '@/features/analysis/hooks/use-analysis.ts';
import { toast } from 'sonner';

interface DeleteAnalysisProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  analysisId: string;
  projectName?: string;
}

export const DeleteAnalysis = ({
  open,
  onOpenChange,
  analysisId,
  projectName,
}: DeleteAnalysisProps) => {
  const { mutate: deleteAnalysis, isPending } = useDeleteAnalysis();

  const onSubmit = () => {
    deleteAnalysis(analysisId, {
      onSuccess: response => {
        toast.success(response?.message || 'Analysis deleted successfully');
        onOpenChange(false);
      },
      onError: error => {
        toast.error(error.message || 'Failed to delete analysis');
      },
    });
  };

  return (
    <AlertModal
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Analysis"
      description={`Are you sure you want to delete the analysis for "${projectName}"? This action cannot be undone.`}
      confirmText="Delete"
      isLoading={isPending}
      loadingText="Deleting..."
      onConfirm={onSubmit}
      type="danger"
      autoClose={false}
    />
  );
};
