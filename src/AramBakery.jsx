import { useState, useEffect, useContext, createContext, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS & DATA
// ─────────────────────────────────────────────────────────────────────────────
const CREDENTIALS = { email: "lonewolf@delightbakers.com", password: "lonewolf" };
const GST_RATE = 0.05;
const DELIVERY_CHARGE = 49;
const FREE_DELIVERY_ABOVE = 500;

const PRODUCTS = [
  { id: 1, name: "Classic Vanilla Cake", category: "Cakes", price: 450, description: "Light, fluffy vanilla sponge layered with silky buttercream. A timeless classic for every celebration.", rating: 4.8, reviews: 124, badge: "Bestseller", emoji: "🎂" },
  { id: 2, name: "Dark Chocolate Truffle", category: "Cakes", price: 550, description: "Rich Belgian chocolate ganache cake with velvety layers. Pure indulgence in every bite.", rating: 4.9, reviews: 98, badge: "Popular", emoji: "🍫" },
  { id: 3, name: "Strawberry Dream Cake", category: "Cakes", price: 520, description: "Fresh strawberry compote between moist layers, crowned with whipped cream rosettes.", rating: 4.7, reviews: 76, badge: "", emoji: "🍓" },
  { id: 4, name: "Red Velvet Cake", category: "Cakes", price: 480, description: "Velvety crimson sponge with a tangy cream cheese frosting — dramatic and delicious.", rating: 4.8, reviews: 112, badge: "New", emoji: "❤️" },
  { id: 5, name: "Butter Croissant", category: "Pastries", price: 65, description: "Hand-rolled with 27 layers of pure butter, baked to golden flaky perfection every morning.", rating: 4.9, reviews: 210, badge: "Bestseller", emoji: "🥐" },
  { id: 6, name: "Pain au Chocolat", category: "Pastries", price: 75, description: "Classic French pastry with two batons of dark Valrhona chocolate tucked inside.", rating: 4.8, reviews: 167, badge: "", emoji: "🍩" },
  { id: 7, name: "Almond Danish", category: "Pastries", price: 80, description: "Flaky laminated dough filled with almond frangipane and topped with toasted flakes.", rating: 4.6, reviews: 89, badge: "Popular", emoji: "🌸" },
  { id: 8, name: "Cinnamon Roll", category: "Pastries", price: 90, description: "Pillowy soft roll swirled with cinnamon sugar, drizzled with warm cream cheese glaze.", rating: 4.9, reviews: 198, badge: "Fan Fav", emoji: "🌀" },
  { id: 9, name: "Chocolate Chip Cookies", category: "Cookies", price: 180, description: "Six generous cookies with dark and milk chocolate chips. Crisp edges, chewy centre.", rating: 4.7, reviews: 245, badge: "Bestseller", emoji: "🍪" },
  { id: 10, name: "Salted Caramel Cookies", category: "Cookies", price: 200, description: "Brown butter cookies with caramel pockets and flaky Maldon sea salt on top.", rating: 4.8, reviews: 134, badge: "New", emoji: "🧂" },
  { id: 11, name: "Oatmeal Raisin Cookies", category: "Cookies", price: 160, description: "Hearty oats with plump California raisins and warm cinnamon — comfort in cookie form.", rating: 4.5, reviews: 78, badge: "", emoji: "🌾" },
  { id: 12, name: "Sourdough Loaf", category: "Bread", price: 220, description: "48-hour cold-fermented sourdough with a crackly crust and open crumb. Made with heritage wheat.", rating: 4.9, reviews: 189, badge: "Artisan", emoji: "🍞" },
  { id: 13, name: "Multigrain Loaf", category: "Bread", price: 180, description: "Seven grains seeded throughout a wholesome loaf — perfect for everyday sandwiches.", rating: 4.6, reviews: 92, badge: "", emoji: "🌿" },
  { id: 14, name: "Garlic Herb Focaccia", category: "Bread", price: 150, description: "Pillowy Italian flatbread dimpled with roasted garlic, rosemary, and good olive oil.", rating: 4.8, reviews: 143, badge: "Popular", emoji: "🌿" },
  { id: 15, name: "Glazed Donut", category: "Donuts", price: 55, description: "Classic yeast-raised donut with a thin, crackly sugar glaze. Light as air inside.", rating: 4.7, reviews: 267, badge: "Bestseller", emoji: "🍩" },
  { id: 16, name: "Chocolate Sprinkle Donut", category: "Donuts", price: 65, description: "Rich chocolate-frosted donut showered with rainbow sprinkles. Joy on a plate.", rating: 4.8, reviews: 201, badge: "Popular", emoji: "🎉" },
  { id: 17, name: "Strawberry Frosted Donut", category: "Donuts", price: 65, description: "Strawberry glaze made from real fruit on a fluffy ring — sweet, pink, perfect.", rating: 4.6, reviews: 145, badge: "", emoji: "🌸" },
  { id: 18, name: "Classic Vanilla Cupcake", category: "Cupcakes", price: 80, description: "Moist vanilla cupcake with a towering swirl of Swiss meringue buttercream.", rating: 4.7, reviews: 178, badge: "", emoji: "🧁" },
  { id: 19, name: "Red Velvet Cupcake", category: "Cupcakes", price: 90, description: "Crimson cupcake with cream cheese frosting — miniature elegance for any occasion.", rating: 4.9, reviews: 156, badge: "Popular", emoji: "❤️" },
  { id: 20, name: "Lemon Blueberry Cupcake", category: "Cupcakes", price: 85, description: "Zesty lemon sponge studded with fresh blueberries, topped with lemon curd buttercream.", rating: 4.8, reviews: 112, badge: "New", emoji: "🍋" },
];

const CATEGORIES = ["All", "Cakes", "Pastries", "Cookies", "Bread", "Donuts", "Cupcakes"];

const TESTIMONIALS = [
  { name: "Priya Sharma", text: "The sourdough is absolutely divine! I order every weekend — it's become our Sunday ritual.", stars: 5 },
  { name: "Rohan Mehta", text: "Ordered a custom birthday cake and it was beyond expectations. Tastes as beautiful as it looks.", stars: 5 },
  { name: "Ananya Gupta", text: "The butter croissants are better than anything I've had in Paris. Truly world-class.", stars: 5 },
];

const ORDER_STAGES = ["Order Placed", "Preparing", "Baking", "Out for Delivery", "Delivered"];

// ─────────────────────────────────────────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────────────────────────────────────────
const AppContext = createContext(null);

function useApp() { return useContext(AppContext); }

function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem("aram_dark") || "false"));
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("aram_user") || "null"));
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("aram_cart") || "[]"));
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem("aram_orders") || "[]"));
  const [toasts, setToasts] = useState([]);

  useEffect(() => { localStorage.setItem("aram_dark", JSON.stringify(darkMode)); }, [darkMode]);
  useEffect(() => { localStorage.setItem("aram_user", JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem("aram_cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("aram_orders", JSON.stringify(orders)); }, [orders]);

  const toast = useCallback((msg, type = "success") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);

  const login = (email, password) => {
    if (email === CREDENTIALS.email && password === CREDENTIALS.password) {
      setUser({ email, name: "Aram User" });
      return true;
    }
    return false;
  };

  const logout = () => { setUser(null); setCart([]); };

  const addToCart = (product, qty = 1) => {
    setCart(c => {
      const existing = c.find(i => i.id === product.id);
      if (existing) return c.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...c, { ...product, qty }];
    });
    toast(`${product.name} added to cart 🛒`);
  };

  const updateQty = (id, qty) => {
    if (qty < 1) { removeFromCart(id); return; }
    setCart(c => c.map(i => i.id === id ? { ...i, qty } : i));
  };

  const removeFromCart = (id) => {
    setCart(c => c.filter(i => i.id !== id));
    toast("Item removed", "info");
  };

  const clearCart = () => setCart([]);

  const placeOrder = (details) => {
    const orderId = "AB" + Date.now().toString().slice(-6);
    const order = {
      id: orderId,
      items: [...cart],
      details,
      total: cartTotal(),
      date: new Date().toISOString(),
      stage: 0,
      stageUpdatedAt: new Date().toISOString(),
    };
    setOrders(o => [order, ...o]);
    clearCart();
    return orderId;
  };

  const cartCount = () => cart.reduce((s, i) => s + i.qty, 0);
  const cartSubtotal = () => cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartTotal = () => {
    const sub = cartSubtotal();
    const gst = sub * GST_RATE;
    const delivery = sub >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_CHARGE;
    return sub + gst + delivery;
  };

  return (
    <AppContext.Provider value={{
      darkMode, setDarkMode, user, login, logout,
      cart, addToCart, updateQty, removeFromCart, clearCart,
      orders, setOrders, placeOrder,
      cartCount, cartSubtotal, cartTotal,
      toasts, toast,
    }}>
      {children}
    </AppContext.Provider>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────────────────────
const getStyles = (dark) => ({
  bg: dark ? "#1a1208" : "#fdf8f0",
  surface: dark ? "#2a1f10" : "#ffffff",
  surfaceAlt: dark ? "#231810" : "#fef9f2",
  card: dark ? "#2e2212" : "#ffffff",
  text: dark ? "#f5e8d0" : "#2c1810",
  textMuted: dark ? "#a89070" : "#7a5c48",
  accent: "#c8692a",
  accentHover: "#a84e1a",
  pink: "#e8a0b4",
  pinkLight: dark ? "#4a2030" : "#fdeef4",
  border: dark ? "#4a3020" : "#ede0d0",
  navBg: dark ? "rgba(26,18,8,0.95)" : "rgba(253,248,240,0.95)",
  btnPrimary: "linear-gradient(135deg, #c8692a, #a84e1a)",
  cream: dark ? "#2e2212" : "#fdf4e7",
  gold: "#d4a843",
});

// ─────────────────────────────────────────────────────────────────────────────
// TOAST COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
function Toasts() {
  const { toasts } = useApp();
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          padding: "12px 20px", borderRadius: 12, fontWeight: 500, fontSize: 14,
          background: t.type === "success" ? "#c8692a" : t.type === "error" ? "#c0392b" : "#5a7a4a",
          color: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          animation: "slideIn 0.3s ease",
        }}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────────────────
function Navbar({ page, setPage }) {
  const { darkMode, setDarkMode, user, logout, cartCount } = useApp();
  const s = getStyles(darkMode);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "products", label: "Products" },
    { id: "track", label: "Track Order" },
    ...(user ? [{ id: "dashboard", label: "Dashboard" }] : []),
  ];

  const navLink = (id, label) => (
    <button key={id} onClick={() => { setPage(id); setMenuOpen(false); }} style={{
      background: "none", border: "none", cursor: "pointer",
      color: page === id ? s.accent : s.text,
      fontWeight: page === id ? 700 : 500, fontSize: 15,
      padding: "6px 12px", borderRadius: 8,
      borderBottom: page === id ? `2px solid ${s.accent}` : "2px solid transparent",
      transition: "all 0.2s",
    }}>{label}</button>
  );

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: s.navBg, backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${s.border}`,
        padding: "0 24px", height: 64, display: "flex", alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Logo */}
        <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: s.btnPrimary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🥐</div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontWeight: 800, fontSize: 18, color: s.accent, lineHeight: 1 }}>Delight Bakers</div>
            <div style={{ fontSize: 10, color: s.textMuted, letterSpacing: 1.5, textTransform: "uppercase" }}>Est. 2019</div>
          </div>
        </button>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="desktop-nav">
          {navItems.map(n => navLink(n.id, n.label))}
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setDarkMode(!darkMode)} style={{
            background: s.surface, border: `1px solid ${s.border}`, borderRadius: 8,
            padding: "6px 10px", cursor: "pointer", fontSize: 18, color: s.text,
          }}>{darkMode ? "☀️" : "🌙"}</button>

          <button onClick={() => setPage("cart")} style={{
            background: s.surface, border: `1px solid ${s.border}`, borderRadius: 8,
            padding: "6px 12px", cursor: "pointer", color: s.text,
            display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600,
            position: "relative",
          }}>
            🛒 Cart
            {cartCount() > 0 && (
              <span style={{
                background: s.accent, color: "#fff", borderRadius: "50%",
                width: 20, height: 20, fontSize: 11, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{cartCount()}</span>
            )}
          </button>

          {user ? (
            <button onClick={() => { logout(); setPage("home"); }} style={{
              background: s.btnPrimary, border: "none", borderRadius: 8,
              padding: "8px 16px", cursor: "pointer", color: "#fff",
              fontWeight: 600, fontSize: 14,
            }}>Logout</button>
          ) : (
            <button onClick={() => setPage("login")} style={{
              background: s.btnPrimary, border: "none", borderRadius: 8,
              padding: "8px 16px", cursor: "pointer", color: "#fff",
              fontWeight: 600, fontSize: 14,
            }}>Login</button>
          )}

          {/* Mobile menu */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: "none", border: `1px solid ${s.border}`, borderRadius: 8,
            padding: "6px 10px", cursor: "pointer", fontSize: 18, color: s.text,
          }} className="mobile-menu-btn">☰</button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 99,
          background: s.surface, borderBottom: `1px solid ${s.border}`,
          padding: "16px 24px", display: "flex", flexDirection: "column", gap: 8,
        }}>
          {navItems.map(n => navLink(n.id, n.label))}
        </div>
      )}

      <style>{`
        @media (min-width: 768px) { .mobile-menu-btn { display: none !important; } }
        @media (max-width: 767px) { .desktop-nav { display: none !important; } }
        @keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes fadeUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'Segoe UI', system-ui, sans-serif; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #c8692a44; border-radius: 3px; }
      `}</style>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  const { darkMode } = useApp();
  const s = getStyles(darkMode);
  return (
    <footer style={{ background: dark => dark ? "#0f0a04" : "#2c1810", backgroundColor: "#2c1810", color: "#f5e8d0", padding: "48px 24px 24px", marginTop: 80 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#c8692a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🥐</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 20, color: "#d4a843" }}>Delight Bakers</div>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#a89070" }}>Est. 2019</div>
              </div>
            </div>
            <p style={{ color: "#a89070", fontSize: 14, lineHeight: 1.7 }}>Freshly baked with love and the finest ingredients, delivered to your doorstep every day.</p>
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              {["📘", "📸", "🐦", "▶️"].map((icon, i) => (
                <div key={i} style={{ width: 36, height: 36, borderRadius: "50%", background: "#3a2518", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16 }}>{icon}</div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#d4a843", marginBottom: 16 }}>Quick Links</div>
            {[["Home", "home"], ["Products", "products"], ["Track Order", "track"], ["Dashboard", "dashboard"]].map(([label, id]) => (
              <button key={id} onClick={() => setPage(id)} style={{ display: "block", background: "none", border: "none", color: "#a89070", cursor: "pointer", fontSize: 14, padding: "4px 0", textAlign: "left" }}>{label}</button>
            ))}
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#d4a843", marginBottom: 16 }}>Categories</div>
            {CATEGORIES.filter(c => c !== "All").map(c => (
              <div key={c} style={{ color: "#a89070", fontSize: 14, padding: "4px 0" }}>{c}</div>
            ))}
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#d4a843", marginBottom: 16 }}>Contact Us</div>
            <div style={{ color: "#a89070", fontSize: 14, lineHeight: 2 }}>
              <div>📍 12 Baker Street, Delhi 110001</div>
              <div>📞 +91 98765 43210</div>
              <div>✉️ hello@delight bakers.com</div>
              <div>🕐 Mon–Sun: 7 AM – 9 PM</div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #3a2518", paddingTop: 24, textAlign: "center", color: "#7a5c48", fontSize: 14 }}>
          © 2026 Delight Bakers. All Rights Reserved. Made with ❤️ and 🧈
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOGIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
function LoginPage({ setPage }) {
  const { login, darkMode, toast } = useApp();
  const s = getStyles(darkMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (login(email, password)) {
        toast("Welcome back! 🎉");
        setPage("home");
      } else {
        toast("Invalid credentials", "error");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{ minHeight: "100vh", background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px 40px" }}>
      <div style={{ width: "100%", maxWidth: 420, animation: "fadeUp 0.5s ease" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: s.btnPrimary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 16px" }}>🥐</div>
          <h1 style={{ fontWeight: 800, fontSize: 28, color: s.accent, margin: 0 }}>Delight Bakers</h1>
          <p style={{ color: s.textMuted, margin: "8px 0 0", fontSize: 15 }}>Sign in to your account</p>
        </div>

        <div style={{ background: s.card, borderRadius: 20, padding: 32, border: `1px solid ${s.border}`, boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
          {/* Hint */}
          {/* <div style={{ background: s.pinkLight, border: `1px solid ${s.pink}40`, borderRadius: 10, padding: "12px 16px", marginBottom: 24, fontSize: 13 }}>
            <strong style={{ color: s.accent }}>Demo credentials:</strong><br />
            <span style={{ color: s.textMuted }}>user@delight bakers.com / aram123</span>
          </div> */}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: s.textMuted, marginBottom: 8 }}>Email Address</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="you@delight bakers.com"
                style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: `1px solid ${s.border}`, background: s.bg, color: s.text, fontSize: 15, outline: "none" }}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: s.textMuted, marginBottom: 8 }}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required
                  placeholder="••••••••"
                  style={{ width: "100%", padding: "12px 48px 12px 16px", borderRadius: 10, border: `1px solid ${s.border}`, background: s.bg, color: s.text, fontSize: 15, outline: "none" }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: s.textMuted, fontSize: 18 }}>
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{
              width: "100%", padding: "14px", borderRadius: 10, border: "none",
              background: s.btnPrimary, color: "#fff", fontWeight: 700, fontSize: 16,
              cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.8 : 1,
              transition: "opacity 0.2s",
            }}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  const { darkMode, addToCart } = useApp();
  const s = getStyles(darkMode);
  const featured = PRODUCTS.filter(p => p.badge === "Bestseller").slice(0, 4);

  return (
    <div style={{ background: s.bg, minHeight: "100vh", paddingTop: 64 }}>
      {/* Hero */}
      <section style={{
        background: `linear-gradient(135deg, ${darkMode ? "#2a1508" : "#fef5e7"} 0%, ${darkMode ? "#1a1208" : "#fdebd0"} 100%)`,
        padding: "80px 24px",
        borderBottom: `1px solid ${s.border}`,
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div style={{ animation: "fadeUp 0.6s ease" }}>
            <div style={{ display: "inline-block", background: s.pinkLight, color: s.accent, padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600, marginBottom: 20 }}>
              🌟 Delhi's Favourite Bakery
            </div>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, color: s.text, margin: "0 0 16px", lineHeight: 1.1 }}>
              Freshly Baked<br />
              <span style={{ color: s.accent }}>Happiness</span><br />
              Every Day
            </h1>
            <p style={{ color: s.textMuted, fontSize: 18, lineHeight: 1.7, margin: "0 0 32px", maxWidth: 440 }}>
              Artisan breads, decadent cakes, and buttery pastries — crafted with heritage recipes and the finest local ingredients.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button onClick={() => setPage("products")} style={{ padding: "14px 28px", borderRadius: 12, border: "none", background: s.btnPrimary, color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>
                Shop Now →
              </button>
              <button onClick={() => setPage("track")} style={{ padding: "14px 28px", borderRadius: 12, border: `2px solid ${s.accent}`, background: "transparent", color: s.accent, fontWeight: 700, fontSize: 16, cursor: "pointer" }}>
                Track Order
              </button>
            </div>
            <div style={{ display: "flex", gap: 32, marginTop: 40 }}>
              {[["500+", "Daily Orders"], ["4.9★", "Average Rating"], ["48hr", "Fermentation"]].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontWeight: 800, fontSize: 22, color: s.accent }}>{val}</div>
                  <div style={{ fontSize: 12, color: s.textMuted }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {featured.slice(0, 4).map((p, i) => (
              <div key={p.id} onClick={() => setPage(`product-${p.id}`)} style={{
                background: s.card, borderRadius: 16, padding: 20,
                border: `1px solid ${s.border}`, cursor: "pointer",
                transition: "transform 0.2s", animation: `fadeUp ${0.4 + i * 0.1}s ease`,
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{ fontSize: 40, textAlign: "center", marginBottom: 8 }}>{p.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: s.text, textAlign: "center" }}>{p.name}</div>
                <div style={{ color: s.accent, fontWeight: 700, textAlign: "center", marginTop: 4 }}>₹{p.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: "64px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontWeight: 800, fontSize: 32, color: s.text, marginBottom: 8 }}>Browse by Category</h2>
        <p style={{ textAlign: "center", color: s.textMuted, marginBottom: 40, fontSize: 16 }}>Something fresh baked for everyone</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16 }}>
          {[
            { name: "Cakes", emoji: "🎂", count: "4 items" },
            { name: "Pastries", emoji: "🥐", count: "4 items" },
            { name: "Cookies", emoji: "🍪", count: "3 items" },
            { name: "Bread", emoji: "🍞", count: "3 items" },
            { name: "Donuts", emoji: "🍩", count: "3 items" },
            { name: "Cupcakes", emoji: "🧁", count: "3 items" },
          ].map(cat => (
            <button key={cat.name} onClick={() => setPage("products")} style={{
              background: s.card, border: `1px solid ${s.border}`, borderRadius: 16,
              padding: "24px 16px", cursor: "pointer", textAlign: "center",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = s.accent; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = s.border; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ fontSize: 40, marginBottom: 10 }}>{cat.emoji}</div>
              <div style={{ fontWeight: 700, color: s.text, fontSize: 15 }}>{cat.name}</div>
              <div style={{ color: s.textMuted, fontSize: 12, marginTop: 4 }}>{cat.count}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: "0 24px 64px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <h2 style={{ fontWeight: 800, fontSize: 32, color: s.text, margin: 0 }}>Our Bestsellers</h2>
            <p style={{ color: s.textMuted, margin: "8px 0 0" }}>The items our customers can't stop ordering</p>
          </div>
          <button onClick={() => setPage("products")} style={{ padding: "10px 20px", borderRadius: 10, border: `2px solid ${s.accent}`, background: "transparent", color: s.accent, fontWeight: 600, cursor: "pointer" }}>View All</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
          {featured.map(p => <ProductCard key={p.id} product={p} setPage={setPage} />)}
        </div>
      </section>

      {/* Special Offer Banner */}
      <section style={{ padding: "0 24px 64px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          background: `linear-gradient(135deg, ${s.accent}, #a84e1a)`,
          borderRadius: 20, padding: "40px 48px",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20,
        }}>
          <div>
            <div style={{ color: "#fdebd0", fontSize: 13, fontWeight: 600, letterSpacing: 2, marginBottom: 8 }}>LIMITED TIME OFFER</div>
            <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 28, margin: "0 0 8px" }}>Free Delivery on orders over ₹500</h3>
            <p style={{ color: "#fdebd0", fontSize: 15, margin: 0 }}>Use code <strong>ARAM50</strong> for 10% off your first order!</p>
          </div>
          <button onClick={() => setPage("products")} style={{ padding: "14px 28px", borderRadius: 12, background: "#fff", color: s.accent, fontWeight: 700, fontSize: 16, border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>
            Order Now
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "0 24px 80px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontWeight: 800, fontSize: 32, color: s.text, marginBottom: 8 }}>What Our Customers Say</h2>
        <p style={{ textAlign: "center", color: s.textMuted, marginBottom: 40 }}>Real reviews from our daily regulars</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{ background: s.card, borderRadius: 16, padding: 28, border: `1px solid ${s.border}` }}>
              <div style={{ color: s.gold, fontSize: 18, marginBottom: 12 }}>{"★".repeat(t.stars)}</div>
              <p style={{ color: s.text, fontSize: 15, lineHeight: 1.7, margin: "0 0 20px", fontStyle: "italic" }}>"{t.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: s.pinkLight, color: s.accent, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>
                  {t.name[0]}
                </div>
                <div style={{ fontWeight: 700, color: s.text, fontSize: 14 }}>{t.name}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────────────────────────────────────────
function ProductCard({ product: p, setPage }) {
  const { darkMode, addToCart } = useApp();
  const s = getStyles(darkMode);
  return (
    <div style={{ background: s.card, borderRadius: 16, border: `1px solid ${s.border}`, overflow: "hidden", transition: "transform 0.2s, box-shadow 0.2s" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(200,105,42,0.15)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      {/* Image area */}
      <div onClick={() => setPage(`product-${p.id}`)} style={{ background: s.surfaceAlt, height: 160, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72, cursor: "pointer", position: "relative" }}>
        {p.emoji}
        {p.badge && (
          <div style={{ position: "absolute", top: 12, left: 12, background: s.accent, color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{p.badge}</div>
        )}
      </div>
      {/* Info */}
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 11, color: s.textMuted, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{p.category}</div>
        <div onClick={() => setPage(`product-${p.id}`)} style={{ fontWeight: 700, fontSize: 16, color: s.text, cursor: "pointer", marginBottom: 6 }}>{p.name}</div>
        <div style={{ color: s.textMuted, fontSize: 13, lineHeight: 1.5, marginBottom: 12, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.description}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 14 }}>
          <span style={{ color: s.gold, fontSize: 14 }}>★</span>
          <span style={{ fontWeight: 600, fontSize: 13, color: s.text }}>{p.rating}</span>
          <span style={{ color: s.textMuted, fontSize: 12 }}>({p.reviews})</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 800, fontSize: 20, color: s.accent }}>₹{p.price}</span>
          <button onClick={() => addToCart(p)} style={{ padding: "8px 16px", borderRadius: 10, border: "none", background: s.btnPrimary, color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCTS PAGE
// ─────────────────────────────────────────────────────────────────────────────
function ProductsPage({ setPage }) {
  const { darkMode } = useApp();
  const s = getStyles(darkMode);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  let filtered = PRODUCTS.filter(p => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <div style={{ background: s.bg, minHeight: "100vh", paddingTop: 64 }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${darkMode ? "#2a1508" : "#fef5e7"}, ${darkMode ? "#1a1208" : "#fdebd0"})`, padding: "48px 24px", borderBottom: `1px solid ${s.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h1 style={{ fontWeight: 900, fontSize: 40, color: s.text, margin: "0 0 8px" }}>Our Menu</h1>
          <p style={{ color: s.textMuted, fontSize: 17 }}>Fresh from our oven to your doorstep</p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        {/* Filters */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
          <input
            placeholder="🔍 Search breads, cakes, pastries..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: 200, padding: "10px 16px", borderRadius: 10, border: `1px solid ${s.border}`, background: s.card, color: s.text, fontSize: 14, outline: "none" }}
          />
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: "10px 16px", borderRadius: 10, border: `1px solid ${s.border}`, background: s.card, color: s.text, fontSize: 14, cursor: "pointer", outline: "none" }}>
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Category Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)} style={{
              padding: "8px 20px", borderRadius: 20, border: `2px solid ${category === c ? s.accent : s.border}`,
              background: category === c ? s.accent : s.card, color: category === c ? "#fff" : s.text,
              fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.2s",
            }}>{c}</button>
          ))}
        </div>

        {/* Results count */}
        <div style={{ color: s.textMuted, fontSize: 14, marginBottom: 20 }}>Showing {filtered.length} items</div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
            {filtered.map(p => <ProductCard key={p.id} product={p} setPage={setPage} />)}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 24px", color: s.textMuted }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>🔍</div>
            <div style={{ fontWeight: 700, fontSize: 20, color: s.text, marginBottom: 8 }}>Nothing found</div>
            <div>Try a different search or category</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT DETAIL PAGE
// ─────────────────────────────────────────────────────────────────────────────
function ProductDetailPage({ productId, setPage }) {
  const { darkMode, addToCart } = useApp();
  const s = getStyles(darkMode);
  const product = PRODUCTS.find(p => p.id === parseInt(productId));
  const [qty, setQty] = useState(1);

  if (!product) return <div style={{ padding: "100px 24px", textAlign: "center", color: s.text }}>Product not found</div>;

  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div style={{ background: s.bg, minHeight: "100vh", paddingTop: 64 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
        <button onClick={() => setPage("products")} style={{ background: "none", border: "none", color: s.accent, cursor: "pointer", fontWeight: 600, fontSize: 15, marginBottom: 24, padding: 0 }}>← Back to Products</button>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          {/* Gallery */}
          <div>
            <div style={{ background: s.surfaceAlt, borderRadius: 20, height: 360, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 140, border: `1px solid ${s.border}`, marginBottom: 16 }}>
              {product.emoji}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              {[product.emoji, product.emoji, product.emoji].map((em, i) => (
                <div key={i} style={{ flex: 1, background: s.surfaceAlt, borderRadius: 12, height: 80, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, border: `2px solid ${i === 0 ? s.accent : s.border}`, cursor: "pointer" }}>{em}</div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            {product.badge && <div style={{ display: "inline-block", background: s.accent, color: "#fff", padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 12 }}>{product.badge}</div>}
            <div style={{ fontSize: 13, color: s.textMuted, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>{product.category}</div>
            <h1 style={{ fontWeight: 900, fontSize: 32, color: s.text, margin: "0 0 16px" }}>{product.name}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <span style={{ color: s.gold, fontSize: 18 }}>{"★".repeat(Math.floor(product.rating))}</span>
              <span style={{ fontWeight: 700, color: s.text }}>{product.rating}</span>
              <span style={{ color: s.textMuted }}>({product.reviews} reviews)</span>
            </div>
            <p style={{ color: s.textMuted, fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>{product.description}</p>

            <div style={{ background: s.cream, borderRadius: 14, padding: 20, marginBottom: 24, border: `1px solid ${s.border}` }}>
              <div style={{ display: "flex", gap: 20, fontSize: 14, color: s.textMuted }}>
                <span>🌾 Premium ingredients</span>
                <span>🕐 Baked fresh daily</span>
              </div>
            </div>

            <div style={{ fontWeight: 900, fontSize: 36, color: s.accent, marginBottom: 24 }}>₹{product.price}</div>

            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <span style={{ fontWeight: 600, color: s.text }}>Quantity:</span>
              <div style={{ display: "flex", alignItems: "center", gap: 0, border: `1px solid ${s.border}`, borderRadius: 10, overflow: "hidden" }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 40, height: 40, background: s.card, border: "none", cursor: "pointer", fontSize: 18, color: s.text }}>−</button>
                <span style={{ width: 48, textAlign: "center", fontWeight: 700, color: s.text, fontSize: 16 }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ width: 40, height: 40, background: s.card, border: "none", cursor: "pointer", fontSize: 18, color: s.text }}>+</button>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => { addToCart(product, qty); }} style={{ flex: 1, padding: "14px", borderRadius: 12, border: "none", background: s.btnPrimary, color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>
                Add to Cart — ₹{product.price * qty}
              </button>
              <button onClick={() => { addToCart(product, qty); setPage("cart"); }} style={{ flex: 1, padding: "14px", borderRadius: 12, border: `2px solid ${s.accent}`, background: "transparent", color: s.accent, fontWeight: 700, fontSize: 16, cursor: "pointer" }}>
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: 60 }}>
            <h2 style={{ fontWeight: 800, fontSize: 28, color: s.text, marginBottom: 24 }}>More {product.category}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
              {related.map(p => <ProductCard key={p.id} product={p} setPage={setPage} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CART PAGE
// ─────────────────────────────────────────────────────────────────────────────
function CartPage({ setPage }) {
  const { darkMode, cart, updateQty, removeFromCart, cartSubtotal, user } = useApp();
  const s = getStyles(darkMode);
  const sub = cartSubtotal();
  const gst = sub * GST_RATE;
  const delivery = sub >= FREE_DELIVERY_ABOVE ? 0 : (sub > 0 ? DELIVERY_CHARGE : 0);
  const total = sub + gst + delivery;

  if (cart.length === 0) return (
    <div style={{ background: s.bg, minHeight: "100vh", paddingTop: 64, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 80, marginBottom: 20 }}>🛒</div>
        <h2 style={{ color: s.text, fontWeight: 800, fontSize: 28 }}>Your cart is empty</h2>
        <p style={{ color: s.textMuted, marginBottom: 24 }}>Add some delicious items to get started</p>
        <button onClick={() => setPage("products")} style={{ padding: "12px 24px", borderRadius: 12, background: s.btnPrimary, color: "#fff", border: "none", fontWeight: 700, cursor: "pointer" }}>Browse Products</button>
      </div>
    </div>
  );

  return (
    <div style={{ background: s.bg, minHeight: "100vh", paddingTop: 64 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
        <h1 style={{ fontWeight: 900, fontSize: 36, color: s.text, marginBottom: 32 }}>Shopping Cart</h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32, alignItems: "start" }}>
          {/* Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {cart.map(item => (
              <div key={item.id} style={{ background: s.card, borderRadius: 16, padding: 20, border: `1px solid ${s.border}`, display: "flex", gap: 20, alignItems: "center" }}>
                <div style={{ width: 72, height: 72, background: s.surfaceAlt, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, flexShrink: 0 }}>{item.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: s.text, marginBottom: 4 }}>{item.name}</div>
                  <div style={{ fontSize: 13, color: s.textMuted, marginBottom: 10 }}>{item.category}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 0, border: `1px solid ${s.border}`, borderRadius: 8, width: "fit-content", overflow: "hidden" }}>
                    <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: 32, height: 32, background: s.bg, border: "none", cursor: "pointer", fontSize: 16, color: s.text }}>−</button>
                    <span style={{ width: 36, textAlign: "center", fontWeight: 700, color: s.text }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: 32, height: 32, background: s.bg, border: "none", cursor: "pointer", fontSize: 16, color: s.text }}>+</button>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 800, fontSize: 18, color: s.accent }}>₹{item.price * item.qty}</div>
                  <div style={{ fontSize: 12, color: s.textMuted }}>₹{item.price} each</div>
                  <button onClick={() => removeFromCart(item.id)} style={{ marginTop: 8, background: "none", border: "none", cursor: "pointer", color: "#c0392b", fontSize: 13, fontWeight: 600 }}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={{ background: s.card, borderRadius: 20, padding: 28, border: `1px solid ${s.border}`, position: "sticky", top: 80 }}>
            <h3 style={{ fontWeight: 800, fontSize: 20, color: s.text, margin: "0 0 24px" }}>Order Summary</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: s.textMuted, fontSize: 14 }}>
                <span>Subtotal</span><span style={{ color: s.text, fontWeight: 600 }}>₹{sub.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: s.textMuted, fontSize: 14 }}>
                <span>GST (5%)</span><span style={{ color: s.text, fontWeight: 600 }}>₹{gst.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: s.textMuted, fontSize: 14 }}>
                <span>Delivery</span>
                <span style={{ color: delivery === 0 ? "#5a7a4a" : s.text, fontWeight: 600 }}>
                  {delivery === 0 ? "FREE" : `₹${delivery}`}
                </span>
              </div>
              {sub > 0 && sub < FREE_DELIVERY_ABOVE && (
                <div style={{ background: s.pinkLight, borderRadius: 8, padding: "8px 12px", fontSize: 12, color: s.accent }}>
                  Add ₹{FREE_DELIVERY_ABOVE - sub} more for free delivery!
                </div>
              )}
              <div style={{ borderTop: `1px solid ${s.border}`, paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700, fontSize: 16, color: s.text }}>Total</span>
                <span style={{ fontWeight: 900, fontSize: 22, color: s.accent }}>₹{total.toFixed(2)}</span>
              </div>
            </div>
            <button onClick={() => user ? setPage("checkout") : setPage("login")} style={{ width: "100%", padding: "14px", borderRadius: 12, border: "none", background: s.btnPrimary, color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>
              {user ? "Proceed to Checkout →" : "Login to Checkout"}
            </button>
            <button onClick={() => setPage("products")} style={{ width: "100%", marginTop: 12, padding: "12px", borderRadius: 12, border: `1px solid ${s.border}`, background: "transparent", color: s.textMuted, fontWeight: 600, cursor: "pointer" }}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CHECKOUT PAGE
// ─────────────────────────────────────────────────────────────────────────────
function CheckoutPage({ setPage }) {
  const { darkMode, cart, cartSubtotal, placeOrder, toast } = useApp();
  const s = getStyles(darkMode);
  const [step, setStep] = useState(1); // 1: shipping, 2: payment, 3: success
  const [orderId, setOrderId] = useState("");
  const [payment, setPayment] = useState("cod");
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", pincode: "" });

  const sub = cartSubtotal();
  const gst = sub * GST_RATE;
  const delivery = sub >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_CHARGE;
  const total = sub + gst + delivery;

  const handleShipping = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      const id = placeOrder({ ...form, paymentMethod: payment });
      setOrderId(id);
      setStep(3);
      setProcessing(false);
      toast(`Order ${id} placed! 🎉`);
    }, 1500);
  };

  if (step === 3) return (
    <div style={{ background: s.bg, minHeight: "100vh", paddingTop: 64, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", maxWidth: 480, padding: "40px 24px", animation: "fadeUp 0.5s ease" }}>
        <div style={{ width: 80, height: 80, background: "#eaf3de", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, margin: "0 auto 24px" }}>✅</div>
        <h2 style={{ fontWeight: 900, fontSize: 32, color: s.text, margin: "0 0 12px" }}>Order Placed!</h2>
        <p style={{ color: s.textMuted, fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>Your order has been placed successfully. We're warming up the oven!</p>
        <div style={{ background: s.cream, borderRadius: 14, padding: 20, marginBottom: 32, border: `1px solid ${s.border}` }}>
          <div style={{ color: s.textMuted, fontSize: 13 }}>Your Order ID</div>
          <div style={{ fontWeight: 900, fontSize: 28, color: s.accent }}>{orderId}</div>
          <div style={{ fontSize: 12, color: s.textMuted, marginTop: 4 }}>Save this for tracking</div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => setPage("track")} style={{ flex: 1, padding: "12px", borderRadius: 12, background: s.btnPrimary, color: "#fff", border: "none", fontWeight: 700, cursor: "pointer" }}>Track Order</button>
          <button onClick={() => setPage("home")} style={{ flex: 1, padding: "12px", borderRadius: 12, border: `1px solid ${s.border}`, background: "transparent", color: s.text, fontWeight: 700, cursor: "pointer" }}>Back Home</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ background: s.bg, minHeight: "100vh", paddingTop: 64 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
        <h1 style={{ fontWeight: 900, fontSize: 36, color: s.text, marginBottom: 8 }}>Checkout</h1>

        {/* Steps */}
        <div style={{ display: "flex", gap: 0, marginBottom: 40, background: s.card, borderRadius: 12, overflow: "hidden", border: `1px solid ${s.border}` }}>
          {["1. Shipping", "2. Payment"].map((label, i) => (
            <div key={i} style={{ flex: 1, padding: "14px", textAlign: "center", fontWeight: 700, fontSize: 14, background: step === i + 1 ? s.accent : "transparent", color: step === i + 1 ? "#fff" : s.textMuted }}>{label}</div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 32 }}>
          {/* Form */}
          <div>
            {step === 1 && (
              <form onSubmit={handleShipping}>
                <div style={{ background: s.card, borderRadius: 16, padding: 28, border: `1px solid ${s.border}` }}>
                  <h3 style={{ fontWeight: 800, fontSize: 20, color: s.text, margin: "0 0 24px" }}>Shipping Details</h3>
                  {[
                    ["Full Name", "name", "text", "Your full name"],
                    ["Phone Number", "phone", "tel", "+91 00000 00000"],
                    ["Delivery Address", "address", "text", "House no, Street, Area"],
                    ["City", "city", "text", "City"],
                    ["PIN Code", "pincode", "text", "110001"],
                  ].map(([label, key, type, placeholder]) => (
                    <div key={key} style={{ marginBottom: 20 }}>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: s.textMuted, marginBottom: 8 }}>{label}</label>
                      <input
                        type={type} value={form[key]} required
                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                        placeholder={placeholder}
                        style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: `1px solid ${s.border}`, background: s.bg, color: s.text, fontSize: 15, outline: "none" }}
                      />
                    </div>
                  ))}
                  <button type="submit" style={{ width: "100%", padding: "14px", borderRadius: 12, border: "none", background: s.btnPrimary, color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>
                    Continue to Payment →
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <div style={{ background: s.card, borderRadius: 16, padding: 28, border: `1px solid ${s.border}` }}>
                <h3 style={{ fontWeight: 800, fontSize: 20, color: s.text, margin: "0 0 24px" }}>Payment Method</h3>
                {[
                  { id: "card", label: "Credit / Debit Card", icon: "💳", desc: "Visa, Mastercard, RuPay" },
                  { id: "upi", label: "UPI", icon: "📱", desc: "GPay, PhonePe, Paytm" },
                  { id: "cod", label: "Cash on Delivery", icon: "💵", desc: "Pay when delivered" },
                ].map(opt => (
                  <div key={opt.id} onClick={() => setPayment(opt.id)} style={{
                    background: payment === opt.id ? s.pinkLight : s.bg,
                    border: `2px solid ${payment === opt.id ? s.accent : s.border}`,
                    borderRadius: 12, padding: 16, cursor: "pointer",
                    display: "flex", gap: 16, alignItems: "center", marginBottom: 12, transition: "all 0.2s",
                  }}>
                    <div style={{ fontSize: 32 }}>{opt.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: s.text }}>{opt.label}</div>
                      <div style={{ fontSize: 13, color: s.textMuted }}>{opt.desc}</div>
                    </div>
                    <div style={{ marginLeft: "auto", width: 20, height: 20, borderRadius: "50%", border: `2px solid ${payment === opt.id ? s.accent : s.border}`, background: payment === opt.id ? s.accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {payment === opt.id && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
                    </div>
                  </div>
                ))}

                {payment === "card" && (
                  <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 14 }}>
                    <input placeholder="Card number" style={{ padding: "12px 16px", borderRadius: 10, border: `1px solid ${s.border}`, background: s.bg, color: s.text, fontSize: 15, outline: "none" }} />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <input placeholder="MM/YY" style={{ padding: "12px 16px", borderRadius: 10, border: `1px solid ${s.border}`, background: s.bg, color: s.text, fontSize: 15, outline: "none" }} />
                      <input placeholder="CVV" style={{ padding: "12px 16px", borderRadius: 10, border: `1px solid ${s.border}`, background: s.bg, color: s.text, fontSize: 15, outline: "none" }} />
                    </div>
                  </div>
                )}
                {payment === "upi" && (
                  <input placeholder="yourname@upi" style={{ marginTop: 20, width: "100%", padding: "12px 16px", borderRadius: 10, border: `1px solid ${s.border}`, background: s.bg, color: s.text, fontSize: 15, outline: "none" }} />
                )}

                <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                  <button onClick={() => setStep(1)} style={{ flex: 1, padding: "12px", borderRadius: 12, border: `1px solid ${s.border}`, background: "transparent", color: s.textMuted, fontWeight: 600, cursor: "pointer" }}>← Back</button>
                  <button onClick={handlePayment} disabled={processing} style={{ flex: 2, padding: "14px", borderRadius: 12, border: "none", background: s.btnPrimary, color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>
                    {processing ? "Processing..." : `Pay ₹${total.toFixed(2)}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div style={{ background: s.card, borderRadius: 16, padding: 24, border: `1px solid ${s.border}`, height: "fit-content", position: "sticky", top: 80 }}>
            <h3 style={{ fontWeight: 800, fontSize: 18, color: s.text, margin: "0 0 20px" }}>Order Summary</h3>
            <div style={{ maxHeight: 240, overflowY: "auto", marginBottom: 16 }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${s.border}` }}>
                  <span style={{ fontSize: 13, color: s.text }}>{item.emoji} {item.name} ×{item.qty}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: s.text }}>₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>
            {[["Subtotal", `₹${sub.toFixed(2)}`], ["GST (5%)", `₹${gst.toFixed(2)}`], ["Delivery", delivery === 0 ? "FREE" : `₹${delivery}`]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", color: s.textMuted, fontSize: 13, padding: "4px 0" }}>
                <span>{k}</span><span style={{ color: s.text, fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${s.border}`, marginTop: 12, paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700, color: s.text }}>Total</span>
              <span style={{ fontWeight: 900, fontSize: 20, color: s.accent }}>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ORDER TRACKING
// ─────────────────────────────────────────────────────────────────────────────
function TrackOrderPage() {
  const { darkMode, orders } = useApp();
  const s = getStyles(darkMode);
  const [trackId, setTrackId] = useState("");
  const [found, setFound] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const order = orders.find(o => o.id === trackId.trim().toUpperCase());
    setFound(order || null);
    setSearched(true);
  };

  // Simulate stage progression based on time
  const getStage = (order) => {
    const placed = new Date(order.date).getTime();
    const now = Date.now();
    const mins = (now - placed) / 60000;
    if (mins < 2) return 0;
    if (mins < 5) return 1;
    if (mins < 10) return 2;
    if (mins < 15) return 3;
    return 4;
  };

  return (
    <div style={{ background: s.bg, minHeight: "100vh", paddingTop: 64 }}>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px" }}>
        <h1 style={{ fontWeight: 900, fontSize: 36, color: s.text, marginBottom: 8 }}>Track Your Order</h1>
        <p style={{ color: s.textMuted, marginBottom: 32 }}>Enter your order ID to see real-time status</p>

        <form onSubmit={handleSearch} style={{ display: "flex", gap: 12, marginBottom: 40 }}>
          <input
            value={trackId} onChange={e => setTrackId(e.target.value)}
            placeholder="Enter Order ID (e.g. AB123456)"
            style={{ flex: 1, padding: "14px 20px", borderRadius: 12, border: `1px solid ${s.border}`, background: s.card, color: s.text, fontSize: 16, outline: "none" }}
          />
          <button type="submit" style={{ padding: "14px 24px", borderRadius: 12, border: "none", background: s.btnPrimary, color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer", whiteSpace: "nowrap" }}>
            Track →
          </button>
        </form>

        {searched && !found && (
          <div style={{ textAlign: "center", color: s.textMuted, padding: "40px 0" }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>🔍</div>
            <div style={{ fontWeight: 700, fontSize: 20, color: s.text }}>Order not found</div>
            <div>Check the ID and try again</div>
          </div>
        )}

        {found && (() => {
          const stage = getStage(found);
          return (
            <div style={{ animation: "fadeUp 0.4s ease" }}>
              <div style={{ background: s.card, borderRadius: 20, padding: 28, border: `1px solid ${s.border}`, marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 12, color: s.textMuted, fontWeight: 600, marginBottom: 4 }}>ORDER ID</div>
                    <div style={{ fontWeight: 900, fontSize: 24, color: s.accent }}>{found.id}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ background: stage === 4 ? "#eaf3de" : s.pinkLight, color: stage === 4 ? "#3a6a2a" : s.accent, padding: "6px 14px", borderRadius: 20, fontWeight: 700, fontSize: 13 }}>
                      {ORDER_STAGES[stage]}
                    </div>
                    <div style={{ fontSize: 12, color: s.textMuted, marginTop: 4 }}>
                      {new Date(found.date).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", top: 20, left: "10%", right: "10%", height: 3, background: s.border, borderRadius: 2 }} />
                  <div style={{ position: "absolute", top: 20, left: "10%", width: `${(stage / (ORDER_STAGES.length - 1)) * 80}%`, height: 3, background: s.accent, borderRadius: 2, transition: "width 1s ease" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
                    {ORDER_STAGES.map((label, i) => (
                      <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: 1 }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: "50%",
                          background: i <= stage ? s.accent : s.border,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 18, color: "#fff", transition: "background 0.5s",
                          position: "relative", zIndex: 1,
                        }}>
                          {i <= stage ? ["✓", "👨‍🍳", "🔥", "🛵", "✅"][i] : ["📋", "👨‍🍳", "🔥", "🛵", "✅"][i]}
                        </div>
                        <div style={{ fontSize: 11, fontWeight: 600, color: i <= stage ? s.accent : s.textMuted, textAlign: "center", maxWidth: 70 }}>{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Items */}
              <div style={{ background: s.card, borderRadius: 16, padding: 24, border: `1px solid ${s.border}` }}>
                <h3 style={{ fontWeight: 800, fontSize: 18, color: s.text, margin: "0 0 16px" }}>Items Ordered</h3>
                {found.items.map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${s.border}` }}>
                    <span style={{ color: s.text, fontSize: 14 }}>{item.emoji} {item.name} ×{item.qty}</span>
                    <span style={{ fontWeight: 600, color: s.accent }}>₹{item.price * item.qty}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
                  <span style={{ fontWeight: 700, color: s.text }}>Total Paid</span>
                  <span style={{ fontWeight: 900, fontSize: 20, color: s.accent }}>₹{found.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Recent orders hint */}
        {orders.length > 0 && !searched && (
          <div style={{ background: s.card, borderRadius: 16, padding: 24, border: `1px solid ${s.border}` }}>
            <div style={{ fontWeight: 700, color: s.text, marginBottom: 12 }}>Your Recent Orders</div>
            {orders.slice(0, 3).map(o => (
              <button key={o.id} onClick={() => { setTrackId(o.id); setFound(o); setSearched(true); }} style={{
                display: "flex", justifyContent: "space-between", width: "100%",
                padding: "10px 0", background: "none", border: "none", borderBottom: `1px solid ${s.border}`,
                cursor: "pointer", color: s.text,
              }}>
                <span style={{ color: s.accent, fontWeight: 700 }}>{o.id}</span>
                <span style={{ color: s.textMuted, fontSize: 13 }}>{new Date(o.date).toLocaleDateString()}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────
function DashboardPage({ setPage }) {
  const { darkMode, user, orders, addToCart, toast } = useApp();
  const s = getStyles(darkMode);
  const [tab, setTab] = useState("active");

  if (!user) return (
    <div style={{ background: s.bg, minHeight: "100vh", paddingTop: 64, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 60, marginBottom: 20 }}>🔒</div>
        <div style={{ fontWeight: 700, fontSize: 20, color: s.text, marginBottom: 8 }}>Login required</div>
        <button onClick={() => setPage("login")} style={{ padding: "12px 24px", borderRadius: 12, background: s.btnPrimary, color: "#fff", border: "none", fontWeight: 700, cursor: "pointer" }}>Go to Login</button>
      </div>
    </div>
  );

  const getStage = (order) => {
    const placed = new Date(order.date).getTime();
    const mins = (Date.now() - placed) / 60000;
    if (mins < 2) return 0; if (mins < 5) return 1;
    if (mins < 10) return 2; if (mins < 15) return 3; return 4;
  };

  const active = orders.filter(o => getStage(o) < 4);
  const past = orders.filter(o => getStage(o) === 4);

  const reorder = (order) => {
    order.items.forEach(item => addToCart(item, item.qty));
    setPage("cart");
  };

  return (
    <div style={{ background: s.bg, minHeight: "100vh", paddingTop: 64 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
        {/* Header */}
        <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 40 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: s.pinkLight, color: s.accent, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 28 }}>
            {user.name[0]}
          </div>
          <div>
            <h1 style={{ fontWeight: 900, fontSize: 28, color: s.text, margin: 0 }}>Hello, {user.name}! 👋</h1>
            <div style={{ color: s.textMuted, fontSize: 15, marginTop: 4 }}>{user.email}</div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 40 }}>
          {[
            ["Total Orders", orders.length, "📦"],
            ["Active Orders", active.length, "🔥"],
            ["Completed", past.length, "✅"],
            ["Total Spent", `₹${orders.reduce((s, o) => s + o.total, 0).toFixed(0)}`, "💰"],
          ].map(([label, val, icon]) => (
            <div key={label} style={{ background: s.card, borderRadius: 14, padding: 20, border: `1px solid ${s.border}`, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 900, fontSize: 22, color: s.accent }}>{val}</div>
              <div style={{ fontSize: 13, color: s.textMuted, marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, marginBottom: 24, background: s.card, borderRadius: 12, overflow: "hidden", border: `1px solid ${s.border}`, width: "fit-content" }}>
          {["active", "past"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: "10px 24px", background: tab === t ? s.accent : "transparent", color: tab === t ? "#fff" : s.textMuted, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14, textTransform: "capitalize" }}>
              {t === "active" ? `Active (${active.length})` : `Completed (${past.length})`}
            </button>
          ))}
        </div>

        {/* Orders */}
        {(tab === "active" ? active : past).length === 0 ? (
          <div style={{ textAlign: "center", color: s.textMuted, padding: "60px 0" }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>🥐</div>
            <div style={{ fontWeight: 700, fontSize: 18, color: s.text, marginBottom: 8 }}>No {tab} orders yet</div>
            <button onClick={() => setPage("products")} style={{ padding: "10px 20px", borderRadius: 10, background: s.btnPrimary, color: "#fff", border: "none", fontWeight: 600, cursor: "pointer" }}>Start Shopping</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {(tab === "active" ? active : past).map(order => (
              <div key={order.id} style={{ background: s.card, borderRadius: 16, padding: 24, border: `1px solid ${s.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 18, color: s.accent }}>{order.id}</div>
                    <div style={{ fontSize: 13, color: s.textMuted }}>{new Date(order.date).toLocaleString()}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <div style={{ background: tab === "active" ? s.pinkLight : "#eaf3de", color: tab === "active" ? s.accent : "#3a6a2a", padding: "4px 12px", borderRadius: 20, fontWeight: 700, fontSize: 12 }}>
                      {ORDER_STAGES[getStage(order)]}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: 18, color: s.accent }}>₹{order.total.toFixed(2)}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                  {order.items.map((item, i) => (
                    <span key={i} style={{ background: s.surfaceAlt, borderRadius: 8, padding: "4px 10px", fontSize: 13, color: s.text }}>{item.emoji} {item.name} ×{item.qty}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setPage("track")} style={{ padding: "8px 16px", borderRadius: 10, border: `1px solid ${s.accent}`, background: "transparent", color: s.accent, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Track</button>
                  <button onClick={() => reorder(order)} style={{ padding: "8px 16px", borderRadius: 10, border: "none", background: s.btnPrimary, color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Reorder</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// APP (ROUTER)
// ─────────────────────────────────────────────────────────────────────────────
function AppContent() {
  const { darkMode } = useApp();
  const s = getStyles(darkMode);
  const [page, setPage] = useState("home");

  const isProductDetail = page.startsWith("product-");
  const productId = isProductDetail ? page.split("-")[1] : null;

  const renderPage = () => {
    if (isProductDetail) return <ProductDetailPage productId={productId} setPage={setPage} />;
    switch (page) {
      case "home": return <HomePage setPage={setPage} />;
      case "products": return <ProductsPage setPage={setPage} />;
      case "cart": return <CartPage setPage={setPage} />;
      case "checkout": return <CheckoutPage setPage={setPage} />;
      case "track": return <TrackOrderPage />;
      case "dashboard": return <DashboardPage setPage={setPage} />;
      case "login": return <LoginPage setPage={setPage} />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div style={{ background: s.bg, minHeight: "100vh", color: s.text, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Navbar page={page} setPage={setPage} />
      <main style={{ transition: "background 0.3s" }}>
        {renderPage()}
      </main>
      {page !== "login" && <Footer setPage={setPage} />}
      <Toasts />
    </div>
  );
}

export default function AramBakery() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
