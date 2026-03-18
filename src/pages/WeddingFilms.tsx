import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, X, Play } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const videos = [
  { file: "H&W.mp4", label: "H&W Wedding" },
  { file: "J (1).mp4", label: "J Wedding (Extended)" },
  { file: "J&K.mp4", label: "J&K Wedding", poster: "/wedding-thumbnails/j-and-k.png" },
  { file: "J.mp4", label: "J Wedding", poster: "/wedding-thumbnails/j.png" },
  { file: "jake.mp4", label: "Jake" },
  { file: "Lover.mp4", label: "Lover" },
  { file: "Pinner.mp4", label: "Pinner Wedding" },
  { file: "Pollaed.mp4", label: "Pollaed Wedding" },
  { file: "pollard.mp4", label: "Pollard Wedding" },
  { file: "Posey.mp4", label: "Posey Wedding", poster: "/wedding-thumbnails/posey.png" },
  { file: "THE.mp4", label: "THE Wedding", poster: "/wedding-thumbnails/the.png" },
  { file: "Timeline.mp4", label: "Timeline" },
  { file: "wedding.mp4", label: "Wedding" },
];

function videoUrl(file: string) {
  return `/wedding-videos/${encodeURIComponent(file)}`;
}

interface VideoModalProps {
  video: { file: string; label: string } | null;
  onClose: () => void;
}

function VideoModal({ video, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (video && videoRef.current) {
      videoRef.current.load();
    }
  }, [video]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-xl font-serif">{video.label}</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              >
                <X size={22} />
              </button>
            </div>

            {/* Video */}
            <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
              <video
                ref={videoRef}
                controls
                autoPlay
                className="w-full max-h-[75vh] outline-none"
                preload="metadata"
              >
                <source src={videoUrl(video.file)} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function WeddingFilms() {
  const navigate = useNavigate();
  const [activeVideo, setActiveVideo] = useState<(typeof videos)[0] | null>(null);

  return (
    <div className="min-h-screen bg-brand-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-brand-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 md:px-12 h-16 flex items-center gap-6">
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <div className="h-4 w-px bg-white/20" />
          <span className="text-sm tracking-widest uppercase text-white/50">Double Take</span>
        </div>
      </div>

      {/* Hero */}
      <section className="pt-24 pb-16 container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm tracking-[0.2em] uppercase text-white/40 mb-4">
            Featured Collection
          </p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6">Wedding Films</h1>
          <p className="text-white/50 text-lg max-w-xl font-light leading-relaxed">
            Authentic, emotional storytelling of your special day — captured with warmth, heart, and meaning.
          </p>
        </motion.div>
      </section>

      {/* Video Grid */}
      <section className="container mx-auto px-6 md:px-12 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.file}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              onClick={() => setActiveVideo(video)}
              className="group cursor-pointer"
            >
              {/* Thumbnail / Preview Card */}
              <div className="relative aspect-video bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-black/60">
                {/* Native video thumbnail */}
                <video
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity transition-transform duration-700 group-hover:scale-105 transform"
                  preload="metadata"
                  poster={video.poster}
                  muted
                  playsInline
                  onMouseEnter={(e) => {
                    const v = e.currentTarget;
                    v.play().catch(() => {});
                  }}
                  onMouseLeave={(e) => {
                    const v = e.currentTarget;
                    v.pause();
                    if (v.readyState >= 1) {
                      try {
                        v.currentTime = 0;
                      } catch {
                      }
                    }
                  }}
                >
                  <source src={videoUrl(video.file)} type="video/mp4" />
                </video>

                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <Play size={20} className="ml-1 text-white" fill="white" />
                  </div>
                </div>

                {/* Duration-style badge at top right */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity">
                  MP4
                </div>
              </div>

              {/* Label */}
              <div className="mt-4 px-1">
                <h3 className="font-serif text-lg text-white group-hover:text-white/80 transition-colors">
                  {video.label}
                </h3>
                <p className="text-white/40 text-sm mt-1">Wedding Film</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modal */}
      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </div>
  );
}
