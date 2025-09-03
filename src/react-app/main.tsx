import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../react-app/index.css";
import App from "../react-app/App";
import { AuthProvider } from "../react-app/context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <Router>
          <AuthProvider>
            <App />
          </AuthProvider>
      </Router>
    </GoogleOAuthProvider>
  </StrictMode>
);
