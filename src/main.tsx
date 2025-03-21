
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./hooks/use-theme";

const queryClient = new QueryClient();

// Replace with your actual Clerk publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  console.error("Missing Clerk Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      clerkJSVersion="5.56.0-snapshot.v20250312225817"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/dashboard"
      signInForceRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/"
      signUpForceRedirectUrl="/"
      afterSignOutUrl="/"
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light">
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </ClerkProvider>
  </React.StrictMode>
);
