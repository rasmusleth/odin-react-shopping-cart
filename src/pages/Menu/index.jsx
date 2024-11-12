import { useMenu } from '../../contexts/MenuContext';
import CategorySection from './CategorySection';
import CategorySlider from './CategorySlider';

function Menu() {
  const { categories } = useMenu();

  return (
    <>
      <h1>Menu page</h1>
      <CategorySlider></CategorySlider>
      {categories.map((category) => (
        <CategorySection key={category._id} title={category.title} id={category._id}></CategorySection>
      ))}
    </>
  );
}

export default Menu;
