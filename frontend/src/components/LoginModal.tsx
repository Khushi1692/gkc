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
import { loginSchema, type LoginFormData } from '@/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { googleAuthUser, loginUser } from '@/store/slices/authSlice';
import { toast } from 'sonner';
import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleLogin } from './GoogleLogin';

interface LoginProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginProps) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((s) => s.auth);
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleGoogleSuccess = async (credential: string) => {
    dispatch(googleAuthUser({ credential }))
      .unwrap()
      .then((res) => {
        if (res.status === 'success') {
          toast.success(res.message);
          form.reset();
          handleClose();
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const navigate = useNavigate();
  const location = useLocation();

  function onSubmit(values: LoginFormData) {
    dispatch(loginUser(values))
      .unwrap()
      .then((res) => {
        if ((res.status = 'success')) {
          toast.success(res.message);
          form.reset();
          handleClose();
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  }

  const handleClose = () => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has('login')) {
      searchParams.delete('login');
      navigate({ pathname: location.pathname, search: searchParams.toString() }, { replace: true });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login to Pop101</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <Button variant="outline" type="button" className="flex-1" disabled={loading.login}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="flex-1"
                disabled={loading.login || form.formState.isSubmitting}
              >
                {loading.login ? 'Logging in...' : 'Login'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
        <div className="text-center text-sm text-gray-600">
          New to <span className="text-primary font-semibold">Pop101</span>?{' '}
          <button
            onClick={() => {
              handleClose();
              navigate('?register=true');
            }}
            className="text-primary font-medium hover:underline"
          >
            Register
          </button>
        </div>
        <div className="flex items-center gap-2">
          <hr className="flex-1 border-t border-gray-300" />
          <span className="text-sm text-gray-500">or</span>
          <hr className="flex-1 border-t border-gray-300" />
        </div>

        {open && (
          <GoogleLogin
            key="login-google"
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error('Google login failed')}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
