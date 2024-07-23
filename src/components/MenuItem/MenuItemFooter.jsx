import PropTypes from "prop-types";
import styles from "./menuItem.module.css";
import ItemQuantityButton from "./ItemQuantityButton";

const MenuItemFooter = ({ quantity, priceFormatted, onChange, addToCart }) => {
  return (
    <>
      <div className={styles.menuItemFooterContainer}>
        <div className={styles.menuItemFooter}>
          <ItemQuantityButton quantity={quantity} onChange={onChange} />
          <button
            type="button"
            className={`btnPrimary ${styles.menuItemBuyButton}`}
            onClick={addToCart}
          >
            <p className="textWeightBold">Tilføj til bestilling</p>
            <p className={styles.menuItemPriceTotal}>{priceFormatted}</p>
          </button>
        </div>
      </div>
    </>
  );
};

MenuItemFooter.propTypes = {
  item: PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired,
  priceFormatted: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default MenuItemFooter;
