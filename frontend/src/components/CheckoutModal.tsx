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
import { clearCart, createPaymentIntent, fetchCart } from '@/store/slices/cartSlice';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { toast } from 'sonner';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  setSuccessOrderId: (orderId: string) => void;
}

const CheckoutModal = ({ isOpen, onClose, setSuccessOrderId }: CheckoutModalProps) => {
  const { cart, loading, error } = useAppSelector((s) => s.cart);
  const dispatch = useAppDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const branchId = localStorage.getItem('selectedBranchId') || '';
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  if (!cart || cart.items.length === 0) return null;

  const handlePayment = async () => {
    if (!stripe || !elements) return;
    setIsProcessing(true);
    setPaymentError(null);

    try {
      // 1️⃣ Create PaymentIntent
      const resultAction = await dispatch(
        createPaymentIntent({ branchId, specialInstructions })
      ).unwrap();

      const { clientSecret, orderId } = resultAction;

      // 2️⃣ Confirm Card Payment
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('Card element not found');

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (paymentResult.error) {
        setPaymentError(paymentResult.error.message || 'Payment failed');
        setIsProcessing(false);
        return;
      }

      if (paymentResult.paymentIntent?.status === 'succeeded') {
        dispatch(clearCart())
          .unwrap()
          .then((res) => {
            if (res.status === 'success') {
              dispatch(fetchCart());
            }
          })
          .catch((err) => {
            toast.error(err);
          });
        setSuccessOrderId(orderId);
      }
    } catch (err: any) {
      setPaymentError(err.message || 'Something went wrong');
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogClose />
        </DialogHeader>

        <div className="mt-2 space-y-4">
          <textarea
            placeholder="Special instructions (optional)"
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            rows={3}
            className="w-full rounded-md border p-2"
          />

          <Card className="rounded-md border p-4">
            <CardElement
              options={{
                style: {
                  base: {
                    color: '#32325d',
                    fontSize: '16px',
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    '::placeholder': { color: '#a0aec0' },
                    iconColor: '#635bff',
                  },
                  invalid: { color: '#e53e3e', iconColor: '#e53e3e' },
                  complete: { iconColor: '#48bb78' },
                },
                hidePostalCode: true,
              }}
            />
          </Card>

          {paymentError && <p className="text-red-500">{paymentError}</p>}
          {error.checkout && <p className="text-red-500">{error.checkout}</p>}
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
              : `Pay $${(cart.totalAmount + 2.99).toFixed(2)}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
