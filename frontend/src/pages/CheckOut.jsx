// frontend/src/pages/Checkout.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API_BASE_URL from '../config/api';
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Build shipping address
    const shippingAddress = `${formData.address}, ${formData.city}, ${formData.zipCode}`;

    const orderData = {
      customerName: formData.fullName,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      shippingAddress: shippingAddress,
      items: cartItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: getCartTotal(),
      status: "pending",
    };

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/orders`,
        orderData,
        console.log(res.data),
      );
      alert("Order placed successfully! Check your email for confirmation.");
      clearCart();
      navigate("/home");
    } catch (error) {
      console.error("Order error:", error.response?.data);
      alert(
        error.response?.data?.message ||
          "Error placing order. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-amber-400 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-slate-900 rounded-xl border border-white/10 p-6 space-y-4"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Shipping Details
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="bg-slate-800 text-white px-4 py-3 rounded-lg border border-white/10 w-full"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-slate-800 text-white px-4 py-3 rounded-lg border border-white/10 w-full"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-slate-800 text-white px-4 py-3 rounded-lg border border-white/10 w-full"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="bg-slate-800 text-white px-4 py-3 rounded-lg border border-white/10 w-full"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="bg-slate-800 text-white px-4 py-3 rounded-lg border border-white/10 w-full"
                  required
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="bg-slate-800 text-white px-4 py-3 rounded-lg border border-white/10 w-full"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-400 text-gray-900 py-3 rounded-lg font-bold text-lg hover:bg-amber-300 transition disabled:opacity-50"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>

          <div className="bg-slate-900 rounded-xl border border-white/10 p-6 h-fit sticky top-24">
            <h2 className="text-xl font-bold text-white mb-4">Your Order</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-400">
                    {item.quantity}x {item.name} ({item.priceOptionType})
                  </span>
                  <span className="text-white">
                    ₨ {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span className="text-white">Total</span>
                <span className="text-amber-400">
                  ₨ {getCartTotal().toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
