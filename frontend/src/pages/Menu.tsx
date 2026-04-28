import { Loader } from '@/components/Loader';
import { ProductCard } from '@/components/Menu/ProductCard';
import { ProductDetailsModal } from '@/components/Menu/ProductDetailsModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearProducts, fetchCategories, fetchProductsByCategory } from '@/store/slices/menuSlice';
import type { Product } from '@/types/menu';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import specialsHeroImg from '@/assets/gkc_actual_food_truck.png';


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

      <div className="bg-background min-h-screen px-4 py-12 sm:px-8 md:px-12 lg:px-20 xl:px-32">
        {/* Premium Hero Section */}
        <section className="mx-auto mb-20 w-full overflow-hidden rounded-[4rem] bg-card/40 backdrop-blur-xl border border-border/40 relative shadow-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 -z-10" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            {/* Left: Text Content */}
            <div className="flex flex-col justify-center px-10 py-16 md:px-16 lg:px-24 relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 self-start rounded-full bg-primary/10 px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.3em] text-primary border border-primary/20 backdrop-blur-sm animate-[fade-in_0.8s_ease-out]">
                <Sparkles className="h-3 w-3" />
                Skip the Line!
              </div>
              <h1 className="font-black mb-6 text-6xl uppercase leading-[0.95] text-foreground sm:text-7xl lg:text-8xl tracking-tight animate-[slide-up_1s_ease-out]">
                GKC <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/60 italic drop-shadow-sm font-black pr-4">SPECIALS</span>
              </h1>
              <p className="text-lg font-medium leading-relaxed text-muted-foreground md:text-xl max-w-lg mb-10 italic opacity-80 animate-[slide-up_1.2s_ease-out]">
                "Pre-order your favorites and grab them hot & ready. Authentic Kathiyawadi goodness, without the wait."
              </p>
              
              <div className="flex items-center gap-8 animate-[slide-up_1.4s_ease-out]">
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-foreground mb-1">100%</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Vegetarian</span>
                </div>
                <div className="h-12 w-px bg-border/60" />
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-foreground mb-1">Fresh</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Every Day</span>
                </div>
              </div>
            </div>

            {/* Right: Featured Image */}
            <div className="relative min-h-[450px] md:min-h-[650px] overflow-hidden group">
              <img
                src={specialsHeroImg}
                alt="Signature Dishes"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              {/* Complex Overlay Gradients for Depth */}
              <div className="absolute inset-0 bg-gradient-to-r from-card/90 via-card/20 to-transparent md:from-card md:to-transparent opacity-95"></div>
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-card to-transparent"></div>
              
              {/* Floating Accent */}
              <div className="absolute top-1/2 -left-12 -translate-y-1/2 hidden lg:flex h-24 w-24 glass rounded-3xl items-center justify-center animate-float shadow-2xl border-white/20 z-20">
                <Sparkles className="h-10 w-10 text-primary" />
              </div>
            </div>
          </div>
          
          {/* Subtle Ambient Background */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10" />
        </section>

        {/* Menu Section */}
        <section className="mx-auto w-full">
          {categories.length === 0 ? (
            <div className="py-24 text-center rounded-[3rem] border border-border/40 bg-card/50 backdrop-blur-sm shadow-xl">
              <p className="text-xl font-bold text-muted-foreground uppercase tracking-widest animate-pulse">Preparing our menu... Please check back in a moment.</p>
            </div>
          ) : (
            <Tabs
              value={selectedCategoryId ?? ''}
              onValueChange={handleTabChange}
              className="w-full"
            >
              {/* Categories Scrollable List */}
              <div className="mb-16 w-full overflow-x-auto pb-6 scrollbar-hide">
                <TabsList className="bg-transparent h-auto w-max min-w-full justify-center gap-4 p-0">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category._id}
                      value={category._id}
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-[1.5rem] border border-border/40 bg-card px-10 py-5 font-black uppercase tracking-[0.15em] shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 data-[state=active]:shadow-primary/25 data-[state=active]:scale-105 text-foreground text-[10px] md:text-xs"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value={selectedCategoryId ?? ''} className="mt-8 outline-none reveal-on-scroll visible">
                {products.length === 0 ? (
                  <div className="py-24 text-center rounded-[3rem] border border-border/40 bg-card/50 backdrop-blur-sm shadow-xl">
                    <p className="text-xl font-bold text-muted-foreground uppercase tracking-widest">No items currently available in this category.</p>
                  </div>
                ) : (
                  // THE GRID LAYOUT
                  <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((item, idx) => (
                      <div key={item._id} className={`animate-[slide-up_0.5s_ease-out_forwards]`} style={{ animationDelay: `${idx * 0.1}s` }}>
                        <ProductCard item={item} onAddToCart={setSelectedItem} />
                      </div>
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