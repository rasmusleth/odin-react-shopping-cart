import { checkDeepEquality } from "../ItemDialog/itemDialogHelpers";

const calculatePriceTotal = (price, quantity, ingredientsExtra) => {
  const itemTotal = ingredientsExtra.reduce((accumulator, ingredient) => {
    return accumulator + ingredient.price;
  }, price);

  const totalPrice = itemTotal * quantity;

  return totalPrice;
};

const formatPrice = (price) => {
  let dkk = new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
  });

  return dkk.format(price);
};

const checkIdenticalItemInCart = (cartState, newItemObj) => {
  // Check if item already exists in cart
  const similarCartItem = cartState.items.find(
    (item) => item.itemId === newItemObj.itemId
  );

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

export { calculatePriceTotal, formatPrice, checkIdenticalItemInCart };
