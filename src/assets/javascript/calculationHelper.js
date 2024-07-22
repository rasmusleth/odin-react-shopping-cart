export const calculatePriceTotal = (price, quantity, ingredientsExtra) => {
  const itemTotal = ingredientsExtra.reduce((accumulator, ingredient) => {
    return accumulator + ingredient.price;
  }, price);

  const totalPrice = itemTotal * quantity;

  return totalPrice;
};

export const formatPrice = (price) => {
  let dkk = new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
  });

  return dkk.format(price);
};
