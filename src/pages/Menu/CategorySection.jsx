import styles from './menu.module.css';
import ProductList from './ProductList';

function CategorySection({ title, id }) {
  return (
    <>
      <div className={styles.menuCategorySection} id={title}>
        <div className={styles.menuCategoryTitleContainer}>
          <a href={`#${title}`} className={styles.menuCategoryTitleWrapper}>
            <h2 className={styles.menuCategoryTitle}>{title}</h2>
          </a>
        </div>
        <ProductList categoryId={id}></ProductList>
      </div>
      <div className="spacerMedium"></div>
    </>
  );
}

export default CategorySection;
