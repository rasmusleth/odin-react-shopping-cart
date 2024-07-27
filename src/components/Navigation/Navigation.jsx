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
          <button onClick={onColorThemeClick}>
            {!isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M10.719 2.082c-2.572 2.028-4.719 5.212-4.719 9.918 0 4.569 1.938 7.798 4.548 9.895-4.829-.705-8.548-4.874-8.548-9.895 0-5.08 3.808-9.288 8.719-9.918zm1.281-2.082c-6.617 0-12 5.383-12 12s5.383 12 12 12c1.894 0 3.87-.333 5.37-1.179-3.453-.613-9.37-3.367-9.37-10.821 0-7.555 6.422-10.317 9.37-10.821-1.74-.682-3.476-1.179-5.37-1.179zm0 10.999c1.437.438 2.562 1.564 2.999 3.001.44-1.437 1.565-2.562 3.001-3-1.436-.439-2.561-1.563-3.001-3-.437 1.436-1.562 2.561-2.999 2.999zm8.001.001c.958.293 1.707 1.042 2 2.001.291-.959 1.042-1.709 1.999-2.001-.957-.292-1.707-1.042-2-2-.293.958-1.042 1.708-1.999 2zm-1-9c-.437 1.437-1.563 2.562-2.998 3.001 1.438.44 2.561 1.564 3.001 3.002.437-1.438 1.563-2.563 2.996-3.002-1.433-.437-2.559-1.564-2.999-3.001z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 10.999c1.437.438 2.562 1.564 2.999 3.001.44-1.437 1.565-2.562 3.001-3-1.436-.439-2.561-1.563-3.001-3-.437 1.436-1.562 2.561-2.999 2.999zm8.001.001c.958.293 1.707 1.042 2 2.001.291-.959 1.042-1.709 1.999-2.001-.957-.292-1.707-1.042-2-2-.293.958-1.042 1.708-1.999 2zm-1-9c-.437 1.437-1.563 2.562-2.998 3.001 1.438.44 2.561 1.564 3.001 3.002.437-1.438 1.563-2.563 2.996-3.002-1.433-.437-2.559-1.564-2.999-3.001zm-7.001 22c-6.617 0-12-5.383-12-12s5.383-12 12-12c1.894 0 3.63.497 5.37 1.179-2.948.504-9.37 3.266-9.37 10.821 0 7.454 5.917 10.208 9.37 10.821-1.5.846-3.476 1.179-5.37 1.179z" />
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
