import { AlertModal } from '@/components/custom/alert-modal';
import { useDeleteAgent } from '@/features/ai-agents/hooks/use-agents';
import { toast } from 'sonner';

interface DeleteAgentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentId: string;
  agentName?: string;
}

export const DeleteAgent = ({ open, onOpenChange, agentId, agentName }: DeleteAgentProps) => {
  const { mutate: deleteAgent, isPending } = useDeleteAgent();

  const onSubmit = () => {
    deleteAgent(agentId, {
      onSuccess: response => {
        toast.success(response?.message || 'Agent deleted successfully');
        onOpenChange(false);
      },
      onError: error => {
        toast.error(error.message || 'Failed to delete agent');
      },
    });
  };

  return (
    <AlertModal
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Agent"
      description={`Are you sure you want to delete "${agentName}"? This action cannot be undone.`}
      confirmText="Delete"
      isLoading={isPending}
      loadingText="Deleting..."
      onConfirm={onSubmit}
      type="danger"
      autoClose={false}
    />
  );
};
