import mongoose, { Document } from 'mongoose';
export interface IPriceHistory extends Document {
    productId: mongoose.Types.ObjectId;
    platformName: string;
    price: number;
    date: Date;
}
declare const _default: mongoose.Model<any, {}, {}, {}, any, any, any>;
export default _default;
//# sourceMappingURL=PriceHistory.d.ts.map