import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import MenuCategorySlider from "./MenuCategorySlider";
import MenuCategorySection from "./MenuCategorySection";
import MenuItemModal from "../MenuItem/MenuItemModal";
import styles from "./menu.module.css";
import CartButton from "../Cart/CartButton";
import { useOutletContext } from "react-router-dom";

const Menu = () => {
  const [cart, setCart, cartLength] = useOutletContext();
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

  // Handle body overflow when modal is open
  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalIsOpen]);

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
          <div className={`${styles.menuPageWrapper}`}>
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
                cart={cart}
                onItemClick={handleItemClick}
                ref={(el) => (categorySectionRefs.current[index] = el)}
              />
            ))}
          </div>

          {cart.items.length > 0 && !modalIsOpen && (
            <CartButton
              cart={cart}
              cartLength={cartLength}
              text="Items in your cart"
            />
          )}

          <MenuItemModal
            item={selectedItem}
            modalIsOpen={modalIsOpen}
            onClose={handleModalClose}
            setCart={setCart}
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

Menu.propTypes = {
  cart: PropTypes.object,
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
      extraIngredients: [
        {
          name: "Bacon",
          price: 10,
        },
        {
          name: "Cheese",
          price: 5,
        },
        {
          name: "Æg",
          price: 10,
        },
        {
          name: "Salami",
          price: 5,
        },
      ],
      ingredients: [
        {
          name: "Rugbrød",
        },
        {
          name: "Smør",
        },
        {
          name: "Ketchup",
        },
        {
          name: "Mayo",
        },
        {
          name: "Agurk",
        },
      ],
    });
  }

  return categories;
}
