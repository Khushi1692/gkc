import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { loginSchema, type LoginFormData } from '@/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
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

  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has('login')) {
      searchParams.delete('login');
      navigate(
        { pathname: location.pathname, search: searchParams.toString() },
        { replace: true }
      );
    }
    onOpenChange(false);
  };

  const handleGoogleSuccess = (credential: string) => {
    dispatch(googleAuthUser({ credential }))
      .unwrap()
      .then((res) => {
        if (res.status === 'success') {
          toast.success(res.message);
          form.reset();
          handleClose();
        }
      })
      .catch((err) => toast.error(err));
  };

  const onSubmit = (values: LoginFormData) => {
    dispatch(loginUser(values))
      .unwrap()
      .then((res) => {
        if (res.status === 'success') {
          toast.success(res.message);
          form.reset();
          handleClose();
        }
      })
      .catch((err) => toast.error(err));
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-card sm:max-w-md">

        {/* Header */}
        <DialogHeader className="mb-2 text-center">
          <DialogTitle className="text-2xl font-bold text-foreground">
            Welcome Back
          </DialogTitle>
          <p className="text-muted-foreground text-sm mt-1">
            Sign in to your Gopi ka Chatka account
          </p>
        </DialogHeader>

        {/* Google Login — always shown */}
        <div className="mb-2">
          {open && (
            <GoogleLogin
              key="login-google"
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error('Google login failed')}
            />
          )}
        </div>

        {/* Divider */}
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-card px-3 text-muted-foreground font-medium">
              or sign in with email
            </span>
          </div>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-foreground">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      {...field}
                      className="h-11 rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary"
                    />
                  </FormControl>
                  <FormMessage className="text-destructive text-xs" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between mb-1">
                    <FormLabel className="text-sm font-semibold text-foreground">
                      Password
                    </FormLabel>
                    <button
                      type="button"
                      onClick={() => {
                        handleClose();
                        navigate('?forgot=true');
                      }}
                      className="text-xs text-primary hover:underline font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      className="h-11 rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary"
                    />
                  </FormControl>
                  <FormMessage className="text-destructive text-xs" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading.login || form.formState.isSubmitting}
              className="h-11 w-full rounded-xl font-semibold mt-2"
            >
              {loading.login ? 'Signing in...' : 'Sign In'}
            </Button>

          </form>
        </Form>

        {/* Switch to Register */}
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <button
            onClick={() => {
              handleClose();
              navigate('?register=true');
            }}
            className="text-primary font-semibold hover:underline underline-offset-2"
          >
            Create one
          </button>
        </p>

      </DialogContent>
    </Dialog>
  );
}