import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Your main App component
import "./index.css"; // Your global styles

// Get the root element from the DOM
const rootElement = document.getElementById("root");

if (rootElement) {
  // Create a React root and render the App
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
