import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { Product } from '@/types/menu';
import logoImg from '@/assets/logo.png';
import { Plus, Sparkles } from 'lucide-react';

const placeholder = logoImg;

interface MenuCardProps {
  item: Product;
  onAddToCart: React.Dispatch<React.SetStateAction<Product | null>>;
}

const BACKEND_URL = (import.meta.env.VITE_API_BASE_URL as string || 'http://localhost:3000/api').replace('/api', '');

export const ProductCard = ({ item, onAddToCart }: MenuCardProps) => {
  const [imageError, setImageError] = useState(false);

  const isDefaultBurger = item.image?.includes('photo-1594212699903-ec8a3eca50f5');
  const resolvedImage = item.image?.startsWith('/') 
    ? `${BACKEND_URL}${item.image}` 
    : (isDefaultBurger ? '' : item.image);
  const displayImage = !resolvedImage || imageError ? placeholder : resolvedImage;

  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-border/40 bg-card shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 p-0 gap-0 relative">
      
      {/* Premium Badge for Discounts */}
      {item.discountPercentage > 0 && (
        <div className="absolute left-6 top-6 z-20">
          <div className="flex items-center gap-1.5 bg-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary-foreground shadow-xl animate-pulse">
            <Sparkles className="h-3 w-3" />
            Save {item.discountPercentage}%
          </div>
        </div>
      )}

      {/* Image Section with Overlay */}
      <CardHeader className="p-0 relative overflow-hidden">
        <div className={`relative aspect-[16/11] w-full bg-black overflow-hidden flex items-center justify-center`}>
          <img
            src={displayImage}
            alt={item.name}
            className={cn(
              "transition-transform duration-1000 group-hover:scale-110",
              (!resolvedImage || imageError) 
                ? "max-h-[70%] max-w-[70%] object-contain p-4" 
                : "absolute inset-0 h-full w-full object-cover"
            )}
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </CardHeader>

      {/* Content Section */}
      <CardContent className="flex flex-1 flex-col p-8 lg:p-10 pb-2 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-bold text-2xl leading-[1.2] text-foreground tracking-tight group-hover:text-primary transition-colors">
            {item.name}
          </h3>
        </div>

        <p className="text-muted-foreground text-sm font-medium italic opacity-70">
          {item.description || "Perfectly balanced authentic flavors prepared with traditional techniques."}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-60 mb-0.5">Price</span>
            <div className="flex items-baseline gap-2">
              {item.discountPercentage > 0 ? (
                <>
                  <span className="text-3xl font-black text-foreground tracking-tighter">
                    ${item.discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-sm font-bold text-muted-foreground line-through decoration-primary/30">
                    ${item.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-black text-foreground tracking-tighter">
                  ${item.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>

      {/* Footer / Action */}
      <CardFooter className="p-8 lg:p-10 pt-4">
        <Button
          className="w-full h-14 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all group/btn bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
          onClick={() => onAddToCart(item)}
        >
          <Plus className="mr-2 h-4 w-4 transition-transform group-hover/btn:rotate-90" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};