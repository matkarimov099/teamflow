import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUpdateProject } from '@/features/projects/hooks/use-projects';
import {
  type ProjectUpdateSchema,
  projectUpdateSchema,
} from '@/features/projects/schema/projects.schema';
import type { Project, ProjectUpdate } from '@/features/projects/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface UpdateProjectProps {
  project: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdateProject({ project, open, onOpenChange }: UpdateProjectProps) {
  const { mutate: updateProject, isPending } = useUpdateProject();

  const form = useForm<ProjectUpdateSchema>({
    resolver: zodResolver(projectUpdateSchema()),
    defaultValues: {
      url: '',
    },
  });

  // Populate form with project data when the project changes or modal opens
  useEffect(() => {
    if (project && open) {
      form.reset({
        url: project.url,
      });
    }
  }, [project, open, form]);

  function onSubmit(data: ProjectUpdate) {
    updateProject(
      { id: project.id, data },
      {
        onSuccess: response => {
          toast.success(response?.message || 'Project updated successfully');
          onOpenChange(false);
        },
        onError: error => {
          toast.error(error.message || 'Failed to update project');
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Project</DialogTitle>
          <DialogDescription>
            Update project information. Modify the fields below and save changes.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>URL</FormLabel>
                  <FormControl>
                    <Input inputSize="md" type="url" placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={isPending}>
                {isPending ? 'Updating...' : 'Update Project'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
