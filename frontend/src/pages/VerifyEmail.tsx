import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { verifyEmail } from '@/store/slices/authSlice';
import { CheckCircle, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const VerifyEmail = () => {
  const { token } = useParams<{ token: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useAppSelector((s) => s.auth);

  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (token) {
      dispatch(verifyEmail(token))
        .unwrap()
        .then((res) => {
          if (res.status === 'success') {
            setMessage(res.message);
            toast.success(res.message);
          }
        })
        .catch((err) => {
          setMessage(err);
          toast.error(err);
        });
    }
  }, [dispatch, token]);

  const handleGoToLogin = () => {
    navigate('/?login=true');
  };

  return (
    <div className="bg-muted flex min-h-[calc(100vh-270px)] items-center justify-center px-4">
      {loading.verifyEmail && (
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
          <p className="text-lg font-medium text-gray-600">Verifying your email...</p>
        </div>
      )}

      {!loading.verifyEmail && !error.verifyEmail && (
        <div className="flex flex-col items-center gap-4">
          <CheckCircle className="h-12 w-12 text-green-600" />
          <p className="mb-4 font-semibold text-green-600">{message}</p>
          <button
            onClick={handleGoToLogin}
            className="rounded bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
          >
            Go to Login
          </button>
        </div>
      )}

      {!loading.verifyEmail && error.verifyEmail && (
        <div className="flex flex-col items-center gap-4">
          <XCircle className="h-12 w-12 text-red-600" />
          <p className="mb-4 font-semibold text-red-600">{message}</p>
          <button
            onClick={handleGoToLogin}
            className="rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
