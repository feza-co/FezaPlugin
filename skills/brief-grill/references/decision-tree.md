# Karar Ağacı — Kök Dallar ve Alt Dallar

Bu dosya, `brief-grill` skill'inin Adım 1'de kurduğu karar ağacının başlangıç iskeletidir.
Ağaç **statik değildir**: her cevaptan sonra budanır (cevapla kapanan dal çıkar) ve genişler
(cevabın açtığı yeni alt dal eklenir). Burada yalnızca tipik kök dallar ve doğabilecek alt
dallar örneklenir.

> Kural: **Bağımlı karar önce gelir.** Bir dalın sorusu, kendisine bağımlı olan alt dalı
> açıyorsa önce o sorulur.

## Kök Dal 1 — Problem ve kimin problemi
- Şu an bu problem nasıl çözülüyor (elle, rakip araçla, hiç çözülmüyor)?
- Problem ne sıklıkta yaşanıyor (günlük / haftalık / tek seferlik)?
- Problemin maliyeti ölçüldü mü (süre kaybı, para, hata oranı)?
- Problem kimin diliyle anlatılıyor: son kullanıcı mı, yönetim mi, teknik ekip mi?
- Alt dal: Problemin şiddeti → yatırım büyüklüğünü belirler.

## Kök Dal 2 — Hedef kullanıcı ve paydaşlar
- Birincil kullanıcı kim (rol, teknik düzey)?
- İkincil kullanıcılar var mı?
- Karar verici / ödeyen kim?
- Etkilenen ama karar vermeyen paydaşlar (destek, operasyon, yasal)?
- Alt dal: Kullanıcı sayısı → ölçek ve teknoloji seçimini belirler.

## Kök Dal 3 — Çözümün ne olduğu / ne OLMADIĞI
- Çözüm tek cümleyle ne?
- **Kapsam dışı** olanlar neler (bilerek yapılmayacaklar)?
- Çözüm mevcut bir sistemin yerini mi alacak, yanında mı duracak?
- İlk sürümde (MVP) ne var, ne yok?
- Entegre olunacak dış sistemler var mı?
- Alt dal: Kapsam dışı → sonraki tüm dalları budar (özellik, kısıt, risk).

## Kök Dal 4 — Temel özellikler ve öncelik
- Zorunlu (olmazsa olmaz) özellikler hangileri?
- İkinci sürüme ertelenebilecekler hangileri?
- Özellikler arasında zorunlu bir sıra/bağımlılık var mı?
- "İyi olurdu" ile "olmazsa olmaz" ayrımı yapıldı mı (MoSCoW)?
- Alt dal: Öncelik → teslim biçimini ve kısıtları etkiler.

## Kök Dal 5 — Kısıtlar
Her kısıt türü ayrı bir alt daldır; brief'te yoksa varsayım işaretlenir.
- **Süre:** teslim tarihi sabit mi, esnek mi? Ne zaman?
- **Bütçe:** sabit üst sınır var mı? Yaklaşık aralık?
- **Ekip:** kaç kişi, hangi roller, dışarıdan destek var mı?
- **Teknoloji/platform:** belirli stack, tarayıcı, cihaz ya da platform zorunlu mu?
- **Veri ve gizlilik:** hangi veriler işlenecek; KVKK/GDPR kapsamında mı?
- **Yasal/regülasyon:** sektör regülasyonu (finans, sağlık) var mı?
- **Operasyon:** barındırma, bakım, destek kimin sorumluluğunda?

## Kök Dal 6 — Başarı ölçütleri
- Başarı nasıl ölçülecek (ölçülebilir gösterge)?
- Sayısal hedef var mı (ör. "X kullanıcı", "Y saniye altı yanıt")?
- Başarısızlık nasıl anlaşılır (durdurma ölçütü)?
- Ölçüm ne zaman yapılacak (lansman sonrası kaç hafta)?
- Alt dal: Başarı ölçütü → doğrulama yöntemini belirler.

## Kök Dal 7 — Riskler ve varsayımlar
- Doğrulanmamış kritik varsayımlar neler?
- Teknik risk (bilinmeyen teknoloji, entegrasyon)?
- Takvim/bütçe riski?
- Kabul/benimseme riski (kullanıcı kullanır mı)?
- Her risk için ilk önlem nedir?
- Alt dal: Varsayım → doğrulama sorusuna dönüşür.

## Kök Dal 8 — Teslim biçimi
- Teslim edilecek çıktı ne (çalışan yazılım, doküman seti, prototip)?
- Hangi formatta (kaynak kod, Markdown doküman, demo)?
- Kime teslim edilecek (müşteri, ekip, yatırımcı)?
- Kabul kriteri kim tarafından ve nasıl onaylanacak?

## Alt Dal Doğuran Cevap Örnekleri
- "Regülatif sektör" cevabı → Kök Dal 5 altında **uyum/denetim dalı** açar.
- "Çok kullanıcılı" cevabı → Kök Dal 2 altında **kimlik/rol yönetimi dalı** açar.
- "MVP" cevabı → Kök Dal 4'ü daraltır, kapsam dışını netleştirir.
- "Sabit tarih" cevabı → Kök Dal 5 (süre) ile Kök Dal 6 (başarı ölçütü) arasında bağımlılık kurar.

## Bağımlılık Sırası (tipik)
1. Problem ve kullanıcı (Dal 1, 2) → her şeyin temeli
2. Çözüm ve kapsam dışı (Dal 3) → özellik ve kısıtları budar
3. Özellikler (Dal 4) + Kısıtlar (Dal 5) → birbirini sınırlar
4. Başarı ölçütü (Dal 6) → doğrulama ve riski etkiler
5. Riskler (Dal 7) + Teslim (Dal 8) → kapanış dalları

## Ek Kural — Bu Dosya Nasıl Kullanılır
- Bu dosya bir **kontrol listesi** değil, bir **iskelettir**; her dal brief'e göre açılır/kapanır.
- Brief'te cevabı zaten yazılı bir dal **sorulmaz** (Kural 5); doğrudan kapalı işaretlenir ve
  satırı `Kaynak: Dosya` etiketiyle karar tablosuna girer.
- Bu dosyadaki hiçbir örnek, kullanıcının fikrine zorla giydirilmez; ihtiyaç yoksa dal atlanır.
