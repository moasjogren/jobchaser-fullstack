"use client";

// CSS
import "./globals.css";

// Kontext & komponenter
import { ThemeProvider } from "./_context/ThemeContext";
import { AuthProvider } from "./_context/AuthContext";

import Header from "./_components/Header";
import Footer from "./_components/Footer";
import DarkModeWrapper from "./_components/DarkModeWrapper";

// Redux-importer
import { Provider } from "react-redux";
import store from "@/lib/store";

import "@radix-ui/themes/styles.css";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <html lang="en">
          <body>
            <AuthProvider>
              <DarkModeWrapper>
                <Header />
                {children}
                <Footer />
              </DarkModeWrapper>
            </AuthProvider>
          </body>
        </html>
      </ThemeProvider>
    </Provider>
  );
}
