"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const fuse_js_1 = __importDefault(require("fuse.js"));
const db_1 = require("./db");
const Product_1 = __importDefault(require("./models/Product"));
const PlatformPrice_1 = __importDefault(require("./models/PlatformPrice"));
const Review_1 = __importDefault(require("./models/Review"));
const PriceHistory_1 = __importDefault(require("./models/PriceHistory"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Initialize DB
(0, db_1.connectDB)();
app.get('/api/products/trending', async (req, res) => {
    try {
        const products = await Product_1.default.find().limit(8);
        const productsWithPrices = await Promise.all(products.map(async (p) => {
            const bestPrice = await PlatformPrice_1.default.findOne({ productId: p._id, isBestPrice: true });
            return { ...p.toObject(), bestPrice };
        }));
        res.json(productsWithPrices);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
app.get('/api/search', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q)
            return res.json([]);
        const products = await Product_1.default.find();
        // Fuzzy search using Fuse.js
        const fuse = new fuse_js_1.default(products, {
            keys: ['title', 'brand', 'category'],
            threshold: 0.4
        });
        let results = fuse.search(q).map(result => result.item);
        // Fallback if no params
        if (results.length === 0) {
            results = await Product_1.default.find({ title: new RegExp(q, 'i') });
        }
        const productsWithPrices = await Promise.all(results.map(async (p) => {
            const prices = await PlatformPrice_1.default.find({ productId: p._id });
            return { ...p.toObject(), prices };
        }));
        res.json(productsWithPrices);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product_1.default.findById(req.params.id);
        if (!product)
            return res.status(404).json({ error: 'Not found' });
        const prices = await PlatformPrice_1.default.find({ productId: product._id });
        const reviews = await Review_1.default.find({ productId: product._id }).sort({ date: -1 });
        const history = await PriceHistory_1.default.find({ productId: product._id }).sort({ date: 1 });
        const sentimentSummary = {
            positive: reviews.filter(r => r.sentiment === 'positive').length,
            neutral: reviews.filter(r => r.sentiment === 'neutral').length,
            negative: reviews.filter(r => r.sentiment === 'negative').length,
            total: reviews.length
        };
        res.json({
            product,
            prices,
            history,
            reviews,
            sentimentSummary
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map