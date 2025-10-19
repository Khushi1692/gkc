import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { googleAuthUser, signupUser } from '@/store/slices/authSlice';
import { signupSchema, type SignupFormData } from '@/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { GoogleLogin } from './GoogleLogin';

interface SignUpProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignUpModal({ open, onOpenChange }: SignUpProps) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((s) => s.auth);
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  function onSubmit(values: SignupFormData) {
    dispatch(signupUser(values))
      .unwrap()
      .then((res) => {
        if (res.status === 'success') {
          toast.success(res.message);
          onOpenChange(false);
          form.reset();
        }
        if (res.status === 'warning') {
          toast.warning(res.message);
          onOpenChange(false);
          form.reset();
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  }

  const handleGoogleSuccess = async (credential: string) => {
    dispatch(googleAuthUser({ credential }))
      .unwrap()
      .then((res) => {
        if (res.status === 'success') {
          toast.success(res.message);
          onOpenChange(false);
          form.reset();
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register to Pop101</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="w-full sm:justify-between">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  type="button"
                  className="flex-1"
                  disabled={loading.signup}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="flex-1"
                disabled={loading.signup || form.formState.isSubmitting}
              >
                {loading.signup ? 'Registering...' : 'Register'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
        <div className="flex items-center gap-2">
          <hr className="flex-1 border-t border-gray-300" />
          <span className="text-sm text-gray-500">or</span>
          <hr className="flex-1 border-t border-gray-300" />
        </div>

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => toast.error('Google login failed')}
        />
      </DialogContent>
    </Dialog>
  );
}
