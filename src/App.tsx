import { Header } from "./components/landing/Header";
import { Hero } from "./components/landing/Hero";
import { About } from "./components/landing/About";
import { Services } from "./components/landing/Services";
import { Projects } from "./components/landing/Projects";
import { Contact } from "./components/landing/Contact";
import { Footer } from "./components/landing/Footer";
import { Toaster } from "./components/ui/sonner";
import { Watermark } from "./components/Watermark";


function App() {
  return (
    <>
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
    </>
  )
}

export default App
