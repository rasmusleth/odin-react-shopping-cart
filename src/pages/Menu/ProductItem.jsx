import styles from './menu.module.css';

function ProductItem({ title, description, priceFormatted, coverImageUrl }) {
  const cartItem = null;

  return (
    <>
      <a className={`${cartItem ? styles.menuItemWrapperAdded : styles.menuItemWrapper}`} onClick={(e) => null}>
        <div className={styles.menuItemContent}>
          <h3 className={`${styles.menuItemTitle} textStyle2Lines`}>{title}</h3>
          <p className={`${styles.menuItemDescription} textStyle2Lines`}>{description}</p>
          <div className="spacerXXSmall"></div>
          <p className={styles.menuItemPrice}>{priceFormatted}</p>
        </div>
        <img className={styles.menuItemImage} src={coverImageUrl} alt={title} />
        {cartItem && <div className={styles.menuItemAddedQuantity}>{cartItem.quantity}</div>}
      </a>
      <hr className={styles.menuItemSeparator} />
    </>
  );
}

export default ProductItem;
