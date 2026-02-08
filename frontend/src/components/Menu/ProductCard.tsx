import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Product } from '@/types/menu';

interface MenuCardProps {
  item: Product;
  onAddToCart: React.Dispatch<React.SetStateAction<Product | null>>;
}

export const ProductCard = ({ item, onAddToCart }: MenuCardProps) => {
  return (
    <Card className="h-full overflow-hidden p-0">
      <CardContent className="h-full p-0">
        <div className="grid h-full grid-cols-1 md:grid-cols-3">
          {/* Left: Product details */}
          {item.image && (
            <div className="bg-background relative col-span-1 h-full min-h-[250px]">
              <img
                src={item.image}
                alt={item.name}
                className="border-background absolute inset-0 h-full w-full rounded-2xl border-8 object-cover"
              />
            </div>
          )}
          <div className="bg-background col-span-2 flex flex-col justify-center p-6 md:p-8">
            <h3 className="mb-3 text-2xl font-bold">{item.name}</h3>

            {item.description && (
              <p className="text-muted-foreground mb-6 line-clamp-2">{item.description}</p>
            )}

            <div className="mb-4 font-semibold">
              {item.discountPercentage > 0 ? (
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground line-through">
                    ${item.price.toFixed(2)}
                  </span>
                  <span className="font-bold text-red-600">${item.discountedPrice.toFixed(2)}</span>
                  <span className="rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-800">
                    -{item.discountPercentage}%
                  </span>
                </div>
              ) : (
                <span>${item.price.toFixed(2)}</span>
              )}
            </div>

            <Button className="w-full md:w-fit" onClick={() => onAddToCart(item)}>
              Add to Cart
            </Button>
          </div>

          {/* Right: Image */}
        </div>
      </CardContent>
    </Card>
  );
};
