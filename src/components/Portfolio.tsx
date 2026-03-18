import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect, Fragment } from "react";
import { X } from "lucide-react";
import { cn } from "../lib/utils";

type Category = "Wedding Films" | "Business Videos" | "Creative Projects";

interface Project {
  id: string;
  title: string;
  category: Category;
  file: string;
  videoBase: string;
  poster?: string;
}

const projects: Project[] = [
  // ── Wedding Films ──────────────────────────────────────────────
  { id: "w-hw",       title: "H&W Wedding",            category: "Wedding Films",    file: "H&W.mp4",                              videoBase: "/wedding-videos/" },
  { id: "w-j1",       title: "J Wedding (Extended)",   category: "Wedding Films",    file: "J (1).mp4",                            videoBase: "/wedding-videos/" },
  { id: "w-jk",       title: "J&K Wedding",            category: "Wedding Films",    file: "J&K.mp4",                              videoBase: "/wedding-videos/", poster: "/wedding-thumbnails/j-and-k.png" },
  { id: "w-j",        title: "J Wedding",              category: "Wedding Films",    file: "J.mp4",                                videoBase: "/wedding-videos/", poster: "/wedding-thumbnails/j.png" },
  { id: "w-jake",     title: "Jake",                   category: "Wedding Films",    file: "jake.mp4",                             videoBase: "/wedding-videos/" },
  { id: "w-lover",    title: "Lover",                  category: "Wedding Films",    file: "Lover.mp4",                            videoBase: "/wedding-videos/" },
  { id: "w-pinner",   title: "Pinner Wedding",         category: "Wedding Films",    file: "Pinner.mp4",                           videoBase: "/wedding-videos/" },
  { id: "w-pollaed",  title: "Pollaed Wedding",        category: "Wedding Films",    file: "Pollaed.mp4",                          videoBase: "/wedding-videos/" },
  { id: "w-pollard",  title: "Pollard Wedding",        category: "Wedding Films",    file: "pollard.mp4",                          videoBase: "/wedding-videos/" },
  { id: "w-posey",    title: "Posey Wedding",          category: "Wedding Films",    file: "Posey.mp4",                            videoBase: "/wedding-videos/", poster: "/wedding-thumbnails/posey.png" },
  { id: "w-the",      title: "THE Wedding",            category: "Wedding Films",    file: "THE.mp4",                              videoBase: "/wedding-videos/", poster: "/wedding-thumbnails/the.png" },
  { id: "w-timeline", title: "Timeline",               category: "Wedding Films",    file: "Timeline.mp4",                         videoBase: "/wedding-videos/" },
  { id: "w-wedding",  title: "Wedding",                category: "Wedding Films",    file: "wedding.mp4",                          videoBase: "/wedding-videos/" },

  // ── Business Videos ────────────────────────────────────────────
  { id: "b-flight",   title: "FLIGHT",                 category: "Business Videos",  file: "FLIGHT.mp4",                           videoBase: "/brand-videos/" },
  { id: "b-gabe",     title: "Gabe",                   category: "Business Videos",  file: "gabe.mp4",                             videoBase: "/brand-videos/" },
  { id: "b-gabe2",    title: "Gabe 2",                 category: "Business Videos",  file: "Gabe2.mp4",                            videoBase: "/brand-videos/" },
  { id: "b-hes",      title: "HES",                    category: "Business Videos",  file: "HES.h264.mp4",                         videoBase: "/brand-videos/", poster: "/brand-thumbnails/HES.png" },
  { id: "b-homex",    title: "HomeX",                  category: "Business Videos",  file: "HomeX.mp4",                            videoBase: "/brand-videos/" },
  { id: "b-homex1",   title: "HomeX (1)",              category: "Business Videos",  file: "HomeX (1).mp4",                        videoBase: "/brand-videos/" },
  { id: "b-homex2",   title: "HomeX (2)",              category: "Business Videos",  file: "HomeX (2).mp4",                        videoBase: "/brand-videos/" },
  { id: "b-homex3",   title: "HomeX (3)",              category: "Business Videos",  file: "HomeX (3).mp4",                        videoBase: "/brand-videos/" },
  { id: "b-jdm",      title: "JDM",                    category: "Business Videos",  file: "jdm.mp4",                              videoBase: "/brand-videos/" },
  { id: "b-kl",       title: "KL",                     category: "Business Videos",  file: "kl.mp4",                               videoBase: "/brand-videos/" },
  { id: "b-lugos",    title: "Lugos",                  category: "Business Videos",  file: "Lugos.mp4",                            videoBase: "/brand-videos/" },
  { id: "b-lugos1",   title: "Lugos (1)",              category: "Business Videos",  file: "Lugos (1).mp4",                        videoBase: "/brand-videos/" },
  { id: "b-primary",  title: "Primary",                category: "Business Videos",  file: "Primary.mp4",                          videoBase: "/brand-videos/" },
  { id: "b-recolor",  title: "Re-Color",               category: "Business Videos",  file: "re-color.mp4",                         videoBase: "/brand-videos/" },

  // ── Creative Projects ──────────────────────────────────────────
  { id: "c-co",       title: "CO",                     category: "Creative Projects", file: "CO.mp4",                              videoBase: "/capture-videos/" },
  { id: "c-flight",   title: "FLIGHT",                 category: "Creative Projects", file: "FLIGHT.mp4",                          videoBase: "/capture-videos/" },
  { id: "c-kadrian",  title: "Kelly Adrian Interview", category: "Creative Projects", file: "Kelly Adrian Interview.h264.mp4",     videoBase: "/capture-videos/", poster: "/capture-thumbnails/kelly-adrian-interview.png" },
  { id: "c-kdalton",  title: "Kelly Dalton Interview", category: "Creative Projects", file: "Kelly Dalton Interview.h264.mp4",     videoBase: "/capture-videos/", poster: "/capture-thumbnails/kelly-dalton-interview.png" },
  { id: "c-kstage",   title: "Kelly Stage Talk",       category: "Creative Projects", file: "Kelly Stage Talk.h264.mp4",           videoBase: "/capture-videos/" },
  { id: "c-ksummit",  title: "Kelly Summit Hype",      category: "Creative Projects", file: "Kelly Summit Hype.h264.mp4",          videoBase: "/capture-videos/" },
  { id: "c-ky",       title: "KY",                     category: "Creative Projects", file: "ky.mp4",                              videoBase: "/capture-videos/" },
  { id: "c-thai",     title: "Thai",                   category: "Creative Projects", file: "thai.mp4",                            videoBase: "/capture-videos/" },
  { id: "c-tourney",  title: "Tourney",                category: "Creative Projects", file: "tourney.mp4",                         videoBase: "/capture-videos/" },
  { id: "c-wedding",  title: "Wedding",                category: "Creative Projects", file: "wedding.mp4",                         videoBase: "/capture-videos/" },
];

const TAB_LABELS = ["All", "Wedding Films", "Business Videos", "Creative Projects"] as const;
type Tab = (typeof TAB_LABELS)[number];

// ── Video Modal ────────────────────────────────────────────────────────────────

interface VideoModalProps {
  project: Project | null;
  onClose: () => void;
}

function VideoModal({ project, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (project && videoRef.current) {
      videoRef.current.load();
    }
  }, [project]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

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
            <video
              ref={videoRef}
              controls
              autoPlay
              className="w-full rounded-xl shadow-2xl bg-black max-h-[80vh]"
              src={`${project.videoBase}${encodeURIComponent(project.file)}`}
            />
            <p className="mt-4 text-center text-white/80 text-sm tracking-wider uppercase">
              {project.title}
            </p>
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const posterSrc = project.poster ?? thumbnail;

  const captureThumbnail = (el: HTMLVideoElement) => {
    if (thumbnail || el.videoWidth === 0 || el.videoHeight === 0) return;
    const canvas = document.createElement("canvas");
    canvas.width = el.videoWidth;
    canvas.height = el.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    try {
      ctx.drawImage(el, 0, 0, canvas.width, canvas.height);
      setThumbnail(canvas.toDataURL("image/jpeg", 0.85));
    } catch {
      // cross-origin / HEVC — silently skip
    }
  };

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
      <div
        className="relative aspect-video overflow-hidden rounded-lg bg-brand-black"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Video element used for thumbnail capture */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover transition-opacity transition-transform duration-700 group-hover:scale-105"
          onLoadedData={(e) => { e.currentTarget.currentTime = 2; }}
          onSeeked={(e) => captureThumbnail(e.currentTarget)}
          onPlay={(e) => { if (!isHovering) e.currentTarget.pause(); }}
        >
          <source src={`${project.videoBase}${encodeURIComponent(project.file)}`} type="video/mp4" />
        </video>

        {/* Static poster overlay – fades out on hover */}
        {posterSrc && (
          <img
            src={posterSrc}
            alt={`${project.title} thumbnail`}
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none"
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
        <h4 className="text-xl font-serif group-hover:text-white/80 transition-colors">{project.title}</h4>
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

  const filtered = activeTab === "All"
    ? projects
    : projects.filter((p) => p.category === activeTab);
  const visibleProjects = activeTab === "All" && !showAllInAllTab
    ? filtered.slice(0, initialAllCount)
    : filtered;

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

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-3"
          >
            {TAB_LABELS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab);
                  setShowAllInAllTab(false);
                }}
                className={cn(
                  "px-6 py-2 rounded-full text-sm uppercase tracking-wider transition-all duration-300",
                  activeTab === tab
                    ? "bg-white text-black"
                    : "border border-white/20 text-white/70 hover:text-white hover:border-white/50"
                )}
              >
                {tab}
              </button>
            ))}
          </motion.div>
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
