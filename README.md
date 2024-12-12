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

## API Endpoint'leri ve Veri Formatları

### Genel Deprem Endpoint'leri

#### 1. Tüm Depremleri Listeleme
- **Endpoint**: `GET /api/earthquakes`
- **Açıklama**: Tüm depremlerin listesini getirir
- **Parametreler**:
  - `country` (isteğe bağlı): Ülkeye göre filtreleme
  - `minMagnitude` (isteğe bağlı): Minimum büyüklük filtresi
- **Yanıt Formatı**:
```typescript
{
  country: string;
  city: string;
  date: Date;
  magnitude: number;
  depth: number;
  epicenter: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  }
}
```

#### 2. Yeni Deprem Kaydı Oluşturma
- **Endpoint**: `POST /api/earthquakes`
- **Açıklama**: Yeni bir deprem kaydı oluşturur
- **İstek Gövdesi**:
```typescript
{
  country: string;
  city: string;
  date: Date;
  magnitude: number;
  depth: number;
  epicenter: {
    coordinates: [number, number]; // [longitude, latitude]
  }
}
```

#### 3. Belirli Bir Depremi Getirme
- **Endpoint**: `GET /api/earthquakes/:id`
- **Açıklama**: Belirli bir depremi ID'sine göre getirir
- **Yanıt Formatı**: Yukarıdaki deprem nesnesi formatında

#### 4. Deprem Kaydını Güncelleme
- **Endpoint**: `PUT /api/earthquakes/:id`
- **Açıklama**: Var olan bir deprem kaydını günceller
- **İstek Gövdesi**: Deprem nesnesi formatında güncellenecek alanlar

#### 5. Deprem Kaydını Silme
- **Endpoint**: `DELETE /api/earthquakes/:id`
- **Açıklama**: Belirli bir deprem kaydını siler

### İstatistiksel Endpoint

#### Deprem İstatistikleri
- **Endpoint**: `GET /api/earthquakes/statistics`
- **Açıklama**: Depremler hakkında istatistiksel bilgiler sağlar
- **Olası Yanıt İçeriği**:
  - Toplam deprem sayısı
  - Ortalama büyüklük
  - Ülkelere göre deprem dağılımı
  - Büyüklük aralıklarına göre deprem sayısı

### Sağlık Kontrolü
- **Endpoint**: `GET /health`
- **Açıklama**: Sunucunun çalışma durumunu kontrol eder

## Filtreleme Örnekleri
```
GET /api/earthquakes?country=Türkiye&minMagnitude=5.0
```

## Geliştirme Notları
- Proje MongoDB kullanmaktadır
- Gerçek bir üretim ortamında güvenlik ayarlarını ve CORS politikalarını gözden geçirin
- Tüm tarih ve koordinat bilgileri standart formatlarda işlenir

## Lisans
Bu proje MIT Lisansı altında yayınlanmaktadır. Detaylı bilgi için LICENSE dosyasına bakınız. 

MIT Lisansı, yazılımın serbestçe kullanılmasına, değiştirilmesine, dağıtılmasına ve paylaşılmasına izin verir. Tek gereklilik, lisans ve telif hakkı bildiriminin orijinal yazılımla birlikte korunmasıdır.
