import PropTypes from "prop-types";
import styles from "./menu.module.css";

const MenuCategorySliderItem = ({ category, isActive, onCategoryClick }) => {
  return (
    <a
      href={`#${category.slug.slice(1)}`}
      className={`${isActive ? styles.selected : ""} ${
        styles.menuCategoriesSliderItem
      }`}
      onClick={() => onCategoryClick(category.id)}
    >
      {category.title}
    </a>
  );
};

MenuCategorySliderItem.propTypes = {
  category: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
};

const MenuCategorySlider = ({
  categories,
  activeCategory,
  onCategoryClick,
}) => {
  return (
    <div className={styles.menuCategoriesSlider}>
      {categories.map((category) => (
        <MenuCategorySliderItem
          key={`slider-${category.id}`}
          category={category}
          isActive={activeCategory === category.id ? true : false}
          onCategoryClick={onCategoryClick}
        />
      ))}
    </div>
  );
};

MenuCategorySlider.propTypes = {
  categories: PropTypes.array.isRequired,
  activeCategory: PropTypes.string.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
};

export default MenuCategorySlider;
