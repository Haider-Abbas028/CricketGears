// ProductCard component - product display card
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  // Cart context se add function
  const { addToCart } = useCart();
  // Selected price option state
  const [selectedPrice, setSelectedPrice] = useState(
    product.priceOptions?.[0] || null,
  );
  // Quantity state
  const [quantity, setQuantity] = useState(1);

  // Quantity increase
  const increaseQty = () => setQuantity((prev) => prev + 1);
  // Quantity decrease
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Add to cart handler
  const handleAddToCart = () => {
    addToCart(product, selectedPrice, quantity);
  };

  // Check if price options exist
  if (!product.priceOptions || product.priceOptions.length === 0) {
    return (
      <div className="bg-slate-900 rounded-xl border border-white/10 p-4 text-center">
        <p className="text-gray-400">Product data incomplete</p>
      </div>
    );
  }

  return (
    // Product card container
    <div className="bg-slate-900 rounded-xl border border-white/10 overflow-hidden hover:border-blue-500/30 transition hover:-translate-y-1">
      {/* Product image link */}
      <Link to={`/product/${product._id}`}>
        <img
          src={
            product.imageUrl ||
            "https://via.placeholder.com/300x200?text=No+Image"
          }
          alt={product.name}
          className="w-full h-48 object-cover hover:scale-105 transition duration-300"
        />
      </Link>

      <div className="p-4">
        {/* Brand */}
        <div className="text-sm text-blue-400 font-semibold">
          {product.brand}
        </div>
        {/* Product name link */}
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-bold text-white mt-1 hover:text-blue-400 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating stars */}
        <div className="flex items-center gap-1 mt-1">
          <span className="text-yellow-400">
            {"★".repeat(Math.floor(product.rating || 4))}
          </span>
          <span className="text-gray-500">
            {"☆".repeat(5 - Math.floor(product.rating || 4))}
          </span>
          <span className="text-xs text-gray-400 ml-1">
            ({product.rating || 4})
          </span>
        </div>

        {/* Price options select */}
        {product.priceOptions && product.priceOptions.length > 0 && (
          <div className="mt-3">
            <select
              value={selectedPrice?.type}
              onChange={(e) => {
                const newOption = product.priceOptions.find(
                  (opt) => opt.type === e.target.value,
                );
                setSelectedPrice(newOption);
              }}
              className="w-full bg-slate-800 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
            >
              {product.priceOptions.map((option) => (
                <option key={option.type} value={option.type}>
                  {option.type} - ₨{option.price.toLocaleString()}{" "}
                  {option.stock > 0
                    ? `(In Stock: ${option.stock})`
                    : "(Out of Stock)"}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Quantity controls aur total */}
        <div className="flex items-center justify-between mt-4">
          {/* Quantity buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={decreaseQty}
              className="w-8 h-8 rounded-full bg-slate-800 text-white hover:bg-blue-600 transition"
            >
              -
            </button>
            <span className="text-white font-semibold min-w-30 text-center">
              {quantity}
            </span>
            <button
              onClick={increaseQty}
              className="w-8 h-8 rounded-full bg-slate-800 text-white hover:bg-blue-600 transition"
            >
              +
            </button>
          </div>
          {/* Total price */}
          <div className="text-right">
            <p className="text-xs text-gray-400">Total</p>
            <p className="text-xl font-bold text-amber-400">
              ₨
              {(
                (selectedPrice?.price || product.priceOptions[0]?.price) *
                quantity
              ).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          disabled={selectedPrice?.stock === 0}
          className={`w-full mt-4 py-2 rounded-lg font-semibold transition ${
            selectedPrice?.stock > 0
              ? "bg-blue-600 text-white hover:bg-blue-500"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          {selectedPrice?.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
