import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartDrawer.css';

const CartDrawer = () => {
  const { cartItems, isCartOpen, closeCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    closeCart();
    // For single item checkout, go to the first item's checkout page
    // (If they somehow added multiple, we just use the first for now as per previous flow)
    if (cartItems.length > 0) {
      navigate(`/checkout/${cartItems[0].id}`);
    }
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <div className="cart-backdrop" onClick={closeCart}></div>
      <div className="cart-drawer animate-slide-in-right">
        <div className="cart-header">
          <h2>YOUR BAG</h2>
          <button className="close-cart-btn" onClick={closeCart}>✕</button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart-message">
              <p>Your bag is currently empty.</p>
              <button className="continue-shopping-btn" onClick={() => {
                closeCart();
                navigate('/shop');
              }}>
                EXPLORE ARCHIVE
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>Size: {item.size}</p>
                    <p className="cart-item-price">₹{item.price}</p>
                  </div>
                  <button 
                    className="remove-item-btn" 
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>TOTAL</span>
              <span>₹{totalAmount}</span>
            </div>
            <p className="cart-taxes-note">Shipping & taxes calculated at checkout</p>
            <button className="checkout-btn" onClick={handleCheckout}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
