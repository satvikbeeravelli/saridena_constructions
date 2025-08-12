import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Header } from "./components/landing/Header";
import { Hero } from "./components/landing/Hero";
import { About } from "./components/landing/About";
import { VRExperience } from "./components/landing/VRExperience";
//import { Services } from "./components/landing/Services";
import { Projects } from "./components/landing/Projects";
import { Contact } from "./components/landing/Contact";
import { Footer } from "./components/landing/Footer";
import { LakewoodVillas } from "./components/LakewoodVillas";
import { Toaster } from "./components/ui/sonner";
import { Watermark } from "./components/Watermark";
import Loader from "./components/Loader";
import './components/Loader.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<'home' | 'lakewood'>('home');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Listen for navigation events
    const handleNavigateToLakewood = () => {
      setCurrentPage('lakewood');
    };

    const handleNavigateToHome = () => {
      setCurrentPage('home');
      // Scroll to projects section after navigation
      setTimeout(() => {
        const projectsElement = document.getElementById('projects');
        if (projectsElement) {
          projectsElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    };

    const handleHashChange = () => {
      if (window.location.hash === '#projects') {
        setCurrentPage('home');
        // Scroll to projects section after navigation
        setTimeout(() => {
          const projectsElement = document.getElementById('projects');
          if (projectsElement) {
            projectsElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    window.addEventListener('navigateToLakewood', handleNavigateToLakewood);
    window.addEventListener('navigateToHome', handleNavigateToHome);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('navigateToLakewood', handleNavigateToLakewood);
      window.removeEventListener('navigateToHome', handleNavigateToHome);
      window.removeEventListener('hashchange', handleHashChange);
    };
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
          {currentPage === 'home' ? (
            <>
              <Header />
              <main>
                <Hero />
                <About />
                <VRExperience />
                <div id="projects">
                  <Projects />
                </div>
                <Contact />
              </main>
              <Footer />
            </>
          ) : (
            <LakewoodVillas />
          )}
          <Toaster />
        </motion.div>
      )}
    </LayoutGroup>
  );
}

export default App
