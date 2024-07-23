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
