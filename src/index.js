import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import { store, persistor } from "./store/store";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./utils/firebase/stripe/stripe.utils";

const container = document.getElementById("root");
const root = createRoot(container);

// const rootElement = document.getElementById("root");

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
  // rootElement
);
