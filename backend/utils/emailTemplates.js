// Order Confirmation Email Template
const getOrderConfirmationTemplate = (orderDetails) => {
  // Calculate expected delivery date (5-7 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);
  const expectedDelivery = deliveryDate.toLocaleDateString('en-PK', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Generate items HTML
  const itemsHtml = orderDetails.items.map(item => `
    <tr style="border-bottom: 1px solid #333;">
      <td style="padding: 10px;">${item.name}</td>
      <td style="padding: 10px; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; text-align: right;">₨ ${item.price.toLocaleString()}</td>
      <td style="padding: 10px; text-align: right;">₨ ${(item.price * item.quantity).toLocaleString()}</td>
    </tr>
  `).join('');

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A192F; color: white; padding: 20px; border-radius: 10px;">
      <div style="text-align: center; border-bottom: 2px solid #FFD700; padding-bottom: 20px;">
        <h1 style="color: #FFD700;">🏏 CRICKET GEARS</h1>
        <p style="color: #FFD700;">Order Confirmation</p>
      </div>
      
      <div style="padding: 20px;">
        <p>Dear <strong>${orderDetails.customerName}</strong>,</p>
        <p>Thank you for shopping with Cricket Gears! Your order has been placed successfully.</p>
        
        <div style="background: #1E3A8A; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #FFD700; margin: 0 0 10px 0;">Order Summary</h3>
          <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
          <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Shipping Address:</strong> ${orderDetails.shippingAddress}</p>
        </div>
        
        <div style="background: #1E3A8A; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #FFD700; margin: 0 0 10px 0;">Products</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #FFD700;">
              <th style="text-align: left; padding: 10px;">Product</th>
              <th style="text-align: center; padding: 10px;">Qty</th>
              <th style="text-align: right; padding: 10px;">Price</th>
              <th style="text-align: right; padding: 10px;">Total</th>
            </tr>
            ${itemsHtml}
            <tr style="border-top: 1px solid #FFD700;">
              <td colspan="3" style="text-align: right; padding: 10px;"><strong>Grand Total:</strong></td>
              <td style="text-align: right; padding: 10px;"><strong style="color: #FFD700;">₨ ${orderDetails.totalAmount.toLocaleString()}</strong></td>
            </tr>
          </table>
        </div>
        
        <div style="background: #1E3A8A; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <h3 style="color: #FFD700; margin: 0 0 10px 0;">🚚 Expected Delivery</h3>
          <p style="font-size: 18px; margin: 0;">${expectedDelivery}</p>
        </div>
        
        <div style="border-top: 1px solid #FFD700; margin-top: 20px; padding-top: 20px; text-align: center; color: #CCC; font-size: 12px;">
          <p>Thank you for choosing Cricket Gears!</p>
          <p>For queries, contact us at: support@cricketgears.com</p>
        </div>
      </div>
    </div>
  `;
};

module.exports = { getOrderConfirmationTemplate };