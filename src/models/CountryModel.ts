import mongoose, { Document, Schema, Model, Types } from 'mongoose';
import { ICity } from './CityModel'; // CityModel'den ICity tipini import et

// Ülke için arayüz
export interface ICountry extends Document {
  name: string;
  averageLocation: {
    latitude: number;
    longitude: number;
  };
  cities: Types.ObjectId[] | ICity[]; // Şehirleri referans olarak tut
}

// Ülke şeması
const CountrySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  averageLocation: {
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null }
  },
  cities: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "City" 
  }]
}, {
  timestamps: true
});

// Model oluşturma
export const Country: Model<ICountry> = mongoose.model<ICountry>('Country', CountrySchema);
