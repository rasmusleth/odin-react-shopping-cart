import PropTypes from "prop-types";
import styles from "./cart.module.css";
import CartButton from "./CartButton";
import { useOutletContext } from "react-router-dom";

const CartItem = ({ item }) => {
  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemLeft}>
        <div className={styles.itemQuantityUpdateForm}>
          <input
            className={styles.cartItemQuantity}
            data-item-id={item["_id"]}
            type="number"
            name="itemQuantity"
            id=""
            defaultValue={item.quantity}
          />
        </div>
      </div>
      <div className={styles.cartItemBody}>
        <h3>{item.title}</h3>

        {item.ingredients.added.length > 0 && (
          <div className={styles.cartItemIngredients}>
            <p>Extras:</p>
            <ul>
              {item.ingredients.added.map((ingredient) => {
                return (
                  <li key={ingredient.name}>
                    `${ingredient.name} ${ingredient.price} kr.`
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

        <div className={styles.cartItemPrice}>{item.price}</div>
      </div>
      <div className={styles.cartItemRight}>
        <img className={styles.cartItemImage} src={item.image} alt="" />
      </div>
      <div className={styles.cartItemOverlay}></div>
      <form action="/cart/remove-from-cart" method="post">
        <input type="hidden" name="removeItemId" value={item["_id"]} />
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
      </form>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
};

const Cart = () => {
  const [cart, setCart, cartLength] = useOutletContext();

  console.log(cart);

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
            cart.items.map((item) => <CartItem key={item["id"]} item={item} />)}

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
    </>
  );
};

export default Cart;
