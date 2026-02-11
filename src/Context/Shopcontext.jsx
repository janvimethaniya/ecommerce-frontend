import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = ({ children }) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState({}); 

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    fetch("http://localhost:7000/allproducts")
      .then((res) => res.json())
      .then((data) => setAll_Product(data))
      .catch((err) => console.error("Product fetch error:", err));
  }, []);

  /* ================= ADD TO CART ================= */
  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const existing = prev[itemId] || { qty: 0, size: "" };
      return {
        ...prev,
        [itemId]: {
          ...existing,
          qty: existing.qty + 1,
        },
      };
    });
  };

  /* ================= ADD TO CART WITH SIZE ================= */
  const addToCartWithSize = (itemId, size) => {
    setCartItems((prev) => {
      const existing = prev[itemId] || { qty: 0, size: "" };
      return {
        ...prev,
        [itemId]: {
          qty: existing.qty + 1,
          size,
        },
      };
    });
  };

  /* ================= REMOVE (−1) ================= */
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;

      const newQty = prev[itemId].qty - 1;

      if (newQty <= 0) {
        const updated = { ...prev };
        delete updated[itemId];
        return updated;
      }

      return {
        ...prev,
        [itemId]: {
          ...prev[itemId],
          qty: newQty,
        },
      };
    });
  };

  /* ================= SET EXACT QUANTITY (EDIT) ================= */
  const setItemQuantity = (itemId, qty) => {
    setCartItems((prev) => {
      if (qty <= 0) {
        const updated = { ...prev };
        delete updated[itemId];
        return updated;
      }

      return {
        ...prev,
        [itemId]: {
          ...(prev[itemId] || {}),
          qty,
        },
      };
    });
  };

  /* ================= DELETE ITEM ================= */
  const deleteFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[itemId];
      return updated;
    });
  };

  /* ================= TOTAL ITEMS (NAVBAR COUNT) ================= */
  const getTotalItems = () => {
    return Object.values(cartItems).reduce(
      (total, item) => total + item.qty,
      0
    );
  };

  /* ================= CONTEXT VALUE ================= */
  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    addToCartWithSize,
    removeFromCart,
    setItemQuantity,
    deleteFromCart,
    getTotalItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
