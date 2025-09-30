import { AlertModal } from '@/components/custom/alert-modal';
import { useDeleteProject } from '@/features/projects/hooks/use-projects';
import { toast } from 'sonner';

interface DeleteProjectProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  projectName?: string;
}

export const DeleteProject = ({
  open,
  onOpenChange,
  projectId,
  projectName,
}: DeleteProjectProps) => {
  const { mutate: deleteProject, isPending } = useDeleteProject();

  const onSubmit = () => {
    deleteProject(projectId, {
      onSuccess: response => {
        toast.success(response?.message || 'Project deleted successfully');
        onOpenChange(false);
      },
      onError: error => {
        toast.error(error.message || 'Failed to delete project');
      },
    });
  };

  return (
    <AlertModal
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Project"
      description={`Are you sure you want to delete "${projectName}"? This action cannot be undone.`}
      confirmText="Delete"
      isLoading={isPending}
      loadingText="Deleting..."
      onConfirm={onSubmit}
      type="danger"
      autoClose={false}
    />
  );
};
