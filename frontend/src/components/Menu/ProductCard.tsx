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
            <div className="relative col-span-1 h-full min-h-[250px]">
              <img
                src={item.image}
                alt={item.name}
                className="border-background absolute inset-0 h-full w-full rounded-2xl border-8 object-fill"
              />
            </div>
          )}
          <div className="bg-background col-span-2 flex flex-col justify-center p-6 md:p-8">
            <h3 className="mb-3 text-2xl font-bold">{item.name}</h3>

            {item.description && (
              <p className="text-muted-foreground mb-6 line-clamp-2">{item.description}</p>
            )}

            <p className="mb-4 font-semibold">Price: ${item.basePrice.toFixed(2)}</p>

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
