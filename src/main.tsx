import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

// import React from "react";
import App from "./App.tsx";
import Home from "./screen/Home.tsx";
import NotFound from "./screen/NotFound.tsx";
import Peer2 from "./screen/Sessions.tsx";
import { Web3ModalProvider } from "./service/web3model.conf.tsx";

import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "session", element: <Peer2 /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <Web3ModalProvider children={<RouterProvider router={Router} />} />
  </Provider>
  // </React.StrictMode>
);
