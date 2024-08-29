import React, { createContext, useState,useEffect } from 'react';
import axios from 'axios';
import { URL } from '../url';


const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.product.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

const purchaseCart = async () => {
    try {
        const res = await axios.post(`${URL}/api/purchases/create`, {cart});
        clearCart();
        return res.data;
    } catch (err) {
        console.error(err);
    }
}


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotalQuantity, purchaseCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };