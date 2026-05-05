import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { HelmetProvider } from "react-helmet-async";

import "./App.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

const Layout = ({ children }) => (
  <div className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden">
    <CustomCursor />
    <Navbar />
    <main>{children}</main>
    <Footer />
    <Toaster
      theme="dark"
      position="bottom-right"
      toastOptions={{
        style: {
          background: "rgba(10,10,10,0.9)",
          border: "1px solid rgba(0,240,255,0.25)",
          color: "white",
          backdropFilter: "blur(12px)",
        },
      }}
    />
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
