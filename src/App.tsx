import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Header } from "./components/landing/Header";
import { Hero } from "./components/landing/Hero";
import { About } from "./components/landing/About";
import { Services } from "./components/landing/Services";
import { Projects } from "./components/landing/Projects";
import { Contact } from "./components/landing/Contact";
import { Footer } from "./components/landing/Footer";
import { Toaster } from "./components/ui/sonner";
import { Watermark } from "./components/Watermark";
import Loader from "./components/Loader";
import './components/Loader.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LayoutGroup>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2}}
        >
          <Watermark />
          <Header />
          <main>
            <Hero />
            <About />
            <Services />
            <Projects />
            <Contact />
          </main>
          <Footer />
          <Toaster />
        </motion.div>
      )}
    </LayoutGroup>
  );
}

export default App
