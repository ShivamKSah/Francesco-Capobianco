import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

const graphicDesigns = [
  "https://cdn.myportfolio.com/4bb84124-3f9c-42b0-8fa4-9918a8be788b/4214cf30-f3b3-4a37-a72c-368669735b30_rw_1920.png?h=4287da97f84d29a7f5afcaa6fd000368",
  "https://cdn.myportfolio.com/4bb84124-3f9c-42b0-8fa4-9918a8be788b/64877aa6-5a90-4e0b-976f-4f24bb4ca305_rw_1920.png?h=040d630bbf96e1e41b6ca0d79677bf83",
  "https://cdn.myportfolio.com/4bb84124-3f9c-42b0-8fa4-9918a8be788b/6977d7ac-7bd0-4893-be43-96afcdecf573_rw_1920.png?h=c747f482d933d4f129b9de12b21fcfba",
  "https://cdn.myportfolio.com/4bb84124-3f9c-42b0-8fa4-9918a8be788b/a4cda913-c473-43f1-a6e1-c92e3f99b52f_rw_1920.png?h=1a7c4fae9ce99deeda85bf4d9b3fd8de",
];

export function Services() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedImage) {
        setSelectedImage(null);
      }
    };
    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown);
      // Focus on the close button to entrap focus
      closeButtonRef.current?.focus();
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <section id="services" className="pt-[140px] pb-32 min-h-screen bg-brand-black text-brand-white">
      <div className="w-full max-w-[2400px] mx-auto px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="text-center mb-16 md:mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl lg:text-[4rem] font-display italic tracking-[0.15em] uppercase text-[#f4efe8]"
          >
            Graphic Design
          </motion.h1>
          <div className="w-12 h-[1px] bg-[#f4efe8]/30 mx-auto mt-10"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[5px]">
          {graphicDesigns.map((src, index) => (
            <motion.div
              key={index}
              layoutId={src}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative block overflow-hidden cursor-zoom-in"
              onClick={() => setSelectedImage(src)}
            >
              <motion.img
                src={src}
                alt={`Graphic Design ${index + 1}`}
                loading="lazy"
                className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500 ease-out"
                style={{ imageRendering: 'auto' }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Image Pop-up */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 cursor-zoom-out outline-none"
            onClick={() => setSelectedImage(null)}
          >
            <button
              ref={closeButtonRef}
              aria-label="Close image"
              className="absolute top-6 right-6 text-white hover:text-white/70 z-[110] outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={32} strokeWidth={1} />
            </button>
            <motion.img
              layoutId={selectedImage}
              src={selectedImage}
              alt="Zoomed Graphic Design"
              className="max-w-full max-h-full object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
