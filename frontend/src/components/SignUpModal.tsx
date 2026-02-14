import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
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
import { useLocation, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const location = useLocation();

  function onSubmit(values: SignupFormData) {
    dispatch(signupUser(values))
      .unwrap()
      .then((res) => {
        if (res.status === 'success') {
          toast.success(res.message);
          handleClose();
          form.reset();
        }
        if (res.status === 'warning') {
          toast.warning(res.message);
          handleClose();
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
          handleClose();
          form.reset();
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleClose = () => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has('register')) {
      searchParams.delete('register');
      navigate({ pathname: location.pathname, search: searchParams.toString() }, { replace: true });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-card">

        <DialogHeader className="mb-4 text-center">
          <DialogTitle className="text-foreground font-bungee text-3xl uppercase tracking-wide">
            Get Started
          </DialogTitle>
          <p className="text-muted-foreground font-medium">Create your account</p>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold uppercase text-xs tracking-wider text-foreground">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
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
              className="h-12 w-full mt-2 text-lg font-black uppercase shadow-[4px_4px_0px_0px_var(--border)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--border)] transition-all bg-primary text-foreground hover:bg-primary/90"
              disabled={loading.signup || form.formState.isSubmitting}
            >
              {loading.signup ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm font-medium text-muted-foreground">
          Already have an account?{' '}
          <button
            onClick={() => {
              handleClose();
              navigate('?login=true');
            }}
            className="text-primary font-bold hover:underline decoration-2 underline-offset-2"
          >
            Login
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
              key="signup-google"
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error('Google login failed')}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}