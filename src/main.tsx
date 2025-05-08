import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.context";
import "./index.css";

// authRoutes
import PrivateRoute from "./authRoutes/PrivateRoute.tsx";
import AnounRoute from "./authRoutes/AnounRoute.tsx";

// pages
import App from "./App.tsx";
import Home from "./pages/Home.js";
import Note from "./pages/Note";
import EditNote from "./pages/EditNote";
import CreateNote from "./pages/CreateNote";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import EditUser from "./pages/EditUser";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import { ToastContainer, Slide } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App will serve as the layout
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Home /> }, // Default child ("/" renders Home)
      {
        path: "signup",
        element: <AnounRoute />, // AnounRoute wraps the Signup page
        children: [{ index: true, element: <Signup /> }],
      },
      {
        path: "login",
        element: <AnounRoute />, // AnounRoute wraps the Login page
        children: [{ index: true, element: <Login /> }],
      },
      {
        path: "edit-user/:userId",
        element: <PrivateRoute />, // PrivateRoute wraps the EditUser page
        children: [{ index: true, element: <EditUser /> }],
      },
      {
        path: "create-note",
        element: <PrivateRoute />, // PrivateRoute wraps the CreateNote page
        children: [{ index: true, element: <CreateNote /> }],
      },
      {
        path: "note/:noteId",
        element: <PrivateRoute />, // PrivateRoute wraps the EditNote page
        children: [{ index: true, element: <Note /> }],
      },
      {
        path: "edit-note/:noteId",
        element: <PrivateRoute />, // PrivateRoute wraps the EditNote page
        children: [{ index: true, element: <EditNote /> }],
      },
    ],
  },
]);

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element with id 'root' not found in the DOM.");
}

createRoot(rootElement).render(
  <StrictMode>
    {/* AuthProvider comes from context and wrap the application
    it allows the app to use all its functions in any component-
    isLoading, isLoggedin, user, signup, login, logout, edit */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Slide}
    />{" "}
  </StrictMode>
);
