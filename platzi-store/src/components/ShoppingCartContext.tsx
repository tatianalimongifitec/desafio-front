// ShoppingCartContext.tsx

import React, { createContext, useContext, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface ProductWithQuantity extends Product {
  quantity: number;
}

interface ShoppingCartContextProps {
  cartItems: Product[];
  handleIncrement: (itemId: number) => void;
  handleDecrement: (itemId: number) => void;
  handleRemove: (itemId: number) => void;
  handleCheckout: (cartItems: Product[]) => void;
  handleAddToCart: (item: Product) => void;
  handleUpdateCartItem: (itemId: number, newQuantity: number, updatedPrice: number) => void;
}


const ShoppingCartContext = createContext<ShoppingCartContextProps | undefined>(undefined);

export const ShoppingCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const handleIncrement = (itemId: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (itemId: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (itemId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleCheckout = (cartItems: Product[]) => {
    console.log('Checkout:', cartItems);
    setCartItems([]);
  };

  const handleAddToCart = (item: Product) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const handleUpdateCartItem = (itemId: number, newQuantity: number, updatedPrice: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: newQuantity, price: updatedPrice }
          : item
      )
    );
  };
  

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        handleIncrement,
        handleDecrement,
        handleRemove,
        handleCheckout,
        handleAddToCart,
        handleUpdateCartItem,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
  }
  return context;
};
