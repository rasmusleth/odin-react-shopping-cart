import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./cart.module.css";
import { formatPrice } from "../../assets/javascript/calculationHelper";

const CartButton = ({ cart, cartLength }) => {
  console.log(cart);
  return (
    <Link to={"/cart"} className={`${styles.cartPaymentBtn}`}>
      <div className={styles.cartPaymentLeft}>
        <div className={styles.cartPaymentQuantity}>{cartLength}</div>
        <p className="textWeightBold">Proceed to Payment</p>
      </div>
      <div className={styles.cartPaymentTotal}>{formatPrice(cart.bill)}</div>
    </Link>
  );
};

CartButton.propTypes = {
  cart: PropTypes.object.isRequired,
  cartLength: PropTypes.number.isRequired,
};

export default CartButton;
