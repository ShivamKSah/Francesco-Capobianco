import { useState, useEffect } from "react";
import { BrowserRouter, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";

const links = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Graphic Design", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "py-4" : "py-6"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 max-w-[2400px]">
        <div 
          className={cn(
            "flex items-center justify-between transition-all duration-500 w-full rounded-full",
            isScrolled ? "glass px-6 py-3" : "px-0 py-0"
          )}
        >
          <Link to="/" className="text-sm md:text-[1.1rem] font-serif tracking-[0.15em] text-[#f4efe8] uppercase z-50 relative">
            Francesco Capobianco
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10 lg:gap-14">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.25em] transition-colors relative group",
                  location.pathname === link.href ? "text-[#f4efe8]" : "text-[#f4efe8]/50 hover:text-[#f4efe8]"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-2 left-0 w-full h-[1px] bg-[#f4efe8] transform origin-left transition-transform duration-300",
                  location.pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )} />
              </Link>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden z-50 relative text-[#f4efe8]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-brand-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {links.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.1 }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link
                  to={link.href}
                  className="text-3xl font-serif uppercase tracking-widest text-brand-white/80 hover:text-brand-white transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
