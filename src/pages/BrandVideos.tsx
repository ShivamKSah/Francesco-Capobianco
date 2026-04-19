import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, X, Play } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  resolveDriveEmbedUrl,
  resolveDriveMediaUrl,
  resolveDrivePosterUrl,
  useVideoThumbnail,
} from "../lib/videoThumbnails";

const videos = [
  {
    file: "FLIGHT.mp4",
    label: "FLIGHT",
    previewTime: 2,
    url: "https://drive.google.com/file/d/1PTJbED0F5NLPJH8TVF8HWA4HfLSj9hmP/view?usp=sharing",
  },
  {
    file: "gabe.mp4",
    label: "Gabe",
    previewTime: 2,
    url: "https://drive.google.com/file/d/1IkooLTcZlS5dD_OjulhTZ9ERBUMLbY77/view?usp=sharing",
  },
  {
    file: "Gabe2.mp4",
    label: "Gabe2",
    previewTime: 2,
    url: "https://drive.google.com/file/d/1oM8pJa2fr8siOj12xKnju-v4abqybCu6/view?usp=sharing",
  },
  {
    file: "HES.mp4",
    label: "HES",
    previewTime: 8,
    url: "https://drive.google.com/file/d/1sLoFgoRqZBTl95tV30_15NUFx9Po2a0q/view?usp=sharing",
    poster: "/brand-thumbnails/HES.png",
  },
  {
    file: "HomeX (1).mp4",
    label: "HomeX (1)",
    previewTime: 2,
    url: "https://drive.google.com/file/d/1viEgWqE_loaaKPGTD0b7G2MA67tekWum/view?usp=sharing",
  },
  {
    file: "HomeX (2).mp4",
    label: "HomeX (2)",
    previewTime: 2,
    url: "https://drive.google.com/file/d/1eCWyF1F7g0KaWajikru7XHpQBtNOWWdj/view?usp=sharing",
  },
  {
    file: "HomeX (3).mp4",
    label: "HomeX (3)",
    previewTime: 2,
    url: "https://drive.google.com/file/d/17HKHrkWo5FbN_EM1-LjxPK1NppaPhUzQ/view?usp=sharing",
  },
  {
    file: "HomeX.mp4",
    label: "HomeX",
    previewTime: 2,
    url: "https://drive.google.com/file/d/1HSq3qvNRS9ZzNs9Bb9i_ftkJpGiPp-Uw/view?usp=sharing",
  },
  {
    file: "jdm.mp4",
    label: "JDM",
    previewTime: 8,
    url: "https://drive.google.com/file/d/16vwbof85Z6nKubs5DDSMh44-lYv19M9X/view?usp=sharing",
  },
  {
    file: "kl.mp4",
    label: "KL",
    previewTime: 8,
    url: "https://drive.google.com/file/d/1Vo17Fq_-rRDY9KVIvKkW2-1J4-uOfzjs/view?usp=sharing",
  },
  {
    file: "Lugos (1).mp4",
    label: "Lugos (1)",
    previewTime: 8,
    url: "https://drive.google.com/file/d/1973sgn8XI-5vB-S914hw1b0Rnc_QGpml/view?usp=sharing",
  },
  {
    file: "Lugos.mp4",
    label: "Lugos",
    previewTime: 2,
    url: "https://drive.google.com/file/d/1FHHqzpVCDm6RaEfCg-_yBf2-0kh79kXX/view?usp=sharing",
  },
  {
    file: "Primary.mp4",
    label: "Primary",
    previewTime: 2,
    url: "https://drive.google.com/file/d/18HisolNQNxHYEIWbC-wQUfDXFosPUWUh/view?usp=sharing",
  },
  {
    file: "re-color.mp4",
    label: "Re-Color",
    previewTime: 2,
    url: "https://drive.google.com/file/d/1oT3HotNqLLIWLrqM4B8pw0z8ZsW9IO8V/view?usp=sharing",
  },
];

function createFallbackPoster(label: string) {
  const safeLabel = label.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#18181b"/><stop offset="100%" stop-color="#27272a"/></linearGradient></defs><rect width="1280" height="720" fill="url(#g)"/><circle cx="640" cy="360" r="58" fill="#ffffff22" stroke="#ffffff55" stroke-width="2"/><polygon points="628,334 628,386 674,360" fill="#ffffff"/><text x="640" y="624" text-anchor="middle" fill="#f4f4f5" font-size="44" font-family="Georgia, serif">${safeLabel}</text><text x="640" y="664" text-anchor="middle" fill="#a1a1aa" font-size="26" font-family="Arial, sans-serif">Brand Video</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

interface VideoModalProps {
  video: { file: string; label: string; url: string } | null;
  onClose: () => void;
}

interface VideoCardProps {
  video: (typeof videos)[0];
  index: number;
  onOpen: (video: (typeof videos)[0]) => void;
}

function VideoCard({ video, index, onOpen }: VideoCardProps) {
  const fallbackPoster = createFallbackPoster(video.label);
  const fallbackSrc = video.poster ?? resolveDrivePosterUrl(video.url) ?? fallbackPoster;
  const posterSrc = useVideoThumbnail({
    videoUrl: resolveDriveMediaUrl(video.url),
    fallbackSrc,
    seekTime: video.previewTime,
  }) ?? fallbackSrc;

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
        {posterSrc && (
          <img
            src={posterSrc}
            alt={`${video.label} thumbnail`}
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackPoster;
            }}
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
              <iframe
                key={video.file}
                src={resolveDriveEmbedUrl(video.url)}
                className="w-full h-[75vh] outline-none"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                title={video.label}
              />
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
    <div className="min-h-screen bg-brand-black text-brand-white">
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
          <span className="text-sm tracking-widest uppercase text-white/50">Francesco Capobianco</span>
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