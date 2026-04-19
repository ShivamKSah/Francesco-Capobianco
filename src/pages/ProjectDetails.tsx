import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import projectDetails from "../lib/projectDetails.json";
import portfolioData from "../lib/portfolioData.json";

export function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  if (!slug || !projectDetails[slug as keyof typeof projectDetails]) {
    // If the project doesn't exist, redirect back to work grid
    return <Navigate to="/work" replace />;
  }

  const project = projectDetails[slug as keyof typeof projectDetails] as { title: string; images: string[] };

  const currentIndex = portfolioData.findIndex(p => p.href.replace(".html", "") === slug);
  const nextProjects = [];
  if (currentIndex !== -1 && portfolioData.length > 1) {
    for (let i = 1; i <= 2; i++) {
      const nextIndex = (currentIndex + i) % portfolioData.length;
      nextProjects.push(portfolioData[nextIndex]);
    }
  }

  const handlePrev = () => {
    setSelectedIndex((prev) => 
      prev === null ? null : prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedIndex((prev) => 
      prev === null ? null : prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="pt-[104px] pb-16 min-h-screen bg-brand-black text-brand-white">
      <div className="w-full max-w-[2400px] mx-auto px-4 md:px-8 lg:px-12 xl:px-16">
        <Link 
          to="/work" 
          className="inline-flex items-center gap-2 text-[#f4efe8]/60 hover:text-[#f4efe8] transition-colors mb-12 uppercase tracking-[0.2em] text-[11px] font-semibold"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to Work
        </Link>

        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-4xl lg:text-[3rem] font-serif font-bold not-italic tracking-[0.2em] uppercase text-[#f4efe8]"
          >
            {project.title}
          </motion.h1>
          <div className="w-12 h-[1px] bg-[#f4efe8]/30 mx-auto mt-10"></div>
        </div>

        {/* Exact Picture frame formats with Masonry Style layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-[5px] space-y-[5px] pb-12 w-full">
          {project.images.map((imgSrc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: (index % 5) * 0.1 }}
              className="break-inside-avoid w-full"
            >
              <img
                src={imgSrc}
                alt={`${project.title} - ${index + 1}`}
                loading={index < 4 ? "eager" : "lazy"}
                decoding="async"
                title={`${project.title} - Image ${index + 1}`}
                onClick={() => setSelectedIndex(index)}
                className="w-full h-auto align-middle cursor-pointer transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl"
                style={{ imageRendering: 'high-quality', WebkitFontSmoothing: 'antialiased' }}
              />
            </motion.div>
          ))}
        </div>

        {/* Recommended Next Works */}
        {nextProjects.length > 0 && (
          <div className="mt-24 pb-8">
            <h2 className="text-xl md:text-2xl font-light tracking-wide mb-8 text-center text-brand-white/80 uppercase">
              Continue Exploring
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[5px]">
              {nextProjects.map((nextProject, index) => {
                const nextSlug = nextProject.href.replace(".html", "");
                return (
                  <Link to={`/work/${nextSlug}`} key={`${nextSlug}-${index}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="group relative block aspect-video overflow-hidden cursor-pointer"
                    >
                      <img
                        src={nextProject.src}
                        alt={nextProject.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out flex-shrink-0 origin-center group-hover:scale-105"
                        style={{ imageRendering: 'high-quality' }}
                      />
                      <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out drop-shadow-md">
                        <span className="text-brand-white/60 text-xs tracking-[0.2em] font-medium uppercase mb-2 block">
                          {nextProject.date}
                        </span>
                        <h2 className="text-xl md:text-2xl font-light tracking-wide text-brand-white">
                          {nextProject.title}
                        </h2>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox / Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black/95 backdrop-blur-sm"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 md:top-8 md:right-8 text-brand-white/70 hover:text-brand-white transition-colors z-[101]"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(null);
              }}
            >
              <X className="w-8 h-8 lg:w-10 lg:h-10" strokeWidth={1} />
            </button>

            {/* Prev Button */}
            <button
              className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-brand-white/70 hover:text-brand-white transition-colors z-[101] p-2"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
            >
              <ChevronLeft className="w-10 h-10 lg:w-14 lg:h-14" strokeWidth={1} />
            </button>

            {/* Current Image */}
            <div className="relative w-full h-[85vh] flex items-center justify-center p-4">
              <motion.img
                key={selectedIndex  }
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                src={project.images[selectedIndex]}
                alt={`${project.title} - Enlarged`}
                className="max-w-full max-h-full object-contain select-none shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking image
                style={{ imageRendering: 'high-quality', WebkitFontSmoothing: 'antialiased', transformOrigin: 'center center' }}
              />
            </div>

            {/* Next Button */}
            <button
              className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-brand-white/70 hover:text-brand-white transition-colors z-[101] p-2"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <ChevronRight className="w-10 h-10 lg:w-14 lg:h-14" strokeWidth={1} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-brand-white/50 text-xs tracking-[0.3em] z-[101]">
              {selectedIndex + 1} / {project.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
