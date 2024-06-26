import Menu from "./components/Menu/Menu.jsx";
import Home from "./components/Home/Home.jsx";
import App from "./App.jsx";

const categoriesData = [
  {
    id: 0,
    slug: "/category0",
    title: "Category 0",
    items: [
      {
        id: 1000,
        name: "Food item 0",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        priceFormatted: "85,00 DKK",
      },
      {
        id: 1001,
        name: "Food item 1",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        priceFormatted: "85,00 DKK",
      },
      {
        id: 1002,
        name: "Food item 2",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
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
        id: 1000,
        name: "Food item 0",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        priceFormatted: "85,00 DKK",
      },
      {
        id: 1001,
        name: "Food item 1",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        priceFormatted: "85,00 DKK",
      },
      {
        id: 1002,
        name: "Food item 2",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
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
        id: 1000,
        name: "Food item 0",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        priceFormatted: "85,00 DKK",
      },
      {
        id: 1001,
        name: "Food item 1",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        priceFormatted: "85,00 DKK",
      },
      {
        id: 1002,
        name: "Food item 2",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
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
        id: 1000,
        name: "Food item 0",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        priceFormatted: "85,00 DKK",
      },
      {
        id: 1001,
        name: "Food item 1",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        priceFormatted: "85,00 DKK",
      },
      {
        id: 1002,
        name: "Food item 2",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
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
        id: 1000,
        name: "Food item 0",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        priceFormatted: "85,00 DKK",
      },
      {
        id: 1001,
        name: "Food item 1",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        priceFormatted: "85,00 DKK",
      },
      {
        id: 1002,
        name: "Food item 2",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
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
        id: 1000,
        name: "Food item 0",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        priceFormatted: "85,00 DKK",
      },
      {
        id: 1001,
        name: "Food item 1",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        priceFormatted: "85,00 DKK",
      },
      {
        id: 1002,
        name: "Food item 2",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
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
        id: 1000,
        name: "Food item 0",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        priceFormatted: "85,00 DKK",
      },
      {
        id: 1001,
        name: "Food item 1",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        priceFormatted: "85,00 DKK",
      },
      {
        id: 1002,
        name: "Food item 2",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
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
        id: 1000,
        name: "Food item 0",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        priceFormatted: "85,00 DKK",
      },
      {
        id: 1001,
        name: "Food item 1",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        priceFormatted: "85,00 DKK",
      },
      {
        id: 1002,
        name: "Food item 2",
        description:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        priceFormatted: "85,00 DKK",
      },
    ],
  },
];

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
    ],
  },
];

export default routes;
