import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import image1 from "../1.jpeg";
import image2 from "../2.jpeg";
import image3 from "../3.jpeg";

const categories = [
  {
    title: "Wedding Films",
    image: image1,
    description: "Authentic, emotional storytelling of your special day."
  },
  {
    title: "Brand / Business Videos",
    image: image2,
    description: "Clean, purposeful energy to elevate your brand."
  },
  {
    title: "Creative Projects",
    image: image3,
    description: "Cinematic visuals for unique and artistic visions."
  },
];

export function FeaturedWork() {
  // navigation removed, cards are static
  return (
    <section id="work" className="py-32 bg-brand-black text-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h2 className="text-sm tracking-[0.2em] uppercase text-white/50 mb-4">Featured Work</h2>
            <h3 className="text-4xl md:text-6xl font-serif text-balance">
              Stories told with warmth, heart, and meaning.
            </h3>
          </motion.div>
          
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            href="#portfolio"
            className="group flex items-center gap-2 text-sm uppercase tracking-widest hover:text-white/70 transition-colors"
          >
            View Full Portfolio
            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group flex flex-col gap-6"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-brand-gray">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                
                {/* Hover Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-16 h-16 rounded-full glass flex items-center justify-center text-white">
                    <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-2xl font-serif mb-2 group-hover:text-white/80 transition-colors">{category.title}</h4>
                </div>
                <p className="text-white/60 font-light text-sm leading-relaxed">{category.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
