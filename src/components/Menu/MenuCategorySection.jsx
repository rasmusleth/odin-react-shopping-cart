import { forwardRef } from "react";
import PropTypes from "prop-types";
import styles from "./menu.module.css";
import { formatPrice } from "../../assets/javascript/calculationHelper";

const MenuItem = ({ item, cart, onItemClick }) => {
  const isInCart = cart.items.some((cartItem) => cartItem.id === item["id"]);

  return (
    <>
      <a
        className={`${
          isInCart ? styles.menuItemWrapperAdded : styles.menuItemWrapper
        }`}
        onClick={(e) => onItemClick(item, e)}
      >
        <div className={styles.menuItemContent}>
          <h3 className={`${styles.menuItemTitle} textStyle2Lines`}>
            {item.title}
          </h3>
          <p className={`${styles.menuItemDescription} textStyle2Lines`}>
            {item.description}
          </p>
          <p className={styles.menuItemPrice}>{formatPrice(item.price)}</p>
        </div>
        <img
          className={styles.menuItemImage}
          src={item.image} // "/images/menu-items/smoerrebroed-aeg.jpeg"
          alt={item.title}
        />
        {isInCart && (
          <div className={styles.menuItemAddedQuantity}>
            {cart.items
              .filter((cartItem) => cartItem.id === item.id)
              .reduce((acc, item) => acc + item.quantity, 0)}
          </div>
        )}
      </a>
      <hr />
    </>
  );
};

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

const MenuCategorySection = forwardRef(
  ({ category, cart, onItemClick }, ref) => {
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
                cart={cart}
              />
            ))}
          </div>
        </section>
        <div className={`spacerMedium`}></div>
      </>
    );
  }
);

MenuCategorySection.displayName = "MenuCategorySection";

MenuCategorySection.propTypes = {
  category: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default MenuCategorySection;
