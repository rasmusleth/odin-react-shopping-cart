import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./navigation.module.css";

const Navigation = ({ cartLength, isCart, isDarkMode, onColorThemeClick }) => {
  return (
    <header>
      <nav className={styles.navBar}>
        {isCart ? (
          <Link to={"/"} className={styles.backButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
            >
              <path d="M0 12l9-8v6h15v4h-15v6z" />
            </svg>
          </Link>
        ) : (
          <button onClick={onColorThemeClick} className={styles.darkModeButton}>
            {!isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11 6.999c2.395.731 4.27 2.607 4.999 5.001.733-2.395 2.608-4.269 5.001-5-2.393-.731-4.268-2.605-5.001-5-.729 2.394-2.604 4.268-4.999 4.999zm7 7c1.437.438 2.562 1.564 2.999 3.001.44-1.437 1.565-2.562 3.001-3-1.436-.439-2.561-1.563-3.001-3-.437 1.436-1.562 2.561-2.999 2.999zm-6 5.501c1.198.365 2.135 1.303 2.499 2.5.366-1.198 1.304-2.135 2.501-2.5-1.197-.366-2.134-1.302-2.501-2.5-.364 1.197-1.301 2.134-2.499 2.5zm-6.001-12.5c-.875 2.873-3.128 5.125-5.999 6.001 2.876.88 5.124 3.128 6.004 6.004.875-2.874 3.128-5.124 5.996-6.004-2.868-.874-5.121-3.127-6.001-6.001z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11 6.999c2.395.731 4.27 2.607 4.999 5.001.733-2.395 2.608-4.269 5.001-5-2.393-.731-4.268-2.605-5.001-5-.729 2.394-2.604 4.268-4.999 4.999zm7 7c1.437.438 2.562 1.564 2.999 3.001.44-1.437 1.565-2.562 3.001-3-1.436-.439-2.561-1.563-3.001-3-.437 1.436-1.562 2.561-2.999 2.999zm-6 5.501c1.198.365 2.135 1.303 2.499 2.5.366-1.198 1.304-2.135 2.501-2.5-1.197-.366-2.134-1.302-2.501-2.5-.364 1.197-1.301 2.134-2.499 2.5zm-6.001-12.5c-.875 2.873-3.128 5.125-5.999 6.001 2.876.88 5.124 3.128 6.004 6.004.875-2.874 3.128-5.124 5.996-6.004-2.868-.874-5.121-3.127-6.001-6.001z" />
              </svg>
            )}
          </button>
          // <div className={styles.placeholderButton}></div>
        )}
        {/* <Link to={"/"}>
          <button className={styles.menuIcon}>
            <div className={styles.menuIconBar}></div>
            <div className={styles.menuIconBar}></div>
            <div className={styles.menuIconBar}></div>
          </button>
        </Link> */}
        <Link to={"/"}>
          <div className={styles.logo}>Logo</div>
        </Link>
        <Link to={"/cart"} className={styles.cartButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.75rem"
            height="1.75rem"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M4.558 7l4.701-4.702c.199-.198.46-.298.721-.298.613 0 1.02.505 1.02 1.029 0 .25-.092.504-.299.711l-3.26 3.26h-2.883zm12.001 0h2.883l-4.701-4.702c-.199-.198-.46-.298-.721-.298-.613 0-1.02.505-1.02 1.029 0 .25.092.504.299.711l3.26 3.26zm-16.559 2v2h.643c.534 0 1.021.304 1.256.784l4.101 10.216h12l4.102-10.214c.233-.481.722-.786 1.256-.786h.642v-2h-24z" />
          </svg>
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
  isCart: PropTypes.object,
  isDarkMode: PropTypes.bool.isRequired,
  onColorThemeClick: PropTypes.func.isRequired,
};

export default Navigation;
