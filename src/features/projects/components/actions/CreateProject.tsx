import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { RepositoryInfo } from '@/features/projects/components/RepositoryInfo';
import { useCheckProject, useCreateProject } from '@/features/projects/hooks/use-projects';
import {
  type ProjectCreateSchema,
  projectCreateSchema,
} from '@/features/projects/schema/projects.schema';
import type { Repository } from '@/features/projects/types';
import type { ProjectCreate } from '@/features/projects/types';
import { useDisclosure } from '@/hooks/use-disclosure';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface CreateProjectProps {
  className?: string;
}

export function CreateProject({ className }: CreateProjectProps = {}) {
  const { isOpen, onClose, onOpenChange } = useDisclosure();

  const { mutate: createProject, isPending } = useCreateProject();
  const { mutate: checkProject, isPending: isChecking } = useCheckProject();

  const [repositoryData, setRepositoryData] = useState<Repository | null>(null);

  const form = useForm<ProjectCreateSchema>({
    resolver: zodResolver(projectCreateSchema()),
    defaultValues: {
      url: '',
    },
  });

  const url = form.watch('url');

  const handleCheckProject = () => {
    if (!url || !url.trim()) {
      toast.error('Please enter a URL first');
      return;
    }

    checkProject(
      { url },
      {
        onSuccess: repository => {
          setRepositoryData(repository);
          toast.success('Repository found successfully!');
        },
        onError: error => {
          setRepositoryData(null);
          toast.error(error.message || 'Repository not found. Please check the URL and try again.');
        },
      }
    );
  };

  function onSubmit(data: ProjectCreate) {
    createProject(data, {
      onSuccess: response => {
        toast.success(response?.message || 'Project created successfully');
        onClose();
        form.reset({
          url: '',
        });
        setRepositoryData(null);
      },
      onError: error => {
        toast.error(error.message || 'Failed to create project');
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          leftIcon={<PlusIcon className="mr-2 h-4 w-4" />}
          size="default"
          variant="primary"
          className={className}
        >
          Create Project
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] sm:w-[90vw] md:w-full md:max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b">
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Create a new project. Fill in the required information below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col flex-1 overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Repository URL</FormLabel>
                    <FormControl>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
                        <div className="flex-1 min-w-0">
                          <Input
                            inputSize="md"
                            type="url"
                            placeholder="https://github.com/owner/repo"
                            {...field}
                          />
                        </div>
                        <Button
                          loading={isChecking}
                          type="button"
                          variant="outline"
                          size="default"
                          onClick={handleCheckProject}
                          disabled={isChecking || !url?.trim()}
                          className="w-full sm:w-auto sm:min-w-[100px]"
                          leftIcon={<CheckIcon className="h-4 w-4" />}
                        >
                          Check
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {repositoryData && <RepositoryInfo repository={repositoryData} />}
            </div>

            <DialogFooter className="px-4 sm:px-6 py-3 sm:py-4 border-t flex-row gap-2 sm:gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isPending}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={isPending}
                disabled={isPending || !repositoryData}
                className="flex-1 sm:flex-none"
              >
                Create Project
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
