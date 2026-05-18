import React from 'react';
import { Star, Heart, Plus, Edit2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  key?: React.Key;
}

export default function ProductCard({ product, onEdit, onQuickView }: ProductCardProps) {
  const { addToCart, user, selectedVehicle, t, getLocalized } = useStore();

  const isCompatible = selectedVehicle && product.compatibleVehicles?.includes(selectedVehicle.id);

  const badgeColor = product.badge === 'OEM' 
    ? 'bg-zinc-900' 
    : product.badge === 'Bestseller' || product.badge === 'Best Seller'
    ? 'bg-sky-500' 
    : 'bg-emerald-600';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => onQuickView?.(product)}
      className={cn(
        "group bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300",
        onQuickView && "cursor-pointer"
      )}
    >
      <div className="relative aspect-[4/3] bg-zinc-50 overflow-hidden">
        <img
          src={product.image}
          alt={getLocalized(product.name)}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.badge && (
            <span className={cn(
              "text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm",
              badgeColor
            )}>
              {product.badge}
            </span>
          )}

          {isCompatible && (
            <div className="text-emerald-700 bg-white/90 backdrop-blur-md border border-emerald-200 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.1em] shadow-lg shadow-emerald-500/10">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              {t('guaranteedFit')}
            </div>
          )}
        </div>
        
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 transition-transform duration-300 z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); }}
            className="w-9 h-9 grid place-items-center bg-white/90 backdrop-blur rounded-xl shadow-sm hover:bg-white text-zinc-400 hover:text-rose-500 transition-colors"
          >
            <Heart className="w-4 h-4" />
          </button>
          {user?.role === 'admin' && onEdit && (
            <button 
              onClick={(e) => { e.stopPropagation(); onEdit(product); }}
              className="w-9 h-9 grid place-items-center bg-white/90 backdrop-blur rounded-xl shadow-sm hover:bg-white text-zinc-400 hover:text-sky-500 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {!product.instock && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] grid place-items-center z-20">
            <div className="flex flex-col items-center gap-2">
              <span className="bg-zinc-900 text-white text-[11px] font-bold px-4 py-2 rounded-full tracking-wider">
                {t('euSpecialLabel')}
              </span>
              <span className="bg-sky-500 text-white text-[9px] font-black px-3 py-1.5 rounded-lg tracking-widest uppercase shadow-lg">
                {t('daysDelivery')}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-zinc-900 leading-snug line-clamp-2 h-10 group-hover:text-sky-600 transition-colors">
            {getLocalized(product.name)}
          </h3>
        </div>
        <div className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider mb-2">
          {product.sku} • {product.brand}
        </div>
        
        <div className="flex items-center gap-1.5 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3.5 h-3.5",
                  i < Math.floor(product.rating) 
                    ? "fill-amber-400 text-amber-400" 
                    : "fill-zinc-100 text-zinc-100"
                )}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-zinc-400">{product.rating}</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-zinc-50">
          <div className="text-xl font-extrabold tracking-tight text-zinc-900">
            €{product.price.toFixed(2)}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            className={cn(
              "h-10 px-4 text-white text-xs font-bold rounded-xl transition-all active:scale-95 flex items-center gap-2",
              product.instock ? "bg-zinc-900 hover:bg-sky-500 shadow-lg shadow-zinc-900/10" : "bg-sky-500 hover:bg-sky-600 shadow-lg shadow-sky-500/20"
            )}
          >
            <Plus className="w-4 h-4" />
            {product.instock ? t('add') : t('orderEu')}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
