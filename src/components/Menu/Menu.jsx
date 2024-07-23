import { useEffect, useState, useRef } from "react";
import MenuCategorySlider from "./MenuCategorySlider";
import MenuCategorySection from "./MenuCategorySection";
import MenuItemModal from "../MenuItem/MenuItemModal";
import styles from "./menu.module.css";
import CartButton from "../Cart/CartButton";
import { useOutletContext } from "react-router-dom";
import { handleBodyOnModalOpen } from "../../assets/javascript/itemModalHelpers";
import { convertDataToCategories } from "../../assets/javascript/dataHelpers";

const Menu = () => {
  const [
    cart,
    cartDispatch,
    cartLength,
    modalIsOpen,
    setModalIsOpen,
    selectedItem,
    setSelectedItem,
  ] = useOutletContext();
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isObserverActive, setIsObserverActive] = useState(true);
  const categorySectionRefs = useRef([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      const convertedData = convertDataToCategories(data);
      setCategories(convertedData);
    }

    fetchData();
  }, []);

  // Slider color-change implementation
  useEffect(() => {
    function handleScroll() {
      if (!isObserverActive) return;
      categorySectionRefs.current.forEach((ref, index) => {
        if (!ref) return;

        const rect = ref.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom >= 0) setActiveCategory(index);
      });
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isObserverActive]);

  // Handle body overflow when modal is open
  useEffect(() => {
    handleBodyOnModalOpen(modalIsOpen);
  }, [modalIsOpen]);

  const handleItemClick = (item, e) => {
    e.preventDefault();

    setSelectedItem({ ...item });
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleCategoryClick = (category) => {
    setIsObserverActive(false);
    setActiveCategory(category);
    setTimeout(() => setIsObserverActive(true), 800);
  };

  return (
    <>
      {categories.length > 0 ? (
        <>
          <h1>Menu</h1>
          <p>Browse our collection of delicious meals</p>
          <div className={`${styles.menuPageWrapper}`}>
            <div className={`spacerSmall`}></div>
            <MenuCategorySlider
              categories={categories}
              activeCategory={activeCategory}
              onCategoryClick={handleCategoryClick}
            />
            <div className={`spacerSmall`}></div>

            {categories.map((category, index) => (
              <MenuCategorySection
                key={`section-${category.id}`}
                category={category}
                cart={cart}
                onItemClick={handleItemClick}
                ref={(el) => (categorySectionRefs.current[index] = el)}
              />
            ))}
          </div>

          {cart.items.length > 0 && !modalIsOpen && (
            <CartButton
              cart={cart}
              cartLength={cartLength}
              text="Items in your cart"
            />
          )}

          <MenuItemModal
            item={selectedItem}
            modalIsOpen={modalIsOpen}
            onClose={handleModalClose}
            cartDispatch={cartDispatch}
            action="add"
          />
        </>
      ) : (
        <>
          <p>Loading..</p>
        </>
      )}
    </>
  );
};

export default Menu;
