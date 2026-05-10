import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FiTrash2 } from "react-icons/fi";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-8xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-gray-400 mb-6">
          Looks like you haven't added any items yet.
        </p>
        <Link
          to="/bats"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition"
        >
          Start Shopping 🏏
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-amber-400 mb-8">Your Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item.productId}-${item.priceOptionType}`}
                className="bg-slate-900 rounded-xl border border-white/10 p-4 flex gap-4"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-blue-400">{item.brand}</p>
                      <h3 className="text-lg font-semibold text-white">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        Variant: {item.priceOptionType}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        removeFromCart(item.productId, item.priceOptionType)
                      }
                      className="text-red-400 hover:text-red-300"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.priceOptionType,
                            item.quantity - 1,
                          )
                        }
                        className="w-8 h-8 rounded-full bg-slate-800 text-white hover:bg-blue-600"
                      >
                        -
                      </button>
                      <span className="text-white font-semibold min-w-7.5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.priceOptionType,
                            item.quantity + 1,
                          )
                        }
                        className="w-8 h-8 rounded-full bg-slate-800 text-white hover:bg-blue-600"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-xl font-bold text-amber-400">
                      ₨ {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 rounded-xl border border-white/10 p-6 h-fit sticky top-24">
            <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
            <div className="space-y-3 border-b border-white/10 pb-4">
              <div className="flex justify-between text-gray-400">
                <span>
                  Subtotal ({cartItems.reduce((sum, i) => sum + i.quantity, 0)}{" "}
                  items)
                </span>
                <span>₨ {getCartTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="text-green-500">Free</span>
              </div>
            </div>
            <div className="flex justify-between text-xl font-bold text-white py-4">
              <span>Total</span>
              <span className="text-amber-400">
                ₨ {getCartTotal().toLocaleString()}
              </span>
            </div>
            <Link
              to="/checkout"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-center block hover:bg-blue-500 transition"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={clearCart}
              className="w-full mt-3 text-gray-400 text-sm hover:text-red-400"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
