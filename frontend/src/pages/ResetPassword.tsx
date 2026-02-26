import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { resetPassword } from '@/store/slices/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

export function ResetPasswordPage() {
    const { token } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading } = useAppSelector((s) => s.auth);

    const form = useForm<{ password: string }>();

    function onSubmit(values: { password: string }) {
        if (!token) return;

        dispatch(resetPassword({ token, password: values.password }))
            .unwrap()
            .then((message) => {
                toast.success(message);
                navigate('/?login=true');
            })
            .catch((err) => {
                toast.error(err);
            });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="bg-card p-8 border-2 border-border shadow-lg w-full max-w-md">

                <h1 className="font-bungee text-3xl uppercase text-center mb-6">
                    Reset Password
                </h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold uppercase text-xs tracking-wider">
                                        New Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            {...field}
                                            className="font-mono font-bold h-11 border-2"
                                        />
                                    </FormControl>
                                    <FormMessage className="font-bold text-destructive" />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            disabled={loading.resetPassword}
                            className="h-12 w-full text-lg font-black uppercase shadow-[4px_4px_0px_0px_var(--border)]"
                        >
                            {loading.resetPassword ? 'Resetting...' : 'Reset Password'}
                        </Button>

                    </form>
                </Form>
            </div>
        </div>
    );
}