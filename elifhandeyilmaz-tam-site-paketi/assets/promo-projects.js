(() => {
  const promoCard = document.querySelector('.project-card .project-visual.visual-promo')?.closest('.project-card')
    || [...document.querySelectorAll('.project-card')].find((item) => {
      const heading = item.querySelector('.project-body h3')?.textContent?.toLocaleLowerCase('tr-TR') || '';
      return heading.includes('tanıtım') && heading.includes('iletişim');
    });

  if (!promoCard || promoCard.dataset.promoGalleryReady === 'true') return;

  // Yeni 16:9 mockuplar bu diziye eklenir; her çalışma kendi açıklamasıyla birlikte gösterilir.
  const projects = [
    {
      title: 'Grand Seyahat – Afiş Tasarımı',
      category: 'Tanıtım & İletişim Tasarımı',
      subtitle: 'Afiş ve Açık Hava Reklamı',
      image: 'assets/promo-projects/grand-seyahat-afis.webp',
      alt: 'Grand Seyahat için hazırlanan afiş tasarımının havaalanı reklam panosu mockupı',
      about: 'Grand Seyahat için hazırlanan çalışma; seyahat planlama, rezervasyon ve rehberlik hizmetlerini tek bir tanıtım afişinde anlaşılır biçimde sunmak üzere kurgulandı. Tasarım, yoğun yolcu trafiğine sahip havaalanı gibi kamusal alanlarda mesajın kısa sürede algılanmasını hedefler.',
      approach: 'Mor ve yeşil renk paletiyle güçlü bir kontrast oluşturuldu; sarı vurgu, kampanya mesajını odak noktasına taşıdı. Dairesel fotoğraf alanları ve rota çizgisi seyahat temasını desteklerken, başlık–hizmet–iletişim hiyerarşisi hızlı okunabilirlik sağlayacak şekilde düzenlendi.',
      roles: [
        'Konsept ve görsel dil geliştirme',
        'Afiş tasarımı ve sayfa düzeni',
        'Tipografi ve renk sistemi',
        'Mockup sunumu'
      ]
    },
    {
      title: 'Special Burger – Afiş Tasarımı',
      category: 'Tanıtım & İletişim Tasarımı',
      subtitle: 'Ürün Tanıtımı ve Mekân İçi Reklam',
      image: 'assets/promo-projects/special-burger-afis.webp',
      alt: 'Special Burger için hazırlanan ürün afişinin restoran içi ışıklı reklam panosu mockupı',
      about: 'Special Burger için hazırlanan çalışma; ürünün iştah açıcı görselini, fiyat bilgisini ve sipariş kanalını tek bir güçlü tanıtım afişinde bir araya getirir. Restoran içinde uzaktan fark edilecek ve kısa sürede okunacak bir iletişim dili hedeflenmiştir.',
      approach: 'Siyah zemin ve sarı vurgu rengiyle yüksek kontrast oluşturuldu. Ürünün fotoğraf ve illüstrasyon arasında bölünen ana görseli afişin odağına yerleştirildi; fiyat, slogan ve sipariş bilgileri net bir hiyerarşiyle desteklendi.',
      roles: [
        'Konsept ve görsel dil geliştirme',
        'Afiş tasarımı ve sayfa düzeni',
        'Fotoğraf manipülasyonu ve illüstrasyon',
        'Mockup sunumu'
      ]
    },
    {
      title: 'Eğitim Zamanı – Etkinlik Afişi',
      category: 'Tanıtım & İletişim Tasarımı',
      subtitle: 'Etkinlik Duyurusu ve Kurumsal İletişim',
      image: 'assets/promo-projects/egitim-zamani-afis.webp',
      alt: 'Eğitim Zamanı için hazırlanan etkinlik afişinin kurumsal mekân içi ışıklı pano mockupı',
      about: 'Eğitim Zamanı için hazırlanan etkinlik afişi; eğitmen buluşmasını, etkinlik tarihini ve ana mesajı kurumsal bir duyuru diliyle aktarır. Çalışma, eğitim ve seminer alanlarında hızlı fark edilmek üzere kurgulanmıştır.',
      approach: 'Siyah, beyaz ve sarıdan oluşan sınırlı renk paleti kurumsal ve güçlü bir görünüm sağlar. Siyah-beyaz portre kolajı etkinliğin çok sesli yapısını vurgularken; kavisli alanlar ve büyük başlık tarih, saat ve etkinlik adını belirgin bir okuma sırasına taşır.',
      roles: [
        'Konsept ve görsel dil geliştirme',
        'Etkinlik afişi tasarımı',
        'Portre kolajı ve tipografik düzen',
        'Mockup sunumu'
      ]
    },
    {
      title: 'Haydarpaşa Liman Hizmetleri – Dergi Reklamı',
      category: 'Tanıtım & İletişim Tasarımı',
      subtitle: 'Kurumsal İlan ve Hizmet Tanıtımı',
      image: 'assets/promo-projects/haydarpasa-liman-dergi-reklami.webp',
      alt: 'Haydarpaşa Liman Hizmetleri için hazırlanan tam sayfa dergi reklamı mockupı',
      about: 'Haydarpaşa Liman Hizmetleri için hazırlanan tam sayfa dergi ilanı; kurumun liman, acentelik, gümrük ve lojistik hizmetlerini tek bir kurumsal iletişim yüzeyinde sunar. Çalışma, denizcilik sektörüne yönelik yayınlarda marka güvenini ve hizmet çeşitliliğini görünür kılmak üzere tasarlanmıştır.',
      approach: 'Lacivert, beyaz ve mavi renk paleti kurumsal güven algısını destekler. Liman operasyonunu gösteren ana fotoğraf güçlü bir odak oluştururken dairesel detay görselleri hizmet kapsamını zenginleştirir; başlık, hizmet listesi ve iletişim alanları kolay taranabilir bir hiyerarşiyle düzenlenmiştir.',
      roles: [
        'Konsept ve kurumsal görsel dil geliştirme',
        'Dergi ilanı ve sayfa düzeni',
        'Fotoğraf seçimi ve kompozisyon',
        'Mockup sunumu'
      ]
    },
    {
      title: 'Yacht News – Yeni Sayı Dijital Tanıtımı',
      category: 'Tanıtım & İletişim Tasarımı',
      subtitle: 'Web Sitesi ve Sosyal Medya Duyurusu',
      image: 'assets/promo-projects/yacht-news-yeni-sayi-dijital-tanitim.webp',
      alt: 'Yacht News yeni sayı kapağının web sitesi ve sosyal medya uygulamalarını gösteren mockup',
      about: 'Yacht News Türkiye için hazırlanan çalışma, yeni sayının dergi kapağını web sitesi ve sosyal medya kanallarında eş zamanlı duyurmak üzere kurgulandı. Kapak tasarımının farklı ekranlarda tutarlı ve güçlü görünmesi amaçlandı.',
      approach: 'Koyu ahşap, bordo ve altın tonlarındaki premium ortam derginin yatçılık ve iş dünyası kimliğini destekler. Dizüstü bilgisayar ana kapak sunumunu öne çıkarırken telefon uygulaması sosyal medya paylaşımını gösterir; iki mecra ortak bir görsel dil içinde dengelenmiştir.',
      roles: [
        'Dijital kampanya görseli kurgusu',
        'Web ve sosyal medya uyarlamaları',
        'Kapak sunumu ve görsel hiyerarşi',
        'Mockup sunumu'
      ]
    },
    {
      title: 'Neta Sea – Yeni Sayı Dijital Tanıtımı',
      category: 'Tanıtım & İletişim Tasarımı',
      subtitle: 'Web Sitesi, Feed ve Hikâye Uygulamaları',
      image: 'assets/promo-projects/neta-sea-yeni-sayi-dijital-tanitim.webp',
      alt: 'Neta Sea 82. sayı için hazırlanan web sitesi, sosyal medya gönderisi ve hikâye uygulamaları mockupı',
      about: 'Neta Sea 82. sayı için hazırlanan dijital tanıtım seti; yeni sayı duyurusunu web sitesi, sosyal medya gönderisi ve hikâye formatlarında bütünlüklü biçimde sunar. Her mecra için içerik ölçeği korunurken ortak marka algısı sürdürülmüştür.',
      approach: 'Markanın lacivert ve mavi renkleri tüm ekranlara taşınarak güçlü bir dijital bütünlük oluşturuldu. Dergi kapağı ana odakta tutuldu; büyük sayı başlığı, kısa açıklamalar ve platforma özgü bilgi alanları net bir okuma sırasına göre yerleştirildi.',
      roles: [
        'Dijital iletişim konsepti',
        'Web kapak görseli tasarımı',
        'Feed ve hikâye uyarlamaları',
        'Mockup sunumu'
      ]
    },
    {
      title: 'Turizm – Üç Kırımlı Tanıtım Broşürü',
      category: 'Tanıtım & İletişim Tasarımı',
      subtitle: 'Basılı Tanıtım ve Seyahat İletişimi',
      image: 'assets/promo-projects/turizm-tanitim-brosuru.webp',
      alt: 'Turizm firması için hazırlanan üç kırımlı tanıtım broşürünün masa üstü mockupı',
      about: 'Turizm hizmetleri için hazırlanan üç kırımlı broşür; konaklama, gezi programı ve paket kapsamını tek bir basılı iletişim materyalinde düzenli biçimde sunar. Çalışma, potansiyel misafirlerin temel bilgileri hızlıca inceleyebilmesi amacıyla kurgulanmıştır.',
      approach: 'Lacivert, turuncu ve beyaz renk paleti güven veren ve enerjik bir seyahat dili oluşturur. Dalga biçimli geçişler deniz ve rota hissini desteklerken fotoğraflar, hizmet maddeleri ve iletişim bilgileri katlama düzenine uygun net bir hiyerarşiyle yerleştirilmiştir.',
      roles: [
        'Broşür konsepti ve görsel dil',
        'Üç kırımlı sayfa düzeni',
        'Tipografi ve bilgi hiyerarşisi',
        'Mockup sunumu'
      ]
    },
    {
      title: 'HeliPLAT – 10. Yıl Dijital Davetiyesi',
      category: 'Tanıtım & İletişim Tasarımı',
      subtitle: 'Etkinlik Davetiyesi ve Dijital Uyarlamalar',
      image: 'assets/promo-projects/heliplat-10-yil-dijital-davetiye.webp',
      alt: 'HeliPLAT 10. yıl kutlama davetiyesinin e-posta, web ve sosyal medya uygulamaları mockupı',
      about: 'HeliPLAT’ın 10. yıl kutlama kokteyli için hazırlanan dijital davetiye; etkinlik mesajını e-posta, web sitesi ve sosyal medya kanallarında tutarlı biçimde duyurur. Tasarım, kurumsal davet niteliğini korurken yıl dönümünün özel karakterini görünür kılar.',
      approach: 'Markanın kırmızı, siyah ve beyaz renkleri sade bir çerçeve sistemiyle kullanıldı. Helikopter görseli düşük yoğunlukta arka plana taşınırken etkinlik adı, tarih, konum ve LCV bilgileri tüm ekranlarda kolay okunacak ortak bir hiyerarşiyle düzenlendi.',
      roles: [
        'Dijital davetiye konsepti',
        'E-posta ve web uyarlaması',
        'Sosyal medya gönderisi ve hikâye uyarlaması',
        'Mockup sunumu'
      ]
    },
    {
      title: 'Ayşe & Yusuf – Nikâh Davetiyesi',
      category: 'Tanıtım & İletişim Tasarımı',
      subtitle: 'Özel Gün Davetiyesi ve Basılı İletişim',
      image: 'assets/promo-projects/ayse-yusuf-nikah-davetiyesi.webp',
      alt: 'Ayşe ve Yusuf için hazırlanan çiçek desenli nikâh davetiyesi mockupı',
      about: 'Ayşe ve Yusuf’un nikâh töreni için hazırlanan davetiye; tören bilgilerini zarif ve kişisel bir görsel dille sunar. Çalışma, basılı davetiyenin hatıra niteliğini güçlendirecek sade ve zamansız bir estetik üzerine kurulmuştur.',
      approach: 'Kırık beyaz dokulu kâğıt, altın yaldız etkisi ve ince botanik çizimler premium bir görünüm oluşturur. İsimler kaligrafik tipografiyle öne çıkarılırken tarih, aile ve konum bilgileri dengeli bir merkez yerleşimiyle okunabilir tutulmuştur.',
      roles: [
        'Davet konsepti ve görsel dil',
        'Botanik illüstrasyon düzeni',
        'Tipografi ve baskı yüzeyi kurgusu',
        'Mockup sunumu'
      ]
    },
    {
      title: 'XV. Ulusal Gemi ve Yat Tasarım Yarışması – Afiş Tasarımı',
      category: 'Tanıtım & İletişim Tasarımı',
      subtitle: 'Yarışma Duyurusu ve Kurumsal Afiş',
      image: 'assets/promo-projects/xv-ulusal-gemi-yat-tasarim-yarismasi-afis.webp',
      alt: 'XV. Ulusal Gemi ve Yat Tasarım Yarışması için hazırlanan afişin ışıklı pano mockupı',
      about: 'XV. Ulusal Gemi ve Yat Tasarım Yarışması için hazırlanan afiş; yarışma konusunu, son başvuru tarihini, ödülleri ve destekleyen kurumları tek bir duyuru yüzeyinde bir araya getirir. Çalışma, sektör profesyonelleri ve tasarım öğrencilerine yönelik açık çağrıyı görünür kılmak üzere tasarlanmıştır.',
      approach: 'Turkuaz, lacivert ve beyaz renk paleti denizcilik temasını kurumsal bir dille taşır. Yarışma logosu üst odakta konumlandırıldı; ödül sıralaması metalik madalya görselleriyle belirginleştirildi ve kurum logoları ile yasal bilgiler alt bölümde düzenli bir sistem içinde toplandı.',
      roles: [
        'Afiş konsepti ve kurumsal görsel dil',
        'Bilgi ve logo hiyerarşisi',
        'Ödül görselleştirmesi',
        'Mockup sunumu'
      ]
    },
    {
      title: 'Organik Zeytinyağı – Etiket ve Ambalaj Tasarımı',
      category: 'Tanıtım & İletişim Tasarımı',
      subtitle: 'Şişe Etiketi ve Ürün Ambalajı',
      image: 'assets/promo-projects/organik-zeytinyagi-etiket-ambalaj.webp',
      alt: 'Organik zeytinyağı için hazırlanan şişe etiketi ve kutu ambalajı mockupı',
      about: 'Organik zeytinyağı ürünü için hazırlanan etiket ve ambalaj çalışması; ürünün doğal, yerel ve seçkin karakterini satış noktasında güçlü biçimde yansıtmak üzere kurgulandı. Şişe ve kutu yüzeyleri ortak bir görsel sistem içinde ele alındı.',
      approach: 'Koyu zeytin yeşili zemin, altın tonlu çizgiler ve klasik çerçeve yapısı premium bir ürün algısı oluşturur. Zeytin illüstrasyonu ana odakta tutulurken marka, ürün türü ve hacim bilgileri kolay okunacak dengeli bir hiyerarşiyle düzenlendi.',
      roles: [
        'Etiket ve ambalaj konsepti',
        'Tipografi ve bilgi hiyerarşisi',
        'İllüstrasyon ve renk sistemi',
        'Mockup sunumu'
      ]
    },
    {
      title: 'Dalından Reçel Ailesi – Kavanoz Etiketleri',
      category: 'Tanıtım & İletişim Tasarımı',
      subtitle: 'Gıda Ambalajı ve Ürün Serisi',
      image: 'assets/promo-projects/dalindan-recel-kavanoz-etiketleri.webp',
      alt: 'Dalından Reçel Ailesi için hazırlanan kayısı ve çilek reçeli kavanoz etiketleri mockupı',
      about: 'Dalından Reçel Ailesi için hazırlanan kavanoz etiketi serisi; farklı reçel çeşitlerini aynı marka çatısı altında ayırt edilebilir ve tutarlı bir ürün ailesi olarak sunar. Tasarım, raf görünürlüğünü ve ürün çeşidinin hızlı algılanmasını hedefler.',
      approach: 'Her çeşit için meyveye özgü sıcak renkler kullanıldı; geometrik çerçeve ve beyaz bilgi alanı tüm seri boyunca korundu. Meyve illüstrasyonları ürün ayrımını güçlendirirken marka adı, çeşit ve net miktar bilgileri merkezde net bir hiyerarşiyle konumlandırıldı.',
      roles: [
        'Ürün ailesi görsel sistemi',
        'Kavanoz etiketi tasarımı',
        'İllüstrasyon ve renk kodlaması',
        'Mockup sunumu'
      ]
    },
    {
      title: 'Burgers Cafe & Bar – A3 Amerikan Servis',
      category: 'Tanıtım & İletişim Tasarımı',
      subtitle: 'Menü ve Masa Üstü İletişimi',
      image: 'assets/promo-projects/burgers-a3-amerikan-servis.webp',
      alt: 'Burgers Cafe and Bar için hazırlanan A3 Amerikan servis menü tasarımı mockupı',
      about: 'Burgers Cafe & Bar için hazırlanan A3 Amerikan servis; menü içeriğini doğrudan masa üzerinde sunarken mekânın marka dilini de güçlendiren işlevsel bir iletişim materyalidir. Ürün kategorileri ve seçenekler sipariş sürecini kolaylaştıracak biçimde düzenlenmiştir.',
      approach: 'Siyah zemin ve turuncu vurgu rengi güçlü, enerjik bir restoran kimliği oluşturur. Dairesel fotoğraf alanları ürünleri öne çıkarırken başlıklar, kategori isimleri ve menü maddeleri geniş yüzey üzerinde dengeli sütunlarla kolay taranabilir hâle getirildi.',
      roles: [
        'Menü konsepti ve görsel dil',
        'A3 Amerikan servis sayfa düzeni',
        'Fotoğraf maskeleme ve tipografi',
        'Mockup sunumu'
      ]
    },
    {
      title: 'Theatre Magazine – Dergi Kapağı',
      category: 'Tanıtım & İletişim Tasarımı',
      subtitle: 'Editoryal Kapak ve Magazin Yayını',
      image: 'assets/promo-projects/theatre-magazine-dergi-kapagi.webp',
      alt: 'Theatre Magazine için hazırlanan Alessandra Ambrosio temalı dergi kapağı mockupı',
      about: 'Theatre Magazine için hazırlanan kapak çalışması; ana dosya konusunu, röportaj başlıklarını ve sayı bilgilerini çağdaş bir magazin diliyle tek yüzeyde birleştirir. Kapak, haber rafında güçlü bir görsel etki ve hızlı içerik algısı oluşturmak üzere tasarlandı.',
      approach: 'Siyah, beyaz ve kırmızıdan oluşan yüksek kontrastlı palet editoryal dinamizmi destekler. Portre görseli geometrik alanlarla parçalanarak başlıkların arasına yerleştirildi; büyük masthead, dikey tipografi ve vurgu kutuları kontrollü bir asimetri içinde dengelendi.',
      roles: [
        'Kapak konsepti ve art direction',
        'Editoryal tipografi ve hiyerarşi',
        'Fotoğraf düzenleme ve kompozisyon',
        'Mockup sunumu'
      ]
    },
    {
      title: 'Magazin Dünyası – Kapak ve İç Sayfa Tasarımı',
      category: 'Tanıtım & İletişim Tasarımı',
      subtitle: 'Magazin Dergisi ve Editoryal Uygulama',
      image: 'assets/promo-projects/magazin-dunyasi-dergi-tasarimi.webp',
      alt: 'Magazin Dünyası için hazırlanan kapak ve açık iç sayfa tasarımı mockupı',
      about: 'Magazin Dünyası için hazırlanan çalışma; dergi kapağı ile gezi ve kırmızı halı içeriklerini taşıyan iç sayfa düzenini bütünlüklü bir yayın kimliği içinde sunar. Kapak ve içerik sayfaları, farklı haber türlerinde ortak bir editoryal dil kuracak şekilde tasarlandı.',
      approach: 'Büyük beyaz masthead ve tam sayfa kapak fotoğrafı güçlü bir raf görünürlüğü sağlar. Sarı ve siyah vurgu alanları kapak haberlerini ayrıştırırken iç sayfalarda geniş fotoğraflar, kısa metin blokları ve renkli etiketler akıcı bir okuma ritmi oluşturur.',
      roles: [
        'Dergi görsel kimliği ve kapak tasarımı',
        'İç sayfa mizanpajı',
        'Tipografi ve içerik hiyerarşisi',
        'Mockup sunumu'
      ]
    }
  ];

  const modal = document.createElement('div');
  modal.className = 'project-lightbox promo-project-lightbox';
  modal.hidden = true;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'promo-lightbox-title');
  modal.innerHTML = `
    <div class="project-lightbox-backdrop" data-promo-close></div>
    <article class="project-lightbox-panel">
      <header class="project-lightbox-heading">
        <div>
          <span class="project-lightbox-category"></span>
          <h2 id="promo-lightbox-title"></h2>
          <p class="promo-lightbox-subtitle"></p>
        </div>
        <button class="project-lightbox-close" type="button" aria-label="Projeyi kapat" data-promo-close><span aria-hidden="true">×</span></button>
      </header>
      <div class="project-lightbox-body">
        <div class="project-lightbox-media">
          <div class="project-lightbox-loading" aria-hidden="true"></div>
          <img class="project-lightbox-image" alt="">
        </div>
        <aside class="project-lightbox-details">
          <span class="project-lightbox-counter" aria-live="polite"></span>
          <section><h3>Proje Hakkında</h3><p class="promo-lightbox-about"></p></section>
          <section><h3>Tasarım Yaklaşımı</h3><p class="promo-lightbox-approach"></p></section>
          <section class="project-lightbox-role-section"><h3>Projedeki Rolüm</h3><ul class="project-lightbox-roles"></ul></section>
        </aside>
      </div>
    </article>
    <button class="project-lightbox-arrow project-lightbox-prev" type="button" aria-label="Önceki projeyi göster"><span aria-hidden="true">‹</span></button>
    <button class="project-lightbox-arrow project-lightbox-next" type="button" aria-label="Sonraki projeyi göster"><span aria-hidden="true">›</span></button>`;
  document.body.appendChild(modal);

  const panel = modal.querySelector('.project-lightbox-panel');
  const image = modal.querySelector('.project-lightbox-image');
  const loading = modal.querySelector('.project-lightbox-loading');
  const title = modal.querySelector('#promo-lightbox-title');
  const category = modal.querySelector('.project-lightbox-category');
  const subtitle = modal.querySelector('.promo-lightbox-subtitle');
  const counter = modal.querySelector('.project-lightbox-counter');
  const about = modal.querySelector('.promo-lightbox-about');
  const approach = modal.querySelector('.promo-lightbox-approach');
  const roles = modal.querySelector('.project-lightbox-roles');
  const previousButton = modal.querySelector('.project-lightbox-prev');
  const nextButton = modal.querySelector('.project-lightbox-next');
  const closeButton = modal.querySelector('.project-lightbox-close');
  let activeIndex = 0;
  let lastFocusedElement = null;

  const updateNavigation = () => {
    const enabled = projects.length > 1;
    previousButton.disabled = !enabled;
    nextButton.disabled = !enabled;
    previousButton.classList.toggle('is-hidden', !enabled);
    nextButton.classList.toggle('is-hidden', !enabled);
  };

  const renderProject = (index) => {
    activeIndex = (index + projects.length) % projects.length;
    const project = projects[activeIndex];
    panel.scrollTop = 0;
    modal.classList.add('is-loading');
    loading.hidden = false;
    image.removeAttribute('src');
    image.alt = project.alt;
    title.textContent = project.title;
    category.textContent = project.category;
    subtitle.textContent = project.subtitle;
    counter.textContent = `${activeIndex + 1} / ${projects.length}`;
    about.textContent = project.about;
    approach.textContent = project.approach;
    roles.replaceChildren(...project.roles.map((role) => {
      const item = document.createElement('li');
      const check = document.createElement('span');
      check.setAttribute('aria-hidden', 'true');
      check.textContent = '✓';
      item.append(check, document.createTextNode(role));
      return item;
    }));

    const preloader = new Image();
    preloader.decoding = 'async';
    preloader.onload = () => {
      image.src = project.image;
      modal.classList.remove('is-loading');
      loading.hidden = true;
    };
    preloader.onerror = () => {
      modal.classList.remove('is-loading');
      loading.hidden = true;
      image.alt = `${project.alt} yüklenemedi`;
    };
    preloader.src = project.image;
    updateNavigation();
  };

  const openModal = (index = 0) => {
    lastFocusedElement = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('project-lightbox-open');
    renderProject(index);
    requestAnimationFrame(() => {
      modal.classList.add('is-open');
      closeButton.focus({ preventScroll: true });
    });
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    document.body.classList.remove('project-lightbox-open');
    window.setTimeout(() => {
      modal.hidden = true;
      lastFocusedElement?.focus?.({ preventScroll: true });
    }, 220);
  };

  const showPrevious = () => projects.length > 1 && renderProject(activeIndex - 1);
  const showNext = () => projects.length > 1 && renderProject(activeIndex + 1);

  promoCard.dataset.promoGalleryReady = 'true';
  promoCard.style.position = 'relative';
  promoCard.classList.add('has-project-modal');
  promoCard.querySelectorAll('.project-card-hitarea, .promo-card-modal-trigger').forEach((element) => element.remove());
  const trigger = document.createElement('button');
  trigger.className = 'project-card-modal-trigger promo-card-modal-trigger';
  trigger.type = 'button';
  trigger.setAttribute('aria-label', 'Tanıtım & İletişim Tasarımı projelerini galeride görüntüle');
  trigger.addEventListener('click', () => openModal(0));
  promoCard.appendChild(trigger);

  previousButton.addEventListener('click', showPrevious);
  nextButton.addEventListener('click', showNext);
  modal.querySelectorAll('[data-promo-close]').forEach((element) => element.addEventListener('click', closeModal));

  let swipeStart = null;
  panel.addEventListener('touchstart', (event) => {
    if (event.touches.length !== 1) return;
    const touch = event.touches[0];
    swipeStart = { x: touch.clientX, y: touch.clientY };
  }, { passive: true });
  panel.addEventListener('touchend', (event) => {
    if (!swipeStart || event.changedTouches.length !== 1) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - swipeStart.x;
    const deltaY = touch.clientY - swipeStart.y;
    swipeStart = null;
    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.2) return;
    deltaX > 0 ? showPrevious() : showNext();
  }, { passive: true });

  document.addEventListener('keydown', (event) => {
    if (modal.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPrevious();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showNext();
    } else if (event.key === 'Tab') {
      const focusable = [...modal.querySelectorAll('button:not([disabled])')]
        .filter((element) => !element.classList.contains('is-hidden'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
})();
