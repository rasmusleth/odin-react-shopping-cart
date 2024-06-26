import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./menu.module.css";

const MenuItem = ({ item }) => {
  const itemsInCart = { 0: 5, 3: 2 };

  return (
    <>
      {item.id.toString() in itemsInCart ? (
        <a href="" className={(styles.menuItemWrapper, styles.added)}>
          <div className={styles.menuItemContent}>
            <h3>{item.name}</h3>
            <p className={styles.textStyle2Lines}>{item.description}</p>
            <p className={styles.textColorPrimary}>{item.priceFormatted}</p>
          </div>
          <img
            className={styles.menuItemImage}
            src="/images/menu-items/smoerrebroed-aeg.jpeg"
            alt={item.name}
          />
          <div className={styles.menuItemAddedQuantity}>
            {itemsInCart[item.id]}
          </div>
        </a>
      ) : (
        <a href="" className={styles.menuItemWrapper}>
          <div className={styles.menuItemContent}>
            <h3>{item.name}</h3>
            <p className={styles.textStyle2Lines}>{item.description}</p>
            <p className={styles.textColorPrimary}>{item.priceFormatted}</p>
          </div>
          <img
            className={styles.menuItemImage}
            src="/images/menu-items/smoerrebroed-aeg.jpeg"
            alt={item.name}
          />
        </a>
      )}
      <hr />
    </>
  );
};

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
};

const CategorySection = ({ category }) => {
  console.log(category);
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
            <MenuItem key={`categoryItem-${item.id}`} item={item} />
          ))}
        </div>
      </section>
      <div className={styles.spacerMedium}></div>
    </>
  );
};

CategorySection.propTypes = {
  category: PropTypes.object.isRequired,
};

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

const Menu = ({ categories }) => {
  return (
    <>
      <h1>Menu</h1>
      <p>Browse our collection of delicious meals</p>
      <br />
      <br />
      <div className={styles.menuPageWrapper}>
        {/* <div class="spacer-small"></div> */}
        <div className={styles.menuCategoriesSlider}>
          {categories.map((category) => (
            <MenuCategorySliderItem
              key={`slider-${category.id}`}
              category={category}
            />
          ))}
        </div>
        <div className={styles.spacerSmall}></div>

        {categories.map((category) => (
          <CategorySection key={`section-${category.id}`} category={category} />
        ))}
      </div>

      <div className="dynamic-height-element"></div>

      <dialog className={styles.itemDialog}>
        {/* <%- include("menu_item", {menu_item: null}) %> */}
      </dialog>
    </>
  );
};

Menu.propTypes = {
  categories: PropTypes.array,
};

export default Menu;
