import { useState, useEffect } from "react";
import { checkDeepEquality } from "./itemDialogHelpers";
import { calculatePriceTotal } from "../Cart/cartHelpers";
import PropTypes from "prop-types";
import styles from "./itemDialog.module.css";
import ItemQuantityButton from "./ItemQuantityButton";
import { useCartDispatch } from "../Cart/CartContext";

const ItemDialogFooter = ({
  item,
  itemState,
  itemDispatch,
  action,
  onClose,
}) => {
  const [isItemChanged, setIsItemChanged] = useState(false);

  const cartDispatch = useCartDispatch();

  // In edit mode, check IF updated item is !== from original on every update
  useEffect(() => {
    // ONLY check in edit mode
    if (action !== "edit") return;

    if (checkDeepEquality(item, itemState)) {
      setIsItemChanged(false);
    } else {
      setIsItemChanged(true);
    }
  }, [itemState, item, action]);

  const handleAddToCart = () => {
    const itemTotal = calculatePriceTotal(
      itemState.price,
      itemState.quantity,
      itemState.ingredients.added
    );

    cartDispatch({
      type: "add_to_cart",
      item: {
        ...itemState,
        id: Date.now().toString(36) + Math.random().toString(36).substring(2),
        priceTotal: itemTotal,
        customItemPrice: itemTotal / itemState.quantity,
      },
    });

    onClose();
  };

  const handleEditCartItem = () => {
    cartDispatch({
      type: "edit_cart_item",
      newItem: itemState,
    });

    onClose();
  };

  const handleRemoveFromCart = () => {
    cartDispatch({
      type: "remove_from_cart",
      item: itemState,
    });

    onClose();
  };

  const handleQuantityChange = (e, method, item) => {
    switch (method) {
      case "increase": {
        if (item.quantity === 999) return;
        return itemDispatch({ type: "quantity_increment" });
      }
      case "decrease": {
        if (item.quantity === 1) return;
        return itemDispatch({ type: "quantity_decrement" });
      }
      default: {
        const inputNumber = parseInt(e.target.value, 10);
        if (isNaN(inputNumber) || inputNumber < 1 || inputNumber > 999) return;
        return itemDispatch({
          type: "quantity_input",
          quantityInput: parseInt(e.target.value, 10),
        });
      }
    }
  };

  return (
    <>
      <div className={styles.menuItemFooterContainer}>
        <div className={styles.menuItemFooter}>
          <ItemQuantityButton item={item} onChange={handleQuantityChange} />
          {action === "edit" && !isItemChanged ? (
            <button
              type="button"
              className={`btnDanger ${styles.menuItemBuyButton}`}
              onClick={handleRemoveFromCart}
            >
              <p className={`textWeightBold`}>Fjern</p>
              <p className={styles.menuItemPriceTotal}>{item.priceFormatted}</p>
            </button>
          ) : action === "edit" ? (
            <button
              type="button"
              className={`btnPrimary ${styles.menuItemBuyButton}`}
              onClick={handleEditCartItem}
            >
              <p className="textWeightBold">Opdater bestillingen</p>
              <p className={styles.menuItemPriceTotal}>{item.priceFormatted}</p>
            </button>
          ) : (
            <button
              type="button"
              className={`btnPrimary ${styles.menuItemBuyButton}`}
              onClick={handleAddToCart}
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

ItemDialogFooter.propTypes = {
  item: PropTypes.object.isRequired,
  itemState: PropTypes.object.isRequired,
  itemDispatch: PropTypes.func.isRequired,
  action: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default ItemDialogFooter;
