import PropTypes from "prop-types";
import styles from "./menuItem.module.css";

const QuantityButton = ({ quantity, onChange }) => {
  return (
    <div className={styles.menuItemQuantityButton}>
      <button
        className={styles.quantityDecrease}
        type="button"
        onClick={(e) => {
          onChange(e, "decrease");
        }}
      >
        {/* <span>-</span> */}-
      </button>
      <input
        className={styles.quantityValue}
        type="number"
        name="itemQuantity"
        value={quantity}
        onChange={onChange}
        min="1"
        max="999"
      />
      <button
        className={styles.quantityIncrease}
        type="button"
        onClick={(e) => {
          onChange(e, "increase");
        }}
      >
        {/* <span>+</span> */}+
      </button>
    </div>
  );
};

QuantityButton.propTypes = {
  quantity: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

const MenuItemFooter = ({ quantity, priceFormatted, onChange, addToCart }) => {
  return (
    <>
      <div className={styles.menuItemFooterContainer}>
        <div className={styles.menuItemFooter}>
          <QuantityButton quantity={quantity} onChange={onChange} />
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
