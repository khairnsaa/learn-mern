import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomeScreens from "./screens/HomeScreens.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import CartScreen from "./screens/CartScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index={true} element={<HomeScreens />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
