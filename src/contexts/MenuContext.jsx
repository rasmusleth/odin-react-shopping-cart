import { createContext, useContext, useState, useEffect } from "react";

const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const productData = await fetch("http://localhost:3000/products").then(
        (res) => res.json()
      );
      const categoryData = await fetch("http://localhost:3000/categories").then(
        (res) => res.json()
      );
      setProducts(productData);
      setCategories(categoryData);
    }
    fetchData();
  }, []);

  return (
    <MenuContext.Provider value={{ products, categories }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
