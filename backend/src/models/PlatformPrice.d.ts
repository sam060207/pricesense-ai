import mongoose, { Document } from 'mongoose';
export interface IPlatformPrice extends Document {
    productId: mongoose.Types.ObjectId;
    platformName: string;
    currentPrice: number;
    originalPrice: number;
    url: string;
    isBestPrice: boolean;
    inStock: boolean;
}
declare const _default: mongoose.Model<any, {}, {}, {}, any, any, any>;
export default _default;
//# sourceMappingURL=PlatformPrice.d.ts.map