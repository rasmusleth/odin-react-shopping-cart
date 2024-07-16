import { useState } from "react";
import PropTypes from "prop-types";
import MenuCategorySlider from "./MenuCategorySlider";
import MenuCategorySection from "./MenuCategorySection";
import MenuItemModal from "./MenuItemModal";
import styles from "./menu.module.css";

const Menu = ({ categories }) => {
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const handleItemClick = (item, e) => {
    e.preventDefault();

    setSelectedItem({ ...item });
    setmodalIsOpen(true);
  };

  const handleModalClose = () => {
    setmodalIsOpen(false);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
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

        {categories.map((category) => (
          <MenuCategorySection
            key={`section-${category.id}`}
            category={category}
            onItemClick={handleItemClick}
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
