import PropTypes from "prop-types";
import styles from "./menuItem.module.css";

const QuantityButton = () => {
  return (
    <div className={styles.menuItemQuantityButton}>
      <button className={styles.quantityDecrease} type="button">
        -
      </button>
      <input
        className={styles.quantityValue}
        type="number"
        name="itemQuantity"
        defaultValue="1"
        min="1"
      />
      <button className={styles.quantityIncrease} type="button">
        +
      </button>
    </div>
  );
};

const MenuItemFooter = ({ item }) => {
  return (
    <>
      <form action="" className={styles.menuItemFooterContainer}>
        <div className={styles.menuItemFooter}>
          <QuantityButton />
          <button
            type="dialog"
            className={`btnPrimary ${styles.menuItemBuyButton}`}
          >
            <p className="textWeightBold">Tilføj til bestilling</p>
            <p className={styles.menuItemPriceTotal}>{item.price} kr.</p>
          </button>
        </div>
      </form>
    </>
  );
};

MenuItemFooter.propTypes = {
  item: PropTypes.object.isRequired,
};

const IngredientItem = ({ ingredient, isExtra }) => {
  let ingredientHtmlId = isExtra
    ? `${ingredient.name}-add`
    : `${ingredient.name}-remove`;

  return (
    <div className={styles.menuItemIngredientWrapper}>
      <label htmlFor={ingredientHtmlId}>
        <input
          type="checkbox"
          id={ingredientHtmlId}
          name="itemIngredientAdd"
          value={`${ingredient.name} | ${ingredient.price}`}
        />
        <span className={styles.checkmark}></span>
        <p>{ingredient.name}</p>
        {isExtra && (
          <p
            className={styles.menuItemIngredientPrice}
          >{`+ ${ingredient.price} kr.`}</p>
        )}
      </label>
    </div>
  );
};

IngredientItem.propTypes = {
  ingredient: PropTypes.object.isRequired,
  isExtra: PropTypes.bool.isRequired,
};

const MenuItem = ({ item, onClose }) => {
  return (
    <>
      {item && (
        <div className={styles.menuItemContainer}>
          <div className={styles.menuItemHeader}>
            <button
              onClick={onClose}
              type="button"
              className={styles.menuItemCloseButton}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1rem"
                height="1rem"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
              </svg>
            </button>
          </div>
          <img
            className={styles.menuItemCoverImage}
            src={item.image} // "/images/menu-categories/luksus-smoerrebroed-cover.jpeg"
            alt="Dish Image"
          />
          <div className={styles.menuItemContentWrapper}>
            <span className={styles.menuItemCategory}>{item.category}</span>
            <h2 className={`heading-style-h4`}>{item.title}</h2>
            <p className={styles.menuItemPrice}>{item.priceFormatted}</p>
            <p className={styles.menuItemDescription}>{item.description}</p>
            <div className={styles.spacerSmall}></div>

            <h3 className="heading-style-h6">Tilføj ingredienser</h3>
            <div className={styles.menuItemIngredientContainer}>
              {item.extraIngredients.length > 0 &&
                item.extraIngredients.map((ingredient) => {
                  return (
                    <IngredientItem
                      key={ingredient.name}
                      ingredient={ingredient}
                      isExtra={true}
                    />
                  );
                })}
            </div>
            <div className={styles.spacerSmall}></div>

            <h3 className="heading-style-h6">Fjern ingredienser</h3>
            <div className={styles.menuItemIngredientContainer}>
              {item.ingredients.length > 0 &&
                item.ingredients.map((ingredient) => {
                  return (
                    <IngredientItem
                      key={ingredient.name}
                      ingredient={ingredient}
                      isExtra={false}
                    />
                  );
                })}
            </div>
          </div>
          <MenuItemFooter item={item} />
        </div>
      )}
    </>
  );
};

MenuItem.propTypes = {
  item: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default MenuItem;
