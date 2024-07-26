import PropTypes from "prop-types";
import styles from "./menuItem.module.css";
import ItemQuantityButton from "./ItemQuantityButton";

const MenuItemFooter = ({
  item,
  onChange,
  addToCart,
  editCartItem,
  removeFromCart,
  action,
  isItemChanged,
}) => {
  return (
    <>
      <div className={styles.menuItemFooterContainer}>
        <div className={styles.menuItemFooter}>
          <ItemQuantityButton item={item} onChange={onChange} />
          {action === "edit" && !isItemChanged ? (
            <button
              type="button"
              className={`btnDanger ${styles.menuItemBuyButton}`}
              onClick={removeFromCart}
            >
              <p className={`textWeightBold`}>Fjern</p>
              <p className={styles.menuItemPriceTotal}>{item.priceFormatted}</p>
            </button>
          ) : action === "edit" ? (
            <button
              type="button"
              className={`btnPrimary ${styles.menuItemBuyButton}`}
              onClick={editCartItem}
            >
              <p className="textWeightBold">Opdater bestillingen</p>
              <p className={styles.menuItemPriceTotal}>{item.priceFormatted}</p>
            </button>
          ) : (
            <button
              type="button"
              className={`btnPrimary ${styles.menuItemBuyButton}`}
              onClick={addToCart}
            >
              <span className="textWeightBold">Tilføj til bestilling</span>
              <p className={styles.menuItemPriceTotal}>{item.priceFormatted}</p>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

MenuItemFooter.propTypes = {
  item: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  editCartItem: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  action: PropTypes.string,
  isItemChanged: PropTypes.bool.isRequired,
};

export default MenuItemFooter;
