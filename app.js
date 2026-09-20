const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const wa = (message) => `https://wa.me/${SITE.phone}?text=${encodeURIComponent(message)}`;
const generalWA = () => wa("Assalamu'alaikum, saya ingin berkonsultasi mengenai paket Umroh Samira Travel.");
const packageWA = (name) => wa(`Assalamu'alaikum, saya ingin mendapatkan informasi mengenai paket Umroh ${name} dari Evi Samira Pusat.`);

const packageCard = (p) => `
  <article class="package-card">
    <div class="package-image-wrap">
      ${p.imageSecondary ? `
        <div class="package-image package-image-collage">
          <div class="collage-panel" style="background-image:url('${p.image}')"><span class="collage-label">Umroh</span></div>
          <div class="collage-panel" style="background-image:url('${p.imageSecondary}')"><span class="collage-label">Turki</span></div>
        </div>` : `<div class="package-image" style="background-image:url('${p.image}')"></div>`}
      <span class="package-badge" ${p.badgeColor ? `style="background:${p.badgeColor}; color:#fff;"` : ''}>${p.label}</span>
    </div>
    <div class="package-body">
      <h3>${p.name}</h3>
      <div class="price-pill">
        <div class="price">${p.price}</div>
        <small> / pax</small>
      </div>
      <div class="package-meta">
        <span class="meta-chip">◷ ${p.duration}</span>
        <span class="meta-chip">✈ ${p.airline || 'Saudia Airlines'}</span>
        <span class="meta-chip">◉ ${p.city}</span>
      </div>
      <div class="package-actions">
        <a class="btn btn-glass" target="_blank" rel="noreferrer" href="${packageWA(p.name)}">Tanya</a>
        <a class="btn btn-gold" href="#/paket/${p.slug}">Detail</a>
        <a class="btn btn-green" href="#/daftar?paket=${encodeURIComponent(p.name)}">Daftar</a>
      </div>
    </div>
  </article>
`;

const videoCard = (v) => {
  const isLocal = v.isLocal || v.localSrc;
  const frameContent = isLocal ? `
    <video controls preload="metadata" style="width:100%; height:100%; object-fit:cover; border:0; background:#061d29;">
      <source src="${v.localSrc}" type="video/mp4">
      Browser Anda tidak mendukung pemutaran video.
    </video>
  ` : `
    <iframe
      src="https://www.youtube-nocookie.com/embed/${v.id}?rel=0"
      title="${v.title}"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen></iframe>
  `;
  const actionLink = isLocal ? `
    <a class="video-link" href="${v.localSrc}" target="_blank" download>
      <span>Putar / Unduh Video</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
    </a>
  ` : `
    <a class="video-link" href="${v.url}" target="_blank" rel="noreferrer">
      <span>Buka di YouTube</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
    </a>
  `;

  return `
    <article class="video-testimonial-card">
      <div class="video-frame-container">
        ${frameContent}
      </div>
      <div class="video-card-body">
        <div class="video-badge"><span>▶</span> ${isLocal ? 'Video Dokumentasi' : 'Video Jamaah'}</div>
        <h3 class="video-title">${v.title}</h3>
        <p class="video-desc">${v.desc}</p>
        ${actionLink}
      </div>
    </article>
  `;
};

const quoteCard = (t) => `
  <article class="quote-card">
    <div>
      <div class="quote-mark">“</div>
      <p class="quote-text">${t.quote}</p>
    </div>
    <div class="quote-author">
      <div class="author-avatar">${t.name.charAt(0)}</div>
      <div class="author-info">
        <strong>${t.name}</strong>
        <small>${t.city}</small>
      </div>
    </div>
  </article>
`;

function initTheme() {
  const saved = localStorage.getItem('evi_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved === 'dark' || (!saved && prefersDark);
  setTheme(isDark ? 'dark' : 'light');
}

function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.classList.add('dark-mode');
    localStorage.setItem('evi_theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
    document.body.classList.remove('dark-mode');
    localStorage.setItem('evi_theme', 'light');
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') === 'dark';
  setTheme(current ? 'light' : 'dark');
}

function nav() {
  $('#header').innerHTML = `
    <nav class="nav-capsule">
      <a class="brand" href="#/" aria-label="Beranda Evi Samira">
        <img class="brand-logo" src="assets/samira-logo.png?v=2" alt="Samira — Sahabat Umroh dan Haji Keluarga Anda">
      </a>
      <div class="nav-links">
        <a href="#/paket" data-nav="paket">Paket Umroh</a>
        <a href="#/jadwal" data-nav="jadwal">Jadwal</a>
        <a href="#/profil-samira" data-nav="profil-samira">Profil Samira</a>
        <a href="#/testimoni" data-nav="testimoni">Testimoni</a>
        <a href="#/tentang" data-nav="tentang">Tentang Mitra</a>
        <a href="#/dokumentasi" data-nav="dokumentasi">Dokumentasi</a>
        <a href="#/artikel" data-nav="artikel">Artikel</a>
        <a href="#/faq" data-nav="faq">FAQ</a>
        <a href="#/kontak" data-nav="kontak">Kontak</a>
        <a class="btn btn-gold" target="_blank" rel="noreferrer" href="${generalWA()}">Konsultasi WhatsApp</a>
      </div>
      <div class="nav-actions">
        <button class="theme-toggle" id="theme-toggle" aria-label="Ganti mode gelap (navy) atau terang" title="Ganti Mode Gelap (Navy) / Terang">
          <svg class="icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <svg class="icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
        <button class="mobile-toggle" aria-label="Buka menu navigasi">☰</button>
      </div>
    </nav>
  `;

  const toggle = $('.mobile-toggle');
  const links = $('.nav-links');
  toggle.onclick = () => links.classList.toggle('open');
  $$('.nav-links a').forEach(a => {
    a.onclick = () => links.classList.remove('open');
  });

  const themeBtn = $('#theme-toggle');
  if (themeBtn) {
    themeBtn.onclick = () => toggleTheme();
  }
}

function updateActiveNav(activeNavKey) {
  $$('.nav-links a[data-nav]').forEach(el => {
    if (el.getAttribute('data-nav') === activeNavKey) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

function footer() {
  $('#footer').innerHTML = `
    <div class="footer">
      <div class="container footer-grid">
        <div>
          <a class="brand" href="#/" aria-label="Beranda Evi Samira">
            <img class="brand-logo" src="assets/samira-logo.png?v=2" alt="Samira — Sahabat Umroh dan Haji Keluarga Anda">
          </a>
          <p style="margin-top: 16px;">Teman konsultasi Umroh terpercaya Anda di Jakarta Timur. Membantu calon jamaah memahami pilihan paket dan persiapan ibadah dengan sepenuh hati.</p>
        </div>
        <div>
          <h4>Informasi</h4>
          <a href="#/profil-samira">Profil PT. Samira Ali Wisata</a>
          <a href="#/paket">Paket Umroh</a>
          <a href="#/jadwal">Jadwal Keberangkatan</a>
          <a href="#/legalitas">Legalitas & Keamanan</a>
          <a href="#/faq">Pertanyaan Umum</a>
        </div>
        <div>
          <h4>Hubungi Evi Samira</h4>
          <p><b>${SITE.agent}</b><br>Konsultasi WhatsApp: ${SITE.phoneDisplay}</p>
          <a class="btn btn-gold" style="margin-top: 14px; width: fit-content;" target="_blank" rel="noreferrer" href="${generalWA()}">Konsultasi Sekarang ↗</a>
        </div>
      </div>
      <div class="container copyright">
        © ${new Date().getFullYear()} ${SITE.agent}. Mitra Resmi Samira Travel. Informasi paket dapat berubah sewaktu-waktu; mohon konfirmasi sebelum pendaftaran.
      </div>
    </div>
  `;
}

const hero = () => `
  <section class="hero container">
    <div class="hero-glass-card">
      <div class="hero-content">
        <div class="eyebrow">✦ Mitra Resmi Samira Travel • Pusat</div>
        <h1>Rencanakan perjalanan suci dengan hati yang lebih tenang.</h1>
        <p>Bersama Evi Samira Pusat, dapatkan ruang konsultasi yang hangat dan terpercaya untuk menemukan paket Umroh yang selaras dengan kenyamanan Anda dan keluarga.</p>
        <div class="hero-actions">
          <a href="#/paket" class="btn btn-gold">Lihat Paket Umroh →</a>
          <a target="_blank" rel="noreferrer" href="${generalWA()}" class="btn btn-outline">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            Konsultasi via WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>
`;

function home() {
  return `
    ${hero()}
    <section class="trust-strip container">
      <div class="trust-grid">
        <div class="trust-item">
          <div class="trust-icon-box">✦</div>
          <div class="trust-text">Konsultasi Personal & Hangat</div>
        </div>
        <div class="trust-item">
          <div class="trust-icon-box">🛡️</div>
          <div class="trust-text">Fokus Kenyamanan Jamaah</div>
        </div>
        <div class="trust-item">
          <div class="trust-icon-box">💎</div>
          <div class="trust-text">Informasi Transparan & Jelas</div>
        </div>
        <div class="trust-item">
          <div class="trust-icon-box">★</div>
          <div class="trust-text">Mitra Resmi Samira Travel</div>
        </div>
      </div>
    </section>

    <!-- Samira Travel Profile Bento Highlight Banner -->
    <section class="section" style="padding-top: 0; padding-bottom: 20px;">
      <div class="container">
        <div class="profile-overview-card" style="margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 20px;">
            <div>
              <div class="eyebrow">✦ Profil Resmi Penyelenggara</div>
              <h2 style="font-family: var(--ios-display-font); font-size: clamp(1.8rem, 3.2vw, 2.4rem); color: var(--ios-navy); margin: 8px 0 12px;">
                PT. SAMIRA ALI WISATA (Samira Travel)
              </h2>
              <p style="color: var(--ios-secondary); max-width: 680px; font-size: 0.98rem; line-height: 1.65;">
                Penyelenggara Perjalanan Ibadah Umroh resmi berizin Kemenag RI <b>PPIU No. 137 Tahun 2020</b>. Dikenal sebagai <b>Juaranya Umroh New Normal</b> dan pelopor program syariah <b>"Umroh Dulu Bayar Belakangan"</b> yang didukung fatwa DSN-MUI.
              </p>
            </div>
            <a href="#/profil-samira" class="btn btn-gold" style="white-space: nowrap;">Pelajari Profil Lengkap →</a>
          </div>
          <div class="profile-meta-chips" style="margin-bottom: 0;">
            <span class="profile-meta-chip">📜 PPIU No. 137 Tahun 2020</span>
            <span class="profile-meta-chip">🏢 Kantor Pusat Duren Sawit, Jakarta Timur</span>
            <span class="profile-meta-chip">⚖️ Fatwa Resmi DSN-MUI</span>
            <span class="profile-meta-chip">✈️ Rekor 1 Pesawat Penuh Tiap 3 Hari</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="eyebrow">Pilihan perjalanan</div>
            <h2 class="section-title">Paket untuk rencana ibadah Anda</h2>
          </div>
          <a href="#/paket" class="btn btn-glass">Lihat semua paket →</a>
        </div>
        <div class="notice">
          <span class="notice-icon">✈️</span>
          <div>Penerbangan langsung bersama <b>Saudia Airlines (Jakarta - Jeddah Direct)</b>. Tersedia paket resmi <b>Safara</b>, <b>Safawi</b>, <b>Sukari</b>, <b>Majol VIP</b>, dan <b>Plus Turki</b> dengan pilihan durasi 9, 12, dan 16 Hari.</div>
        </div>
        <div class="package-grid">
          ${packages.map(packageCard).join('')}
        </div>
      </div>
    </section>

    <section class="section section-soft">
      <div class="container about-grid">
        <div class="about-visual-card" onclick="openLightbox('assets/foto-evi-samira.png', 'Evi Handayani — Mitra Resmi Samira Travel Pusat & Tour Leader BNSP')" role="button" tabindex="0">
          <div class="about-visual-overlay"></div>
          <div class="about-floating-pill">
            <strong>Evi Handayani</strong>
            <small>Mitra Resmi Samira Travel Pusat • Tour Leader BNSP</small>
          </div>
        </div>
        <div>
          <div class="eyebrow">Tentang Mitra</div>
          <h2 class="section-title">Membantu Anda memilih dengan lebih tenang & yakin.</h2>
          <p class="section-text">Evi Samira Pusat adalah mitra resmi Samira Travel yang siap membantu calon jamaah memperoleh informasi paket secara detail dan mempersiapkan kebutuhan Umroh dengan komunikasi yang nyaman.</p>
          <div class="features-bento">
            <div class="feature-widget">
              <div class="feature-widget-icon">◌</div>
              <h3>Konsultasi Fleksibel</h3>
              <p>Diskusikan kebutuhan lansia, fasilitas hotel, jadwal cuti, atau paket keluarga Anda.</p>
            </div>
            <div class="feature-widget">
              <div class="feature-widget-icon">◇</div>
              <h3>Penjelasan Transparan</h3>
              <p>Kami bantu membedah rincian biaya, maskapai, dan fasilitas sebelum Anda menentukan pilihan.</p>
            </div>
          </div>
          <a class="btn btn-green" href="#/tentang">Tentang Evi Samira →</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="eyebrow">Cerita langsung jamaah</div>
            <h2 class="section-title">Kepercayaan dimulai dari pelayanan tulus.</h2>
          </div>
          <a href="#/testimoni" class="btn btn-glass">Lihat Semua Testimoni →</a>
        </div>
        <div class="video-testimonial-grid" style="margin-bottom: 30px;">
          ${testimonialVideos.map(videoCard).join('')}
        </div>
        <div class="quote-grid">
          ${testimonials.map(quoteCard).join('')}
        </div>
      </div>
    </section>

    <section class="section section-soft">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="eyebrow">Momen perjalanan</div>
            <h2 class="section-title">Dokumentasi yang penuh makna.</h2>
          </div>
          <a href="#/dokumentasi" class="btn btn-glass">Lihat Semua Galeri</a>
        </div>
        <div class="gallery-bento">
          <div class="gallery-item big" style="background-image:url('assets/banner-cover-samira.png')" onclick="openLightbox('assets/banner-cover-samira.png', 'Banner Informasi & Layanan Evi Samira — Pusat')" role="button" tabindex="0">
            <div class="gallery-label">
              <span>Informasi & Layanan Evi Samira</span>
              <span>🔍 Perbesar</span>
            </div>
          </div>
          <div class="gallery-item" style="background-image:url('assets/dokumentasi/dokumentasi-keberangkatan-poster.jpg')" onclick="openLightbox('assets/dokumentasi/dokumentasi-keberangkatan-poster.jpg', 'Dokumentasi Keberangkatan Akbar — 12 Titik Perjalanan Jamaah Samira Travel')" role="button" tabindex="0">
            <div class="gallery-label">
              <span>Keberangkatan Akbar</span>
              <span>🔍</span>
            </div>
          </div>
          <div class="gallery-item" style="background-image:url('assets/dokumentasi/manasik-bersama-jamaah.jpg')" onclick="openLightbox('assets/dokumentasi/manasik-bersama-jamaah.jpg', 'Bimbingan Manasik Umroh Bersama Jamaah Samira Travel & CEO')" role="button" tabindex="0">
            <div class="gallery-label">
              <span>Manasik Akbar</span>
              <span>🔍</span>
            </div>
          </div>
          <div class="gallery-item" style="background-image:url('assets/dokumentasi/jamaah-kabin-pesawat.jpg')" onclick="openLightbox('assets/dokumentasi/jamaah-kabin-pesawat.jpg', 'Keceriaan Jamaah Samira Travel di Kabin Pesawat Menuju Baitullah')" role="button" tabindex="0">
            <div class="gallery-label">
              <span>Kabin Pesawat</span>
              <span>🔍</span>
            </div>
          </div>
          <div class="gallery-item" style="background-image:url('assets/dokumentasi/panitia-manasik-akbar.jpg')" onclick="openLightbox('assets/dokumentasi/panitia-manasik-akbar.jpg', 'Pendampingan Ramah Panitia Manasik Umroh Samira Travel')" role="button" tabindex="0">
            <div class="gallery-label">
              <span>Panitia Manasik</span>
              <span>🔍</span>
            </div>
          </div>
          <div class="gallery-item" style="background-image:url('assets/profile/samira-tangguh-new-normal.jpg')" onclick="openLightbox('assets/profile/samira-tangguh-new-normal.jpg', 'Keberangkatan Akbar 1 Pesawat Penuh — Juaranya Umroh New Normal')" role="button" tabindex="0">
            <div class="gallery-label">
              <span>1 Pesawat Penuh</span>
              <span>🔍</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    ${ctaBand()}
  `;
}

const ctaBand = () => `
  <section class="cta-band container">
    <div class="cta-card">
      <div class="cta-text">
        <h2>Ada yang ingin ditanyakan?</h2>
        <p>Mulai dengan percakapan singkat dan nyaman bersama Evi Samira Pusat.</p>
      </div>
      <a class="btn btn-gold" target="_blank" rel="noreferrer" href="${generalWA()}">Konsultasi WhatsApp ↗</a>
    </div>
  </section>
`;

const pageHero = (title, desc) => `
  <section class="page-hero container">
    <div class="page-hero-card">
      <div class="eyebrow">Evi Samira • Mitra Resmi Samira Travel</div>
      <h1>${title}</h1>
      <p>${desc}</p>
    </div>
  </section>
`;

function packagesPage() {
  return `
    ${pageHero('Paket Umroh Samira Travel', 'Pilihan paket resmi Umroh Saudia Airlines Direct Jakarta - Jeddah dengan varian Safara, Safawi, Sukari, Majol VIP, dan Program Plus Turki.')}
    <section class="section">
      <div class="container">
        <div class="notice" style="margin-bottom: 26px;">
          <span class="notice-icon">✈️</span>
          <div><b>Penerbangan Langsung Tanpa Transit:</b> Menggunakan maskapai <b>Saudia Airlines</b> (Jakarta - Jeddah Direct). Tersedia pilihan program <b>9 Hari</b>, <b>12 Hari</b>, dan <b>16 Hari</b> dengan opsi kamar Quad, Triple, dan Double.</div>
        </div>
        <div class="package-grid">
          ${packages.map(packageCard).join('')}
        </div>
      </div>
    </section>
    ${ctaBand()}
  `;
}

function detail(p) {
  return `
    ${pageHero(p.name, `${p.label} • Durasi ${p.duration} bersama ${p.airline || 'Saudia Airlines'} (Direct Jakarta - Jeddah)`)}
    <section class="section">
      <div class="container detail-layout">
        <div class="detail-main-card">
          <div class="detail-image" style="background-image:url('${p.image}')"></div>
          <div class="detail-content">
            <span class="package-badge" ${p.badgeColor ? `style="background:${p.badgeColor}; color:#fff;"` : ''}>${p.label}</span>
            
            ${p.pricingOptions ? `
              <h2 style="margin-top: 24px;">Pilihan Tipe Kamar & Durasi (Harga Resmi)</h2>
              <p style="color:var(--ios-secondary); font-size:0.92rem; margin-bottom:14px;">Harga resmi paket ${p.name} per jamaah sesuai pilihan durasi program dan kapasitas kamar hotel:</p>
              <div class="schedule-card" style="margin: 14px 0 24px; border-radius: var(--ios-radius-lg);">
                <table class="schedule" style="font-size: 0.88rem;">
                  <thead>
                    <tr>
                      <th>Program Durasi</th>
                      <th>QUAD (Sekamar 4)</th>
                      <th>TRIPLE (Sekamar 3)</th>
                      <th>DOUBLE (Sekamar 2)</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${p.pricingOptions.map(po => `
                      <tr>
                        <td><b>${po.duration}</b></td>
                        <td style="color: var(--ios-green); font-weight: 700;">${po.quad}</td>
                        <td style="color: var(--ios-gold); font-weight: 700;">${po.triple}</td>
                        <td style="color: var(--ios-navy); font-weight: 700;">${po.double}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            ` : ''}

            ${p.departureDates ? `
              <h2 style="margin-top: 24px;">Jadwal Keberangkatan Resmi</h2>
              <div style="background: rgba(9, 41, 56, 0.04); border: 1px solid var(--ios-glass-border); border-radius: var(--ios-radius-md); padding: 18px 20px; margin: 14px 0 24px;">
                <div style="margin-bottom: 12px;">
                  <strong style="color: var(--ios-navy); display: block; margin-bottom: 4px; font-size: 0.92rem;">🗓️ Keberangkatan September 2026:</strong>
                  <div style="font-size: 0.88rem; color: var(--ios-secondary); line-height: 1.6;">${p.departureDates.sep}</div>
                </div>
                <div>
                  <strong style="color: var(--ios-navy); display: block; margin-bottom: 4px; font-size: 0.92rem;">🗓️ Keberangkatan Oktober 2026:</strong>
                  <div style="font-size: 0.88rem; color: var(--ios-secondary); line-height: 1.6;">${p.departureDates.okt}</div>
                </div>
                <div style="margin-top: 12px; font-size: 0.82rem; color: var(--ios-green); font-weight: 600;">
                  ✈️ Rute Penerbangan: Jakarta - Jeddah (Direct Langsung bersama Saudia Airlines)
                </div>
              </div>
            ` : ''}

            <h2>Fasilitas Termasuk</h2>
            <ul class="data-list">
              ${p.facilities.map(x => `<li>${x}</li>`).join('')}
            </ul>

            <h2>Rencana Perjalanan / Itinerary</h2>
            <ul class="data-list">
              ${p.itinerary.map(x => `<li>${x}</li>`).join('')}
            </ul>
          </div>
        </div>
        <aside class="side-card">
          <span class="package-badge" ${p.badgeColor ? `style="background:${p.badgeColor}; color:#fff;"` : ''}>${p.label}</span>
          <h3>${p.name}</h3>
          <div class="price-pill">
            <div class="price">${p.price}</div>
            <small> / pax</small>
          </div>
          <div class="side-specs">
            <div class="side-spec-item"><span>Durasi</span><strong>${p.duration}</strong></div>
            <div class="side-spec-item"><span>Keberangkatan</span><strong>${p.departure}</strong></div>
            <div class="side-spec-item"><span>Kota Asal</span><strong>${p.city}</strong></div>
            <div class="side-spec-item"><span>Maskapai</span><strong>${p.airline || 'Saudia Airlines'}</strong></div>
            <div class="side-spec-item"><span>Akomodasi</span><strong>${p.hotel}</strong></div>
          </div>
          <a class="btn btn-green" style="width:100%; margin-bottom: 10px;" target="_blank" rel="noreferrer" href="${packageWA(p.name)}">Tanya Paket via WhatsApp</a>
          <a class="btn btn-gold" style="width:100%" href="#/daftar?paket=${encodeURIComponent(p.name)}">Daftar Minat Sekarang</a>
        </aside>
      </div>
    </section>
  `;
}

function schedule() {
  return `
    ${pageHero('Jadwal Keberangkatan & Daftar Harga', 'Jadwal resmi penerbangan Saudia Airlines Direct Jakarta - Jeddah dengan pilihan durasi 9 Hari, 12 Hari, dan 16 Hari.')}
    <section class="section">
      <div class="container">
        <div class="notice" style="margin-bottom: 30px;">
          <span class="notice-icon">✈️</span>
          <div><b>Penerbangan Langsung Tanpa Transit:</b> Menggunakan armada <b>Saudia Airlines</b> rute Jakarta (CGK) langsung ke Jeddah (JED). Tersedia pilihan kapasitas kamar <b>QUAD (sekamar ber-4)</b>, <b>TRIPLE (sekamar ber-3)</b>, dan <b>DOUBLE (sekamar ber-2)</b>.</div>
        </div>

        <!-- Matrix Jadwal Resmi 9, 12, 16 Hari -->
        ${OFFICIAL_SCHEDULE_MATRIX.map(s => `
          <div class="profile-overview-card" style="margin-bottom: 34px; padding: 28px 24px;">
            <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 14px; margin-bottom: 18px; border-bottom: 1px solid var(--ios-glass-border); padding-bottom: 16px;">
              <div>
                <span class="package-badge" style="position:static; width:fit-content; background: #092938; color:#fff;">Program ${s.duration}</span>
                <h3 style="font-family: var(--ios-display-font); font-size: clamp(1.4rem, 2.2vw, 1.8rem); color: var(--ios-navy); margin: 8px 0 4px;">
                  Paket Umroh ${s.duration} — Saudia Airlines
                </h3>
                <div style="font-size: 0.88rem; color: var(--ios-secondary);">
                  Rute: <b>${s.route}</b> • Maskapai: <b>${s.airline}</b>
                </div>
              </div>
              <a href="${generalWA()}" target="_blank" rel="noreferrer" class="btn btn-green" style="font-size: 0.85rem; padding: 10px 18px;">
                Konsultasi Kuota ↗
              </a>
            </div>

            <!-- Tanggal Keberangkatan -->
            <div style="background: rgba(12, 112, 107, 0.05); border: 1px solid rgba(12, 112, 107, 0.12); border-radius: var(--ios-radius-md); padding: 14px 18px; margin-bottom: 20px;">
              <strong style="color: var(--ios-green); font-size: 0.86rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">
                🗓️ Tanggal Keberangkatan Tersedia:
              </strong>
              ${s.dates.sep !== '—' ? `<div style="font-size: 0.88rem; color: var(--ios-ink); margin-bottom: 4px;"><b>September 2026:</b> ${s.dates.sep}</div>` : ''}
              ${s.dates.okt !== '—' ? `<div style="font-size: 0.88rem; color: var(--ios-ink);"><b>Oktober 2026:</b> ${s.dates.okt}</div>` : ''}
            </div>

            <!-- Matrix Table -->
            <div class="schedule-card" style="border-radius: var(--ios-radius-lg);">
              <table class="schedule" style="font-size: 0.88rem;">
                <thead>
                  <tr>
                    <th>Paket</th>
                    <th>QUAD (Sekamar 4)</th>
                    <th>TRIPLE (Sekamar 3)</th>
                    <th>DOUBLE (Sekamar 2)</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  ${s.tiers.map(t => `
                    <tr>
                      <td>
                        <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:${t.color}; margin-right:8px;"></span>
                        <b style="font-size: 0.95rem; color: var(--ios-navy);">${t.name}</b>
                      </td>
                      <td style="color: var(--ios-green); font-weight: 700;">Rp ${t.quad}</td>
                      <td style="color: var(--ios-gold); font-weight: 700;">Rp ${t.triple}</td>
                      <td style="color: var(--ios-navy); font-weight: 700;">Rp ${t.double}</td>
                      <td>
                        <a href="#/paket/umroh-${t.name.toLowerCase()}" class="btn btn-glass" style="padding: 5px 12px; font-size: 0.78rem;">
                          Detail
                        </a>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
    ${ctaBand()}
  `;
}

function about() {
  return `
    ${pageHero('Tentang Evi Samira', 'Ruang konsultasi Umroh yang hangat dan profesional bersama Evi Samira Pusat.')}
    <section class="section">
      <div class="container about-grid">
        <div class="about-visual-card" onclick="openLightbox('assets/foto-evi-samira.png', 'Evi Handayani — Mitra Resmi Samira Travel Pusat & Tour Leader BNSP')" role="button" tabindex="0">
          <div class="about-visual-overlay"></div>
          <div class="about-floating-pill">
            <strong>Evi Handayani</strong>
            <small>Mitra Resmi Samira Travel Pusat • Tour Leader BNSP</small>
          </div>
        </div>
        <div>
          <div class="eyebrow">Mitra Resmi Samira Travel</div>
          <h2 class="section-title">Memberi ketenangan sejak percakapan pertama.</h2>
          <p class="section-text">Sebagai mitra resmi Samira Travel, Evi Samira Pusat membantu calon jamaah mendapatkan informasi, memahami pilihan paket, serta menentukan rencana ibadah yang paling selaras dengan kebutuhan keluarga.</p>
          <p class="section-text" style="margin-top: 14px;">Evi Handayani memegang sertifikasi kompetensi BNSP di bidang Pemimpin Perjalanan Wisata (Tour Leader) serta pengalaman lapangan yang mumpuni. Nilai ini menjadi jaminan kenyamanan bagi para jamaah dalam setiap konsultasi.</p>
          <div class="features-bento" style="margin-top: 20px;">
            <div class="feature-widget">
              <div class="feature-widget-icon">📜</div>
              <h3>Kompetensi BNSP</h3>
              <p>Tersertifikasi resmi sebagai Pemimpin Perjalanan Wisata / Tour Leader.</p>
            </div>
            <div class="feature-widget">
              <div class="feature-widget-icon">🧭</div>
              <h3>Tour Leader Berpengalaman</h3>
              <p>Memahami dinamika dan kebutuhan jamaah di Tanah Suci.</p>
            </div>
            <div class="feature-widget">
              <div class="feature-widget-icon">🤝</div>
              <h3>Pendampingan Personal</h3>
              <p>Membantu memahami detail teknis dari sebelum berangkat.</p>
            </div>
            <div class="feature-widget">
              <div class="feature-widget-icon">🕋</div>
              <h3>Standar Samira Travel</h3>
              <p>Prosedur pendaftaran dan keberangkatan mengikuti standar resmi Samira Travel.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-soft credential-section">
      <div class="container">
        <div class="credential-intro">
          <div class="eyebrow">Kompetensi & Kredensial</div>
          <h2 class="section-title">Pelayanan yang didukung sertifikasi resmi.</h2>
          <p class="section-text">Bukti pembekalan dan kompetensi resmi Evi Handayani sebagai Tour Leader tersertifikasi.</p>
        </div>
        <div class="credential-grid">
          <article class="credential-card">
            <div class="credential-image">
              <img src="assets/credentials/pelatihan-tour-leader.png" alt="Sertifikat internalisasi skill Tour Leader Evi Handayani">
            </div>
            <h3>Pelatihan Tour Leader</h3>
            <p>Pembekalan internalisasi keterampilan pemimpin perjalanan wisata.</p>
            <span class="credential-caption">Pelatihan Profesional</span>
          </article>
          <article class="credential-card">
            <div class="credential-image">
              <img src="assets/credentials/kartu-bnsp-tour-leader.png" alt="Kartu sertifikasi profesi Tour Leader Evi Handayani">
            </div>
            <h3>Kartu Sertifikasi Profesi</h3>
            <p>Identitas resmi kompetensi Tour Leader BNSP.</p>
            <span class="credential-caption">Lisensi BNSP</span>
          </article>
          <article class="credential-card">
            <div class="credential-image">
              <img src="assets/credentials/sertifikat-kompetensi-bnsp.png" alt="Sertifikat kompetensi BNSP Evi Handayani">
            </div>
            <h3>Sertifikat Kompetensi BNSP</h3>
            <p>Standar keahlian Pemimpin Perjalanan Wisata nasional.</p>
            <span class="credential-caption">Sertifikat Resmi</span>
          </article>
        </div>
      </div>
    </section>
    <div class="container" style="margin-top: -30px; margin-bottom: 50px; text-align: center;">
      <a class="btn btn-gold" href="#/profil-samira">Pelajari Profil Lengkap PT. Samira Ali Wisata (Kantor Pusat & Legalitas) →</a>
    </div>
    ${ctaBand()}
  `;
}

function samiraProfilePage() {
  const p = SAMIRA_PROFILE;
  return `
    ${pageHero(p.companyName, 'Profil resmi PT. Samira Ali Wisata (Samira Travel) — Juaranya Umroh New Normal, Berizin Resmi PPIU No. 137 Tahun 2020 Kemenag RI.')}

    <section class="section">
      <div class="container">
        <!-- Overview Card -->
        <div class="profile-overview-card">
          <div class="eyebrow">✦ Profil Perusahaan & Visi Pelayanan</div>
          <h2 style="font-family: var(--ios-display-font); font-size: clamp(2rem, 3.4vw, 2.6rem); color: var(--ios-navy); margin: 10px 0 14px;">
            Melayani Tamu Allah Sepenuh Hati Sesuai Sunnah
          </h2>
          <p style="color: var(--ios-secondary); font-size: 1.05rem; line-height: 1.7; max-width: 860px;">
            ${p.mission}
          </p>
          <div class="profile-meta-chips">
            <span class="profile-meta-chip">🏢 Berdiri Sejak ${p.establishedYear}</span>
            <span class="profile-meta-chip">👤 Founder & CEO: ${p.founder}</span>
            <span class="profile-meta-chip">📜 ${p.legalitas.skNumber}</span>
            <span class="profile-meta-chip">📍 ${p.headOffice}</span>
            <span class="profile-meta-chip">📞 Telp: ${p.phone}</span>
          </div>
          <div style="background: rgba(12, 112, 107, 0.06); border: 1px solid rgba(12, 112, 107, 0.15); border-radius: var(--ios-radius-md); padding: 18px 22px; color: var(--ios-navy);">
            <strong style="display: block; color: var(--ios-green); font-size: 0.95rem; margin-bottom: 4px;">Komitmen Pelayanan Holistik:</strong>
            <p style="margin: 0; font-size: 0.92rem; color: var(--ios-secondary); line-height: 1.6;">${p.serviceCommitment}</p>
          </div>
        </div>

        <!-- Bento Grid 1: Founder & Kantor Pusat + Legalitas PPIU -->
        <div class="profile-bento-grid">
          <!-- Founder & Kantor Pusat -->
          <article class="profile-bento-card">
            <div class="profile-bento-img">
              <img src="assets/profile/founder-kantor-pusat.png" alt="Ust. H. Fauzi Wahyu Muntoro CEO Samira Travel dan Kantor Pusat">
            </div>
            <span class="package-badge" style="position:static; margin-bottom:10px; width:fit-content;">Kepemimpinan & Kantor Pusat</span>
            <h3>Didirikan oleh ${p.founder}</h3>
            <p style="margin-bottom: 14px;">
              SAMIRA Travel didirikan oleh <b>${p.founder}</b> pada tahun <b>${p.establishedYear}</b>. Saat ini memiliki kantor pusat megah dan representatif di <b>${p.headOffice}</b>.
            </p>
            <p>
              Dengan komitmen profesionalisme yang tinggi, kantor pusat Samira Travel menjadi pusat kendali operasional, manasik, dan verifikasi berkas jamaah dari seluruh Indonesia.
            </p>
          </article>

          <!-- Legalitas Resmi PPIU -->
          <article class="profile-bento-card">
            <div class="profile-bento-img">
              <img src="assets/profile/legalitas-ppiu-kemenag.png" alt="Legalitas Resmi PPIU 137 Tahun 2020 Kemenag RI PT Samira Ali Wisata">
            </div>
            <span class="package-badge" style="position:static; margin-bottom:10px; width:fit-content; background: #0c706b; color:#fff;">Izin Resmi Kemenag</span>
            <h3>${p.legalitas.skNumber}</h3>
            <p style="margin-bottom: 14px;">
              Berbadan hukum resmi atas nama <b>${p.legalitas.entity}</b> dengan izin operasional Kementerian Agama RI <b>${p.legalitas.skNumber}</b>.
            </p>
            <p>
              Sangat penting bagi calon jamaah untuk memastikan track record dan legalitas penyelenggara ibadah umroh guna menjamin kepastian jadwal, visa, penerbangan, serta kenyamanan selama di Tanah Suci.
            </p>
          </article>
        </div>

        <!-- Bento Grid 2: Umroh Dulu Bayar Belakangan & Fatwa DSN-MUI -->
        <div class="profile-overview-card">
          <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 30px; align-items: center;" class="detail-layout">
            <div>
              <span class="package-badge" style="position:static; margin-bottom:12px; width:fit-content; background: #d6ad58; color:#051923;">Inovasi Syariah Terpercaya</span>
              <h2 style="font-family: var(--ios-display-font); font-size: 2rem; color: var(--ios-navy); margin: 8px 0 12px;">
                ${p.programTalangan.title}
              </h2>
              <p style="color: var(--ios-secondary); font-size: 0.96rem; line-height: 1.7; margin-bottom: 16px;">
                ${p.programTalangan.description}
              </p>
              <div class="notice" style="margin-bottom: 0;">
                <span class="notice-icon">🛡️</span>
                <div>Diawasi dan dikaji langsung berlandaskan ketentuan <b>Majelis Ulama Indonesia (MUI)</b> dan <b>Dewan Syari'ah Nasional</b> dengan akad Murabahah yang murni dan transparan.</div>
              </div>
            </div>
            <div class="profile-bento-img" style="margin: 0;">
              <img src="assets/profile/umroh-dulu-bayar-belakangan-mui.jpg" alt="Fasilitas Umroh Dulu Bayar Belakangan Majelis Ulama Indonesia">
            </div>
          </div>

          <h3 style="font-family: var(--ios-display-font); font-size: 1.4rem; color: var(--ios-navy); margin: 34px 0 14px;">
            Landasan 6 Fatwa DSN-MUI yang Mendasari Program:
          </h3>
          <div class="fatwa-grid">
            ${p.programTalangan.fatwaList.map(f => `
              <div class="fatwa-card">
                <span class="fatwa-badge">${f.code}</span>
                <h4>${f.title}</h4>
                <p>${f.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Bento Grid 3: Track Record & Ketangguhan Samira -->
        <div class="profile-bento-grid" style="grid-template-columns: 1fr 1.2fr; align-items: center;">
          <div class="profile-bento-img" style="margin: 0;">
            <img src="assets/profile/samira-tangguh-new-normal.jpg" alt="Samira Tangguh Travel Indonesia Bangkit Rekor Jamaah">
          </div>
          <div class="profile-bento-card">
            <span class="package-badge" style="position:static; margin-bottom:12px; width:fit-content;">${p.trackRecord.badge}</span>
            <h2 style="font-family: var(--ios-display-font); font-size: 1.9rem; color: var(--ios-navy); margin-bottom: 14px;">
              ${p.trackRecord.title}
            </h2>
            <p style="color: var(--ios-secondary); font-size: 0.95rem; line-height: 1.7; margin-bottom: 16px;">
              ${p.trackRecord.story}
            </p>
            <div style="background: rgba(9, 41, 56, 0.04); border-left: 3px solid var(--ios-gold); padding: 14px 18px; border-radius: 0 var(--ios-radius-sm) var(--ios-radius-sm) 0;">
              <strong style="color: var(--ios-navy); display: block; margin-bottom: 4px; font-size: 0.9rem;">Ketepatan Jadwal Teruji:</strong>
              <p style="margin: 0; font-size: 0.88rem; color: var(--ios-secondary);">${p.trackRecord.highlight}</p>
            </div>
          </div>
        </div>

        <!-- Bento Grid 4: Anugerah Rekor MURI -->
        <div class="profile-bento-grid" style="grid-template-columns: 1fr 1.2fr; align-items: center;">
          <div class="profile-bento-img" style="margin: 0;">
            <img src="assets/profile/anugerah-rekor-muri.jpg" alt="Piagam Penghargaan Museum Rekor-Dunia Indonesia MURI kepada PT Samira Ali Wisata">
          </div>
          <div class="profile-bento-card">
            <span class="package-badge" style="position:static; margin-bottom:12px; width:fit-content; background: #d6ad58; color:#051923;">🏆 ${p.rekorMuri.title}</span>
            <h2 style="font-family: var(--ios-display-font); font-size: 1.9rem; color: var(--ios-navy); margin-bottom: 14px;">
              Rekor MURI — Jamaah Terbanyak di Masa Pandemi
            </h2>
            <p style="color: var(--ios-secondary); font-size: 0.95rem; line-height: 1.7; margin-bottom: 16px;">
              ${p.rekorMuri.description}
            </p>
            <div class="profile-meta-chips">
              <span class="profile-meta-chip">📜 ${p.rekorMuri.number}</span>
              <span class="profile-meta-chip">🏅 ${p.rekorMuri.category}</span>
              <span class="profile-meta-chip">📅 ${p.rekorMuri.date}</span>
            </div>
          </div>
        </div>

        <!-- Bento Grid 5: Perlengkapan Umroh -->
        <div class="profile-bento-grid">
          <article class="profile-bento-card" style="grid-column: 1 / -1;">
            <div class="profile-bento-img">
              <img src="assets/profile/perlengkapan-umroh.jpg" alt="Perlengkapan Umroh Eksklusif Samira Travel">
            </div>
            <span class="package-badge" style="position:static; margin-bottom:10px; width:fit-content; background: #0c706b; color:#fff;">🎒 ${p.perlengkapan.title}</span>
            <h3>${p.perlengkapan.title}</h3>
            <p style="margin-bottom: 14px;">${p.perlengkapan.description}</p>
            <div class="profile-meta-chips">
              ${p.perlengkapan.items.map(item => `<span class="profile-meta-chip">✓ ${item}</span>`).join('')}
            </div>
          </article>
        </div>

        <!-- Bento Grid 6: Keunggulan Mudah, Murah, Mantap -->
        <div class="profile-overview-card">
          <div class="eyebrow">✦ Kenapa Pilih Samira Travel?</div>
          <h2 style="font-family: var(--ios-display-font); font-size: clamp(1.8rem, 3vw, 2.4rem); color: var(--ios-navy); margin: 10px 0 20px;">
            Keunggulan: <span style="color: var(--ios-green);">Mudah</span>, <span style="color: var(--ios-gold);">Murah</span>, <span style="color: var(--ios-navy);">Mantap</span>
          </h2>
          <div class="profile-bento-grid" style="grid-template-columns: repeat(3, 1fr); gap: 20px;">
            ${p.keunggulan.slides.map((slide, idx) => `
              <article class="profile-bento-card" style="cursor:pointer;" onclick="openLightbox('${slide.image}', 'Keunggulan Samira Travel — ${['Mudah','Murah','Mantap'][idx]}')">
                <div class="profile-bento-img">
                  <img src="${slide.image}" alt="Keunggulan Samira Travel ${['Mudah','Murah','Mantap'][idx]}">
                </div>
                <span class="package-badge" style="position:static; margin-bottom:10px; width:fit-content; background: ${['#27ae60','#d6ad58','#0c706b'][idx]}; color:#fff;">${['🟢 MUDAH','🟡 MURAH','🔵 MANTAP'][idx]}</span>
                <ul style="list-style: none; padding: 0; margin: 0;">
                  ${slide.points.map(pt => `<li style="padding: 4px 0; font-size: 0.88rem; color: var(--ios-secondary); line-height: 1.5;">✦ ${pt}</li>`).join('')}
                </ul>
              </article>
            `).join('')}
          </div>
        </div>

        <!-- Galeri Dokumen & Slide Presentasi Resmi -->
        <div class="section-head" style="margin-top: 50px;">
          <div>
            <div class="eyebrow">Dokumen & Bukti Resmi</div>
            <h2 class="section-title">Visual Profil & Dokumen Samira Travel</h2>
          </div>
          <span class="meta-chip">Klik gambar untuk memperbesar</span>
        </div>
        <div class="profile-docs-grid">
          ${p.gallery.map((doc, idx) => `
            <div class="profile-doc-card" onclick="openLightbox('${doc.image}', '${doc.caption}')" role="button" tabindex="0">
              <div class="profile-doc-img-wrap">
                <img src="${doc.image}" alt="${doc.caption}" loading="lazy">
                <span class="profile-doc-badge">${doc.tag}</span>
              </div>
              <div class="profile-doc-body">
                <p>${doc.caption}</p>
                <div class="profile-doc-hint">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                  Perbesar Dokumen
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    ${ctaBand()}
  `;
}

function gallery() {
  return `
    ${pageHero('Galeri & Dokumentasi Jamaah', 'Dokumentasi resmi manasik akbar, keberangkatan, suasana penerbangan, dan pendampingan ibadah bersama Evi Samira Pusat.')}
    <section class="section">
      <div class="container">
        <!-- Trust Notice -->
        <div class="notice" style="margin-bottom: 30px;">
          <span class="notice-icon">🛡️</span>
          <div><b>Dokumentasi Otentik Samira Travel:</b> Seluruh foto merupakan dokumentasi nyata dari kegiatan manasik, penerbangan jamaah, dan pelayanan perjalanan ibadah ke Tanah Suci.</div>
        </div>

        <!-- Featured Section 1: Informasi & Layanan Evi Samira -->
        <div class="profile-overview-card" style="margin-bottom: 28px;">
          <div style="display: grid; grid-template-columns: 1.25fr 1fr; gap: 28px; align-items: center;" class="detail-layout">
            <div class="profile-bento-img" style="margin: 0; cursor: pointer;" onclick="openLightbox('assets/banner-cover-samira.png', 'Banner Informasi & Layanan Evi Samira — Pusat')">
              <img src="assets/banner-cover-samira.png" alt="Banner Informasi & Layanan Evi Samira — Sahabat Umroh & Haji Keluarga Anda">
              <div style="position: absolute; bottom: 12px; right: 12px; background: rgba(9, 41, 56, 0.85); color: #fff; padding: 6px 14px; border-radius: 999px; font-size: 0.78rem; backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.2);">
                🔍 Klik untuk Zoom
              </div>
            </div>
            <div>
              <span class="package-badge" style="position:static; margin-bottom:12px; width:fit-content; background: #0c706b; color:#fff;">📌 Informasi Mitra</span>
              <h2 style="font-family: var(--ios-display-font); font-size: clamp(1.5rem, 2.3vw, 1.9rem); color: var(--ios-navy); margin: 8px 0 12px;">
                Informasi & Layanan Evi Samira
              </h2>
              <p style="color: var(--ios-secondary); font-size: 0.92rem; line-height: 1.6; margin-bottom: 14px;">
                Informasi legalitas resmi, Akreditasi KAN RI, Izin Kemenag RI (SISKO PATUH), jaminan 5 Pasti Umroh, kontak layanan konsultasi 0831 8997 4363, serta jaringan maskapai penerbangan terpercaya Samira Travel.
              </p>
              <div class="profile-meta-chips" style="margin-bottom: 14px;">
                <span class="profile-meta-chip">✅ Izin Kemenag & KAN RI</span>
                <span class="profile-meta-chip">⭐ 5 Pasti Umroh</span>
                <span class="profile-meta-chip">📞 WA 0831 8997 4363</span>
              </div>
              <button class="btn btn-green" onclick="openLightbox('assets/banner-cover-samira.png', 'Banner Informasi & Layanan Evi Samira — Pusat')">
                Lihat Gambar Resolusi Penuh ↗
              </button>
            </div>
          </div>
        </div>

        <!-- Featured Section 2: Dokumentasi Keberangkatan Akbar -->
        <div class="profile-overview-card" style="margin-bottom: 36px;">
          <div style="display: grid; grid-template-columns: 1.25fr 1fr; gap: 28px; align-items: center;" class="detail-layout">
            <div class="profile-bento-img" style="margin: 0; cursor: pointer;" onclick="openLightbox('assets/dokumentasi/dokumentasi-keberangkatan-poster.jpg', 'Dokumentasi Keberangkatan Akbar — 12 Titik Perjalanan Jamaah Samira Travel')">
              <img src="assets/dokumentasi/dokumentasi-keberangkatan-poster.jpg" alt="Dokumentasi Keberangkatan Jamaah Samira Travel">
              <div style="position: absolute; bottom: 12px; right: 12px; background: rgba(9, 41, 56, 0.85); color: #fff; padding: 6px 14px; border-radius: 999px; font-size: 0.78rem; backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.2);">
                🔍 Klik untuk Zoom
              </div>
            </div>
            <div>
              <span class="package-badge" style="position:static; margin-bottom:12px; width:fit-content; background: #0c706b; color:#fff;">✈️ Dokumentasi Utama</span>
              <h2 style="font-family: var(--ios-display-font); font-size: clamp(1.6rem, 2.5vw, 2.1rem); color: var(--ios-navy); margin: 8px 0 14px;">
                Dokumentasi Keberangkatan Akbar Jamaah
              </h2>
              <p style="color: var(--ios-secondary); font-size: 0.95rem; line-height: 1.7; margin-bottom: 16px;">
                Kompilasi 12 momen penting perjalanan jamaah Samira Travel: mulai dari kekhidmatan manasik akbar di tanah air, kebersamaan di bandara internasional, kenyamanan penerbangan charter pesawat penuh, ziarah bersejarah di Madinah, hingga pelaksanaan ibadah thawaf dan sa'i di Makkah Al-Mukarramah.
              </p>
              <div class="profile-meta-chips" style="margin-bottom: 16px;">
                <span class="profile-meta-chip">🕋 Ziarah Makkah & Madinah</span>
                <span class="profile-meta-chip">✈️ Charter 1 Pesawat Penuh</span>
                <span class="profile-meta-chip">🏨 Hotel Berbintang Dekat Masjid</span>
                <span class="profile-meta-chip">👥 Muthowwif & Muthowwiffah Mukim</span>
              </div>
              <button class="btn btn-green" onclick="openLightbox('assets/dokumentasi/dokumentasi-keberangkatan-poster.jpg', 'Dokumentasi Keberangkatan Akbar — 12 Titik Perjalanan Jamaah Samira Travel')">
                Lihat Poster Resolusi Penuh ↗
              </button>
            </div>
          </div>
        </div>

        <!-- Video Dokumentasi -->
        <div class="section-head" style="margin-top: 40px;">
          <div>
            <div class="eyebrow">Video Dokumentasi & Kebersamaan</div>
            <h2 class="section-title">Dokumentasi Video Evi Samira & Owner</h2>
          </div>
          <span class="meta-chip">✦ Video Resmi Samira Travel</span>
        </div>
        <div class="video-testimonial-grid" style="margin-bottom: 40px;">
          ${testimonialVideos.map(videoCard).join('')}
        </div>

        <!-- Grid Dokumentasi Kegiatan & Pelayanan -->
        <div class="section-head">
          <div>
            <div class="eyebrow">Galeri Kegiatan Nyata</div>
            <h2 class="section-title">Dokumentasi Pelayanan & Jamaah</h2>
          </div>
          <span class="meta-chip">Klik foto untuk melihat ukuran penuh</span>
        </div>

        <div class="profile-docs-grid">
          ${documentationPhotos.map(doc => `
            <div class="profile-doc-card" onclick="openLightbox('${doc.image}', '${doc.title} — ${doc.caption}')" role="button" tabindex="0">
              <div class="profile-doc-img-wrap">
                <img src="${doc.image}" alt="${doc.title}" loading="lazy">
                <span class="profile-doc-badge">${doc.category}</span>
              </div>
              <div class="profile-doc-body">
                <h4 style="margin: 0 0 6px; font-size: 1rem; color: var(--ios-navy); font-weight: 700;">${doc.title}</h4>
                <p style="margin: 0 0 10px; font-size: 0.85rem; color: var(--ios-secondary); line-height: 1.5;">${doc.caption}</p>
                <div class="profile-doc-hint">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                  Perbesar Foto
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    ${ctaBand()}
  `;
}

function testi() {
  return `
    ${pageHero('Testimoni Jamaah', 'Cerita dan kesan nyata para jamaah dalam berkonsultasi, beribadah, serta merasakan bimbingan ibadah terpercaya bersama Samira Travel.')}
    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="eyebrow">Video Pengalaman Jamaah</div>
            <h2 class="section-title">Cerita Langsung dari Jamaah</h2>
          </div>
          <span class="meta-chip">✦ Dokumentasi Resmi Samira Travel</span>
        </div>
        <div class="video-testimonial-grid">
          ${testimonialVideos.map(videoCard).join('')}
        </div>
      </div>
    </section>

    <section class="section section-soft">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="eyebrow">Ulasan & Kesan</div>
            <h2 class="section-title">Kesan Jamaah Bersama Evi Samira</h2>
          </div>
        </div>
        <div class="quote-grid">
          ${testimonials.map(quoteCard).join('')}
        </div>
      </div>
    </section>
    ${ctaBand()}
  `;
}

function articlesPage() {
  return `
    ${pageHero('Artikel & Panduan Umroh', 'Informasi dan wawasan bermanfaat untuk membantu Anda mempersiapkan perjalanan ibadah ke Tanah Suci.')}
    <section class="section">
      <div class="container article-grid">
        ${articles.map(a => `
          <article class="article-card">
            <span class="package-badge" style="position:static; margin-bottom:12px; width:fit-content;">${a.category}</span>
            <h3>${a.title}</h3>
            <div class="article-date">${a.date}</div>
            <p>${a.excerpt}</p>
            <a class="article-link" href="#/artikel/${a.slug}">Baca selengkapnya →</a>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function article(slug) {
  let a = articles.find(x => x.slug === slug) || articles[0];
  return `
    ${pageHero(a.title, a.excerpt)}
    <section class="section">
      <article class="container detail-main-card" style="max-width: 820px; padding: 40px;">
        <span class="package-badge" style="position:static; margin-bottom:14px; width:fit-content;">${a.category}</span>
        <div class="article-date" style="margin-bottom: 18px;">Dipublikasikan: ${a.date}</div>
        <h2 style="font-family: var(--ios-display-font); font-size: 2rem; color: var(--ios-navy); margin-bottom: 20px;">Persiapan Matang Menuju Tanah Suci</h2>
        <p style="color: var(--ios-secondary); line-height: 1.8; margin-bottom: 20px;">Halaman ini merupakan struktur artikel panduan. Sebelum memutuskan paket dan waktu keberangkatan, penting bagi calon jamaah untuk menanyakan aspek legalitas, akomodasi hotel, jarak ke Masjidil Haram dan Nabawi, serta fasilitas pendampingan selama di Tanah Suci.</p>
        <p style="color: var(--ios-secondary); line-height: 1.8; margin-bottom: 30px;">Melalui konsultasi personal dengan Evi Samira Pusat, Anda dapat mendiskusikan kebutuhan khusus anggota keluarga, lansia, maupun preferensi penerbangan secara terbuka.</p>
        <a class="btn btn-green" target="_blank" rel="noreferrer" href="${generalWA()}">Konsultasi Panduan via WhatsApp ↗</a>
      </article>
    </section>
  `;
}

function faq() {
  return `
    ${pageHero('Pertanyaan Umum (FAQ)', 'Jawaban singkat atas pertanyaan yang sering diajukan. Kami siap melanjutkan obrolan secara personal via WhatsApp.')}
    <section class="section">
      <div class="container faq-wrap">
        ${faqs.map(([q, a]) => `
          <details class="faq-item">
            <summary>${q}</summary>
            <p>${a}</p>
          </details>
        `).join('')}
      </div>
    </section>
    ${ctaBand()}
  `;
}

function legal() {
  return `
    ${pageHero('Legalitas & Keamanan', 'Transparansi dan integritas adalah fondasi rasa aman dalam merencanakan ibadah suci Anda.')}
    <section class="section">
      <div class="container legal-grid">
        <article class="legal-card">
          <span class="package-badge" style="position:static; margin-bottom:10px; width:fit-content; background:#0c706b; color:#fff;">Izin Resmi Kemenag</span>
          <h3>Izin PPIU No. 137 Tahun 2020</h3>
          <p>Induk penyelenggara adalah <b>PT. SAMIRA ALI WISATA (Samira Travel)</b> dengan izin resmi Penyelenggara Perjalanan Ibadah Umroh (PPIU) No. 137 Tahun 2020 dari Kementerian Agama RI. Evi Samira Pusat beroperasi sebagai mitra resmi terpercaya.</p>
          <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:14px;">
            <a class="btn btn-gold" href="#/profil-samira">Buka Profil & Bukti Dokumen SK ↗</a>
            <a class="btn btn-glass" href="https://www.samiratravel.co.id/" target="_blank" rel="noreferrer">Portal Resmi Samira ↗</a>
          </div>
        </article>
        <article class="legal-card">
          <h3>Dokumen & Sertifikasi</h3>
          <p>Seluruh materi informasi, sertifikat BNSP Tour Leader, dan referensi resmi dapat diverifikasi langsung untuk menjaga keabsahan dan rasa tenang calon jamaah.</p>
          <p style="font-size: 0.8rem; color: var(--ios-tertiary); font-style: italic;">Tidak ada klaim izin yang dibuat tanpa dokumen legalitas pendukung yang sah.</p>
        </article>
        <article class="legal-card">
          <h3>Keamanan Data Jamaah</h3>
          <p>Formulir konsultasi pada website ini langsung diarahkan ke pesan WhatsApp pribadi Evi Samira tanpa penyimpanan di database publik pihak ketiga.</p>
        </article>
        <article class="legal-card">
          <h3>Konfirmasi Pembayaran</h3>
          <p>Pastikan konfirmasi nomor rekening resmi perusahaan Samira Travel sebelum melakukan transaksi demi keamanan ibadah Anda.</p>
        </article>
      </div>
    </section>
  `;
}

function lead() {
  let preset = new URLSearchParams(location.hash.split('?')[1] || '').get('paket') || '';
  return `
    ${pageHero('Formulir Minat Umroh', 'Isi data singkat di bawah ini. Informasi akan langsung diformat rapi dan diteruskan ke WhatsApp Evi Samira.')}
    <section class="section">
      <div class="container" style="max-width: 880px;">
        <div class="form-card">
          <div class="notice">
            <span class="notice-icon">ⓘ</span>
            <div>Data tidak disimpan di server website. Begitu Anda klik tombol kirim, pesan WhatsApp akan terbuka otomatis dengan data kebutuhan Anda.</div>
          </div>
          <form id="lead-form" class="lead-form">
            <div class="form-group">
              <label>Nama Lengkap</label>
              <input required name="nama" placeholder="Contoh: Muhammad Ilham">
            </div>
            <div class="form-group">
              <label>Nomor WhatsApp</label>
              <input required name="whatsapp" type="tel" placeholder="Contoh: 08123456789">
            </div>
            <div class="form-group">
              <label>Kota Domisili</label>
              <input required name="kota" placeholder="Contoh: Jakarta Timur">
            </div>
            <div class="form-group">
              <label>Jumlah Calon Jamaah</label>
              <input required name="jumlah" type="number" min="1" placeholder="Contoh: 2">
            </div>
            <div class="form-group">
              <label>Paket yang Diminati</label>
              <select name="paket">
                <option value="">-- Pilih Paket --</option>
                ${packages.map(p => `<option ${preset === p.name ? 'selected' : ''}>${p.name}</option>`).join('')}
                <option>Lainnya / Perlu Konsultasi Dulu</option>
              </select>
            </div>
            <div class="form-group">
              <label>Perkiraan Bulan Keberangkatan</label>
              <input name="rencana" placeholder="Contoh: November 2026">
            </div>
            <div class="form-group full">
              <label>Catatan / Kebutuhan Khusus</label>
              <textarea name="pesan" rows="4" placeholder="Misal: Membawa lansia dengan kursi roda, pilihan kamar keluarga, dll."></textarea>
            </div>
            <button class="btn btn-green full" type="submit" style="padding: 16px; font-size: 1rem;">
              Kirim ke WhatsApp Evi Samira ↗
            </button>
          </form>
        </div>
      </div>
    </section>
  `;
}

function contact() {
  return `
    ${pageHero('Hubungi Evi Samira', 'Kami siap membantu Anda memulai langkah awal dengan konsultasi yang ramah dan bersahabat.')}
    <section class="section">
      <div class="container" style="max-width: 720px;">
        <div class="legal-card" style="text-align: center; padding: 48px 32px;">
          <div style="width: 70px; height: 70px; border-radius: 50%; background: var(--ios-green-subtle); display: grid; place-content: center; margin: 0 auto 20px; font-size: 2rem; color: var(--ios-green);">💬</div>
          <h3>Konsultasi Langsung via WhatsApp</h3>
          <p style="max-width: 480px; margin: 0 auto 24px;">Silakan klik tombol di bawah untuk terhubung langsung dengan Evi Handayani (Mitra Samira Travel Pusat).</p>
          <div style="display: inline-block; background: rgba(9, 41, 56, 0.04); padding: 12px 24px; border-radius: var(--ios-radius-pill); margin-bottom: 24px;">
            <span style="font-size: 0.85rem; color: var(--ios-secondary);">Nomor WhatsApp Resmi:</span><br>
            <strong style="font-size: 1.2rem; color: var(--ios-navy);">${SITE.phoneDisplay}</strong>
          </div>
          <div>
            <a class="btn btn-gold" style="font-size: 1rem; padding: 14px 32px;" target="_blank" rel="noreferrer" href="${generalWA()}">Mulai Obrolan WhatsApp ↗</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function route() {
  let r = location.hash.slice(1) || '/';
  let path = r.split('?')[0], parts = path.split('/').filter(Boolean);
  let activeNav = parts[0] || 'beranda';
  updateActiveNav(activeNav);

  let view = home();
  if (parts[0] === 'paket' && parts[1]) view = detail(packages.find(p => p.slug === parts[1]) || (parts[1] === 'regular-jakarta' ? packages.find(p => p.slug === 'umroh-ekonomis') : null) || packages[0]);
  else if (parts[0] === 'paket') view = packagesPage();
  else if (parts[0] === 'jadwal') view = schedule();
  else if (parts[0] === 'tentang') view = about();
  else if (parts[0] === 'dokumentasi') view = gallery();
  else if (parts[0] === 'testimoni') view = testi();
  else if (parts[0] === 'artikel' && parts[1]) view = article(parts[1]);
  else if (parts[0] === 'artikel') view = articlesPage();
  else if (parts[0] === 'profil-samira' || parts[0] === 'profil') view = samiraProfilePage();
  else if (parts[0] === 'faq') view = faq();
  else if (parts[0] === 'legalitas') view = legal();
  else if (parts[0] === 'daftar') view = lead();
  else if (parts[0] === 'kontak') view = contact();

  $('#app').innerHTML = view;
  window.scrollTo(0, 0);

  let f = $('#lead-form');
  if (f) {
    f.onsubmit = (e) => {
      e.preventDefault();
      let d = new FormData(f);
      let m = `Assalamu'alaikum, saya ingin mendaftar minat Umroh melalui Evi Samira Pusat.\n\n` +
              `Nama: ${d.get('nama')}\n` +
              `WhatsApp: ${d.get('whatsapp')}\n` +
              `Kota: ${d.get('kota')}\n` +
              `Jumlah jamaah: ${d.get('jumlah')}\n` +
              `Paket diminati: ${d.get('paket')}\n` +
              `Rencana keberangkatan: ${d.get('rencana')}\n` +
              `Catatan: ${d.get('pesan')}`;
      window.open(wa(m), '_blank', 'noopener');
    };
  }
}

window.openLightbox = function(src, caption) {
  const m = $('#lightbox-modal');
  const img = $('#lightbox-img');
  const cap = $('#lightbox-caption');
  if (m && img && cap) {
    img.src = src;
    cap.textContent = caption || '';
    m.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
};

window.closeLightbox = function(e) {
  const m = $('#lightbox-modal');
  if (m) {
    m.classList.remove('open');
    document.body.style.overflow = '';
  }
};

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    window.closeLightbox();
  }
});

initTheme();
nav();
footer();
window.addEventListener('hashchange', route);
route();
