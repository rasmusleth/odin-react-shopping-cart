import { useEffect, useState, useRef } from "react";
import MenuCategorySlider from "./MenuCategorySlider";
import MenuCategorySection from "./MenuCategorySection";
import MenuItemModal from "./MenuItemModal";
import styles from "./menu.module.css";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isObserverActive, setIsObserverActive] = useState(true);
  const categorySectionRefs = useRef([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      const convertedData = convertDataToCategories(data);
      setCategories(convertedData);
    }

    fetchData();
  }, []);

  // Slider color-change implementation
  useEffect(() => {
    function handleScroll() {
      if (!isObserverActive) return;
      categorySectionRefs.current.forEach((ref, index) => {
        if (!ref) return;

        const rect = ref.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom >= 0) setActiveCategory(index);
      });
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isObserverActive]);

  const handleItemClick = (item, e) => {
    e.preventDefault();

    setSelectedItem({ ...item });
    setmodalIsOpen(true);
  };

  const handleModalClose = () => {
    setmodalIsOpen(false);
  };

  const handleCategoryClick = (category) => {
    setIsObserverActive(false);
    setActiveCategory(category);
    setTimeout(() => setIsObserverActive(true), 800);
  };

  return (
    <>
      {categories.length > 0 ? (
        <>
          <h1>Menu</h1>
          <p>Browse our collection of delicious meals</p>
          <div className={styles.menuPageWrapper}>
            <div className={`spacerSmall`}></div>
            <MenuCategorySlider
              categories={categories}
              activeCategory={activeCategory}
              onCategoryClick={handleCategoryClick}
            />
            <div className={`spacerSmall`}></div>

            {categories.map((category, index) => (
              <MenuCategorySection
                key={`section-${category.id}`}
                category={category}
                onItemClick={handleItemClick}
                ref={(el) => (categorySectionRefs.current[index] = el)}
              />
            ))}
          </div>

          <MenuItemModal
            item={selectedItem}
            modalIsOpen={modalIsOpen}
            onClose={handleModalClose}
          />
        </>
      ) : (
        <>
          <p>Loading..</p>
        </>
      )}
    </>
  );
};

export default Menu;

function convertDataToCategories(data) {
  let categories = [];
  let categoryId = 0;
  for (let i = 0; i < data.length; i++) {
    if (i % 4 === 0) {
      if (i > 0) {
        categoryId++;
      }

      categories.push({
        id: categoryId,
        slug: `/category${categoryId}`,
        title: `Category ${categoryId}`,
        items: [],
      });
    }

    categories[categoryId]["items"].push({
      ...data[i],
      category: `Category ${categoryId}`,
      priceFormatted: "85,00 DKK",
    });
  }

  return categories;
}
