import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { MainView } from "./components/main-view/main-view";
import "./index.scss";

const container = document.getElementById("app"); // or "root" depending on your index.html
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MainView />
    </BrowserRouter>
  </React.StrictMode>
);
