'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCardSkeleton } from '@/components/Skeleton';
import { SearchX, AlertCircle } from 'lucide-react';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      setError(false);
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      fetch(`${API_URL}/api/search?q=${encodeURIComponent(query)}`)
        .then(res => {
          if (!res.ok) throw new Error('API Error');
          return res.json();
        })
        .then(data => {
          setResults(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError(true);
          setLoading(false);
        });
    }
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[70vh]">
      <h1 className="text-3xl font-bold mb-8">
        Search Results for <span className="text-primary">"{query}"</span>
      </h1>

      {error && (
        <div className="flex flex-col items-center justify-center py-20 text-red-500">
          <AlertCircle className="w-16 h-16 mb-4 opacity-50" />
          <h2 className="text-xl font-bold">Something went wrong</h2>
          <p className="text-foreground/60 text-sm mt-2">Could not fetch results. Please try again later.</p>
        </div>
      )}

      {!error && loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <ProductCardSkeleton key={i} />)}
        </div>
      ) : !error && results.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-32 text-center"
        >
          <div className="w-24 h-24 bg-accent/50 rounded-full flex items-center justify-center mb-6">
            <SearchX className="w-12 h-12 text-foreground/40" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No products found</h2>
          <p className="text-foreground/60 max-w-md">
            We couldn't find anything matching "{query}". Try adjusting your spellings or search for a more generic term.
          </p>
        </motion.div>
      ) : !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {results.map((product: any, idx) => {
              const bestPrice = product.prices?.find((p: any) => p.isBestPrice) || product.prices?.[0];
              return (
                <motion.div 
                  key={product._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  layout
                >
                  <Link href={`/products/${product._id}`}>
                    <div className="group bg-card-bg border border-border rounded-xl overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all h-full flex flex-col relative">
                      {product.confidenceScore !== undefined && (
                        <div className="absolute top-3 left-3 bg-background/80 backdrop-blur text-xs font-bold px-2 py-1 rounded shadow-sm z-10 text-foreground border border-border">
                          Match: {product.confidenceScore}%
                        </div>
                      )}
                      
                      <div className="aspect-square bg-white p-6 justify-center items-center flex relative">
                        <img src={product.imageUrl} alt={product.title} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-xs text-foreground/50 font-medium mb-1 uppercase tracking-wider">{product.brand}</p>
                          <h3 className="font-semibold text-foreground line-clamp-2 leading-snug">{product.title}</h3>
                        </div>
                        <div className="mt-4 pt-4 border-t border-border flex justify-between items-end">
                          <div>
                            <p className="text-xs text-foreground/50 mb-1">Starting from</p>
                            <p className="text-xl font-bold text-primary">
                              ₹{bestPrice ? bestPrice.currentPrice.toLocaleString() : 'N/A'}
                            </p>
                          </div>
                          <div className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded dark:bg-green-900/30 dark:text-green-400">
                            {product.prices?.length || 0} stores
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
