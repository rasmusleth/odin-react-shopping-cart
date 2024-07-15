import PropTypes from "prop-types";
import styles from "./menu.module.css";

const MenuItem = ({ item, onItemClick }) => {
  const itemsInCart = { 1001: 5, 5000: 2 };

  return (
    <>
      <a
        className={`${
          item["_id"] in itemsInCart
            ? styles.menuItemWrapperAdded
            : styles.menuItemWrapper
        }`}
        onClick={(e) => onItemClick(item, e)}
      >
        <div className={styles.menuItemContent}>
          <h3 className={styles.menuItemTitle}>{item.name}</h3>
          <p className={`textStyle2Lines`}>{item.description}</p>
          <p className={styles.menuItemPrice}>{item.priceFormatted}</p>
        </div>
        <img
          className={styles.menuItemImage}
          src="/images/menu-items/smoerrebroed-aeg.jpeg"
          alt={item.name}
        />
        {item["_id"] in itemsInCart && (
          <div className={styles.menuItemAddedQuantity}>
            {itemsInCart[item._id]}
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

const MenuCategorySection = ({ category, onItemClick }) => {
  return (
    <>
      <section
        className={styles.menuCategorySection}
        id={category.slug.slice(1)}
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
              key={`categoryItem-${item._id}`}
              item={item}
            />
          ))}
        </div>
      </section>
      <div className={`spacerMedium`}></div>
    </>
  );
};

MenuCategorySection.propTypes = {
  category: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default MenuCategorySection;
