import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";

import Calculator from "./Calculator";

const rootElement = document.getElementById("app");
ReactDOM.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>,
  rootElement
);
