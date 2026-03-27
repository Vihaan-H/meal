import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { MealProvider } from "./context/MealContext";
import { register } from "@teamhanko/hanko-elements";

window.hankoEnabled = false;
const hankoApi = import.meta.env.VITE_HANKO_API;
if (!hankoApi) {
  console.warn("VITE_HANKO_API is not configured. Set it in your .env file before starting the app.");
  window.hankoEnabled = false;
} else {
  register(hankoApi)
    .then(() => {
      window.hankoEnabled = true;
      console.info("Hanko elements registered.");
    })
    .catch((error) => {
      window.hankoEnabled = false;
      console.error("Failed to register Hanko elements:", error);
    });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <MealProvider>
      <App />
    </MealProvider>
  </AuthProvider>
);
