import { Router } from 'express';
import { EarthquakeController } from '../controllers/EarthquakeController';

const router = Router();

// Deprem route'ları
router.get('/', EarthquakeController.getAllEarthquakes);
router.post('/', EarthquakeController.createEarthquake);

// Konuma göre deprem sorgulama
router.get('/location', EarthquakeController.getAllEarthquakes);

// İstatistiksel route'lar
router.get('/statistics', EarthquakeController.getEarthquakeStatistics);

// Tekil deprem işlemleri
router.get('/:id', EarthquakeController.getEarthquakeById);
router.put('/:id', EarthquakeController.updateEarthquake);
router.delete('/:id', EarthquakeController.deleteEarthquake);

export default router;
