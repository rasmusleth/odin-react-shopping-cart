import PropTypes from "prop-types";
import styles from "./menuItem.module.css";
import MenuItemFooter from "./MenuItemFooter";
import { useEffect, useReducer, useState } from "react";
import {
  calculatePriceTotal,
  formatPrice,
} from "../../assets/javascript/calculationHelper";
import {
  itemReducer,
  initialItemState,
} from "../../assets/javascript/itemReducer";
import { checkDeepEquality } from "../../assets/javascript/itemModalHelpers";

const IngredientItem = ({ ingredient, isExtra, onClick, ingredientsState }) => {
  const [ingredientSelected, setIngredientSelected] = useState(false);

  useEffect(() => {
    const isSelected = ingredientsState[isExtra ? "added" : "removed"].some(
      (ing) => ing.name === ingredient.name
    );

    setIngredientSelected(isSelected);
  }, [ingredientsState, ingredient, isExtra]);

  return (
    <div
      className={styles.menuItemIngredientWrapper}
      onClick={onClick}
      data-ingredient-name={ingredient.name}
      data-ingredient-type={isExtra ? "extra" : "existing"}
      data-ingredient-price={ingredient.price}
      data-ingredient-method={ingredientSelected ? "delete" : "post"}
    >
      <span>
        <span className={""}></span>
        <span
          className={
            ingredientSelected ? styles.checkMarkChecked : styles.checkMark
          }
        ></span>
        <p>{ingredient.name}</p>
      </span>
      {isExtra && (
        <p className={styles.menuItemIngredientPrice}>
          + {formatPrice(ingredient.price)}
        </p>
      )}
    </div>
  );
};

IngredientItem.propTypes = {
  ingredient: PropTypes.object.isRequired,
  isExtra: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  ingredientsState: PropTypes.object,
};

const MenuItem = ({ item, onClose, cartDispatch, action, modalIsOpen }) => {
  console.log("action: ", action);
  const [isItemChanged, setIsItemChanged] = useState(false);

  const [itemState, dispatch] = useReducer(
    itemReducer,
    action === "edit" ? item : initialItemState
  );

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

  // INIT itemState ON modalOpen
  useEffect(() => {
    if (item) {
      if (modalIsOpen)
        if (action !== "edit") {
          dispatch({
            type: "init_item",
            item: item,
          });
        }
    }
  }, [item, action, modalIsOpen]);

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
        return dispatch({ type: "quantity_increment" });
      }
      case "decrease": {
        if (item.quantity === 1) return;
        return dispatch({ type: "quantity_decrement" });
      }
      default: {
        const inputNumber = parseInt(e.target.value, 10);
        if (isNaN(inputNumber) || inputNumber < 1 || inputNumber > 999) return;
        return dispatch({
          type: "quantity_input",
          quantityInput: parseInt(e.target.value, 10),
        });
      }
    }
  };

  const handleIngredientsExtraAdd = (e) => {
    dispatch({
      type: "extraIngredient_add",
      ingredientName: e.currentTarget.dataset.ingredientName,
      ingredientPrice: e.currentTarget.dataset.ingredientPrice,
    });
  };

  const handleIngredientsExtraRemove = (e) => {
    dispatch({
      type: "extraIngredient_remove",
      ingredientName: e.currentTarget.dataset.ingredientName,
    });
  };

  const handleIngredientsExistingAdd = (e) => {
    dispatch({
      type: "existingIngredient_add",
      ingredientName: e.currentTarget.dataset.ingredientName,
    });
  };

  const handleIngredientsExistingRemove = (e) => {
    dispatch({
      type: "existingIngredient_remove",
      ingredientName: e.currentTarget.dataset.ingredientName,
    });
  };

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
            src={itemState.image} // "/images/menu-categories/luksus-smoerrebroed-cover.jpeg"
            alt="Dish Image"
          />
          <div className={styles.menuItemContentWrapper}>
            <span className={styles.menuItemCategory}>
              {itemState.category}
            </span>
            <h2 className={`heading-style-h4`}>{itemState.title}</h2>
            <p className={styles.menuItemPrice}>
              {formatPrice(itemState.price)}
            </p>
            <p className={styles.menuItemDescription}>
              {itemState.description}
            </p>
            <div className={styles.spacerSmall}></div>

            <h3 className="heading-style-h6">Tilføj ingredienser</h3>
            <div className={styles.menuItemIngredientContainer}>
              {itemState.allIngredients.extra.length > 0 &&
                itemState.allIngredients.extra.map((ingredient) => {
                  return (
                    <IngredientItem
                      key={ingredient.name}
                      ingredient={ingredient}
                      isExtra={true}
                      onClick={
                        itemState.ingredients.added.some(
                          (value) => value.name === ingredient.name
                        )
                          ? handleIngredientsExtraRemove
                          : handleIngredientsExtraAdd
                      }
                      ingredientsState={itemState.ingredients}
                    />
                  );
                })}
            </div>
            <div className={styles.spacerSmall}></div>

            <h3 className="heading-style-h6">Fjern ingredienser</h3>
            <div className={styles.menuItemIngredientContainer}>
              {itemState.allIngredients.existing.length > 0 &&
                itemState.allIngredients.existing.map((ingredient) => {
                  return (
                    <IngredientItem
                      key={ingredient.name}
                      ingredient={ingredient}
                      isExtra={false}
                      onClick={
                        itemState.ingredients.removed.some(
                          (value) => value.name === ingredient.name
                        )
                          ? handleIngredientsExistingRemove
                          : handleIngredientsExistingAdd
                      }
                      ingredientsState={itemState.ingredients}
                    />
                  );
                })}
            </div>
            <div className="spacerMedium"></div>
            <div className="spacerXSmall"></div>
          </div>
          <MenuItemFooter
            item={{
              ...itemState,
              priceFormatted: formatPrice(itemState.priceTotal),
            }}
            onChange={handleQuantityChange}
            addToCart={handleAddToCart}
            editCartItem={handleEditCartItem}
            removeFromCart={handleRemoveFromCart}
            action={action}
            isItemChanged={isItemChanged}
          />
        </div>
      )}
    </>
  );
};

MenuItem.propTypes = {
  item: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  cartDispatch: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
};

export default MenuItem;
