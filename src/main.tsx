import React from "react";
import ReactDOM from "react-dom/client";

import "unfonts.css";
import "@strawberry-graphql/styleguide/dist/index.css";
import "./index.css";

import { Editor } from "./components/editor";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Editor />
  </React.StrictMode>
);
