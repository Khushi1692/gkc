import OrderDetailsModal from '@/components/OrderDetailsModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchMyOrders, type Order } from '@/store/slices/orderSlice';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

const MyOrders = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useAppSelector((state) => state.orders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  if (loading) return <p className="p-6 text-center">Loading your orders...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;
  if (!orders || orders.length === 0)
    return (
      <div className="p-6 text-center">
        <h2 className="mb-2 text-2xl font-bold">No orders found</h2>
        <p className="text-muted-foreground">Place an order to see it here!</p>
      </div>
    );

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getPrintBadgeVariant = (status?: string) => {
    switch (status) {
      case 'printed':
        return 'success';
      case 'failed':
        return 'destructive';
      case 'pending':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="px-4 py-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-40">
      <h1 className="mb-6 text-3xl font-bold">My Orders</h1>
      <Card>
        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Print</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id} className="hover:bg-muted">
                  <TableCell className="font-medium">{order.orderId}</TableCell>
                  <TableCell>{format(new Date(order.createdAt), 'PPP, p')}</TableCell>
                  <TableCell className="font-semibold">${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(order.paymentStatus)}>
                      {order.paymentStatus.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPrintBadgeVariant(order.printStatus)}>
                      {(order.printStatus ?? 'N/A').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      className="px-0"
                      variant={'link'}
                      onClick={() => setSelectedOrder(order)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </div>
  );
};

export default MyOrders;
