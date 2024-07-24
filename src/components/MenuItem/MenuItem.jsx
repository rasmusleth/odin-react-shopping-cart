import PropTypes from "prop-types";
import styles from "./menuItem.module.css";
import MenuItemFooter from "./MenuItemFooter";
import { useEffect, useReducer, useState } from "react";
import {
  calculatePriceTotal,
  formatPrice,
} from "../../assets/javascript/calculationHelper";
import { itemReducer } from "../../assets/javascript/itemReducer";

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

const MenuItem = ({ item, onClose, modalIsOpen, cartDispatch, action }) => {
  const initialItemState = {
    quantity: 1,
    ingredients: {
      added: [],
      removed: [],
    },
    price: 0,
    priceTotal: 0,
    customItemPrice: 0,
    allIngredients: {
      extra: [],
      existing: [],
    },
  };

  const [isItemChanged, setIsItemChanged] = useState(false);

  const [itemState, dispatch] = useReducer(
    itemReducer,
    action === "edit" ? item : initialItemState
  );

  console.log("item: ", item);
  console.log("itemState: ", itemState);
  // Check if updated item is different from original on every update
  useEffect(() => {
    // ONLY check in edit mode
    if (action !== "edit") return;

    if (checkDeepEquality(item, itemState)) {
      setIsItemChanged(false);
    } else {
      setIsItemChanged(true);
    }
  }, [itemState, item, action]);

  // const quantity = itemState.quantity;
  // const priceFormatted = formatPrice(itemState.priceTotal);
  // const ingredients = itemState.ingredients;

  // init itemState ON modalOpen
  useEffect(() => {
    if (modalIsOpen) {
      if (action !== "edit") {
        dispatch({
          type: "init_item",
          item: item,
        });
      }
    }
  }, [modalIsOpen, item, action]);

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

  const handleQuantityChange = (e, method = "typed") => {
    switch (method) {
      case "increase": {
        return dispatch({ type: "quantity_increment" });
      }
      case "decrease": {
        return dispatch({ type: "quantity_decrement" });
      }
      default: {
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
  modalIsOpen: PropTypes.bool.isRequired,
  cartDispatch: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
};

export default MenuItem;

function checkDeepEquality(obj1, obj2) {
  if (obj1 === obj2) return true;

  // Check that both are objects and not null
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  )
    return false;

  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);

  // Check for equal number of properties
  if (keys1.length !== keys2.length) return false;

  // Check if properties are equal and then if corresponding values are equal
  for (let key of keys1) {
    if (!keys2.includes(key) || !checkDeepEquality(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}
