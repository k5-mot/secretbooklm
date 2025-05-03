import { Authenticator } from "@aws-amplify/ui-react";
import { CssBaseline } from "@mui/material";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);
const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <CssBaseline />
      <Authenticator.Provider>
        <App />
      </Authenticator.Provider>
    </React.StrictMode>
  );
}
