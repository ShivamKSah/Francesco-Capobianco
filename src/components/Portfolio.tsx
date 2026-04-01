import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, Fragment } from "react";
import { X } from "lucide-react";
import { cn } from "../lib/utils";
import {
  resolveDriveEmbedUrl,
  resolveDriveMediaUrl,
  resolveDrivePosterUrl,
  useVideoThumbnail,
} from "../lib/videoThumbnails";

type Category = "All";

interface Project {
  id: string;
  category: Category;
  url: string;
  poster?: string;
}

const projects: Project[] = [
  { id: "nixrprmuceq", category: "All", url: "https://youtu.be/nIxrprmuCeQ?si=nW4QX1iPVQ_NliZN" },
  { id: "pdvhvgo2dy", category: "All", url: "https://youtu.be/pdvhVgo-2DY?si=NfVmtByecNTPHL-z" },
  { id: "kr1vw5hjao", category: "All", url: "https://youtu.be/kR1vW5hJaoI?si=RmDx9-UfBke6yPoZ" },
  { id: "cltiwz_u0xw", category: "All", url: "https://youtu.be/zBdqlUPKJ-o?si=OYoiWHViWF6RAZlQ" },
  { id: "yntxzcpdtu0a", category: "All", url: "https://youtu.be/yNTxZcpDTu0?si=GyRi4LwvBVGgGDMF" },
  { id: "c_6yfief58g", category: "All", url: "https://youtu.be/c_6YFieF58g?si=gxa2W41WkuQ5A8Z-" },
  { id: "9q_nlfbzc2g", category: "All", url: "https://youtu.be/9Q_NlFbZC2g?si=6OjfWHyZ-lfjIPFD" },
  { id: "ibk4hojlagm", category: "All", url: "https://youtu.be/IBk4HoJlaGM?si=6yv3r3fN1z-C0yvH" },
  { id: "qvbscf02pkq", category: "All", url: "https://youtu.be/qVbScf02PKQ?si=pWoExuCTqi4seGcW" },
  { id: "zqgpvpzr62i", category: "All", url: "https://youtu.be/ZQGPVpZR62I?si=_2MUxKDJmHoE17Uk" },
  { id: "5fohhhpq9u", category: "All", url: "https://youtu.be/5FOHHHPQ9-U?si=_cWdn0wo3765rnaR" },
];

const TAB_LABELS = ["All"] as const;
type Tab = (typeof TAB_LABELS)[number];

function createFallbackPoster(label: string, category: Category) {
  const safeLabel = label.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const safeCategory = category.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#18181b"/><stop offset="100%" stop-color="#27272a"/></linearGradient></defs><rect width="1280" height="720" fill="url(#g)"/><circle cx="640" cy="360" r="58" fill="#ffffff22" stroke="#ffffff55" stroke-width="2"/><polygon points="628,334 628,386 674,360" fill="#ffffff"/><text x="640" y="624" text-anchor="middle" fill="#f4f4f5" font-size="44" font-family="Georgia, serif">${safeLabel}</text><text x="640" y="664" text-anchor="middle" fill="#a1a1aa" font-size="26" font-family="Arial, sans-serif">${safeCategory}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// ── Video Modal ────────────────────────────────────────────────────────────────

interface VideoModalProps {
  project: Project | null;
  onClose: () => void;
}

function VideoModal({ project, onClose }: VideoModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Helper to get YouTube embed URL with autoplay
  function getYouTubeEmbed(url: string) {
    const match = url.match(/(?:youtu.be\/|youtube.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{11})/);
    const id = match ? match[1] : null;
    if (!id) return null;
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=1&modestbranding=1&showinfo=0`;
  }
  return (
    <AnimatePresence>
      {project && (
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
            <button
              type="button"
              aria-label="Close modal"
              onClick={onClose}
              className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
            >
              <X size={28} />
            </button>
            {getYouTubeEmbed(project.url) ? (
              <iframe
                key={project.id}
                src={getYouTubeEmbed(project.url)}
                className="w-full h-[80vh] rounded-xl shadow-2xl bg-black"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                title={project.title}
              />
            ) : (
              <div className="w-full h-[80vh] flex items-center justify-center bg-black text-white">Invalid video link</div>
            )}
            {/* Removed title display as requested */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Portfolio Card ─────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project;
  onOpen: (p: Project) => void;
}

function ProjectCard({ project, onOpen }: ProjectCardProps) {
  // Helper to extract YouTube video ID
  function getYouTubeId(url: string) {
    const match = url.match(/(?:youtu.be\/|youtube.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{11})/);
    return match ? match[1] : null;
  }

  const youtubeId = getYouTubeId(project.url);
  const youtubeThumbnail = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
    : undefined;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45 }}
      className="group cursor-pointer flex flex-col gap-4"
      onClick={() => onOpen(project)}
    >
      <div className="relative aspect-video overflow-hidden rounded-lg bg-brand-black">
        {youtubeThumbnail && (
          <img
            src={youtubeThumbnail}
            alt={`${project.title} thumbnail`}
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"
          />
        )}

        {/* Dark scrim */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 pointer-events-none" />

        {/* Play icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="w-16 h-16 rounded-full glass flex items-center justify-center text-white">
            <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/* Removed title from card as requested */}
        <span className="text-xs uppercase tracking-widest text-white/50">{project.category}</span>
      </div>
    </motion.div>
  );
}

// ── Main Export ────────────────────────────────────────────────────────────────

export function Portfolio() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showAllInAllTab, setShowAllInAllTab] = useState(false);
  const initialAllCount = 9;

  const filtered = projects;
  const visibleProjects = filtered;

  return (
    <section id="portfolio" className="py-32 bg-brand-gray text-white">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm tracking-[0.2em] uppercase text-white/50 mb-4">Selected Works</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-balance">
              A collection of our finest moments.
            </h3>
          </motion.div>

          {/* Filter Tabs removed as only 'All' remains */}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project) => (
            <Fragment key={project.id}>
              <ProjectCard project={project} onOpen={setActiveProject} />
            </Fragment>
          ))}
        </motion.div>

        {activeTab === "All" && filtered.length > initialAllCount && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllInAllTab((prev) => !prev)}
              className="px-6 py-2 rounded-full text-sm uppercase tracking-wider border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-all duration-300"
            >
              {showAllInAllTab ? "View Less" : "View More"}
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <VideoModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
