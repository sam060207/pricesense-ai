import mongoose, { Document } from 'mongoose';
export interface IProduct extends Document {
    title: string;
    normalizedTitle: string;
    description: string;
    brand: string;
    category: string;
    imageUrl: string;
    aggregatedRating: number;
    reviewCount: number;
    specs: Record<string, string>;
}
declare const _default: mongoose.Model<any, {}, {}, {}, any, any, any>;
export default _default;
//# sourceMappingURL=Product.d.ts.map