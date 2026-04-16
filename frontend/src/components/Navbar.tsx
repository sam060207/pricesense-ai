'use client';

import Link from 'next/link';
import { Search, ShoppingCart, Moon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <Link href="/" className="text-xl font-bold tracking-tight text-foreground hidden sm:block">
              PriceSense AI
            </Link>
          </div>
          
          <div className="flex-1 max-w-2xl mx-4 sm:mx-8">
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-border rounded-full leading-5 bg-card-bg text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 ease-in-out sm:text-sm shadow-sm"
                placeholder="Search across Amazon, Flipkart, Myntra..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="p-2 text-foreground/70 hover:text-foreground hover:bg-accent rounded-full transition-colors">
              <Moon className="h-5 w-5" />
            </button>
            <button className="p-2 text-foreground/70 hover:text-foreground hover:bg-accent rounded-full transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            <div className="hidden sm:flex h-8 w-8 rounded-full bg-primary/10 items-center justify-center text-primary font-medium cursor-pointer ring-1 ring-primary/20">
              U
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
