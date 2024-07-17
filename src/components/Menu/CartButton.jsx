import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../Cart/cart.module.css";

const CartButton = ({ cart }) => {
  console.log(cart);
  return (
    <Link to={"/cart"} className={`${styles.cartPaymentBtn}`}>
      <div className={styles.cartPaymentLeft}>
        <div className={styles.cartPaymentQuantity}>{cart.items.length}</div>
        <p className="textWeightBold">Proceed to Payment</p>
      </div>
      <div className={styles.cartPaymentTotal}>{`${cart.bill} kr.`}</div>
    </Link>
  );
};

CartButton.propTypes = {
  cart: PropTypes.object.isRequired,
};

export default CartButton;
