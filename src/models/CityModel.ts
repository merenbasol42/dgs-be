import mongoose, { Document, Schema, Model } from 'mongoose';

// Deprem için arayüz
export interface IEarthquakeInCity {
  date: Date;
  magnitude: number;
  depth: number;
}

// Şehir için arayüz
export interface ICity extends Document {
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  recentEarthquakes: IEarthquakeInCity[];
}

// Deprem şeması
const EarthquakeSchema: Schema = new Schema({
  date: { type: Date, default: null },
  magnitude: { type: Number, default: null },
  depth: { type: Number, default: null }
});

// Şehir şeması
const CitySchema: Schema = new Schema({
  name: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  recentEarthquakes: [EarthquakeSchema]
}, {
  timestamps: true
});

// Model oluşturma
export const City: Model<ICity> = mongoose.model<ICity>('City', CitySchema);
