import { Request, Response } from 'express';
import { Earthquake, IEarthquake } from '../models/Earthquake';

export class EarthquakeController {
  // Tüm depremleri getir
  static async getAllEarthquakes(req: Request, res: Response): Promise<void> {
    try {
      const { country, minMagnitude } = req.query;
      
      let query: any = {};
      if (country) query.country = country;
      if (minMagnitude) query.magnitude = { $gte: parseFloat(minMagnitude as string) };

      const earthquakes = await Earthquake.find(query).sort({ date: -1 });
      res.status(200).json(earthquakes);
    } catch (error) {
      res.status(500).json({ 
        message: 'Depremler getirilirken bir hata oluştu',
        error: error instanceof Error ? error.message : 'Bilinmeyen bir hata'
      });
    }
  }

  // Yeni deprem kaydı oluştur
  static async createEarthquake(req: Request, res: Response): Promise<void> {
    try {
      const { country, city, date, magnitude, depth, epicenter } = req.body;

      // Basit doğrulama
      if (!country || !city || !date || !magnitude || !depth || !epicenter) {
        res.status(400).json({ message: 'Tüm alanlar zorunludur' });
        return;
      }

      const newEarthquake = new Earthquake({
        country,
        city,
        date,
        magnitude,
        depth,
        epicenter
      });

      const savedEarthquake = await newEarthquake.save();
      res.status(201).json(savedEarthquake);
    } catch (error) {
      res.status(500).json({ 
        message: 'Deprem kaydı oluşturulurken bir hata oluştu',
        error: error instanceof Error ? error.message : 'Bilinmeyen bir hata'
      });
    }
  }

  // Belirli bir depremi getir
  static async getEarthquakeById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const earthquake = await Earthquake.findById(id);

      if (!earthquake) {
        res.status(404).json({ message: 'Deprem bulunamadı' });
        return;
      }

      res.status(200).json(earthquake);
    } catch (error) {
      res.status(500).json({ 
        message: 'Deprem getirilirken bir hata oluştu',
        error: error instanceof Error ? error.message : 'Bilinmeyen bir hata'
      });
    }
  }

  // Deprem kaydını güncelle
  static async updateEarthquake(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedEarthquake = await Earthquake.findByIdAndUpdate(
        id, 
        updateData, 
        { new: true, runValidators: true }
      );

      if (!updatedEarthquake) {
        res.status(404).json({ message: 'Deprem bulunamadı' });
        return;
      }

      res.status(200).json(updatedEarthquake);
    } catch (error) {
      res.status(500).json({ 
        message: 'Deprem güncellenirken bir hata oluştu',
        error: error instanceof Error ? error.message : 'Bilinmeyen bir hata'
      });
    }
  }

  // Deprem kaydını sil
  static async deleteEarthquake(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedEarthquake = await Earthquake.findByIdAndDelete(id);

      if (!deletedEarthquake) {
        res.status(404).json({ message: 'Deprem bulunamadı' });
        return;
      }

      res.status(200).json({ message: 'Deprem kaydı başarıyla silindi' });
    } catch (error) {
      res.status(500).json({ 
        message: 'Deprem silinirken bir hata oluştu',
        error: error instanceof Error ? error.message : 'Bilinmeyen bir hata'
      });
    }
  }

  // İstatistiksel bilgileri getir
  static async getEarthquakeStatistics(req: Request, res: Response): Promise<void> {
    try {
      const statistics = await Earthquake.aggregate([
        {
          $group: {
            _id: '$country',
            totalEarthquakes: { $sum: 1 },
            averageMagnitude: { $avg: '$magnitude' },
            maxMagnitude: { $max: '$magnitude' }
          }
        },
        { $sort: { totalEarthquakes: -1 } }
      ]);

      res.status(200).json(statistics);
    } catch (error) {
      res.status(500).json({ 
        message: 'Deprem istatistikleri getirilirken bir hata oluştu',
        error: error instanceof Error ? error.message : 'Bilinmeyen bir hata'
      });
    }
  }
}
