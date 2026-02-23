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
      targetCategoryId = categoryMap.get(categoryFromURL.toLowerCase()) ?? categories[0]._id;
    } else {
      targetCategoryId = categories[0]._id;
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

  // Cleanup
  useEffect(() => {
    return () => {
      dispatch(clearProducts());
    };
  }, [dispatch]);

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

  const handleCloseModal = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const isLoading = loading.categories || loading.products;

  return (
    <>
      {isLoading && <Loader loading message="Loading menu..." />}

      <div className="bg-background min-h-screen px-4 py-8 sm:px-8 md:px-12 lg:px-20 xl:px-32">
        {/* Hero Section */}
        {/* Hero Section - Split Layout */}
        <section className="mx-auto mb-12 w-full overflow-hidden rounded-3xl border-4 border-black bg-white shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Text Content */}


            <div className="flex flex-col justify-center px-6 py-12 md:px-12 lg:px-16 min-h-[500px]">
              <div className="mb-4 inline-block self-start rounded-full border-2 border-black bg-[#FBCD06] px-4 py-1 text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_#000]">
                Skip the Line!
              </div>
              <h1 className="font-bungee mb-6 text-5xl uppercase leading-none text-black sm:text-6xl lg:text-7xl">
                CLICK & <span className="text-[#FBCD06] drop-shadow-[2px_2px_0px_#000] text-shadow-black" style={{ textShadow: '3px 3px 0 #000' }}>COLLECT</span>
              </h1>
              <p className="text-lg font-bold leading-relaxed text-black/80 md:text-xl">
                Pre-order your favorites and grab them hot & ready. No waiting, just eating!
              </p>
            </div>



            <div className="relative min-h-[300px] border-t-4 border-black bg-black md:border-l-4 md:border-t-0 md:min-h-full">
              <img
                src={`https://pop101.crestedith.com/uploads/menu-hero.webp`}
                alt="Delicious food"
                className="absolute inset-0 h-full w-full object-cover opacity-90"
              />
              {/* Pattern Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_2px,transparent_2px)] bg-[length:20px_20px] opacity-20"></div>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section className="mx-auto w-full">
          {categories.length === 0 ? (
            <div className="py-12 text-center font-bold text-xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000]">
              No categories available.
            </div>
          ) : (
            <Tabs
              value={selectedCategoryId ?? ''}
              onValueChange={handleTabChange}
              className="w-full"
            >
              {/* Categories Scrollable List */}
              <div className="mb-8 w-full overflow-x-auto pb-4">
                <TabsList className="bg-transparent h-auto w-max min-w-full justify-start gap-4 p-0">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category._id}
                      value={category._id}
                      className="data-[state=active]:bg-primary data-[state=active]:text-foreground border-2 border-black bg-white px-6 py-3 font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] data-[state=active]:translate-y-0 text-foreground text-lg"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value={selectedCategoryId ?? ''} className="mt-4">
                {products.length === 0 ? (
                  <div className="py-12 text-center font-bold text-xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000]">
                    No items available in this category.
                  </div>
                ) : (
                  // THE GRID LAYOUT
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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