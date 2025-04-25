import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.context";
import "./index.css";

import App from "./App.tsx";
import Home from "./pages/Home.js";
import Note from "./pages/Note";
import EditNote from "./pages/EditNote";
import CreateNote from "./pages/CreateNote";
import PrivateRoute from "./components/Routes/PrivateRoute/PrivateRoute";
import AnounRoute from "./components/Routes/AnounRoute/AnounRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import EditUser from "./pages/EditUser";
import NotFoundPage from "./pages/NotFoundPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App will serve as the layout
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Home /> }, // Default child ("/" renders Home)
      { path: "note", element: <Note /> },
      { path: "signup", element: <AnounRoute component={Signup} /> },
      { path: "login", element: <AnounRoute component={Login} /> },
      { path: "editUser", element: <PrivateRoute component={EditUser} /> },
      { path: "createNote", element: <PrivateRoute component={CreateNote} /> },
      {
        path: "editNote/:noteId",
        element: <PrivateRoute component={EditNote} />,
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
    {/* <ToastContainer /> */}
    {/* AuthProvider comes from context and wrap the application
    it allows the app to use all its functions in any component-
    isLoading, isLoggedin, user, signup, login, logout, edit */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);

// createRoot(rootElement).render(
//   <StrictMode>
//     {/* <ToastContainer /> */}
//     <BrowserRouter>
//       {/* AuthProvider comes from context and wrap the application
//     it allows the app to use all its functions in any component-
//     isLoading, isLoggedin, user, signup, login, logout, edit */}
//       <AuthProvider>
//         <App />
//       </AuthProvider>
//     </BrowserRouter>
//   </StrictMode>
// );
