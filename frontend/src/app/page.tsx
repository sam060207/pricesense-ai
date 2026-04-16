'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, Server, ShieldCheck, Zap } from 'lucide-react';

export default function Home() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    fetch(`${API_URL}/api/products/trending`)
      .then(res => res.json())
      .then(data => setTrending(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center md:max-w-3xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase border border-primary/20">
              AI-Powered Price Comparison
            </span>
          </motion.div>
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Find the <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">perfect deal,</span> <br className="hidden md:block"/> every single time.
          </motion.h1>
          <motion.p 
            className="text-xl text-foreground/60 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Search across Amazon, Flipkart, Relience Digital and Myntra. We aggregate prices, track historical drops, and analyze reviews so you never overpay again.
          </motion.p>
        </div>
      </section>

      {/* Trending Section */}
      <section className="bg-accent/30 py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold tracking-tight">Trending Right Now</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trending.map((product: any, idx) => (
              <motion.div 
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Link href={`/products/${product._id}`}>
                  <div className="group bg-card-bg border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-300">
                    <div className="aspect-square bg-white p-6 relative">
                      <img src={product.imageUrl} alt={product.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                      {product.bestPrice && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          Best Deal: ₹{product.bestPrice.currentPrice.toLocaleString()}
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-foreground/50 font-medium mb-1 uppercase tracking-wider">{product.brand}</p>
                      <h3 className="font-semibold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">{product.title}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
