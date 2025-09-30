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
import { Textarea } from '@/components/ui/textarea';
import { useUpdateAgent } from '@/features/ai-agents/hooks/use-agents';
import {
  type AgentUpdateSchema,
  agentUpdateSchema,
} from '@/features/ai-agents/schema/agents.schema';
import type { Agent, AgentUpdate } from '@/features/ai-agents/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface UpdateAgentProps {
  agent: Agent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdateAgent({ agent, open, onOpenChange }: UpdateAgentProps) {
  const { mutate: updateAgent, isPending } = useUpdateAgent();

  const form = useForm<AgentUpdateSchema>({
    resolver: zodResolver(agentUpdateSchema()),
    defaultValues: {
      name: '',
      prompt: '',
      description: '',
    },
  });

  // Populate form with agent data when the agent changes or modal opens
  useEffect(() => {
    if (agent && open) {
      form.reset({
        name: agent.name,
        prompt: agent.prompt,
        description: agent.description || '',
      });
    }
  }, [agent, open, form]);

  function onSubmit(data: AgentUpdate) {
    updateAgent(
      { id: agent.id, data },
      {
        onSuccess: response => {
          toast.success(response?.message || 'Agent updated successfully');
          onOpenChange(false);
        },
        onError: error => {
          toast.error(error.message || 'Failed to update agent');
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Update Agent</DialogTitle>
          <DialogDescription>
            Update agent information. Modify the fields below and save changes.
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
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={isPending}>
                {isPending ? 'Updating...' : 'Update Agent'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
