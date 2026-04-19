import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import fImage from '../about-profile.jpg';


export function About() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="about" className="py-32 md:py-48 flex items-center min-h-[80vh] bg-brand-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full">
        <motion.div
           ref={ref}
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="relative"
        >
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-accent-blue z-0"></div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-accent-green z-0"></div>
          <div className="relative z-10 overflow-hidden aspect-[4/5] w-full">
            <img
              className="w-full h-full object-cover transition-all duration-700"
              alt="Portrait of Francesco Capobianco looking thoughtful"
              src={fImage}
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-accent-green font-bold tracking-[0.3em] uppercase text-xs mb-4 block">The Photographer</span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-8">Francesco Capobianco</h2>
          <div className="space-y-6 text-brand-white/80 font-light leading-relaxed text-lg">
            <p>I don’t just take photos — I capture presence.</p>
            <p>Most images today are made to impress. Sharp, clean, perfectly edited… and quickly forgotten. But real moments aren’t perfect — they’re honest, fleeting, and alive.</p>
            <p>That’s what I chase.</p>
            <p>I picked up a camera to create work that lingers. Frames that hold energy. Stories that don’t need explanation — you just feel them.</p>
            <p>Every project I take on is about connection. The light, the mood, the silence in between — those are the details that turn a moment into something timeless.</p>
            <p>Whether it’s a face, a place, or a story, I don’t direct reality — I observe it, shape it, and preserve it.</p>
            <p>I’m not here to follow trends or recreate what’s already been done.</p>
            <p>I’m here to create something that stays with you.</p>
            <p className="font-serif italic text-white text-xl">“Some moments aren’t meant to be remembered—they’re meant to be felt again.”</p>
          </div>
          <div className="mt-10 flex gap-6 grayscale opacity-50">
             {/* Note: The user's snippet ended here abruptly, probably meant for social icons or similar. Adding a placeholder or leaving it empty as per snippet */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
