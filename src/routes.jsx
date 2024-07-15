import Menu from "./components/Menu/Menu.jsx";
import Home from "./components/Home/Home.jsx";
import App from "./App.jsx";
import Cart from "./components/Cart/Cart.jsx";

const categoriesData = [
  {
    id: 0,
    slug: "/category0",
    title: "Category 0",
    items: [
      {
        _id: 1000,
        category: "Category 0",
        name: "Food item 0",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        price: 85.0,
        priceFormatted: "85,00 DKK",
      },
      {
        _id: 1001,
        category: "Category 0",
        name: "Food item 1",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        price: 85.0,
        priceFormatted: "85,00 DKK",
      },
      {
        _id: 1002,
        category: "Category 0",
        name: "Food item 2",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        price: 85.0,
        priceFormatted: "85,00 DKK",
      },
    ],
  },
  {
    id: 1,
    slug: "/category1",
    title: "Category 1",
    items: [
      {
        _id: 2000,
        category: "Category 1",
        name: "Food item 0",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        price: 85.0,
        priceFormatted: "85,00 DKK",
      },
      {
        _id: 2001,
        category: "Category 1",
        name: "Food item 1",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        price: 85.0,
        priceFormatted: "85,00 DKK",
      },
      {
        _id: 2002,
        category: "Category 1",
        name: "Food item 2",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        price: 85.0,
        priceFormatted: "85,00 DKK",
      },
    ],
  },
  {
    id: 2,
    slug: "/category2",
    title: "Category 2",
    items: [
      {
        _id: 3000,
        category: "Category 2",
        name: "Food item 0",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        price: 85.0,
        priceFormatted: "85,00 DKK",
      },
      {
        _id: 3001,
        category: "Category 2",
        name: "Food item 1",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        price: 85.0,
        priceFormatted: "85,00 DKK",
      },
      {
        _id: 3002,
        category: "Category 2",
        name: "Food item 2",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        price: 85.0,
        priceFormatted: "85,00 DKK",
      },
    ],
  },
  {
    id: 3,
    slug: "/category3",
    title: "Category 3",
    items: [
      {
        _id: 4000,
        category: "Category 3",
        name: "Food item 0",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        price: 85.0,
        priceFormatted: "85,00 DKK",
      },
      {
        _id: 4001,
        category: "Category 3",
        name: "Food item 1",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        price: 85.0,
        priceFormatted: "85,00 DKK",
      },
      {
        _id: 4002,
        category: "Category 3",
        name: "Food item 2",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        price: 85.0,
        priceFormatted: "85,00 DKK",
      },
    ],
  },
  {
    id: 4,
    slug: "/category4",
    title: "Category 4",
    items: [
      {
        _id: 5000,
        category: "Category 4",
        name: "Food item 0",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        price: 85.0,
        priceFormatted: "85,00 DKK",
      },
      {
        _id: 5001,
        category: "Category 4",
        name: "Food item 1",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        price: 85.0,
        priceFormatted: "85,00 DKK",
      },
      {
        _id: 5002,
        category: "Category 4",
        name: "Food item 2",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        price: 85.0,
        priceFormatted: "85,00 DKK",
      },
    ],
  },
  {
    id: 5,
    slug: "/category5",
    title: "Category 5",
    items: [
      {
        _id: 6000,
        category: "Category 5",
        name: "Food item 0",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        price: 85.0,
        priceFormatted: "85,00 DKK",
      },
      {
        _id: 6001,
        category: "Category 5",
        name: "Food item 1",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        price: 85.0,
        priceFormatted: "85,00 DKK",
      },
      {
        _id: 6002,
        category: "Category 5",
        name: "Food item 2",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        price: 85.0,
        priceFormatted: "85,00 DKK",
      },
    ],
  },
  {
    id: 6,
    slug: "/category6",
    title: "Category 6",
    items: [
      {
        _id: 7000,
        category: "Category 6",
        name: "Food item 0",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        price: 85.0,
        priceFormatted: "85,00 DKK",
      },
      {
        _id: 7001,
        category: "Category 6",
        name: "Food item 1",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        price: 85.0,
        priceFormatted: "85,00 DKK",
      },
      {
        _id: 7002,
        category: "Category 6",
        name: "Food item 2",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        price: 85.0,
        priceFormatted: "85,00 DKK",
      },
    ],
  },
  {
    id: 7,
    slug: "/category7",
    title: "Category 7",
    items: [
      {
        _id: 8000,
        category: "Category 7",
        name: "Food item 0",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        price: 85.0,
        priceFormatted: "85,00 DKK",
      },
      {
        _id: 8001,
        category: "Category 7",
        name: "Food item 1",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        price: 85.0,
        priceFormatted: "85,00 DKK",
      },
      {
        _id: 8002,
        category: "Category 7",
        name: "Food item 2",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        price: 85.0,
        priceFormatted: "85,00 DKK",
      },
    ],
  },
];

const cartMockData = {
  customerInfo: {
    name: "Rasmus Leth",
    emailAddress: "rasmus@rasmusleth.dk",
  },
  items: [
    {
      _id: 0,
      item: 1001,
      name: "Food item 1",
      ingredients: {
        added: [
          {
            name: "Bacon",
            price: 10.0,
          },
          {
            name: "Cheese",
            price: 10.0,
          },
        ],
        removed: [
          {
            name: "Rugbrød",
          },
        ],
      },
      quantity: 1,
      price: 85.0,
      priceTotal: 100000,
    },
  ],
  takeAway: false,
  tableNumber: 7,
  bill: 1000000.99,
};

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu categories={categoriesData} />,
      },
      {
        path: "/cart",
        element: <Cart cart={cartMockData} />,
      },
    ],
  },
];

export default routes;
