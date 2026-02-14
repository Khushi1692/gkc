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
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has('login')) {
      searchParams.delete('login');
      navigate({ pathname: location.pathname, search: searchParams.toString() }, { replace: true });
    }
    onOpenChange(false);
  };

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

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-card">

        <DialogHeader className="mb-4 text-center">
          <DialogTitle className="text-foreground font-bungee text-3xl uppercase tracking-wide">
            Welcome Back!
          </DialogTitle>
          <p className="text-muted-foreground font-medium">Log in to your account</p>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold uppercase text-xs tracking-wider text-foreground">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className="border-border focus-visible:ring-primary h-11 border-2 bg-input font-medium text-foreground placeholder:text-muted-foreground/50"
                    />
                  </FormControl>
                  <FormMessage className="font-bold text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold uppercase text-xs tracking-wider text-foreground">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                      className="border-border focus-visible:ring-primary h-11 border-2 bg-input font-medium text-foreground placeholder:text-muted-foreground/50"
                    />
                  </FormControl>
                  <FormMessage className="font-bold text-destructive" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="h-12 w-full mt-2 text-lg font-black uppercase shadow-[4px_4px_0px_0px_var(--border)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--border)] transition-all"
              disabled={loading.login || form.formState.isSubmitting}
            >
              {loading.login ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm font-medium text-muted-foreground">
          New here?{' '}
          <button
            onClick={() => {
              handleClose();
              navigate('?register=true');
            }}
            className="text-primary font-bold hover:underline decoration-2 underline-offset-2"
          >
            Create an account
          </button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t-2 border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 font-bold text-muted-foreground">Or continue with</span>
          </div>
        </div>

        {open && (
          <div className="flex justify-center">
            <GoogleLogin
              key="login-google"
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error('Google login failed')}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}