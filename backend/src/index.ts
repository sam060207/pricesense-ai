import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Fuse from 'fuse.js';
import NodeCache from 'node-cache';

import { connectDB } from './db';
import Product from './models/Product';
import PlatformPrice from './models/PlatformPrice';
import Review from './models/Review';
import PriceHistory from './models/PriceHistory';
import ClickTracking from './models/ClickTracking';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ 
  origin: process.env.FRONTEND_URL || '*',
  credentials: true 
}));
app.use(express.json());

// Initialize DB and Cache (TTL 5 minutes)
connectDB();
const cache = new NodeCache({ stdTTL: 300, checkperiod: 320 });

// Helper for caching and logging hits/misses
const withCache = async (key: string, res: express.Response, fetcher: () => Promise<any>) => {
  const cachedData = cache.get(key);
  if (cachedData) {
    console.log(`[CACHE HIT] Key: ${key}`);
    return res.json(cachedData);
  }
  
  console.log(`[CACHE MISS] Key: ${key}`);
  try {
    const data = await fetcher();
    if (!data) return res.status(404).json({ error: 'Not found' });
    cache.set(key, data);
    return res.json(data);
  } catch (error: any) {
    if (error.message === 'Not found') {
      return res.status(404).json({ error: 'Resource not found' });
    }
    console.error(`[ERROR] Failed fetching ${key}`, error);
    return res.status(500).json({ error: 'Server error occurred while fetching data.' });
  }
};

app.get('/api/products/trending', async (req, res) => {
  await withCache('trending_products', res, async () => {
    const products = await Product.find().limit(8);
    const productsWithPrices = await Promise.all(products.map(async (p) => {
      const bestPrice = await PlatformPrice.findOne({ productId: p._id, isBestPrice: true });
      return { ...p.toObject(), bestPrice };
    }));
    return productsWithPrices;
  });
});

app.get('/api/search', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);
  
  const cacheKey = `search_${q.toString().toLowerCase()}`;
  
  await withCache(cacheKey, res, async () => {
    const products = await Product.find();
    
    // Weighted Fuzzy Search returning a confidence score
    const fuse = new Fuse(products, {
      keys: [
        { name: 'title', weight: 0.6 },
        { name: 'brand', weight: 0.3 },
        { name: 'category', weight: 0.1 }
      ],
      threshold: 0.4,
      includeScore: true // returns score where 0 is perfect and 1 is total mismatch
    });

    let results = fuse.search(q as string).map(result => {
      // Calculate confidence (1 - score) * 100
      const confidenceScore = Math.max(0, Math.round((1 - (result.score || 0)) * 100));
      return { ...result.item.toObject(), confidenceScore };
    });
    
    // Fallback if no params
    if (results.length === 0) {
      const regexResults = await Product.find({ title: new RegExp(q as string, 'i') });
      results = regexResults.map(p => ({...p.toObject(), confidenceScore: 100}));
    }

    const productsWithPrices = await Promise.all(results.map(async (p: any) => {
      const prices = await PlatformPrice.find({ productId: p._id });
      return { ...p, prices };
    }));
    
    return productsWithPrices;
  });
});

app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const cacheKey = `product_${id}`;
  
  await withCache(cacheKey, res, async () => {
    const product = await Product.findById(id);
    if (!product) throw new Error('Not found');

    const prices = await PlatformPrice.find({ productId: product._id });
    const reviews = await Review.find({ productId: product._id }).sort({ date: -1 });
    const history = await PriceHistory.find({ productId: product._id }).sort({ date: 1 });

    const sentimentSummary = {
      positive: reviews.filter(r => r.sentiment === 'positive').length,
      neutral: reviews.filter(r => r.sentiment === 'neutral').length,
      negative: reviews.filter(r => r.sentiment === 'negative').length,
      total: reviews.length
    };

    return {
      product,
      prices,
      history,
      reviews,
      sentimentSummary
    };
  });
});

app.post('/api/track-click', async (req, res) => {
  try {
    const { productId, platformName } = req.body;
    if (!productId || !platformName) {
      return res.status(400).json({ error: 'Missing productId or platformName' });
    }
    
    const click = new ClickTracking({ productId, platformName });
    await click.save();
    
    console.log(`[ANALYTICS] Click tracked for Product: ${productId} on Platform: ${platformName}`);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('[ERROR] tracking click', error);
    return res.status(500).json({ error: 'Failed to record click' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
