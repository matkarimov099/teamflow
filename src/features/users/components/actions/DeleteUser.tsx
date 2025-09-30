import { AlertModal } from '@/components/custom/alert-modal';
import { useDeleteUser } from '@/features/users/hooks/use-users';
import { toast } from 'sonner';

interface DeleteUserProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  fullName?: string;
}

export const DeleteUser = ({ open, onOpenChange, userId, fullName }: DeleteUserProps) => {
  const { mutate: deleteUser, isPending } = useDeleteUser();

  const onSubmit = () => {
    deleteUser(userId, {
      onSuccess: response => {
        toast.success(response?.message || 'User deleted successfully');
        onOpenChange(false);
      },
      onError: error => {
        toast.error(error.message || 'Failed to delete user');
      },
    });
  };

  return (
    <AlertModal
      open={open}
      onOpenChange={onOpenChange}
      title="Delete User"
      description={`Are you sure you want to delete "${fullName}"? This action cannot be undone.`}
      confirmText="Delete"
      isLoading={isPending}
      loadingText="Deleting..."
      onConfirm={onSubmit}
      type="danger"
      autoClose={false}
    />
  );
};
