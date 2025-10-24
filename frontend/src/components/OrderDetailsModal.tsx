import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { type Order } from '@/store/slices/orderSlice';

interface OrderDetailsModalProps {
  order: Order | null;
  onClose: () => void;
}

const OrderDetailsModal = ({ order, onClose }: OrderDetailsModalProps) => {
  if (!order) return null;

  return (
    <Dialog open={!!order} onOpenChange={onClose}>
      <DialogContent className="order-modal-scroll max-h-[90vh] max-w-lg overflow-auto">
        <DialogHeader>
          <DialogTitle>Order Details - {order.orderId}</DialogTitle>
          <DialogClose />
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {order.items.map((item, idx) => (
            <Card key={idx} className="rounded-md border py-0">
              <CardContent className="flex flex-col gap-4 p-2 sm:flex-row">
                <img
                  src={item.productId.image}
                  alt={item.productId.name}
                  className="h-24 w-24 rounded-lg object-cover"
                />
                <div className="flex flex-1 flex-col justify-between">
                  <h3 className="text-base font-medium">{item.productId.name}</h3>

                  {item.customizations && item.customizations.length > 0 && (
                    <div className="text-muted-foreground mt-1 text-sm">
                      {item.customizations.map((group) => (
                        <div key={group.groupName}>
                          <span className="font-medium">{group.groupName}:</span>{' '}
                          {group.selectedOptions.map((opt, i) => (
                            <span key={opt.name}>
                              {opt.name}
                              {opt.priceModifier > 0 && ` (+$${opt.priceModifier.toFixed(2)})`}
                              {i < group.selectedOptions.length - 1 && ', '}
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-foreground mt-1 text-sm font-medium">
                    ${item.subtotal.toFixed(2)} ({item.quantity}x ${item.price.toFixed(2)})
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}

          {order.specialInstructions && (
            <p className="text-muted-foreground italic">
              Instructions: {order.specialInstructions}
            </p>
          )}

          <p className="text-lg font-bold">Total: ${order.totalAmount.toFixed(2)}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;
