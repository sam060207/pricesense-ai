import mongoose, { Document } from 'mongoose';
export interface IReview extends Document {
    productId: mongoose.Types.ObjectId;
    platformName: string;
    author: string;
    rating: number;
    comment: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    date: Date;
}
declare const _default: mongoose.Model<any, {}, {}, {}, any, any, any>;
export default _default;
//# sourceMappingURL=Review.d.ts.map