import mongoose, { Document, Schema, Model } from 'mongoose';

// TypeScript arayüzü
export interface IEarthquake extends Document {
  country: string;
  city: string;
  date: Date;
  magnitude: number;
  depth: number;
  epicenter: {
    type: string;
    coordinates: number[];
  };
}

// Mongoose şeması
const earthquakeSchema: Schema = new Schema({
  country: { type: String, required: true },
  city: { type: String, required: true },
  date: { type: Date, required: true },
  magnitude: { type: Number, required: true },
  depth: { type: Number, required: true },
  epicenter: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
      index: '2dsphere'
    }
  }
}, { 
  timestamps: true 
});

// Model oluşturma
export const Earthquake: Model<IEarthquake> = mongoose.model<IEarthquake>('Earthquake', earthquakeSchema);
