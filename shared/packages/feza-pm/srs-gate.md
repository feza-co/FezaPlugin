# SRS Kapısı (feza-pm, zorunlu)

feza-pm ailesindeki **her** skill, referans alınacak bir SRS (Software Requirements Specification) bulunmadan çalışmaz. Bu kural kesindir ve skill'in kendi Adım 0'ından **önce** uygulanır. Bu dosya ile `references/input-discovery.md` çelişirse bu dosya geçerlidir.

## Kural 1 — SRS'i Bul

Glob ile şu sırayla ara (yalnızca bu konumlar; proje ağacını gezme):

1. Kullanıcı komutta bir yol verdiyse (`--srs=<yol>` ya da mesajda açık dosya yolu) yalnızca onu kullan.
2. Proje kökü: `SRS_*.md`, `SRS.md`
3. `docs/` altı: `docs/SRS_*.md`, `docs/SRS.md`

Birden fazla aday varsa:
- Aynı projenin sürümleriyse (`SRS_<proje>_v0.1.md`, `SRS_<proje>_v0.2.md`) en yüksek sürümü al.
- Farklı projelere aitse **TEK** `AskUserQuestion` ile hangisinin kullanılacağını sor (seçenekler: bulunan dosya adları).

## Kural 2 — "Tam SRS" Ölçütü

Bulunan dosya ancak şu üç koşulun **hepsini** sağlıyorsa geçerli SRS sayılır:

1. Amaç/kapsam bölümü var (ör. "Introduction", "Giriş", "Purpose", "Scope", "Product Overview", "Ürün Genel Bakışı").
2. Gereksinimler bölümü var (ör. "Requirements", "Gereksinimler", "Functional Requirements", "Fonksiyonel Gereksinimler").
3. En az **3 adet benzersiz ID'li fonksiyonel gereksinim** var (ör. `FR-001`, `FR-01`, `REQ-F-1`).

Koşullardan biri sağlanmıyorsa dosya SRS sayılmaz; Kural 3'e geç ve kullanıcıya hangi koşulun eksik olduğunu tek satırla söyle.

## Kural 3 — SRS Yoksa DUR

Geçerli SRS yoksa:

- Hiçbir çıktı dosyası **üretme**, taslak hazırlama.
- Brief **isteme**, "örnek senaryo" **önerme**, varsayımla ilerleme.
- README, BRIEF/IDEA dosyaları, kaynak kod, manifest (`package.json` vb.), git geçmişi, CI dosyaları gibi proje dizinini **okuma**; bunlar SRS'in yerini tutmaz.
- Kullanıcıya yalnızca şu mesajı ver (dil kullanıcının diline uyar) ve skill'i bitir:

> Bu skill bir SRS'e dayanarak çalışır ve projede geçerli bir SRS bulunamadı (`SRS_*.md` / `docs/SRS_*.md`). Önce `/feza-requirements:srs-generate` ile SRS üret (kod yoksa BRIEF modu proje fikrinden üretir), ardından bu komutu tekrar çalıştır. Farklı bir konumdaki SRS için `--srs=<yol>` ver.

## Kural 4 — SRS Varsa Kullanılacak Girdiler

İzin verilen girdiler, öncelik sırasıyla:

1. **SRS** (kanonik kaynak). Proje adı, amaç, kapsam, kullanıcı sınıfları, gereksinimler, kısıtlar ve varsayımlar buradan alınır.
2. **Önceki feza-pm çıktıları** (`SCOPE_*.md`, `WBS_*.md`, `ESTIMATES_*.md`, `STAKEHOLDERS_*.md`, `SWOT_*.md`, `ACTIVITIES_*.md` vb.). Skill'in bağımlılık tablosunda adı geçenler okunur.
3. **Kullanıcının bu oturumdaki cevapları** (gri nokta soruları).

Bunların dışında proje dizininden bağlam toplanmaz: README, BRIEF/IDEA, kaynak kod, TODO/FIXME taraması, manifest, git log, CODEOWNERS, CI dosyaları okunmaz.

## Kural 5 — Tutarlılık ve İzlenebilirlik

- Önceki bir feza-pm çıktısı SRS ile çelişirse **SRS geçerlidir**; çelişkiyi çıktının "Bilinen Boşluklar" bölümüne yaz.
- SRS'te cevabı olan bir konuyu kullanıcıya **sorma**. Gri nokta sorusu yalnızca SRS'te karşılığı olmayan kritik boşluklar için sorulur.
- SRS'ten türetilen kalemlerde ilgili gereksinim ID'sini ya da bölüm numarasını parantez içinde göster (ör. "Sipariş takibi (FR-012)", "Performans kısıtı (SRS §3.3.1)").
- Çıktının Kaynakça bölümünde ilk kaynak SRS dosyasının adı ve sürümüdür.
- Kullanıcı raporunda "Kullanılan input" satırı SRS dosya adını içerir.
