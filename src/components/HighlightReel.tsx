
import { motion } from "motion/react";

export function HighlightReel() {




  return (
    <section className="py-24 bg-brand-gray text-white">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl"
        >
          <video
            src="/videos/wedding.mp4"
            title="Showreel"
            className="w-full h-full"
            autoPlay
            loop
            muted
            playsInline
            controls
            poster="/brand-thumbnails/wedding.jpg"
          />
        </motion.div>
        <div className="mt-4 text-center text-sm text-white/70">
          Wedding Highlight Reel
        </div>
      </div>
    </section>
  );
}
