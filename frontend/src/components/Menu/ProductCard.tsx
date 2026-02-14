import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { Product } from '@/types/menu';
import placeholder from '@/assets/logo.jpeg';

interface MenuCardProps {
  item: Product;
  onAddToCart: React.Dispatch<React.SetStateAction<Product | null>>;
}

export const ProductCard = ({ item, onAddToCart }: MenuCardProps) => {
  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-xl border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-0">

      {/* Image Section */}
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full border-b-2 border-black bg-gray-100">
          <img
            src={item.image || placeholder}
            alt={item.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Discount Badge */}
          {item.discountPercentage > 0 && (
            <div className="absolute right-4 top-4 rotate-3 rounded-md border-2 border-black bg-red-500 px-3 py-1 font-black text-white shadow-[3px_3px_0px_0px_#000]">
              -{item.discountPercentage}%
            </div>
          )}
        </div>
      </CardHeader>

      {/* Content Section */}
      <CardContent className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="font-bungee text-xl leading-tight text-black">{item.name}</h3>
        </div>

        <p className="text-muted-foreground line-clamp-2 text-sm font-medium">
          {item.description || "No description available."}
        </p>

        <div className="mt-auto pt-4">
          {/* Price Display */}
          <div className="flex items-baseline gap-2">
            {item.discountPercentage > 0 ? (
              <>
                <span className="text-2xl font-black text-black">
                  ${item.discountedPrice.toFixed(2)}
                </span>
                <span className="text-sm font-bold text-gray-400 line-through decoration-2">
                  ${item.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-2xl font-black text-black">
                ${item.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </CardContent>

      {/* Footer / Action */}
      <CardFooter className="p-5 pt-0">
        <Button
          className="w-full font-bold uppercase"
          size="lg"
          onClick={() => onAddToCart(item)}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};