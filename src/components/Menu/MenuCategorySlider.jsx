import PropTypes from "prop-types";
import styles from "./menu.module.css";

const MenuCategorySliderItem = ({ category }) => {
  return (
    <a
      href={`#${category.slug.slice(1)}`}
      className={styles.menuCategoriesSliderItem}
    >
      {category.title}
    </a> // old class name: menu_categories-item
  );
};

MenuCategorySliderItem.propTypes = {
  category: PropTypes.object.isRequired,
};

const MenuCategorySlider = ({ categories }) => {
  return (
    <div className={styles.menuCategoriesSlider}>
      {categories.map((category) => (
        <MenuCategorySliderItem
          key={`slider-${category.id}`}
          category={category}
        />
      ))}
    </div>
  );
};

MenuCategorySlider.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default MenuCategorySlider;
