// components/WhatsAppIntegration.jsx
import React, { useState } from 'react';

const WhatsAppIntegration = ({ cart, cartTotal }) => {
  const [showInquiry, setShowInquiry] = useState(false);
  const [inquiry, setInquiry] = useState('');

  // Function to send order via WhatsApp
  const sendOrderViaWhatsApp = () => {
    const phone = '+2348167137498';
    
    let message = `*NEW ORDER - STRONG DELIGHT*\n\n`;
    message += `*Customer Inquiry/Order:*\n`;
    
    if (cart.length > 0) {
      message += `\n*Order Items:*\n`;
      cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - ₦${item.price.toLocaleString()} × ${item.quantity}\n`;
      });
      message += `\n*Total: ₦${cartTotal.toLocaleString()}*\n`;
    }
    
    message += `\n*Note:* Please deliver 48 hours after order confirmation\n`;
    message += `\nPlease provide your:\n`;
    message += `- Full Name\n`;
    message += `- Phone Number\n`;
    message += `- Delivery Address\n`;
    message += `- Preferred Delivery Date/Time`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
  };

  // Function to send inquiry via WhatsApp
  const sendInquiry = () => {
    if (inquiry.trim()) {
      const phone = '+2348167137498';
      let message = `*INQUIRY - STRONG DELIGHT*\n\n`;
      message += `${inquiry}\n\n`;
      message += `From: Website Visitor\n`;
      
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
      setInquiry('');
      setShowInquiry(false);
    }
  };

  return (
    <>
      <div className="whatsapp-button" onClick={() => setShowInquiry(true)}>
        <i className="fab fa-whatsapp"></i>
      </div>

      {showInquiry && (
        <div className="inquiry-modal">
          <div className="inquiry-modal-content">
            <div className="inquiry-header">
              <h3>Contact Strong Delight</h3>
              <button className="close-btn" onClick={() => setShowInquiry(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="inquiry-body">
              <p>Send us a message via WhatsApp:</p>
              
              <textarea
                value={inquiry}
                onChange={(e) => setInquiry(e.target.value)}
                placeholder="Type your message here... Ask about custom orders, bulk discounts, or special requests."
                rows="4"
                className="inquiry-textarea"
              />
              
              {cart.length > 0 && (
                <div className="order-summary-preview">
                  <p><strong>Your Order ({cart.length} items):</strong> ₦{cartTotal.toLocaleString()}</p>
                  <button 
                    className="whatsapp-order-btn"
                    onClick={sendOrderViaWhatsApp}
                  >
                    <i className="fab fa-whatsapp"></i> Send Order via WhatsApp
                  </button>
                </div>
              )}
              
              <div className="inquiry-buttons">
                <button 
                  className="inquiry-send-btn"
                  onClick={sendInquiry}
                  disabled={!inquiry.trim()}
                >
                  <i className="fab fa-whatsapp"></i> Send Message
                </button>
                <button 
                  className="inquiry-cancel-btn"
                  onClick={() => setShowInquiry(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppIntegration;