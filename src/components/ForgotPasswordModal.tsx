import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { forgotPassword } from '@/store/slices/authSlice';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form';
import { useNavigate } from 'react-router-dom';

interface ForgotPasswordProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ForgotPasswordModal({ open, onOpenChange }: ForgotPasswordProps) {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((s) => s.auth);
    const navigate = useNavigate();

    const form = useForm<{ email: string }>();

    function onSubmit(values: { email: string }) {
        dispatch(forgotPassword(values))
            .unwrap()
            .then((message) => {
                toast.success(message);
                form.reset();
                onOpenChange(false);
            })
            .catch((err) => {
                toast.error(err);
            });
    }

    const handleClose = () => {
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.has('forgot')) {
            searchParams.delete('forgot');
            navigate(
                { pathname: location.pathname, search: searchParams.toString() },
                { replace: true }
            );
        }
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="bg-card">
                <DialogHeader className="mb-4 text-center">
                    <DialogTitle className="font-bungee text-3xl uppercase tracking-wide">
                        Forgot Password
                    </DialogTitle>
                    <p className="text-muted-foreground font-medium">
                        Enter your email to receive reset instructions
                    </p>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold uppercase text-xs tracking-wider">
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter your email"
                                            className="font-mono font-bold h-11 border-2"
                                        />
                                    </FormControl>
                                    <FormMessage className="font-bold text-destructive" />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            disabled={loading.forgotPassword}
                            className="h-12 w-full mt-2 text-lg font-black uppercase shadow-[4px_4px_0px_0px_var(--border)]"
                        >
                            {loading.forgotPassword ? 'Sending...' : 'Send Reset Link'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}