import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./cart.module.css";
import { formatPrice } from "./cartHelpers";
import { useCart } from "./CartContext";

const CartButton = ({ text }) => {
  const cart = useCart();

  return (
    <Link to={"/cart"} className={`${styles.cartPaymentBtn}`}>
      <div className={styles.cartPaymentLeft}>
        <div className={styles.cartPaymentQuantity}>{cart.itemTotal}</div>
        <p className="textWeightBold">{text}</p>
      </div>
      <div className={styles.cartPaymentTotal}>{formatPrice(cart.bill)}</div>
    </Link>
  );
};

CartButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CartButton;
