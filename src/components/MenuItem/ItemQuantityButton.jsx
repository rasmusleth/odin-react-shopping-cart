import PropTypes from "prop-types";
import styles from "./menuItem.module.css";

const ItemQuantityButton = ({ item, quantity, onChange }) => {
  return (
    <div className={styles.menuItemQuantityButton} id="cartItemQuantity">
      <button
        className={styles.quantityDecrease}
        type="button"
        onClick={(e) => {
          if (item) {
            onChange(e, "decrease", item);
          } else {
            onChange(e, "decrease");
          }
        }}
      >
        {/* <span>-</span> */}-
      </button>
      <input
        className={styles.quantityValue}
        type="number"
        name="itemQuantity"
        value={quantity}
        onChange={(e) => {
          onChange(e, "input", item);
        }}
        min="1"
        max="999"
      />
      <button
        className={styles.quantityIncrease}
        type="button"
        onClick={(e) => {
          onChange(e, "increase", item);
        }}
      >
        {/* <span>+</span> */}+
      </button>
    </div>
  );
};

ItemQuantityButton.propTypes = {
  item: PropTypes.object,
  quantity: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ItemQuantityButton;
