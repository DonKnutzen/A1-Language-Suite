# Deutsch C1 · Türkçe → Almanca · DTB C1

## Ana hedef

Bu sürümün ana sınav hedefi **Deutsch-Test für den Beruf C1 (DTB C1)**'dir. Önceki sürümde kullanılan **telc Deutsch C1 Hochschule** aynı sınavın eski baskısı değildir; üniversite/akademik bağlama yönelik ayrı bir sınavdır. Kullanıcının gönderdiği yeni belge ise BAMF/BMAS bağlamındaki, işyeri odaklı **Deutsch-Test für den Beruf C1** model testidir.

Goethe-Zertifikat C1 modülleri uygulamada yalnızca ek genel C1 antrenmanı olarak korunur; kurs ilerlemesinin ana sınav puanına dahil edilmez.

## DTB C1 sınav mimarisi

- **Yazılı sınav: 135 dakika**
  - Lesen: 45 dk
  - Lesen und Schreiben: 20 dk
  - Hören: yaklaşık 20 dk
  - Hören und Schreiben: 5 dk
  - Sprachbausteine und Schreiben: 45 dk
- **Sprechen: yaklaşık 16–17 dakika, hazırlık süresi yok**
- Dört beceri eşit ağırlıktadır: Lesen 60, Hören 60, Schreiben 60, Sprechen 60 = **240 puan**.
- Geçme: toplam **en az 144/240**; en az üç beceride **36/60**; telafi edilen tek beceri **24/60'ın altına düşmemelidir**.

## 30 derslik yol

### 1–6 · C1 temel araçları
Kohäsion, argümantasyon, parafraz, register, kollokasyon ve işlevsel fiil yapıları.

### 7–14 · C1 grameri
Passiv, Nomen-Verb-Verbindungen, objektif/subjektif Modalverben, Konjunktiv I/II, Nominalisierung/Verbalisierung.

### 15–20 · DTB C1 okuma ve Lesen+Schreiben
15. Sınav akışı, puanlama ve Mediation
16. Lesen Teil 1: iş piyasası bilgilerini eşleştirme
17. Lesen Teil 2: talimat ve işyeri kuralları
18. Lesen Teil 3: çalışma koşulları / forum tavsiyesi
19. Lesen Teil 4: toplantı tutanağı ve görev dağılımı
20. Lesen und Schreiben: müşteri şikâyetine profesyonel yanıt

### 21–25 · DTB C1 dinleme ve Hören+Schreiben
21. Hören Teil 1: iş akışı, sorun ve öneri
22. Hören Teil 2: argümantasyonu eşleştirme
23. Hören Teil 3: şirket sunumu
24. Hören Teil 4: telefon mesajları
25. Hören und Schreiben: telefon notu / Mediation

### 26–30 · Sprachbausteine, Schreiben, Sprechen
26. Sprachbausteine Teil 1
27. Sprachbausteine Teil 2
28. Stellungnahme an die Geschäftsführung
29. Sprechen Teil 1A/1B/1C
30. Sprechen Teil 2/3 + geçme stratejisi

## Uygulamadaki DTB tam simülasyonu

### Lesen + Lesen und Schreiben · 65 dakika
- 5 eşleştirme (iş piyasası / iş yaşamı bilgileri)
- 2 Richtig/Falsch + 2 MC (talimatlar)
- 4 eşleştirme (çalışma koşulları)
- 5 MC (toplantı tutanağı)
- 2 MC + profesyonel müşteri e-postası
- Okuma puanı: 20 item × 3 = 60

### Hören + Hören und Schreiben · yaklaşık 25 dakika
- 3 konuşma: 3 R/F + 3 MC
- 4 argüman eşleştirme
- 4 MC şirket sunumu
- 5 MC telefon mesajı
- 1 MC + telefon notu
- Tüm sesler görev başına bir kez oynatılır
- Hören puanı: 20 item × 3 = 60

### Sprachbausteine + Schreiben · 45 dakika
- 6 kelime/eşleştirme boşluğu
- 6 üç seçenekli Sprachbaustein
- Yönetim için gerekçeli Stellungnahme
- Yazma toplamı ayrıca Lesen+Schreiben e-postasını ve Hören+Schreiben telefon notunu da içerir.
- Resmî puan ağırlıkları uygulamadaki öz-değerlendirmeye aktarılmıştır.

### Sprechen · yaklaşık 16–17 dakika
- Teil 1A: yaklaşık 2 dakika spontan konu anlatımı
- Teil 1B: Prüferfragen
- Teil 1C: partnerin söylediklerinden bir yönü kendi sözleriyle açıklama
- Teil 2: yaklaşık 3 dakika informel işyeri sohbeti
- Teil 3: yaklaşık 4 dakika işyeri sorununa ortak çözüm + görev paylaşımı
- **Hazırlık süresi yoktur.**

## Teknik notlar

- Ücretli API yoktur. Ses için tarayıcı `speechSynthesis`, kayıt için `MediaRecorder` kullanılır.
- Açık uçlu yazma/konuşma için uygulama sahte otomatik C1 dil puanı üretmez; resmî kriterlerin puan ağırlıkları öz-değerlendirme arayüzüne dönüştürülür.
- Sınav metinleri ve sorular uygulama için özgün oluşturulmuştur; kaynak model testin görevleri kopyalanmamıştır.
