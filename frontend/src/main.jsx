import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import MyEvents from "./pages/MyEvents.jsx";
import EventDetailpage from "./pages/EventDetailpage.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./state/store.js";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import { PersistGate } from "redux-persist/integration/react";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><App /></ProtectedRoute>,
    children: [
      { path: "", element: <ProtectedRoute><Home /></ProtectedRoute> },
      { 
        path: "createEvent", 
        element: <ProtectedRoute><CreateEvent /></ProtectedRoute> 
      },
      { 
        path: "myEvent", 
        element: <ProtectedRoute><MyEvents /></ProtectedRoute> 
      },
      { 
        path: "eventDetail/:eventId", 
        element: <ProtectedRoute><EventDetailpage /></ProtectedRoute> 
      },
    ],
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
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={Router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
