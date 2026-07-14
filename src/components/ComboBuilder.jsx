// components/ComboBuilder.jsx
import React, { useMemo, useState } from "react";

const CATEGORY_LABELS = {
  yogurt: { title: "Yogurts", icon: "🥛" },
  parfaits: { title: "Parfaits", icon: "🥣" },
  bakery: { title: "Bakery", icon: "🍰" },
  snacks: { title: "Snacks", icon: "🍢" },
  fruits: { title: "Fruits & Juices", icon: "🍓" },
  food: { title: "Food", icon: "🍲" },
  packs: { title: "Health Packs", icon: "📦" },
};

const ComboBuilder = ({ menuItems, addToCart, onClose }) => {
  const [quantities, setQuantities] = useState({}); // { [itemId]: qty }

  const allItemsById = useMemo(() => {
    const map = {};
    Object.values(menuItems)
      .flat()
      .forEach((item) => {
        map[item.id] = item;
      });
    return map;
  }, [menuItems]);

  const setQty = (item, delta) => {
    setQuantities((prev) => {
      const current = prev[item.id] || 0;
      const next = Math.max(0, current + delta);
      const updated = { ...prev, [item.id]: next };
      if (next === 0) delete updated[item.id];
      return updated;
    });
  };

  const selectedEntries = Object.entries(quantities).filter(([, qty]) => qty > 0);
  const totalItems = selectedEntries.reduce((sum, [, qty]) => sum + qty, 0);
  const totalPrice = selectedEntries.reduce((sum, [id, qty]) => {
    const item = allItemsById[id];
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const clearCombo = () => setQuantities({});

  const surpriseMe = () => {
    const popularItems = Object.values(menuItems)
      .flat()
      .filter((item) => item.popular);
    const pool = popularItems.length >= 3 ? popularItems : Object.values(menuItems).flat();
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 3);
    const picks = {};
    shuffled.forEach((item) => {
      picks[item.id] = 1;
    });
    setQuantities(picks);
  };

  const handleAddCombo = () => {
    selectedEntries.forEach(([id, qty]) => {
      const item = allItemsById[id];
      if (!item) return;
      for (let i = 0; i < qty; i += 1) {
        addToCart(item);
      }
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="combo-modal" onClick={(e) => e.stopPropagation()}>
        <div className="combo-modal-header">
          <div>
            <h2>
              <span role="img" aria-label="art">🎨</span> Remix Your Combo
            </h2>
            <p>Mix and match anything on the menu, your way.</p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="combo-modal-toolbar">
          <button className="combo-tool-btn surprise" onClick={surpriseMe}>
            <i className="fas fa-dice"></i> Surprise Me
          </button>
          {selectedEntries.length > 0 && (
            <button className="combo-tool-btn clear" onClick={clearCombo}>
              <i className="fas fa-rotate-left"></i> Clear
            </button>
          )}
        </div>

        <div className="combo-modal-body">
          {Object.entries(menuItems).map(([categoryKey, items]) => {
            if (!items || items.length === 0) return null;
            const label = CATEGORY_LABELS[categoryKey] || { title: categoryKey, icon: "🍽️" };
            return (
              <div className="combo-category" key={categoryKey}>
                <h4 className="combo-category-title">
                  <span>{label.icon}</span> {label.title}
                </h4>
                <div className="combo-item-list">
                  {items.map((item) => {
                    const qty = quantities[item.id] || 0;
                    return (
                      <div
                        className={`combo-item-row ${qty > 0 ? "selected" : ""}`}
                        key={item.id}
                      >
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="combo-item-image" />
                        ) : (
                          <div className="combo-item-image placeholder" />
                        )}
                        <div className="combo-item-details">
                          <span className="combo-item-name">{item.name}</span>
                          <span className="combo-item-price">
                            {item.price > 0 ? `₦${item.price.toLocaleString()}` : "Ask for price"}
                          </span>
                        </div>
                        <div className="combo-stepper">
                          <button
                            className="combo-step-btn"
                            onClick={() => setQty(item, -1)}
                            disabled={qty === 0}
                            aria-label={`Remove one ${item.name}`}
                          >
                            −
                          </button>
                          <span className="combo-step-qty">{qty}</span>
                          <button
                            className="combo-step-btn"
                            onClick={() => setQty(item, 1)}
                            aria-label={`Add one ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="combo-modal-footer">
          {totalItems === 0 ? (
            <p className="combo-empty-hint">Tap the + button on any item to start your remix.</p>
          ) : (
            <div className="combo-summary">
              <span className="combo-summary-count">
                {totalItems} item{totalItems !== 1 ? "s" : ""} selected
              </span>
              <span className="combo-summary-total">₦{totalPrice.toLocaleString()}</span>
            </div>
          )}
          <button
            className="combo-add-btn"
            onClick={handleAddCombo}
            disabled={totalItems === 0}
          >
            <i className="fas fa-shopping-basket"></i> Add Combo to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComboBuilder;
