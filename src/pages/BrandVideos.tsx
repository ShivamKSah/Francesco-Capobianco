import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, X, Play } from "lucide-react";
import { Fragment, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const videos = [
  { file: "FLIGHT.mp4", label: "FLIGHT", previewTime: 2 },
  { file: "gabe.mp4", label: "Gabe", previewTime: 2 },
  { file: "Gabe2.mp4", label: "Gabe2", previewTime: 2 },
  { file: "HES.h264.mp4", label: "HES", previewTime: 8, poster: "/brand-thumbnails/HES.png" },
  { file: "HomeX.mp4", label: "HomeX", previewTime: 2 },
  { file: "HomeX (1).mp4", label: "HomeX (1)", previewTime: 2 },
  { file: "HomeX (2).mp4", label: "HomeX (2)", previewTime: 2 },
  { file: "HomeX (3).mp4", label: "HomeX (3)", previewTime: 2 },
  { file: "jdm.mp4", label: "JDM", previewTime: 8 },
  { file: "kl.mp4", label: "KL", previewTime: 8 },
  { file: "Lugos.mp4", label: "Lugos", previewTime: 2 },
  { file: "Lugos (1).mp4", label: "Lugos (1)", previewTime: 8 },
  { file: "Primary.mp4", label: "Primary", previewTime: 2 },
  { file: "re-color.mp4", label: "Re-Color", previewTime: 2 },
];

function videoUrl(file: string) {
  return `/brand-videos/${encodeURIComponent(file)}`;
}

interface VideoModalProps {
  video: { file: string; label: string } | null;
  onClose: () => void;
}

interface VideoCardProps {
  video: (typeof videos)[0];
  index: number;
  onOpen: (video: (typeof videos)[0]) => void;
}

function VideoCard({ video, index, onOpen }: VideoCardProps) {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const posterSrc = video.poster ?? thumbnail;

  const captureThumbnail = (element: HTMLVideoElement) => {
    if (thumbnail || element.videoWidth === 0 || element.videoHeight === 0) {
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = element.videoWidth;
    canvas.height = element.videoHeight;

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    try {
      context.drawImage(element, 0, 0, canvas.width, canvas.height);
      setThumbnail(canvas.toDataURL("image/jpeg", 0.85));
    } catch {
    }
  };

  return (
    <motion.div
      key={video.file}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      onClick={() => onOpen(video)}
      className="group cursor-pointer"
    >
      <div className="relative aspect-video bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-black/60">
        <video
          className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity transition-transform duration-700 group-hover:scale-105 transform"
          preload="auto"
          muted
          playsInline
          onLoadedMetadata={(e) => {
            const v = e.currentTarget;
            if (Number.isFinite(v.duration) && v.duration > 0.5) {
              const targetTime = Math.min(video.previewTime, Math.max(v.duration - 0.25, 0));
              try {
                v.currentTime = targetTime;
              } catch {
              }
            }
          }}
          onSeeked={(e) => {
            captureThumbnail(e.currentTarget);
          }}
          onLoadedData={(e) => {
            captureThumbnail(e.currentTarget);
          }}
          onMouseEnter={(e) => {
            const v = e.currentTarget;
            setIsHovering(true);
            if (Number.isFinite(v.duration) && v.duration > 0.5 && v.currentTime < 0.1) {
              const targetTime = Math.min(video.previewTime, Math.max(v.duration - 0.25, 0));
              try {
                v.currentTime = targetTime;
              } catch {
              }
            }
            v.play().catch(() => {});
          }}
          onMouseLeave={(e) => {
            const v = e.currentTarget;
            setIsHovering(false);
            v.pause();
            if (v.readyState >= 1) {
              const targetTime = Number.isFinite(v.duration) && v.duration > 0.5
                ? Math.min(video.previewTime, Math.max(v.duration - 0.25, 0))
                : 0;
              try {
                v.currentTime = targetTime;
              } catch {
              }
            }
          }}
        >
          <source src={videoUrl(video.file)} type="video/mp4" />
        </video>

        {posterSrc && !isHovering && (
          <img
            src={posterSrc}
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
        <p className="text-white/40 text-sm mt-1">Brand Video</p>
      </div>
    </motion.div>
  );
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
                onClick={onClose}
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

export default function BrandVideos() {
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
          <h1 className="text-5xl md:text-7xl font-serif mb-6">Brand / Business Videos</h1>
          <p className="text-white/50 text-lg max-w-xl font-light leading-relaxed">
            Clean, purposeful energy to elevate your brand with cinematic storytelling.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-6 md:px-12 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <Fragment key={video.file}>
              <VideoCard video={video} index={index} onOpen={setActiveVideo} />
            </Fragment>
          ))}
        </div>
      </section>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </div>
  );
}