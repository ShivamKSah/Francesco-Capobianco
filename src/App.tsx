import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { FeaturedWork } from "./components/FeaturedWork";
import { HighlightReel } from "./components/HighlightReel";
import { About } from "./components/About";
import { Portfolio } from "./components/Portfolio";
import { Services } from "./components/Services";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import WeddingFilms from "./pages/WeddingFilms";
import BrandVideos from "./pages/BrandVideos";
import CreativeProjects from "./pages/CreativeProjects";

function Home() {
  return (
    <div className="min-h-screen bg-brand-black text-brand-white selection:bg-white selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <About />
        <FeaturedWork />
        <HighlightReel />
        <Portfolio />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wedding-films" element={<WeddingFilms />} />
        <Route path="/brand-videos" element={<BrandVideos />} />
        <Route path="/creative-projects" element={<CreativeProjects />} />
      </Routes>
    </BrowserRouter>
  );
}
