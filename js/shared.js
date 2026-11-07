/**
 * Handloom Weavers Collective - Shared Site Interactivity & Responsiveness
 * Navigation, Active Route Highlighter, Theme Toggle, RTL, Mobile Menu, Search Modal, Toasts
 */

const HWC_Shared = (function() {
  // 1. Toast Notification Manager
  function ensureToastContainer() {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  function showToast(message, icon = 'info') {
    const container = ensureToastContainer();
    const toast = document.createElement('div');
    toast.className = 'hwc-toast';
    toast.innerHTML = `
      <span class="material-symbols-outlined toast-icon">${icon}</span>
      <span class="truncate">${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3800);
  }

  // 2. Active Route Highlighter
  function highlightActiveNav() {
    const rawPath = window.location.pathname.toLowerCase();
    let current = 'index.html';

    if (rawPath.endsWith('home-2.html') || rawPath.includes('home-2.html') || rawPath.endsWith('index-2.html') || rawPath.includes('index-2.html')) {
      current = 'home-2.html';
    } else if (rawPath.endsWith('about.html') || rawPath.includes('about.html')) {
      current = 'about.html';
    } else if (rawPath.endsWith('products.html') || rawPath.includes('products.html')) {
      current = 'products.html';
    } else if (rawPath.endsWith('product-detail.html') || rawPath.includes('product-detail.html')) {
      current = 'products.html';
    } else if (rawPath.endsWith('artisans.html') || rawPath.includes('artisans.html')) {
      current = 'artisans.html';
    } else if (rawPath.endsWith('craft-silk.html') || rawPath.includes('craft-silk.html')) {
      current = 'craft-silk.html';
    } else if (rawPath.endsWith('fair-trade.html') || rawPath.includes('fair-trade.html')) {
      current = 'fair-trade.html';
    } else if (rawPath.endsWith('contact.html') || rawPath.includes('contact.html')) {
      current = 'contact.html';
    } else if (rawPath === '/' || rawPath.endsWith('/') || rawPath.endsWith('index.html')) {
      current = 'index.html';
    }

    const isHome = (current === 'index.html' || current === 'home-2.html');

    // Desktop nav Home Button
    const homeBtn = document.getElementById('home-dropdown-btn');
    if (homeBtn) {
      if (isHome) {
        homeBtn.classList.remove('text-on-surface-variant');
        homeBtn.classList.add('text-primary', 'font-bold', 'border-b-2', 'border-primary');
      } else {
        homeBtn.classList.remove('text-primary', 'font-bold', 'border-b-2', 'border-primary');
        homeBtn.classList.add('text-on-surface-variant');
      }
    }

    // Dropdown options
    document.querySelectorAll('#home-dropdown-menu .home-option').forEach(link => {
      const route = link.getAttribute('data-route') || link.getAttribute('href');
      const isThisActive = (current === 'index.html' && (route === 'index.html' || route === '/')) ||
                           (current === 'home-2.html' && (route === 'home-2.html' || route === 'index-2.html'));
      if (isThisActive) {
        link.classList.add('bg-primary/10', 'text-primary', 'font-bold');
        link.classList.remove('text-on-surface');
      } else {
        link.classList.remove('bg-primary/10', 'text-primary', 'font-bold');
        link.classList.add('text-on-surface');
      }
    });

    // Other Desktop nav items (excluding home dropdown button)
    document.querySelectorAll('#desktop-main-nav > a.nav-item').forEach(link => {
      const route = link.getAttribute('data-route') || link.getAttribute('href');
      if (route === current) {
        link.classList.remove('text-on-surface-variant');
        link.classList.add('text-primary', 'font-bold', 'border-b-2', 'border-primary');
      } else {
        link.classList.remove('text-primary', 'font-bold', 'border-b-2', 'border-primary');
        link.classList.add('text-on-surface-variant');
      }
    });

    // Mobile nav Home toggle highlight
    const mobileHomeToggle = document.getElementById('mobile-home-toggle');
    if (mobileHomeToggle) {
      if (isHome) {
        mobileHomeToggle.classList.add('bg-primary/15', 'text-primary', 'font-bold');
        mobileHomeToggle.classList.remove('text-on-surface');
      } else {
        mobileHomeToggle.classList.remove('bg-primary/15', 'text-primary', 'font-bold');
        mobileHomeToggle.classList.add('text-on-surface');
      }
    }

    // Mobile home sub-options
    document.querySelectorAll('#mobile-home-submenu a').forEach(link => {
      const href = link.getAttribute('data-mobile-route') || link.getAttribute('href');
      const isThisActive = (current === 'index.html' && (href === 'index.html' || href === '/')) ||
                           (current === 'home-2.html' && (href === 'home-2.html' || href === 'index-2.html'));
      if (isThisActive) {
        link.classList.add('bg-primary/20', 'text-primary', 'font-bold');
      } else {
        link.classList.remove('bg-primary/20', 'text-primary', 'font-bold');
      }
    });

    // Mobile other links
    document.querySelectorAll('#mobile-nav > a').forEach(link => {
      const href = link.getAttribute('data-mobile-route') || link.getAttribute('href');
      if (href === current) {
        link.classList.add('bg-primary/10', 'text-primary', 'font-bold');
        link.classList.remove('text-on-surface');
      } else {
        link.classList.remove('bg-primary/10', 'text-primary', 'font-bold');
        link.classList.add('text-on-surface');
      }
    });
  }

  // 3. Theme Toggle (Dark / Light)
  function setupThemeToggle() {
    const savedTheme = localStorage.getItem('hwc_theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    function updateIcons() {
      const currentlyDark = document.documentElement.classList.contains('dark');
      document.querySelectorAll('#theme-toggle .material-symbols-outlined, .theme-toggle-icon').forEach(icon => {
        icon.textContent = currentlyDark ? 'light_mode' : 'dark_mode';
      });
    }

    updateIcons();

    document.querySelectorAll('#theme-toggle, .theme-toggle-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        const currentlyDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('hwc_theme', currentlyDark ? 'dark' : 'light');
        updateIcons();
        showToast(currentlyDark ? 'Dark Mode Activated' : 'Light Mode Activated', currentlyDark ? 'dark_mode' : 'light_mode');
      };
    });
  }

  // 4. Direction Toggle (LTR / RTL)
  function setupDirToggle() {
    document.querySelectorAll('#dir-toggle, .dir-toggle-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
        document.documentElement.setAttribute('dir', newDir);
        showToast(`Layout Direction: ${newDir.toUpperCase()}`, 'swap_horiz');
      };
    });
  }

  // 5. Mobile Hamburger Drawer
  function setupMobileMenu() {
    let drawer = document.getElementById('mobile-drawer');

    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = 'mobile-drawer';
      drawer.className = 'fixed inset-0 z-50 hidden lg:hidden';
      drawer.innerHTML = `
        <div id="mobile-backdrop" class="fixed inset-0 bg-inverse-surface/60 backdrop-blur-sm transition-opacity opacity-0"></div>
        <div id="mobile-panel" class="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-surface p-6 shadow-2xl flex flex-col justify-between transform -translate-x-full transition-transform duration-300 border-r border-outline-variant/30">
          <div>
            <div class="flex justify-between items-center pb-4 border-b border-outline-variant/30 mb-6">
              <a href="index.html" class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary text-2xl">texture</span>
                <span class="font-serif font-bold text-lg text-primary tracking-wide">Weavers Collective</span>
              </a>
              <button id="close-mobile-menu" class="p-2 text-on-surface-variant hover:text-primary rounded-full" title="Close Menu">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <nav id="mobile-nav" class="flex flex-col gap-1.5">
              <!-- Mobile Home Dropdown Accordion -->
              <div class="rounded-xl overflow-hidden bg-surface-container/50 border border-outline-variant/30 mb-1">
                <button type="button" id="mobile-home-toggle" class="w-full flex items-center justify-between px-3.5 py-2.5 text-sm text-on-surface font-semibold hover:bg-surface-container transition-colors">
                  <div class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-base text-primary">home</span>
                    <span>Home Pages</span>
                  </div>
                  <span class="material-symbols-outlined text-sm transition-transform duration-200" id="mobile-home-chevron">expand_more</span>
                </button>
                <div id="mobile-home-submenu" class="px-2 pb-2 pt-1 flex flex-col gap-1">
                  <a href="index.html" class="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-on-surface hover:bg-primary/10 hover:text-primary transition-colors" data-mobile-route="index.html">
                    <span class="flex items-center gap-2"><span class="material-symbols-outlined text-sm text-primary">cottage</span>Home 1 (Heritage)</span>
                    <span class="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold">Classic</span>
                  </a>
                  <a href="home-2.html" class="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-on-surface hover:bg-primary/10 hover:text-primary transition-colors" data-mobile-route="home-2.html">
                    <span class="flex items-center gap-2"><span class="material-symbols-outlined text-sm text-primary">auto_stories</span>Home 2 (Slow Craft)</span>
                    <span class="text-[9px] px-1.5 py-0.5 rounded bg-tertiary-container text-on-tertiary-container font-bold">Atelier</span>
                  </a>
                </div>
              </div>

              <!-- About (Directly Next to Home!) -->
              <a href="about.html" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-on-surface hover:bg-surface-container font-medium transition-colors" data-mobile-route="about.html">
                <span class="material-symbols-outlined text-base">history_edu</span>About Our Heritage
              </a>
              <a href="products.html" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-on-surface hover:bg-surface-container font-medium transition-colors" data-mobile-route="products.html">
                <span class="material-symbols-outlined text-base">checkroom</span>Products &amp; Collections
              </a>
              <a href="artisans.html" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-on-surface hover:bg-surface-container font-medium transition-colors" data-mobile-route="artisans.html">
                <span class="material-symbols-outlined text-base">engineering</span>Artisans Directory
              </a>
              <a href="craft-silk.html" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-on-surface hover:bg-surface-container font-medium transition-colors" data-mobile-route="craft-silk.html">
                <span class="material-symbols-outlined text-base">auto_awesome</span>Varanasi Silk Craft
              </a>
              <a href="fair-trade.html" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-on-surface hover:bg-surface-container font-medium transition-colors" data-mobile-route="fair-trade.html">
                <span class="material-symbols-outlined text-base">eco</span>Fair Trade &amp; Impact
              </a>
              <a href="contact.html" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-on-surface hover:bg-surface-container font-medium transition-colors" data-mobile-route="contact.html">
                <span class="material-symbols-outlined text-base">mail</span>Contact &amp; Enquiries
              </a>
            </nav>
          </div>

          <div class="pt-6 border-t border-outline-variant/30 text-xs text-on-surface-variant space-y-2">
            <div class="flex items-center gap-2 text-primary font-semibold">
              <span class="material-symbols-outlined text-sm">verified</span>
              <span>100% Certified Fair Trade Weaves</span>
            </div>
            <p class="leading-relaxed">Direct from artisan family pit looms across 18 craft clusters in India.</p>
          </div>
        </div>
      `;
      document.body.appendChild(drawer);
    }

    const backdrop = document.getElementById('mobile-backdrop');
    const panel = document.getElementById('mobile-panel');
    const closeBtn = document.getElementById('close-mobile-menu');

    function openMobileMenu() {
      drawer.classList.remove('hidden');
      setTimeout(() => {
        backdrop.classList.remove('opacity-0');
        backdrop.classList.add('opacity-100');
        panel.classList.remove('-translate-x-full');
        panel.classList.add('translate-x-0');
      }, 10);
    }

    function closeMobileMenu() {
      backdrop.classList.remove('opacity-100');
      backdrop.classList.add('opacity-0');
      panel.classList.remove('translate-x-0');
      panel.classList.add('-translate-x-full');
      setTimeout(() => {
        drawer.classList.add('hidden');
      }, 300);
    }

    document.querySelectorAll('#mobile-menu-btn, .mobile-menu-trigger').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        openMobileMenu();
      };
    });

    if (closeBtn) closeBtn.onclick = closeMobileMenu;
    if (backdrop) backdrop.onclick = closeMobileMenu;

    // Mobile Home accordion toggle
    const mobileHomeToggle = document.getElementById('mobile-home-toggle');
    const mobileHomeSubmenu = document.getElementById('mobile-home-submenu');
    const mobileHomeChevron = document.getElementById('mobile-home-chevron');
    if (mobileHomeToggle && mobileHomeSubmenu) {
      mobileHomeToggle.onclick = (e) => {
        e.preventDefault();
        const isHidden = mobileHomeSubmenu.classList.contains('hidden');
        if (isHidden) {
          mobileHomeSubmenu.classList.remove('hidden');
          if (mobileHomeChevron) mobileHomeChevron.style.transform = 'rotate(180deg)';
        } else {
          mobileHomeSubmenu.classList.add('hidden');
          if (mobileHomeChevron) mobileHomeChevron.style.transform = 'rotate(0deg)';
        }
      };
    }

    drawer.querySelectorAll('nav a').forEach(a => {
      a.onclick = () => {
        closeMobileMenu();
      };
    });
  }

  // 5b. Desktop Home Dropdown Click Toggle Handler
  function setupDesktopHomeDropdown() {
    const wrapper = document.getElementById('home-dropdown-wrapper');
    const btn = document.getElementById('home-dropdown-btn');
    const menu = document.getElementById('home-dropdown-menu');
    if (!wrapper || !btn || !menu) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = menu.classList.contains('hidden');
      if (isHidden) {
        menu.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        menu.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target)) {
        btn.setAttribute('aria-expanded', 'false');
        if (!menu.classList.contains('hidden')) {
          menu.classList.add('hidden');
        }
      }
    });
  }

  // 6. Global Search Modal
  function setupSearchModal() {
    let modal = document.getElementById('search-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'search-modal';
      modal.className = 'fixed inset-0 z-50 hidden flex items-start justify-center pt-16 sm:pt-24 p-4';
      modal.innerHTML = `
        <div id="search-backdrop" class="fixed inset-0 bg-inverse-surface/60 backdrop-blur-sm transition-opacity opacity-0"></div>
        <div id="search-panel" class="relative z-10 bg-surface rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-outline-variant/40 transform -translate-y-4 opacity-0 transition-all duration-300">
          <div class="flex items-center gap-3 border-b border-outline-variant/40 pb-3">
            <span class="material-symbols-outlined text-primary text-2xl">search</span>
            <input type="text" id="global-search-input" placeholder="Search sarees, stoles, weavers, fabrics..." class="flex-1 bg-transparent text-base sm:text-lg text-on-surface focus:outline-none placeholder-on-surface-variant/60 font-serif">
            <button id="close-search-btn" class="p-1.5 text-on-surface-variant hover:text-primary rounded-full">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <div id="search-results" class="mt-4 max-h-[60vh] overflow-y-auto space-y-2">
            <div class="flex items-center justify-between py-1 text-xs uppercase tracking-widest text-on-surface-variant">
              <span>Quick Curations</span>
              <span class="text-[10px] lowercase text-on-surface-variant/70">Press ESC to close</span>
            </div>
            <div class="flex flex-wrap gap-2 mb-3">
              <button onclick="HWC_Shared.setSearchQuery('Varanasi Silk')" class="text-xs bg-surface-container hover:bg-primary hover:text-on-primary px-3 py-1.5 rounded-full transition-colors">Varanasi Silk</button>
              <button onclick="HWC_Shared.setSearchQuery('Jamdani')" class="text-xs bg-surface-container hover:bg-primary hover:text-on-primary px-3 py-1.5 rounded-full transition-colors">Bengal Jamdani</button>
              <button onclick="HWC_Shared.setSearchQuery('Pashmina')" class="text-xs bg-surface-container hover:bg-primary hover:text-on-primary px-3 py-1.5 rounded-full transition-colors">Kashmir Pashmina</button>
              <button onclick="HWC_Shared.setSearchQuery('Cotton')" class="text-xs bg-surface-container hover:bg-primary hover:text-on-primary px-3 py-1.5 rounded-full transition-colors">Kala Cotton</button>
              <button onclick="HWC_Shared.setSearchQuery('Linen')" class="text-xs bg-surface-container hover:bg-primary hover:text-on-primary px-3 py-1.5 rounded-full transition-colors">Pure Linen</button>
            </div>
            <div id="search-results-list" class="space-y-1.5">
              <p class="text-xs text-on-surface-variant italic py-2">Start typing to search authentic weaves...</p>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      const backdrop = document.getElementById('search-backdrop');
      const panel = document.getElementById('search-panel');
      const closeBtn = document.getElementById('close-search-btn');
      const input = document.getElementById('global-search-input');
      const resultsList = document.getElementById('search-results-list');

      function hideSearch() {
        backdrop.classList.remove('opacity-100');
        backdrop.classList.add('opacity-0');
        panel.classList.remove('translate-y-0', 'opacity-100');
        panel.classList.add('-translate-y-4', 'opacity-0');
        setTimeout(() => {
          modal.classList.add('hidden');
        }, 300);
      }

      function performSearch(query) {
        if (!window.HWC_PRODUCTS) return;
        const q = query.trim().toLowerCase();
        if (!q) {
          resultsList.innerHTML = '<p class="text-xs text-on-surface-variant italic py-2">Start typing to search authentic weaves...</p>';
          return;
        }

        const matches = window.HWC_PRODUCTS.filter(p => 
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.technique.toLowerCase().includes(q) ||
          (p.artisan && p.artisan.name.toLowerCase().includes(q)) ||
          (p.badge && p.badge.toLowerCase().includes(q))
        );

        if (matches.length === 0) {
          resultsList.innerHTML = `
            <div class="py-8 text-center text-on-surface-variant">
              <span class="material-symbols-outlined text-3xl mb-1 text-primary">search_off</span>
              <p class="text-sm font-medium">No heirlooms found matching "${query}".</p>
              <p class="text-xs text-on-surface-variant mt-1">Try exploring by fabric (Silk, Cotton, Linen, Wool).</p>
            </div>
          `;
          return;
        }

        resultsList.innerHTML = matches.map(p => `
          <a href="product-detail.html?id=${p.id}" class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-container transition-colors group">
            <div class="w-12 h-14 rounded-lg overflow-hidden bg-surface-container flex-shrink-0">
              <img src="${p.images[0]}" alt="${p.title}" class="w-full h-full object-cover">
            </div>
            <div class="flex-1 min-w-0">
              <h5 class="font-serif font-medium text-sm text-on-surface group-hover:text-primary truncate">${p.title}</h5>
              <p class="text-xs text-on-surface-variant truncate">${p.fabric} • ${p.technique}</p>
            </div>
            <span class="font-serif font-bold text-primary text-sm flex-shrink-0">${p.priceFormatted}</span>
          </a>
        `).join('');
      }

      input.oninput = (e) => performSearch(e.target.value);
      if (closeBtn) closeBtn.onclick = hideSearch;
      if (backdrop) backdrop.onclick = hideSearch;

      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          openSearch();
        } else if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
          hideSearch();
        }
      });
    }

    document.querySelectorAll('.open-search-trigger, [data-search-trigger]').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        openSearch();
      };
    });
  }

  function openSearch() {
    setupSearchModal();
    const modal = document.getElementById('search-modal');
    const backdrop = document.getElementById('search-backdrop');
    const panel = document.getElementById('search-panel');
    const input = document.getElementById('global-search-input');

    modal.classList.remove('hidden');
    setTimeout(() => {
      backdrop.classList.remove('opacity-0');
      backdrop.classList.add('opacity-100');
      panel.classList.remove('-translate-y-4', 'opacity-0');
      panel.classList.add('translate-y-0', 'opacity-100');
      if (input) input.focus();
    }, 10);
  }

  function setSearchQuery(term) {
    const input = document.getElementById('global-search-input');
    if (input) {
      input.value = term;
      input.dispatchEvent(new Event('input'));
    }
  }

  // 7. Floating Back to Top Button
  function setupBackToTop() {
    let btn = document.getElementById('back-to-top');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'back-to-top';
      btn.className = 'hidden-btn bg-surface border border-outline-variant/40 text-primary p-3 rounded-full shadow-lg hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center';
      btn.title = 'Back to top';
      btn.innerHTML = '<span class="material-symbols-outlined text-lg">arrow_upward</span>';
      document.body.appendChild(btn);

      btn.onclick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

      window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
          btn.classList.replace('hidden-btn', 'visible-btn');
        } else {
          btn.classList.replace('visible-btn', 'hidden-btn');
        }
      });
    }
  }

  // 8. Newsletter Forms
  function setupNewsletters() {
    document.querySelectorAll('form.newsletter-form, form[action*="newsletter"]').forEach(form => {
      form.onsubmit = (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        const email = input ? input.value : '';
        if (email) {
          showToast(`Welcome! You are subscribed with ${email}.`, 'mark_email_read');
          form.reset();
        }
      };
    });
  }

  // Init all shared behaviors
  
  // 7. Policy & Terms Modal
  function openPolicyModal(type) {
    let modal = document.getElementById('hwc-policy-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'hwc-policy-modal';
      modal.className = 'fixed inset-0 z-[120] flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-md transition-opacity duration-300';
      document.body.appendChild(modal);
    }

    const isPrivacy = type === 'privacy';
    const title = isPrivacy ? 'Weavers Collective Privacy & Ethical Stewardship Policy' : 'Fair Trade Guild Terms of Service & Authenticity Guarantee';
    const icon = isPrivacy ? 'shield' : 'description';
    
    const contentHtml = isPrivacy ? `
      <div class="space-y-4 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
        <p class="font-semibold text-primary">Last Updated: January 2026 • Madanpura & Chanderi Artisan Chapters</p>
        <p>At Handloom Weavers Collective, we believe radical transparency applies equally to digital ethics and slow handloom craft. We treat your personal data with the same sacred care our master artisans give to their centuries-old wooden pit looms.</p>
        <h4 class="font-serif font-bold text-base text-primary">1. Zero Third-Party Data Monetization</h4>
        <p>We do not sell, rent, or trade customer contact details, browsing histories, or purchase records to third-party ad brokers or data warehouses. All collective data remains strictly confidential within our guild registry.</p>
        <h4 class="font-serif font-bold text-base text-primary">2. Bespoke Commission & Swatch Information</h4>
        <p>Information shared when ordering physical yarn swatches or submitting bespoke heirloom commission briefs is shared exclusively with the designated master artisan and our senior textile curator to ensure accurate weaving execution.</p>
        <h4 class="font-serif font-bold text-base text-primary">3. Direct Artisan Living Wage Registry</h4>
        <p>Purchase receipts and verifiable lineage certificates record proof of direct living wage disbursement to weaver cooperatives without exposing personal banking details.</p>
      </div>
    ` : `
      <div class="space-y-4 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
        <p class="font-semibold text-primary">Last Updated: January 2026 • 18 Craft Clusters Cooperative</p>
        <p>By engaging with Handloom Weavers Collective, you become an active custodian in safeguarding indigenous artisanal traditions across 18 craft clusters in India.</p>
        <h4 class="font-serif font-bold text-base text-primary">1. Authentic Geographic Indication (GI) Guarantee</h4>
        <p>Every textile commissioned or purchased through our collective is certified 100% handspun and handwoven on traditional pit, frame, or backstrap looms. Any piece failing laboratory GI fiber verification is eligible for a full 100% refund plus insured return.</p>
        <h4 class="font-serif font-bold text-base text-primary">2. Fair Trade & Living Wage Commitment</h4>
        <p>A minimum guaranteed 68%–72% of each retail piece directly enriches the master artisan cooperative. Zero middleman margins are permitted within the Weavers Collective network.</p>
        <h4 class="font-serif font-bold text-base text-primary">3. Bespoke Commission Timelines & Natural Variations</h4>
        <p>Because authentic slow handloom incorporates pure natural vegetable dyes and hand-spun organic yarns, minor variations in slub texture and dye shading are celebrated hallmarks of genuine craft, not defects.</p>
        <h4 class="font-serif font-bold text-base text-primary">4. 14-Day Heirloom Inspection & Care Guarantee</h4>
        <p>We provide a 14-day in-home heirloom inspection window. Should a textile require bespoke re-finishing or ancestral care advice, our master curators offer complimentary lifetime textile consultation.</p>
      </div>
    `;

    modal.innerHTML = `
      <div class="relative w-full max-w-2xl bg-surface rounded-2xl shadow-2xl border border-outline-variant/30 flex flex-col max-h-[85vh] overflow-hidden">
        <div class="p-5 sm:p-6 bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <span class="material-symbols-outlined text-primary text-2xl">${icon}</span>
            <h3 class="font-serif text-lg sm:text-xl font-bold text-primary">${title}</h3>
          </div>
          <button onclick="document.getElementById('hwc-policy-modal').classList.add('hidden')" class="w-8 h-8 rounded-full bg-surface hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
            <span class="material-symbols-outlined text-base">close</span>
          </button>
        </div>
        <div class="p-6 overflow-y-auto space-y-4">
          ${contentHtml}
        </div>
        <div class="p-4 bg-surface-container-low border-t border-outline-variant/30 flex justify-end">
          <button onclick="document.getElementById('hwc-policy-modal').classList.add('hidden')" class="px-6 py-2.5 bg-primary text-on-primary rounded-xl text-xs font-semibold hover:opacity-95 transition-all shadow-sm">
            I Understand &amp; Agree
          </button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    modal.onclick = (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    };
  }

  function setupPolicyLinks() {
    document.querySelectorAll('a').forEach(a => {
      const text = a.textContent.trim().toLowerCase();
      if (text.includes('privacy policy') || text.includes('terms of service')) {
        a.style.cursor = 'pointer';
        a.addEventListener('click', (e) => {
          e.preventDefault();
          openPolicyModal(text.includes('privacy') ? 'privacy' : 'terms');
        });
      }
    });

    // Social links toast feedback
    document.querySelectorAll('footer a[aria-label]').forEach(a => {
      const label = a.getAttribute('aria-label');
      if (['Instagram', 'Facebook', 'YouTube', 'Twitter'].includes(label)) {
        a.style.cursor = 'pointer';
        a.addEventListener('click', (e) => {
          e.preventDefault();
          showToast('Connecting to official ' + label + ' channel @weaverscollective...', 'info');
        });
      }
    });
  }


  // 8. Universal Product Card & Image Click Navigation
  function setupProductCardNavigation() {
    document.addEventListener('click', (e) => {
      // If click was inside a button, input, select, textarea, or existing <a>, let it handle its own action
      if (e.target.closest('button') || e.target.closest('input') || e.target.closest('select') || e.target.closest('textarea') || e.target.closest('a')) {
        return;
      }
      
      // Check if clicked element is inside a product card with data-product-id
      const card = e.target.closest('[data-product-id]');
      if (card) {
        const prodId = card.getAttribute('data-product-id');
        if (prodId) {
          window.location.href = 'product-detail.html?id=' + encodeURIComponent(prodId);
        }
      }
    });
  }


  // 9. Universal FAQ Accordion Handler
  function setupFaqAccordions() {
    document.querySelectorAll('.faq-toggle').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const content = toggle.nextElementSibling;
        const icon = toggle.querySelector('.material-symbols-outlined:last-child') || toggle.querySelector('.material-symbols-outlined');
        const isOpen = content && !content.classList.contains('hidden');

        document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
        document.querySelectorAll('.faq-toggle .material-symbols-outlined:last-child').forEach(i => i.style.transform = 'rotate(0deg)');

        if (content && !isOpen) {
          content.classList.remove('hidden');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    });
  }

function init() {
    highlightActiveNav();
    setupThemeToggle();
    setupDirToggle();
    setupMobileMenu();
    setupSearchModal();
    setupBackToTop();
    setupNewsletters();
    setupPolicyLinks();
    setupProductCardNavigation();
    setupFaqAccordions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return {
    showToast,
    openSearch,
    setSearchQuery,
    highlightActiveNav,
    openPolicyModal
  };
})();

window.HWC_Shared = HWC_Shared;
