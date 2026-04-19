import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { HighlightReel } from "./components/HighlightReel";
import { About } from "./components/About";
import { Portfolio } from "./components/Portfolio";
import { Services } from "./components/Services";
import { Contact } from "./components/Contact";
import WeddingFilms from "./pages/WeddingFilms";
import BrandVideos from "./pages/BrandVideos";
import CreativeProjects from "./pages/CreativeProjects";
import { WorkGrid } from "./components/WorkGrid";
import { ProjectDetails } from "./pages/ProjectDetails";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-black text-brand-white selection:bg-brand-white selection:text-brand-black flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

function Home() {
  return <Hero />;
}

function WorkPage() {
  return (
    <>
      <WorkGrid />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <About />
    </>
  );
}

function ServicesPage() {
  return <Services />;
}

function ContactPage() {
  return <Contact />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<ProjectDetails />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          <Route path="/wedding-films" element={<WeddingFilms />} />
          <Route path="/brand-videos" element={<BrandVideos />} />
          <Route path="/creative-projects" element={<CreativeProjects />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
