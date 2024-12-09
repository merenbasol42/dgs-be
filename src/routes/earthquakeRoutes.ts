import { Router } from 'express';
import { EarthquakeController } from '../controllers/EarthquakeController';

const router = Router();

// Deprem route'ları
router.get('/', EarthquakeController.getAllEarthquakes);
router.post('/', EarthquakeController.createEarthquake);
router.get('/statistics', EarthquakeController.getEarthquakeStatistics);
router.get('/:id', EarthquakeController.getEarthquakeById);
router.put('/:id', EarthquakeController.updateEarthquake);
router.delete('/:id', EarthquakeController.deleteEarthquake);

export default router;
