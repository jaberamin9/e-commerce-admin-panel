import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./pages/layout/Layout";
import Product from "./pages/product/product";
import Hero from "./pages/hero/Hero";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        {
          index: true,
          element: <Product></Product>,
          loader: function () {
            return fetch(`http://localhost:3000/all-product`);
          }
        },
        {
          path: "/product",
          element: <Product></Product>,
          loader: function () {
            return fetch(`http://localhost:3000/all-product`);
          }
        },
        {
          path: "/hero",
          element: <Hero></Hero>,
          loader: function () {
            return fetch(`http://localhost:3000/hero`);
          }
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
