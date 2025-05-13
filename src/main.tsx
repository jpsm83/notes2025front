import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.context";
import "./index.css";
// helmet is used for SEO
import { HelmetProvider } from "react-helmet-async";

// authRoutes
import PrivateRoute from "./authRoutes/PrivateRoute.tsx";
import AnounRoute from "./authRoutes/AnounRoute.tsx";
import { Slide, ToastContainer } from "react-toastify";
import Spinner from "./components/Spinner.tsx";
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

// Lazy load route components
// import with React.lazy
const App = lazy(() => import("./App"));
const Home = lazy(() => import("./pages/Home"));
const Note = lazy(() => import("./pages/Note"));
const EditNote = lazy(() => import("./pages/EditNote"));
const CreateNote = lazy(() => import("./pages/CreateNote"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const EditUser = lazy(() => import("./pages/EditUser"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App will serve as the layout
    errorElement: (
      // because we are using lazy loading, we need to wrap the error element with Suspense
      <Suspense fallback={<Spinner />}>
        <NotFoundPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          // because we are using lazy loading, we need to wrap the error element with Suspense
          <Suspense fallback={<Spinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "signup",
        element: <AnounRoute />,
        children: [
          {
            index: true,
            element: (
              // because we are using lazy loading, we need to wrap the error element with Suspense
              <Suspense fallback={<Spinner />}>
                <Signup />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "login",
        element: <AnounRoute />,
        children: [
          {
            index: true,
            element: (
              // because we are using lazy loading, we need to wrap the error element with Suspense
              <Suspense fallback={<Spinner />}>
                <Login />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "edit-user/:userId",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: (
              // because we are using lazy loading, we need to wrap the error element with Suspense
              <Suspense fallback={<Spinner />}>
                <EditUser />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "create-note",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: (
              // because we are using lazy loading, we need to wrap the error element with Suspense
              <Suspense fallback={<Spinner />}>
                <CreateNote />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "note/:noteId",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: (
              // because we are using lazy loading, we need to wrap the error element with Suspense
              <Suspense fallback={<Spinner />}>
                <Note />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "edit-note/:noteId",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: (
              // because we are using lazy loading, we need to wrap the error element with Suspense
              <Suspense fallback={<Spinner />}>
                <EditNote />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

if (import.meta.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element with id 'root' not found in the DOM.");
}

createRoot(rootElement).render(
  <StrictMode>
    {/* AuthProvider comes from context and wrap the application
    it allows the app to use all its functions in any component-
    isLoading, isLoggedin, user, signup, login, logout, edit */}
    <HelmetProvider>
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
    </HelmetProvider>
  </StrictMode>
);
