import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/home/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/authentication/Register.jsx";
import Login from "./pages/authentication/Login.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
createRoot(document.getElementById("root")).render(
  <>
    <App />
    <RouterProvider router={router} />
  </>
);
