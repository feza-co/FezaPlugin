# Elicitation Methods

Kaynaklar: ISO/IEC/IEEE 29148:2018 (stakeholder needs), BABOK v3 (elicitation techniques), Dillman et al. (anket tasarimi).

## Genel Tanim

Requirements elicitation, yazilim gereksinimlerinin belirlenmesi surecidir; paydaslarin ihtiyaclarini anlamak ve gereksinimleri olusturmak icin vazgecilmezdir.

## 4 Yontem

### 1. Interview

Paydaslarla bire bir ya da grup gorusmeleri yaparak ihtiyac, beklenti ve gereksinimleri toplama yontemi.

#### 4 Soru Tipi (siparis sureci ornegi)

| Tip | Tanim | Ornek (Siparis Sureci) |
|-----|-------|---------------------------|
| **Closed-Ended** | Sayisal / evet-hayir / kisitli secenek | "Gunde kac telefon/cagri merkezi siparisi aliniyor?" |
| **Open-Ended** | Acik fikir | "Musteriler siparisi nasil veriyor?" |
| **Probing** | Derinlestirme | "Bunu biraz acabilir misiniz?" |
| **Strategic** | Cozumsel | "Siparis sureci nasil iyilestirilebilir?" |

> Ornek stratejik sorular: "Siparis sureci nasil iyilestirilebilir? Musterilerin urun iade sayisini nasil azaltabiliriz?"

#### Iyi Mulakat Kurallari

- Yonlendirici (leading) soru sorma
- Tek seferde tek soru
- Sessizlikten korkma — bekle
- Anlamadigini sor (probing)
- Daha sonra deyilebilecek seyleri pesinden git
- Notes / kaydet (onamla)

### 2. Questionnaire

Hazirlanan bir soru listesini paydaslara dagitarak ihtiyac ve gereksinim bilgisi toplama yontemi. Anketler, genis bir paydas grubuna hizla ulasmak icin etkilidir.

#### Iyi Anket Tasarimi Ilkeleri

- Tehdit icermeyen, ilgi cekici sorularla basla
- Maddeleri mantiksal bolumlere grupla
- Cevaplayiciyi yoracak uzun anketlerden kacin
- Soru tiplerini karistir (Likert, coktan secmeli, acik uclu)
- Yayinlamadan once pilot test yap
- Hassas konularda anonimlik sagla

#### Tipik Yapi

| Bolum | Amac | Soru sayisi |
|-------|------|-------------|
| A. Tanitim | Anketin amaci, sure | 1-2 |
| B. Demografik | Profil | 3-5 (profil formu) |
| C. Mevcut surec | As-is | 5-7 |
| D. Beklenti | To-be | 5-7 |
| E. Acik geri bildirim | Sürpriz fikirler | 1-2 |

#### Profil Bolumu (ornek 5 soru)
1. Rol / gorev
2. Yas grubu
3. Dijital arac kullanim sikligi (Hic / Ara sira / Gunluk)
4. Mobil uygulama kullanim sikligi (Hic / Ara sira / Gunluk)
5. Mevcut sistemi daha once kullandiniz mi (Evet/Hayir)

### 3. Workshop / JAD (Joint Application Design)

Cok stakeholder + hizli konsensus icin. Tipik 2-3 saatlik yapi:

| Adim | Sure | Aktivite |
|------|------|----------|
| Tanisma + amac | 15 dk | – |
| As-is mapping | 30 dk | Mevcut surec |
| Pain points | 30 dk | Brainstorming |
| Ideation | 45 dk | Aday cozumler |
| Onceliklendirme | 30 dk | Dot voting |
| Aksiyon | 15 dk | Sonraki adim |

### 4. Observation / Etnografi

Mevcut surec varken kullanici davranisini dogrudan izleme. Ozellikle "soyledigiyle yaptigi farkli" kullanicilar icin.

| Boyut | Detay |
|-------|-------|
| Kim | Hedef rolu temsil eden 3-5 kisi |
| Nerede | Dogal is ortami (lab degil) |
| Sure | 1-3 saat / kullanici |
| Tip | Pasif (sadece izle) / Etnografik (notes) / Shadowing (konus) |
| Etik | Onam, anonim |

## Yontem Karsilastirma

| Yontem | Avantaj | Dezavantaj | Cost |
|--------|---------|------------|------|
| Interview | Derinlik | Az kisi, time-intensive | Orta |
| Questionnaire | Cok kisi, sayisal | Sig | Dusuk |
| Workshop | Konsensus, hizli | Koordinasyon zor | Yuksek |
| Observation | Gercek davranis | Time-intensive, etik | Orta-yuksek |

## Siparis Sureci Icin Stratejik Soru Ornekleri

- "Siparis sureci nasil iyilestirilebilir?"
- "Musterilerin urun iade sayisini nasil azaltabiliriz?"
- "Bir siparisin isleme alinma suresini nasil kisaltabiliriz?"

→ Stratejik sorular cevap aramaz; cozum kanali acar.

## Requirements Surecindeki Roller

- Customer
- Users
- Project Manager — Requirement Analyst
- Team Lead
- Software Architect
- Developer Team
- Quality Assurance Team

→ Her birinin perspektifi farkli soru ister.

## Sablon Mulakat Soru Bankasi (rol bazli)

### Sponsor / Yonetim
- (Closed) Bu projenin yatirim getirisi (ROI) ne zaman beklenir?
- (Open) Bu sistemin success'i sizin icin neye benziyor?
- (Probing) "Verimlilik" derken hangi metriği kastediyorsunuz?
- (Strategic) Sirket stratejinizle bu sistem nasil hizali?

### End User
- (Closed) Gunde ortalama kac islem yapiyorsunuz?
- (Open) Mevcut surecte sizi en cok ne zorluyor?
- (Probing) Bunu yasadiginizda ne hissediyorsunuz?
- (Strategic) Daha iyi bir surec nasil olurdu?

### Operator / Maintainer
- (Closed) Sistem ne sıklıkla bakimi gerektiriyor?
- (Open) Hangi senaryolar siz arazi ariyorsunuz?
- (Probing) Bu sorun ne sıklıkla cikar?
- (Strategic) Bakimi nasil azaltabiliriz?

### Regulator / Compliance
- (Closed) Hangi standartlara uyum zorunlu?
- (Open) Audit'te en cok hangi alanlar incelenir?
- (Probing) Bu uyumsuzlugun spesifik etkisi nedir?
- (Strategic) Compliance'i operasyonel hale nasil getirebiliriz?
