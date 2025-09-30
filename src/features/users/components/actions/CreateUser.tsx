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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { Typography } from '@/components/ui/typography.tsx';
import { useCheckUser, useCreateUser } from '@/features/users/hooks/use-users';
import { type UserCreateSchema, userCreateSchema } from '@/features/users/schema/users.schema.ts';
import { useDisclosure } from '@/hooks/use-disclosure.ts';
import { PositionOptions, RoleOptions } from '@/types/common.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface CreateUserProps {
  className?: string;
}

export function CreateUser({ className }: CreateUserProps = {}) {
  const { isOpen, onClose, onOpenChange } = useDisclosure();

  const { mutate: createUser, isPending } = useCreateUser();
  const { mutate: checkUser } = useCheckUser();

  const [membershipStatus, setMembershipStatus] = useState<boolean | null>(null);

  const form = useForm<UserCreateSchema>({
    resolver: zodResolver(userCreateSchema()),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
    },
  });

  const username = form.watch('username');

  useEffect(() => {
    if (username && username.trim().length > 0) {
      const timeoutId = setTimeout(() => {
        checkUser(username, {
          onSuccess: result => {
            setMembershipStatus(result);
          },
          onError: () => {
            setMembershipStatus(null);
          },
        });
      }, 500); // 500ms debounce

      return () => clearTimeout(timeoutId);
    }
    setMembershipStatus(null);
  }, [username, checkUser]);

  function onSubmit(data: UserCreateSchema) {
    createUser(data, {
      onSuccess: response => {
        const message = response?.message || 'User created successfully';

        toast.success(message, {
          duration: Number.POSITIVE_INFINITY, // Toast won't auto-close
          action: response?.message
            ? {
                label: 'Copy',
                onClick: () => {
                  navigator.clipboard
                    .writeText(response.message)
                    .then(() => {
                      toast.success('Message copied to clipboard', { duration: 2000 });
                    })
                    .catch(() => {
                      toast.error('Failed to copy message', { duration: 2000 });
                    });
                },
              }
            : undefined,
          cancel: {
            label: 'Close',
            onClick: () => {}, // Just closes the toast
          },
        });

        onClose();
        form.reset({
          firstName: '',
          lastName: '',
          email: '',
          username: '',
          role: undefined,
          position: undefined,
        });
      },
      onError: error => {
        toast.error(error.message || 'Failed to create user');
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
          Create User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
          <DialogDescription>
            Create a new user account. Fill in the required information below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Fields Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>First Name</FormLabel>
                    <FormControl>
                      <Input inputSize="md" placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Last Name</FormLabel>
                    <FormControl>
                      <Input inputSize="md" placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Contact Fields Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        inputSize="md"
                        type="email"
                        placeholder="john.doe@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormLabel required>Username</FormLabel>
                      {membershipStatus !== null && (
                        <Typography
                          variant="p"
                          className={`text-sm !mt-0 font-medium ${
                            membershipStatus
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}
                        >
                          {membershipStatus ? 'Member' : 'Not Member'}
                        </Typography>
                      )}
                    </div>
                    <FormControl>
                      <Input inputSize="md" placeholder="johndoe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Role & Position Fields Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {RoleOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
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
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a position" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PositionOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={isPending}>
                {isPending ? 'Creating...' : 'Create User'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
