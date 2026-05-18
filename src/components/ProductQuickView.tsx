import React, { useState } from 'react';
import { X, Star, ShoppingCart, ShieldCheck, Truck, BellRing, CheckCircle2, Facebook, Twitter, Linkedin, Share2 } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductQuickView({ product, onClose }: ProductQuickViewProps) {
  const { addToCart, requestRestockNotification, requestPriceAlert, t, selectedVehicle, getLocalized } = useStore();
  const [email, setEmail] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isPriceAlertSet, setIsPriceAlertSet] = useState(false);

  const [isCopied, setIsCopied] = useState(false);

  if (!product) return null;

  const isCompatible = selectedVehicle && product.compatibleVehicles?.includes(selectedVehicle.id);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    requestRestockNotification(product.id, email);
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail('');
    }, 3000);
  };

  const handlePriceAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !targetPrice) return;
    requestPriceAlert(product.id, email, parseFloat(targetPrice));
    setIsPriceAlertSet(true);
    setTimeout(() => {
      setIsPriceAlertSet(false);
      setTargetPrice('');
    }, 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-900 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative aspect-square md:aspect-auto bg-zinc-50 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-zinc-100">
              <img 
                src={product.image} 
                alt={getLocalized(product.name)}
                className="w-full h-full object-contain max-h-[400px] hover:scale-105 transition-transform duration-500" 
              />
              {product.badge && (
                 <span className="absolute top-8 left-8 bg-zinc-900 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    {product.badge}
                 </span>
              )}
            </div>

            {/* Info Section */}
            <div className="p-8 lg:p-12">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                   <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-4 h-4",
                            i < Math.floor(product.rating) 
                              ? "fill-amber-400 text-amber-400" 
                              : "fill-zinc-100 text-zinc-100"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">{product.rating} REVIEW SCORE</span>
                </div>
                
                <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight leading-tight mb-3">
                  {getLocalized(product.name)}
                </h2>
                <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6">
                  {product.sku} • {product.brand} • <span className={product.instock ? "text-emerald-500" : "text-sky-500"}>
                    {product.instock ? t('inStock') : t('euSpecialOrder')}
                  </span>
                </div>

                <div className="text-3xl font-black text-zinc-900 tracking-tighter mb-8">
                  €{product.price.toFixed(2)}
                </div>

                {selectedVehicle && (
                  <div className={cn(
                    "mb-8 p-4 rounded-2xl flex items-center gap-4 border",
                    isCompatible 
                      ? "bg-emerald-50 border-emerald-100 text-emerald-900" 
                      : "bg-rose-50 border-rose-100 text-rose-900"
                  )}>
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                      isCompatible ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                    )}>
                      {isCompatible ? <CheckCircle2 className="w-5 h-5" /> : <X className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest opacity-60">{t('fitmentCheck')}</div>
                      <div className="text-sm font-bold">
                        {isCompatible 
                          ? `${t('fitmentConfirmed')} ${selectedVehicle.model}` 
                          : `${t('fitmentWarning')} ${selectedVehicle.model}`}
                      </div>
                    </div>
                  </div>
                )}

                <p className="text-zinc-500 text-sm leading-relaxed mb-10 font-medium">
                  {getLocalized(product.description) || "High-quality replacement component designed to meet or exceed OEM specifications. This part ensures optimal performance and longevity for your vehicle's systems. Engineered with precision and tested for durability."}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <button 
                    onClick={() => { addToCart(product); onClose(); }}
                    className={cn(
                      "flex-1 h-14 font-bold rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl",
                      product.instock 
                        ? "bg-zinc-900 text-white hover:bg-sky-500 shadow-zinc-900/10" 
                        : "bg-sky-500 text-white hover:bg-sky-600 shadow-sky-500/20"
                    )}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {product.instock ? t('addToCart') : t('requestFromEu')}
                  </button>
                  <button className="h-14 px-8 border border-zinc-200 text-zinc-900 font-bold rounded-2xl hover:bg-zinc-50 transition-all active:scale-95">
                    {t('findNearestShop')}
                  </button>
                </div>

                {!product.instock && (
                   <div className="mb-10">
                    {/* Restock Notification */}
                    <div className="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                      <div className="flex items-center gap-3 mb-2">
                        <BellRing className="w-5 h-5 text-amber-500" />
                        <h4 className="font-black text-zinc-900 text-sm uppercase tracking-widest">{t('restockTitle')}</h4>
                      </div>
                      <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest leading-relaxed mb-4">
                        {t('restockDesc')}
                      </p>
                      
                      <form onSubmit={handleNotify} className="flex gap-2">
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t('emailPlaceholder')}
                          className="flex-1 h-12 bg-white border border-zinc-200 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                        />
                        <button 
                          type="submit"
                          disabled={isSubscribed}
                          className={cn(
                            "h-12 px-6 rounded-xl font-bold text-xs uppercase tracking-widest transition-all",
                            isSubscribed 
                              ? "bg-emerald-500 text-white" 
                              : "bg-zinc-900 text-white hover:bg-sky-500"
                          )}
                        >
                          {isSubscribed ? <CheckCircle2 className="w-5 h-5" /> : t('notifyMe')}
                        </button>
                      </form>
                      {isSubscribed && (
                        <motion.div 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-3 flex items-center gap-1"
                        >
                          {t('notificationSuccess')}
                        </motion.div>
                      )}
                    </div>

                    {/* Price Alert */}
                    <div className="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                      <div className="flex items-center gap-3 mb-2">
                        <Star className="w-5 h-5 text-sky-500" />
                        <h4 className="font-black text-zinc-900 text-sm uppercase tracking-widest">{t('priceAlertTitle')}</h4>
                      </div>
                      <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest leading-relaxed mb-4">
                        {t('priceAlertDesc')}
                      </p>
                      
                      <form onSubmit={handlePriceAlert} className="flex flex-col sm:flex-row gap-2">
                        <input 
                          type="number" 
                          step="0.01"
                          required
                          value={targetPrice}
                          onChange={(e) => setTargetPrice(e.target.value)}
                          placeholder={t('targetPriceLabel')}
                          className="flex-1 h-12 bg-white border border-zinc-200 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                        />
                        <button 
                          type="submit"
                          disabled={isPriceAlertSet}
                          className={cn(
                            "h-12 px-6 rounded-xl font-bold text-xs uppercase tracking-widest transition-all",
                            isPriceAlertSet 
                              ? "bg-emerald-500 text-white" 
                              : "bg-zinc-900 text-white hover:bg-sky-500"
                          )}
                        >
                          {isPriceAlertSet ? <CheckCircle2 className="w-5 h-5" /> : t('setAlert')}
                        </button>
                      </form>
                      {isPriceAlertSet && (
                        <motion.div 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-3 flex items-center gap-1"
                        >
                          {t('alertSuccess')}
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-zinc-100 mb-8">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-sky-500 shrink-0" />
                    <div>
                      <div className="text-[11px] font-black text-zinc-900 uppercase tracking-widest leading-none mb-1">{t('warranty')}</div>
                      <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{t('protection24m')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-sky-500 shrink-0" />
                    <div>
                      <div className="text-[11px] font-black text-zinc-900 uppercase tracking-widest leading-none mb-1">
                        {product.instock ? t('kosovoShipping') : t('extendedDelivery')}
                      </div>
                      <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        {product.instock ? "1-2 business days" : t('euDeliveryTime')}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-zinc-100">
                  <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">{t('shareProduct')}</div>
                  <div className="flex gap-3">
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-900 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all active:scale-95"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(getLocalized(product.name))}&url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-900 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all active:scale-95"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-900 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all active:scale-95"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <div className="relative">
                      <button 
                        onClick={async () => {
                          const shareData = {
                            title: getLocalized(product.name),
                            text: getLocalized(product.description),
                            url: window.location.href,
                          };

                          try {
                            if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                              await navigator.share(shareData);
                            } else {
                              await navigator.clipboard.writeText(window.location.href);
                              setIsCopied(true);
                              setTimeout(() => setIsCopied(false), 2000);
                            }
                          } catch (error) {
                            if ((error as Error).name !== 'AbortError') {
                              await navigator.clipboard.writeText(window.location.href);
                              setIsCopied(true);
                              setTimeout(() => setIsCopied(false), 2000);
                            }
                          }
                        }}
                        className={cn(
                          "w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center transition-all active:scale-95",
                          isCopied ? "bg-emerald-500 text-white border-emerald-500" : "text-zinc-900 hover:bg-sky-500 hover:text-white hover:border-sky-500"
                        )}
                      >
                        {isCopied ? <CheckCircle2 className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
                      </button>
                      <AnimatePresence>
                        {isCopied && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10, x: '-50%' }}
                            animate={{ opacity: 1, y: 0, x: '-50%' }}
                            exit={{ opacity: 0, y: 10, x: '-50%' }}
                            className="absolute bottom-full left-1/2 mb-2 px-3 py-1 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg whitespace-nowrap pointer-events-none"
                          >
                            Copied!
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
