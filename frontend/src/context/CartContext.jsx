import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          return JSON.parse(savedCart);
        } catch (e) {
          console.error("Failed to parse cart:", e);
        }
      }
    }
    return [];
  });

  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0,
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (product, selectedPrice, quantity) => {
    if (!product || !selectedPrice) {
      console.error("Invalid product or price option");
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item.productId === product._id &&
          item.priceOptionType === selectedPrice.type,
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.productId === product._id &&
          item.priceOptionType === selectedPrice.type
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        return [
          ...prevItems,
          {
            productId: product._id,
            name: product.name,
            brand: product.brand,
            imageUrl: product.imageUrl,
            priceOptionType: selectedPrice.type,
            price: selectedPrice.price,
            quantity: quantity,
            stock: selectedPrice.stock,
          },
        ];
      }
    });
  };

  const removeFromCart = (productId, priceOptionType) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.priceOptionType === priceOptionType
          ),
      ),
    );
  };

  const updateQuantity = (productId, priceOptionType, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId, priceOptionType);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId && item.priceOptionType === priceOptionType
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 0),
      0,
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
