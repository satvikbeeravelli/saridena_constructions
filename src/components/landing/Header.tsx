import { motion } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#vr-experience', label: 'VR Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  const navLinkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    const targetId = href.replace(/.*#/, "");
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: "smooth",
    });
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <div className="bg-white/10 backdrop-blur-lg rounded-full shadow-lg flex items-center justify-center overflow-hidden hover:bg-white/20 transition-all duration-300">
          <nav className="flex items-center space-x-4 px-6 py-4">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                variants={navLinkVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: i * 0.1 }}
                className="text-foreground font-medium transition-colors hover:text-accent cursor-pointer"
              >
                {link.label}
              </motion.a>
            ))}
            <ModeToggle />
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden px-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-full shadow-lg hover:bg-white/20 transition-all duration-300">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="text-foreground font-semibold text-sm">Menu</div>
            <div className="flex items-center space-x-2">
              <ModeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-foreground p-1 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 hover:bg-white dark:hover:bg-gray-900 hover:shadow-2xl transition-all duration-300"
            >
              <nav className="flex flex-col p-4 space-y-3">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    variants={navLinkVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: i * 0.1 }}
                    className="text-foreground font-medium transition-colors hover:text-accent cursor-pointer py-2 px-3 rounded-lg hover:bg-white/20"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}