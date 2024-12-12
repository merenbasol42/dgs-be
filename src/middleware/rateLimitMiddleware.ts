import rateLimit from 'express-rate-limit';

// Genel API için rate limiting
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // Her IP için 15 dakikada 100 istek
  standardHeaders: true, // Rate limit bilgilerini `RateLimit-*` headerlarında döndür
  legacyHeaders: false, // `X-RateLimit-*` headerlarını devre dışı bırak
  message: {
    status: 'error',
    message: 'Çok fazla istek yaptınız. Lütfen daha sonra tekrar deneyin.'
  }
});

// Yoğun işlem gerektiren endpoint'ler için daha sıkı rate limiting
export const intensiveApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 20, // Her IP için 15 dakikada 20 istek
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'error',
    message: 'Bu endpoint için çok fazla istek yaptınız. Lütfen daha sonra tekrar deneyin.'
  }
});
