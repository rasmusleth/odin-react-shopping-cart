import PropTypes from "prop-types";
import styles from "./itemDialog.module.css";
import { useEffect } from "react";

const ItemQuantityButton = ({
  item,
  onChange,
  version,
  isClicked,
  onClick,
  setIsClicked,
}) => {
  useEffect(() => {
    if (isClicked) {
      setTimeout(() => {
        setIsClicked(false);
      }, 2000);
    }
  }, [isClicked, setIsClicked]);

  return (
    <>
      {version && isClicked ? (
        <div
          className={`${styles.menuItemQuantityButton} ${styles.cartQuantityButtonClicked}`}
          id="cartItemQuantity"
          onClick={onClick}
        >
          {isClicked && (
            <button
              className={styles.quantityDecrease}
              type="button"
              onClick={(e) => {
                onChange(e, "decrease", item);
                onClick();
              }}
            >
              -
            </button>
          )}
          <p className={styles.quantityValue}>{item.quantity}</p>
          {isClicked && (
            <button
              className={styles.quantityIncrease}
              type="button"
              onClick={(e) => {
                onChange(e, "increase", item);
                onClick();
              }}
            >
              +
            </button>
          )}
        </div>
      ) : version ? (
        <div
          className={`${styles.menuItemQuantityButton} ${styles.cartQuantityButton}`}
          id="cartItemQuantity"
          onClick={onClick}
        >
          {isClicked && (
            <button
              className={styles.quantityDecrease}
              type="button"
              onClick={(e) => {
                onChange(e, "decrease", item);
                onClick();
              }}
            >
              -
            </button>
          )}
          <p className={styles.quantityValue}>{item.quantity}</p>
          {isClicked && (
            <button
              className={styles.quantityIncrease}
              type="button"
              onClick={(e) => {
                onChange(e, "increase", item);
                onClick();
              }}
            >
              +
            </button>
          )}
        </div>
      ) : (
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
      )}
    </>
  );
};

ItemQuantityButton.propTypes = {
  item: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  version: PropTypes.string,
  isClicked: PropTypes.bool,
  onClick: PropTypes.func,
  setIsClicked: PropTypes.func,
};

export default ItemQuantityButton;
