import { forwardRef } from "react";
import PropTypes from "prop-types";
import styles from "./menu.module.css";

const MenuItem = ({ item, onItemClick }) => {
  const itemsInCart = { 2: 5, 10: 2 };

  return (
    <>
      <a
        className={`${
          item["id"] in itemsInCart
            ? styles.menuItemWrapperAdded
            : styles.menuItemWrapper
        }`}
        onClick={(e) => onItemClick(item, e)}
      >
        <div className={styles.menuItemContent}>
          <h3 className={`${styles.menuItemTitle} textStyle2Lines`}>
            {item.title}
          </h3>
          <p className={`textStyle2Lines`}>{item.description}</p>
          <p className={styles.menuItemPrice}>{item.priceFormatted}</p>
        </div>
        <img
          className={styles.menuItemImage}
          src={item.image} // "/images/menu-items/smoerrebroed-aeg.jpeg"
          alt={item.title}
        />
        {item["id"] in itemsInCart && (
          <div className={styles.menuItemAddedQuantity}>
            {itemsInCart[item.id]}
          </div>
        )}
      </a>
      <hr />
    </>
  );
};

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

const MenuCategorySection = forwardRef(({ category, onItemClick }, ref) => {
  return (
    <>
      <section
        className={styles.menuCategorySection}
        id={category.slug.slice(1)}
        ref={ref}
        data-category-id={category.id}
      >
        <div className={styles.menuCategoryTitleContainer}>
          <a
            href={`#${category.slug.slice(1)}`}
            className={styles.menuCategoryTitleWrapper}
          >
            <img
              className={styles.menuCategoryTitleImage}
              src="/images/menu-items/smoerrebroed-aeg.jpeg"
              alt=""
            />
            <h2 className={styles.menuCategoryTitle}>{category.title}</h2>
          </a>
        </div>
        <div className={styles.menuItemList}>
          {category.items.map((item) => (
            <MenuItem
              onItemClick={onItemClick}
              key={`categoryItem-${item.id}`}
              item={item}
            />
          ))}
        </div>
      </section>
      <div className={`spacerMedium`}></div>
    </>
  );
});

MenuCategorySection.displayName = "MenuCategorySection";

MenuCategorySection.propTypes = {
  category: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default MenuCategorySection;
