# Conflict & Dependency Types (ISO/IEC/IEEE 29148:2018 analiz pratigi)

## Amac

Requirement analizinin bir adimi, gereksinimler arasindaki bagimliliklari ve cakisma ya da taviz (trade-off) noktalarini belirlemektir. Bunlar projenin erken asamasinda cozulurse sonraki asamalarda pahali yeniden isten kacinilir.

## 4 Cakisma Tipi

### 1. Direct Contradiction (Direkt Celişki)
Iki req fiziksel olarak bir arada olamaz.

**Ornek:**
- FR-A: "Kullanici otomatik olarak login olur"
- FR-B: "Her oturumda MFA zorunludur"

**Cozum:** Birini ele veya conditional hale getir (orn: "30 gun MFA-skip after first MFA").

### 2. Implicit Conflict (Ortuk Celişki)
Yuzeyde celismez ama derinde olur.

**Ornek:**
- FR-A: "Kullanici hesabi siler"
- Constraint: "KVKK 5 yil saklama zorunlulugu"

**Cozum:** Anlamsal cozum (soft delete + anonymize, sonra hard delete).

### 3. Trade-off
Ikisi birlikte tam karsilanamaz; biri arttikca digeri azalir.

**Ornek:**
- NFR: "Response time < 2s"
- NFR: "Her istekte AES-256 encryption"

**Cozum:** Triple constraint dengesiyle taviz (hangi yon oncelik).

### 4. Resource Competition
Ayni kaynak (bandwidth, storage, CPU, takim) icin yarisma.

**Ornek:**
- NFR-A: "Real-time video streaming"
- NFR-B: "Background bulk data sync"

**Cozum:** QoS, throttling, scheduling.

## Severity Skalasi

| Skor | Etiket | Aksiyon |
|------|--------|---------|
| Critical | Sistem calismaz | Hemen cozulmeli |
| High | Buyuk feature etkilenir | Sürüm öncesi |
| Medium | UX/performans etkilenir | Backlog |
| Low | Kucuk niteliksel etki | İhtiyaç durumunda |

## 4 Bagimlilik Tipi

### 1. depends-on
A, B'siz calismaz.

**Ornek:** FR (sepet) depends-on FR (giris).

### 2. blocks
A bitmeden B baslayamaz / yapilamaz.

**Ornek:** FR (legacy import) blocks FR (sema migration).

### 3. refines
A, B'nin daha detayli versiyonu.

**Ornek:** NFR (DR plan) refines NFR (uptime 99.9%).

### 4. supersedes
A, B'nin yerini alir.

**Ornek:** FR (yeni search v2) supersedes FR (eski search v1).

## Topological Sort

Bagimliliklar yonlu acyclic grafi olusturur. Implementation icin dogru sira:

1. Hicbir bagimliligi olmayan req'ler (giris noktalari)
2. Sirayla, her req'in tum predecessor'lari bittikten sonra
3. Cycle varsa hata — duzeltilmeli

## Cozum Stratejileri

### Cakisma Cozumu

| Strateji | Ne zaman |
|----------|----------|
| **Eliminate** | Birini tamamen kaldir | Direct contradiction + biri less critical |
| **Compromise** | Iki tarafi orta yolda bulustur | Trade-off |
| **Conditional** | Kosullu uygula | Implicit conflict |
| **Defer** | Bir surume erteler | Critical degil ve zaman dar |
| **Re-prioritize** | Stakeholder onayi degistir | Resource competition |
| **Escalate** | Karar vericiye goture | Cozulemiyor |

### Bagimlilik Yonetimi

- **depends-on:** order'a yansit (predecessor once gelir)
- **blocks:** kritik yola yerlestir (CPM)
- **refines:** üst-düzey + alt-düzey aynı epic'te tutulsun
- **supersedes:** eski req'i DEPRECATED isaretle (silme — numarayi rezerve tut)

## Triple Constraint Hatirlatmasi

`SCOPE_*.md`'den gelen triple constraint dengesi cakisma cozumunde belirleyici:

| Oncelik | Cakisma cozumu egilimi |
|---------|--------------------------|
| Time öncelikli | Kapsamı düşür / kalite kompromise |
| Quality öncelikli | Süreyi uzat / scope'u kıs |
| Scope öncelikli | Süre + maliyet üzerine bin |

## NxN Tarama Algoritmasi (akil yurutme)

1. Her req cift (A, B) icin sor:
   - "A doğru, B doğru" mantıken mümkün mü?
   - "A şu kanaldan çalışırken B blokluyor mu?"
   - "Her ikisi tüm kullanıcı için aynı anda gecekli mi?"
2. Cevap "hayir" ise cakisma var → tipe gore etiketle

## Anti-Pattern'ler

- Cakismayi gormezden gelmek → sürüm sonrasi büyük krize döner
- Sadece "compromise" demek → genelci olmaktan kacin, somut cozum yaz
- Eskalasyon listesini bos birakmak → karar verici olmadan cozulemez bazen
- Bagimlilik dongusu (cycle) — A→B→A → bu mantiken yapilamaz, mutlaka kir
