'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Star, ExternalLink, AlertCircle } from 'lucide-react';
import { DetailSkeleton } from '@/components/Skeleton';
import PriceChart from '@/components/PriceChart';
import SentimentAnalysis from '@/components/SentimentAnalysis';

export default function ProductDetail() {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (id) {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      fetch(`${API_URL}/api/products/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('API Error');
          return res.json();
        })
        .then(resData => {
          setData(resData);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError(true);
          setLoading(false);
        });
    }
  }, [id]);

  const handleBuyClick = async (e: React.MouseEvent, priceInfo: any) => {
    e.preventDefault();
    try {
      // Fire analytics tracking beacon
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      await fetch(`${API_URL}/api/track-click`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: id,
          platformName: priceInfo.platformName
        })
      });
    } catch (err) {
      console.warn('Analytics failed block, progressing redirect...', err);
    }
    window.open(priceInfo.url, '_blank');
  };

  if (loading) return <DetailSkeleton />;

  if (error || !data?.product) {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-red-500 min-h-[60vh]">
        <AlertCircle className="w-16 h-16 mb-4 opacity-50" />
        <h2 className="text-xl font-bold">Product unavailable</h2>
        <p className="text-foreground/60 text-sm mt-2">Could not fetch product details or it no longer exists.</p>
      </div>
    );
  }

  const { product, prices, history, sentimentSummary } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-32 pt-24">
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white rounded-3xl p-10 flex items-center justify-center border border-border shadow-sm h-[500px]">
          <img src={product.imageUrl} alt={product.title} className="max-w-full h-full object-contain" />
        </div>
        
        <div className="space-y-6 flex flex-col justify-center">
          <div>
            <span className="text-primary text-sm font-bold tracking-widest uppercase">{product.brand}</span>
            <h1 className="text-3xl sm:text-5xl font-black text-foreground mt-3 leading-tight tracking-tight">
              {product.title}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
              <Star className="w-4 h-4 mr-1.5 fill-current" />
              {product.aggregatedRating}
            </div>
            <span className="text-sm text-foreground/60 font-medium">{product.reviewCount} Ratings</span>
          </div>
          
          <p className="text-foreground/70 leading-relaxed text-lg">
            {product.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-border">
            {Object.entries(product.specs || {}).map(([key, val]: any) => (
              <div key={key}>
                <p className="text-xs text-foreground/50 uppercase tracking-widest mb-1">{key}</p>
                <p className="font-semibold text-foreground">{val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prices List */}
      <div className="bg-card-bg border border-border rounded-3xl overflow-hidden shadow-sm">
        <div className="p-8 border-b border-border bg-accent/30 text-xl font-bold tracking-tight">
          Compare Prices
        </div>
        <div className="divide-y divide-border">
          {prices?.sort((a:any,b:any) => a.currentPrice - b.currentPrice).map((price: any, idx: number) => (
            <div key={idx} className={`p-8 flex flex-col sm:flex-row sm:items-center justify-between transition-colors ${price.isBestPrice ? 'bg-green-50/50 dark:bg-green-900/10' : 'hover:bg-accent/10'}`}>
              <div className="flex items-center gap-6 mb-6 sm:mb-0">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm border border-border shrink-0">
                  <span className="font-bold text-gray-900 text-xs text-center p-1 leading-tight">{price.platformName}</span>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1">{price.platformName}</h3>
                  {price.isBestPrice && <span className="text-xs bg-gradient-to-r from-green-500 to-emerald-400 text-white px-3 py-1 rounded-full font-bold shadow-sm">Top Choice</span>}
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-8">
                <div className="text-right">
                  <p className="text-3xl font-black text-foreground">₹{price.currentPrice.toLocaleString()}</p>
                  {price.originalPrice > price.currentPrice && (
                    <p className="text-sm text-red-500 line-through font-medium">₹{price.originalPrice.toLocaleString()}</p>
                  )}
                </div>
                <button 
                  onClick={(e) => handleBuyClick(e, price)}
                  className="bg-foreground text-background hover:bg-primary hover:text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-md"
                >
                  Buy <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <PriceChart history={history} />
        <SentimentAnalysis sentimentSummary={sentimentSummary} />
      </div>
    </div>
  );
}
