import { calculatePriceTotal } from "./calculationHelper";

const initialItemState = {
  quantity: 1,
  ingredients: {
    added: [],
    removed: [],
  },
  price: 0,
  priceTotal: 0,
};

function itemReducer(itemState, action) {
  switch (action.type) {
    case "init_item": {
      return {
        ...itemState,
        price: action.price,
        priceTotal: action.price,
        quantity: action.quantity,
        ingredients: action.ingredients,
      };
    }
    case "quantity_increment": {
      return {
        ...itemState,
        quantity: itemState.quantity + 1,
        priceTotal: calculatePriceTotal(
          itemState.price,
          itemState.quantity + 1,
          itemState.ingredients.added
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
          itemState.ingredients.added
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
          itemState.ingredients.added
        ),
      };
    }
    case "extraIngredient_add": {
      const newIngredientsExtra = [
        ...itemState.ingredients.added,
        {
          name: action.ingredientName,
          price: parseFloat(action.ingredientPrice),
        },
      ];

      return {
        ...itemState,
        ingredients: {
          ...itemState.ingredients,
          added: newIngredientsExtra,
        },
        priceTotal: calculatePriceTotal(
          itemState.price,
          itemState.quantity,
          newIngredientsExtra
        ),
      };
    }
    case "extraIngredient_remove": {
      const newIngredientsExtra = itemState.ingredients.added.filter(
        (ingredient) => ingredient.name !== action.ingredientName
      );

      return {
        ...itemState,
        ingredients: {
          ...itemState.ingredients,
          added: newIngredientsExtra,
        },
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
        ingredients: {
          ...itemState.ingredients,
          removed: [
            ...itemState.ingredients.removed,
            {
              name: action.ingredientName,
            },
          ],
        },
      };
    }
    case "existingIngredient_remove": {
      return {
        ...itemState,
        ingredients: {
          ...itemState.ingredients,
          removed: itemState.ingredients.removed.filter(
            (ingredient) => ingredient.name !== action.ingredientName
          ),
        },
      };
    }
    default: {
      throw Error("Unknown action: ", action.type);
    }
  }
}

export { itemReducer, initialItemState };
