import { zodResolver } from '@hookform/resolvers/zod';
import { BarChart3Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { DatePicker } from '@/components/custom/date-picker.tsx';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Typography } from '@/components/ui/typography.tsx';
import { useGetProjects } from '@/features/projects/hooks/use-projects.ts';
import type { Project } from '@/features/projects/types.ts';
import { useGetUserStats } from '@/features/user-stats/hooks/use-user-stats.ts';
import {
  type UserStatsInputSchema,
  userStatsInputSchema,
} from '@/features/user-stats/schema/user-stats.schema.ts';
import type { UserStats } from '@/features/user-stats/types.ts';
import { useGetUsers } from '@/features/users/hooks/use-users.ts';
import type { User } from '@/features/users/types.ts';
import { dateToString } from '@/utils/utils.ts';

interface UserStatsFormProps {
  onStatsLoaded: (stats: UserStats) => void;
  onLoadingStart?: () => void;
}

export function UserStatsForm({ onStatsLoaded }: UserStatsFormProps) {
  const form = useForm<UserStatsInputSchema>({
    resolver: zodResolver(userStatsInputSchema()),
    defaultValues: {
      projectId: undefined,
      userId: undefined,
      from: undefined,
      to: undefined,
    },
  });

  const { data: usersData } = useGetUsers({
    limit: 100,
    page: 1,
  });

  const { data: projectsData } = useGetProjects({
    limit: 100,
    page: 1,
  });

  const { mutate: getStats, isPending } = useGetUserStats();

  const onSubmit = (values: UserStatsInputSchema) => {
    getStats(values, {
      onSuccess: data => {
        onStatsLoaded(data);
      },
      onError: error => {
        console.error('Error fetching user stats:', error);
      },
    });
  };

  const formatDateForAPI = (date: Date) => {
    return dateToString(date);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-end">
          {/* Filters Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <Typography variant="small" asChild>
                    <FormLabel className="text-sm font-medium">Project</FormLabel>
                  </Typography>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger size="lg" className="w-full">
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {projectsData?.data?.map((project: Project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <Typography variant="small" asChild>
                    <FormLabel className="text-sm font-medium">User</FormLabel>
                  </Typography>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger size="lg" className="w-full">
                        <SelectValue placeholder="Select user" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {usersData?.data?.data?.map((user: User) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.firstName} {user.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem>
                  <Typography variant="small" asChild>
                    <FormLabel className="text-sm font-medium">From Date</FormLabel>
                  </Typography>
                  <FormControl>
                    <DatePicker
                      date={field.value ? new Date(field.value) : undefined}
                      onDateSelect={date => {
                        field.onChange(date ? formatDateForAPI(date) : '');
                      }}
                      placeholder="Start date"
                      size="lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <Typography variant="small" asChild>
                    <FormLabel className="text-sm font-medium">To Date</FormLabel>
                  </Typography>
                  <FormControl>
                    <DatePicker
                      date={field.value ? new Date(field.value) : undefined}
                      onDateSelect={date => {
                        field.onChange(date ? formatDateForAPI(date) : '');
                      }}
                      placeholder="End date"
                      size="lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center lg:justify-start">
            <Button
              type="submit"
              disabled={isPending}
              size="lg"
              className="w-full sm:w-auto lg:w-auto min-w-48 whitespace-nowrap"
              leftIcon={<BarChart3Icon className="w-4 h-4" />}
            >
              {isPending ? 'Generating...' : 'Generate Stats'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
