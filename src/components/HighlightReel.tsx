import { motion } from "motion/react";
import { useRef, useState } from "react";

export function HighlightReel() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const showReelVideo = `/wedding-videos/${encodeURIComponent("wedding.mp4")}`;

  const handlePlay = async () => {
    if (!videoRef.current) return;
    try {
      await videoRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <section className="py-24 bg-brand-gray text-white">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
          onClick={handlePlay}
        >
          <video
            ref={videoRef}
            src={showReelVideo}
            className="w-full h-full object-cover"
            controls={isPlaying}
            preload="metadata"
            playsInline
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />

          <div
            className={`absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500 flex items-center justify-center ${
              isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <div className="flex flex-col items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-24 h-24 rounded-full glass flex items-center justify-center text-white"
              >
                <svg className="w-10 h-10 ml-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
              <h3 className="text-sm tracking-[0.3em] uppercase font-medium text-white/90 group-hover:text-white transition-colors">
                Play Showreel
              </h3>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
