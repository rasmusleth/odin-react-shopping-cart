import PropTypes from "prop-types";
import styles from "./menuItem.module.css";
import MenuItemFooter from "./MenuItemFooter";
import { useEffect, useReducer, useState } from "react";

const IngredientItem = ({ ingredient, isExtra, onClick, ingredientsState }) => {
  const [ingredientSelected, setIngredientSelected] = useState(false);

  useEffect(() => {
    const isSelected = ingredientsState[isExtra ? "extra" : "existing"].some(
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
        <p
          className={styles.menuItemIngredientPrice}
        >{`+ ${ingredient.price} kr.`}</p>
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

function itemReducer(itemState, action) {
  switch (action.type) {
    case "init_item": {
      return {
        ...itemState,
        price: action.price,
        priceTotal: action.price,
        quantity: action.quantity,
        ingredientsAdded: action.ingredientsAdded,
        ingredientsRemoved: action.ingredientsRemoved,
      };
    }
    case "quantity_increment": {
      return {
        ...itemState,
        quantity: itemState.quantity + 1,
        priceTotal: calculatePriceTotal(
          itemState.price,
          itemState.quantity + 1,
          itemState.ingredientsAdded
        ),
      };
    }
    case "quantity_decrement": {
      return {
        ...itemState,
        quantity: itemState.quantity > 1 ? itemState.quantity - 1 : 1,
        priceTotal: calculatePriceTotal(
          itemState.price,
          itemState.quantity - 1,
          itemState.ingredientsAdded
        ),
      };
    }
    case "quantity_input": {
      return {
        ...itemState,
        quantity: action.quantityInput,
        priceTotal: calculatePriceTotal(
          itemState.price,
          action.quantityInput,
          itemState.ingredientsAdded
        ),
      };
    }
    case "extraIngredient_add": {
      const newIngredientsExtra = [
        ...itemState.ingredientsAdded,
        {
          name: action.ingredientName,
          price: parseFloat(action.ingredientPrice),
        },
      ];

      return {
        ...itemState,
        ingredientsAdded: newIngredientsExtra,
        priceTotal: calculatePriceTotal(
          itemState.price,
          itemState.quantity,
          newIngredientsExtra
        ),
      };
    }
    case "extraIngredient_remove": {
      const newIngredientsExtra = itemState.ingredientsAdded.filter(
        (ingredient) => ingredient.name !== action.ingredientName
      );

      return {
        ...itemState,
        ingredientsAdded: newIngredientsExtra,
        priceTotal: calculatePriceTotal(
          itemState.price,
          itemState.quantity,
          newIngredientsExtra
        ),
      };
    }
    case "existingIngredient_add": {
      return {
        ...itemState,
        ingredientsRemoved: [
          ...itemState.ingredientsRemoved,
          {
            name: action.ingredientName,
          },
        ],
      };
    }
    case "existingIngredient_remove": {
      return {
        ...itemState,
        ingredientsRemoved: itemState.ingredientsRemoved.filter(
          (ingredient) => ingredient.name !== action.ingredientName
        ),
      };
    }
    default: {
      throw Error("Unknown action: ", action.type);
    }
  }
}

const initialItemState = {
  quantity: 1,
  ingredientsAdded: [],
  ingredientsRemoved: [],
  price: 0,
  priceTotal: 0,
};

const MenuItem = ({ item, onClose, modalIsOpen }) => {
  const [itemState, dispatch] = useReducer(itemReducer, initialItemState);

  const quantity = itemState.quantity;
  const price = itemState.priceTotal;
  const ingredients = {
    extra: itemState.ingredientsAdded,
    existing: itemState.ingredientsRemoved,
  };

  // Reset quantity, price, & ingredients on modal close
  useEffect(() => {
    if (modalIsOpen) {
      dispatch({
        type: "init_item",
        price: item.price,
        quantity: 1,
        ingredientsAdded: [],
        ingredientsRemoved: [],
      });
    }
  }, [modalIsOpen, item]);

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
            src={item.image} // "/images/menu-categories/luksus-smoerrebroed-cover.jpeg"
            alt="Dish Image"
          />
          <div className={styles.menuItemContentWrapper}>
            <span className={styles.menuItemCategory}>{item.category}</span>
            <h2 className={`heading-style-h4`}>{item.title}</h2>
            <p className={styles.menuItemPrice}>{item.price} kr.</p>
            <p className={styles.menuItemDescription}>{item.description}</p>
            <div className={styles.spacerSmall}></div>

            <h3 className="heading-style-h6">Tilføj ingredienser</h3>
            <div className={styles.menuItemIngredientContainer}>
              {item.extraIngredients.length > 0 &&
                item.extraIngredients.map((ingredient) => {
                  return (
                    <IngredientItem
                      key={ingredient.name}
                      ingredient={ingredient}
                      isExtra={true}
                      onClick={
                        itemState.ingredientsAdded.some(
                          (value) => value.name === ingredient.name
                        )
                          ? handleIngredientsExtraRemove
                          : handleIngredientsExtraAdd
                      }
                      ingredientsState={ingredients}
                    />
                  );
                })}
            </div>
            <div className={styles.spacerSmall}></div>

            <h3 className="heading-style-h6">Fjern ingredienser</h3>
            <div className={styles.menuItemIngredientContainer}>
              {item.ingredients.length > 0 &&
                item.ingredients.map((ingredient) => {
                  return (
                    <IngredientItem
                      key={ingredient.name}
                      ingredient={ingredient}
                      isExtra={false}
                      onClick={
                        itemState.ingredientsRemoved.some(
                          (value) => value.name === ingredient.name
                        )
                          ? handleIngredientsExistingRemove
                          : handleIngredientsExistingAdd
                      }
                      ingredientsState={ingredients}
                    />
                  );
                })}
            </div>
          </div>
          <MenuItemFooter
            item={item}
            quantity={quantity}
            price={price}
            onChange={handleQuantityChange}
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
};

export default MenuItem;

const calculatePriceTotal = (price, quantity, ingredientsExtra) => {
  const itemTotal = ingredientsExtra.reduce((accumulator, ingredient) => {
    return accumulator + ingredient.price;
  }, price);

  return itemTotal * quantity;
};
