// App.jsx - Complete with All Fixes
import React, { useState, useEffect } from "react";
import "./App.css";
import AdminPortal from "./components/AdminPortal";
import MenuDisplay from "./components/MenuDisplay";
import WhatsAppIntegration from "./components/WhatsAppIntegration";
import OrderSummary from "./components/OrderSummary";
import LoginModal from "./components/LoginModal";
import PromoBanner from "./components/PromoBanner";
import ComboBuilder from "./components/ComboBuilder";
import cakeParfaitImage from "./assets/image/Cake parfait.jpg";
import cakeSlicesImage from "./assets/image/cake slices.jpg";
import completeFoodPackImage from "./assets/image/Complete Food Pack.jpg";
import customCakeImage from "./assets/image/custom cake .jpg";
import dailyHealthPackImage from "./assets/image/Daily Health Pack.jpg";
import freshFruitJuiceImage from "./assets/image/Fresh Fruit Juice.jpg";
import frozenChopsImage from "./assets/image/frozen chops .jpg";
import furaYoghurtImage from "./assets/image/fura yoghurt.jpg";
import greekYoghurtImage from "./assets/image/greek yoghurt.jpg";
import premiumFruitSaladImage from "./assets/image/Premium Fruit Salad.jpg";
import premiumGranolaImage from "./assets/image/premium granola.jpg";
import smallChopsPlatterImage from "./assets/image/small chops platter.jpg";
import vanillaYogurtImage from "./assets/image/Vanilla Yogurt.jpg";
import yoghurtParfaitImage from "./assets/image/yoghurt parfait.jpg";

const defaultImagesById = {
  1: vanillaYogurtImage,
  2: furaYoghurtImage,
  3: greekYoghurtImage,
  4: yoghurtParfaitImage,
  5: cakeParfaitImage,
  6: premiumGranolaImage,
  7: cakeSlicesImage,
  8: customCakeImage,
  9: smallChopsPlatterImage,
  10: frozenChopsImage,
  11: freshFruitJuiceImage,
  12: premiumFruitSaladImage,
  13: completeFoodPackImage,
  14: dailyHealthPackImage,
};

const defaultImagesByName = {
  "drinking yogurt": vanillaYogurtImage,
  "fura yogurt": furaYoghurtImage,
  "greek yogurt": greekYoghurtImage,
  "yogurt parfait": yoghurtParfaitImage,
  "cake parfait": cakeParfaitImage,
  "premium granola": premiumGranolaImage,
  "cake slices": cakeSlicesImage,
  "custom cake": customCakeImage,
  "small chops platter": smallChopsPlatterImage,
  "frozen chops pack": frozenChopsImage,
  "fresh fruit juice": freshFruitJuiceImage,
  "premium fruit salad": premiumFruitSaladImage,
  "complete food pack": completeFoodPackImage,
  "daily health pack": dailyHealthPackImage,
  "family starter pack": dailyHealthPackImage,
  "yogurt drink pack": vanillaYogurtImage,
};

const getDefaultImageForItem = (item) => {
  return (
    defaultImagesById[item.id] ||
    defaultImagesByName[item.name?.toLowerCase()] ||
    ""
  );
};

const attachDefaultImages = (menuData) => {
  const normalized = {};

  Object.entries(menuData).forEach(([category, items]) => {
    normalized[category] = items.map((item) => ({
      ...item,
      image: item.image || getDefaultImageForItem(item),
    }));
  });

  return normalized;
};

const App = () => {
  const [logoLoadFailed, setLogoLoadFailed] = useState(false);
  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem("strongDelightMenu");
    const initialMenu = saved
      ? JSON.parse(saved)
      : {
          yogurt: [
            {
              id: 1,
              name: "Drinking Yogurt",
              price: 2200,
              category: "yogurt",
              description:
                "Refreshing probiotic drink packed with live cultures",
              popular: true,
            },
            {
              id: 2,
              name: "Fura Yogurt",
              price: 2300,
              category: "yogurt",
              description: "Traditional millet balls served with creamy yogurt",
              popular: false,
            },
            {
              id: 3,
              name: "Greek Yogurt",
              price: 2500,
              category: "yogurt",
              description:
                "Thick, protein-rich yogurt with strained consistency",
              popular: true,
            },
          ],
          parfaits: [
            {
              id: 4,
              name: "Yogurt Parfait",
              price: 2800,
              category: "parfait",
              description:
                "Layered yogurt with fresh fruits and homemade granola",
              popular: true,
            },
            {
              id: 5,
              name: "Cake Parfait",
              price: 3200,
              category: "parfait",
              description:
                "Layered cake with premium cream and seasonal toppings",
              popular: false,
            },
          ],
          bakery: [
            {
              id: 6,
              name: "Premium Granola",
              price: 1800,
              category: "bakery",
              description: "Homemade crunchy granola with nuts and honey",
              popular: true,
            },
            {
              id: 7,
              name: "Cake Slices",
              price: 1500,
              category: "bakery",
              description: "Assorted premium cake slices daily selection",
              popular: true,
            },
            {
              id: 8,
              name: "Custom Cake",
              price: 0,
              category: "bakery",
              description:
                "Customized celebration cakes (price on consultation)",
              popular: false,
            },
          ],
          snacks: [
            {
              id: 9,
              name: "Small Chops Platter",
              price: 2500,
              category: "snacks",
              description: "Assorted bite-sized Nigerian snacks assortment",
              popular: true,
            },
            {
              id: 10,
              name: "Frozen Chops Pack",
              price: 3000,
              category: "snacks",
              description: "Prepared frozen snacks ready for frying",
              popular: false,
            },
          ],
          fruits: [
            {
              id: 11,
              name: "Fresh Fruit Juice",
              price: 1200,
              category: "fruits",
              description: "Freshly squeezed seasonal fruit juice",
              popular: true,
            },
            {
              id: 12,
              name: "Premium Fruit Salad",
              price: 2000,
              category: "fruits",
              description: "Mixed fresh fruit salad with special dressing",
              popular: true,
            },
            {
              id: 13,
              name: "Complete Food Pack",
              price: 3500,
              category: "fruits",
              description: "Balanced meal pack with fruits and snacks",
              popular: false,
            },
          ],
          food: [
            {
              id: 17,
              name: "Grilled Chicken Bowl",
              price: 4000,
              category: "food",
              description: "Grilled chicken with seasoned rice and veggies",
              popular: true,
              tag: "New",
            },
            {
              id: 18,
              name: "Vegetable Protein Bowl",
              price: 3500,
              category: "food",
              description: "Balanced bowl with lean protein and greens",
              popular: false,
            },
            {
              id: 19,
              name: "Healthy Jollof Pack",
              price: 3200,
              category: "food",
              description: "Lightly seasoned jollof rice with a health-focused twist",
              popular: false,
            },
          ],
          packs: [
            {
              id: 14,
              name: "Daily Health Pack",
              price: 3500,
              category: "pack",
              description:
                "7 bottles/week (₦500 per bottle), perfect for daily consumption",
              popular: true,
              tag: "Most Popular",
            },
            {
              id: 15,
              name: "Family Starter Pack",
              price: 7000,
              category: "pack",
              description: "14 bottles (2 weeks supply) for families",
              popular: false,
            },
            {
              id: 16,
              name: "Yogurt Drink Pack",
              price: 27600,
              category: "pack",
              description: "12 bottles pack (₦2,200 per bottle) bulk savings",
              popular: false,
            },
          ],
        };

    return attachDefaultImages(initialMenu);
  });

  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showCombo, setShowCombo] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
  const [activeCategory, setActiveCategory] = useState("all");

  // Save menu to localStorage
  useEffect(() => {
    localStorage.setItem("strongDelightMenu", JSON.stringify(menuItems));
  }, [menuItems]);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      );
    } else {
      setCart([...cart, { ...item, quantity: 1, cartId: Date.now() }]);
    }
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter((item) => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, delta) => {
    const newCart = cart
      .map((item) => {
        if (item.cartId === cartId) {
          const newQuantity = item.quantity + delta;
          if (newQuantity < 1) {
            return null;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
      .filter(Boolean);

    setCart(newCart);
  };

  const updateItemPrice = (category, id, newPrice) => {
    setMenuItems((prev) => ({
      ...prev,
      [category]: prev[category].map((item) =>
        item.id === id ? { ...item, price: newPrice } : item,
      ),
    }));
  };

  const addMenuItem = (category, newItem) => {
    setMenuItems((prev) => ({
      ...prev,
      [category]: [
        ...(prev[category] || []),
        {
          ...newItem,
          id: Date.now(),
          image: newItem.image || getDefaultImageForItem(newItem),
        },
      ],
    }));
  };

  const updateItemImage = (category, id, image) => {
    setMenuItems((prev) => ({
      ...prev,
      [category]: prev[category].map((item) =>
        item.id === id ? { ...item, image } : item,
      ),
    }));
  };

  const updateItemPromoImage = (category, id, promoImage) => {
    setMenuItems((prev) => ({
      ...prev,
      [category]: prev[category].map((item) =>
        item.id === id ? { ...item, promoImage } : item,
      ),
    }));
  };

  const resetItemPromoImage = (category, id) => {
    setMenuItems((prev) => ({
      ...prev,
      [category]: prev[category].map((item) =>
        item.id === id ? { ...item, promoImage: "" } : item,
      ),
    }));
  };

  const resetItemImage = (category, id) => {
    setMenuItems((prev) => ({
      ...prev,
      [category]: prev[category].map((item) =>
        item.id === id
          ? { ...item, image: getDefaultImageForItem(item) }
          : item,
      ),
    }));
  };

  const removeMenuItem = (category, id) => {
    setMenuItems((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item.id !== id),
    }));
  };

  const handleAdminLogin = (password) => {
    if (password === "strongdelight2026") {
      setIsAdmin(true);
      setShowLogin(false);
      return true;
    }
    return false;
  };

  const prepareOrder = () => {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    setOrderDetails({
      items: cart,
      total,
      orderDate: new Date().toISOString(),
      deliveryNote: "Please deliver 48 hours after order confirmation",
    });
    setShowOrderSummary(true);
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const openCart = () => {
    if (cart.length > 0) {
      prepareOrder();
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo-section">
            <div className="logo-image">
              {!logoLoadFailed ? (
                <img
                  src="/logo.png"
                  alt="Strong Delight Logo"
                  className="logo-img"
                  onError={() => setLogoLoadFailed(true)}
                />
              ) : (
                <div className="logo-placeholder">
                  <div className="placeholder-text">SD</div>
                </div>
              )}
            </div>
            <div className="brand">
              <h1 className="brand-name">STRONG DELIGHT</h1>
              <p className="brand-tagline">GOOD HEALTH, GOOD LIFE</p>
            </div>
          </div>

          {!isAdmin ? (
            <>
              <nav className="navigation">
                <button
                  className={`nav-item ${activeCategory === "all" ? "active" : ""}`}
                  onClick={() => handleCategoryChange("all")}
                >
                  All Items
                </button>
                <button
                  className={`nav-item ${activeCategory === "yogurt" ? "active" : ""}`}
                  onClick={() => handleCategoryChange("yogurt")}
                >
                  Yogurts
                </button>
                <button
                  className={`nav-item ${activeCategory === "parfaits" ? "active" : ""}`}
                  onClick={() => handleCategoryChange("parfaits")}
                >
                  Parfaits
                </button>
                <button
                  className={`nav-item ${activeCategory === "bakery" ? "active" : ""}`}
                  onClick={() => handleCategoryChange("bakery")}
                >
                  Bakery
                </button>
                <button
                  className={`nav-item ${activeCategory === "food" ? "active" : ""}`}
                  onClick={() => handleCategoryChange("food")}
                >
                  Food
                </button>
                <button
                  className={`nav-item ${activeCategory === "packs" ? "active" : ""}`}
                  onClick={() => handleCategoryChange("packs")}
                >
                  Health Packs
                </button>
              </nav>

              <div className="header-actions">
                <div
                  className="cart"
                  onClick={openCart}
                  style={{ cursor: cart.length > 0 ? "pointer" : "default" }}
                >
                  <div className="cart-icon">
                    <i className="fas fa-shopping-basket"></i>
                    {cart.length > 0 && (
                      <span className="cart-count">{cart.length}</span>
                    )}
                  </div>
                  <div className="cart-info">
                    <span className="cart-label">Cart</span>
                    <span className="cart-total">
                      ₦{cartTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
                <button
                  className="admin-btn"
                  onClick={() => setShowLogin(true)}
                  title="Owner Login"
                >
                  <i className="fas fa-lock"></i>
                </button>
              </div>
            </>
          ) : (
            <div className="admin-header">
              <div className="admin-info">
                <i className="fas fa-user-shield"></i>
                <span>Admin Dashboard</span>
              </div>
              <button className="logout-btn" onClick={() => setIsAdmin(false)}>
                <i className="fas fa-sign-out-alt"></i>
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Notice */}
      <div className="notice-bar">
        <i className="fas fa-clock"></i>
        <span>All orders must be placed 48 hours prior to delivery</span>
      </div>

      <main className="main">
        {isAdmin ? (
          <AdminPortal
            menuItems={menuItems}
            updateItemPrice={updateItemPrice}
            addMenuItem={addMenuItem}
            removeMenuItem={removeMenuItem}
            updateItemImage={updateItemImage}
            resetItemImage={resetItemImage}
            updateItemPromoImage={updateItemPromoImage}
            resetItemPromoImage={resetItemPromoImage}
            onLogout={() => setIsAdmin(false)}
          />
        ) : (
          <>
            <PromoBanner
              menuItems={menuItems}
              addToCart={addToCart}
              onViewAll={() => handleCategoryChange("popular")}
            />

            <section className="combo-launch-section">
              <div className="combo-launch-card">
                <div className="combo-launch-text">
                  <h2>
                    <span role="img" aria-label="art">🎨</span> Remix Your Own Combo
                  </h2>
                  <p>Mix any items you like and see your total add up live.</p>
                </div>
                <button
                  className="combo-launch-btn"
                  onClick={() => setShowCombo(true)}
                >
                  <i className="fas fa-blender"></i> Start Remixing
                </button>
              </div>
            </section>

            <MenuDisplay
              menuItems={menuItems}
              addToCart={addToCart}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
          </>
        )}
      </main>

      {/* Floating Checkout Button */}
      {cart.length > 0 && !isAdmin && (
        <div className="floating-cart">
          <button className="checkout-btn" onClick={prepareOrder}>
            <i className="fas fa-shopping-cart"></i>
            <span>Checkout ({cart.length})</span>
            <span className="checkout-total">
              ₦{cartTotal.toLocaleString()}
            </span>
          </button>
        </div>
      )}

      {/* Modals */}
      {showLogin && (
        <LoginModal
          onLogin={handleAdminLogin}
          onClose={() => setShowLogin(false)}
        />
      )}

      {showOrderSummary && (
        <OrderSummary
          orderDetails={orderDetails}
          onClose={() => setShowOrderSummary(false)}
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          cartTotal={cartTotal}
        />
      )}

      {showCombo && (
        <ComboBuilder
          menuItems={menuItems}
          addToCart={addToCart}
          onClose={() => setShowCombo(false)}
        />
      )}

      {/* WhatsApp Integration */}
      {!isAdmin && <WhatsAppIntegration cart={cart} cartTotal={cartTotal} />}

      {/* Improved Footer - No Social Media */}
      {!isAdmin && (
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-section">
              <div className="footer-logo">
                <div className="logo-image small">
                  {!logoLoadFailed ? (
                    <img
                      src="/logo.png"
                      alt="Strong Delight Logo"
                      className="logo-img"
                      onError={() => setLogoLoadFailed(true)}
                    />
                  ) : (
                    <div className="logo-placeholder small">
                      <div className="placeholder-text">SD</div>
                    </div>
                  )}
                </div>
                <div className="footer-brand">
                  <h3>STRONG DELIGHT</h3>
                  <p className="footer-tagline">Good Health, Good Life</p>
                </div>
              </div>
              <p className="footer-description">
                Premium health and wellness products crafted for your best life.
              </p>
            </div>

            <div className="footer-section">
              <h4>Contact Directly</h4>
              <div className="contact-direct-item">
                <i className="fas fa-phone"></i>
                <div className="contact-details">
                  <a href="tel:+2348167137498" className="contact-link">
                    +234 816 713 7498
                  </a>
                  <p className="contact-subtext">Call or WhatsApp</p>
                </div>
              </div>
              <div className="contact-direct-item">
                <i className="fas fa-envelope"></i>
                <div className="contact-details">
                  <a
                    href="mailto:augustineblessingibeh@gmail.com"
                    className="contact-link"
                  >
                    augustineblessingibeh@gmail.com
                  </a>
                  <p className="contact-subtext">Email for inquiries</p>
                </div>
              </div>
              <div className="contact-direct-item">
                <i className="fas fa-clock"></i>
                <div className="contact-details">
                  <span className="contact-text">48-hour notice</span>
                  <p className="contact-subtext">Required for all orders</p>
                </div>
              </div>
            </div>

            <div className="footer-section">
              <h4>Business Hours</h4>
              <div className="hours-item">
                <span>Monday - Friday</span>
                <span>8:00 AM - 8:00 PM</span>
              </div>
              <div className="hours-item">
                <span>Saturday</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="hours-item">
                <span>Sunday</span>
                <span>10:00 AM - 4:00 PM</span>
              </div>
            </div>

            <div className="footer-section">
              <h4>Quick Actions</h4>
              <button
                className="footer-action-btn whatsapp-action"
                onClick={() =>
                  window.open("https://wa.me/2348167137498", "_blank")
                }
              >
                <i className="fab fa-whatsapp"></i>
                WhatsApp Now
              </button>
              <button
                className="footer-action-btn call-action"
                onClick={() => (window.location.href = "tel:+2348167137498")}
              >
                <i className="fas fa-phone"></i>
                Call Now
              </button>
              <button
                className="footer-action-btn email-action"
                onClick={() =>
                  (window.location.href =
                    "mailto:augustineblessingibeh@gmail.com")
                }
              >
                <i className="fas fa-envelope"></i>
                Send Email
              </button>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              &copy; {new Date().getFullYear()} Strong Delight. All rights
              reserved.
            </p>
            <p className="footer-note">
              Premium health products for your wellbeing
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
