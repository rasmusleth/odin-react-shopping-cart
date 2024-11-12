import styles from './menu.module.css';
import { useMenu } from '../../contexts/MenuContext';
import { useState } from 'react';

const CategorySlider = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const { categories } = useMenu();

  const handleCategoryClick = (categoryId) => {
    return () => setActiveCategory(categoryId);
  };

  return (
    <div className={styles.menuCategoriesSlider}>
      {categories.map((category) => (
        <a
          key={category._id}
          href={`#${category.title}`}
          className={`${category._id === activeCategory ? styles.selected : ''} ${styles.menuCategoriesSliderItem}`}
          onClick={handleCategoryClick(category._id)}>
          {category.title}
        </a>
      ))}
    </div>
  );
};

export default CategorySlider;
