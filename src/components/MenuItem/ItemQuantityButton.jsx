import PropTypes from "prop-types";
import styles from "./menuItem.module.css";
import { useEffect, useState } from "react";

const ItemQuantityButton = ({ item, onChange, version, onClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleQuantityButtonClick = () => {
    setIsClicked(true);
  };

  useEffect(() => {
    if (isClicked) {
      setTimeout(() => {
        setIsClicked(false);
      }, 2000);
    }
  }, [isClicked]);

  return (
    <>
      {version ? (
        <div
          className={styles.menuItemQuantityButton}
          id="cartItemQuantity"
          onClick={handleQuantityButtonClick}
        >
          {isClicked && (
            <button
              className={styles.quantityDecrease}
              type="button"
              onClick={(e) => {
                onChange(e, "decrease", item);
                handleQuantityButtonClick();
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
                handleQuantityButtonClick();
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
  onClick: PropTypes.func,
};

export default ItemQuantityButton;
