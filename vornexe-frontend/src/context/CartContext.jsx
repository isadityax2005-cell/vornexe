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

  const addToCart = async (product) => {
    if (cartItems.find(item => item.id === product.id)) {
      setIsCartOpen(true);
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const res = await fetch(`${apiUrl}/api/products/${product.id}/reserve`, {
        method: 'POST'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Successfully reserved, store token
      const reservedProduct = {
        ...product,
        reservationToken: data.reservationToken,
        reservedUntil: data.reservedUntil
      };
      
      setCartItems([...cartItems, reservedProduct]);
      setIsCartOpen(true);
    } catch (err) {
      alert("Cannot add to bag: " + err.message);
    }
  };

  const removeFromCart = async (productId) => {
    const item = cartItems.find(i => i.id === productId);
    if (item && item.reservationToken) {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      fetch(`${apiUrl}/api/products/${productId}/release`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reservationToken: item.reservationToken })
      }).catch(console.error);
    }
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
