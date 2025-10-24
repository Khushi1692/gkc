import CheckoutModal from '@/components/CheckoutModal';
import PaymentSuccessModal from '@/components/PaymentSuccessModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCart, removeCartItem, updateCartItemQuantity } from '@/store/slices/cartSlice';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart } = useAppSelector((s) => s.cart);
  const dispatch = useAppDispatch();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState<string | null>(null);

  const handleClearCart = () => dispatch(clearCart());
  const handleRemoveItem = (id: string) => dispatch(removeCartItem(id));
  return (
    <>
      {!cart?.items || cart.items.length === 0 ? (
        <div className="bg-background min-h-[calc(100vh-270px)] px-4 py-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-40">
          <div className="mx-auto mt-10 w-full max-w-6xl rounded-xl text-center">
            <ShoppingBag className="text-muted-foreground mx-auto mb-6 h-24 w-24" />
            <h1 className="mb-4 text-3xl font-bold">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Add some delicious items to get started!</p>
            <Button asChild size="lg">
              <Link to="/menu">Browse Menu</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-background min-h-[calc(100vh-270px)] px-4 py-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-40">
          <div className="mx-auto flex h-full w-full max-w-6xl flex-col gap-8 lg:flex-row">
            {/* LEFT — CART ITEMS */}
            <div className="flex-1 space-y-4">
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-3xl font-bold md:text-4xl">Your Cart</h1>
                <Button variant="outline" className="translate-y-1" onClick={handleClearCart}>
                  Clear Cart
                </Button>
              </div>

              {cart.items.map((item) => (
                <Card key={item._id} className="p-0">
                  <CardContent className="p-4">
                    {/* Top row: Image + Info + Price */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                      <div className="flex flex-1 gap-4">
                        {/* Product Image */}
                        <div className="flex flex-shrink-0 justify-center sm:block">
                          <img
                            src={item.productId.image}
                            alt={item.productId.name}
                            className="h-28 w-28 rounded-lg object-cover sm:h-24 sm:w-24"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-1 flex-col justify-between">
                          <h3 className="text-base font-semibold sm:text-lg">
                            {item.productId.name}
                          </h3>

                          {item.customizations && item.customizations.length > 0 && (
                            <div className="text-muted-foreground mt-1 space-y-0.5 text-sm">
                              {item.customizations.map((group) => (
                                <div key={group._id}>
                                  <span className="text-foreground font-medium">
                                    {group.groupName}:
                                  </span>{' '}
                                  {group.selectedOptions.map((opt, i) => (
                                    <span key={opt._id}>
                                      {opt.name}
                                      {opt.priceModifier > 0 && (
                                        <span className="text-primary ml-1">
                                          (+${opt.priceModifier.toFixed(2)})
                                        </span>
                                      )}
                                      {i < group.selectedOptions.length - 1 && ', '}
                                    </span>
                                  ))}
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="mt-2 flex items-center gap-2">
                            <p className="text-primary text-lg font-bold">
                              ${item.subtotal.toFixed(2)}
                            </p>
                            <p className="text-foreground text-sm">
                              ${item.price.toFixed(2)} x {item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Product Actions */}
                      <div className="flex w-full items-center justify-center gap-2 sm:mt-0 sm:w-auto sm:justify-end">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 sm:h-9 sm:w-9"
                          onClick={() => {
                            if (item.quantity === 1) {
                              dispatch(removeCartItem(item._id));
                            } else {
                              dispatch(
                                updateCartItemQuantity({
                                  itemId: item._id,
                                  quantity: item.quantity - 1,
                                })
                              );
                            }
                          }}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 sm:h-9 sm:w-9"
                          onClick={() => {
                            dispatch(
                              updateCartItemQuantity({
                                itemId: item._id,
                                quantity: item.quantity + 1,
                              })
                            );
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive h-8 w-8 sm:h-9 sm:w-9"
                          onClick={() => handleRemoveItem(item._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* RIGHT — STICKY ORDER SUMMARY */}
            <div className="w-full self-start lg:sticky lg:top-24 lg:w-[350px]">
              <Card>
                <CardContent className="space-y-4 p-6">
                  <h2 className="text-2xl font-bold">Order Summary</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">${cart.totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span className="font-medium">$2.99</span>
                    </div>
                    <div className="mt-2 border-t pt-2">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>${(cart.totalAmount + 2.99).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full" size="lg" onClick={() => setIsCheckoutOpen(true)}>
                    Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      <CheckoutModal
        isOpen={isCheckoutOpen && !successOrderId}
        onClose={() => setIsCheckoutOpen(false)}
        setSuccessOrderId={setSuccessOrderId}
      />
      {successOrderId && (
        <PaymentSuccessModal
          isOpen={!!successOrderId}
          onClose={() => setSuccessOrderId(null)}
          orderId={successOrderId}
        />
      )}
    </>
  );
};

export default Cart;
