import { useEffect, useState, useRef } from "react";
import MenuCategorySlider from "./MenuCategorySlider";
import MenuCategorySection from "./MenuCategorySection";
import styles from "./menu.module.css";
import CartButton from "../Cart/CartButton";
import {
  useOutletContext,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { convertDataToCategories } from "../../assets/javascript/dataHelpers";
import { useCart } from "../Cart/CartContext";

export async function loader() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  const categories = convertDataToCategories(data);
  return { categories };
}

const Menu = () => {
  const navigation = useNavigation();

  const cart = useCart();
  const { modalIsOpen, setModalIsOpen, setSelectedItem } = useOutletContext();
  const { categories } = useLoaderData();
  const [activeCategory, setActiveCategory] = useState(null);
  const [isObserverActive, setIsObserverActive] = useState(true);
  const categorySectionRefs = useRef([]);

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
      {navigation.state === "loading" && <p>Loading...</p>}
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
              onItemClick={handleItemClick}
              ref={(el) => (categorySectionRefs.current[index] = el)}
            />
          ))}
        </div>

        {cart.items.length > 0 && !modalIsOpen && (
          <CartButton text="Se bestilling" />
        )}
      </div>
    </>
  );
};

export default Menu;
