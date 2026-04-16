import mongoose, { Schema, Document } from 'mongoose';

export interface IPlatformPrice extends Document {
  productId: mongoose.Types.ObjectId;
  platformName: string;
  currentPrice: number;
  originalPrice: number;
  url: string;
  isBestPrice: boolean;
  inStock: boolean;
}

const PlatformPriceSchema: Schema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
  platformName: { type: String, required: true },
  currentPrice: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  url: { type: String, required: true },
  isBestPrice: { type: Boolean, default: false },
  inStock: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.PlatformPrice || mongoose.model<IPlatformPrice>('PlatformPrice', PlatformPriceSchema);
