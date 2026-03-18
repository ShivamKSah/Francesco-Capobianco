import { motion } from "motion/react";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-black text-white pt-24 pb-12 border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24 mb-16">
          
          {/* Logo & Info */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <a href="#home" className="text-2xl font-serif tracking-wider uppercase">
              Double Take Films
            </a>
            <p className="text-white/50 font-light leading-relaxed max-w-sm">
              Cinematic storytelling for weddings, brands, and unforgettable moments. Based in Los Angeles, available worldwide.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-widest text-white/50 mb-2">Navigation</h4>
            <a href="#home" className="text-sm hover:text-white/70 transition-colors w-fit">Home</a>
            <a href="#work" className="text-sm hover:text-white/70 transition-colors w-fit">Work</a>
            <a href="#about" className="text-sm hover:text-white/70 transition-colors w-fit">About</a>
            <a href="#services" className="text-sm hover:text-white/70 transition-colors w-fit">Services</a>
            <a href="#contact" className="text-sm hover:text-white/70 transition-colors w-fit">Contact</a>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-widest text-white/50 mb-2">Connect</h4>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/aidan_kramer_films"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://instagram.com/aidan_kramer_films"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                @aidan_kramer_films
              </a>
            </div>
          </div>
          
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Double Take Films. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
