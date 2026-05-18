import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import ProductQuickView from '../components/ProductQuickView';
import PartFinder from '../components/PartFinder';
import { Product } from '../types';
import { SearchX, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Products() {
  const { products, t, selectedVehicle } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  const [search, setSearch] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState('popular');

  const inStockOnly = searchParams.get('stock') === 'true';
  const setInStockOnly = (val: boolean) => {
    const newParams = new URLSearchParams(searchParams);
    if (val) newParams.set('stock', 'true');
    else newParams.delete('stock');
    setSearchParams(newParams);
  };

  const fitmentOnly = searchParams.get('fitment') === 'true';
  const setFitmentOnly = (val: boolean) => {
    const newParams = new URLSearchParams(searchParams);
    if (val) newParams.set('fitment', 'true');
    else newParams.delete('fitment');
    setSearchParams(newParams);
  };

  const selectedCategories = useMemo(() => {
    return searchParams.getAll('category');
  }, [searchParams]);

  const toggleCategory = (cat: string) => {
    const newParams = new URLSearchParams(searchParams);
    const existing = newParams.getAll('category');
    if (existing.includes(cat)) {
      newParams.delete('category');
      existing.filter(c => c !== cat).forEach(c => newParams.append('category', c));
    } else {
      newParams.append('category', cat);
    }
    setSearchParams(newParams);
  };

  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category));
    return Array.from(set).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    let list = products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const matchesPrice = p.price <= maxPrice;
      const matchesStock = !inStockOnly || p.instock;
      const matchesFitment = !fitmentOnly || (selectedVehicle && p.compatibleVehicles?.includes(selectedVehicle.id));
      return matchesSearch && matchesCategory && matchesPrice && matchesStock && matchesFitment;
    });

    if (sort === 'price-asc') list.sort((a,b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a,b) => b.price - a.price);
    else if (sort === 'rating') list.sort((a,b) => b.rating - a.rating);
    else if (sort === 'newest') list.sort((a,b) => b.id - a.id);

    return list;
  }, [products, search, selectedCategories, maxPrice, inStockOnly, sort, selectedVehicle, fitmentOnly]);

  const pageTitle = useMemo(() => {
    if (quickViewProduct) {
      return `${quickViewProduct.name} | Sprinter Plus`;
    }
    if (selectedCategories.length === 1) {
      return `${selectedCategories[0]} | Sprinter Plus`;
    }
    if (selectedCategories.length > 1) {
      return `${selectedCategories.join(', ')} | Sprinter Plus`;
    }
    return `Parts Catalog | Sprinter Plus`;
  }, [quickViewProduct, selectedCategories]);

  const pageDescription = useMemo(() => {
    const vehicleContext = selectedVehicle ? ` for ${selectedVehicle.make} ${selectedVehicle.model}` : "";
    if (quickViewProduct) {
      return `Premium ${quickViewProduct.name}${vehicleContext}. Professional Sprinter components with fast Kosovo delivery and EU special orders.`;
    }
    if (selectedCategories.length === 1) {
      return `Shop the best selection of ${selectedCategories[0]} parts${vehicleContext}. Specialized Sprinter expertise with over 50,000 components in stock.`;
    }
    return `Professional catalog of specialized Sprinter parts${vehicleContext}. Browse engine, brakes, suspension, and more with expert fitment verification.`;
  }, [quickViewProduct, selectedCategories, selectedVehicle]);

  const pageImage = useMemo(() => {
    if (quickViewProduct) return quickViewProduct.image;
    return "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800"; // Fallback landing image
  }, [quickViewProduct]);

  const canonicalUrl = useMemo(() => {
    const baseUrl = "https://sprinterplus.com"; // Using the domain from UI, can be updated later
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    // Only keep category to avoid duplicate content from sorting/price variants
    const categories = params.getAll('category');
    const cleanParams = new URLSearchParams();
    categories.forEach(c => cleanParams.append('category', c));
    const search = cleanParams.toString();
    return `${baseUrl}${path}${search ? '?' + search : ''}`;
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />
      </Helmet>
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900">{t('products')}</h1>
          <p className="text-zinc-500 font-medium mt-2">{t('catalogDesc')}</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-part-finder'))}
            className="h-12 px-6 bg-zinc-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-sky-500 transition-all active:scale-95 flex items-center gap-2"
          >
            {selectedVehicle ? t('updateVehicle') : t('vehicleSelector')}
          </button>
        </div>
      </div>

      <PartFinder />

      <div className="grid lg:grid-cols-[280px_1fr] gap-10 items-start mt-12">
        {/* Sidebar */}
        <aside className="space-y-8 sticky top-28">
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 lg:p-8 space-y-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm tracking-wide text-zinc-900 uppercase">{t('category')}</h3>
                <button 
                  onClick={() => setSearchParams({})}
                  className="text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors"
                >
                  CLEAR
                </button>
              </div>
              <div className="space-y-2">
                {categories.map(cat => (
                  <label key={cat} className="flex items-center justify-between cursor-pointer group py-1">
                    <span className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="w-5 h-5 rounded-lg border-zinc-300 text-sky-500 focus:ring-sky-500 cursor-pointer" 
                      />
                      <span className={cn(
                        "text-[15px] font-medium transition-colors",
                        selectedCategories.includes(cat) ? "text-zinc-900" : "text-zinc-500 group-hover:text-zinc-700"
                      )}>
                        {cat}
                      </span>
                    </span>
                    <span className="text-[11px] font-bold text-zinc-300">
                      {products.filter(p => p.category === cat).length}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-zinc-100 pt-8">
              <h3 className="font-bold text-sm tracking-wide text-zinc-900 uppercase mb-4">{t('priceRange')}</h3>
              <input 
                type="range" 
                min="0" 
                max="1000" 
                value={maxPrice}
                onChange={(e) => setMaxPrice(+e.target.value)}
                className="w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-sky-500" 
              />
              <div className="flex justify-between text-[11px] font-bold text-zinc-400 mt-4 uppercase tracking-wider">
                <span>€0</span>
                <span>up to <span className="text-zinc-900">€{maxPrice}</span></span>
              </div>
            </div>

            <div className="border-t border-zinc-100 pt-8">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="font-bold text-sm tracking-wide text-zinc-900 uppercase">{t('inStockOnly')}</span>
                <div className="relative">
                  <input 
                    type="checkbox" 
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-zinc-100 rounded-full border border-zinc-200 transition-colors peer-checked:bg-sky-500 peer-checked:border-sky-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-sky-200 shadow-inner" />
                </div>
              </label>
            </div>

            {selectedVehicle && (
              <div className="border-t border-zinc-100 pt-8">
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="font-bold text-sm tracking-wide text-zinc-900 uppercase">{t('compatibleOnly')}</span>
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      checked={fitmentOnly}
                      onChange={(e) => setFitmentOnly(e.target.checked)}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-zinc-100 rounded-full border border-zinc-200 transition-colors peer-checked:bg-emerald-500 peer-checked:border-emerald-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-emerald-200 shadow-inner" />
                  </div>
                </label>
                <div className="mt-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest leading-tight">
                    {t('filteredFor')} {selectedVehicle.model}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-zinc-900 rounded-3xl p-8 text-white">
            <h4 className="font-bold mb-3 leading-tight">{t('needExpertHelp')}</h4>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">{t('expertHelpDesc')}</p>
            <button className="w-full h-11 bg-white text-zinc-900 font-bold rounded-2xl text-xs hover:bg-zinc-100 transition-colors">
              {t('contact').toUpperCase()}
            </button>
          </div>
        </aside>

        {/* Content */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="text-sm font-medium text-zinc-500">
              {t('showing')} <span className="text-zinc-900 font-bold">{filteredProducts.length}</span> {t('showingParts')}
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <SlidersHorizontal className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                <select 
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="h-10 pl-9 pr-10 rounded-xl border border-zinc-200 bg-white text-xs font-bold uppercase tracking-wider text-zinc-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="popular">{t('popularity')}</option>
                  <option value="price-asc">{t('priceLowHigh')}</option>
                  <option value="price-desc">{t('priceHighLow')}</option>
                  <option value="newest">{t('newestArrival')}</option>
                  <option value="rating">{t('topRated')}</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
              </div>

              <div className="relative flex-1 sm:flex-none sm:w-[240px]">
                <input
                  type="text"
                  placeholder={t('search')}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-10 pl-4 pr-10 rounded-xl border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                />
              </div>
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredProducts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24 bg-zinc-50 rounded-[40px] border border-dashed border-zinc-200"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-white shadow-xl shadow-zinc-200/50 grid place-items-center">
                  <SearchX className="w-10 h-10 text-zinc-300" />
                </div>
                <h3 className="font-extrabold text-2xl text-zinc-900 mb-2">{t('noProducts')}</h3>
                <p className="text-zinc-500 font-medium">Try adjusting your filters or search query.</p>
                <button 
                  onClick={() => {
                    setSearch('');
                    setMaxPrice(1000);
                    setInStockOnly(false);
                    setSearchParams({});
                  }}
                  className="mt-6 text-sm font-bold text-sky-600 border-b-2 border-sky-600 hover:text-sky-700 hover:border-sky-700 transition-all"
                >
                  {t('resetFilters')}
                </button>
              </motion.div>
            ) : (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredProducts.map(p => (
                  <ProductCard 
                    key={p.id} 
                    product={p} 
                    onQuickView={(product) => setQuickViewProduct(product)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ProductQuickView 
        product={quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
      />
    </div>
  );
}
