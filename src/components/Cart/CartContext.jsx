import { useReducer, createContext, useContext } from "react";
import PropTypes from "prop-types";
import { checkIdenticalItemInCart, calculatePriceTotal } from "./cartHelpers";

const CartContext = createContext(null);
const CartDispatchContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export function useCart() {
  return useContext(CartContext);
}

export function useCartDispatch() {
  return useContext(CartDispatchContext);
}

function cartReducer(cartState, action) {
  switch (action.type) {
    case "add_to_cart": {
      let existsAlready = checkIdenticalItemInCart(cartState, action.item);
      let itemsUpdated;
      const priceIncrease = calculatePriceTotal(
        action.item.price,
        action.item.quantity,
        action.item.ingredients.added
      );

      if (existsAlready) {
        itemsUpdated = cartState.items.map((item) => {
          if (item.itemId === action.item.itemId) {
            return {
              ...item,
              quantity: item.quantity + action.item.quantity,
              priceTotal: item.priceTotal + priceIncrease,
            };
          } else {
            return item;
          }
        });
      } else {
        itemsUpdated = [...cartState.items, action.item];
      }

      return {
        ...cartState,
        items: itemsUpdated,
        itemTotal: cartState.itemTotal + action.item.quantity,
        bill: cartState.bill + priceIncrease,
      };
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
        itemTotal: cartState.itemTotal + 1,
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
        itemTotal: cartState.itemTotal - 1,
        bill: cartState.bill - action.item.customItemPrice,
      };
    }
    case "item_quantity_input": {
      let quantityDifference;
      let priceDifference;

      return {
        ...cartState,
        items: cartState.items.map((item) => {
          if (item.id === action.item.id) {
            quantityDifference = action.quantityInput - item.quantity;
            priceDifference = quantityDifference * item.customItemPrice;

            return {
              ...item,
              quantity: action.quantityInput,
              priceTotal: item.priceTotal + priceDifference,
            };
          } else {
            return item;
          }
        }),
        itemTotal: cartState.itemTotal + quantityDifference,
        bill: cartState.bill + priceDifference,
      };
    }
    case "edit_cart_item": {
      let priceDifference;
      let quantityDifference;

      return {
        ...cartState,
        items: cartState.items.map((item) => {
          if (item.id === action.newItem.id) {
            // Calculate price difference
            priceDifference = action.newItem.priceTotal - item.priceTotal;
            quantityDifference = action.newItem.quantity - item.quantity;

            return action.newItem;
          } else {
            return item;
          }
        }),
        itemTotal: cartState.itemTotal + quantityDifference,
        bill: cartState.bill + priceDifference,
      };
    }
    case "remove_from_cart": {
      return {
        ...cartState,
        items: cartState.items.filter((item) => item.id !== action.item.id),
        itemTotal: cartState.itemTotal - action.item.quantity,
        bill: cartState.bill - action.item.priceTotal,
      };
    }
  }
}

const initialCart = {
  customerInfo: {
    name: "",
    emailAddress: "",
  },
  items: [],
  itemTotal: 0,
  takeAway: false,
  tableNumber: -1,
  bill: 0,
};
