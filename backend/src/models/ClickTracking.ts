import mongoose, { Schema, Document } from 'mongoose';

export interface IClickTracking extends Document {
  productId: mongoose.Types.ObjectId;
  platformName: string;
  clickedAt: Date;
}

const ClickTrackingSchema: Schema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
  platformName: { type: String, required: true },
  clickedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.ClickTracking || mongoose.model<IClickTracking>('ClickTracking', ClickTrackingSchema);
