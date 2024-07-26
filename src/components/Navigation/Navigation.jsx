import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./navigation.module.css";

const Navigation = ({ cartLength }) => {
  return (
    <header>
      <nav className={styles.navBar}>
        <Link to={"/menu"}>
          <button className={styles.menuIcon}>
            <div className={styles.menuIconBar}></div>
            <div className={styles.menuIconBar}></div>
            <div className={styles.menuIconBar}></div>
          </button>
        </Link>
        <Link to={"/"}>
          <div className={styles.logo}>Logo</div>
        </Link>
        <Link to={"/cart"} className={styles.cartButton}>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.75rem"
              height="1.75rem"
              viewBox="0 0 24 24"
            >
              <path d="M4.558 7l4.701-4.702c.199-.198.46-.298.721-.298.613 0 1.02.505 1.02 1.029 0 .25-.092.504-.299.711l-3.26 3.26h-2.883zm12.001 0h2.883l-4.701-4.702c-.199-.198-.46-.298-.721-.298-.613 0-1.02.505-1.02 1.029 0 .25.092.504.299.711l3.26 3.26zm-16.559 2v2h.643c.534 0 1.021.304 1.256.784l4.101 10.216h12l4.102-10.214c.233-.481.722-.786 1.256-.786h.642v-2h-24z" />
            </svg>
          </div>
          {cartLength < 1 ? null : (
            <div
              className={
                cartLength < 10 ? styles.cartItemCountLow : styles.cartItemCount
              }
            >
              {cartLength}
            </div>
          )}
        </Link>
      </nav>
      <div className={styles.headerDivider}>
        <div className={styles.line}></div>
        <div className={styles.textBox}>..Dine-in bestilling</div>
      </div>
      <div className={styles.infoBar}></div>
    </header>
  );
};

Navigation.propTypes = {
  cartLength: PropTypes.number.isRequired,
};

export default Navigation;
