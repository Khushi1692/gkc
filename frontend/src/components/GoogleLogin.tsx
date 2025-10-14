// src/components/GoogleLogin.tsx
import { useEffect } from 'react';

declare global {
  interface Window {
    google?: any;
  }
}

interface GoogleLoginProps {
  onSuccess: (credential: string) => void;
  onError?: () => void;
}

export const GoogleLogin = ({ onSuccess, onError }: GoogleLoginProps) => {
  useEffect(() => {
    // Initialize Google Sign-In
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInButton')!,
        {
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
          width: 280,
        }
      );
    }
  }, []);

  const handleCredentialResponse = (response: any) => {
    if (response.credential) {
      onSuccess(response.credential);
    } else {
      onError?.();
    }
  };

  return <div id="googleSignInButton"></div>;
};