// components/PromoBanner.jsx
import React, { useEffect, useMemo, useState } from "react";

const AUTO_ROTATE_MS = 5000;

const PromoBanner = ({ menuItems, addToCart, onViewAll }) => {
  const promoItems = useMemo(() => {
    const all = Object.values(menuItems).flat();
    const tagged = all.filter((item) => item.popular || item.tag);
    // Fall back to first few items so the banner never renders empty
    return (tagged.length > 0 ? tagged : all).slice(0, 8);
  }, [menuItems]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (promoItems.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % promoItems.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, [promoItems.length, isPaused]);

  useEffect(() => {
    // Keep index valid if the item list shrinks (e.g. admin removes items)
    if (activeIndex >= promoItems.length) setActiveIndex(0);
  }, [promoItems.length, activeIndex]);

  if (promoItems.length === 0) return null;

  const activeItem = promoItems[activeIndex];

  const goTo = (index) => {
    setActiveIndex(((index % promoItems.length) + promoItems.length) % promoItems.length);
  };

  return (
    <section
      className="promo-banner"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="promo-banner-heading">
        <h2>
          <span role="img" aria-label="fire">🔥</span> Hot &amp; Popular Right Now
        </h2>
        {onViewAll && (
          <button className="promo-view-all" onClick={onViewAll}>
            View All <i className="fas fa-arrow-right"></i>
          </button>
        )}
      </div>

      <div className="promo-banner-stage">
        <button
          className="promo-arrow promo-arrow-left"
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Previous promo"
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        <div className="promo-slide" key={activeItem.id}>
          <div className="promo-slide-image-wrap">
            {activeItem.promoImage || activeItem.image ? (
              <img
                src={activeItem.promoImage || activeItem.image}
                alt={activeItem.name}
                className="promo-slide-image"
              />
            ) : (
              <div className="promo-slide-image placeholder">No Image</div>
            )}
            <span className="promo-badge">
              {activeItem.tag || "Popular Pick"}
            </span>
          </div>

          <div className="promo-slide-info">
            <h3>{activeItem.name}</h3>
            <p>{activeItem.description}</p>
            <div className="promo-slide-footer">
              <span className="promo-price">
                {activeItem.price > 0
                  ? `₦${activeItem.price.toLocaleString()}`
                  : "Ask for price"}
              </span>
              <button className="promo-add-btn" onClick={() => addToCart(activeItem)}>
                <i className="fas fa-plus"></i> Add to Order
              </button>
            </div>
          </div>
        </div>

        <button
          className="promo-arrow promo-arrow-right"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Next promo"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      {promoItems.length > 1 && (
        <div className="promo-dots">
          {promoItems.map((item, index) => (
            <button
              key={item.id}
              className={`promo-dot ${index === activeIndex ? "active" : ""}`}
              onClick={() => goTo(index)}
              aria-label={`Show ${item.name}`}
            />
          ))}
        </div>
      )}

      {promoItems.length > 1 && (
        <div className="promo-strip">
          {promoItems.map((item, index) => (
            <button
              key={item.id}
              className={`promo-chip ${index === activeIndex ? "active" : ""}`}
              onClick={() => goTo(index)}
            >
              {item.image ? (
                <img src={item.image} alt={item.name} className="promo-chip-image" />
              ) : (
                <div className="promo-chip-image placeholder" />
              )}
              <span className="promo-chip-name">{item.name}</span>
              <span className="promo-chip-price">
                {item.price > 0 ? `₦${item.price.toLocaleString()}` : "—"}
              </span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default PromoBanner;
