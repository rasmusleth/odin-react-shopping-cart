import { useState } from "react";
import PropTypes from "prop-types";
import MenuCategorySlider from "./MenuCategorySlider";
import MenuCategorySection from "./MenuCategorySection";
import MenuItemModal from "./MenuItemModal";
import styles from "./menu.module.css";

const Menu = ({ categories }) => {
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item, e) => {
    e.preventDefault();

    setSelectedItem({ ...item });
    setmodalIsOpen(true);
  };

  const handleModalClose = () => {
    console.log("FIRED!");
    setmodalIsOpen(false);
  };

  return (
    <>
      <h1>Menu</h1>
      <p>Browse our collection of delicious meals</p>
      {/* <div className={styles.spacerMedium}></div> */}
      <div className={styles.menuPageWrapper}>
        {/* <div class="spacer-small"></div> */}
        <MenuCategorySlider categories={categories} />
        <div className={styles.spacerSmall}></div>

        {categories.map((category) => (
          <MenuCategorySection
            key={`section-${category.id}`}
            category={category}
            onItemClick={handleItemClick}
          />
        ))}
      </div>

      <div className="dynamic-height-element"></div>
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
