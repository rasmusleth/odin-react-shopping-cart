import { calculatePriceTotal } from "../Cart/cartHelpers";

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

function itemReducer(itemState, action) {
  switch (action.type) {
    case "init_item": {
      return {
        ...itemState,
        quantity: 1,
        ingredients: {
          added: [],
          removed: [],
        },
        price: action.item.price,
        priceTotal: action.item.price,
        customItemPrice: action.item.price,
        allIngredients: action.item.allIngredients,
        itemId: action.item.id,
        title: action.item.title,
        description: action.item.description,
        category: action.item.category,
        image: action.item.image,
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
        quantity: itemState.quantity - 1,
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
        customItemPrice: calculatePriceTotal(
          itemState.price,
          1,
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
        customItemPrice: calculatePriceTotal(
          itemState.price,
          1,
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
