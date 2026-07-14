// components/OrderSummary.jsx - Updated structure
import React, { useState } from 'react';

const OrderSummary = ({ orderDetails, onClose, cart, removeFromCart, updateQuantity, cartTotal }) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    deliveryDate: ''
  });

  const formatOrderForWhatsApp = () => {
    let orderText = `*NEW ORDER - STRONG DELIGHT*\n\n`;
    orderText += `*Customer Information:*\n`;
    orderText += `Name: ${customerInfo.name}\n`;
    orderText += `Phone: ${customerInfo.phone}\n`;
    orderText += `Address: ${customerInfo.address}\n`;
    if (customerInfo.deliveryDate) {
      orderText += `Preferred Delivery: ${customerInfo.deliveryDate}\n`;
    }
    
    orderText += `\n*Order Items:*\n`;
    cart.forEach((item, index) => {
      orderText += `${index + 1}. ${item.name} - ₦${item.price.toLocaleString()} × ${item.quantity}\n`;
    });
    
    orderText += `\n*Total Amount:* ₦${cartTotal.toLocaleString()}\n\n`;
    orderText += `*Note:* Please deliver 48 hours after order confirmation\n`;
    orderText += `\n---\n`;
    orderText += `Order placed via Strong Delight Website`;
    
    return orderText;
  };

  const submitOrder = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert('⚠️ Please fill in all required customer information');
      return;
    }

    const orderText = formatOrderForWhatsApp();
    const phone = '+2348167137498';
    const encodedMessage = encodeURIComponent(orderText);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
    
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className="order-summary-modal">
      <div className="order-summary-content">
        <div className="order-summary-header">
          <h2>Order Summary</h2>
          <p className="order-subtitle">Review your order and provide delivery details</p>
          <button onClick={onClose} className="close-modal">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="cart-items-section">
          <h3>
            <i className="fas fa-shopping-cart"></i>
            Your Order ({cart.length} items)
          </h3>
          <div className="cart-items-list">
            {cart.map(item => (
              <div key={item.cartId} className="cart-item">
                <div className="cart-item-info">
                  <div className="item-name">{item.name}</div>
                  <div className="item-quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.cartId, -1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.cartId, 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-price">
                  <div className="item-price-amount">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.cartId)}
                    className="remove-item-btn"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="total-section">
          <div className="total-row">
            <span>Subtotal</span>
            <span>₦{cartTotal.toLocaleString()}</span>
          </div>
          <div className="total-row">
            <span>Delivery Fee</span>
            <span>To be discussed</span>
          </div>
          <div className="total-row grand-total">
            <span>Total Amount</span>
            <span>₦{cartTotal.toLocaleString()}</span>
          </div>
          <div className="delivery-note">
            <i className="fas fa-info-circle"></i>
            <span>Please deliver 48 hours after order confirmation</span>
          </div>
        </div>

        <div className="customer-info-section">
          <h3>
            <i className="fas fa-truck"></i>
            Delivery Information
          </h3>
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              value={customerInfo.phone}
              onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="form-group">
            <label>Delivery Address *</label>
            <textarea
              value={customerInfo.address}
              onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
              placeholder="Enter complete delivery address"
              rows="3"
              required
            />
          </div>
          <div className="form-group">
            <label>Preferred Delivery Date</label>
            <input
              type="date"
              value={customerInfo.deliveryDate}
              onChange={(e) => setCustomerInfo({...customerInfo, deliveryDate: e.target.value})}
              min={new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString().split('T')[0]}
            />
            <small>Minimum 48 hours from now</small>
          </div>
        </div>

        <div className="order-actions">
          <button onClick={submitOrder} className="submit-order-btn">
            <i className="fab fa-whatsapp"></i>
            Send Order via WhatsApp
          </button>
          <button onClick={onClose} className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;