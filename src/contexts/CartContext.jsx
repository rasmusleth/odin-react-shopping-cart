import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Cart operations: add, remove, update
  const addItemToCart = (item) => setCartItems([...cartItems, item]);
  const removeItemFromCart = (itemId) =>
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  const updateItemInCart = (itemId, updatedProperties) => {
    setCartItems(
      cartItems.map((item) => {
        item.id === itemId ? { ...item, ...updatedProperties } : item;
      })
    );
  };
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        updateItemInCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
