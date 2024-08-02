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
      id: data[i].id,
      title: data[i].title,
      description: data[i].description,
      image: data[i].image,
      price: data[i].price,
      customItemPrice: data[i].price,
      priceTotal: data[i].price,
      ingredients: {},
      itemId: data[i].id,
      quantity: 1,
      category: `Category ${categoryId}`,
      allIngredients: {
        extra: [
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
        existing: [
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
      },
    });
  }

  return categories;
}

export { convertDataToCategories };
