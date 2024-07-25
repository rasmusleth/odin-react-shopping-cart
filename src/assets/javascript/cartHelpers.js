import { checkDeepEquality } from "./itemModalHelpers";

const checkIdenticalItemInCart = (cartState, newItemObj) => {
  // Check if item already exists in cart
  const similarCartItem = cartState.items.find(
    (item) => item.itemId === newItemObj.itemId
  );

  // If existing, check if they are equal (except quantity and id)
  if (!similarCartItem) return false;

  const { itemId: idExisting, ingredients: ingredientsExisting } =
    similarCartItem;
  const existingItem = {
    itemId: idExisting,
    ingredients: ingredientsExisting,
  };

  const { itemId: idNew, ingredients: ingredientsNew } = newItemObj;
  const newItem = { itemId: idNew, ingredients: ingredientsNew };

  return checkDeepEquality(existingItem, newItem);
};

export { checkIdenticalItemInCart };
