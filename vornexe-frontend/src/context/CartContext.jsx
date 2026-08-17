import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem('vornexe_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('vornexe_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    // Since items are 1-of-1, we only add if it's not already in there
    if (!cartItems.find(item => item.id === product.id)) {
      setCartItems([...cartItems, product]);
    }
    setIsCartOpen(true); // Auto-open cart when adding
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      isCartOpen,
      toggleCart,
      closeCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
