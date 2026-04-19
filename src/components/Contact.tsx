import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";

export function Contact() {
  const eventTypeOptions = [
    "Wedding Film",
    "Brand / Business Video",
    "Creative Project",
    "Event Coverage",
    "Showreel / Social Content",
    "Other",
  ];
  const [eventType, setEventType] = useState("");
  const [eventTypeOpen, setEventTypeOpen] = useState(false);
  const eventTypeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!eventTypeRef.current?.contains(e.target as Node)) {
        setEventTypeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const eventType = String(formData.get("eventType") ?? "");
    const eventDate = String(formData.get("eventDate") ?? "");
    const message = String(formData.get("message") ?? "");

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=shivamsah141205@gmail.com&su=${encodeURIComponent(
      `New Inquiry from ${name}`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nEvent Type: ${eventType}\nEvent Date: ${eventDate}\nMessage: ${message}`
    )}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="py-32 bg-brand-black text-brand-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-sm tracking-[0.2em] uppercase text-white/50 mb-4">Get in Touch</h2>
            <h3 className="text-5xl md:text-7xl font-serif text-balance leading-tight mb-8">
              Let's create something unforgettable.
            </h3>
            <p className="text-white/70 font-light text-lg leading-relaxed max-w-md mb-12">
              Whether you're planning a wedding, launching a brand, or hosting an event, we'd love to hear your story.
            </p>
            
            <div className="flex flex-col gap-6">
              <a href="mailto:shivamsah141205@gmail.com" className="text-2xl font-serif hover:text-white/70 transition-colors w-fit">
                shivamsah141205@gmail.com
              </a>
              <a href="tel:+919963830194" className="text-lg font-light text-white/70 hover:text-white transition-colors w-fit">
                +91 9963830194
              </a>
              <a href="https://www.instagram.com/francesco.shoots.it/" target="_blank" rel="noreferrer" className="text-sm uppercase tracking-widest text-white/60 hover:text-white transition-colors w-fit flex items-center gap-2">
                @francesco.shoots.it
              </a>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-brand-gray p-8 md:p-12 rounded-2xl border border-white/5"
          >
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-widest text-white/50">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest text-white/50">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="eventType" className="text-xs uppercase tracking-widest text-white/50">Event Type</label>
                  <div className="relative" ref={eventTypeRef}>
                    <input type="hidden" name="eventType" value={eventType} required />
                    <button
                      id="eventType"
                      type="button"
                      onClick={() => setEventTypeOpen((prev) => !prev)}
                      className="w-full bg-transparent border-b border-white/20 py-3 pr-10 text-left focus:outline-none focus:border-white hover:border-white/50 transition-colors"
                      aria-haspopup="listbox"
                      aria-expanded={eventTypeOpen}
                    >
                      <span className={eventType ? "text-white" : "text-white/40"}>
                        {eventType || "Select your project type"}
                      </span>
                    </button>
                    <ChevronDown
                      size={16}
                      className={`pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-white/60 transition-transform ${eventTypeOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />

                    {eventTypeOpen && (
                      <div
                        className="absolute left-0 right-0 mt-2 z-20 rounded-lg border border-white/15 bg-brand-black overflow-hidden shadow-2xl"
                        role="listbox"
                      >
                        {eventTypeOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setEventType(option);
                              setEventTypeOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                              option === eventType
                                ? "bg-white/15 text-white"
                                : "text-white/80 hover:bg-white/10 hover:text-white"
                            }`}
                            role="option"
                            aria-selected={option === eventType}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="eventDate" className="text-xs uppercase tracking-widest text-white/50">Event Date</label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    required
                    className="bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors [color-scheme:dark]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs uppercase tracking-widest text-white/50">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors resize-none"
                  placeholder="Tell us about your vision..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="group flex items-center justify-center gap-3 bg-brand-white text-brand-black px-8 py-4 rounded-full font-medium tracking-wide uppercase text-sm transition-all mt-4 w-full md:w-auto self-start hover:bg-brand-white/90"
              >
                Send Inquiry
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
