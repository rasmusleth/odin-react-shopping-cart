import PropTypes from "prop-types";
import styles from "./itemDialog.module.css";
import { useEffect, useState } from "react";
import { handleContentScroll } from "./itemDialogHelpers";
import { formatPrice } from "../Cart/cartHelpers";

const ItemDialogBody = ({ item, itemState, itemDispatch, headerRef }) => {
  const handleIngredientsExtraAdd = (e) => {
    itemDispatch({
      type: "extraIngredient_add",
      ingredientName: e.currentTarget.dataset.ingredientName,
      ingredientPrice: e.currentTarget.dataset.ingredientPrice,
    });
  };

  const handleIngredientsExtraRemove = (e) => {
    itemDispatch({
      type: "extraIngredient_remove",
      ingredientName: e.currentTarget.dataset.ingredientName,
    });
  };

  const handleIngredientsExistingAdd = (e) => {
    itemDispatch({
      type: "existingIngredient_add",
      ingredientName: e.currentTarget.dataset.ingredientName,
    });
  };

  const handleIngredientsExistingRemove = (e) => {
    itemDispatch({
      type: "existingIngredient_remove",
      ingredientName: e.currentTarget.dataset.ingredientName,
    });
  };

  return (
    <>
      {item && (
        <div
          className={styles.menuItemContentWrapper}
          onScroll={(e) => handleContentScroll(e, headerRef)}
        >
          <span className={styles.menuItemCategory}>{itemState.category}</span>
          <h2 className={`heading-style-h4`}>{itemState.title}</h2>
          <p className={styles.menuItemPrice}>{formatPrice(itemState.price)}</p>
          <p className={styles.menuItemDescription}>{itemState.description}</p>
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
      )}
    </>
  );
};

ItemDialogBody.propTypes = {
  item: PropTypes.object.isRequired,
  itemState: PropTypes.object.isRequired,
  itemDispatch: PropTypes.func.isRequired,
  headerRef: PropTypes.object.isRequired,
};

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

export default ItemDialogBody;
