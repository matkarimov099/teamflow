import { Button } from '@/components/ui/button.tsx';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input.tsx';
import { PasswordInput } from '@/components/ui/password-input';
import { type LoginSchema, createLoginSchema } from '@/features/auth/schema/auth.schema';
import { setAuthTokens } from '@/lib/auth';
import type { ServerError } from '@/types/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { ChevronRightIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useLogin } from '../hooks/use-auth';

export const LoginForm = () => {
  const { mutate: login, isPending } = useLogin();
  const navigate = useNavigate();
  const location = useLocation();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(createLoginSchema()),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  function onFormSubmit(values: LoginSchema) {
    login(values, {
      onSuccess: data => {
        setAuthTokens(data.data.accessToken, data.data.refreshToken);
        navigate(location.state?.from?.pathname || '/profile', { replace: true });
      },
      onError: error => {
        if (isAxiosError<ServerError>(error)) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error('An error occurred during login!');
        }
      },
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className="px-2 py-6">
          <div className="grid gap-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/70 dark:text-foreground/80">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input inputSize="xl" placeholder="senior_promax" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel className="text-foreground/70 dark:text-foreground/80">
                      Parol
                    </FormLabel>
                    <NavLink
                      to="/forgot-password"
                      className="ml-auto text-muted-foreground text-sm underline-offset-2 hover:underline hover:text-foreground"
                    >
                      Forgot your password?
                    </NavLink>
                  </div>
                  <FormControl>
                    <PasswordInput inputSize="xl" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              rightIcon={<ChevronRightIcon />}
              loading={isPending}
              type="submit"
              variant="primary"
              size="xl"
              className="w-full"
            >
              Login
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
