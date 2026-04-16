import mongoose, { Schema, Document } from 'mongoose';

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

const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  normalizedTitle: { type: String, required: true, index: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  aggregatedRating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  specs: { type: Map, of: String }
}, { timestamps: true });

// Text index for search
ProductSchema.index({ title: 'text', description: 'text', brand: 'text' });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
