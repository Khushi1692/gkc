import { Loader } from '@/components/Loader';
import { ProductCard } from '@/components/Menu/ProductCard';
import { ProductDetailsModal } from '@/components/Menu/ProductDetailsModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchCategories,
  fetchProductsByCategory,
  setSelectedCategory,
} from '@/store/slices/menuSlice';
import type { Product } from '@/types/menu';
import { useEffect, useState } from 'react';

const Menu = () => {
  const dispatch = useAppDispatch();
  const { categories, products, selectedCategoryId, loading } = useAppSelector(
    (state) => state.menu
  );
  const { selectedBranch } = useAppSelector((s) => s.branch);

  const [selectedItem, setSelectedItem] = useState<Product | null>(null);

  useEffect(() => {
    if (selectedBranch) {
      dispatch(fetchCategories({ branchId: selectedBranch?._id }));
    }
  }, [dispatch, selectedBranch]);

  useEffect(() => {
    if (selectedCategoryId && selectedBranch) {
      dispatch(
        fetchProductsByCategory({ branchId: selectedBranch._id, categoryId: selectedCategoryId })
      );
    }
  }, [dispatch, selectedCategoryId, selectedBranch]);
  return (
    <>
      {loading.categories || loading.products ? <Loader loading message="Loading menu..." /> : null}

      <div className="bg-background min-h-screen px-4 py-6 sm:px-8 md:px-12 md:py-10 lg:px-20 xl:px-32 2xl:px-40">
        {/* Hero Section */}
        <section className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-xl">
          <div className="relative aspect-[16/12] w-full sm:aspect-[16/8]">
            <img
              src="/hero-menu.png"
              alt="Delicious food"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 px-4 text-center">
              <div className="flex -translate-y-1 flex-col items-center sm:translate-y-4 md:translate-y-4 lg:translate-y-4 xl:translate-y-10">
                <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl">
                  Your Favorite Food, Delivered Fast
                </h1>
                <p className="mb-6 w-[90%] text-sm text-white sm:mb-8 sm:text-lg">
                  Craving something delicious? Pop 101 brings your favorite meals right to your
                  door. Order now and enjoy a feast without leaving your couch.
                </p>

                {/* <Button className="rounded-md px-6 py-3 font-semibold sm:px-6 sm:py-4 md:px-8 md:py-5 md:text-lg lg:py-6 lg:text-xl">
                  Order Now
                </Button> */}
              </div>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section className="relative mx-auto mt-10 w-full max-w-6xl overflow-hidden rounded-xl">
          {categories.length === 0 ? (
            <div className="text-muted-foreground py-12 text-center">No categories available.</div>
          ) : (
            <Tabs
              value={selectedCategoryId ?? ''}
              className="w-full"
              onValueChange={(val) => dispatch(setSelectedCategory(val))}
            >
              <div className="w-full overflow-x-auto">
                <TabsList className="scrollbar-hide flex h-auto w-full min-w-max flex-nowrap items-center justify-start gap-2 rounded-none border-b bg-transparent px-2">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category._id}
                      value={category._id}
                      className="data-[state=active]:border-primary rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value={selectedCategoryId ?? ''} className="mt-8">
                {products.length === 0 ? (
                  <div className="text-muted-foreground py-12 text-center">
                    No items available in this category.
                  </div>
                ) : (
                  <div className="space-y-6">
                    {products.map((item) => (
                      <ProductCard key={item._id} item={item} onAddToCart={setSelectedItem} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </section>
      </div>

      {selectedItem && (
        <ProductDetailsModal
          open={!!selectedItem}
          product={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
};

export default Menu;
