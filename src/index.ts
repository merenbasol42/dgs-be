import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import earthquakeRoutes from './routes/earthquakeRoutes';

// Ortam değişkenlerini yükle
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/deprem_db';

// MongoDB bağlantısı
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch((error) => console.error('MongoDB bağlantı hatası:', error));

// Middleware'ler
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS ayarları
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Route'ları tanımla
app.use('/api/earthquakes', earthquakeRoutes);

// Temel sağlık kontrolü endpoint'i
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    message: 'Deprem Görüntüleme Sistemi çalışıyor',
    timestamp: new Date().toISOString(),
    mongoDBStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Tanımsız route için 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 'Error',
    message: 'Endpoint bulunamadı'
  });
});

// Sunucuyu başlat
const server = app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  mongoose.connection.close()
    .then(() => {
      console.log('MongoDB bağlantısı kapatıldı');
      server.close(() => {
        console.log('Sunucu kapatıldı');
        process.exit(0);
      });
    })
    .catch((error) => {
      console.error('Sunucu kapatılırken hata oluştu:', error);
      process.exit(1);
    });
});

export default app;
