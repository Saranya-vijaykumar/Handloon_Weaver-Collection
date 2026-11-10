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
        link.classList.add('bg-primary/10', 'dark:bg-[#fed65b]/15', 'text-primary', 'dark:text-[#fed65b]', 'font-bold');
        link.classList.remove('text-on-surface');
      } else {
        link.classList.remove('bg-primary/10', 'dark:bg-[#fed65b]/15', 'text-primary', 'dark:text-[#fed65b]', 'font-bold');
        link.classList.add('text-on-surface');
      }
    });

    // Other Desktop nav items (excluding home dropdown button)
    document.querySelectorAll('#desktop-main-nav > a.nav-item').forEach(link => {
      const route = link.getAttribute('data-route') || link.getAttribute('href');
      if (route === current) {
        link.classList.remove('text-on-surface-variant');
        link.classList.add('text-primary', 'dark:text-[#fed65b]', 'font-bold', 'border-b-2', 'border-primary', 'dark:border-[#fed65b]');
      } else {
        link.classList.remove('text-primary', 'dark:text-[#fed65b]', 'font-bold', 'border-b-2', 'border-primary', 'dark:border-[#fed65b]');
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

    // Mobile nav links
    document.querySelectorAll('#mobile-nav > a').forEach(link => {
      const href = link.getAttribute('data-mobile-route') || link.getAttribute('href');
      if (href === current) {
        link.classList.add('bg-primary/10', 'text-primary', 'dark:bg-[#fed65b]/20', 'dark:text-[#fed65b]', 'font-bold');
        link.classList.remove('text-on-surface', 'dark:text-[#f3efe9]');
      } else {
        link.classList.remove('bg-primary/10', 'text-primary', 'dark:bg-[#fed65b]/20', 'dark:text-[#fed65b]', 'font-bold');
        link.classList.add('text-on-surface', 'dark:text-[#f3efe9]');
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
      drawer.className = 'fixed inset-0 z-[9999] hidden lg:hidden';
      drawer.innerHTML = `
        <div id="mobile-backdrop" class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity opacity-0 cursor-pointer"></div>
        <div id="mobile-panel" class="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-surface dark:bg-[#1e191c] text-on-surface dark:text-[#f3efe9] p-5 sm:p-6 shadow-2xl flex flex-col justify-between transform -translate-x-full transition-transform duration-300 border-r border-outline-variant/30 overflow-y-auto">
          <div>
            <!-- Header inside Drawer -->
            <div class="flex justify-between items-center pb-4 border-b border-outline-variant/30 mb-5">
              <a href="index.html" class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary dark:text-[#fed65b] text-2xl">texture</span>
                <span class="font-serif font-bold text-lg text-primary dark:text-[#fed65b] tracking-wide">Weavers Collective</span>
              </a>
              <button id="close-mobile-menu" class="p-2 text-on-surface-variant dark:text-stone-300 hover:text-primary dark:hover:text-[#fed65b] rounded-full cursor-pointer focus:outline-none" title="Close Menu" aria-label="Close Menu">
                <span class="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            <!-- Mobile Navigation Links -->
            <nav id="mobile-nav" class="flex flex-col gap-1.5">
              <!-- Home 1 -->
              <a href="index.html" class="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-on-surface dark:text-[#f3efe9] hover:bg-primary/10 hover:text-primary dark:hover:text-[#fed65b] transition-colors" data-mobile-route="index.html">
                <span class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-lg text-primary dark:text-[#fed65b]">cottage</span>
                  <span>Home 1 (Heritage)</span>
                </span>
                <span class="text-[9px] px-2 py-0.5 rounded bg-primary/10 text-primary dark:bg-[#fed65b]/20 dark:text-[#fed65b] font-bold uppercase tracking-wider">Heritage</span>
              </a>

              <!-- Home 2 -->
              <a href="home-2.html" class="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-on-surface dark:text-[#f3efe9] hover:bg-primary/10 hover:text-primary dark:hover:text-[#fed65b] transition-colors" data-mobile-route="home-2.html">
                <span class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-lg text-primary dark:text-[#fed65b]">auto_stories</span>
                  <span>Home 2 (Slow Craft)</span>
                </span>
                <span class="text-[9px] px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary-container dark:bg-[#fed65b] dark:text-[#241a00] font-bold uppercase tracking-wider">Atelier</span>
              </a>

              <!-- About Our Heritage -->
              <a href="about.html" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-on-surface dark:text-[#f3efe9] hover:bg-primary/10 hover:text-primary dark:hover:text-[#fed65b] font-medium transition-colors" data-mobile-route="about.html">
                <span class="material-symbols-outlined text-lg text-primary dark:text-[#fed65b]">history_edu</span>
                <span>About Our Heritage</span>
              </a>

              <!-- Products -->
              <a href="products.html" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-on-surface dark:text-[#f3efe9] hover:bg-primary/10 hover:text-primary dark:hover:text-[#fed65b] font-medium transition-colors" data-mobile-route="products.html">
                <span class="material-symbols-outlined text-lg text-primary dark:text-[#fed65b]">checkroom</span>
                <span>Products &amp; Collections</span>
              </a>

              <!-- Artisans -->
              <a href="artisans.html" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-on-surface dark:text-[#f3efe9] hover:bg-primary/10 hover:text-primary dark:hover:text-[#fed65b] font-medium transition-colors" data-mobile-route="artisans.html">
                <span class="material-symbols-outlined text-lg text-primary dark:text-[#fed65b]">engineering</span>
                <span>Artisans Directory</span>
              </a>

              <!-- Varanasi Silk -->
              <a href="craft-silk.html" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-on-surface dark:text-[#f3efe9] hover:bg-primary/10 hover:text-primary dark:hover:text-[#fed65b] font-medium transition-colors" data-mobile-route="craft-silk.html">
                <span class="material-symbols-outlined text-lg text-primary dark:text-[#fed65b]">auto_awesome</span>
                <span>Varanasi Silk Craft</span>
              </a>

              <!-- Fair Trade -->
              <a href="fair-trade.html" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-on-surface dark:text-[#f3efe9] hover:bg-primary/10 hover:text-primary dark:hover:text-[#fed65b] font-medium transition-colors" data-mobile-route="fair-trade.html">
                <span class="material-symbols-outlined text-lg text-primary dark:text-[#fed65b]">eco</span>
                <span>Fair Trade &amp; Impact</span>
              </a>

              <!-- Contact -->
              <a href="contact.html" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-on-surface dark:text-[#f3efe9] hover:bg-primary/10 hover:text-primary dark:hover:text-[#fed65b] font-medium transition-colors" data-mobile-route="contact.html">
                <span class="material-symbols-outlined text-lg text-primary dark:text-[#fed65b]">mail</span>
                <span>Contact &amp; Enquiries</span>
              </a>
            </nav>
          </div>

          <!-- Bottom Fair Trade Badge & Quick Actions in Mobile Drawer -->
          <div class="pt-5 mt-4 border-t border-outline-variant/30 text-xs text-on-surface-variant dark:text-stone-300 space-y-3">
            <div class="flex items-center justify-between">
              <span class="font-semibold text-primary dark:text-[#fed65b]">Curated Heirlooms</span>
              <button type="button" class="open-search-trigger px-2.5 py-1 rounded-lg bg-surface-container dark:bg-stone-800 text-[11px] font-semibold text-on-surface dark:text-white flex items-center gap-1 cursor-pointer">
                <span class="material-symbols-outlined text-xs">search</span> Search
              </button>
            </div>
            <div class="flex items-center gap-2 text-primary dark:text-[#fed65b] font-semibold">
              <span class="material-symbols-outlined text-sm">verified</span>
              <span>100% Certified Fair Trade Weaves</span>
            </div>
            <p class="leading-relaxed text-[11px]">Direct from artisan family pit looms across 18 craft clusters in India.</p>
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
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        backdrop.classList.remove('opacity-0');
        backdrop.classList.add('opacity-100');
        panel.classList.remove('-translate-x-full');
        panel.classList.add('translate-x-0');
      });
    }

    function closeMobileMenu() {
      backdrop.classList.remove('opacity-100');
      backdrop.classList.add('opacity-0');
      panel.classList.remove('translate-x-0');
      panel.classList.add('-translate-x-full');
      document.body.style.overflow = '';
      setTimeout(() => {
        drawer.classList.add('hidden');
      }, 300);
    }

    // Bind triggers
    document.querySelectorAll('#mobile-menu-btn, .mobile-menu-trigger').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        openMobileMenu();
      };
    });

    if (closeBtn) {
      closeBtn.onclick = (e) => {
        e.preventDefault();
        closeMobileMenu();
      };
    }

    if (backdrop) {
      backdrop.onclick = (e) => {
        e.preventDefault();
        closeMobileMenu();
      };
    }

    // Auto-close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !drawer.classList.contains('hidden')) {
        closeMobileMenu();
      }
    });

    // Close on navigation link click if same page hash
    drawer.querySelectorAll('#mobile-nav a').forEach(a => {
      a.addEventListener('click', () => {
        const href = a.getAttribute('href');
        if (href && href.startsWith('#')) {
          closeMobileMenu();
        }
      });
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

  // 7. Policy & Terms Modal
  function openPolicyModal(type) {
    let modal = document.getElementById('hwc-policy-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'hwc-policy-modal';
      modal.className = 'fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md transition-opacity duration-300';
      document.body.appendChild(modal);

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
          modal.classList.add('hidden');
        }
      });
    }

    let title = 'Weavers Collective Policy & Guarantees';
    let icon = 'verified';
    let contentHtml = '';

    if (type === 'privacy') {
      title = 'Privacy & Ethical Stewardship Policy';
      icon = 'shield';
      contentHtml = `
        <div class="space-y-4 text-xs sm:text-sm text-on-surface-variant dark:text-stone-300 leading-relaxed">
          <p class="font-semibold text-primary dark:text-[#fed65b]">Last Updated: January 2026 • Madanpura & Chanderi Artisan Chapters</p>
          <p>At Handloom Weavers Collective, radical transparency applies equally to digital ethics and slow handloom craft. We treat your personal data with the same sacred care our master artisans give to their centuries-old wooden pit looms.</p>
          <h4 class="font-serif font-bold text-base text-primary dark:text-[#fed65b]">1. Zero Third-Party Data Monetization</h4>
          <p>We do not sell, rent, or trade customer contact details, browsing histories, or purchase records to third-party ad brokers or data warehouses. All collective data remains strictly confidential within our guild registry.</p>
          <h4 class="font-serif font-bold text-base text-primary dark:text-[#fed65b]">2. Bespoke Commission & Swatch Information</h4>
          <p>Information shared when ordering physical yarn swatches or submitting bespoke heirloom commission briefs is shared exclusively with the designated master artisan and our senior textile curator to ensure accurate weaving execution.</p>
          <h4 class="font-serif font-bold text-base text-primary dark:text-[#fed65b]">3. Direct Artisan Living Wage Registry</h4>
          <p>Purchase receipts and verifiable lineage certificates record proof of direct living wage disbursement to weaver cooperatives without exposing personal banking details.</p>
        </div>
      `;
    } else if (type === 'shipping') {
      title = 'Insured Worldwide Delivery & 14-Day Inspection';
      icon = 'local_shipping';
      contentHtml = `
        <div class="space-y-4 text-xs sm:text-sm text-on-surface-variant dark:text-stone-300 leading-relaxed">
          <p class="font-semibold text-primary dark:text-[#fed65b]">Last Updated: January 2026 • Guild Logistics & Heirloom Dispatch</p>
          <p>Each heirloom handloom piece represents weeks or months of artisan devotion. We ensure white-glove transport from weaver pit-looms straight to your home.</p>
          <h4 class="font-serif font-bold text-base text-primary dark:text-[#fed65b]">1. Global Climate-Controlled Shipping</h4>
          <p>All textiles are wrapped in breathable, unbleached hand-spun muslin covers with natural neem insect deterrents and sealed in waterproof protective casing. Shipped via express courier (DHL / FedEx) with full insurance.</p>
          <h4 class="font-serif font-bold text-base text-primary dark:text-[#fed65b]">2. 14-Day In-Home Inspection Window</h4>
          <p>Experience your textile in your own lighting and drape it with care. If the handloom piece does not resonate with you, contact our concierge within 14 days for a full refund and complimentary insured pickup.</p>
          <h4 class="font-serif font-bold text-base text-primary dark:text-[#fed65b]">3. Bespoke Commission Lead Times</h4>
          <p>Custom commissions require 3 to 8 weeks depending on the warp density (120-140 counts). Patrons receive bi-weekly photographic updates directly from the master weaver's workshop.</p>
        </div>
      `;
    } else if (type === 'guarantee') {
      title = '100% Certified GI & Living Wage Guarantee';
      icon = 'verified';
      contentHtml = `
        <div class="space-y-4 text-xs sm:text-sm text-on-surface-variant dark:text-stone-300 leading-relaxed">
          <p class="font-semibold text-primary dark:text-[#fed65b]">Last Updated: January 2026 • Certified Craftmark & Silk Mark Guild</p>
          <p>We stand unequivocally behind the authenticity, provenance, and ethical integrity of every thread woven in our collective.</p>
          <h4 class="font-serif font-bold text-base text-primary dark:text-[#fed65b]">1. Serialized GI & Silk Mark Tagging</h4>
          <p>Every saree, shawl, and yardage is accompanied by an authenticated Geographic Indication (GI) lineage certificate and QR-enabled Silk Mark or Craftmark seal verifying origin and 100% natural fiber content.</p>
          <h4 class="font-serif font-bold text-base text-primary dark:text-[#fed65b]">2. Radical 68%–72% Living Wage Disbursement</h4>
          <p>Unlike commercial retail where weavers receive merely 8%–12%, our collective directs 68% to 72% of each sale straight to the weaver family bank account, eliminating middlemen markups.</p>
          <h4 class="font-serif font-bold text-base text-primary dark:text-[#fed65b]">3. 100% Money-Back Authenticity Guarantee</h4>
          <p>If any piece purchased through the collective is ever found to contain synthetic filament or powerloom replication, we provide a 100% immediate refund, no questions asked.</p>
        </div>
      `;
    } else {
      // 'terms' default
      title = 'Fair Trade Guild Terms of Service & Authenticity Guarantee';
      icon = 'description';
      contentHtml = `
        <div class="space-y-4 text-xs sm:text-sm text-on-surface-variant dark:text-stone-300 leading-relaxed">
          <p class="font-semibold text-primary dark:text-[#fed65b]">Last Updated: January 2026 • 18 Craft Clusters Cooperative</p>
          <p>By engaging with Handloom Weavers Collective, you become an active custodian in safeguarding indigenous artisanal traditions across 18 craft clusters in India.</p>
          <h4 class="font-serif font-bold text-base text-primary dark:text-[#fed65b]">1. Authentic Geographic Indication (GI) Guarantee</h4>
          <p>Every textile commissioned or purchased through our collective is certified 100% handspun and handwoven on traditional pit, frame, or backstrap looms. Any piece failing laboratory GI fiber verification is eligible for a full 100% refund plus insured return.</p>
          <h4 class="font-serif font-bold text-base text-primary dark:text-[#fed65b]">2. Fair Trade & Living Wage Commitment</h4>
          <p>A minimum guaranteed 68%–72% of each retail piece directly enriches the master artisan cooperative. Zero middleman margins are permitted within the Weavers Collective network.</p>
          <h4 class="font-serif font-bold text-base text-primary dark:text-[#fed65b]">3. Bespoke Commission Timelines & Natural Variations</h4>
          <p>Because authentic slow handloom incorporates pure natural vegetable dyes and hand-spun organic yarns, minor variations in slub texture and dye shading are celebrated hallmarks of genuine craft, not defects.</p>
          <h4 class="font-serif font-bold text-base text-primary dark:text-[#fed65b]">4. 14-Day Heirloom Inspection & Care Guarantee</h4>
          <p>We provide a 14-day in-home heirloom inspection window. Should a textile require bespoke re-finishing or ancestral care advice, our master curators offer complimentary lifetime textile consultation.</p>
        </div>
      `;
    }

    modal.innerHTML = `
      <div class="relative w-full max-w-2xl bg-surface dark:bg-[#1e191c] text-on-surface dark:text-[#f3efe9] rounded-2xl shadow-2xl border border-outline-variant/30 dark:border-stone-700 flex flex-col max-h-[85vh] overflow-hidden">
        <div class="p-5 sm:p-6 bg-surface-container-low dark:bg-[#252024] border-b border-outline-variant/30 dark:border-stone-700 flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <span class="material-symbols-outlined text-primary dark:text-[#fed65b] text-2xl">${icon}</span>
            <h3 class="font-serif text-lg sm:text-xl font-bold text-primary dark:text-[#fed65b]">${title}</h3>
          </div>
          <button id="close-policy-btn" class="w-8 h-8 rounded-full bg-surface dark:bg-[#1e191c] hover:bg-surface-container dark:hover:bg-[#332b31] flex items-center justify-center text-on-surface-variant dark:text-stone-300 hover:text-primary dark:hover:text-[#fed65b] transition-colors cursor-pointer" aria-label="Close modal">
            <span class="material-symbols-outlined text-base">close</span>
          </button>
        </div>
        <div class="p-6 overflow-y-auto space-y-4">
          ${contentHtml}
        </div>
        <div class="p-4 bg-surface-container-low dark:bg-[#252024] border-t border-outline-variant/30 dark:border-stone-700 flex justify-end">
          <button id="agree-policy-btn" class="px-6 py-2.5 bg-primary text-on-primary dark:bg-[#fed65b] dark:text-[#241a00] rounded-xl text-xs font-semibold hover:opacity-95 transition-all shadow-sm cursor-pointer">
            I Understand &amp; Agree
          </button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');

    const closeModal = () => modal.classList.add('hidden');
    const closeBtn = document.getElementById('close-policy-btn');
    const agreeBtn = document.getElementById('agree-policy-btn');
    if (closeBtn) closeBtn.onclick = closeModal;
    if (agreeBtn) agreeBtn.onclick = closeModal;

    modal.onclick = (e) => {
      if (e.target === modal) closeModal();
    };
  }

  // 8. Newsletter Forms
  function setupNewsletters() {
    document.querySelectorAll('form.newsletter-form, form[action*="newsletter"]').forEach(form => {
      form.onsubmit = (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        const email = input ? input.value.trim() : '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
          showToast('Please enter a valid email address.', 'error');
          if (input) input.focus();
          return;
        }

        // Store subscriber
        try {
          const subs = JSON.parse(localStorage.getItem('hwc_newsletter_subscribers') || '[]');
          if (!subs.includes(email)) subs.push(email);
          localStorage.setItem('hwc_newsletter_subscribers', JSON.stringify(subs));
        } catch (err) {
          console.warn('LocalStorage error:', err);
        }

        showToast(`Subscribed! Heirloom dispatches will arrive at ${email}.`, 'mark_email_read');

        // Inline feedback animation
        let feedback = form.querySelector('.newsletter-feedback');
        if (!feedback) {
          feedback = document.createElement('div');
          feedback.className = 'newsletter-feedback text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1 pt-1';
          feedback.innerHTML = '<span class="material-symbols-outlined text-xs">check_circle</span><span>Subscribed successfully! Thank you.</span>';
          form.appendChild(feedback);
        } else {
          feedback.classList.remove('hidden');
        }

        setTimeout(() => {
          if (feedback) feedback.classList.add('hidden');
        }, 6000);

        form.reset();
      };
    });
  }

  // 9. Policy Links & Back to top
  function setupPolicyLinks() {
    // Buttons or links with data-policy
    document.querySelectorAll('[data-policy]').forEach(el => {
      el.style.cursor = 'pointer';
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const policy = el.getAttribute('data-policy');
        openPolicyModal(policy);
      });
    });

    // Links containing policy text
    document.querySelectorAll('a').forEach(a => {
      if (a.hasAttribute('data-policy')) return;
      const text = a.textContent.trim().toLowerCase();
      if (text.includes('privacy policy')) {
        a.style.cursor = 'pointer';
        a.addEventListener('click', (e) => {
          e.preventDefault();
          openPolicyModal('privacy');
        });
      } else if (text.includes('terms of service')) {
        a.style.cursor = 'pointer';
        a.addEventListener('click', (e) => {
          e.preventDefault();
          openPolicyModal('terms');
        });
      }
    });

    // Back to top actions
    document.querySelectorAll('[data-action="back-to-top"], .footer-back-to-top, a[href="#top"]').forEach(btn => {
      btn.style.cursor = 'pointer';
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    // Social links toast feedback
    document.querySelectorAll('footer a[aria-label]').forEach(a => {
      const label = a.getAttribute('aria-label');
      if (['Instagram', 'Facebook', 'YouTube', 'Twitter'].includes(label)) {
        a.addEventListener('click', () => {
          showToast('Opening official ' + label + ' channel @weaverscollective...', 'open_in_new');
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

  // 10. Zari Gold Sparkle Effects (Cursor Trail & Click Burst)
  function setupSparkEffects() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const sparkChars = ['✦', '✧', '⋆', '•', '✵', '✨'];
    const sparkColors = ['#fed65b', '#e6b800', '#ffd700', '#d4af37', '#ffffff', '#f5b041'];

    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;

    function createSpark(x, y, dx, dy, size, color, char) {
      const spark = document.createElement('span');
      spark.className = 'hwc-spark-particle';
      spark.textContent = char || sparkChars[Math.floor(Math.random() * sparkChars.length)];
      spark.style.left = x + 'px';
      spark.style.top = y + 'px';
      spark.style.color = color || sparkColors[Math.floor(Math.random() * sparkColors.length)];
      spark.style.fontSize = (size || Math.floor(Math.random() * 8 + 11)) + 'px';
      spark.style.setProperty('--dx', (dx !== undefined ? dx : (Math.random() * 26 - 13)) + 'px');
      spark.style.setProperty('--dy', (dy !== undefined ? dy : (Math.random() * 26 - 13)) + 'px');
      spark.style.setProperty('--rot', (Math.random() * 180 - 90) + 'deg');
      document.body.appendChild(spark);

      setTimeout(() => {
        if (spark.parentNode) spark.remove();
      }, 850);
    }

    // Cursor / Touch Trail (Throttled)
    function onPointerMove(e) {
      const now = performance.now();
      if (now - lastTime < 32) return; // 30fps throttle

      const x = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const y = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
      if (!x && !y) return;

      const dist = Math.hypot(x - lastX, y - lastY);
      if (dist < 14) return;

      lastX = x;
      lastY = y;
      lastTime = now;

      createSpark(x, y);
    }

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    // Click / Tap Spark Burst
    function onPointerDown(e) {
      const x = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const y = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
      if (!x && !y) return;

      const count = 10;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + (Math.random() * 0.4 - 0.2);
        const speed = Math.random() * 32 + 18;
        const dx = Math.cos(angle) * speed;
        const dy = Math.sin(angle) * speed;
        const size = Math.floor(Math.random() * 9 + 12);
        createSpark(x, y, dx, dy, size);
      }
    }

    window.addEventListener('pointerdown', onPointerDown, { passive: true });
  }

  // 11. Ambient Floating Zari Silk Dust Canvas
  function setupAmbientZariCanvas() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const hero = document.querySelector('section.relative, main > section:first-of-type, .hero-section');
    if (!hero) return;

    if (hero.querySelector('#hwc-zari-sparkles-canvas')) return;

    const compStyle = window.getComputedStyle(hero);
    if (compStyle.position === 'static') {
      hero.style.position = 'relative';
    }

    const canvas = document.createElement('canvas');
    canvas.id = 'hwc-zari-sparkles-canvas';
    hero.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = hero.offsetWidth);
    let height = (canvas.height = hero.offsetHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = hero.offsetWidth;
      height = canvas.height = hero.offsetHeight;
    });

    const particles = [];
    const particleCount = 38;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        speedY: Math.random() * 0.45 + 0.2,
        speedX: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.6 + 0.2,
        alphaSpeed: Math.random() * 0.02 + 0.01,
        color: Math.random() > 0.3 ? '#fed65b' : '#d4af37'
      });
    }

    let isPaused = false;
    window.addEventListener('scroll', () => {
      isPaused = window.scrollY > hero.offsetHeight + 100;
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      isPaused = document.hidden || window.scrollY > hero.offsetHeight + 100;
    });

    function animate() {
      if (!isPaused) {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.y -= p.speedY;
          p.x += p.speedX;
          p.alpha += p.alphaSpeed;

          if (p.alpha > 0.85 || p.alpha < 0.15) {
            p.alphaSpeed = -p.alphaSpeed;
          }

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
          ctx.shadowBlur = p.size * 3;
          ctx.shadowColor = '#fed65b';
          ctx.fill();
          ctx.restore();
        }
      }
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  // 12. Universal Scroll-Driven Waterfall Reveal
  function setupScrollAnimations() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const targets = document.querySelectorAll(`
      main section > div,
      main section > article,
      article,
      .product-card,
      [data-product-id],
      .artisan-card,
      #product-grid > div,
      .metric-ribbon > div,
      .faq-item
    `);

    if (!targets.length) return;

    document.querySelectorAll('.grid').forEach(grid => {
      const items = Array.from(grid.children);
      items.forEach((item, idx) => {
        const staggerNum = (idx % 8) + 1;
        item.classList.add(`hwc-stagger-${staggerNum}`);
      });
    });

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('hwc-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.05
    });

    targets.forEach(el => {
      const rect = el.getBoundingClientRect();
      el.classList.add('hwc-reveal');

      if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
        el.classList.add('hwc-revealed');
      } else {
        observer.observe(el);
      }
    });
  }

  // 13. Dynamic Animated Number Counters for Metric Ribbon
  function setupMetricCounters() {
    const metricRibbon = document.querySelector('.metric-ribbon');
    if (!metricRibbon) return;

    const counters = metricRibbon.querySelectorAll('.metric-number, .font-headline-lg');
    if (!counters.length) return;

    const data = [];
    counters.forEach(c => {
      const origText = c.textContent.trim();
      let prefix = '';
      let suffix = '';
      let target = 0;
      let isFloat = false;

      if (origText.includes('₹') && origText.includes('Cr')) {
        prefix = '₹';
        suffix = 'Cr';
        target = parseFloat(origText.replace('₹', '').replace('Cr', '')) || 4.2;
        isFloat = true;
      } else if (origText.includes('%')) {
        suffix = '%';
        target = parseInt(origText.replace('%', ''), 10) || 100;
      } else if (origText.includes('+')) {
        suffix = '+';
        target = parseInt(origText.replace(/[+,]/g, ''), 10) || 1400;
      } else {
        target = parseInt(origText.replace(/[^0-9]/g, ''), 10) || 12;
      }

      data.push({ el: c, origText, prefix, suffix, target, isFloat });
    });

    let animated = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          observer.disconnect();

          const duration = 1400;
          const startTime = performance.now();

          function update(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);

            data.forEach(item => {
              if (progress >= 1) {
                item.el.textContent = item.origText;
              } else {
                const current = item.target * ease;
                let formatted = '';
                if (item.isFloat) {
                  formatted = item.prefix + current.toFixed(1) + item.suffix;
                } else if (item.target >= 1000) {
                  formatted = Math.floor(current).toLocaleString('en-IN') + item.suffix;
                } else {
                  formatted = item.prefix + Math.floor(current) + item.suffix;
                }
                item.el.textContent = formatted;
              }
            });

            if (progress < 1) {
              requestAnimationFrame(update);
            }
          }

          requestAnimationFrame(update);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(metricRibbon);
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
    setupSparkEffects();
    setupAmbientZariCanvas();
    setupScrollAnimations();
    setupMetricCounters();
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
window.openPolicyModal = HWC_Shared.openPolicyModal;

