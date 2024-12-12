import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Deprem oluşturma için validasyon kuralları
export const createEarthquakeValidation = [
  body('country').notEmpty().withMessage('Ülke alanı zorunludur'),
  body('city').notEmpty().withMessage('Şehir alanı zorunludur'),
  body('date').isISO8601().withMessage('Geçerli bir tarih formatı giriniz'),
  body('magnitude')
    .isFloat({ min: 0, max: 10 })
    .withMessage('Büyüklük 0 ile 10 arasında olmalıdır'),
  body('depth')
    .isFloat({ min: 0 })
    .withMessage('Derinlik pozitif bir değer olmalıdır'),
  body('epicenter.coordinates')
    .isArray({ min: 2, max: 2 })
    .withMessage('Koordinatlar [enlem, boylam] formatında olmalıdır'),
];

// Validasyon sonuçlarını kontrol eden middleware
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      status: 'validation_error',
      errors: errors.array() 
    });
  }
  next();
};

// Konuma göre arama için validasyon kuralları
export const locationSearchValidation = [
  body('lat')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Enlem -90 ile 90 arasında olmalıdır'),
  body('lng')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Boylam -180 ile 180 arasında olmalıdır'),
  body('radius')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Yarıçap pozitif bir değer olmalıdır')
];
