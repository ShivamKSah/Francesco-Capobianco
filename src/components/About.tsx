import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";


export function About() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="about" className="py-32 md:py-48 flex items-center min-h-[80vh] bg-slate-900/30 border-y border-white/5">
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
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              alt="Portrait of Aidan Kramer looking thoughtful" 
              src="/videos/aidan.png"
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-accent-green font-bold tracking-[0.3em] uppercase text-xs mb-4 block">The Filmmaker</span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-8">Aidan Kramer</h2>
          <div className="space-y-6 text-slate-300 font-light leading-relaxed text-lg">
            <p>I believe every moment has a heartbeat. My mission is to find that pulse and capture it in its most beautiful form.</p>
            <p>Capturing moments professionally since 2024, I've transitioned from capturing simple movements to choreographing emotions through light, sound, and sequence. Double Take Films isn't just about recording—it's about making you look twice.</p>
            <p className="font-serif italic text-white text-xl">"Cinematography is the bridge between what is seen and what is felt."</p>
          </div>
          <div className="mt-10 flex gap-6 grayscale opacity-50">
             {/* Note: The user's snippet ended here abruptly, probably meant for social icons or similar. Adding a placeholder or leaving it empty as per snippet */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
