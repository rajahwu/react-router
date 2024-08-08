// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./firebase";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import App from "components/App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
