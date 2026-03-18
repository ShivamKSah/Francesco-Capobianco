import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, X, Play } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const videos = [
  { file: "CO.mp4", label: "CO" },
  { file: "FLIGHT.mp4", label: "FLIGHT" },
  {
    file: "Kelly Adrian Interview.h264.mp4",
    label: "Kelly Adrian Interview",
    poster: "/capture-thumbnails/kelly-adrian-interview.png",
  },
  {
    file: "Kelly Dalton Interview.h264.mp4",
    label: "Kelly Dalton Interview",
    poster: "/capture-thumbnails/kelly-dalton-interview.png",
  },
  { file: "Kelly Stage Talk.h264.mp4", label: "Kelly Stage Talk" },
  { file: "Kelly Summit Hype.h264.mp4", label: "Kelly Summit Hype" },
  { file: "ky.mp4", label: "KY" },
  { file: "thai.mp4", label: "Thai" },
  { file: "tourney.mp4", label: "Tourney" },
  { file: "wedding.mp4", label: "Wedding" },
];

function videoUrl(file: string) {
  return `/capture-videos/${encodeURIComponent(file)}`;
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

export default function CreativeProjects() {
  const navigate = useNavigate();
  const [activeVideo, setActiveVideo] = useState<(typeof videos)[0] | null>(null);

  return (
    <div className="min-h-screen bg-brand-black text-white">
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

      <section className="pt-24 pb-16 container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm tracking-[0.2em] uppercase text-white/40 mb-4">
            Featured Collection
          </p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6">Creative Projects</h1>
          <p className="text-white/50 text-lg max-w-xl font-light leading-relaxed">
            Experimental edits and cinematic capture projects from your creative library.
          </p>
        </motion.div>
      </section>

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
              <div className="relative aspect-video bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-black/60">
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

                {video.poster && (
                  <img
                    src={video.poster}
                    alt={`${video.label} thumbnail`}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none"
                  />
                )}

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <Play size={20} className="ml-1 text-white" fill="white" />
                  </div>
                </div>

                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity">
                  MP4
                </div>
              </div>

              <div className="mt-4 px-1">
                <h3 className="font-serif text-lg text-white group-hover:text-white/80 transition-colors">
                  {video.label}
                </h3>
                <p className="text-white/40 text-sm mt-1">Creative Project</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </div>
  );
}
