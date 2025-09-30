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
import { Textarea } from '@/components/ui/textarea';
import { useCreateAgent } from '@/features/ai-agents/hooks/use-agents';
import {
  type AgentCreateSchema,
  agentCreateSchema,
} from '@/features/ai-agents/schema/agents.schema';
import type { AgentCreate } from '@/features/ai-agents/types';
import { useDisclosure } from '@/hooks/use-disclosure';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface CreateAgentProps {
  className?: string;
}

export function CreateAgent({ className }: CreateAgentProps) {
  const { isOpen, onClose, onOpenChange } = useDisclosure();

  const { mutate: createAgent, isPending } = useCreateAgent();

  const form = useForm<AgentCreateSchema>({
    resolver: zodResolver(agentCreateSchema()),
    defaultValues: {
      name: '',
      prompt: '',
      description: '',
    },
  });

  function onSubmit(data: AgentCreate) {
    createAgent(data, {
      onSuccess: response => {
        toast.success(response?.message || 'Agent created successfully');
        onClose();
        form.reset({
          name: '',
          prompt: '',
          description: '',
        });
      },
      onError: error => {
        toast.error(error.message || 'Failed to create agent');
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
          Create Agent
        </Button>
      </DialogTrigger>
      <DialogContent className="md:!max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Agent</DialogTitle>
          <DialogDescription>
            Create a new AI agent. Fill in the required information below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Name</FormLabel>
                  <FormControl>
                    <Input inputSize="md" placeholder="Enter agent name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter agent description (optional)"
                      className="min-h-20 max-h-32 resize-y overflow-y-auto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Prompt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the agent's system prompt..."
                      className="min-h-40 max-h-60 resize-y overflow-y-auto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={isPending}>
                {isPending ? 'Creating...' : 'Create Agent'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
