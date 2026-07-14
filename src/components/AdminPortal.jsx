// components/AdminPortal.jsx - FIXED WITH DESIGN
import React, { useState } from "react";

const AdminPortal = ({
  menuItems,
  updateItemPrice,
  addMenuItem,
  removeMenuItem,
  updateItemImage,
  resetItemImage,
  updateItemPromoImage,
  resetItemPromoImage,
  onLogout,
}) => {
  const [newItem, setNewItem] = useState({
    name: "",
    price: 0,
    category: "yogurt",
    description: "",
    popular: false,
    image: "",
    promoImage: "",
  });

  const [editingPrices, setEditingPrices] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem.name && newItem.price >= 0) {
      addMenuItem(newItem.category, {
        ...newItem,
        id: Date.now(),
        popular: newItem.popular || false,
      });
      setNewItem({
        name: "",
        price: 0,
        category: "yogurt",
        description: "",
        popular: false,
        image: "",
        promoImage: "",
      });
    }
  };

  const readFileAsDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Failed to read image file"));
      reader.readAsDataURL(file);
    });

  const compressImageForStorage = async (file) => {
    const maxSizeBytes = 350 * 1024;
    const sourceDataUrl = await readFileAsDataUrl(file);

    if (file.size <= maxSizeBytes) {
      return sourceDataUrl;
    }

    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => {
        const maxDimension = 1280;
        const scale = Math.min(
          maxDimension / image.width,
          maxDimension / image.height,
          1,
        );
        const width = Math.round(image.width * scale);
        const height = Math.round(image.height * scale);

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = width;
        canvas.height = height;

        if (!context) {
          resolve(sourceDataUrl);
          return;
        }

        context.drawImage(image, 0, 0, width, height);

        const targetType =
          file.type === "image/png" ? "image/webp" : "image/jpeg";
        resolve(canvas.toDataURL(targetType, 0.8));
      };

      image.onerror = () => resolve(sourceDataUrl);
      image.src = sourceDataUrl;
    });
  };

  const handleExistingItemImageUpload = async (category, id, event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const dataUrl = await compressImageForStorage(file);
      updateItemImage(category, id, dataUrl);
    } catch (error) {
      alert("Could not upload this image. Please try another file.");
    }
  };

  const handleExistingItemPromoImageUpload = async (category, id, event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const dataUrl = await compressImageForStorage(file);
      updateItemPromoImage(category, id, dataUrl);
    } catch (error) {
      alert("Could not upload this promo image. Please try another file.");
    }
  };

  const handleNewItemImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const dataUrl = await compressImageForStorage(file);
      setNewItem((prev) => ({ ...prev, image: dataUrl }));
    } catch (error) {
      alert("Could not upload this image. Please try another file.");
    }
  };

  const handleNewItemPromoImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const dataUrl = await compressImageForStorage(file);
      setNewItem((prev) => ({ ...prev, promoImage: dataUrl }));
    } catch (error) {
      alert("Could not upload this promo image. Please try another file.");
    }
  };

  const handlePriceChange = (category, id, value) => {
    setEditingPrices({
      ...editingPrices,
      [`${category}-${id}`]: parseInt(value) || 0,
    });
  };

  const savePrice = (category, id) => {
    const priceKey = `${category}-${id}`;
    if (editingPrices[priceKey] !== undefined) {
      updateItemPrice(category, id, editingPrices[priceKey]);
      const newEditingPrices = { ...editingPrices };
      delete newEditingPrices[priceKey];
      setEditingPrices(newEditingPrices);
    }
  };

  const categoryNames = {
    yogurt: "Yogurts",
    parfaits: "Parfaits",
    bakery: "Bakery",
    snacks: "Snacks",
    fruits: "Fruits & Juices",
    food: "Food",
    packs: "Health Packs",
  };

  const totalItems = Object.values(menuItems).reduce(
    (sum, items) => sum + items.length,
    0,
  );
  const totalValue = Object.values(menuItems)
    .flat()
    .reduce((sum, item) => sum + item.price, 0);
  const popularItems = Object.values(menuItems)
    .flat()
    .filter((item) => item.popular).length;

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>
          <i className="fas fa-tachometer-alt"></i> Admin Dashboard
        </h2>
        <div className="dashboard-stats">
          <div className="stat-box">
            <div className="stat-value">{totalItems}</div>
            <div className="stat-label">Total Items</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">₦{totalValue.toLocaleString()}</div>
            <div className="stat-label">Total Value</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{popularItems}</div>
            <div className="stat-label">Popular Items</div>
          </div>
        </div>
      </div>

      <div className="admin-content">
        {Object.entries(menuItems).map(([category, items]) => (
          <div key={category} className="category-section">
            <h3 className="section-title">{categoryNames[category]}</h3>
            <div className="items-grid">
              {items.map((item) => {
                const priceKey = `${category}-${item.id}`;
                const currentPrice =
                  editingPrices[priceKey] !== undefined
                    ? editingPrices[priceKey]
                    : item.price;

                return (
                  <div key={item.id} className="admin-item">
                    <div className="admin-item-image-wrap">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="admin-item-image"
                        />
                      ) : (
                        <div className="admin-item-image-placeholder">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="item-header">
                      <h4>{item.name}</h4>
                      {item.popular && (
                        <span className="popular-tag">Popular</span>
                      )}
                    </div>
                    <p className="item-desc">{item.description}</p>
                    <div className="image-upload-row">
                      <label className="upload-label">Update Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="image-upload-input"
                        onChange={(e) =>
                          handleExistingItemImageUpload(category, item.id, e)
                        }
                      />
                      <button
                        type="button"
                        className="reset-image-btn"
                        onClick={() => resetItemImage(category, item.id)}
                      >
                        Reset to Default
                      </button>
                    </div>
                    <div className="image-upload-row promo-image-row">
                      <label className="upload-label">
                        <i className="fas fa-fire"></i> Promo Banner Image
                        (shown in homepage carousel)
                      </label>
                      {item.promoImage ? (
                        <img
                          src={item.promoImage}
                          alt={`${item.name} promo`}
                          className="promo-image-preview"
                        />
                      ) : (
                        <p className="promo-image-hint">
                          No promo image set — the item photo above is used
                          instead.
                        </p>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="image-upload-input"
                        onChange={(e) =>
                          handleExistingItemPromoImageUpload(
                            category,
                            item.id,
                            e,
                          )
                        }
                      />
                      {item.promoImage && (
                        <button
                          type="button"
                          className="reset-image-btn"
                          onClick={() => resetItemPromoImage(category, item.id)}
                        >
                          Remove Promo Image
                        </button>
                      )}
                    </div>
                    <div className="item-controls">
                      <div className="price-control">
                        <input
                          type="number"
                          value={currentPrice}
                          onChange={(e) =>
                            handlePriceChange(category, item.id, e.target.value)
                          }
                          placeholder="Price"
                          className="price-input"
                        />
                        <button
                          onClick={() => savePrice(category, item.id)}
                          className="save-btn"
                          disabled={editingPrices[priceKey] === undefined}
                        >
                          Save
                        </button>
                      </div>
                      <button
                        onClick={() => removeMenuItem(category, item.id)}
                        className="remove-btn"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="add-item-section">
        <h3>
          <i className="fas fa-plus-circle"></i> Add New Item
        </h3>
        <form onSubmit={handleSubmit} className="add-form">
          <div className="form-row">
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              placeholder="Item Name"
              required
            />
            <input
              type="number"
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: parseInt(e.target.value) || 0 })
              }
              placeholder="Price"
              required
            />
          </div>

          <select
            value={newItem.category}
            onChange={(e) =>
              setNewItem({ ...newItem, category: e.target.value })
            }
          >
            <option value="yogurt">Yogurts</option>
            <option value="parfaits">Parfaits</option>
            <option value="bakery">Bakery</option>
            <option value="snacks">Snacks</option>
            <option value="fruits">Fruits & Juices</option>
            <option value="food">Food</option>
            <option value="packs">Health Packs</option>
          </select>

          <textarea
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
            placeholder="Description"
            rows="3"
          />

          <div className="form-check">
            <label>
              <input
                type="checkbox"
                checked={newItem.popular}
                onChange={(e) =>
                  setNewItem({ ...newItem, popular: e.target.checked })
                }
              />
              Mark as Popular
            </label>
          </div>

          <div className="image-upload-row">
            <label className="upload-label">Product Image</label>
            <input
              type="file"
              accept="image/*"
              className="image-upload-input"
              onChange={handleNewItemImageUpload}
            />
            <small className="upload-help">
              Large images are automatically compressed for faster loading and
              storage.
            </small>
            {newItem.image && (
              <img
                src={newItem.image}
                alt="New item preview"
                className="new-item-preview"
              />
            )}
          </div>

          <div className="image-upload-row promo-image-row">
            <label className="upload-label">
              <i className="fas fa-fire"></i> Promo Banner Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              className="image-upload-input"
              onChange={handleNewItemPromoImageUpload}
            />
            <small className="upload-help">
              Only needed if you want a different image to appear in the
              homepage carousel. Leave blank to reuse the product image.
            </small>
            {newItem.promoImage && (
              <img
                src={newItem.promoImage}
                alt="New item promo preview"
                className="new-item-preview"
              />
            )}
          </div>

          <button type="submit" className="submit-btn">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPortal;
