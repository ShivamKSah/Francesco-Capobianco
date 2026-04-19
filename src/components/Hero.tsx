import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import fImage from "../F.png";

export function Hero() {
  const { scrollY } = useScroll();
  // Move down up to 400px as user scrolls 1000px
  const y = useTransform(scrollY, [0, 1000], [0, 400]);


  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-brand-black flex items-center justify-center">
      {/* Hero Image Background */}
      <motion.div
        className="absolute inset-0 z-0 flex items-center justify-center"
        style={{
          y,
          scale: 1.25,
          transformOrigin: "center top"
        }}
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src={fImage} 
          alt="Hero Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-20 container mx-auto px-6 text-center flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm md:text-base tracking-[0.3em] uppercase text-white/70 mb-6"
        >
          Francesco Capobianco Presents
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-8 text-balance"
        >
          Francesco Capobianco
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 font-light text-balance"
        >
          Photoshoots and automobiles—captured to be felt, not just seen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Link
            to="/work"
            className="group flex items-center gap-3 bg-accent-blue text-brand-white px-8 py-4 rounded-full font-medium tracking-wide uppercase text-sm hover:bg-accent-blue/90 transition-all border border-accent-blue"
          >
            View Work
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/contact"
            className="flex items-center gap-3 border border-brand-white/30 text-brand-white px-8 py-4 rounded-full font-medium tracking-wide uppercase text-sm hover:bg-brand-white/10 transition-all"
          >
            Contact
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
