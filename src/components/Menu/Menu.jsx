import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import MenuCategorySlider from "./MenuCategorySlider";
import MenuCategorySection from "./MenuCategorySection";
import MenuItemModal from "./MenuItemModal";
import styles from "./menu.module.css";

const Menu = ({ categories }) => {
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isObserverActive, setIsObserverActive] = useState(true);
  const categorySectionRefs = useRef([]);

  useEffect(() => {
    console.log(categorySectionRefs.current);
    categorySectionRefs.current = categorySectionRefs.current.slice(
      0,
      categories.length
    );

    const observer = new IntersectionObserver(
      (entries) => {
        if (isObserverActive) {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const category = entry.target.getAttribute("data-category-id");
              setActiveCategory(category);
            }
          });
        }
      },
      { threshold: 1 } // Adjust this value as needed
    );

    categorySectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      categorySectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [activeCategory, categories, isObserverActive]);

  const handleItemClick = (item, e) => {
    e.preventDefault();

    setSelectedItem({ ...item });
    setmodalIsOpen(true);
  };

  const handleModalClose = () => {
    setmodalIsOpen(false);
  };

  const handleCategoryClick = (category) => {
    setIsObserverActive(false);
    setActiveCategory(category);
    setTimeout(() => setIsObserverActive(true), 800);
  };

  return (
    <>
      <h1>Menu</h1>
      <p>Browse our collection of delicious meals</p>
      <div className={styles.menuPageWrapper}>
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
            onItemClick={handleItemClick}
            ref={(el) => (categorySectionRefs.current[index] = el)}
          />
        ))}
      </div>

      <MenuItemModal
        item={selectedItem}
        modalIsOpen={modalIsOpen}
        onClose={handleModalClose}
      />
    </>
  );
};

Menu.propTypes = {
  categories: PropTypes.array,
};

export default Menu;
