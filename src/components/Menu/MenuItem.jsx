import PropTypes from "prop-types";
import styles from "./menuItem.module.css";

const MenuItem = ({ item, onClose }) => {
  return (
    <>
      {item && (
        <div className={styles.menuItemContainer}>
          <div className={styles.menuItemHeader}>
            <button
              onClick={onClose}
              type="button"
              className={styles.menuItemCloseButton}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1rem"
                height="1rem"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
              </svg>
            </button>
          </div>
          <img
            className={styles.menuItemCoverImage}
            src={item.image} // "/images/menu-categories/luksus-smoerrebroed-cover.jpeg"
            alt="Dish Image"
          />
          <div className={styles.menuItemContentWrapper}>
            <span className={styles.menuItemCategory}>{item.category}</span>
            <h1 className={styles.menuItemName}>{item.title}</h1>
            <p className={styles.menuItemPrice}>{item.priceFormatted}</p>
            <p className={styles.menuItemDescription}>{item.description}</p>
            <form
              className={styles.menuItemForm}
              action="/cart/add-to-cart"
              method="post"
            >
              {/* Hidden Form values */}
              <input type="hidden" name="itemPrice" value={item.price} />
              <input type="hidden" name="itemName" value={item.title} />
              <input type="hidden" name="itemId" value={item.id} />
              {/* END */}
              <div className={styles.spacerSmall}></div>

              <h3>Tilføj ingredienser</h3>
              <div className={styles.spacerSmall}></div>

              <div
                className={(styles.menuItemIngredientContainer, styles.extra)}
              ></div>
              <div className={styles.spacerMedium}></div>

              <h3>Fjern ingredienser</h3>
              <div className={styles.spacerSmall}></div>

              <div
                className={(styles.menuItemIngredientContainer, styles.remove)}
              ></div>
              <div className={styles.spacerMedium}></div>

              <div className={styles.menuItemFooter}>
                <div className={styles.menuItemQuantityButton}>
                  <button className={styles.quantityDecrease} type="button">
                    -
                  </button>
                  <input
                    className={styles.quantityValue}
                    type="number"
                    name="itemQuantity"
                    defaultValue="1"
                    min="1"
                  />
                  <button className={styles.quantityIncrease} type="button">
                    +
                  </button>
                </div>
                <button
                  type="dialog"
                  className={(styles.menuItemBuyButton, styles.buttonPrimary)}
                >
                  <p>
                    <strong>Tilføj til bestilling</strong>
                  </p>
                  <p className={styles.menuItemPriceTotal}>
                    menu_item.priceTotal
                  </p>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

MenuItem.propTypes = {
  item: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default MenuItem;
