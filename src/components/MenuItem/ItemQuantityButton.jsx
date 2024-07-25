import PropTypes from "prop-types";
import styles from "./menuItem.module.css";

const ItemQuantityButton = ({ item, onChange }) => {
  return (
    <div className={styles.menuItemQuantityButton} id="cartItemQuantity">
      <button
        className={styles.quantityDecrease}
        type="button"
        onClick={(e) => {
          onChange(e, "decrease", item);
        }}
      >
        -
      </button>
      <input
        className={styles.quantityValue}
        type="number"
        name="itemQuantity"
        value={item.quantity}
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
        +
      </button>
    </div>
  );
};

ItemQuantityButton.propTypes = {
  item: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export default ItemQuantityButton;
