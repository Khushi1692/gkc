import { Loader } from '@/components/Loader';
import { ProductCard } from '@/components/Menu/ProductCard';
import { ProductDetailsModal } from '@/components/Menu/ProductDetailsModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearProducts, fetchCategories, fetchProductsByCategory } from '@/store/slices/menuSlice';
import type { Product } from '@/types/menu';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Menu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { categories, products, loading } = useAppSelector((state) => state.menu);
  const { selectedBranch } = useAppSelector((s) => s.branch);

  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Memoize query params parsing
  const categoryFromURL = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('category');
  }, [location.search]);

  // Memoize category lookup
  const categoryMap = useMemo(() => {
    return new Map(categories.map((cat) => [cat.name.toLowerCase(), cat._id]));
  }, [categories]);

  // Load categories once
  useEffect(() => {
    if (selectedBranch) {
      dispatch(fetchCategories({ branchId: selectedBranch._id }));
    }
  }, [dispatch, selectedBranch]);

  // Consolidated category selection logic
  useEffect(() => {
    if (categories.length === 0) return;

    let targetCategoryId: string | null = null;

    if (categoryFromURL) {
      // Try to match URL category
      targetCategoryId = categoryMap.get(categoryFromURL.toLowerCase()) ?? categories[0]._id;
    } else {
      // Default to first category
      targetCategoryId = categories[0]._id;

      // Update URL with first category
      const params = new URLSearchParams(location.search);
      params.set('category', categories[0].name.toLowerCase());
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }

    setSelectedCategoryId(targetCategoryId);
  }, [categories, categoryFromURL, categoryMap, location.pathname, location.search, navigate]);

  // Fetch products when category changes
  useEffect(() => {
    if (selectedCategoryId && selectedBranch) {
      dispatch(
        fetchProductsByCategory({
          branchId: selectedBranch._id,
          categoryId: selectedCategoryId,
        })
      );
    }
  }, [dispatch, selectedCategoryId, selectedBranch]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      dispatch(clearProducts());
    };
  }, [dispatch]);

  // Memoized tab change handler
  const handleTabChange = useCallback(
    (categoryId: string) => {
      const selectedCat = categories.find((c) => c._id === categoryId);

      if (selectedCat) {
        const params = new URLSearchParams(location.search);
        params.set('category', selectedCat.name.toLowerCase());
        navigate(`${location.pathname}?${params.toString()}`, { replace: true });
      }

      setSelectedCategoryId(categoryId);
    },
    [categories, location.pathname, location.search, navigate]
  );

  // Memoized close handler
  const handleCloseModal = useCallback(() => {
    setSelectedItem(null);
  }, []);

  // Show loader
  const isLoading = loading.categories || loading.products;

  return (
    <>
      {isLoading && <Loader loading message="Loading menu..." />}

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
              onValueChange={handleTabChange}
              className="w-full"
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
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default Menu;
