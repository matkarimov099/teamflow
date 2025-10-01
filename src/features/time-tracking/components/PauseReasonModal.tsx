import { RadioOption } from '@/components/custom/radio-option';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
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
import { RadioGroup } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Typography } from '@/components/ui/typography';
import { usePauseTimeTracking } from '@/features/time-tracking/hooks/use-time-tracking.ts';
import {
  type PauseReasonFormData,
  timeTrackingSchema,
} from '@/features/time-tracking/schema/time-tracking.schema.ts';
import { PauseReason, type PauseReasonModalProps } from '@/features/time-tracking/types.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Coffee, MoreHorizontal, Users, Utensils } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const pauseReasonOptions = [
  { label: 'Lunch Break', value: PauseReason.LUNCH, icon: Utensils },
  { label: 'Short Break', value: PauseReason.BREAK, icon: Coffee },
  { label: 'Meeting', value: PauseReason.MEETING, icon: Users },
  { label: 'Technical Issue', value: PauseReason.TECHNICAL_ISSUE, icon: AlertCircle },
  { label: 'Other', value: PauseReason.OTHER, icon: MoreHorizontal },
];

export function PauseReasonModal({ open, onOpenChange, onSuccess }: PauseReasonModalProps) {
  const { mutate: pauseTracking, isPending } = usePauseTimeTracking();

  const form = useForm<PauseReasonFormData>({
    resolver: zodResolver(timeTrackingSchema),
    defaultValues: {
      reason: PauseReason.BREAK,
      customReason: '',
    },
  });

  const selectedReason = form.watch('reason');
  const showCustomReasonField = selectedReason === PauseReason.OTHER;

  const onSubmit = (data: PauseReasonFormData) => {
    pauseTracking(
      {
        reason: data.reason,
        customReason: data.customReason,
      },
      {
        onSuccess: () => {
          toast.success('Time tracking paused successfully');
          form.reset();
          onOpenChange(false);
          onSuccess?.();
        },
        onError: error => {
          toast.error(error?.message || 'Failed to pause time tracking');
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            <Typography variant="h4" className="!mt-0">
              Pause Time Tracking
            </Typography>
          </DialogTitle>
          <Typography variant="muted" className="!mt-1">
            Please select the reason for pausing your work session.
          </Typography>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant="h5" className="!mt-0">
                      Select Pause Reason
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >
                      {pauseReasonOptions.map(option => (
                        <RadioOption
                          key={option.value}
                          value={option.value}
                          label={option.label}
                          icon={option.icon}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {showCustomReasonField && (
              <FormField
                control={form.control}
                name="customReason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Typography variant="label" className="!mt-0">
                        Describe Your Reason
                      </Typography>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please provide more details about the pause reason..."
                        className="resize-none min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter className="flex gap-2">
              <Button
                type="button"
                size="lg"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" size="lg" loading={isPending} loadingText="Pausing...">
                Confirm Pause
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
