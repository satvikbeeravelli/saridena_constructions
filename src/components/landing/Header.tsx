import { motion } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
   // { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  const navLinkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div
        className="bg-white/10 backdrop-blur-lg rounded-full shadow-lg flex items-center justify-center overflow-hidden"
      >
        <nav className="flex items-center space-x-4 px-6 py-4">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              variants={navLinkVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: i * 0.1 }}
              className="text-foreground font-medium transition-colors hover:text-accent"
            >
              {link.label}
            </motion.a>
          ))}
          <ModeToggle />
        </nav>
      </div>
    </div>
  );
}
