import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./context/StoredContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PUBLIC_KEY}`)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StoreContextProvider>
      <BrowserRouter>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
      </BrowserRouter>
    </StoreContextProvider>
  </StrictMode>
);
