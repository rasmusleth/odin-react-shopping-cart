import { useMenu } from '../../contexts/MenuContext';
import styles from './menu.module.css';
import ProductItem from './ProductItem';

function ProductList({ categoryId }) {
  const { products } = useMenu();
  const productsInCategory = products.filter((product) => product.category === categoryId);

  return (
    <>
      <div className={styles.menuItemList}>
        {productsInCategory.map((product) => (
          <ProductItem
            key={product._id}
            title={product.title}
            description={product.description}
            priceFormatted={product.priceFormatted}
            coverImageUrl={product.coverImageUrl}></ProductItem>
        ))}
      </div>
    </>
  );
}

export default ProductList;
