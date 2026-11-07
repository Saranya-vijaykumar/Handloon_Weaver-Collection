# Handloom Weavers Collective

A production-ready artisanal e-commerce and cultural storytelling web platform converted directly from the Google Stitch design system (`projects/9379716160907009380`).

---

## 🌟 Key Features

1. **8 Interconnected Pages**:
   - **`index.html`**: Home page & weaver stories, hero banner, featured heirlooms, craftsmanship values.
   - **`products.html`**: Master catalog with real-time live search, fabric filtering (Silk, Cotton, Wool, Linen), and price sorting.
   - **`product-detail.html`**: Deep-dive product showcase with multi-angle image gallery switcher, fabric specifications, artisan attribution badge, and add-to-cart stepper.
   - **`artisans.html`**: Artisan directory with regional cluster filters (Varanasi, Chanderi, Kashmir, Pochampally, etc.), an interactive weaver audio waveform player with play/pause timer, and a personal journal modal.
   - **`craft-silk.html`**: Visual storytelling guide on Varanasi Silk weaving heritage from raw cocoon to handloom pit.
   - **`fair-trade.html`**: Transparent wage breakdown (72% direct living wage guarantee vs. middleman markup) and eco-sustainability metrics.
   - **`about.html`**: The founding story of the collective, nationwide cluster map, and loom preservation initiatives.
   - **`contact.html`**: Interactive contact and custom bridal/weaving commission form with real-time validation and toast notifications, plus an FAQ accordion.

2. **Real-Time Interactive State**:
   - **Slide-Over Cart Drawer**: Slide-over drawer with item increment/decrement, free shipping progress bar, and subtotal calculation.
   - **`localStorage` Synchronization**: Cart items persist seamlessly across page reloads and between all 8 pages.
   - **Complete Checkout Flow**: Interactive modal collecting address and payment method (UPI, Card, COD) with celebratory order placement state.
   - **Global Search Modal**: Search through sarees, stoles, fabrics, and master artisans with instant live results.
   - **Mobile Hamburger Drawer**: Fully responsive navigation for mobile and tablet devices.
   - **Toast Notifications**: Feedback when items are added/removed or forms are submitted.

---

## 🚀 Quick Start

### Option 1: Open Directly in Any Browser
You can open any HTML file (such as `index.html`) directly in Google Chrome, Microsoft Edge, Firefox, or Safari. No build step or installation required!

### Option 2: Run with the Included Node.js Server
From the project folder, run:
```bash
npm start
```
or:
```bash
node server.js
```
Then visit:
```
http://localhost:3000
```

---

## 📁 Project Structure

```
hand weaver/
├── index.html               # Home page
├── products.html            # Products catalog with live search & filters
├── product-detail.html      # Product detail page with gallery switcher
├── artisans.html            # Artisan directory & interactive audio player
├── craft-silk.html          # Varanasi Silk craft story
├── fair-trade.html          # Fair Trade & wage transparency
├── about.html               # Heritage, mission, and cluster map
├── contact.html             # Contact & bespoke commission form
├── css/
│   └── custom.css           # Custom linen textures, animations & scrollbar
├── js/
│   ├── products-data.js     # Master product & artisan catalog dataset
│   ├── cart.js              # Persistent cart drawer & checkout modal
│   └── shared.js            # Active navigation, mobile menu, search, toasts
├── server.js                # Lightweight zero-dependency static web server
├── package.json             # NPM scripts (npm start, npm run dev)
└── README.md                # Documentation
```
