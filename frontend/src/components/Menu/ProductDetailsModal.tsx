'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useAppDispatch } from '@/store/hooks';
import { addItemToCart } from '@/store/slices/cartSlice';
import type { AddItemToCartInput } from '@/types/cart';
import type { Product } from '@/types/menu';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

interface ProductDetailsModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  //   onConfirm: (payload: { productId: string; quantity: number; selectedOptions: string[] }) => void;
}

export const ProductDetailsModal = ({
  open,
  onClose,
  product,
  //   onConfirm,
}: ProductDetailsModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});

  const dispatch = useAppDispatch();

  const handleOptionChange = (
    groupId: string,
    type: 'radio' | 'checkbox',
    optionId: string,
    checked: boolean
  ) => {
    setSelectedOptions((prev) => {
      const group = product.customizations?.find((g) => g._id === groupId);
      if (!group) return prev;

      const current = prev[groupId] || [];

      if (type === 'radio') {
        return { ...prev, [groupId]: [optionId] };
      }

      if (checked) {
        return { ...prev, [groupId]: [...current, optionId] };
      } else {
        return { ...prev, [groupId]: current.filter((id) => id !== optionId) };
      }
    });
  };

  const subtotal = useMemo(() => {
    const base = product.basePrice;
    const addons =
      product.customizations
        ?.flatMap((g) => g.options)
        .filter((opt) => Object.values(selectedOptions).flat().includes(opt._id))
        .reduce((sum, opt) => sum + opt.priceModifier, 0) || 0;
    return (base + addons) * quantity;
  }, [selectedOptions, quantity, product]);

  const handleConfirm = () => {
    const customizationPayload =
      product.customizations
        ?.map((group) => {
          const selectedIds = selectedOptions[group._id] || [];
          const selected = group.options.filter((opt) => selectedIds.includes(opt._id));
          if (selected.length === 0) return null;
          return {
            _id: group._id,
            groupName: group.groupName,
            selectedOptions: selected.map((opt) => ({
              _id: opt._id,
              name: opt.name,
              priceModifier: opt.priceModifier,
            })),
          };
        })
        ?.filter(
          (
            g
          ): g is {
            _id: string;
            groupName: string;
            selectedOptions: { name: string; priceModifier: number; _id: string }[];
          } => g !== null
        ) || [];

    const payload: AddItemToCartInput = {
      productId: product._id,
      quantity,
      price: product.basePrice,
      subtotal,
      customizations: customizationPayload.length ? customizationPayload : undefined,
    };

    dispatch(addItemToCart({ payload }))
      .unwrap()
      .then((res) => {
        if (res.status === 'success') {
          toast.success(res.message);
          onClose();
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-auto">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-4">
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="h-52 w-auto flex-1 rounded-md object-fill"
              />
            )}

            {product.description && (
              <p className="text-muted-foreground flex-1">{product.description}</p>
            )}
          </div>

          <Separator />

          {/* Render all customization groups */}
          {product.customizations?.length ? (
            product.customizations.map((group) => (
              <div key={group._id} className="space-y-2">
                <h4 className="font-semibold">{group.groupName}</h4>

                {group.type === 'radio' ? (
                  <RadioGroup
                    onValueChange={(value) => handleOptionChange(group._id, 'radio', value, true)}
                    value={selectedOptions[group._id]?.[0] || ''}
                    className="flex flex-wrap justify-start gap-6"
                  >
                    {group.options.map((opt) => (
                      <div key={opt._id} className="flex items-center justify-between space-x-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={opt._id}
                            id={opt._id}
                            className="border-primary text-primary border-2"
                          />
                          <label htmlFor={opt._id}>{opt.name}</label>
                        </div>
                        {opt.priceModifier > 0 && (
                          <span className="text-muted-foreground text-sm">
                            +${opt.priceModifier.toFixed(2)}
                          </span>
                        )}
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <div className="flex flex-wrap justify-start gap-6">
                    {group.options.map((opt) => (
                      <div key={opt._id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={selectedOptions[group._id]?.includes(opt._id)}
                            onCheckedChange={(checked) =>
                              handleOptionChange(group._id, 'checkbox', opt._id, Boolean(checked))
                            }
                            id={opt._id}
                            className="border-primary border-2"
                          />
                          <label htmlFor={opt._id}>{opt.name}</label>
                        </div>
                        {opt.priceModifier > 0 && (
                          <span className="text-muted-foreground text-sm">
                            +${opt.priceModifier.toFixed(2)}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">No customizations available.</p>
          )}

          <Separator />

          {/* Quantity selector */}
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Quantity</h4>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </Button>
              <Input
                type="number"
                value={quantity}
                readOnly
                className="w-fit p-0 text-center focus-visible:ring-0"
              />
              <Button size="sm" variant="outline" onClick={() => setQuantity((q) => q + 1)}>
                +
              </Button>
            </div>
          </div>

          {/* Subtotal */}
          <div className="flex flex-col">
            <div className="flex justify-between text-lg font-semibold">
              <span>Price:</span>
              <span>${product.basePrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button className="w-full" onClick={handleConfirm}>
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
