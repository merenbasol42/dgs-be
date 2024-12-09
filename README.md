# Deprem Görüntüleme Sistemi

## Proje Açıklaması
Bu proje, depremlerin kaydedilmesi, görüntülenmesi ve analiz edilmesi için geliştirilmiş bir RESTful API backend sistemidir.

## Özellikler
- TypeScript ve Express.js kullanımı
- MongoDB entegrasyonu
- Deprem CRUD işlemleri
- Deprem istatistikleri endpoint'i
- Ortam değişkenleri yönetimi
- Sağlık kontrolü endpoint'i

## Gereksinimler
- Node.js (v14 veya üzeri)
- npm
- MongoDB

## Kurulum
1. Depoyu klonlayın
2. Bağımlılıkları yükleyin:
   ```
   npm install
   ```
3. .env dosyasındaki MongoDB URI'sini güncelleyin

## Geliştirme Sunucusunu Çalıştırma
```
npm run dev
```

## Üretim Derlemesi
```
npm run build
```

## Üretim Sunucusunu Çalıştırma
```
npm start
```

## API Endpoint'leri
- `GET /health`: Sunucu sağlık kontrolü
- `GET /api/earthquakes`: Tüm depremleri listele
- `POST /api/earthquakes`: Yeni deprem kaydı oluştur
- `GET /api/earthquakes/statistics`: Deprem istatistiklerini getir
- `GET /api/earthquakes/:id`: Belirli bir depremi getir
- `PUT /api/earthquakes/:id`: Deprem kaydını güncelle
- `DELETE /api/earthquakes/:id`: Deprem kaydını sil

## Filtreleme
Deprem listesini ülkeye ve minimum büyüklüğe göre filtreleyebilirsiniz:
```
GET /api/earthquakes?country=Türkiye&minMagnitude=5.0
```

## Geliştirme Notları
- Proje MongoDB kullanmaktadır
- Gerçek bir üretim ortamında güvenlik ayarlarını ve CORS politikalarını gözden geçirin
