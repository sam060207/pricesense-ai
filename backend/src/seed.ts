import mongoose from 'mongoose';
import Product from './models/Product';
import PlatformPrice from './models/PlatformPrice';
import Review from './models/Review';
import PriceHistory from './models/PriceHistory';
import { connectDB } from './db';

const SEED_PRODUCTS = [
  {
    title: 'Apple iPhone 15 Pro Max (256 GB) - Natural Titanium',
    normalizedTitle: 'apple iphone 15 pro max 256gb natural titanium',
    description: 'Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.',
    brand: 'Apple',
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=600&auto=format&fit=crop',
    basePrice: 159900,
    specs: { Rating: '4.8', Storage: '256GB', Color: 'Natural Titanium' }
  },
  {
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    normalizedTitle: 'sony wh 1000xm5 wireless headphones',
    description: 'Industry-leading noise cancellation, exceptional sound quality, and up to 30 hours of battery life.',
    brand: 'Sony',
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop',
    basePrice: 29990,
    specs: { Type: 'Over-Ear', Wireless: 'Yes', Battery: '30h' }
  },
  {
    title: 'Samsung Galaxy S24 Ultra 5G AI Smartphone',
    normalizedTitle: 'samsung galaxy s24 ultra 5g smartphone',
    description: 'Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity.',
    brand: 'Samsung',
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1707227155609-b69c5e3153ad?q=80&w=600&auto=format&fit=crop',
    basePrice: 129999,
    specs: { OS: 'Android', Storage: '512GB', RAM: '12GB' }
  },
  {
    title: 'MacBook Pro 14-inch M3 Pro chip',
    normalizedTitle: 'macbook pro 14 m3 pro apple',
    description: 'The definitive pro laptop, featuring the incredibly advanced M3 Pro chip for massive performance leaps.',
    brand: 'Apple',
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop',
    basePrice: 199900,
    specs: { RAM: '18GB', Storage: '512GB SSD', Chip: 'M3 Pro' }
  },
  {
    title: 'Nike Air Force 1 07 Low Sneaker',
    normalizedTitle: 'nike air force 1 07 white sneaker',
    description: 'The radiance lives on in the Nike Air Force 1 ’07, the b-ball icon that puts a fresh spin on what you know best.',
    brand: 'Nike',
    category: 'Apparel',
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop',
    basePrice: 9695,
    specs: { Color: 'White', Material: 'Leather', Style: 'Low' }
  },
  {
    title: 'Levi\'s Men\'s 511 Slim Fit Jeans',
    normalizedTitle: 'levis mens 511 slim jeans blue',
    description: 'A modern slim with room to move, the 511™ Slim Fit Jeans are a classic since right now.',
    brand: 'Levi\'s',
    category: 'Apparel',
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop',
    basePrice: 3299,
    specs: { Fit: 'Slim', Material: 'Denim', Color: 'Blue' }
  },
  {
    title: 'Dyson V15 Detect Absolute Vacuum',
    normalizedTitle: 'dyson v15 detect absolute cordless vacuum',
    description: 'Dyson’s most powerful, intelligent cordless vacuum. Reveals invisible dust.',
    brand: 'Dyson',
    category: 'Home',
    imageUrl: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=600&auto=format&fit=crop',
    basePrice: 62900,
    specs: { Type: 'Cordless', Suction: '240 AW', Weight: '3.1 kg' }
  },
  {
    title: 'LG C3 55-inch OLED evo 4K Smart TV',
    normalizedTitle: 'lg c3 55 oled 4k tv',
    description: 'The LG OLED C3 features the advanced α9 AI Processor Gen6 for exceptional picture and sound.',
    brand: 'LG',
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=600&auto=format&fit=crop',
    basePrice: 139990,
    specs: { Size: '55 inch', Display: 'OLED', Resolution: '4K' }
  },
  {
    title: 'Adidas Ultraboost Light Running Shoes',
    normalizedTitle: 'adidas ultraboost light running shoes black',
    description: 'Experience epic energy with the new Ultraboost Light, our lightest Ultraboost ever.',
    brand: 'Adidas',
    category: 'Apparel',
    imageUrl: 'https://images.unsplash.com/photo-1588099765984-16ea99ce7ce4?q=80&w=600&auto=format&fit=crop',
    basePrice: 15999,
    specs: { Sport: 'Running', Color: 'Core Black' }
  },
  {
    title: 'PlayStation 5 Console (Disc Edition)',
    normalizedTitle: 'sony playstation 5 ps5 console disc',
    description: 'Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback.',
    brand: 'Sony',
    category: 'Gaming',
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=600&auto=format&fit=crop',
    basePrice: 54990,
    specs: { Storage: '825GB', Resolution: '4K/120Hz' }
  },
  {
    title: 'Bose QuietComfort Earbuds II',
    normalizedTitle: 'bose quietcomfort earbuds ii 2',
    description: 'Customized sound and noise cancellation to perfectly fit you.',
    brand: 'Bose',
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop',
    basePrice: 26900,
    specs: { Type: 'In-Ear', Wireless: 'Yes' }
  },
  {
    title: 'GoPro HERO12 Black Action Camera',
    normalizedTitle: 'gopro hero12 black action camera',
    description: 'Incredible image quality, even better HyperSmooth video stabilization and a huge boost in battery life.',
    brand: 'GoPro',
    category: 'Cameras',
    imageUrl: 'https://images.unsplash.com/photo-1500634245200-e5245c7574ef?q=80&w=600&auto=format&fit=crop',
    basePrice: 40990,
    specs: { Video: '5.3K', Photo: '27MP', Waterproof: 'Yes' }
  },
  {
    title: 'Puma RS-X Tech Sneakers',
    normalizedTitle: 'puma rsx rs-x tech sneakers',
    description: 'Future-retro silhouette for those who want to stand out.',
    brand: 'Puma',
    category: 'Apparel',
    imageUrl: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop',
    basePrice: 8999,
    specs: { Style: 'Chunky', Closure: 'Lace-up' }
  },
  {
    title: 'Philips Airfryer XXL Premium',
    normalizedTitle: 'philips airfryer xxl premium digital',
    description: 'Maximum taste, minimum fat. The Philips Airfryer uses hot air to fry your favorite foods.',
    brand: 'Philips',
    category: 'Home',
    imageUrl: 'https://images.unsplash.com/photo-1626200419188-f565fb0197e4?q=80&w=600&auto=format&fit=crop',
    basePrice: 14995,
    specs: { Capacity: '7.3L', Display: 'Digital' }
  },
  {
    title: 'Casio G-Shock Mudmaster Watch',
    normalizedTitle: 'casio g shock g-shock mudmaster watch',
    description: 'Built to withstand the toughest environments, featuring twin sensors for compass and temperature.',
    brand: 'Casio',
    category: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=600&auto=format&fit=crop',
    basePrice: 22995,
    specs: { Glass: 'Mineral', WaterResistant: '200m' }
  }
];

const PLATFORMS = ['Amazon', 'Flipkart', 'Myntra', 'Reliance Digital'];

const generateVariation = (base: number) => {
  const variation = (Math.random() * 0.1) - 0.05; // -5% to +5%
  return Math.round(base * (1 + variation));
};

const generateReviews = (productId: any, platforms: string[]) => {
  const reviews = [];
  const sentiments = ['positive', 'neutral', 'negative'];
  const comments = [
    { text: "Amazing product, highly recommend!", rating: 5, sentiment: 'positive' },
    { text: "Good value for money, but delivery was late.", rating: 4, sentiment: 'positive' },
    { text: "Average build quality. Gets the job done.", rating: 3, sentiment: 'neutral' },
    { text: "Not working as expected. Disappointed.", rating: 2, sentiment: 'negative' },
    { text: "Terrible experience, broke on day one.", rating: 1, sentiment: 'negative' },
    { text: "Absolutely fantastic!", rating: 5, sentiment: 'positive' },
    { text: "It's okay, nothing special.", rating: 3, sentiment: 'neutral' },
  ];

  for (let i = 0; i < 5 + Math.floor(Math.random() * 5); i++) {
    const template = comments[Math.floor(Math.random() * comments.length)];
    reviews.push({
      productId,
      platformName: platforms[Math.floor(Math.random() * platforms.length)],
      author: 'User' + Math.floor(Math.random() * 9999),
      rating: template.rating,
      comment: template.text,
      sentiment: template.sentiment,
      date: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
    });
  }
  return reviews;
};

async function seed() {
  await connectDB();

  console.log('Clearing existing data...');
  await Product.deleteMany({});
  await PlatformPrice.deleteMany({});
  await Review.deleteMany({});
  await PriceHistory.deleteMany({});

  for (const prodData of SEED_PRODUCTS) {
    const { basePrice, ...productDetails } = prodData;
    
    // Create Product
    const product = new Product({
      ...productDetails,
      aggregatedRating: (3 + Math.random() * 2).toFixed(1), // 3.0 to 5.0
      reviewCount: Math.floor(Math.random() * 500) + 50
    });
    
    await product.save();

    // Create Platform Prices & History
    let bestPrice = Infinity;
    const pricesToSave = [];
    const historyToSave = [];

    const availablePlatforms = PLATFORMS.filter(() => Math.random() > 0.2); // Randomly drop platforms
    if(availablePlatforms.length === 0) availablePlatforms.push('Amazon');

    for (const plat of availablePlatforms) {
      const currentPrice = generateVariation(basePrice);
      const originalPrice = Math.round(currentPrice * (1 + Math.random() * 0.2));
      
      if (currentPrice < bestPrice) bestPrice = currentPrice;

      pricesToSave.push({
        productId: product._id,
        platformName: plat,
        currentPrice,
        originalPrice,
        url: `https://example.com/affiliate/${plat.toLowerCase()}/${product._id}`,
        isBestPrice: false,
        inStock: Math.random() > 0.1
      });

      // History points (30 days)
      for (let day = 0; day < 30; day++) {
        historyToSave.push({
          productId: product._id,
          platformName: plat,
          price: generateVariation(basePrice),
          date: new Date(Date.now() - day * 24 * 60 * 60 * 1000)
        });
      }
    }

    // Set best price flag
    pricesToSave.forEach(p => {
      if (p.currentPrice === bestPrice) p.isBestPrice = true;
    });

    await PlatformPrice.insertMany(pricesToSave);
    await PriceHistory.insertMany(historyToSave);

    // Reviews
    const reviewsToSave = generateReviews(product._id, availablePlatforms);
    await Review.insertMany(reviewsToSave);
  }

  console.log('Seeding completed successfully!');
  process.exit(0);
}

seed();
