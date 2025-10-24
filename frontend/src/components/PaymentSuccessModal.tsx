import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CheckCircle2 } from 'lucide-react';

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

const PaymentSuccessModal = ({ isOpen, onClose, orderId }: PaymentSuccessModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-xl p-6 shadow-xl sm:max-w-md">
        <DialogHeader className="flex flex-col items-center space-y-2">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <DialogTitle className="text-center text-xl font-bold">Payment Successful!</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-6 text-center">
          <p className="text-muted-foreground text-sm">Thank you for your order.</p>
          <p className="text-foreground text-base">
            <span className="font-medium">Order ID:</span> {orderId}
          </p>
        </div>

        <DialogFooter className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={onClose} className="w-full sm:w-auto">
            Back to Menu
          </Button>
          {/* Optional secondary button */}
          {/* <Button variant="outline" className="w-full sm:w-auto">
            View Orders
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentSuccessModal;
