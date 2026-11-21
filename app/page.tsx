import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Nexus } from "@/components/Nexus";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <div id="top">
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Nexus />
        <Projects />
        <Work />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
