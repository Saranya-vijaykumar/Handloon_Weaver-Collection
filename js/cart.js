/**
 * Handloom Weavers Collective - Real-Time Shopping Cart & Checkout System
 * Full Responsiveness, Coupond Code, LocalStorage Persistence & Order Flow
 */

const HWC_Cart = (function() {
  const STORAGE_KEY = 'hwc_cart_v1';
  const FREE_SHIPPING_THRESHOLD = 5000;
  let activeCoupon = null;

  // Retrieve cart from localStorage
  function getCart() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading cart from localStorage', e);
      return [];
    }
  }

  // Save cart to localStorage and notify UI
  function saveCart(cart) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent('hwc:cart-updated', { detail: { cart } }));
      updateCartUI();
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }

  // Add an item to the cart
  function addToCart(item, openDrawer = true) {
    const cart = getCart();
    const existingIndex = cart.findIndex(p => p.title === item.title || (item.id && p.id === item.id));

    if (existingIndex > -1) {
      cart[existingIndex].quantity += (item.quantity || 1);
    } else {
      cart.push({
        id: item.id || 'prod-' + Date.now(),
        title: item.title,
        price: Number(item.price) || 0,
        priceFormatted: item.priceFormatted || '₹' + (item.price || 0).toLocaleString('en-IN'),
        cluster: item.cluster || item.badge || 'Fair Trade Handloom',
        imgSrc: item.imgSrc || item.img || (item.images && item.images[0]) || '',
        quantity: item.quantity || 1
      });
    }

    saveCart(cart);
    if (openDrawer) openCart();

    if (window.HWC_Shared && window.HWC_Shared.showToast) {
      window.HWC_Shared.showToast(`Added "${item.title}" to cart!`, 'shopping_bag');
    }
  }

  // Buy Now: adds to cart and directly opens checkout
  function buyNow(item) {
    addToCart(item, false);
    setTimeout(() => {
      openCheckout();
    }, 100);
  }

  // Update item quantity
  function updateQuantity(index, change) {
    const cart = getCart();
    if (!cart[index]) return;

    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    saveCart(cart);
  }

  // Remove item
  function removeItem(index) {
    const cart = getCart();
    if (!cart[index]) return;
    const removed = cart.splice(index, 1)[0];
    saveCart(cart);
    if (window.HWC_Shared && window.HWC_Shared.showToast && removed) {
      window.HWC_Shared.showToast(`Removed "${removed.title}"`, 'delete');
    }
  }

  // Clear cart
  function clearCart() {
    activeCoupon = null;
    saveCart([]);
  }

  // Open Cart Drawer
  function openCart() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    const panel = document.getElementById('cart-panel');
    if (!drawer || !backdrop || !panel) return;

    drawer.classList.remove('hidden');
    drawer.style.display = 'block';
    setTimeout(() => {
      backdrop.classList.remove('opacity-0');
      backdrop.classList.add('opacity-100');
      panel.classList.remove('translate-x-full');
      panel.classList.add('translate-x-0');
    }, 10);
  }

  // Close Cart Drawer
  function closeCart() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    const panel = document.getElementById('cart-panel');
    if (!drawer || !backdrop || !panel) return;

    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');
    panel.classList.remove('translate-x-0');
    panel.classList.add('translate-x-full');
    setTimeout(() => {
      drawer.classList.add('hidden');
      drawer.style.display = 'none';
    }, 300);
  }

  // Apply Coupon Code
  function applyCoupon(code) {
    const cleanCode = (code || '').trim().toUpperCase();
    if (cleanCode === 'WEAVER10' || cleanCode === 'HANDLOOM10') {
      activeCoupon = { code: cleanCode, discountPercent: 10, label: '10% Artisan Guild Discount' };
      updateCartUI();
      if (window.HWC_Shared) window.HWC_Shared.showToast('10% Coupon Applied!', 'sell');
      return true;
    } else if (cleanCode === 'FAIRTRADE500') {
      activeCoupon = { code: cleanCode, discountFixed: 500, label: '₹500 Sustainable Weave Gift' };
      updateCartUI();
      if (window.HWC_Shared) window.HWC_Shared.showToast('₹500 Coupon Applied!', 'sell');
      return true;
    } else {
      if (window.HWC_Shared) window.HWC_Shared.showToast('Invalid coupon. Try WEAVER10', 'info');
      return false;
    }
  }

  // Calculate totals
  function getCartSummary() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const rawSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    let discount = 0;
    if (activeCoupon) {
      if (activeCoupon.discountPercent) {
        discount = Math.round((rawSubtotal * activeCoupon.discountPercent) / 100);
      } else if (activeCoupon.discountFixed) {
        discount = Math.min(rawSubtotal, activeCoupon.discountFixed);
      }
    }

    const subtotal = Math.max(0, rawSubtotal - discount);
    const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
    const shipping = subtotal > 0 && !isFreeShipping ? 350 : 0;
    const total = subtotal + shipping;

    return {
      count,
      rawSubtotal,
      discount,
      discountFormatted: '₹' + discount.toLocaleString('en-IN'),
      subtotal,
      subtotalFormatted: '₹' + subtotal.toLocaleString('en-IN'),
      shipping,
      shippingFormatted: shipping === 0 ? 'FREE' : '₹' + shipping.toLocaleString('en-IN'),
      total,
      totalFormatted: '₹' + total.toLocaleString('en-IN'),
      activeCoupon,
      freeShippingProgress: Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)),
      amountUntilFreeShipping: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
    };
  }

  // Update Cart UI in DOM
  function updateCartUI() {
    const cart = getCart();
    const summary = getCartSummary();

    // 1. Update Cart Badges
    const badges = document.querySelectorAll('#cart-badge, .cart-count-badge');
    badges.forEach(badge => {
      badge.textContent = summary.count;
      badge.style.display = summary.count > 0 ? 'inline-flex' : 'none';
    });

    // 2. Update Subtotal & Total
    const subtotalEls = document.querySelectorAll('#cart-subtotal, .cart-subtotal-val');
    subtotalEls.forEach(el => {
      el.textContent = summary.subtotalFormatted;
    });

    const totalEls = document.querySelectorAll('#cart-total, .cart-total-val');
    totalEls.forEach(el => {
      el.textContent = summary.totalFormatted;
    });

    // 3. Render Cart Items
    const container = document.getElementById('cart-items-container');
    if (container) {
      if (cart.length === 0) {
        container.innerHTML = `
          <div class="py-16 px-4 text-center text-on-surface-variant flex flex-col items-center">
            <div class="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4 text-primary">
              <span class="material-symbols-outlined text-3xl">shopping_basket</span>
            </div>
            <h4 class="font-serif text-xl font-medium text-primary mb-1">Your cart is empty</h4>
            <p class="text-sm max-w-xs mb-6 text-on-surface-variant/80">Support artisan weaving families and discover authentic handloom heirlooms.</p>
            <a href="products.html" class="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-surface-tint transition-colors shadow-sm">
              <span>Explore Collections</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        `;
      } else {
        container.innerHTML = cart.map((item, idx) => `
          <div class="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 transition-all hover:border-outline-variant">
            <div class="w-16 h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden bg-surface-container flex-shrink-0">
              <img src="${item.imgSrc}" alt="${item.title}" class="w-full h-full object-cover">
            </div>
            <div class="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <div class="flex justify-between items-start gap-1">
                  <h4 class="font-serif font-medium text-on-surface text-sm sm:text-base truncate">${item.title}</h4>
                  <button onclick="HWC_Cart.removeItem(${idx})" class="text-on-surface-variant hover:text-error transition-colors p-1" title="Remove">
                    <span class="material-symbols-outlined text-base">close</span>
                  </button>
                </div>
                <span class="text-[11px] text-primary font-semibold tracking-wider uppercase">${item.cluster}</span>
              </div>
              <div class="flex justify-between items-center mt-2">
                <span class="font-serif font-bold text-primary text-sm sm:text-base">${item.priceFormatted}</span>
                <div class="flex items-center border border-outline-variant/50 rounded-lg bg-surface">
                  <button onclick="HWC_Cart.updateQuantity(${idx}, -1)" class="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                    <span class="material-symbols-outlined text-xs">remove</span>
                  </button>
                  <span class="w-6 sm:w-8 text-center text-xs font-semibold text-on-surface">${item.quantity}</span>
                  <button onclick="HWC_Cart.updateQuantity(${idx}, 1)" class="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                    <span class="material-symbols-outlined text-xs">add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `).join('');
      }
    }
  }

  // Build and Mount Checkout Modal
  function setupCheckoutModal() {
    let modal = document.getElementById('checkout-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'checkout-modal';
      modal.className = 'fixed inset-0 z-[100] hidden flex items-center justify-center p-3 sm:p-6';
      modal.innerHTML = `
        <div id="checkout-backdrop" class="fixed inset-0 bg-inverse-surface/60 backdrop-blur-sm transition-opacity opacity-0"></div>
        <div id="checkout-panel" class="relative z-10 bg-surface rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-5 sm:p-7 shadow-2xl border border-outline-variant/40 transform scale-95 opacity-0 transition-all duration-300">
          <div class="flex justify-between items-center pb-3 border-b border-outline-variant/30 mb-5">
            <div>
              <span class="text-[11px] uppercase tracking-widest text-secondary font-bold">Direct Artisan Checkout</span>
              <h3 class="font-serif text-xl sm:text-2xl font-semibold text-primary">Complete Your Order</h3>
            </div>
            <button id="close-checkout" class="text-on-surface-variant hover:text-primary p-1.5 rounded-full">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <form id="checkout-form" class="space-y-3.5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Full Name *</label>
                <input type="text" id="chk-name" required placeholder="Priya Sharma" class="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary text-sm">
              </div>
              <div>
                <label class="block text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Email Address *</label>
                <input type="email" id="chk-email" required placeholder="priya@example.com" class="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary text-sm">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Phone Number *</label>
                <input type="tel" id="chk-phone" required placeholder="+91 98765 43210" class="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary text-sm">
              </div>
              <div>
                <label class="block text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1">PIN / Postal Code *</label>
                <input type="text" id="chk-pin" required placeholder="110001" class="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary text-sm">
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Delivery Address *</label>
              <textarea id="chk-address" required rows="2" placeholder="House / Flat No, Street, Landmark, City, State" class="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary text-sm"></textarea>
            </div>

            <!-- Coupon Code Row -->
            <div class="flex gap-2">
              <input type="text" id="coupon-input" placeholder="Coupon Code (e.g. WEAVER10)" class="flex-1 px-3 py-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary text-xs uppercase">
              <button type="button" id="apply-coupon-btn" class="px-4 py-2 bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface rounded-lg text-xs font-semibold transition-colors">
                Apply
              </button>
            </div>

            <div class="pt-1">
              <label class="block text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">Payment Method</label>
              <div class="grid grid-cols-3 gap-2">
                <label class="flex flex-col items-center justify-center p-2.5 rounded-xl border-2 border-primary bg-primary/5 cursor-pointer text-center">
                  <input type="radio" name="payment_method" value="upi" checked class="hidden">
                  <span class="material-symbols-outlined text-primary mb-0.5 text-xl">qr_code_2</span>
                  <span class="text-[11px] font-bold text-primary">UPI / QR</span>
                </label>
                <label class="flex flex-col items-center justify-center p-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest cursor-pointer text-center hover:border-primary">
                  <input type="radio" name="payment_method" value="card" class="hidden">
                  <span class="material-symbols-outlined text-on-surface mb-0.5 text-xl">credit_card</span>
                  <span class="text-[11px] font-medium text-on-surface">Card</span>
                </label>
                <label class="flex flex-col items-center justify-center p-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest cursor-pointer text-center hover:border-primary">
                  <input type="radio" name="payment_method" value="cod" class="hidden">
                  <span class="material-symbols-outlined text-on-surface mb-0.5 text-xl">local_shipping</span>
                  <span class="text-[11px] font-medium text-on-surface">Pay on Delivery</span>
                </label>
              </div>
            </div>

            <div class="p-3.5 bg-surface-container rounded-xl border border-outline-variant/30 text-xs text-on-surface-variant space-y-1.5">
              <div class="flex justify-between">
                <span>Subtotal:</span>
                <span id="chk-subtotal-text" class="font-semibold text-on-surface">₹0</span>
              </div>
              <div id="chk-discount-row" class="flex justify-between text-emerald-600 hidden">
                <span>Artisan Coupon Discount:</span>
                <span id="chk-discount-text">-₹0</span>
              </div>
              <div class="flex justify-between">
                <span>Direct Artisan Living Wage Share (72%):</span>
                <span id="chk-wage-text" class="font-semibold text-secondary">₹0</span>
              </div>
              <div class="flex justify-between">
                <span>Insured Heritage Shipping:</span>
                <span class="font-semibold text-secondary">FREE</span>
              </div>
              <div class="flex justify-between text-sm sm:text-base font-serif font-bold text-primary pt-2 border-t border-outline-variant/30">
                <span>Total Amount:</span>
                <span id="chk-total-text">₹0</span>
              </div>
            </div>

            <div class="flex gap-2.5 pt-2">
              <button type="button" id="cancel-checkout" class="w-1/3 py-2.5 border border-outline-variant rounded-full text-xs sm:text-sm font-semibold text-on-surface hover:bg-surface-container transition-colors">
                Cancel
              </button>
              <button type="submit" class="flex-1 py-2.5 bg-primary text-on-primary rounded-full text-xs sm:text-sm font-semibold hover:bg-surface-tint transition-all shadow-md flex items-center justify-center gap-1.5">
                <span>Confirm & Place Order</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </form>

          <div id="checkout-success" class="hidden text-center py-6">
            <div class="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <span class="material-symbols-outlined text-3xl">check_circle</span>
            </div>
            <span class="text-[11px] uppercase tracking-widest text-secondary font-bold">Order Confirmed</span>
            <h3 class="font-serif text-2xl font-semibold text-primary mt-1 mb-2">Thank You for Supporting Handloom!</h3>
            <p class="text-xs sm:text-sm text-on-surface-variant max-w-sm mx-auto mb-4 leading-relaxed">
              Your order <strong id="order-id" class="text-primary font-mono font-bold">HWC-2026-9481</strong> has been sent directly to the weaving cooperative. You will receive an SMS tracking link and a handwritten artisan card upon loom dispatch.
            </p>
            <div class="p-3.5 bg-surface-container rounded-xl text-left max-w-sm mx-auto text-xs text-on-surface-variant mb-5 space-y-1">
              <div><strong>Recipient:</strong> <span id="conf-name"></span></div>
              <div><strong>Delivery To:</strong> <span id="conf-address"></span></div>
              <div><strong>Estimated Loom Dispatch:</strong> 3-5 Business Days</div>
            </div>
            <button id="success-done-btn" class="bg-primary text-on-primary px-7 py-2.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-surface-tint transition-all shadow-md">
              Continue Exploring
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      const closeBtn = document.getElementById('close-checkout');
      const cancelBtn = document.getElementById('cancel-checkout');
      const backdrop = document.getElementById('checkout-backdrop');
      const doneBtn = document.getElementById('success-done-btn');
      const form = document.getElementById('checkout-form');
      const couponBtn = document.getElementById('apply-coupon-btn');
      const couponInput = document.getElementById('coupon-input');

      function hideCheckoutModal() {
        const panel = document.getElementById('checkout-panel');
        backdrop.classList.remove('opacity-100');
        backdrop.classList.add('opacity-0');
        panel.classList.remove('scale-100', 'opacity-100');
        panel.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
          modal.classList.add('hidden');
          document.getElementById('checkout-form').classList.remove('hidden');
          document.getElementById('checkout-success').classList.add('hidden');
        }, 300);
      }

      if (closeBtn) closeBtn.onclick = hideCheckoutModal;
      if (cancelBtn) cancelBtn.onclick = hideCheckoutModal;
      if (backdrop) backdrop.onclick = hideCheckoutModal;
      if (doneBtn) doneBtn.onclick = hideCheckoutModal;

      if (couponBtn) {
        couponBtn.onclick = () => {
          const applied = applyCoupon(couponInput.value);
          if (applied) {
            const summary = getCartSummary();
            document.getElementById('chk-subtotal-text').textContent = '₹' + summary.rawSubtotal.toLocaleString('en-IN');
            const discountRow = document.getElementById('chk-discount-row');
            if (discountRow) {
              discountRow.classList.remove('hidden');
              document.getElementById('chk-discount-text').textContent = '-' + summary.discountFormatted;
            }
            document.getElementById('chk-wage-text').textContent = '₹' + Math.round(summary.subtotal * 0.72).toLocaleString('en-IN');
            document.getElementById('chk-total-text').textContent = summary.totalFormatted;
          }
        };
      }

      if (form) {
        form.onsubmit = function(e) {
          e.preventDefault();
          const name = document.getElementById('chk-name').value;
          const address = document.getElementById('chk-address').value;
          const randomOrder = 'HWC-' + Math.floor(100000 + Math.random() * 900000);

          document.getElementById('order-id').textContent = randomOrder;
          document.getElementById('conf-name').textContent = name;
          document.getElementById('conf-address').textContent = address;

          form.classList.add('hidden');
          document.getElementById('checkout-success').classList.remove('hidden');

          clearCart();
          if (window.HWC_Shared && window.HWC_Shared.showToast) {
            window.HWC_Shared.showToast(`Order ${randomOrder} placed successfully!`, 'verified');
          }
        };
      }
    }
  }

  function openCheckout() {
    closeCart();
    setupCheckoutModal();
    const modal = document.getElementById('checkout-modal');
    const backdrop = document.getElementById('checkout-backdrop');
    const panel = document.getElementById('checkout-panel');
    const summary = getCartSummary();

    if (summary.count === 0) {
      if (window.HWC_Shared && window.HWC_Shared.showToast) {
        window.HWC_Shared.showToast('Please add items to your cart first.', 'info');
      }
      return;
    }

    document.getElementById('chk-subtotal-text').textContent = '₹' + (summary.rawSubtotal || summary.subtotal).toLocaleString('en-IN');
    const discountRow = document.getElementById('chk-discount-row');
    if (discountRow) {
      if (summary.discount > 0) {
        discountRow.classList.remove('hidden');
        document.getElementById('chk-discount-text').textContent = '-' + summary.discountFormatted;
      } else {
        discountRow.classList.add('hidden');
      }
    }
    document.getElementById('chk-wage-text').textContent = '₹' + Math.round(summary.subtotal * 0.72).toLocaleString('en-IN');
    document.getElementById('chk-total-text').textContent = summary.totalFormatted;

    modal.classList.remove('hidden');
    setTimeout(() => {
      backdrop.classList.remove('opacity-0');
      backdrop.classList.add('opacity-100');
      panel.classList.remove('scale-95', 'opacity-0');
      panel.classList.add('scale-100', 'opacity-100');
    }, 10);
  }

  function init() {
    updateCartUI();
    setupCheckoutModal();

    document.querySelectorAll('#open-cart-btn, .open-cart-trigger').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        openCart();
      };
    });

    const closeBtn = document.getElementById('close-cart');
    const backdrop = document.getElementById('cart-backdrop');
    if (closeBtn) closeBtn.onclick = closeCart;
    if (backdrop) backdrop.onclick = closeCart;

    document.querySelectorAll('#checkout-btn, .proceed-checkout-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        openCheckout();
      };
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCart();
        const chkModal = document.getElementById('checkout-modal');
        if (chkModal && !chkModal.classList.contains('hidden')) {
          const cancel = document.getElementById('cancel-checkout');
          if (cancel) cancel.click();
        }
      }
    });

    wireAddToCartButtons();
  }

  function wireAddToCartButtons() {
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      if (btn.dataset.hwcBound) return;
      btn.dataset.hwcBound = 'true';
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const card = btn.closest('[data-product-id]') || btn.closest('.group');
        let title = 'Artisanal Handloom Piece';
        let price = 18500;
        let cluster = 'Varanasi Silk';
        let imgSrc = '';
        let id = '';

        if (card) {
          id = card.dataset.productId || '';
          const titleEl = card.querySelector('h3') || card.querySelector('.product-title');
          if (titleEl) title = titleEl.textContent.trim();

          const priceEl = card.querySelector('.font-bold') || card.querySelector('.product-price');
          if (card.dataset.price) {
            price = Number(card.dataset.price);
          } else if (priceEl) {
            const raw = priceEl.textContent.replace(/[^0-9]/g, '');
            if (raw) price = Number(raw);
          }

          const clusterEl = card.querySelector('[data-category]') || card.querySelector('.uppercase');
          if (clusterEl) cluster = clusterEl.textContent.trim();

          const imgEl = card.querySelector('img');
          if (imgEl) imgSrc = imgEl.src;
        }

        addToCart({
          id,
          title,
          price,
          cluster,
          imgSrc,
          quantity: 1
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return {
    getCart,
    addToCart,
    buyNow,
    updateQuantity,
    removeItem,
    clearCart,
    openCart,
    closeCart,
    openCheckout,
    applyCoupon,
    updateCartUI,
    wireAddToCartButtons
  };
})();

window.HWC_Cart = HWC_Cart;
window.updateQuantity = HWC_Cart.updateQuantity;
