import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import bggImage from "../bgg.png";

export function Hero() {
  const { scrollY } = useScroll();
  // Move down up to 400px as user scrolls 1000px
  const y = useTransform(scrollY, [0, 1000], [0, 400]);


  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-brand-black flex items-center justify-center">
      {/* Show Reel Video Autoplay */}
      <motion.div
        className="absolute inset-0 z-0 flex items-center justify-center"
        style={{
          y,
          scale: 1.25,
          transformOrigin: "center top"
        }}
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ position: 'relative' }}>
          <iframe
            className="animate-[pulse_10s_ease-in-out_infinite_alternate]"
            src="https://www.youtube-nocookie.com/embed/IBk4HoJlaGM?autoplay=1&mute=1&loop=1&playlist=IBk4HoJlaGM&controls=0&modestbranding=1&vq=hd1080"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '120%',
              height: '120%',
              minWidth: '100%',
              minHeight: '100%',
              transform: 'translate(-50%, -50%)',
              border: 0
            }}
            title="THE Showreel"
          />
        </div>
      </motion.div>

      <div className="relative z-20 container mx-auto px-6 text-center flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm md:text-base tracking-[0.3em] uppercase text-white/70 mb-6"
        >
          Aidan Kramer Presents
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-8 text-balance"
        >
          Double Take<br />Films
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 font-light text-balance"
        >
          Cinematic storytelling for weddings, brands, and unforgettable moments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <a
            href="#work"
            className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-medium tracking-wide uppercase text-sm hover:bg-white/90 transition-all"
          >
            View Work
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="flex items-center gap-3 border border-white/30 text-white px-8 py-4 rounded-full font-medium tracking-wide uppercase text-sm hover:bg-white/10 transition-all"
          >
            Contact
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-white/50">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden">
          <motion.div
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-1/2 bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
}
