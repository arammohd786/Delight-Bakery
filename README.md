# 🥐 Aram Bakery

> **"Freshly Baked Happiness Every Day"**  
> A fully functional, frontend-only bakery e-commerce website built with React + Vite.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (opens at http://localhost:3000)
npm run dev

# 3. Build for production
npm run build
```

---

## 🔐 Login Credentials

| Field    | Value                   |
|----------|-------------------------|
| Email    | lonewolf@delightbakers.com     |
| Password | lonewolf                |

> Login is required before placing an order. Session is stored in **Local Storage**.

---

## 📁 Project Structure

```
aram-bakery/
├── index.html          ← Vite HTML entry point
├── vite.config.js      ← Vite configuration
├── package.json        ← Dependencies
├── src/
│   ├── main.jsx        ← React DOM root
│   ├── index.css       ← Global styles + animations
│   └── AramBakery.jsx  ← Entire application (single-file)
```

> All components, context, routing, and data live in `AramBakery.jsx`.  
> Move `main.jsx`, `index.css` → `src/` and `AramBakery.jsx` → `src/` before running.

---

## ✨ Features

### 🔑 Authentication
- Hardcoded credentials (`lonewolf@delightbakery.com` / `lonewolf`)
- Login session stored in Local Storage
- Unauthenticated users redirected to Login page before checkout

### 🏠 Home Page
- Hero section with tagline and animated product cards
- Category grid (Cakes, Pastries, Cookies, Bread, Donuts, Cupcakes)
- Bestsellers section
- Special offer banner (free delivery over ₹500)
- Customer testimonials

### 🛍️ Product Catalog (20 Products)
- Search by name or description
- Filter by category tabs
- Sort by price (asc/desc) or rating
- Live results count

### 📄 Product Detail Page
- Emoji-based image gallery
- Full description + rating
- Quantity selector
- **Add to Cart** and **Buy Now** buttons
- Related products section

### 🛒 Shopping Cart
- Add / update quantity / remove items
- Auto-calculated:
  - Subtotal
  - GST @ 5%
  - Delivery (free above ₹500, else ₹49)
  - Grand Total
- Cart persisted in Local Storage
- Free-delivery progress hint

### 💳 Checkout
- Shipping form (name, phone, address, city, pincode)
- Payment methods: Credit/Debit Card · UPI · Cash on Delivery
- Simulated payment processing (1.5s delay)
- Unique Order ID generated (`AB` + 6-digit timestamp)
- Success screen with order ID

### 📦 Order Tracking
- Search by Order ID
- Simulated stage progression based on elapsed time:
  - **0–2 min** → Order Placed
  - **2–5 min** → Preparing
  - **5–10 min** → Baking
  - **10–15 min** → Out for Delivery
  - **15+ min** → Delivered
- Visual progress bar with emoji icons
- Quick-select from recent orders

### 👤 User Dashboard
- Stats: Total Orders, Active, Completed, Total Spent
- Active orders tab with live stage badge
- Completed orders tab
- **Reorder** — re-adds all items to cart in one click
- Track order shortcut

### 🌙 Dark / Light Mode
- Toggle in navbar
- Preference saved to Local Storage
- Cream / beige / brown palette in light mode
- Deep amber / dark cocoa palette in dark mode

### 🔔 Toast Notifications
- Success, error, and info toasts
- Auto-dismiss after 3 seconds
- Slide-in animation

### 📱 Responsive Design
- Mobile: single-column, hamburger menu
- Tablet: 2-column grids
- Desktop: full multi-column layout

---

## 🎨 Colour Palette

| Token        | Light           | Dark            |
|--------------|-----------------|-----------------|
| Background   | `#fdf8f0`       | `#1a1208`       |
| Surface      | `#ffffff`       | `#2a1f10`       |
| Accent       | `#c8692a`       | `#c8692a`       |
| Text         | `#2c1810`       | `#f5e8d0`       |
| Muted text   | `#7a5c48`       | `#a89070`       |
| Border       | `#ede0d0`       | `#4a3020`       |
| Gold stars   | `#d4a843`       | `#d4a843`       |

---

## 🗂️ Local Storage Keys

| Key           | Content                        |
|---------------|--------------------------------|
| `aram_user`   | Logged-in user object or null  |
| `aram_cart`   | Array of cart items            |
| `aram_orders` | Array of placed orders         |
| `aram_dark`   | Dark mode boolean              |

---

## 📦 Dependencies

| Package              | Version  | Purpose              |
|----------------------|----------|----------------------|
| react                | ^18.3.1  | UI library           |
| react-dom            | ^18.3.1  | DOM renderer         |
| vite                 | ^5.4.2   | Build tool + dev server |
| @vitejs/plugin-react | ^4.3.1   | JSX transform        |

> No external UI library, no backend, no database.  
> Pure React + inline styles + CSS custom properties.

---

## © 2026 Aram Bakery. All Rights Reserved.
