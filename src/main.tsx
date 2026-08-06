import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import App from './App.tsx';
import './index.css';
import { StripeProvider } from './providers/StripeProvider.tsx';
import { store } from './store/store.ts';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StripeProvider>
      <Toaster position="top-center" richColors />
      <App />
    </StripeProvider>
  </Provider>
);
