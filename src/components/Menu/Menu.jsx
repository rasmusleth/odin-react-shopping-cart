import { useEffect, useState, useRef } from "react";
import MenuCategorySlider from "./MenuCategorySlider";
import MenuCategorySection from "./MenuCategorySection";
import styles from "./menu.module.css";
import CartButton from "../Cart/CartButton";
import { useOutletContext } from "react-router-dom";
import { convertDataToCategories } from "../../assets/javascript/dataHelpers";

const Menu = () => {
  const { cart, cartLength, modalIsOpen, setModalIsOpen, setSelectedItem } =
    useOutletContext();

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

  const handleItemClick = (item, e) => {
    e.preventDefault();

    setSelectedItem({ ...item });
    setModalIsOpen(true);
  };

  const handleCategoryClick = (category) => {
    setIsObserverActive(false);
    setActiveCategory(category);
    setTimeout(() => setIsObserverActive(true), 800);
  };

  return (
    <>
      {categories.length > 0 ? (
        <div className={styles.menuPageWrapper}>
          <h1 className="heading-style-h2">Menu</h1>
          <div className="spacerXSmall"></div>
          <p>Se og bestil din mad lige her.</p>
          <div className={`spacerXSmall`}></div>
          <div className={`${styles.menuSectionWrapper}`}>
            <MenuCategorySlider
              categories={categories}
              activeCategory={activeCategory}
              onCategoryClick={handleCategoryClick}
            />

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
        </div>
      ) : (
        <>
          <p>Loading..</p>
        </>
      )}
    </>
  );
};

export default Menu;
