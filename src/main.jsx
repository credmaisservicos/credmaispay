import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";

// Remove caches left by older deployments before React mounts. This runs only
// once per browser and prevents a legacy service worker from serving an old
// homepage while client-side navigation already uses the current bundle.
const CACHE_RESET_KEY = "credmaispay-cache-reset-v4";
if (typeof window !== "undefined" && !window.localStorage.getItem(CACHE_RESET_KEY)) {
  window.localStorage.setItem(CACHE_RESET_KEY, "done");
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => registration.unregister());
    });
  }
  if ("caches" in window) {
    caches.keys().then((keys) => Promise.all(keys.map((key) => caches.delete(key))));
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
