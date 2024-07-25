import { calculatePriceTotal } from "./calculationHelper";
import { checkIdenticalItemInCart } from "./cartHelpers.js";

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
      let existsAlready = checkIdenticalItemInCart(cartState, action.item);

      if (existsAlready) {
        const priceToAdd = calculatePriceTotal(
          action.item.price,
          action.item.quantity,
          action.item.ingredients.added
        );

        return {
          ...cartState,
          items: cartState.items.map((item) => {
            if (item.itemId === action.item.itemId) {
              return {
                ...item,
                quantity: item.quantity + action.item.quantity,
                priceTotal: item.priceTotal + priceToAdd,
              };
            } else {
              return item;
            }
          }),
          bill: cartState.bill + priceToAdd,
        };
      } else {
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
    }
    case "item_quantity_increment": {
      return {
        ...cartState,
        items: cartState.items.map((item) => {
          if (item.id === action.item.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
              priceTotal: item.priceTotal + item.customItemPrice,
            };
          } else {
            return item;
          }
        }),
        bill: cartState.bill + action.item.customItemPrice,
      };
    }
    case "item_quantity_decrement": {
      return {
        ...cartState,
        items: cartState.items.map((item) => {
          if (item.id === action.item.id) {
            return {
              ...item,
              quantity: item.quantity - 1,
              priceTotal: item.priceTotal - item.customItemPrice,
            };
          } else {
            return item;
          }
        }),
        bill: cartState.bill - action.item.customItemPrice,
      };
    }
    case "item_quantity_input": {
      return {
        ...cartState,
        items: cartState.items.map((item) => {
          if (item.id === action.item.id) {
            return {
              ...item,
              quantity: action.quantityInput,
              priceTotal: item.customItemPrice * action.quantityInput,
            };
          } else {
            return item;
          }
        }),
        bill:
          cartState.bill + action.item.customItemPrice * action.quantityInput,
      };
    }
    case "edit_cart_item": {
      let priceDifference = 0;

      return {
        ...cartState,
        items: cartState.items.map((item) => {
          if (item.id === action.newItem.id) {
            // Calculate price difference
            priceDifference = action.newItem.priceTotal - item.priceTotal;

            return action.newItem;
          } else {
            return item;
          }
        }),
        bill: cartState.bill + priceDifference,
      };
    }
    case "remove_from_cart": {
      return {
        ...cartState,
        items: cartState.items.filter((item) => item.id !== action.item.id),
        bill: cartState.bill - action.item.priceTotal,
      };
    }
  }
}

export { cartReducer, initialCartState };
