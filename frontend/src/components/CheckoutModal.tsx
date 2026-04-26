'use client';

import { apiClient } from '@/api/axiosClient';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  clearCart,
  createPaymentIntent,
  fetchCart,
} from '@/store/slices/cartSlice';
import {
  CardElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import type { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import { useRef, useState } from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  setSuccessOrderId: (orderId: string) => void;
}

const CheckoutModal = ({
  isOpen,
  onClose,
  setSuccessOrderId,
}: CheckoutModalProps) => {
  const { cart, loading } = useAppSelector((s) => s.cart);
  const dispatch = useAppDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const branchId = localStorage.getItem('selectedBranchId') || '';

  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const paymentInFlightRef = useRef(false);

  if (!cart || cart.items.length === 0) return null;

  // 🔥 Map Stripe/Backend errors to user-friendly messages
  const formatErrorMessage = (message?: string) => {
    if (!message) return 'Something went wrong. Please try again.';

    if (message.includes('payment_intent')) {
      return 'Payment session expired. Please try again.';
    }

    if (message.toLowerCase().includes('card_declined')) {
      return 'Your card was declined. Please try another card.';
    }

    if (message.toLowerCase().includes('insufficient')) {
      return 'Insufficient funds. Please check your balance.';
    }

    if (message.toLowerCase().includes('incorrect_cvc')) {
      return 'Incorrect CVC code.';
    }

    return message;
  };

  const handlePayment = async () => {
    if (!stripe || !elements) return;
    // Prevent double-clicks: ref updates synchronously unlike React state
    if (paymentInFlightRef.current) return;
    paymentInFlightRef.current = true;

    setIsProcessing(true);
    setPaymentError(null);

    try {
      // 1️⃣ Create PaymentIntent
      const resultAction = await dispatch(
        createPaymentIntent({ branchId, specialInstructions })
      ).unwrap();

      const { clientSecret, orderId } = resultAction;

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('Card element not found');

      // 2️⃣ Confirm Payment with Stripe
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (paymentResult.error) {
        setPaymentError(formatErrorMessage(paymentResult.error.message));
        setIsProcessing(false);
        paymentInFlightRef.current = false;
        return;
      }

      if (paymentResult.paymentIntent?.status === 'succeeded') {
        // Confirm payment with our backend to update order status to "paid"
        // This ensures the order is marked as paid even if the webhook fails
        try {
          await apiClient.post('/payments/confirm-payment', {
            paymentIntentId: paymentResult.paymentIntent.id,
            orderId,
          });
        } catch (confirmErr) {
          // Non-fatal: the webhook can still handle it as a fallback
          console.warn('Manual payment confirmation failed, webhook will handle it:', confirmErr);
        }

        await dispatch(clearCart()).unwrap();
        await dispatch(fetchCart());

        setSuccessOrderId(orderId);
        setIsProcessing(false);
        paymentInFlightRef.current = false;
      }
    } catch (err: any) {
      setPaymentError(formatErrorMessage(err?.message));
      setIsProcessing(false);
      paymentInFlightRef.current = false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogClose />
        </DialogHeader>

        <div className="mt-2 space-y-4">
          {/* Special Instructions */}
          <textarea
            placeholder="Special instructions (optional)"
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            rows={3}
            className="w-full rounded-md border border-border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {/* Card Input */}
          <Card className="rounded-md border border-border p-4">
            <CardElement
              onChange={(event: StripeCardElementChangeEvent) => {
                if (event.error) {
                  setPaymentError(formatErrorMessage(event.error.message));
                } else {
                  setPaymentError(null);
                }
              }}
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    color: '#111827',
                    fontSize: '16px',
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
                    '::placeholder': {
                      color: '#9ca3af',
                    },
                  },
                  invalid: {
                    color: '#dc2626',
                  },
                },
              }}
            />
          </Card>

          {/* Error Box */}
          {paymentError && (
            <div className="rounded-md border border-red-300 bg-red-50 px-3 py-2">
              <p className="text-sm text-red-700 font-medium">
                {paymentError}
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="mt-4">
          <Button
            className="w-full"
            size="lg"
            onClick={handlePayment}
            disabled={isProcessing || loading.checkout}
          >
            {isProcessing || loading.checkout
              ? 'Processing Payment...'
              : `Pay $${cart.totalAmount.toFixed(2)}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;