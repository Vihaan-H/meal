import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { MealProvider } from "./context/MealContext";
import { register } from "@teamhanko/hanko-elements";

register(import.meta.env.VITE_HANKO_API);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <MealProvider>
      <App />
    </MealProvider>
  </AuthProvider>
);
