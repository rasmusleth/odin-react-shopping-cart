import { calculatePriceTotal } from "./calculationHelper";

const initialCartState = {
  customerInfo: {
    name: "",
    emailAddress: "",
  },
  items: [],
  takeAway: false,
  tableNumber: -1,
  bill: 0,
};

function cartReducer(cartState, action) {
  switch (action.type) {
    case "add_to_cart": {
      return {
        ...cartState,
        items: [...cartState.items, action.item],
        bill:
          cartState.bill +
          calculatePriceTotal(
            action.item.price,
            action.item.quantity,
            action.item.ingredients.added
          ),
      };
    }
    case "item_quantity_increment": {
      return {
        ...cartState,
        items: cartState.items.map((item) => {
          if (item.id === action.item.id && item.quantity < 999) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          } else {
            return item;
          }
        }),
        bill:
          cartState.bill +
          calculatePriceTotal(
            action.item.price,
            action.item.quantity,
            action.item.ingredients.added
          ),
      };
    }
    case "item_quantity_decrement": {
      return {
        ...cartState,
        items: cartState.items.map((item) => {
          if (item.id === action.item.id && item.quantity > 1) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          } else {
            return item;
          }
        }),
      };
    }
    case "item_quantity_input": {
      return {
        ...cartState,
        items: cartState.items.map((item) => {
          if (
            item.id === action.item.id &&
            action.quantityInput > 0 &&
            action.quantityInput < 1000
          ) {
            return {
              ...item,
              quantity: action.quantityInput,
            };
          } else {
            return item;
          }
        }),
      };
    }
  }
}

export { cartReducer, initialCartState };
