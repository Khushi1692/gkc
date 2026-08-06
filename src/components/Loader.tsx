import { Loader2 } from 'lucide-react';

interface LoaderProps {
  loading: boolean;
  message?: string;
}

export const Loader = ({ loading, message }: LoaderProps) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center rounded-lg">
        <Loader2 className="text-primary animate-spin" size={48} />
        {message && <p className="mt-4 text-white">{message}</p>}
      </div>
    </div>
  );
};
