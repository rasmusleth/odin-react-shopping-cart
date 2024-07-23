import PropTypes from "prop-types";
import styles from "./cart.module.css";
import CartButton from "./CartButton";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { formatPrice } from "../../assets/javascript/calculationHelper";
import ItemQuantityButton from "../MenuItem/ItemQuantityButton";
import MenuItemModal from "../MenuItem/MenuItemModal";
import { handleBodyOnModalOpen } from "../../assets/javascript/itemModalHelpers";

const CartItem = ({ item, onClick, onQuantityChange }) => {
  return (
    <div className={styles.cartItem} onClick={(e) => onClick(item, e)}>
      <div className={styles.cartItemLeft}>
        {/* <ItemQuantityButton quantity={item.quantity} /> */}
        <div id="cartItemQuantity">
          <ItemQuantityButton
            item={item}
            quantity={item.quantity}
            onChange={onQuantityChange}
          />
        </div>
        {/* <div className={styles.itemQuantityUpdateForm}>
          <input
            className={styles.cartItemQuantity}
            data-item-id={item["_id"]}
            type="number"
            name="itemQuantity"
            id="cartItemQuantity"
            defaultValue={item.quantity}
          />
        </div> */}
      </div>
      <div className={styles.cartItemBody}>
        <h2 className={styles.cartItemTitle}>{item.title}</h2>

        {item.ingredients.added.length > 0 && (
          <div className={styles.cartItemIngredients}>
            <p>Extras:</p>
            <ul>
              {item.ingredients.added.map((ingredient) => {
                return (
                  <li key={ingredient.name}>
                    {ingredient.name} {`(${formatPrice(ingredient.price)})`}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {item.ingredients.removed.length > 0 && (
          <div className={styles.cartItemIngredients}>
            <p>Removed:</p>
            <ul>
              {item.ingredients.removed.map((ingredient) => {
                return <li key={ingredient.name}>{ingredient.name}</li>;
              })}
            </ul>
          </div>
        )}

        <div className={styles.cartItemPrice}>
          {formatPrice(item.priceTotal)}
        </div>
      </div>
      <div className={styles.cartItemRight}>
        <img className={styles.cartItemImage} src={item.image} alt="" />
      </div>
      <div className={styles.cartItemOverlay}></div>
      <button className={styles.cartItemDeleteCard} type="submit">
        <svg
          className={styles.cartItemDeleteIcon}
          fill="currentColor"
          height="1.25rem"
          width="1.25rem"
          clipRule="evenodd"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m20.015 6.506h-16v14.423c0 .591.448 1.071 1 1.071h14c.552 0 1-.48 1-1.071 0-3.905 0-14.423 0-14.423zm-5.75 2.494c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-4.5 0c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-.75-5v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-16.507c-.413 0-.747-.335-.747-.747s.334-.747.747-.747zm4.5 0v-.5h-3v.5z"
            fillRule="nonzero"
          />
        </svg>
      </button>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
};

const Cart = () => {
  // const [selectedQuantityInput, setSelectedQuantityInput] = useState(null);
  const [
    cart,
    cartDispatch,
    cartLength,
    modalIsOpen,
    setModalIsOpen,
    selectedItem,
    setSelectedItem,
  ] = useOutletContext();

  // const initialState = cart ? cart : {};
  // const [cartState, dispatch] = useReducer(cartReducer, cart);

  // Handle body overflow when modal is open
  useEffect(() => {
    handleBodyOnModalOpen(modalIsOpen);
  }, [modalIsOpen]);

  const handleItemClick = (item, e) => {
    e.preventDefault();

    if (
      e.target.id === "cartItemQuantity" ||
      e.target.parentElement.id === "cartItemQuantity"
    )
      return;

    setSelectedItem({ ...item });
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleQuantityChange = (e, method, item) => {
    switch (method) {
      case "increase": {
        console.log(item);
        return cartDispatch({ type: "item_quantity_increment", item: item });
      }
      case "decrease": {
        return cartDispatch({ type: "item_quantity_decrement", item: item });
      }
      default: {
        return cartDispatch({
          type: "item_quantity_input",
          quantityInput: parseInt(e.target.value, 10),
          item: item,
        });
      }
    }
  };

  return (
    <>
      <div id="cartSection">
        <div className={styles.progressIndicator}>
          <div className={styles.stepIndicator} id="step2"></div>
          <div className={styles.stepIndicator} id="step3"></div>
          <div className={styles.stepIndicator} id="step3"></div>
        </div>
        <h2>
          <span>Your</span> <span className={`textColorPrimary`}>orders</span>
        </h2>
        <div className={`spacerMedium`}></div>
        <div className={styles.cartContainer}>
          {cart &&
            cart.items.length > 0 &&
            cart.items.map((item) => (
              <CartItem
                key={item["id"]}
                item={item}
                onClick={handleItemClick}
                onQuantityChange={handleQuantityChange}
              />
            ))}

          <div className={`spacerMedium`}></div>
          <div className={styles.cartComment}>
            <label htmlFor="orderComment">Any comments to your order?</label>
            <textarea
              className={styles.cartCommentInput}
              id="orderComment"
              name="orderComment"
            ></textarea>
          </div>
          {!cart && (
            <div className={styles.cartEmptyContainer}>
              <p>Your cart is empty.</p>
              <a className={`btn btnPrimary`} href="/menu">
                Go to menu
              </a>
            </div>
          )}
        </div>
      </div>
      {cart && (
        <CartButton
          cart={cart}
          cartLength={cartLength}
          text="Proceed to Payment"
        />
      )}
      {selectedItem && selectedItem.ingredients && (
        <MenuItemModal
          item={selectedItem}
          modalIsOpen={modalIsOpen}
          onClose={handleModalClose}
          cartDispatch={cartDispatch}
          action="edit"
        />
      )}
    </>
  );
};

export default Cart;
