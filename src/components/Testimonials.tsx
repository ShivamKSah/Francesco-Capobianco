import { motion } from "motion/react";

const testimonials = [
  {
    quote: "Having Aidan capture our wedding day meant so much. He made everyone feel comfortable, relaxed, and excited, and he preserved both the big moments and the little in-between moments perfectly. I cannot recommend him enough.",
    author: "Emily Grace",
    role: "Wedding Client",
  },
  {
    quote: "Aidan was THE best. He took time to understand our vibe, was super helpful all day, and our wedding video turned out better than we expected. The day wouldn't have been the same without him.",
    author: "Wyatt & Cheyanne",
    role: "Wedding Clients",
  },
  {
    quote: "The booking process was smooth, communication was excellent, and he made everything feel stress-free from the start. You can truly tell he cares about providing great service.",
    author: "Maddie & Aj",
    role: "Wedding Clients",
  },
  {
    quote: "Double Take Films transformed our business. The videos showcased our services beautifully, connected with our target audience, and helped bring in a significant number of new clients.",
    author: "JDM Roof Restoration",
    role: "Business Client",
  },
  {
    quote: "Aidan was incredible to work with on our roofing install content. The quality was outstanding, he was flexible and professional on site, and delivered far more content than we expected.",
    author: "HomeX Roofing",
    role: "Business Client",
  },
  {
    quote: "We really enjoyed working with Aidan on promotional videos. His recommendations made the content more engaging, and his editing, creative features, and sound design brought everything to life.",
    author: "Primary Air HVAC",
    role: "Business Client",
  },
];

export function Testimonials() {
  return (
    <section className="py-32 bg-brand-gray text-white overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-sm tracking-[0.2em] uppercase text-white/50 mb-4"
          >
            Client Stories
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-serif text-balance"
          >
            Words from the people we've worked with.
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="p-10 rounded-2xl bg-brand-black border border-white/5 flex flex-col justify-between gap-8 hover:border-white/20 transition-colors duration-500"
            >
              <p className="text-white/80 font-serif text-xl md:text-2xl leading-relaxed italic">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="text-white font-medium tracking-wide uppercase text-sm mb-1">{testimonial.author}</p>
                <p className="text-white/50 text-xs uppercase tracking-widest">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-green/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
    </section>
  );
}
