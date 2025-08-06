import { Facebook, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.footer
      className="bg-secondary border-t py-4"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
    >
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex items-center space-x-2 mb-2 md:mb-0">
            <img
              src="/photos/saridena_logo.png"
              alt="Saridena Logo"
              style={{ filter: 'drop-shadow(2px 2px 10px rgba(255, 255, 255, 0.6))' }}
              className="h-8 w-auto"
            />
          </div>
          <p className="text-foreground">&copy; {new Date().getFullYear()} Saridena Constructions Pvt. Ltd.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-foreground hover:text-accent transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" className="text-foreground hover:text-accent transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="text-foreground hover:text-accent transition-colors">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
