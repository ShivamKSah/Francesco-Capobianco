import { motion } from "motion/react";
import { Link } from "react-router-dom";
import portfolioData from "../lib/portfolioData.json";

export function WorkGrid() {
  return (
    <section className="bg-brand-black" id="work-grid">
      <div className="w-full max-w-[2400px] mx-auto px-4 md:px-8 lg:px-12 xl:px-16 pt-[104px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[5px] pb-12">
          {portfolioData.map((project, index) => {
            const slug = project.href.replace(".html", "");
            return (
            <Link to={`/work/${slug}`} key={`${slug}-${index}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative block aspect-video overflow-hidden cursor-pointer"
              >
                <img
                  src={project.src}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out flex-shrink-0 origin-center group-hover:scale-105 group-focus-within:scale-105"
                  style={{ imageRendering: 'auto' }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500 ease-out drop-shadow-md bg-black/20">
                  <span className="text-brand-white/60 text-xs tracking-[0.2em] font-medium uppercase mb-2 block">
                    {project.date}
                  </span>
                  <h3 className="text-xl md:text-2xl font-light text-brand-white">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
}